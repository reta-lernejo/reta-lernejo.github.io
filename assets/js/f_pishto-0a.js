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

    // kalkuli inter piŝta maso kaj pista premo, ni ĉiam aldonas atmosferan premon
    static g = 9.8; // tera gravitkonstanto m/s²
    static premo(maso,areo) { return 1e5 + maso * Piŝto.g / areo };
    static maso(premo,areo) { return (premo-1e5) * areo / Piŝto.g };
    static forto(maso) { return maso * Piŝto.g };

    /**
     * Kreas novan dgr. de piŝto en piŝtujo
     * @param {*} dgr la diagramo por desegni
     * @param {*} gaso la gaso en la piŝtujo
     */
    constructor(dgr,gaso) {
        this.dgr = dgr;
        this.gaso = gaso || new PGaso();
        this.fundo = 20; // fundo de la piŝtujo en px, t.e. 0l = malplena
        this.larĝo = 100;

        // la faktoron px -> dm ni kalkulas el la volumenformulo de cilindro
        // tiel, ke por 20 l validas alto = diametro
        const LITROJ = 20;
        this.diametro = Math.pow(4*LITROJ/Math.PI,1/3); // en dm
        // areo en m², por kalkuli inter piŝta pezo kaj premo
        this.areo = Math.PI/4*this.diametro*this.diametro/100;

        // devus esti 0 komence...! Ni bezonos 6,8 kN (694kg) por 1 atm 
        this.maso = Piŝto.maso(1e5,this.areo);

        // skalfaktoro por kalkuli inter px kaj dm
        this.dm_px = this.larĝo / this.diametro;
        // skalfaktoro por y-koordinatoj: 1 litro = l_px
        this.l_px = this.larĝo / LITROJ; 

        // alteco de piŝto super la fundo
        this.enhavo = 24; // dm³, t.e. l; 1mol da ideala gaso en 100kPa/293.15K = ĉ. 24l
        this.medio_temperaturo = 273.15;
        this.izolita = true;

    }

    /**
     * Donas koloron al temperatur-valoroj inter T1 kaj T2
     */
    Tkoloro(T,T1,T2,l=45) {
        const h = Diagramo.kolorvaloro(T,T1*0.99,T2*1.01);
        return Diagramo.hsl2hex(h,90,l);
    }

    desegnu() {
        this.dgr.viŝu();

        const LRG = this.dgr.larĝo();
        const ALT = this.dgr.alto();
        const x1 = (LRG-this.larĝo)/2;
        const x2 = x1 + this.larĝo;
        const y =  ALT - this.fundo - this.enhavo*this.l_px; 
        const dy = ALT - this.fundo - y;

        this.d_medio(LRG,ALT);
        this.d_piŝtujo(LRG,ALT,x1,x2);
        this.d_enhavo(LRG,ALT,x1,y,dy);
        this.d_piŝto(LRG,ALT,x1,y);
    }

    d_medio(LRG,ALT) {
        const koloro = (this.izolita)? "#ccc" : this.Tkoloro(this.medio_temperaturo,200,600);
        this.dgr.rektangulo(0,0,LRG,ALT,koloro);
    }

    d_piŝtujo(LRG,ALT,x1,x2) {
        // gasujo
        //this.dgr.rektangulo(x1,0,this.larĝo,ALT-this.fundo,"#fff");
        //this.dgr.rektangulo_h3k(x1,0,this.larĝo,ALT-this.fundo,"#999","#bbb","#eee");
        this.dgr.rektangulo_h3k(x1,0,this.larĝo,ALT-this.fundo,"#ccc","#bbb","#aaa");
        this.dgr.linio(x1,0,x1,ALT-this.fundo);
        this.dgr.linio(x1,ALT-this.fundo,x2,ALT-this.fundo);
        this.dgr.linio(x2,0,x2,ALT-this.fundo);
    }

    d_enhavo(LRG,ALT,x1,y,dy) {
        const k1 = this.Tkoloro(this.gaso.temperaturo,200,600,60);
        const k2 = this.Tkoloro(this.gaso.temperaturo,200,600,45);
        const k3 = this.Tkoloro(this.gaso.temperaturo,200,600,30);
        this.dgr.rektangulo_h3k(x1,y,this.larĝo,dy,k1,k2,k3);
    }

    d_piŝto(LRG,ALT,x1,y) {
        //dgr.linio(101,200,199,200,"#bbb",10);
        // kovrilo
        this.dgr.rektangulo_h3k(x1+1,y-10,this.larĝo-2,10,"#eee","#bbb","#999");
        // pezaĵo aŭ stango
        this.dgr.rektangulo_h3k(x1+1+2/5*this.larĝo,0,1/5*this.larĝo,y-10,"#eee","#bbb","#999");
    }

}
