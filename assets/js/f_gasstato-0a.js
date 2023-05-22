/**
 * Kalkulas transirojn de (ideala) gasstatoato, se unu grando restas konstanta kaj alia ŝanĝiĝas
 */

class GS {
    static debug = true;

    static norm_p = 101325; //1e5; // normpremo estas 1013 hPa
    static norm_T = 293.15; // normtemperaturo en K
    static R = 8.31446261815324; // universala gaskonstanto en J/K/mol
    static kappa = 5/3; // adiabata koeficiento: Cmp / CmV

    // unumolaj varmkapacitoj (por konstanta volumeno, konstanta premo respektive)
    static CmV = 3/2*GS.R;
    static Cmp = 5/2*GS.R;

    static V(T,p,n=1) {
        return n * GS.R * T / p;
    }

    static p(T,V,n=1) {
        return n * GS.R * T / V;
    }

    static U(T,n=1) {
        return 3/2 * n * GS.R * T;
    }

    /**
     * formuloj por kalkuli absolutajn valorojn
     */
    static abs = {
        "V(T,p)": (stato) => GS.V(stato.T,stato.p,stato.n),
        "p(T,V)": (stato) => GS.p(stato.T,stato.V,stato.n),
        "U(T,n)": (stato) => GS.U(stato.T,stato.n)
    }

    /**
     * formuloj por kalkuli deltojn (diferencojn) depende de unu variablo ŝanĝiĝanta kaj alia konstanta
     */
    static dlt = {
        // universalaj (trivialaj) formuloj
        "dx|d_|x": (stato,dx) => 0, // x mem estas konstanta, tiam dx = 0
        "dx|dx|_": (stato,dx) => dx, // x mem ŝanĝiĝas, do dx = dx
        "Q|d_|S": (stato,dx) => 0, // se entropio estas konstanta, varmo Q = 0

        // formuloj or temperaturkonserva volumenŝanĝo
        // https://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/564-isotherme-zustandsaenderung.html
        "dS|dV|T": (stato,dV) => -stato.n * GS.R * Math.log((stato.V+dV)/stato.V),
        "Q|dV|T":  (stato,dV) =>  stato.T * stato.d("dS|dV|T",dV),
        "W|dV|T":  (stato,dV) => -stato.T * stato.d("dS|dV|T",dV),
        // formuloj or temperaturkonserva premŝanĝo
        "dS|dp|T": (stato,dp) => stato.n * GS.R * Math.log(stato.p/(stato.p+dp)),
        "dV|dp|T": (stato,dp) => GS.V(stato.T,stato.p+dp,stato.n) - GS.V(stato.T,stato.p,stato.n),
        "Q|dp|T": (stato,dp) =>  stato.T * stato.d("dS|dp|T",dp),
        "W|dp|T": (stato,dp) => - stato.T * stato.d("dS|dp|T",dp),

        // formuloj por varmkonserva (entropikonserva, adiabata) volumenŝanĝo
        // https://de.wikipedia.org/wiki/Adiabatische_Zustands%C3%A4nderung#Adiabaten_des_idealen_Gases
        // https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/Thermodynamic_Cycles/Carnot_Cycle
        "dT|dV|S": (stato,dV) =>  stato.T * Math.pow((stato.V/(stato.V+dV)),GS.kappa-1) - stato.T,
        "W|dV|S":  (stato,dV) =>  stato.n * GS.CmV * stato.d("dT|dV|S",dV),
        // formuloj por varmkonserva (entropikonserva, adiabata) premŝanĝo
        "dT|dp|S": (stato,dp) => stato.T * Math.pow(stato.p/(stato.p+dp),(1-GS.kappa)/GS.kappa) - stato.T, // exp: -2/5 = -0.4
        "dV|dp|S": (stato,dp) => 
            GS.V(stato.T+stato.d("dT|dp|S",dp),stato.p+dp,stato.n) 
            - GS.V(stato.T,stato.p,stato.n),
        "W|dp|S":  (stato,dp) => stato.n * GS.CmV * stato.d("dT|dp|S",dp),

        // formuloj por volumenkonserva temperaturŝanĝo
        // https://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/568-isochore-zustandsaenderung.html
        "dS|dT|V": (stato,dT) => stato.n * GS.CmV * Math.log((stato.T+dT)/stato.T),
        "dp|dT|V": (stato,dT) => stato.n * GS.R * (stato.T+dT) / stato.V - stato.n * GS.R * (stato.T) / stato.V,
        "W|dT|V":  (stato,dT) => stato.V * stato.d("dp|dT|V",dT),
        "Q|dT|V":  (stato,dT) => stato.n * GS.CmV * dT,
        // formuloj por premkonserva temperaturŝanĝo
        // vd https://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/569-isobare-zustandsaenderung.html
        "dS|dT|p": (stato,dT) => stato.n * GS.Cmp * Math.log((stato.T+dT)/stato.T),
        "dV|dT|p": (stato,dT) => GS.V(stato.T+dT,stato.p,stato.n) - GS.V(stato.T,stato.p,stato.n),
        "W|dT|p": (stato,dT) => stato.p * (stato.d("dV|dT|p",dT)-stato.V),
        "Q|dT|p": (stato,dT) => stato.n * GS.Cmp * dT
    }
    
    /**
     * Trovas kaj aplikas formulon por kalkuli ŝanĝon de difinita grando sub konserva kondiĉo
     * @param {*} spec triopo el serĉata grando, ŝanĝata grando kaj konservata grando, ekz: "dV|dT|p" = V-ŝanĝo ĉe T-ŝanĝo kaj konstanta p
     * @param {*} dx  la valoro de ŝanĝata grando, ekz. dV
     * @returns 
     */
    d(spec,dx) {
        // se ekzistas rekta formulo por spec, apliku ĝin
        let frm = GS.dlt[spec];
        if (frm) {
            const r = frm(this,dx);
            if (GS.debug) console.debug(`${dx} -> ${spec} -> ${r}`);
            return r;
        }

        // aliokaze provu trovi simplan formulon
        let tri = spec.split('|');
        if (tri[0] == 'd'+tri[2]) {
            frm = GS.dlt["dx|d_|x"];
        } else if (tri[0] == tri[1]) {
            frm = GS.dlt["dx|dx|_"];
        } else {
            tri[1] = 'd_';
            frm = GS.dlt[tri.join('|')];
        }
        if (frm) {
            const r = frm(this,dx);
            if (GS.debug) console.debug(`${dx} -> ${spec} -> ${r}`);
            return r;
        }

        // se ne troviĝis konvena formulo, plendu
        throw("Ne troviĝis formulo por spec: " + spec);
    }

    /**
     * Trovas kaj aplikas formulon por kalkuli absolutan valoron
     */
    a(spec) {
        const frm = GS.abs[spec];
        if (frm) {
            const r = frm(this);
            if (GS.debug) console.debug(`${spec} -> ${r}`);
            return r;
        }

        // se ne troviĝis konvena formulo, plendu
        throw("Ne troviĝis formulo por spec: " + spec);
    }

    constructor(T=GS.norm_T,V,n=1) {
        this.V = V || GS.V(T,GS.norm_p,n);
        this.T = T;
        this.n = n; // moloj
        this.p = GS.p(T,this.V,n);
        this.S = 0;
        this.W = 0; // laboro, negativa estas enkondukita, pozitiva elkondukita
        this.Q = 0; // varmo, pozitiva estas enkondukita, negativa elkondukita
        this.U = this.a("U(T,n)");
    }

    /**
     * Kalkulas kompletan novan staton ĉe grandoŝanĝo sub konservo-kondiĉo
     * @param {*} spec duopo, ekz. "dT|p" - statŝanĝo por T-ŝanĝo sub konstanta premo p
     * @param {*} dx la valoro de la ŝanĝo, ekz. dT
     */
    nova_stato(spec,dx) {
        const nova = Object.create(this); // kopiu this al nova
        nova.lasta_stato = {...this}; // {V: this.V, T: this.T, p: this.p, S: this.S, Q: this.Q, W: this.W};

        nova.V += this.d("dV|"+spec,dx);
        nova.T += this.d("dT|"+spec,dx);
        nova.p += this.d("dp|"+spec,dx);
        nova.S += this.d("dS|"+spec,dx);
        nova.Q += this.d("Q|"+spec,dx);
        nova.W += this.d("W|"+spec,dx);
        nova.U = this.a("U(T,n)");
        return nova;
    }

}