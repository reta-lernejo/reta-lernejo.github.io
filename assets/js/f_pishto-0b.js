

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
    constructor(dgr,gasstato) {
        this.dgr = dgr;
        this.gaso = gasstato;
        this.fundo = 20; // fundo de la piŝtujo en px, t.e. 0l = malplena
        this.larĝo = 100;
        this.T_min = 200;
        this.T_max = 600;
        this.p_min = 0;
        this.p_max = 1e6;
        this.V_min = 0.001;
        this.V_max = 1;

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
        const y =  ALT - this.fundo - this.gaso.V*1e3*this.l_px; 
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
            : this.Tkoloro(this.gaso.T); //this.Tkoloro(this.medio_temperaturo,200,600);
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
        const k1 = this.Tkoloro(this.gaso.T,60);
        const k2 = this.Tkoloro(this.gaso.T,45);
        const k3 = this.Tkoloro(this.gaso.T,30);
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
        const dgr = this.dgr;
        const V = dgr.nombro(this.gaso.V*1000,3,'dm³');
        const p = dgr.nombro(this.gaso.p/1000,3,'kPa');
        const T = dgr.nombro(this.gaso.T,5,'K');
        dgr.rektangulo(2,ALT-70,75,65,'#ccc');
        dgr.teksto_y(3,ALT-60,`V: ${V}`);
        dgr.teksto_y(3,ALT-40,`p: ${p}`);
        dgr.teksto_y(3,ALT-20,`T: ${T}`);
    }

    /**
     * Kontrolas ĉu stato estas ene de la permesitaj limoj
     */
    valida(stato) {
        return (
            stato.V >= this.V_min && stato.V <= this.V_max
            && stato.p >= this.p_min && stato.p <= this.p_max
            && stato.T >= this.T_min && stato.T <= this.T_max
        );        
    }

    /**
     * altigu/malaltigu la premon je dp Pa
     */
    premu(dp,nur_teste) {
        let nova_stato;
        if (this.konservata.startsWith("varmo"))
            nova_stato = this.gaso.nova_stato("dp|S",dp);
        else if (this.konservata.startsWith("temperaturo"))
            nova_stato = this.gaso.nova_stato("dp|T",dp);
        else if (!nur_teste)
            console.error("ni ne povas adapti la premon, se konservata = "+this.konservata);
        else
            return false;

        const valida = this.valida(nova_stato);

        if (valida && !nur_teste) {
            this.gaso = nova_stato;
            this.desegnu();
            return true;
        } 

        return valida;
    }

    /**
     * altigu/malaltigu la temperaturon je dT K
     */
    varmigu(dT,nur_teste) {
        let nova_stato;

        if (this.konservata.startsWith("volumeno"))
            nova_stato = this.gaso.nova_stato("dT|V",dT);
        else if (this.konservata.startsWith("premo"))
            nova_stato = this.gaso.nova_stato("dT|p",dT);
        else if (!nur_teste)
            console.error("ni ne povas varmigi/malvarmigi la temperaturon, se konservata = "+this.konservata);
        else
            return false;

        const valida = this.valida(nova_stato);

        if (valida && !nur_teste) {
            this.gaso = nova_stato;
            this.desegnu();
            return true;
        }

        return valida;
    }

}
