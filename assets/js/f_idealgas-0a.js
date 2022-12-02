class Idealgaso {

    /**
     * Kreas spacon por la eksperimento
     * @param {number} larĝo larĝo en nm
     * @param {number} alto alto en nm
     * @param {number} profundo profundo (virtuala) en nm
     * @param {number} ĉelo grandeco de ĉelo en frakcio de alto
     */
    constructor(larĝo,alto,profundo,ĉelo=1/20) {
        // ni uzas ĈxĈ-ĉelojn por faciligi la kolizi-simuladon k.s.
        // atentu ke ĉelo estu entjera ono de alto kaj larĝo!
        // ni ne dividas la profundon, ĉar ni montras nur projekcion
        // al la ebeno larĝo x alto kaj ne movas la gaserojn en la dimensio profundo
        // la profundo estas uzata nur por kalkulo de fizikaj grandoj

        this.larĝo = larĝo;
        this.alto = alto;
        this.profundo = profundo;

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

   
    // konstantoj por kalkuli la fizikajn grandojn
    static kB = 1.380649e-23;  // konstanto de Boltzmann (en J/K)
    static u = 1.66053906660e-27; // atoma masunuo en kg
    // ni povas bildigi nur movojn en la skalo de ĉ. 10nm/s, sed
    // reale la gaseroj moviĝas je skalo de 1km/s per uzo de
    // nm ni jam implicas faktoron 1e-9, sed ni devas ankoraŭ korekti je 1e-2
    static ev = 1e-2; // 1km/s ~ 10nm/s: faktoro je kiu rapidecoj estas reduktitaj

    /* 
    * Remetu variablojn, kreu erojn kaj alordigu al kaheloj laŭ koordinatoj
    * @param {number} n_eroj nombro de eroj
    * @param {number} maso maso de unuopa ero (en atommasoj u)
    * @param {number} maksimuma rapido en direktoj x kaj y en multobloj de kahelgrando
    */
    preparo(n_eroj=1000, maso=1, rapido=1) {
        this.parametroj(temperaturo, maso);
            
        this.T = 0; // tmepo = 0
        // neniom da ĉiu speco, ni aktualigos dum kreado de eroj kaj dum la eksperimento mem

        const n_ĉeloj = Math.ceil(this.larĝo/this.Ĉl * this.alto/this.Ĉa);
        this.ĉeloj = Array.apply(null, new Array(n_ĉeloj))
            .map(() => new Object());
        this.v_max = rapido * this.Ĉa;
        
        this.nombro = 0;
        this.v_sum = 0;
        this.v_sum2 = 0;
        this.kreu_erojn(n_eroj,1);
    }

    /**
     * Adaptas parametrojn. Ili momente nur efikas kiam ankaŭ rekreiĝas
     * la eroj!
     * @param {number} rapido
     * @param {number} maso en atommasunuoj u
     * 
     */
    parametroj(rapido=1, maso=1) {
        this.v_max = rapido * this.Ĉa;
        this.maso = maso;
    }

    /**
     * Kreas erojn de unu el la specoj A, B, AB en arbitraj lokoj kun arbitra rapido-vektoro
     * @param {number} n_eroj nobro da kreendaj eroj
     * @param {number} speco -1: A, 1: B, 0: AB
     */
    kreu_erojn(n_eroj,speco) {
        const larĝo = this.larĝo;
        const alto = this.alto;
        const v_max = this.v_max;

        // kreu erojn de specoj A(-1),  B(1) aŭ AB(0)
        for (let n = 0; n < n_eroj; n++) {
            const e = {
                id: n,
                t: this.T - 1, // per memoro de la tempo en la eroj ni evitas refojan trakton ĉe kahelmovo
                k: speco, // tipoj -1 aŭ 1 por unopaj kaj 0 por fanditaj eroj
                x: Math.random() * larĝo,
                y: Math.random() * alto,
                vx: Math.random() * 2 * v_max - v_max,
                vy: Math.random() * 2 * v_max - v_max,
                vz: Math.random() * 2 * v_max - v_max, // z-dimensio de rapideco, loko ne gravas
            }
            const k = this.ĉelo(e.x,e.y);
            if (k) {
                k[e.id] = e;
                this.nombro++;
                const v2 = e.vx*e.vx + e.vy*e.vy + + e.vz*e.vz;
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

        /* movo de e laŭ ĝia rapideco kun eventuala reflekto ĉe la bordoj */        
        function movo(e) {
            if (e.t < self.T) {
                // momente ni nur movas la erojn
                let nx = e.x + e.vx;
                if (nx < 0) {
                    e.vx = -e.vx;
                    nx = e.x + e.vx;
                    premo.md += e.vx; 
                } else if (nx > self.larĝo) {
                    e.vx = -e.vx;
                    nx = e.x + e.vx;
                    premo.d -= e.vx; 
                }
                let ny = e.y + e.vy;
                if (ny < 0) {
                    e.vy = -e.vy;
                    ny = e.y + e.vy;
                    premo.s += e.vy;
                } else if (ny > self.alto) {
                    e.vy = -e.vy;
                    ny = e.y + e.vy;
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
        const m = Idealgaso.u * this.maso;
        this.premoj = {supre: m*premo.s, malsupre: m*premo.ms,
                dekstre: m*premo.d, maldekstre: m*premo.md};

        this.T++;
    }

    /**
     * Redonas averaĝan rapidon en px/intervalo. Por havi m/s
     * vi devas ankoraŭ multipliki per m/px kaj dividi per s/interv.
     */
    rapido_ave() {
        // ALDONU: sumigu la rapidojn dum kreado kaj redonu ĝin tie ĉi dividite per /this.nombro
        return this.v_sum/Idealgaso.ev/this.nombro;
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

        return 0.5 * Idealgaso.u*this.maso * this.v_sum2/Idealgaso.ev/Idealgaso.ev;
    }

    /**
     * Redonas la temperaturon de la sistemo kalkulite el ĝia energio kaj nombro da eroj
     * @returns
     */
    temperaturo() {
        // la temperaturo estas this.energio / (N*kB), kie kB estas la konstanto de Boltzmann, kaj N la nombro de eroj
        return this.energio() / this.nombro / Idealgaso.kB;
    }

    /**
     * Redonas la premon sur unu el la flankoj de la rektangulo (aŭ ĉu al ĉiuj kvar? aŭ ĉu kvadrate por ricevi veran arean premon?)
     * @param {string} direkto la direkto, en kiu mezuri la premon (supre,malsupre,dekstre,maldekstre,ĉiuj)
     */
    premo(direkto) {
        // inter premo kaj volumeno cetere devus validi la ideala gasekvacio: pV = N*kB*T
        // eble ni devos ĝin adapti al dudimensia modelo aŭ inverse simuli 3-dimensian sistemon per taŭga koeficiento
        if (!direkto || direkto == "ĉiuj") {
            return Object.values(this.premoj).reduce((p,x) => p+x,0)
        } else {
            return this.premoj[direkto]
        }
    }

}