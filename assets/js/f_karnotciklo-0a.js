/**
 * Simulas ciklon de Karnoto (laŭ Nicolas Léonard Sadi Carnot) kun ideala gaso.
 * La modelo konsistas el la gaso en la piŝtujo kaj la ekstera medio. 
 * Por la gaso ni uzas apartan klason, tiel principe oni povus anstataŭigi la idealan gason per iu alia.
 * 
 * La Karnot-ciklo uzas tri diversajn mediojn: varman, malvarman kaj varmizolitan.
 * 
 * Ni provizore uzas 1 molon da ideala gaso, kiu havas 24l ĉe normpremo/20°C (22,4l ĉe 73.15K)
 * kaj 48l ĉe 600°C. 
 */



class KCGaso {
    static norm_p = 101325; //1e5; // normpremo estas 1013 hPa
    static norm_T = 293.15; // normtemperaturo en K
    static R = 8.31446261815324; // universala gaskonstanto en J/K/mol
    static kappa = 5/3; // adiabata koeficiento

    /**
     * Kalkulas la volumenon depende de temperaturo, molkvanto kaj premo
     * el la ekvacio por ideala gaso
     * @param {*} temperaturo 
     * @param {*} premo 
     * @param {*} moloj 
     */
    static volumeno(temperaturo,premo,moloj=1) {
        return moloj*KCGaso.R*temperaturo / premo;
    }

    /**
     * KReas volumenon da ideala gaso. Se ne alie donita ni supozas heliumon (atommaso u=4).
     * @param {*} temperaturo 
     * @param {*} volumeno 
     * @param {*} premo 
     * @param {*} atommaso 
     */
    constructor(temperaturo=KCGaso.norm_T,volumeno) {
        this.temperaturo = temperaturo;
        this.volumeno = volumeno || KCGaso.volumeno(this.temperaturo,KCGaso.norm_p);
    }

    /**
     * Ŝanĝas la volumenon de la gaso izoterme, t.e. kun varminterŝanĝo kun la medio
     * tiel konservanta la internan energion
     * @param {*} dV 
     */
    dV_izoterma(dV) {
        this.volumeno += dV;
    }

    /**
     * Ŝanĝas ka volumenon adiabate, t.e. sen varminterŝanĝo kun la ekstero
     * vd. https://de.wikipedia.org/wiki/Adiabatische_Zustands%C3%A4nderung#Adiabaten_des_idealen_Gases
     * @param {*} dV 
     */
    dV_adiabata(dV) {
        this.temperaturo = this.temperaturo * Math.pow((this.volumeno/(this.volumeno+dV)),KCGaso.kappa-1);
        this.volumeno += dV;
    }

    /**
     * Ŝanĝu la temperaturon al T konservanta la internan energion, ni bezonas por korekti
     * troan kunpremon aŭ entendiĝon
     * @param {*} T 
     */
    T_adiabata(T) {
        this.volumeno = this.volumeno * Math.pow(this.temperaturo/T,1/(KCGaso.kappa-1));
        this.temperaturo = T;
    }

    /**
     * Redonas la premon de la gaso, kalkulitan el ĝia temperaturo kaj volumeno
     */
    premo() {
        return KCGaso.R * this.temperaturo / this.volumeno;
    }

    /**
     * Redonas entropidiferencon rilate al komenca volumeno de adiabata ŝanĝo
     */
    entropidiferenco(V0) {
        return -KCGaso.R * Math.log(this.volumeno/V0);
    }

    /**
     * Elskribas la nunan staton
     */
    log_stato() {
        console.log(`T: ${this.temperaturo.toFixed(2)} K; V: ${(this.volumeno*1000).toFixed(2)} l; p: ${(this.premo()/100).toFixed(2)} hPa`);
    }


}

class KCiklo {
    // Tk: temperaturkonserva, Qk: varmkonserva (adiabata)
    // V+ etendiĝo, V- kunpremiĝo
    // motora ciklo - paŝoj = ["Tk_V-","Qk_V-","Tk_V+","Qk_V+"];
    // varmpumpa ciklo - paŝoj = ["Qk_V-","Tk_V-","Qk_V+","Tk_V+"];
    static igV = 0.0224; // mola volumeno de ideala gaso = 22,4l
    static dV = 0.0001; // 0,1 litro

    constructor(T_malalta,T_alta,V12=KCiklo.igV/3,gaso) {
        this.gaso = gaso || new KCGaso(T_malalta);
        this.T_alta = T_alta;
        this.T_malalta = T_malalta;
        //this.izolita = ???
        this.paŝo = "Tk_V-";
        this.inversa = false;

        this.V0 = this.gaso.volumeno;
        this.V12 = V12; // volumeno, kie T-konserva kunpremo transiru al Q-konserva
        this.V34 = this.V0*Math.pow(T_malalta/T_alta,1/(KCGaso.kappa-1)); // volumeno, kie T-konserva etendiĝo transiru al Q-konserva (por la motora ciklo)
        this.V32 = this.V12*Math.pow(T_malalta/T_alta,1/(KCGaso.kappa-1)); // volumeno, kie T-konserva kunpremo transiru al Q-konserva etendiĝo (por la inversa varmpumpa ciklo)

        this.S0 = 0; // komencan entropion ni metas al 0
        this.VS0 = this.V0; // volumeno al kiu ni rilatigas la entropion

        this.kiam_sekva = undefined; // metu revok-funkcion kiam vi volas ekscii transirojn inter paŝoj 1,2,3,4,1
    }

    /**
     * Skribas la nunan staton
     */
    log_stato() {
        console.log(`paŝo ${this.paŝo}`);
        this.gaso.log_stato();
    }

    /**
     * Redonas la numeron de la paŝo
     */
    paŝsnro() {
        return this.ciklo.indexOf(this.paŝo);
    }

    /**
     * Transiro al venonta paŝo
     */
    sekva_paŝo(al) {
        this.log_stato();
        const de = this.paŝo;
        this.paŝo = al;
        if (this.kiam_sekva) this.kiam_sekva(de,al); // ekz-e 'debugger';
    }

    /**
     * Depende de la paŝo redonas la medion (varma, malvarma, izolita)
     */
    medio() {
        if (this.paŝo.startsWith("Qk")) return "izolita";
        if (this.inversa && this.paŝo == "Tk_V+" || !this.inversa && this.paŝo == "Tk_V-") {
            return "malvarma"
        } else {
            return "varma"
        }
    }

    /**
     * Redonas entropidiferencon depende de la paŝo
     */
    entropio() {
        if (this.paŝo.startsWith("Qk")) {
            return this.S0;
        } else {
            return this.S0 + this.gaso.entropidiferenco(this.VS0)
        };
    }

    /**
     * Iteracias tra la ciklo en antaŭa direkto, t.e. produktante movon el varmdiferenco
     */
    iteracio_motora() {
        switch (this.paŝo) {
        case "Tk_V-": 
            if (this.gaso.volumeno > this.V12) {
                this.gaso.dV_izoterma(-KCiklo.dV);
            }
            if (this.gaso.volumeno <= this.V12) {
                this.S0 = this.entropio();
                this.sekva_paŝo("Qk_V-");
            } else break;

        case "Qk_V-":
            if (this.gaso.temperaturo < this.T_alta) {
                this.gaso.dV_adiabata(-KCiklo.dV);
            }
            if (this.gaso.temperaturo >= this.T_alta) {
                // la temperaturo eble devias, do ni alĝustigu
                this.gaso.T_adiabata(this.T_alta);
                this.VS0 = this.gaso.volumeno;
                this.sekva_paŝo("Tk_V+");
            } else break;                                

        case "Tk_V+": 
            if (this.gaso.volumeno < this.V34) {
                this.gaso.dV_izoterma(KCiklo.dV);
            }
            if (this.gaso.volumeno >= this.V34) {
                this.S0 = this.entropio();
                this.sekva_paŝo("Qk_V+");
            } else break;            

        case "Qk_V+":
            if (this.gaso.temperaturo > this.T_malalta) {
                this.gaso.dV_adiabata(KCiklo.dV);                
            }
            if (this.gaso.temperaturo <= this.T_malalta) {
                // la temperaturo eble devias, do ni alĝustigu
                this.gaso.T_adiabata(this.T_malalta);
                this.VS0 = this.gaso.volumeno;
                this.sekva_paŝo("Tk_V-");
            }
        }
    }


    /**
     * Iteracias tra la ciklo inverse, t.e. pumpante varmon de la malvarma al la varma medio
     * helpe de movoforto
     */
    iteracio_varmpumpa() {
        switch (this.paŝo) {

            case "Qk_V-":
                if (this.gaso.temperaturo < this.T_alta) {
                    this.gaso.dV_adiabata(-KCiklo.dV);
                }
                if (this.gaso.temperaturo >= this.T_alta) {
                    // la temperaturo eble devias, do ni alĝustigu
                    this.gaso.T_adiabata(this.T_alta);
                    this.VS0 = this.gaso.volumeno;
                    this.sekva_paŝo("Tk_V-");
                } else break;                                
    
            case "Tk_V-": 
                if (this.gaso.volumeno > this.V32) {
                    this.gaso.dV_izoterma(-KCiklo.dV);
                }
                if (this.gaso.volumeno <= this.V32) {
                    this.S0 = this.entropio();
                    this.sekva_paŝo("Qk_V+");
                } else break;                

            case "Qk_V+":
                if (this.gaso.temperaturo > this.T_malalta) {
                    this.gaso.dV_adiabata(KCiklo.dV);                
                }
                if (this.gaso.temperaturo <= this.T_malalta) {
                    // la temperaturo eble devias, do ni alĝustigu
                    this.gaso.T_adiabata(this.T_malalta);
                    this.VS0 = this.gaso.volumeno;
                    this.sekva_paŝo("Tk_V+");
                } else break;                 

            case "Tk_V+": 
                if (this.gaso.volumeno < this.V0) {
                    this.gaso.dV_izoterma(KCiklo.dV);
                }
                if (this.gaso.volumeno >= this.V0) {
                    this.S0 = this.entropio();
                    this.sekva_paŝo("Qk_V-");
                }                       
        }
    }    
}