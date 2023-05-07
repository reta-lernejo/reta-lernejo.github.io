/**
 * Provizas diversajn kalkulojn por termodinamika sistemo kun ideala gaso
 */

class PGaso {
    static norm_p = 101325; //1e5; // normpremo estas 1013 hPa
    static norm_T = 293.15; // normtemperaturo en K
    static R = 8.31446261815324; // universala gaskonstanto en J/K/mol
    static kappa = 5/3; // adiabata koeficiento

    // unumolaj varmkapacitoj (por konstanta volumeno, konstanta premo respektive)
    static CmV = 3/2*PGaso.R;
    static Cmp = 5/2*PGaso.R;
    /**
     * Kalkulas la volumenon depende de temperaturo, molkvanto kaj premo
     * el la ekvacio por ideala gaso
     * @param {*} temperaturo 
     * @param {*} premo 
     * @param {*} moloj 
     */
    static volumeno(temperaturo,premo,moloj=1) {
        return moloj*PGaso.R*temperaturo / premo;
    }

    /**
     * KReas volumenon da ideala gaso. Se ne alie donita ni supozas heliumon (atommaso u=4).
     * @param {*} temperaturo 
     * @param {*} volumeno 
     * @param {*} premo 
     * @param {*} atommaso 
     */
    constructor(temperaturo=PGaso.norm_T,volumeno,moloj=1) {
        this.temperaturo = temperaturo;
        this.moloj = moloj;
        this.volumeno = volumeno || PGaso.volumeno(this.temperaturo,PGaso.norm_p,moloj);
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
        this.temperaturo = this.temperaturo * Math.pow((this.volumeno/(this.volumeno+dV)),PGaso.kappa-1);
        this.volumeno += dV;
    }

    /**
     * Ŝanĝu la temperaturon al T konservanta la internan energion, ni bezonas por korekti
     * troan kunpremon aŭ entendiĝon
     * @param {*} T 
     */
    T_adiabata(T) {
        this.volumeno = this.volumeno * Math.pow(this.temperaturo/T,1/(PGaso.kappa-1));
        this.temperaturo = T;
    }

    /**
     * Redonas la premon de la gaso, kalkulitan el ĝia temperaturo kaj volumeno
     */
    premo() {
        return PGaso.R * this.temperaturo / this.volumeno;
    }

    /**
     * Redonas entropidiferencon rilate al komenca volumeno de adiabata ŝanĝo
     */
    entropidiferenco(V0) {
        return -this.moloj*PGaso.R * Math.log(this.volumeno/V0);
    }

    /**
     * Redonas la laboron faritan per izoterma volumenŝanĝo. La ŝanĝo de interna energio kaj entalpio
     * estas egala al tiu. 
     * vd https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/Thermodynamic_Cycles/Carnot_Cycle
     */
    laboro_izoterma(V0) {
       return -this.moloj*PGaso.R*this.temperaturo*Math.log(this.volumeno/V0);
    }

    /**
     * Redonas la laboron faritan ĉe adiabata volumenŝanĝo
     */
    laboro_adiabata(T0) {
        return this.moloj*PGaso.CmV * (this.temperaturo - T0);
    }

    /**
     * Redonas la varmoŝanĝon dum izoterma volumenŝanĝo
     * vd https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/Thermodynamic_Cycles/Carnot_Cycle
     */
    varmo_izoterma(V0) {
        return this.moloj*PGaso.R*this.temperaturo*Math.log(this.volumeno/V0);
    }

    /**
     * Redonas la internan energiŝanĝon ĉe adiabata volumenŝanĝo (samgranda kiel la laboro)
     * @param {*} T0 
     * @returns 
     */
    energiŝanĝo_adiabata(T0) {
        return this.moloj*PGaso.CmV * (this.temperaturo - T0);
    }

    /**
     * Elskribas la nunan staton
     */
    log_stato() {
        console.log(`T: ${this.temperaturo.toFixed(2)} K; V: ${(this.volumeno*1000).toFixed(2)} l; p: ${(this.premo()/100).toFixed(2)} hPa`);
    }
}

class Piŝto {

    /**
     * Kreas novan dgr. de piŝto en piŝtujo
     * @param {*} dgr la diagramo por desegni
     * @param {*} gaso la gaso en la piŝtujo
     */
    constructor(dgr,gaso) {
        this.dgr = dgr;
        this.gaso = gaso || new PGaso();
        this.larĝo = 100;
        this.alto = 260;
        // alteco de piŝto super la fundo
        this.pozicio = this.alto-40; // - 1000*V*sk; // 1000l = 1m³, ni sk-obligas tiel, ke
           // alteco de piŝto super la fundo (ĉe 360px)
        // provizore, poste kalkulu
    }

    /**
     * Donas koloron al temperatur-valoroj inter T1 kaj T2
     */
    Tkoloro(T,T1,T2) {
        const h = Diagramo.kolorvaloro(T,T1*0.99,T2*1.01);
        return Diagramo.hsl2hex(h,90,45);
    }

    desegnu() {
        this.dgr.viŝu();
        this.d_piŝtujo();
        this.d_piŝto();
    }

    d_piŝtujo() {
        const LRG = this.dgr.larĝo();
        const ALT = this.dgr.alto();

        const x1 = (LRG-this.larĝo)/2;
        const x2 = x1 + this.larĝo;

        // gasujo
        const koloro = this.Tkoloro(this.gaso.temperaturo,200,600);
        this.dgr.rektangulo(x1,this.larĝo,this.alto-40,"#fff");
        this.dgr.rektangulo(x1,this.pozicio,this.larĝo,this.alto-40-this.pozicio,koloro);
        this.dgr.linio(x1,0,x1,this.alto-40);
        this.dgr.linio(x1,this.alto-40,x2,this.alto-40);
        this.dgr.linio(x2,0,x2,this.alto-40);
    }

    d_piŝto() {
        const LRG = this.dgr.larĝo();
        const ALT = this.dgr.alto();
        const x1 = (LRG-this.larĝo)/2-1;
        //dgr.linio(101,200,199,200,"#bbb",10);
        // kovrilo
        this.dgr.rektangulo_h3k(x1,this.pozicio-10,this.larĝo-2,10,"#eee","#bbb","#999");
        // pezaĵo aŭ stango
        this.dgr.rektangulo_h3k(x1+this.larĝo/5,this.pozicio-10-80,3/5*this.larĝo,80,"#eee","#bbb","#999");
    }

}
