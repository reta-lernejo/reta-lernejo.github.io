class AB {

    // pKa / pKb de acidoj kaj bazoj ĉe ĉambra temperaturo laŭ
    // https://de.wikipedia.org/wiki/S%C3%A4urekonstante
    // https://www.chemie.de/lexikon/Dissoziationskonstante.html

    // ATENTU: la nombroj estas nur por la unua ŝtupo de protonigo
    // ekzemple por H2SO4 la dua havas 1.9, do oni devas adicii koncentriĝojn...
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

    /**
     * Trovas la acidon en la difinoj kaj redonas ties pKa-valoro
     */
    static pKa(acido) {
        const ea = AB.pKa_pKb.find((e) => e[0] == acido);
        return ea[1];
    }

    /**
     * Trovas la bazon en la difinoj kaj redonas ties pKb-valoro
     */
    static pKb(bazo) {
        const eb = AB.pKa_pKb.find((e) => e[2] == bazo);
        return eb[3];
    }

    /**
     * Trovas la acidon en la difinoj kaj redonas ties Ka-valoro
     * laŭ la formulo Ka = 10^(-pKa)
     */
    static Ka(acido) {
        const _pKa = -AB.pKa(acido);
        if (_pKa !== undefined) return 10**_pKa;
    }

    /**
     * Trovas la bazon en la difinoj kaj redonas ties Kb-valoro
     * laŭ la formulo Kb = 10^(-pKb)
     */
    static Kb(bazo) {
        const _pKb = -AB.pKb(bazo);
        if (_pKb !== undefined) return 10**_pKb;
    }

    /**
     * Kalkulas la koncentrigon de H+-jonoj laŭ la formulo (leĝo de masago k.a.)
     * vd. https://studyflix.de/chemie/ph-wert-berechnen-1566
     * [H+] = radiko(Ca * Ka) - Ca = koncentrigo de la acido en mol/l
     */
    static cH(acido,koncentriĝo) {
        const K = AB.Ka(acido);
        return Math.sqrt(koncentriĝo * K)
    }

    /** 
     * Kalkulas la pH-valoron de acido lau la formulo
     */
    static pH(acido,koncentriĝo) {
        if (acido == "H2O") return 7;
     /* tre fortaj acidoj:
            ph = -lg(c)
        
        pli malfortaj acidoj:
            pH = −lg[H+] kun [H+] kun cH(acido,koncentriĝo)
            resp. 0.5 * (pKa - lg(c))
      */
        const pKa_ = AB.pKa(acido);
        if (pKa_ < 1)
            return -Math.log10(koncentriĝo)
        else if (pKa_ < 11)
            return 0.5 * (pKa_ - Math.log10(koncentriĝo));
        else
            throw "Tro granda pKA por apliki kutimajn simpligitajn formulojn... "
    }
}