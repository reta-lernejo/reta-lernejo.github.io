class AB {

    // pKa / pKb de acidoj kaj bazoj ĉe ĉambra temperaturo laŭ
    // https://de.wikipedia.org/wiki/S%C3%A4urekonstante
    // https://www.chemie.de/lexikon/Dissoziationskonstante.html

    // ATENTU: la nombroj estas nur por la unua ŝtupo de protonigo
    // ekzemple por H2SO4 la dua havas 1.9, do oni devas provizore multipliki koncentritecojn...
    // oni povas en tiu kazo kalkuli anstataŭ AB.pH("H2SO4",1.0) duoblon: AB.pH("H2SO4",2.0)
    // kaj ricevas pH: -0.3, estonte eble plibonigu la formulojn por respekti plurŝtupan protonigon

    static pKa_pKb = [
    // tre fortaj acidoj - tre malfortaj bazoj
    ["H[SbF6]",-17,"[SbF6]-",31],
    ["HClO4",-10,"ClO4-",24],
    ["HI",-10,"I-",24],
    ["HBr",-8.9,"Br-",22.9],
    ["HCl",-6,"Cl-",20],
    ["H2SO4",-3,"HSO4-",17],
    ["HNO3",-1.32,"NO3-",15.32],
    // fortaj acidoj - malfortaj bazoj
    ["H3O+",0,"H2O",14],
    ["HSO4-",1.92,"SO4^2-",12.08],
    ["H3PO4",2.13,"H2PO4-",11.87],
    ["[Fe(H2O)6]3+",2,22,"[Fe(OH)(H2O)5]2+",11.78],
    ["HF",3.14,"F-",10.86],
    ["HNO2",3.35,"NO2^-",10.65],
    ["HCOOH",3.75,"HCOO-",10.25],
    // mezfortaj acidoj kaj bazoj
    ["CH3COOH",4.75,"CH3COO-",9.25],
    ["[Al(H2O)6]3+",4.85,"[Al(OH)(H2O)5]2+",9.15],
    ["H2CO3",6.52,"JCO3^-",7.48],
    ["H2S",6.92,"HS-",7.08],
    ["H2PO4^-",7,2,"HPO4^2-",6.8],
    // malfortaj acidoj - fortaj bazoj
    ["NH4+",9.25,"NH3",4.75],
    ["HCN",9.4,"CN-",4.6],
    ["HCO3^-",10.4,"CO3^2-",3.6],
    ["HPO4^2-",12.36,"PO4^3-",1.64],
    ["HS-",13,"S^2-",1],
    ["H2O",14,"OH-",0],
    // tre malfortaj acidoj - tre fortaj bazoj
    ["CH3-CH2-OH",15.9,"CH3-CH2-O-",-1.9],
    ["NH3",23,"NH2^-",-9],
    ["CH4",48,"CH3-",-34]
    ];

    /**
     * Kontrolas ĉu la sumo pKa + pKb estas 14 por ciuj donitaĵoj, kiel oni atendu de
     * akva solvaĵo en ĉambra temperaturo
     */
    static test14() {
        for (const e of AB.pKa_pKb) {
            // console.log(e.join(', '));
            if (Math.abs(e[1] + e[3] - 14) > 0.001 )
                console.error("Sumo ne estas 14: " + e.join(', '));
        }
    }

    static test_pH() {
        // pH-testoj
        if (Math.abs(AB.pH("H2O",0.01) - 7.0) > 0.05) throw "Atendita pH-voloro por H2O estas 7.0";
        if (Math.abs(AB.pH("HCOOH",0.05) - 2.53) > 0.05) throw "Atendita pH-voloro por 0.05 mol/l HCOOH estas 2.53";
        if (Math.abs(AB.pH("HCl",0.1) - 1) > 0.05) throw "Atendita pH-voloro por 0.1 mol/l HCl estas 1.0";
        if (Math.abs(AB.pH("CH3COOH",1) - 2.37)  > 0.05) throw "Atendita pH-voloro por 1 mol/l CH3COOH estas 2.375";

        // pH2-testoj
        if (Math.abs(AB.pH2_acido({a:"HCl",v:0.05,c:0.1},{b:"OH-",v:0.04,c:0.1}) - 1.95) > 0.05) 
            throw "Atendita pH-avloro por 50ml HCl + 40ml NaOH estas 1.95";
        if (Math.abs(AB.pH2_acido({a:"CH3COOH",v:0.05,c:0.1},{b:"OH-",v:0.04,c:0.1}) - 5.34) > 0.05) 
            throw "Atendita pH-avloro por 50ml CH3COOH + 40ml NaOH estas 5.34";

        if (Math.abs(AB.pH2_acido({a:"HCl",v:0.05,c:0.1},{b:"OH-",v:0.05,c:0.1}) - 7) > 0.05)
            throw "Atendita pH-avloro por 50ml HCl + 50ml NaOH estas 7.0";
        if (Math.abs(AB.pH2_acido({a:"CH3COOH",v:0.05,c:0.1},{b:"OH-",v:0.05,c:0.1}) - 8.72) > 0.05)
            throw "Atendita pH-avloro por 50ml CH3COOH + 50ml NaOH estas 8.72";

        if (Math.abs(AB.pH2_acido({a:"HCl",v:0.05,c:0.1},{b:"OH-",v:0.06,c:0.1}) - 11.96) > 0.05)
            throw "Atendita pH-avloro por 50ml HCl + 60ml NaOH estas 11.96";
        if (Math.abs(AB.pH2_acido({a:"HCH3COOHCl",v:0.05,c:0.1},{b:"OH-",v:0.06,c:0.1}) - 11.96) > 0.05)
            throw "Atendita pH-avloro por 50ml CH3COOH + 60ml NaOH estas 11.96";


        if (Math.abs(AB.pH2_bazo({b:"OH-",v:0.05,c:0.1},{a:"HCl",v:0.04,c:0.1}) - 12.05) > 0.05)
            throw "Atendita pH-avloro por 50ml NaOH kun 40ml HCl estas 12.05";

        if (Math.abs(AB.pH2_bazo({b:"OH-",v:0.05,c:0.1},{a:"HCl",v:0.05,c:0.1}) - 7) > 0.05)
            throw "Atendita pH-avloro por 50ml NaOH kun 50ml HCl estas 7.0";


        if (Math.abs(AB.pH2_bazo({b:"NH3",v:0.025,c:0.1},{a:"HCl",v:0.0125,c:0.1}) - 9.25) > 0.05)
            throw "Atendita pH-avloro por 25ml NH3 + 12.5ml HCl estas 9.25";
        if (Math.abs(AB.pH2_bazo({b:"NH3",v:0.025,c:0.1},{a:"HCl",v:0.025,c:0.1}) - 5.28) > 0.05)
            throw "Atendita pH-avloro por 25ml NH3 + 25ml HCl estas 5.28";


        return "ok";
    }

    /**
     * Trovas la acidon en la difinoj kaj redonas ties pKa-valoro
     */
    static pKa(acido) {
        const ea = AB.pKa_pKb.find((e) => e[0] == acido);
        if (ea) return ea[1];
    }

    /**
     * Trovas la bazon en la difinoj kaj redonas ties pKb-valoro
     */
    static pKb(bazo) {
        const eb = AB.pKa_pKb.find((e) => e[2] == bazo);
        if (eb) return eb[3];
    }

    /**
     * Trovas la acidon en la difinoj kaj redonas ties Ka-valoron (disocia konstanto)
     * laŭ la formulo Ka = 10^(-pKa)
     */
    static Ka(acido) {
        const _pKa = -AB.pKa(acido);
        if (_pKa !== undefined) return 10**_pKa;
    }

    /**
     * Trovas la bazon en la difinoj kaj redonas ties Kb-valoro (disocia konstanto)
     * laŭ la formulo Kb = 10^(-pKb)
     */
    static Kb(bazo) {
        const _pKb = -AB.pKb(bazo);
        if (_pKb !== undefined) return 10**_pKb;
    }

    /**
     * Kalkulas la koncentritecon de H+-jonoj laŭ la simpligita formulo (leĝo de masefiko kun simpligoj)
     * vd. https://studyflix.de/chemie/ph-wert-berechnen-1566
     * por malfortaj: [H+] = radiko(Ca * Ka) - Ca = koncentriteco de la acido en mol/l
     * por fortaj: [H+] = [A-] = [HA]₀ = koncentriteco
     * @param acido {string} nomo de la acido
     * @param c {number} koncentriteco en mol/l
     */
    static cH(acido,c) {
        const pKa = AB.pKa(acido);
        if (pKa < 1)
            return c;
        else {
            Math.sqrt(c * 10**-pKa);
        }
    }

    /**
     * Kalkulas la koncentritecon de OH- -jonoj laŭ la formulo (leĝo de masefiko kun simpligoj)
     * por malfortaj: [OH-] = radiko(Cb * Kb) - Cb = koncentriteco de la bazo en mol/l
     * por fortaj: [OH-] = [B]₀ = koncentritecoo
     * @param acido {string} nomo de la acido
     * @param c {number} koncentriteco en mol/l
     */
    static cOH(bazo,c) {
        const pKb_ = AB.pKb(bazo);
        if (pKb_ < 1)
            return c;
        else {
            Math.sqrt(c * 10**-pKb_);
        }
    }

    /** 
     * Kalkulas la pH-valoron de acido aŭ bazo
     * vd. https://studyflix.de/chemie/ph-wert-berechnen-1566
     * @param ab {string} nomo de la acido aŭ bazo
     * @param c {number} koncentriteco en mol/l
     */
    static pH(ab,c) {
        if (ab == "H2O") return 7;
     /* tre fortaj acidoj:
            pH = -lg(c)
        
        pli malfortaj acidoj:
            pH = −lg[H+] kun [H+]: cH(acido,c)
            resp. 0.5 * (pKa - lg(c))
      */
        const pKa = AB.pKa(ab);
        if (pKa !== undefined) {
            if (pKa < 1) // aliaj metas la limon ĉe 4
                return -Math.log10(c)
            else if (pKa < 11)
                return 0.5 * (pKa - Math.log10(c));
            // else : tre malfortaj acidoj kiel NH3 estas bazoj!
            //    throw "Tro granda pKa por apliki la simpligitajn formulojn... "
        }

        // se efektive temas pri bazo, ni redonas pH = 14 - pOH
        if (AB.pKb(ab) !== undefined) {
            return 14 - AB.pOH(ab,c)
        }
    }


    /** 
     * Kalkulas la pOH-valoron de bazo, la pH-valoron en akvo ni ricevos per 14-pOH
     * @param acido {string} nomo de la acido
     * @param c {number} koncentriteco en mol/l
     */
    static pOH(bazo,c) {
        if (bazo == "H2O") return 7;
     /* tre fortaj bazoj:
            pOH = -lg(c)
        
        pli malfortaj bazoj:
            pOH = −lg[OH-] kun [OH-]: cOH(bazo,c)
            resp. 0.5 * (pKb - lg(c))
      */
        const pKb_ = AB.pKb(bazo);
        if (pKb_ < 1) // aliaj metas la limon ĉe 4
            return -Math.log10(c)
        else if (pKb_ < 11)
            return 0.5 * (pKb_ - Math.log10(c));
        else
            throw "Tro granda pKb por apliki la simpligitajn formulojn... "
    }

    /**
     * Kalulas pa pH-valoron en solvaĵo enhavanta acidon kun aldono de forta bazo
     * @param {object} acido donitaĵoj de acido: {a: nomo, c: koncentriteco en mol/l, v: volumeno en l}
     * @param {object} bazo donitaĵoj de bazo: {b: nomo, c: koncentriteco en mol/l, v: volumeno en l}
     */
    static pH2_acido(acido,bazo) {
        // se enestas nur acido...
        if (bazo.v == 0) return AB.pH(acido.a,acido.c);

        // kalkulu la du kvantojn en mol
        const na = acido.c * acido.v;
        const nb = bazo.c * bazo.v;        

        // ekvivalentpunkto
        function ekvipkt() {
            const pKa = AB.pKa(acido.a);
            if (pKa < 1) { // forta acido
                return 7;
            } else { // neforta acido, laŭ Henderson-Hasselbalch
                return 14 - 0.5*(14 - pKa 
                    - Math.log10(nb/(acido.v+bazo.v)));
            }
        }

        // pli da acido...
        function pH_a() {
            const pKa = AB.pKa(acido.a);
            if (pKa < 1) // forta acido
                return AB.pH(acido.a, (na-nb)/(acido.v+bazo.v));
            else // neforta acido
                return pKa - Math.log10((na-nb)/nb);
        }

        // pli da bazo
        function pH_b() {
            return AB.pH(bazo.b,(nb-na)/(acido.v+bazo.v));
        }

        if (na > nb) return pH_a();
        if (na == nb) return ekvipkt();
        return pH_b();
    }

    /**
     * Kalulas pa pH-valoron en solvaĵo enhavanta bazon kun aldono de fortta acido en donita kvanto
     * @param {object} bazo donitaĵoj de bazo: {b: nomo, c: koncentriteco en mol/l, v: volumeno en l}
     * @param {object} acido donitaĵoj de acido: {a: nomo, c: koncentriteco en mol/l, v: volumeno en l}
     */
    static pH2_bazo(bazo,acido) {
        // se enestas nur la bazo...
        if (acido.v == 0) return AB.pH(bazo.b,bazo.c);

        // kalkulu la du kvantojn en mol
        const na = acido.c * acido.v;
        const nb = bazo.c * bazo.v;

        // ekvivalentpunkto
        function ekvipkt() {
            const pKb = AB.pKb(bazo.b);
            if (pKb < 1) { // forta bazo
                return 7;
            } else { // neforta bazo, laŭ Henderson-Hasselbalch
                return 0.5*(14 - pKb
                    - Math.log10(na/(acido.v+bazo.v)));
            }
        }

        // pli da bazo
        function pH_b() {
            const pKb = AB.pKb(bazo.b);
            if (pKb < 1) // forta bazo
                return AB.pH(bazo.b,(nb-na)/(acido.v+bazo.v));
            else {                
                return 14 - pKb 
                    - Math.log10(na/(nb-na));
            }
        }

        // pli da acido
        function pH_a() {
            return AB.pH(acido.a, (na-nb)/(acido.v+bazo.v));
        }

        if (nb > na) return pH_b();        
        if (na == nb) return ekvipkt();
        return pH_a();
    }    

    static acidtitrado(acido,vb) {
        let valoroj = [];
        for (let v of vb) {
            const ph = AB.pH2_acido(acido,{b:"OH-",v:v,c:acido.c});
            valoroj.push(ph)
        }
        return valoroj;
    }

    static bazotitrado(bazo,va) {
        let valoroj = [];
        for (let v of va) {
            const ph = AB.pH2_bazo(bazo,{a:"HCl",v:v,c:bazo.c});
            valoroj.push(ph)
        }
        return valoroj;
    }

}