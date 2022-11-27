class Idealgaso {

    constructor(larĝo,alto,kahelo=16) {
        // ni uzas KxK-kahelojn por faciligi la kolizi-simuladon k.s.
        // atentu ke larĝo kaj alto devas estu multobloj de K!
        if (larĝo%kahelo) throw "La larĝo devas esti multoblo de kahelo!"
        if (alto%kahelo) throw "La alto devas esti multoblo de kahelo!"

        this.larĝo = larĝo;
        this.alto = alto;
        this.K = kahelo;
        this.Kl = larĝo/kahelo; 

        this.Ti = 30; // tempintervaloj por averaĝi rapidecon
        this.k_nombroj; // la nombro de specoj en iu momento
        this.v; // bufro por rapidoj 0...Ti, uzataj por kalkulo de averaĝo

        this.T = 0; // la tuta tempo en paŝoj
        this.kaheloj = {};
    }

    // konstanto de Boltzmann (en J/K)
    static kB = 1.380649e-23; 

    /* 
    * Remetu variablojn, kreu erojn kaj alordigu al kaheloj laŭ koordinatoj
    * @param {number} n_eroj nombro de eroj
    * @param {number} maso maso de unuopa ero (en atommasoj u)
    * @param {number} maksimuma rapido en direktoj x kaj y en multobloj de kahelgrando
    */
    preparo(n_eroj=1000, maso=1, rapido=1) {
        this.parametroj(temperaturo, p_kunigo, p_divido);

        this.T = 0; // tmepo = 0
        // neniom da ĉiu speco, ni aktualigos dum kreado de eroj kaj dum la eksperimento mem
        this.kaheloj = Array.apply(null, new Array(this.larĝo/this.K * this.alto/this.K))
            .map(() => new Object());
        this.v_max = rapido * this.K;
        
        // preparu la bufron de rapidoj
        /*
        this.v = Array.apply(null, new Array(this.Ti))
            .map(() => Object.create({kun: 0, dis: 0}));
        */
        this.nombroj = 0;
        this.kreu_erojn(n_eroj,1);
    }

    /**
     * Adaptas parametron temperaturo
     */
    parametroj(rapido=1) {
        this.v_max = temperaturo * this.K;
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
                vy: Math.random() * 2 * v_max - v_max
            }
            const k = this.kahelo(e.x,e.y);
            if (k) {
                k[e.id] = e;
                this.nombroj++;
            } else {
                throw `Neniu kahelo por ${e.x},${e.y}!`
            }
        }

    }


    /**
     * Sur kiu kahelo troviĝas pozicio (x,y)?
     */
    kahelo(x,y) {
        const k = Math.trunc(x/this.K) + this.Kl * Math.trunc(y/this.K);
        if (k>=this.kaheloj.length) throw(`neniu kahelo ${k} por x: ${x}, y: ${y}`);
        return this.kaheloj[k];
    }


    /**
     * Movas eron al novaj koordinatoj nx, ny,
     * se necese ankaŭ al nova kahelo
     * 
     * @param {object} e la ero
     * @param {number} nx nova x-koordinato 
     * @param {number} ny nova y-koordinato
     */
    kmovo(e,nx,ny) {
        const x = e.x;
        const y = e.y;
        const kx = Math.trunc(x/this.K);
        const ky = Math.trunc(y/this.K);
        const nkx = Math.trunc(nx/this.K);
        const nky = Math.trunc(ny/this.K);
        e.x = nx; e.y = ny;
        if (kx != nkx || ky != nky) {
            const k = this.kahelo(x,y);
            const nk = this.kahelo(nx,ny);
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

        /* movo de e laŭ ĝia rapideco kun eventuala reflekto ĉe la bordoj */        
        function movo(e) {
            if (e.t < self.T) {
                // momente ni nur movas la erojn
                let nx = e.x + e.vx;
                if (nx < 0 || nx > self.larĝo) {
                    e.vx = - e.vx;
                    nx = e.x + e.vx;
                }
                let ny = e.y + e.vy;
                if (ny < 0 || ny > self.alto) {
                    e.vy = -e.vy;
                    ny = e.y + e.vy;
                }
                // movo al nx, ny, eventuale al nova kahelo
                e.t = self.T;
                self.kmovo(e,nx,ny);
            }
        }

        /**
         * donas al e novan rapidon (vx,vy) aldonante iom
         * da hazardo kaj limigante al v_max por tipoj k:-1, 1 kaj
         * v_max/2 por kunigo k: 0
         */
        /*
        function rapido(e,vx,vy) {
            const max = e.k? self.v_max : self.v_max/2;
            const dx = Math.random()*0.1*max - 0.05*max;
            const dy = Math.random()*0.1*max - 0.05*max;
            e.vx = Math.max(-max,Math.min(vx+dx,max));
            e.vy = Math.max(-max,Math.min(vy+dy,max));
        }
        */

        
        // trakuru ĉiujn kahelojn kaj traktu movojn kaj reakciojn de la eroj
        for (let k in this.kaheloj) {
            // movo
            const kx = k % this.Kl;
            const ky = Math.trunc(k / this.Kl);
            Object.values(this.kaheloj[k]).map((e) => movo(e,kx,ky));
        }

        this.T++;
    }

    /**
     * Redonas averaĝan rapidon 
     */
    rapido_ave() {
        // ALDONU: sumigu la rapidojn dum kreado kaj redonu ĝin tie ĉi dividite per /this.nombro
        return 0;
    }

    /**
     * Redonas la enan (kinetan, ĉar ideala gaso) energion
     * @returns 
     */
    energio() {
        // Ni povas kalkuli la entergion kiel sumo de kinetaj energioj de la eroj: sumo(1/2*m*v²) - prefere jam dum kreado, dum
        // ĉiuj eroj konservas sian rapidon - manke de interagoj en ideala gaso
        // aŭ simple ni kalkulas la kinetan energion per averaĝa rapido kaj multopligu per N

        return 0;
    }

    /**
     * Redonas la temperaturon de la sistemo kalkulite el ĝia energio kaj nombro da eroj
     * @returns
     */
    temperaturo() {
        // La temperaturo estas this.energio / (N*kB), kie kB estas la konstanto de Boltzmann, kaj N la nombro de eroj
        return 0;
    }

    /**
     * Redonas la premon sur unu el la flankoj de la rektangulo (aŭ ĉu al ĉiuj kvar? aŭ ĉu kvadrate por ricevi veran arean premon?)
     */
    premo() {
        // inter premo kaj volumeno cetere devus validi la ideala gasekvacio: pV = N*kB*T
        // eble ni devos ĝin adapti al dudimensia modelo aŭ inverse simuli 3-dimensian sistemon per taŭga koeficiento
        return 0;
    }


}