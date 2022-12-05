class Idealgaso {

    // konstantoj por kalkuli la fizikajn grandojn
    static kB = 1.380649e-23;  // konstanto de Boltzmann (en J/K)
    static u = 1.66053906660e-27; // atoma masunuo en kg
    static norm_p = 1e5; // normpremo estas 1000 hPa
    static norm_T = 293.15; // normtemperaturo en K

    /**
     * Redonas la nombron de gaseroj ĉe donita premo, volumeno kaj temepraturo
     * @param {number} p premo en Pa
     * @param {number} V volumeno en m³
     * @param {number} T temperaturo en K
     */
    static nombro(p,V,T) {
        return p*V / Idealgaso.kB / T;
    }

    /**
     * Redonas mezuman rapidon de gaseroj ĉe donita maso kaj termperaturo
     * @param {number} m maso en atommasunuoj (u)
     * @param {number} T temperaturo en K
     */
    static rapido(m,T) {
        const E = 3/2*T*Idealgaso.kB;
        const kg = m*Idealgaso.u;
        return Math.sqrt(2*E/kg);
    }

    /**
     * Redonas du arbitrajn nombrojn kiu statistike sekvas Guassan norm-distribuon
     * Ili estas kreitaj laŭ la metodo Box-Muller
     * @param {nombro} E ekspekto
     * @param {nombro} D varianca devio
     * @returns 
     */
    static max_muller(E,D) {
        const u = Math.sqrt(-2*Math.log(Math.random()));
        const v = 2*Math.PI*Math.random();
        const z0 = E + D*(u + Math.cos(v));
        const z1 = E + D*(u + Math.sin(v));
        return [z0,z1];
    }

    /**
     * Kreas spacon por la eksperimento
     * @param {number} larĝo larĝo en nm
     * @param {number} alto alto en nm
     * @param {number} profundo profundo (virtuala) en nm
     * @param {number} ĉelo grandeco de ĉelo en frakcio de alto
     * @param {number} takto takto en onoj de sekundo por aktualigi la bildon
     */
    constructor(larĝo,alto,profundo,ĉelo=1/20,takto=1/20) {
        // ni uzas ĈxĈ-ĉelojn por faciligi la kolizi-simuladon k.s.
        // atentu ke ĉelo estu entjera ono de alto kaj larĝo!
        // ni ne dividas la profundon, ĉar ni montras nur projekcion
        // al la ebeno larĝo x alto kaj ne movas la gaserojn en la dimensio profundo
        // la profundo estas uzata nur por kalkulo de fizikaj grandoj

        this.larĝo = larĝo;
        this.alto = alto;
        this.profundo = profundo;
        this.takto = takto;

        // ĉelalto kaj ĉellarĝo
        this.Ĉa = alto*ĉelo;
        this.Ĉl = this.Ĉa; //larĝo/this.Ĉa; 

        this.T = 0; // la tuta tempo en paŝoj
        this.nombro = 0; // la nombro de eroj en iu momento

        // la ĉeloj enhavas la erojn en tiu spacregiono
        this.ĉeloj = {};

        // valoroj por facile kalkuli la fizikajn grandojn
        this.premoj = {};
        this.v_sum = 0; // sumo de rapidoj
        this.v_sum2 = 0; // sumo de rapidkvadratoj
    }

   
    /* 
    * Remetu variablojn, kreu erojn kaj alordigu al kaheloj laŭ koordinatoj
    * @param {number} n_eroj nombro de eroj
    * @param {number} maso de unuopa ero (en atommasoj u)
    * @param {number} temperaturo en K, per tio ni scios la ekspekton de la rapido por la eroj
    * @param {intervalo} intervalo en onoj de sekundo, por redukti la rapidon, apriore 10^-11s
    */
    preparo(n_eroj=1000, maso=1, temperaturo=293.15, intervalo=1e-11) {
        this.parametroj(maso, intervalo);
            
        this.T = 0; // tmepo = 0
        // neniom da ĉiu speco, ni aktualigos dum kreado de eroj kaj dum la eksperimento mem

        const n_ĉeloj = Math.ceil(this.larĝo/this.Ĉl * this.alto/this.Ĉa);
        this.ĉeloj = Array.apply(null, new Array(n_ĉeloj))
            .map(() => new Object());
        this.v_max = rapido * this.Ĉa;
        
        this.nombro = 0;
        this.v_sum = 0;
        this.v_sum2 = 0;
        this.kreu_erojn(n_eroj,temperaturo);
    }

    /**
     * Adaptas parametrojn. Ili momente nur efikas kiam ankaŭ rekreiĝas
     * la eroj!
     * @param {number} maso en atommasunuoj u
     * @param {number} intervalo taktoj je sekuno
     * 
     */
    parametroj(maso, intervalo) {
        this.maso = maso;
        this.intervalo = intervalo;
    }

    /**
     * Kreas erojn de unu el la specoj A, B, AB en arbitraj lokoj kun arbitra rapido-vektoro
     * @param {number} n_eroj nombro da kreendaj eroj
     * @param {number} maso maso de eroj en atommasunuoj (u)
     * @param {number} temperaturo la temperaturo en K, difinanta la ekspekton de la rapido
     */
    kreu_erojn(n_eroj,temperaturo) {
        const larĝo = this.larĝo;
        const alto = this.alto;
        // per la temperaturo atendebla rapido en unu dimensio
        const r_eksp = Math.sqrt(Idealgaso.rapido(this.maso,temperaturo)/3);

        // max_muller ĉiam redonas du nombrojn normdistribuitaj, sed ni bezonas tri:
        let mm = 0;
        let mm6 = [0,0,0,0,0,0];

        // kreu erojn 
        for (let n = 0; n < n_eroj; n++) {
            // se necese replenigu bufron de arbitraj nombroj
            if (!mm) {
                for (let i=0; i<3; i++) {
                    const mm2 = Idealgaso.max_muller(r_eksp,r_eksp/2);
                    mm6[2*i] = mm2[0];
                    mm6[2*i+1] = mm2[1];    
                }
            }

            const e = {
                id: n,
                t: this.T - 1, // per memoro de la tempo en la eroj ni evitas refojan trakton ĉe kahelmovo
                x: Math.random() * larĝo,
                y: Math.random() * alto,
                vx: Math.sign(Math.random()) * mm6[mm],
                vy: Math.sign(Math.random()) * mm6[mm+1],
                vz: Math.sign(Math.random()) * mm6[mm+2] // z-dimensio de rapideco, loko ne gravas, ĉar ni projekcias al x-y-ebeneo
            }
            mm = (mm+3)%6;
            // alordigu ĉiun eron al koncerna ĉelo por pli facila traktado 
            // de interagoj (se estas, se ne fakte sufiĉus unusola ĉelo)
            const k = this.ĉelo(e.x,e.y);
            if (k) {
                k[e.id] = e;
                this.nombro++;
                const v2 = e.vx**2 + e.vy**2 + e.vz**2;
                this.v_sum2 += v2;
                this.v_sum += Math.sqrt(v2);
            } else {
                throw `Neniu kahelo por ${e.x},${e.y}!`
            }
        }
    }


    /**
     * Sur kiu kahelo troviĝas pozicio (x,y)?
     */
    ĉelo(x,y) {
        const k = Math.trunc(x/this.Ĉl + this.Ĉl*Math.trunc(y/this.Ĉa));
        if (k>=this.ĉeloj.length) throw(`neniu ĉelo ${k} por x: ${x}, y: ${y}`);
        return this.ĉeloj[k];
    }


    /**
     * Movas eron al novaj koordinatoj nx, ny,
     * se necese ankaŭ al nova kahelo
     * 
     * @param {object} e la ero
     * @param {number} nx nova x-koordinato 
     * @param {number} ny nova y-koordinato
     */
    ĉelmovo(e,nx,ny) {
        const x = e.x;
        const y = e.y;
        const kx = Math.trunc(x/this.Ĉl);
        const ky = Math.trunc(y/this.Ĉa);
        const nkx = Math.trunc(nx/this.Ĉl);
        const nky = Math.trunc(ny/this.Ĉa);
        e.x = nx; e.y = ny;
        if (kx != nkx || ky != nky) {
            const k = this.ĉelo(x,y);
            const nk = this.ĉelo(nx,ny);
            if (k && nk) {
                delete k[e.id];
                nk[e.id] = e;
            }
        }
    }


    /**
     * Trakuri la kahelojn, movi ĉiujn erojn en ĉiu kahelo,
     * laŭ la reguloj kunigu aŭ dividu ilin. 
     */
    procezo() {
        const self = this;
        const premo = {d: 0, md: 0, s: 0, ms: 0}; // la kvar flankoj
        const tf = this.intervalo * 1e9 * this.takto; // artefarita malrapidigo, sed ni mezuras nm anst. m kaj ni havas
                // takton de nur ono de sekundo.

        /* movo de e laŭ ĝia rapideco kun eventuala reflekto ĉe la bordoj */        
        function movo(e) {
            if (e.t < self.T) {

                // momente ni nur movas la erojn
                const vx = e.vx * tf;
                let nx = e.x + vx;
                if (nx < 0) {
                    e.vx = -e.vx;
                    nx = -nx; // e.x - vx;
                    premo.md += e.vx; 
                } else if (nx > self.larĝo) {
                    e.vx = -e.vx;
                    nx = self.larĝo - (nx-self.larĝo); // e.x - vx;
                    premo.d -= e.vx; 
                }

                const vy = e.vy * tf;
                let ny = e.y + vy;
                if (ny < 0) {
                    e.vy = -e.vy;
                    ny = -ny; //e.y + e.vy;
                    premo.s += e.vy;
                } else if (ny > self.alto) {
                    e.vy = -e.vy;
                    ny = self.alto - (ny-self.alto); //e.y + e.vy;
                    premo.ms -= e.vy;
                }
                // movo al nx, ny, eventuale al nova kahelo
                e.t = self.T;
                self.ĉelmovo(e,nx,ny);
            }
        }
        
        // trakuru ĉiujn kahelojn kaj traktu movojn kaj reakciojn de la eroj
        for (let k in this.ĉeloj) {
            // movo
            const kx = k % this.Ĉl;
            const ky = Math.trunc(k / this.Ĉa);
            Object.values(this.ĉeloj[k]).map((e) => movo(e,kx,ky));
        }

        // aktualigu la premon
        const m = this.maso; // tion ni faros en premo() * Idealgaso.u
        this.premoj = {supre: m*premo.s, malsupre: m*premo.ms,
                dekstre: m*premo.d, maldekstre: m*premo.md};

        this.T++;
    }

    volumeno() {
        return this.larĝo*this.alto*this.profundo;
    }
    

    /**
     * Redonas averaĝan rapidon en px/intervalo. Por havi m/s
     * vi devas ankoraŭ multipliki per m/px kaj dividi per s/interv.
     */
    rapido_ave() {
        // ALDONU: sumigu la rapidojn dum kreado kaj redonu ĝin tie ĉi dividite per /this.nombro
        return this.v_sum/this.nombro;
    }

    /**
     * Redonas la enan (kinetan, ĉar ideala gaso) energion en kg*px²/intervalo². 
     * Por ekhavi J = kg*m²/s² vi devas ankoraŭ multipliki per (m/px)² kaj dividi per (s/interv)².
     * @returns 
     */
    energio() {
        // Ni povas kalkuli la entergion kiel sumo de kinetaj energioj de la eroj: sumo(1/2*m*v²) 
        // ĉar ĉiuj eroj havas la saman mason surfiĉas scii la sumon de rapidkvadratoj v_sum2
        // ĉiuj eroj konservas sian rapidon - manke de interagoj en ideala gaso!

        // ni devus ricevi por norma temperaturo kaj premo:
        // E_th = N * 1.38J/K * 293.15K = N * 4.05e-21J

        return 0.5 * Idealgaso.u*this.maso * this.v_sum2;
    }

    /**
     * Redonas la temperaturon de la sistemo kalkulite el ĝia energio kaj nombro da eroj
     * @returns
     */
    temperaturo() {
        // la temperaturo estas this.energio / (N*kB), kie kB estas la konstanto de Boltzmann, kaj N la nombro de eroj
        return 2/3 * this.energio() / this.nombro / Idealgaso.kB;
    }

    /**
     * Redonas la premon kalkulitan el la kolizioj kun flankoj de la rektangulo kaj korektita per faktoroj al Pa
     */
    premo() {
        // la sumo de premfortoj (el maso kaj rapiddimensioj orta al la koncerna flanko ĉe kolizioj)
        // ni devas ankoraŭ korekti la rapidecojn de nia eksperimenta skalo al m/s kaj la mason al kg
        const tf = this.intervalo; // korekto de ofteco, ĉar kolizioj multe pli ofte okazus ĉe pli granda rapido
        const p = Object.values(this.premoj).reduce((p,x) => p+x,0) * tf * Idealgaso.u * this.takto;

        // la reprezentita areo de kvar flankoj
        const a = (2*this.larĝo + 2*this.alto)*this.profundo * 1e-18; // nm² -> m²
        // ni devos korekti ankoraŭ la dimensiojn de la areo de nm al m kaj de intervalo al s
        return p / a;
    }

}