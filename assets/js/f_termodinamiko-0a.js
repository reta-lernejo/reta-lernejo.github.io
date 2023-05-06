/**
 * Provizas diversajn kalkulojn por termodinamika sistemo kun ideala gaso
 */

class TDGaso {
    static norm_p = 101325; //1e5; // normpremo estas 1013 hPa
    static norm_T = 293.15; // normtemperaturo en K
    static R = 8.31446261815324; // universala gaskonstanto en J/K/mol
    static kappa = 5/3; // adiabata koeficiento

    // unumolaj varmkapacitoj (por konstanta volumeno, konstanta premo respektive)
    static CmV = 3/2*KCGaso.R;
    static Cmp = 5/2*KCGaso.R;
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
    constructor(temperaturo=KCGaso.norm_T,volumeno,moloj=1) {
        this.temperaturo = temperaturo;
        this.moloj = moloj;
        this.volumeno = volumeno || KCGaso.volumeno(this.temperaturo,KCGaso.norm_p,moloj);
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
        return -this.moloj*KCGaso.R * Math.log(this.volumeno/V0);
    }

    /**
     * Redonas la laboron faritan per izoterma volumenŝanĝo. La ŝanĝo de interna energio kaj entalpio
     * estas egala al tiu. 
     * vd https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/Thermodynamic_Cycles/Carnot_Cycle
     */
    laboro_izoterma(V0) {
       return -this.moloj*KCGaso.R*this.temperaturo*Math.log(this.volumeno/V0);
    }

    /**
     * Redonas la laboron faritan ĉe adiabata volumenŝanĝo
     */
    laboro_adiabata(T0) {
        return this.moloj*KCGaso.CmV * (this.temperaturo - T0);
    }

    /**
     * Redonas la varmoŝanĝon dum izoterma volumenŝanĝo
     * vd https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/Thermodynamic_Cycles/Carnot_Cycle
     */
    varmo_izoterma(V0) {
        return this.moloj*KCGaso.R*this.temperaturo*Math.log(this.volumeno/V0);
    }

    /**
     * Redonas la internan energiŝanĝon ĉe adiabata volumenŝanĝo (samgranda kiel la laboro)
     * @param {*} T0 
     * @returns 
     */
    energiŝanĝo_adiabata(T0) {
        return this.moloj*KCGaso.CmV * (this.temperaturo - T0);
    }

    /**
     * Elskribas la nunan staton
     */
    log_stato() {
        console.log(`T: ${this.temperaturo.toFixed(2)} K; V: ${(this.volumeno*1000).toFixed(2)} l; p: ${(this.premo()/100).toFixed(2)} hPa`);
    }
}
