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
        this.entropio = 0;
        this.laboro = 0; // laboro, negativa estas enkondukita, pozitiva elkondukita
        this.varmo = 0; // varmo, pozitiva estas enkondukita, negativa elkondukita
        this.lasta_stato = {}; // memoras lastan staton por iuj kalkuloj aŭ ebleco reiri
    }

    /**
     * Memoras la aktualan staton por poste kalkuli diferencojn aŭ reiri
     */
    lasta() {
        this.lasta_stato = {
            temperaturo: this.temperaturo, 
            volumeno: this.volumeno, 
            entropio: this.entropio,
            varmo: this.varmo,
            laboro: this.laboro
        };
    }

    /**
     * Remetas al stato lasta
     */
    remetu() {
        const ls = this.lasta_stato;
        this.temperaturo = lthis.ls.temperaturo;
        this.volumeno = this.ls.volumeno;
        this.entropio = this.ls.entropio;
        this.varmo = this.ls.varmo;
        this.laboro = this.ls.laboro;
    }

    /**
     * Ŝanĝas la volumenon de la gaso izoterme, t.e. kun varminterŝanĝo kun la medio
     * tiel konservanta la internan energion
     * @param {*} dV 
     */
    dV_Tkonserva(dV) {
        this.lasta();
        // entropiŝanĝo, vd.  vd https://de.wikipedia.org/wiki/Entropie#Entropiezunahme_bei_irreversibler_und_reversibler_isothermer_Expansion
        const dS = -this.moloj*PGaso.R * Math.log((this.volumeno+dV)/this.volumeno);
        // Q = dS*T = -W
        // vd https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/Thermodynamic_Cycles/Carnot_Cycle
        this.volumeno += dV;
        this.entropio += dS;
        this.varmo += this.temperaturo*dS;
        this.laboro -= this.temperaturo*dS;
    }

    /**
     * Ŝanĝas ka volumenon adiabate, t.e. sen varminterŝanĝo kun la ekstero
     * vd. https://de.wikipedia.org/wiki/Adiabatische_Zustands%C3%A4nderung#Adiabaten_des_idealen_Gases
     * @param {*} dV 
     */
    dV_adiabata(dV) {
        this.lasta();
        const T = this.temperaturo * Math.pow((this.volumeno/(this.volumeno+dV)),PGaso.kappa-1);
        // entropio kaj varmo ne ŝanĝigas
        this.laboro += this.moloj * PGaso.CmV * (T - this.temperaturo);
        this.temperaturo = T;
        this.volumeno += dV;
    }

    /** 
     * Ŝanĝas la premon de la gaso izoterme, t.e. kun varminterŝanĝo kun la medio
     * tiel konservanta la internan energion
     */
    dp_Tkonserva(dp) {
        this.lasta();
        const premo = this.premo() + dp;
        // entropiŝanĝo, vd
        // https://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/564-isotherme-zustandsaenderung.html
        const dS =  this.moloj * PGaso.R * Math.log(this.premo()/premo);
        // ni ne povas rekte ŝangi la premon, sed nur la volumenon
        // kiun ni elkalkulas per la statekvacio de la ideala gaso
        this.volumeno = PGaso.volumeno(this.temperaturo,premo,this.moloj);
        this.entropio += dS;
        this.varmo += this.temperaturo*dS;
        this.laboro -= this.temperaturo*dS;
    }

    /**
     * Ŝanĝas la premon de la gaso adiabate, t.e. sen varminterŝanĝo kun la medio
     * tiel konservanta la entropion
     */
    dp_adiabata(dp) {
        this.lasta();
        const p = this.premo() + dp;
        const V = PGaso.volumeno(this.temperaturo,p,this.moloj);
        // ni aplikas adiabatan ekvacion por eltrovi la novan temepraturon
        const T = this.temperaturo * Math.pow((this.volumeno/V),PGaso.kappa-1);
        // entropio kaj varmo ne ŝanĝigas
        this.laboro += this.moloj * PGaso.CmV * (T - this.temperaturo);
        this.temperaturo = T;
        this.volumeno = V;
    }

    /**
     * Adaptu la temperaturon konservante la volumenon
     */
    dT_Vkonserva(dT) {
        this.lasta();
        // entropiŝanĝo
        // vd hhttps://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/568-isochore-zustandsaenderung.html
        const dS =  this.moloj * PGaso.CmV * Math.log((this.temperaturo+dT)/this.temperaturo)
        this.temperaturo += dT;
        this.entropio += dS;       
    }

    /**
     * Adaptu la temperaturon konservante la premon
     */
    dT_pkonserva(dT) {
        this.lasta();
        const T = this.temperaturo + dT;
        // entropiŝanĝo
        // vd https://www.ahoefler.de/maschinenbau/thermodynamik-waermelehre/entropie/spezielle-prozesse/569-isobare-zustandsaenderung.html
        const dS = this.moloj * PGaso.Cmp * Math.log((this.temperaturo+dT)/this.temperaturo);     
        const V = PGaso.volumeno(T,this.premo(),this.moloj);        
        this.entropio += dS;
        this.laboro = this.premo() * (V-this.volumeno);
        this.varmo += this.moloj * PGaso.Cmp * (T-this.temperaturo);
        this.temperaturo = T;
        this.volumeno = V;
    }

    /**
     * Redonas la premon de la gaso, kalkulitan el ĝia temperaturo kaj volumeno
     */
    premo() {
        return this.moloj * PGaso.R * this.temperaturo / this.volumeno;
    }

    /**
     * Redonas la internan energion de la ideala gaso
     * @returns 
     */
    energio() {
        return 3/2 * this.moloj * PGaso.R * this.temperaturo;
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
        this.T_min = 200;
        this.T_max = 600;

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
        //this.enhavo = 24; // dm³, t.e. l; 1mol da ideala gaso en 100kPa/293.15K = ĉ. 24l
        //this.medio_temperaturo = 273.15;

        // po unu grando povas esti konservata: varmo, temperaturo, premo, volumeno
        this.konservata = "varmo"; // t.e. izolita, sen varminterŝanĝo
    }

    /**
     * Donas koloron al temperatur-valoroj inter T1 kaj T2
     */
    Tkoloro(T,l=45) {
        const h = Diagramo.kolorvaloro(T,this.T_min*0.99,this.T_max*1.01);
        return Diagramo.hsl2hex(h,90,l);
    }

    desegnu() {
        this.dgr.viŝu();

        const LRG = this.dgr.larĝo();
        const ALT = this.dgr.alto();
        const x1 = (LRG-this.larĝo)/2;
        const x2 = x1 + this.larĝo;
        const y =  ALT - this.fundo - this.gaso.volumeno*1e3*this.l_px; 
        const dy = ALT - this.fundo - y;

        this.d_medio(LRG,ALT);
        this.d_piŝtujo(LRG,ALT,x1,x2);
        this.d_enhavo(LRG,ALT,x1,y,dy);
        this.d_piŝto(LRG,ALT,x1,y);
        this.d_valoroj(LRG,ALT);
    }

    d_medio(LRG,ALT) {
        // ĉe temperaturkonservaj procezoj la medio ĉiam havu la saman temperaturon kiel la gaso mem
        // en aliaj ni uzas ĉe izolitan piŝtujon, tiam ni grizigas la medion
        const koloro = (this.konservata.startsWith("varmo"))? "#ccc"
            : this.Tkoloro(this.gaso.temperaturo); //this.Tkoloro(this.medio_temperaturo,200,600);
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
        const k1 = this.Tkoloro(this.gaso.temperaturo,60);
        const k2 = this.Tkoloro(this.gaso.temperaturo,45);
        const k3 = this.Tkoloro(this.gaso.temperaturo,30);
        this.dgr.rektangulo_h3k(x1,y,this.larĝo,dy,k1,k2,k3);
    }

    d_piŝto(LRG,ALT,x1,y) {
        //dgr.linio(101,200,199,200,"#bbb",10);
        // kovrilo
        this.dgr.rektangulo_h3k(x1+1,y-10,this.larĝo-2,10,"#eee","#bbb","#999");
        // pezaĵo aŭ stango
        this.dgr.rektangulo_h3k(x1+1+2/5*this.larĝo,0,1/5*this.larĝo,y-10,"#eee","#bbb","#999");
    }

    d_valoroj(LRG,ALT) {
        const V = nombro(this.gaso.volumeno*1000,3,'dm³');
        const p = nombro(this.gaso.premo()/1000,3,'kPa');
        const T = nombro(this.gaso.temperaturo,5,'K');
        this.dgr.teksto_y(3,ALT-60,`V: ${V}`);
        this.dgr.teksto_y(3,ALT-40,`p: ${p}`);
        this.dgr.teksto_y(3,ALT-20,`T: ${T}`);
    }

    /**
     * altigu/malaltigu la premon je dp Pa
     */
    premu(dp) {
        if (this.konservata.startsWith("varmo"))
            this.gaso.dp_adiabata(dp);
        else if (this.konservata.startsWith("temperaturo"))
            this.gaso.dp_Tkonserva(dp);
        else
            console.error("ni ne povas adapti la premon, se konservata = "+this.konservata)

        this.desegnu();
    }

    /**
     * altigu/malaltigu la temperaturon je dT K
     */
    varmigu(dT) {
        if (this.konservata.startsWith("volumeno"))
            this.gaso.dT_Vkonserva(dT);
        else if (this.konservata.startsWith("premo"))
            this.gaso.dT_pkonserva(dT);
        else
            console.error("ni ne povas varmigi/malvarmigi la temperaturon, se konservata = "+this.konservata);

        this.desegnu();
    }

}
