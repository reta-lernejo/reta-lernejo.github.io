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
    ["H2SO4",-3,"HSO4^-",17],
    ["HNO3",-1.32,"NO3-",15.32],
    // fortaj acidoj - malfortaj bazoj
    ["H3O+",0,"H2O",14],
    ["HSO4^-",1.92,"SO4^2-",12.08],
    ["H3PO4",2.13,"H2PO4^-",11.87],
    ["[Fe(H2O)6]3+",2.22,"[Fe(OH)(H2O)5]2+",11.78],
    ["HF",3.14,"F-",10.86],
    ["HNO2",3.35,"NO2^-",10.65],
    ["HCOOH",3.75,"HCOO-",10.25],
    // mezfortaj acidoj kaj bazoj
    ["CH3COOH",4.75,"CH3COO-",9.25],
    ["[Al(H2O)6]3+",4.85,"[Al(OH)(H2O)5]2+",9.15],
    ["H2CO3",6.52,"JCO3^-",7.48],
    ["H2S",6.92,"HS-",7.08],
    ["H2PO4^-",7.2,"HPO4^2-",6.8],
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
            if (e.length != 4) throw "Atendis longecon 4 anstataŭ "+e.length+" en "+e.join(';');
            if (Math.abs(e[1] + e[3] - 14) > 0.001 )
                throw "Sumo ne estas 14: " + e.join(', ');
        }
        return "ok";
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
        if (Math.abs(AB.pH2_acido({a:"CH3COOH",v:0.05,c:0.1},{b:"OH-",v:0.06,c:0.1}) - 11.96) > 0.05)
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

    static test_h3po4() {
        const pvj = [0,0.01,0.0125,0.02,0.025,0.03,0.04,0.05];
        console.log("titrado de 0.025l HPO4^2- 0,5ml/l kun NaOH 0,5ml/l, volumenoj:"+pvj.join(', '));
        const pH1 = AB.acidtitrado({a:"HPO4^2-", c:0.5, v:0.025},pvj);
        console.log(pH1.join(', '));
        /*
        console.log("NaOH:0 [1.2]"+AB.pH2_acido({a: "H3PO4", c: 0.5, v: 0.025},{b: "OH-", c: 0.5, v: 0}));
        console.log("NaOH:12.5 [2.13]"+AB.pH2_acido({a: "H3PO4", c: 0.5, v: 0.025},{b: "OH-", c: 0.5, v: 12.5}));
        console.log("NaOH:25 [4.7]"+AB.pH2_acido({a: "H3PO4", c: 0.5, v: 0.025},{b: "OH-", c: 0.5, v: 25}));
        */
       const vj = [0,0.0005,0.01,0.0125,0.02,0.025,0.03,0.0375,0.04,0.05,0.06,0.0625,0.07,0.075,0.08,0.09,0.10];
       //const vj = [0.025,0.03,0.0375,0.04,0.05];
       //const vj = [0.05,0.06,0.0625,0.07,0.075,0.08,0.09,0.10];
       //const vj = [0.07,0.075,0.08,0.09,0.10];
       console.log("titrado de 0.025l H3PO4 0,5ml/l kun NaOH 0,5ml/l, volumenoj:"+vj.join(', '));
       const pH = AB.acidtitrado_plurprotona({a:"H3PO4", c:0.5, v:0.025},vj);
       console.log(pH.join(', '));
    }

    /**
     * Trovas acidon en la difinoj
     */
    static acido(acido) {
        return AB.pKa_pKb.find((e) => e[0] == acido);
    }

    /**
     * Trovas bazon en la difinoj
     */
    static bazo(bazo) {
        return AB.pKa_pKb.find((e) => e[2] == bazo);
    }

    /**
     * Trovas la acidon en la difinoj kaj redonas ties pKa-valoro
     */
    static pKa(acido) {
        const ea = AB.acido(acido);
        if (ea) return ea[1];
    }

    /**
     * Trovas la bazon en la difinoj kaj redonas ties pKb-valoro
     */
    static pKb(bazo) {
        const eb = AB.bazo(bazo);
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
     * @param bazo {string} nomo de la bazo
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
     * @param bazo {string} nomo de la bazo
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
     * Kalkulas la pH valoron por tre diluitaj solvaĵoj en akvo per solvo de kuba ekvacio.
     * @param {number} acido nomo de la acido, ĉe ĉambra temperaturo uzata por elekti valron de pK
     * @param {number} am koncentriteco de la acido en mol/l
     * @param {number} pK disociiĝa logritma konstanto de la acido, se ne uzenda la apriora ĉe ĉambra temperaturo
     * @param {number} Kw disociiĝa konstanto de akvo, se ne uzenda tiu de ĉambra temperaturo
     */
    static pH3(acido,am,pK=null,Kw=1.0116e-14) {
        // laŭ Peter Michael Barling
        // vd. https://iejsme.imu.edu.my/wp-content/uploads/2021/09/5.ResearchNote_Peter.pdf
        // disociiĝa konstanto de akvo Kw. Por aliaj ol ĉambra temperaturo donu
        // kiel parametro, jen por oreintiĝo:
        // Kw je 0 °C  0.1153e-14
        // Kw je 25 °C  1.0116e-14
        // Kw je 37 °C  2.2418e-14
        // Kw je 50 °C  5.3088e-14
        // Kw je 75 °C  19.4089e-14
        // Kw je 100 °C  54.3250e-14
        // ankaŭ la disociiĝaj konstancoj de acidoj en la supra listo estas ĉe ĉambra temperaturo
        // vi povas same doni dviantan valoron kiel parametro pK

        if (! pK) pK = AB.pKa(acido);

        // algoritmo por trovi la radikojn de kuba ekvacio laŭ http://www.1728.org/cubic2.htm
        const Ka = 1/10**pK;
        const a = 1;
        const b = Ka;
        const c = -(Kw + (Ka*am));
        const d = -Ka*Kw;

        const f = (3*c/a - b*b/(a*a))/3;
        const g = (2*b*b*b/(a*a*a) - 9*b*c/(a*a) + 27*d/a)/27;
        const h = g*g/4 + f*f*f/27;
        const i = Math.sqrt(g*g/4 - h);
        const j = Math.pow(i,1/3);
        const J = -g/(2*i);
        const k = Math.acos(J);

        const X1 = 2*j*Math.cos(k/3) - b/(3*a);
        const pH = -Math.log10(X1);
        return pH;        
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
     * Kalulas la pH-valoron en solvaĵo enhavanta acidon kiu disociiĝas al alia acido, ekz. H3PO4 al H2PO4^-
     * @param {object} acido1 donitaĵoj de acido1: {a: nomo, c: koncentriteco en mol/l, v: volumeno en l}
     * @param {object} acido2 donitaĵoj de acido2: {b: nomo, c: koncentriteco en mol/l, v: volumeno en l}
     */
     static pH2_2acidoj(acido1,acido2) {
        // kalkulu la du kvantojn en mol
        const n1 = acido1.n;
        const n2 = acido2.n;        

        //const pKa1 = AB.pKa(acido1.a);
        //return pKa1 - Math.log10(n2/n1);
        // vd. https://www.ausetute.com.au/polyproticacid.html
        const pKa2 = AB.pKa(acido2.a);
        return pKa2 - Math.log10(n1/n2);
    }

    /**
     * Kalkulas la pH-valoron en solvaĵo ĉe ekvivalentpunkto de plurprotona acido
     * @param {string} acido1 nomo de acido1
     * @param {string} acido2 nomo de acido2
     */
    static pH2_acidekvi(acido1,acido2) {
        const pKa1 = AB.pKa(acido1);
        const pKa2 = AB.pKa(acido2);
        return 0.5*(pKa1 + pKa2);
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

    /**
     * trovas por donita acido la respondan bazon kaj
     * aldonas al listo, se ĝi siavice estas amfolita, t.e.
     * acido rilate al OH- (t.e. kun Kb>0), daŭrigas per 
     * trovita acido ĝis ne plu troviĝas amfolita bazo
     * vd https://de.wikipedia.org/wiki/Ampholyt
     * @param {string} acido 
     * @returns listo de acidoj
     */
    static acidvico(acido) {
        const vico = [];
        let ea = AB.acido(acido);
        while (ea && ea[3]>0) { // responda Kb>0
            vico.push(ea[0]);
            const bazo = ea[2];
            // ĉu la responda bazo estas amfolita?
            ea = AB.acido(bazo);
        }
        return vico;
    }

    /**
     * trovas por donita bazo la respondan acidon kaj
     * aldonas al listo, se ĝi siavice estas amfolita, t.e.
     * bazo rilate al H3O+ (t.e. kun Ka>0), daŭrigas per 
     * trovita bazo ĝis ne plu troviĝas amfolita acido
     */
    static bazovico(bazo) {
        const vico = [];
        let eb = AB.bazo(bazo);
        while (eb && eb[1]>0) { // responda Ka>0
            vico.push(eb[2]);
            const acido = eb[0];
            // ĉu la responda acido estas amfolita?
            eb = AB.bazo(acido);
        }
        return vico;
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

    /**
     * Kalkulas vicon da pH-valoroj por plurprotona acido titrata per NaOH
     * KOREKTU: ĉe la marĝeno la valoroj estas ne homogenaj pro nevalideco de Hendersson-Hasselbalch-ekvacio
     * ĉe la intervalrando (do ekster la duonekvivalent-punkto)
     * bele rigardi tiun sciencajn diskutojn kiel oni povas ĝustigi tion:
     * https://bunsen.de/fileadmin/user_upload/media/Aspekte-Artikel/BM_5_2020_Unterricht_Hippler_Metcalfe.pdf
     * http://iqc.udg.edu/~vybo/DOCENCIA/QUIMICA/Henderson-Hasselbalch.pdf
     * 
     * @param {*} acido 
     * @param {*} vb 
     * @returns 
     */
    static acidtitrado_plurprotona(acido,vb) {
        let valoroj = [];
        const acidoj = AB.acidvico(acido.a);

        for (let v of vb) {
            // ni bezonas la proporcion de kvantoj por scii en kiu kurbo-parto
            // ni troviĝas
            const na = acido.c * acido.v;
            const nb = acido.c * v; // ni supozas uzi saman koncentriĝon de acido kaj OH-!
                // se ni volas permesi aliajn koncentriĝojn por la bazo, ni devos aldoni parametron supre!
            const n = nb/na;
            const N = Math.trunc(n);

            let pH;
            if (n==N && n>1 && n<acidoj.length) {
                // ekvipunkto
                pH = AB.pH2_acidekvi(acidoj[N-1],acidoj[N]);
                /*
            } else if (n<1) {
                pH = AB.pH2_acido(
                    acido,
                    {b:"OH-", v:v, c:acido.c})
            } else if (n<acidoj.length) {
                pH = AB.pH2_2acidoj(
                    {a:acidoj[N-1], c:acido.c, n:(N+1-n)*na},
                    {a:acidoj[N], n:(n-N)*na});
*/
                } else if (n<acidoj.length) {
                    const pKa = AB.pKa(acidoj[N]);
                    const t = (n-N);
                    pH = pKa - Math.log10((1-t)/t);

            // la sekvaj du ankoraŭ havas eraron, ĉu...?
            } else if (n==acidoj.length) {
                // lasta ekvivalentpunkto (kun la bazo)
                const pKa = AB.pKa(acidoj[acidoj.length-1]);
                pH = 14 - 0.5*(14 - pKa 
                        - Math.log10(0.5*na/(acido.v+v)));                    
            } else {
                // pli da bazo
                pH = AB.pH("OH-",(n-N)*na/(acido.v+v));
            }

/*                    
            } else {
                pH = AB.pH2_acido(
                    {a:acidoj[acidoj.length-1], c:acido.c, v:acido.v},
                    {b:"OH-", c:acido.c, v:v-(acidoj.length*acido.v)});
            }
            */
/*
            const pKa = AB.pKa(acido.a);

            // sen bazo pH dependas nur la acido
            if (n<0.5) {
                pH = AB.pH(acido.a, (na-nb)/(acido.v+v))
            } else if (n==0.5) {
                pH = pKa            
            } else if (n < 1) {
                // se na*acidoj.length < nb ni aplikas formulon por plurprotonaj acidoj
                pH =pKa - Math.log10(na/(nb-na));
            } else if (n == 1) {
                pH = pKa - Math.log10(na/(nb-na));
            } else if (n<1.5) {
                pH = AB.pH(acidoj[1], (2*na-nb)/(v))
            } else if (n==1.5) {
                const pK2 = AB.pKa(acidoj[1]);
                pH = 0.5*(pKa+pK2)
            } else {
                // daŭrigenda...
                pH = AB.pH2_acido(acido,{b:"OH-",v:v,c:acido.c});
            }
*/

            // aliokaze ni aplikas formulon por acido/bazo sed uzas la lastan
            // acidon en la vico en la kalkulo
            valoroj.push(pH)
        }
        return valoroj;
    }


}