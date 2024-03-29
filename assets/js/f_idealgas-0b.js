/**
 * Simulado de ideala gaso en volumeno. La eroj reflektiĝas ĉe la flankaj vandoj konservante sian kinetan energion. Pro simpleco ni simulas koliziojn inter la eroj mem kaj la movigoj en la profundo ni forlasas kaj movas ler erojn nur en du dimensioj, t.e. ni projekcias ĉiujn erojn de la volumeno al dudimensia ekrano. 
 * 
 * Por faciligi traktadon de reakcioj en subklasoj ks, ni dividas la spacon en kvadratajn ĉelojn, al kiuj ni ordigas la erojn post ĉia movo. Tiel vi povas anstataŭigi ekz-e la funkcion procezo por aldoni reakciojn en la unuopaj ĉeloj.
 * 
 * La premon ni kalkulas el la kolizioj kun la vando, pro la 2-dimensia projekcio ni eksterpolas gin al 3 dimensioj. Oni povas doni temperaturon el kiu ni normdistribuas la rapidojn per la metodo Box-Muller.
 * Fine el la unuopaj rapidoj ni povas kalkuli energion, temperaturon k.a. parametrojn.
 */

class Idealgaso {

    // https://de.wikipedia.org/wiki/Ideales_Gas

    // konstantoj por kalkuli la fizikajn grandojn
    static kB = 1.380649e-23;  // konstanto de Boltzmann (en J/K)
    static u = 1.66053906660e-27; // atoma masunuo en kg
    static h = 6.62607015e-34; // konstanto de Planck en Js

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
     * Redonas la entropikonstanton por atommaso (u)
     */
    static entropikonstanto(m) {
        return Idealgaso.kB* Math.log(
            Math.pow(2*Math.PI*m*Idealgaso.kB,3/2)
            / Idealgaso.h**3 + 5/2
        );
    }

    /**
     * Redonas du arbitrajn nombrojn kiu statistike sekvas Guassan norm-distribuon
     * Ili estas kreitaj laŭ la metodo Box-Muller
     * @param {nombro} E ekspekto
     * @param {nombro} D varianca devio
     * @returns 
     */
    static box_muller(E,D) {
        const r = Math.sqrt(-2*Math.log(Math.random()));
        const phi = 2*Math.PI*Math.random();
        const z0 = E + D*(r*Math.cos(phi));
        const z1 = E + D*(r*Math.sin(phi));
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
    * Remetu variablojn, kreu erojn kaj alordigu al ĉeloj laŭ koordinatoj
    * @param {number} n_eroj nombro de eroj
    * @param {number} maso de unuopa ero (en atommasoj u)
    * @param {number} temperaturo en K, per tio ni scios la ekspekton de la rapido por la eroj
    * @param {intervalo} intervalo en onoj de sekundo, por redukti la rapidon, apriore 10^-11s
    */
    preparo(n_eroj=1000, maso=1, temperaturo=293.15, intervalo=1e-11) {
        this.maso = maso;
        this.intervalo = intervalo;
            
        this.T = 0; // tmepo = 0
        // neniom da ĉiu speco, ni aktualigos dum kreado de eroj kaj dum la eksperimento mem

        const n_ĉeloj = Math.ceil(this.larĝo/this.Ĉl * this.alto/this.Ĉa);
        this.ĉeloj = Array.apply(null, new Array(n_ĉeloj))
            .map(() => new Object());
        //this.v_max = rapido * this.Ĉa;
        
        this.nombro = 0;
        this.v_sum = 0;
        this.v_sum2 = 0;
        this.kreu_erojn(n_eroj,temperaturo);
    }

    /**
     * skribas la aktualan staton al la konzolo
     */
    skribu_staton() {
        console.log(`## energio: ${this.energio()}, rapido: ${this.rapido_ave()}`)
        console.log(`...temperaturo: ${this.temperaturo()}, entropio: ${this.entropio()}`);
    }

    /**
     * Adaptas parametron larĝo (volumeno)
     * @param {number} larĝo nm
     * 
     */
    larĝadapto(larĝo) {
        const dx = larĝo - this.larĝo;
        this.larĝo = larĝo;

        // eligu kelkajn parametrojn por kontrolo:
        this.skribu_staton();
        const dV = dx * this.alto*this.profundo;
        console.log("energiŝanĝo: "+this.volumen_laboro(dV));
        console.log("rapidŝanĝo: "+this.adiabata_rapido(dV));
        console.log("temperaturŝanĝo: "+this.temperatur_ŝanĝo(dV));

        if (dx != 0) {
            // ni rekalkulos rapid-sumojn
            this.v_sum = 0;
            this.v_sum2 = 0;    

            // trakuru ĉiujn ĉelojn kaj se necese adaptu lokojn de ties eroj
            for (let k of this.ĉeloj) {
                // adapto
                Object.values(k).map((e) => {                                    
                    // kalkulu koliziojn kaj rapidŝanĝon pro tio
                    // se la vando moviĝas dx nm/s
                    // laŭ leĝo de elasta puŝo kun maso de vando multe pli granda ol tiu de ero
                    // la rezulta rapido post unuopa kolizo estas v' = -v + 2*dx
                    const klz = Math.floor(Math.abs(e.vx) / (2*larĝo)) //+ .5; // ni devus ankoraŭ multobligi per 1e9
                    const dv = klz * 2*dx;  // ni tiel ŝparas mutobligon per 1e+9 * 1e-9

                    if (e.vx > 0) e.vx -= dv;
                    else if (e.vx < 0) e.vx += dv;

                    const v2 = e.vx**2 + e.vy**2 + e.vz**2;
                    this.v_sum2 += v2;
                    this.v_sum += Math.sqrt(v2);   

                    // ni ŝanĝas arbitre la lokojn de gaseroj, kiuj troviĝas ekster la nova volumeno
                    if (e.x > larĝo) {
                        // ni plej simple donas arbitran novan x
                        e.x = Math.random() * larĝo;
                        const nk = this.ĉelo(e.x,e.y);
                        if (nk) {
                            delete k[e.id];
                            nk[e.id] = e;
                        } else {
                            throw `Neniu ĉelo por ${e.x},${e.y}!`
                        }
                    }
                });
            }
        }

        this.skribu_staton();
    }

    /**
     * Adaptas parametron temperaturo
     * @param {number} temperaturo en K
     * 
     */
    temperaturadapto(temperaturo) {
        // per la temperaturo atendebla rapidodistribuo en unu dimensio, vd
        // https://de.wikipedia.org/wiki/Maxwell-Boltzmann-Verteilung

        const m = this.maso*Idealgaso.u;
        const D = Math.sqrt(temperaturo*Idealgaso.kB/m);
        const E = 0; 

        // box_muller ĉiam redonas du nombrojn normdistribuitaj, sed ni bezonas tri:
        let mm = 0;
        let mm6 = [0,0,0,0,0,0];

        this.v_sum = 0;
        this.v_sum2 = 0;

        // trakuru ĉiujn ĉelojn kaj adaptu rapidecojn de ties eroj
        for (let k of this.ĉeloj) {

            // adaptoj de ĉeleroj
            Object.values(k).map((e) => {

                // se necese replenigu bufron de arbitraj nombroj
                if (!mm) {
                    //const s = (v) => Math.sign(Math.random()-0.5) * v;
                    for (let i=0; i<3; i++) {
                        const mm2 = Idealgaso.box_muller(E,D);
                        mm6[2*i] = mm2[0];
                        mm6[2*i+1] = mm2[1];    
                    }
                }

                e.vx = mm6[mm];
                e.vy = mm6[mm+1];
                e.vz = mm6[mm+2];
                const v2 = e.vx**2 + e.vy**2 + e.vz**2;
                this.v_sum2 += v2;
                this.v_sum += Math.sqrt(v2);
                mm = (mm+3)%6;
            });
        }

        this.skribu_staton();
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

        // per la temperaturo atendebla rapidodistribuo en unu dimensio, vd
        // https://de.wikipedia.org/wiki/Maxwell-Boltzmann-Verteilung

        const m = this.maso*Idealgaso.u;
        const D = Math.sqrt(temperaturo*Idealgaso.kB/m);
        const E = 0; 

        // box_muller ĉiam redonas du nombrojn normdistribuitaj, sed ni bezonas tri:
        let mm = 0;
        let mm6 = [0,0,0,0,0,0];

        // kreu erojn 
        for (let n = 0; n < n_eroj; n++) {
            // se necese replenigu bufron de arbitraj nombroj
            if (!mm) {
                //const s = (v) => Math.sign(Math.random()-0.5) * v;
                for (let i=0; i<3; i++) {
                    const mm2 = Idealgaso.box_muller(E,D);
                    mm6[2*i] = mm2[0];
                    mm6[2*i+1] = mm2[1];    
                }
            }

            const e = {
                id: n+1,
                t: this.T - 1, // per memoro de la tempo en la eroj ni evitas refojan trakton ĉe ĉelmovo
                x: Math.random() * larĝo,
                y: Math.random() * alto,
                vx: mm6[mm],
                vy: mm6[mm+1],
                vz: mm6[mm+2] // z-dimensio de rapideco, loko ne gravas, ĉar ni projekcias al x-y-ebeneo
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
                throw `Neniu ĉelo por ${e.x},${e.y}!`
            }
        }
    }


    /**
     * Sur kiu ĉelo troviĝas pozicio (x,y)?
     */
    ĉelo(x,y) {
        const k = Math.trunc(x/this.Ĉl + this.Ĉl*Math.trunc(y/this.Ĉa));
        if (k>=this.ĉeloj.length) throw(`neniu ĉelo ${k} por x: ${x}, y: ${y}`);
        return this.ĉeloj[k];
    }


    /**
     * Movas eron al novaj koordinatoj nx, ny,
     * se necese ankaŭ al nova ĉelo
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
     * Trakuri la ĉelojn, movi ĉiujn erojn en ĉiu ĉelo,
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
                // movo al nx, ny, eventuale al nova ĉelo
                e.t = self.T;
                self.ĉelmovo(e,nx,ny);
            }
        }
        
        // trakuru ĉiujn ĉelojn kaj traktu movojn kaj reakciojn de la eroj
        for (let k in this.ĉeloj) {
            // movo
            Object.values(this.ĉeloj[k]).map((e) => movo(e));
        }

        // aktualigu la premon kaj obligu per maso kaj 2 (pro Δv = v-(-v) = 2v))
        const m = this.maso; // tion ni faros en premo() * Idealgaso.u
        this.premoj = {supre: m*2*premo.s, malsupre: m*2*premo.ms,
                dekstre: m*2*premo.d, maldekstre: m*2*premo.md};

        this.T++;
    }

    /**
     * Redonas la volumenon en nm³, por m³ vi devos ankoraŭ multobligi per 1e-27 
     */
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
        const tf = 1/this.intervalo; // korekto de ofteco, ĉar kolizioj pli ofte okazus
        const p = Object.values(this.premoj).reduce((p,x) => p+x,0) * tf * Idealgaso.u / this.takto;

        // la reprezentita areo de kvar flankoj
        const a = (2*this.larĝo + 2*this.alto)*this.profundo * 1e-18; // nm² -> m²
        // ni devos korekti ankoraŭ la dimensiojn de la areo de nm al m kaj de intervalo al s
        return p / a;
    }

    /**
     * Redonas la laboron kaŭzitan de ŝanĝo de volumeno en J
     * @param {number} dV volumenŝanĝo en nm³ - negativa por malgrandiĝo
     */
    volumen_laboro(dV) {
        return - this.nombro * Idealgaso.kB * this.temperaturo() * dV / this.volumeno();
    }

    /**
     * Redonas la temperaturŝanĝon pro volumen_laboro
     */
    temperatur_ŝanĝo(dV) {
        const dE = this.volumen_laboro(dV);
        return 2/2*dE / this.nombro / Idealgaso.kB;
    }

    /**
     * Redonas la averaĝan rapidecŝanĝon per volumenŝanĝo
     */
    adiabata_rapido(dV) {
        // tio ankoraŭ ne donas ĝustajn valorojn ŝajnas...! Trovu la eraron...
        return Math.sqrt(2 * Math.abs(this.volumen_laboro(dV)) / this.nombro / (this.maso*Idealgaso.u));
    }

    /**
     * Redonas la entropion (J/K),
     * vd. https://de.wikipedia.org/wiki/Ideales_Gas#Entropie
     */
    entropio() {
        /* entropio restos egala, se la volumenoj en kolumno 1
        respondas al la temperaturoj en la lasta kolumno, por
        adiabata procezo la entropio devus resti sama, ĉar
        nek varmo, ne materio interŝanĝiĝus kun la ĉirkaŭo!

        V(nm³) ln(V/T)	3/2 ln(T) -> diff	exp(diff/1,5)
        10000	-60,99				11,05	1.578,93
        20000	-60,30				10,35	994,66
        30000	-59,90				9,95	759,07
        40000	-59,61				9,66	626,60
        50000	-59,39				9,44	539,99
        60000	-59,20				9,25	478,18
        70000	-59,05				9,10	431,48
        80000	-58,92				8,97	394,73
        90000	-58,80				8,85	364,92
        100000	-58,69				8,74	340,17
        125000	-58,47	            8,52	293,15 *
        150000	-58,29				8,34	259,60
        200000	-58,00				8,05	214,29

        Nia nuna modelo (larĝadapto() {...}) iomete altigas la entropion ankoraŭ ĉe
        malpligrandigo de volumeno, tio povas esti statistika eraro pro la malmultaj eroj kaj 
        kolizioj, sed povas ankaŭ esti sitema erareto en nia modelo!
        */

        const N = this.nombro;
        const sigmo = Idealgaso.entropikonstanto(this.maso);
        return N * Idealgaso.kB * (
              Math.log(this.volumeno()*1e-27/N)
            + 3/2*Math.log(this.temperaturo())
        ) + N*sigmo;
    }

    /**
     * Redonas la entalpion H = U + pV
     */
    entalpio() {
        return this.energio() + this.premo()*this.volumeno()*1e-27;
    }

    /**
     * Redonas la Gibbs-energion G = U + pV - TS
     */
    gibsenergio() {
        return this.entalpio() - this.temperaturo()*this.entropio();
    }

}