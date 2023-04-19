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
    static igV = 0.0224; // mola volumeno de ideala gaso = 22,4l
    static dV = 0.0001; // 0,1 litro

    static motora_ciklo = ["Tk_V-","Qk_V-","Tk_V+","Qk_V+"];
    static varmpumpa_ciklo = ["Qk_V-","Tk_V-","Qk_V+","Tk_V+"];

    constructor(T_malalta,T_alta,inversa=false,V12=KCiklo.igV/3,gaso) {
        this.T_alta = T_alta;
        this.T_malalta = T_malalta;

        this.inversa = inversa;
        this.ciklo = inversa? KCiklo.varmpumpa_ciklo : KCiklo.motora_ciklo;
        this.paŝo = this.ciklo[0];

        this.gaso = gaso || new KCGaso(T_malalta);

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
     * Transiro al venonta paŝo
     */
    sekva_paŝo() {
        this.log_stato();
        // kio estas la nuna kaj la sekva paŝoj?
        const de = this.paŝo;
        const i = this.ciklo.indexOf(de);
        const al = this.ciklo[(i+1)%4];
        // permesu apartajn agojn ĉe transiro
        if (this.kiam_sekva) this.kiam_sekva(de,al); // ekz-e 'debugger';
        // sekva paŝo
        this.paŝo = al;
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
     * Faras adiabatan volumenŝanĝon. Se ni ne jam atingis limtemperaturon
     * redonas 'false', se ni atingis limtemperaturon, redonas 'true'
     * @param {*} dV 
     */
    dV_adiabata(dV) {
        // adaptu la volumenon dum la temperaturo estas inter la limoj
        if (dV>0 && this.gaso.temperaturo>this.T_malalta 
         || dV<0 && this.gaso.temperaturo<this.T_alta) {
                this.gaso.dV_adiabata(dV);
        }        
        // se ni intertempe superis limon ni adaptu por reveni al ĝi        
        if (this.gaso.temperaturo > this.T_alta) {
            this.gaso.T_adiabata(this.T_alta);
            return true;
        } else if (this.gaso.temperaturo < this.T_malalta) {
            this.gaso.T_adiabata(this.T_malalta);
            return true;
        } 
        return (dV>0 && this.gaso.temperaturo<=this.T_malalta 
            || dV<0 && this.gaso.temperaturo>=this.T_alta);   
    }

    /**
     * Faras izoterman volumenŝanĝon
     * @param {*} dV 
     * @param {*} Vlim la lima volumeno
     * @returns redonas 'true' se ni atingis liman volumenon
     */
    dV_izoterma(dV,Vlim) {
        if (dV>0 && this.gaso.volumeno < Vlim
         || dV<0 && this.gaso.volumeno > Vlim) {
            this.gaso.dV_izoterma(dV);
        }
        return (dV>0 && this.gaso.volumeno >= Vlim
         || dV<0 && this.gaso.volumeno <= Vlim);
    }

    /**
     * Iteracias tra la ciklo
     */
    iteracio() {
        switch (this.paŝo) {
        case "Tk_V-": 
            if (this.dV_izoterma(-KCiklo.dV,
                    this.inversa?this.V32:this.V12)) { 
                this.S0 = this.entropio();
                this.sekva_paŝo();
            };
            break;

        case "Tk_V+": 
            if (this.dV_izoterma(KCiklo.dV, 
                    this.inversa?this.V0:this.V34)) { 
                this.S0 = this.entropio();
                this.sekva_paŝo();
            };
            break;            

        case "Qk_V-":
            if (this.dV_adiabata(-KCiklo.dV)) {
                this.VS0 = this.gaso.volumeno;
                this.sekva_paŝo();
            };
            break;                                


        case "Qk_V+":
            if (this.dV_adiabata(KCiklo.dV)) {
                this.VS0 = this.gaso.volumeno;
                this.sekva_paŝo();
            }
        }
    }

}