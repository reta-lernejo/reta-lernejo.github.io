class Masefiko {

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
        //this.eroj = [];
        this.kaheloj = {};
    }

    /* 
    * Remetu variablojn, kreu erojn kaj alordigu al kaheloj laŭ koordinatoj
    * @param {number} n_eroj_A nombro de eroj de speco A(-1)
    * @param {number} n_eroj_B nombro de eroj de speco B(1)
    * @param {number} temperaturo influanta maksimuman rapidon en direktoj x kaj y en multobloj de kahelgrando kaj modifante reakci-probablojn
    */
    preparo(n_eroj_A=500, n_eroj_B=500, temperaturo=1, p_kunigo=0.1, p_divido=0.1) {
        this.parametroj(temperaturo, p_kunigo, p_divido);
        /*
        this.v_max = temperaturo * this.K;

        // ni premisas ekzoterman reakcion, tiam pli alta temparaturo
        // favoras la rereakcion / la disrompon de ligoj AB -> A+B
        this.p_kunigo = p_kunigo/temperaturo;
        this.p_divido = p_divido*temperaturo;
        */

        this.T = 0; // tmepo = 0
        // neniom da ĉiu speco, ni aktualigos dum kreado de eroj kaj dum la eksperimento mem
        //this.eroj = [];
        this.kaheloj = Array.apply(null, new Array(this.larĝo/this.K * this.alto/this.K))
            .map(() => new Object());
        this.k_nombroj = {"-1": 0, "0": 0, "1": 0};
        
        // preparu la bufron de rapidoj
        this.v = Array.apply(null, new Array(this.Ti))
            .map(() => Object.create({kun: 0, dis: 0}));

        this.kreu_erojn(n_eroj_A,-1);
        this.kreu_erojn(n_eroj_B,1);
    }

    /**
     * Adaptas parametrojn temperaturo kaj probablecoj
     */
    parametroj(temperaturo=1, p_kunigo=0.1, p_divido=0.1) {
        this.v_max = temperaturo * this.K;
        // ni premisas ekzoterman reakcion, tiam pli alta temparaturo
        // favoras la rereakcion / la disrompon de ligoj AB -> A+B
        this.p_kunigo = p_kunigo/temperaturo;
        this.p_divido = p_divido*temperaturo;
    }

    /**
     * Redonas la sumon de ĉiuj eroj (de ciuj tri specoj)
     */
    n_sumo() {
        return Object.values(this.k_nombroj).reduce((s,v) => s+v, 0);
    }

    /**
     * Redonas la sumon de ĉiuj eroj kalkulante AB(0) duoble
     */
    n_sumo2() {
        return Object.values(this.k_nombroj).reduce((s,v) => s+v, 0) + this.k_nombroj[0];
    }
    

    /**
     * Ni kontrolas, ĉu la nombroj estas ĝustaj (por eviti cimojn)
     */
    kontrolo() {
        // la sumo de eroj entute devas esti sama al la eroj en kaheloj
        const ke = this.kaheloj.reduce((s,k) => s+Object.keys(k).length, 0);
        if (this.n_sumo() != ke)  throw `La nombro de eroj ne plu estas gusta! Registitaj: `
            + `${this.n_sumo()}, sed en kaheloj: ${ke}`;
    }    

    /**
     * Kreas erojn de unu el la specoj A, B, AB en arbitraj lokoj kun arbitra rapido-vektoro
     * @param {number} n_eroj nobro da kreendaj eroj
     * @param {number} speco -1: A, 1: B, 0: AB
     */
    kreu_erojn(n_eroj,speco) {
        const larĝo = this.larĝo;
        const alto = this.alto;
        const v_max = speco? this.v_max : this.v_max/2;

        const sumo = this.n_sumo2(); // kalkulu erojn AB duoble.

        // kreu erojn de specoj A(-1),  B(1) aŭ AB(0)
        for (let n = 0; n < n_eroj; n++) {
            const e = {
                id: speco? sumo+n : `${sumo+n}-${sumo+n_eroj+n}`,
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
                this.k_nombroj[e.k]++;
            } else {
                throw `Neniu kahelo por ${e.x},${e.y}!`
            }
        }

        this.kontrolo();
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
     * Redonas la kvantojn de la specoj kiel propocioj
     * al ties sumo
     */
    proporciaj_kvantoj() {
        const sumo = this.n_sumo();
        return {
            "-1":  this.k_nombroj[-1] / sumo,
            "1":   this.k_nombroj[1] / sumo,
            "0": this.k_nombroj[0] / sumo
        };
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
         * Aktualigas la rapido-bufron
         * @param {string} op 0 = remetu al 0, kun/dis: altigu tiun kampon
         */
        function vbufro(op) {
            if (!op)
                self.v[self.T % self.Ti] = {kun: 0, dis: 0};
            else
                self.v[self.T % self.Ti][op]++;
        }

        /**
         * donas al e novan rapidon (vx,vy) aldonante iom
         * da hazardo kaj limigante al v_max por tipoj k:-1, 1 kaj
         * v_max/2 por kunigo k: 0
         */
        function rapido(e,vx,vy) {
            const max = e.k? self.v_max : self.v_max/2;
            const dx = Math.random()*0.1*max - 0.05*max;
            const dy = Math.random()*0.1*max - 0.05*max;
            e.vx = Math.max(-max,Math.min(vx+dx,max));
            e.vy = Math.max(-max,Math.min(vy+dy,max));
        }


        /**
         * Kontrolas la reakcion (kunigo / divido) de eroj en sama kahelo
         */
        function reakcio(k) {
            const kahelo = self.kaheloj[k];
            const eroj = Object.keys(kahelo);
            let n = 0;

            // ĉu ni havas ankoraŭ almenaŭ 2 netraktitajn erojn sur la kahelo?
            while (n < eroj.length-1) {
                const e1 = kahelo[eroj[n]];
                const e2 = kahelo[eroj[n+1]];

                // reakcio okazu nur inter 1 kaj -1 aŭ 0 kaj 0
                // PLIBONIGU: antentu konservon de momanto (vd http://www.sciencecalculators.org/mechanics/collisions/), momente ni improvizas per adicio kaj duonigo de rapidecoj v
                if (e1.k + e2.k == 0) {
                    // okazu kunigo A+B -> AB
                    if (e1.k && Math.random() < self.p_kunigo) {
                        // ni forigas la du erojn
                        delete kahelo[e1.id];
                        delete kahelo[e2.id];
                        self.k_nombroj[e1.k]--;
                        self.k_nombroj[e2.k]--;
                        // ni kreas novan kunigita eron de speco AB (k:0)
                        e1.k = 0;
                        e1.id = `${e1.id}-${e2.id}`;
                        rapido(e1,(e1.vx + e2.vx)/2,(e1.vy + e2.vy)/2);
                        kahelo[e1.id] = e1;
                        self.k_nombroj[e1.k]++;
                        // akualigo de rapido-bufro
                        vbufro("kun"); // altigu kun

                    // okazu divido AB -> A+B
                    } else if (!e1.k && Math.random() < self.p_divido) {
                        // ni forigas la eron AB (0)
                        delete kahelo[e1.id];
                        self.k_nombroj[e1.k]--;
                        // ni kreas du unuopajn erojn A(-1) kaj B(1)
                        const idj = e1.id.split('-');
                        const e1a = Object.assign({},e1); 

                        e1.k = -1; e1.id = idj[0];
                        rapido(e1,2*e1.vx,2*e1.vy);

                        e1a.k = 1; e1a.id = idj[1];
                        const f2 = 2-Math.abs(e2.k);
                        rapido(e1a,e2.vx*f2,e2.vy*f2);

                        kahelo[e1.id] = e1;
                        kahelo[e1a.id] = e1a;
                        self.k_nombroj[e1.k]++;
                        self.k_nombroj[e1a.k]++;
                        // aktualigo de rapido-bufro
                        vbufro("dis"); // altigu dis;
                    }
                }
                n += 2;
            }
        }

        // la tuta procezo...        
        vbufro(0); // malplenigu la nunan kampon de la reakci-rapido-bufro
        
        // trakuru ĉiujn kahelojn kaj traktu movojn kaj reakciojn de la eroj
        for (let k in this.kaheloj) {
            reakcio(k);
            // movo
            const kx = k % this.Kl;
            const ky = Math.trunc(k / this.Kl);
            Object.values(this.kaheloj[k]).map((e) => movo(e,kx,ky));
        }

        this.T++;
    }

    /**
     * Redonas averaĝan rapidon de la reakcio {kun: ..., dis: ...}
     */
    rapido_ave() {
        let kun = 0, dis = 0;
        const t = Math.min(this.T, this.Ti);

        this.v.map((vt) => {kun += vt.kun; dis += vt.dis});
        // PLIBONIGU eble: v estu -k1 * c(A)*c(B) resp. -k1 * c(AB)
        // ĉu tamen ni uzu absolutajn nombrojn aŭ ni dividu tra
        // max(n_eroj)?
        return { kun: kun/t, dis: dis/t };
    }


}