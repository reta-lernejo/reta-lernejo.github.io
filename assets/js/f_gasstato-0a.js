/**
 * Kalkulas transirojn de (ideala) gasstato, se unu grando restas konstanta kaj alia ŝanĝiĝas
 */

class GS {
    static norm_p = 101325; //1e5; // normpremo estas 1013 hPa
    static norm_T = 293.15; // normtemperaturo en K
    static R = 8.31446261815324; // universala gaskonstanto en J/K/mol
    static kappa = 5/3; // adiabata koeficiento

    // unumolaj varmkapacitoj (por konstanta volumeno, konstanta premo respektive)
    static CmV = 3/2*GS.R;
    static Cmp = 5/2*GS.R;

    static V(T,p,n=1) {
        return n * GS.R * T / p;
    }

    static formuloj = {
        // universalaj (trivialaj) formuloj
        "dx|dx|x": (st,dx) => 0, // x mem estas konstanta, tiam dx = 0
        "dx|dx|y": (st,dx) => dx, // x mem ŝanĝiĝas, do dx = dx
        "Q|dx|S": (st,dx) => 0, // se entropio estas konstanta, varmo Q = 0

        // formuloj or temperaturkonserva volumenŝanĝo
        // https://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/564-isotherme-zustandsaenderung.html
        "dS|dV|T": (st,dV) => -st.n * GS.R * Math.log((st.V+dV)/st.V),
        "Q|dV|T":  (st,dV) =>  st.T * transiro("dS|dV|T",dV),
        "W|dV|T":  (st,dV) => -st.T * transiro("dS|dV|T",dV),
        // formuloj or temperaturkonserva premŝanĝo
        "dS|dp|T": (st,dp) => st.n * GS.R * Math.log(st.p/(st.p+dp)),
        "dV|dp|T": (st,dp) => GS.V(st.T,st.p,st.n) - GS.V(st.T,st.p+dp,st.n),
        "Q|dp|T": (st,dp) =>  st.T * transiro("dS|dp|T",dp),
        "W|dp|T": (st,dp) => - st.T * transiro("dS|dp|T",dp),

        // formuloj por varmkonserva (entropikonserva, adiabata) volumenŝanĝo
        // https://de.wikipedia.org/wiki/Adiabatische_Zustands%C3%A4nderung#Adiabaten_des_idealen_Gases
        "dT|dV|S": (st,dV) =>  st.T * Math.pow((st.V/(st.V+dV)),GS.kappa-1),
        "W|dV|S":  (st,dV) =>  st.n * GS.CmV * transiro("dT|dV|S",dV),
        // formuloj por varmkonserva (entropikonserva, adiabata) premŝanĝo
        "dT|dp|S": (st,dp) => st.T * Math.pow(st.p/(st.p+dp),(s-GS.kappa)/GS.kappa),
        "dV|dp|S": (st,dp) => GS.V(st.T,st.p,st.n) - GS.V(st.T+transiro("dT|dp|S",dp),st.p+dp,st.n),
        "Q|dp|S":  (st,dp) => st.n * GS.CmV * transiro("dT|dp|S",dp),

        // formuloj por volumenkonserva temperaturŝanĝo
        // https://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/568-isochore-zustandsaenderung.html
        "dS|dT|V": (st,dT) => st.n * GS.CmV * Math.log((st.T+dT)/st.T),
        "dp|dT|V": (st,dT) => st.n * GS.R * (st.T+dT) / st.V,
        "W|dT|V":  (st,dT) => st.V * transiro("dp|dT|V",dT),
        "Q|dT|V":  (st,dT) => st.n * GS.CmV * dT,
        // formuloj por premkonserva temperaturŝanĝo
        // vd https://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/569-isobare-zustandsaenderung.html
        "dS|dT|p": (st,dT) => st.n * GS.Cmp * Math.log((st.T+dT)/st.T),
        "dV|dT|p": (st,dT) => GS.V(T+dt,st.p,st.n) - GS.V(T,st.p,st.n),
        "W|dT|p": (st,dT) => st.p * (transiro("dV|dT|p",dT)-st.V),
        "Q|dT|p": (st,dT) => st.n * GS.Cmp * dT
    }
    
    /**
     * Trovas formulon por kalkuli ŝanĝon de difinita grando sub konserva kondiĉo
     * @param {*} spec triopo el serĉata grando, ŝanĝata grando kaj konservata grando, ekz: "dV|dT|p" = V-ŝanĝo ĉe T-ŝanĝo kaj konstanta p
     * @param {*} dx  la valoro de ŝanĝata grando, ekz. dV
     * @returns 
     */
    transiro(spec,dx) {
        // se ekzistas rekta formulo por spec, apliku ĝin
        let frm = GS.formuloj("spec");
        if (frm) return frm(this,dx);

        // aliokaze provu trovi simplan formulon
        let tri = spec.split('|');
        if (tri[0] == tri[1]) {
            if (tri[0] == 'd'+tri[2]) frm = GS.formuloj("dx|dx|x");
            else frm = GS.formuloj("dx|dx|y")
        } else {
            tri[2] = 'dx';
            frm = GS.formuloj(tri.join('|');
        }
        if (frm) return frm(this,dx);

        // se ne troviĝis konvena formulo, plendu
        throw("Ne troviĝis formulo por spec: " + spec);
    }

    /**
     * Kalkulas kompletan novan staton ĉe grandoŝanĝo sub konservo-kondiĉo
     * @param {*} spec duopo, ekz. "dT|p" - statŝanĝo por T-ŝanĝo sub konstanta premo p
     * @param {*} dx la valoro de la ŝanĝo, ekz. dT
     */
    nova_stato(spec,dx) {
        const nova = {...this}; // kopiu this al nova
        nova.V = transiro("dV|"+spec,dx);
        nova.T = transiro("dT|"+spec,dx);
        nova.p = transiro("dp|"+spec,dx);
        nova.S = transiro("dS|"+spec,dx);
        nova.Q = transiro("Q|"+spec,dx);
        nova.W = transiro("W|"+spec,dx);
        return nova;
    }

}