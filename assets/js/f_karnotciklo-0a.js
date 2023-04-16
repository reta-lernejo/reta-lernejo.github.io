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
    static norm_p = 1e5; // normpremo estas 1000 hPa
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
     * Elskribas la nunan staton
     */
    log_stato() {
        console.log(`T: ${this.temperaturo.toFixed(2)} K; V: ${(this.volumeno*1000).toFixed(2)} l; p: ${(this.premo()/100).toFixed(2)} hPa`);
    }


}

class KCiklo {
    // Tk: temperaturkonserva, Qk: varmkonserva (adiabata)
    // V+ etendiĝo, V- kunpremiĝo
    static paŝoj = ["Tk_V-","Qk_V-","Tk_V+","Qk_V+"];
    static igV = 0.0224; // mola volumeno de ideala gaso = 22,4l
    static dV = 0.0002; // 1 litro

    constructor(T_malalta,T_alta,V34=2/3*KCiklo.igV,V12=2/3*KCiklo.igV,gaso) {
        this.gaso = gaso || new KCGaso(T_malalta);
        this.T_alta = T_alta;
        this.T_malalta = T_malalta;
        //this.izolita = ???
        this.paŝo = KCiklo.paŝoj[0];

        this.V12 = V12; // volumeno, kie T-konserva kunpremo transiru al Q-konserva
        this.V34 = V34; // volumeno, kie T-konserva etendiĝo transiru al Q-konserva
    }

    /**
     * Skribas la nunan staton
     */
    log_stato() {
        console.log(`paŝo ${this.paŝo}`);
        this.gaso.log_stato();
    }

    /**
     * Iteracias tra la ciklo
     */
    iteracio() {
        switch (this.paŝo) {
        case "Tk_V-": 
            if (this.gaso.volumeno > this.V12) {
                this.gaso.dV_izoterma(-KCiklo.dV);
            }
            if (this.gaso.volumeno <= this.V12) {
                this.paŝo = "Qk_V-";
                this.log_stato();
                // debugger;
            } else break;
        case "Qk_V-":
            if (this.gaso.temperaturo < this.T_alta) {
                this.gaso.dV_adiabata(-KCiklo.dV);
            }
            if (this.gaso.temperaturo >= this.T_alta) {
                // la temperaturo eble devias, do ni alĝustigu
                this.gaso.T_adiabata(this.T_alta);
                // debugger;
                this.log_stato();
                this.paŝo = "Tk_V+"; 
            } else break;                                

        case "Tk_V+": 
            if (this.gaso.volumeno < this.V34) {
                this.gaso.dV_izoterma(KCiklo.dV);
            }
            if (this.gaso.volumeno >= this.V34) {
                //debugger;
                this.log_stato();
                this.paŝo = "Qk_V+";     
            } else break;            

        case "Qk_V+":
            if (this.gaso.temperaturo > this.T_malalta) {
                this.gaso.dV_adiabata(KCiklo.dV);
                break;                    
            }
            if (this.gaso.temperaturo <= this.T_malalta) {
                // la temperaturo eble devias, do ni alĝustigu
                this.gaso.T_adiabata(this.T_malalta);
                //debugger;
                this.log_stato();
                this.paŝo = "Tk_V-"; 
            }
        }
    }
}