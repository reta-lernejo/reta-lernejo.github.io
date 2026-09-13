class Gasero {
    /**
     * Aldoni eron ĉe donita pozicio kun radiuso, maso (por kolizioj), rapido.
     * La pentradon ni lasas al la uzanto de la klaso, ni nur vokas pentri() por tio
     * @param {*} pozicio x,y povas enhavi angulon a kaj pozicion z (uzeble por perspektivkoloro), ni provizore ne konsideras z ĉe interkolizioj
     * @param {*} radiuso ni uzas por rekono de kolizioj
     * @param {*} rapido x,y, povas ankaŭ enhavi angulan rapidon a
     * @param {*} maso por aklkuli rapidŝanĝojn ĉe kolizioj
     */
    constructor(id,pozicio,radiuso,rapido,maso) {
        this.id = id;
        this.rad = radiuso;
        this.maso = maso;
        this.x = pozicio.x;
        this.y = pozicio.y;
        this.z = pozicio.z || 0;
        this.a = pozicio.a || 0;
        this.vx = rapido.x;
        this.vy = rapido.y;
        this.vz = rapido.z; // ne uzata momente
        this.va = rapido.a;
    }

    pozicio() {
        return({x: this.x, y: this.y, z: this.z});
    }

    rapido() {
        return({x: this.vx, y: this.vx, a: this.va});
    }

    kolizi_kalkulo(ero) {
        // relativ-vektoroj
        const dp = { x: this.x - ero.x, y: this.y - ero.y };
        const dv = { x: this.vx - ero.vx, y: this.vy - ero.vy };
        const R = this.rad + ero.rad;
      
        // koeficientoj de la solvenda kvadrata ekvacio
        const a = dv.x * dv.x + dv.y * dv.y;
        const b = 2 * (dp.x * dv.x + dp.y * dv.y);
        const c = (dp.x * dp.x + dp.y * dp.y) - (R * R);
      
        // relativrapido = 0 => paralela movo
        if (a === 0) return null; 
      
        // diskriminanto
        const D = b * b - 4 * a * c;
      
        // D < 0: neniu kruciĝo antaŭvidebla
        // b >= 0: diverĝa movo
        if (D < 0 || b >= 0) return null;
      
        // plej baldaŭa kolizitempo
        const t = (-b - Math.sqrt(D)) / (2 * a);
      
        if (t < 0) return null; // kolizitempo jam pasinta
      
        // kolizi-pozicioj
        const p_kol = { x: this.x + t * this.v.x, y: this.y + t * this.vy };
        const ero_p_kol = { x: ero.x + t * ero.vx, y: ero.y + t * ero.vy };
      
        // tuŝpunkto
        //const ratio = r1 / (r1 + r2);
        //const p_kontakt = {
        //  x: p_kol.x + ratio * (ero_p_kol.x - p_kol.x),
        //  y: p_kol.y + ratio * (ero_p_kol.y - p_kol.y)
        //};
      
        return { tempo: t, poz1: p_kol, poz2: ero_p_kol }; //p_kontakt  };
    }

    /**
     * Aldonas kolizinformon, se ne okazos alia kolizio pli frue
     */
    kolizi_informo(tempo, pk, ero) {

    }

    /**
     * Kalkulas novan rapidvektoron por la gasero
     * ĉe kolizio kun maso de rapido v
     * @param {*} v 
     * @param {*} maso 
     */
    kolizio(v,maso) {
        // formuloj pri elasta puŝo, vd. ekz-e 4a,4b en
        // https://de.wikipedia.org/wiki/Sto%C3%9F_(Physik)#Elastischer_Sto%C3%9F
        this.vx = 2*(this.maso*this.vx + maso*v.x)/(this.maso+maso) - v.x;
        this.vy = 2*(this.maso*this.vy + maso*v.y)/(this.maso+maso) - v.y;
    }

    /**
     * Tion vi devas realigi por ĉiu unuopa molekulspeco
     */
    pentru() { }
}

class Gasujo {

    /**
     * Ni dividas la gasujon virtuale en ĉelojn 
     * aparte por pli rapida kontrolo de kolizioj
     * @param {*} horz_dividoj 
     * @param {*} vert_dividoj 
     */
    constructor(larĝo, alto, horz_dividoj, vert_dividoj) {
        this.larĝo = larĝo;
        this.alto = alto;
        this.horz_dividoj = horz_dividoj;
        this.vert_dividoj = vert_dividoj;
        this.ĈL = larĝo/horz_dividoj;
        this.ĈA = alto/vert_dividoj;
        this.ĉeloj = Array.from({ length: horz_dividoj*vert_dividoj }, () => ({}));
        // por regi koliziojn ni registros la kolizitempojn
        // ni ankaŭ bezonas inkluzivi la koliziojn kun la vandoj
        // do iel ni havu superklason por koliziebla objekto
        // kolizioj estas objektoj {tempo,poz1,ero1,poz2,ero2}
        this.kolizitempoj = {};        
        this.koliziantoj = new WeakMap();
    }

    /**
     * Aldoni eron ĉe donita pozicio kun radiuso, maso (por kolizioj), rapido.
     * La pentradon ni lasas al la uzanto de la klaso, ni nur vokas pentri() por tio
     * @param {*} pozicio x,y povas enhavi pozicion z (uzeble por perspektivkoloro), ni provizore ne konsideras ĝin ĉe interkolizioj
     * @param {*} radiuso ni uzas por rekono de kolizioj
     * @param {*} rapido x,y, povas ankaŭ enhavi angulan rapidon a
     * @param {*} maso por aklkuli rapidŝanĝojn ĉe kolizioj
     * @param {*} pentri 
     */
    aldonu(gasero) {
        const ĉelo = this.ĉelo(gasero.x,gasero.y);
        ĉelo[gasero.id] = gasero;
    }

    /**
     * Pentri ĉiujn erojn ĉe la aktuala pozicio
     */
    pentru() {
        this.ĉeloj.forEach((ĉelo) => {
            Object.values(ĉelo).forEach((ero) => {
                ero.pentru(ero);
            })
        })
    }

    /**
     * En kiu ĉelo troviĝas pozicio (x,y)?
     */
    ĉelo(x,y) {
        const k = Math.trunc(x/this.ĈL + (this.larĝo/this.ĈL)*Math.trunc(y/this.ĈA));
        if (k >= this.ĉeloj.length) throw(`neniu ĉelo ${k} por x: ${x}, y: ${y}`);
        return this.ĉeloj[k];
    }

    /**
     * Redonas la ĉelpozicion (kol,lin)
     * @param {number} k la numero de la ĉelo
     */
    ĉelpos(k) {
        const mod = this.horz_dividoj; //this.larĝo/this.ĈL;
        return { kol: k%mod, lin: Math.trunc(k/mod) };
    }

    najbara_ago(k, ago) {
        const ĉp = this.ĉelpos(k);
      
        for (let dl = -1; dl <= 1; dl++) {
          const lin = ĉp.lin + dl;
          // t.e. ekster (mal)supra horizontalo
          if (lin < 0 || lin >= this.vert_dividoj) continue; 
      
          for (let dk = -1; dk <= 1; dk++) {
            // ne konsideru la centra ĉelon mem inter la najbaroj
            if (dl === 0 && dk === 0) continue; 
      
            const kol = ĉp.kol + dk;
            // t.e. ekster (mal)dekstra rando
            if (kol < 0 || kol >= this.horz_dividoj) continue; 
      
            const najbaro = this.ĉeloj(lin * this.horz_dividoj + kol);
            ago(najbaro);
          }
        }
    }


    /**
     * Trakuri la ĉelojn, movi ĉiujn erojn en ĉiu ĉelo,
     * konsiderante koliziojn
     */
    movado() {
        const self = this;
        const tf = this.intervalo * 1e9 * this.takto; // artefarita malrapidigo, 
            // sed ni mezuras nm anst. m kaj ni havas
            // takton de nur ono de sekundo.
        
        // trakuru ĉiujn ĉelojn kaj traktu movojn kaj evtl. koliziojn de la eroj
        this.ĉeloj.forEach((ĉelo) => {
            // movo
            Object.values(ĉelo).map((e) => {
                // movo de e laŭ ĝia rapideco kun eventuala reflekto ĉe la bordoj        
                if (e.t < self.t) {
                    const nx = e.x + e.vx * tf;
                    const ny = e.y + e.vy * tf;
            
                    self.vandokolizio(e,nx,ny);
                }
            });
        });

        //this.t++;
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
        const kx = Math.trunc(x/this.ĈL);
        const ky = Math.trunc(y/this.ĈA);
        const nkx = Math.trunc(nx/this.ĈL);
        const nky = Math.trunc(ny/this.ĈA);
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
     * Ni antaŭkalkulas, kiam kaj kie okazos kolizioj
     * inter la eroj kaj kun la vandoj. Por ĉiu ero ni bezonas
     * noti nur la plej baldaŭan kolizion kaj ignori postajn
     * ĉar ja antaŭe okazos direktoŝanĝo
     */
    kolizikalkulo() {
        // ni trakuros ĉiujn ĉelojn
        // kaj poste la koliziojn inter la ero kaj ĉiuj sekvaj en la ĉelo
        // krome ni kalkulos kolizojn inter la ero kaj la eroj de la ĝis ok 
        // najbaraj ĉeloj

        // trakuru ĉiujn ĉelojn...
        this.ĉeloj.forEach((ĉelo,k) => {
            // ...ene de ĉiu ĉelo ni kalkulas por ĉiu ero, koliziojn 
            const eroj = Object.values(this.ĉeloj[k]);
            for (const i=0; i<eroj.length-1; i++) {
                const ero_i = eroj[i];
                // unue konsiderante la samĉelanojn
                for (const j=i+1; j< eroj.length; j++) {
                    const ero_j = eroj[j];
                    const kolizio = ero_i.kolizi_kalkulo(ero_j);
                    // kondiĉojn pri pli furaj kolizioj, kolizio kun vandoj
                    // estos konstrolitaj ĉe la registro
                    if (kolizio) {
                        this.registru_kolizion(kolizio.tempo,
                            kolizio.poz1,ero_i,
                            kolizio.poz2,ero_j);
                    }
                }
                // poste konsiderante ĉiujn najbarojn
                this.najbara_ago(k,(najb) => {
                    Object.values(ĉelo).forEach((ero_n) => {
                        const kolizio = ero_i.kolizi_kalkulo(ero_j);
                        // kondiĉojn pri pli furaj kolizioj, kolizio kun vandoj
                        // estos konstrolitaj ĉe la registro
                        if (kolizio) {
                            this.registru_kolizion(kolizio.tempo,
                                kolizio.poz1,ero_i,
                                kolizio.poz2,ero_j);
                        }
                    });
                });
            }            
        });
    }

    /**
     * Registri estontan kolizion inter ero kaj vando, sed nur
     * se ne antaŭvideble okazos alia kolizio de la ero pli frue
     */
    /*
    registru_vando_kolizion(tempo,poz,ero) {
        const kolizio = this.koliziantoj(ero);
        if (kolizio.tempo > tempo) {
            // forigu la informojn pri la antaŭa kolizio
            this.koliziantoj.delete(kolizio.ero1);
            this.koliziantoj.delete(kolizio.ero2);
            // aldonu la novan
            this.koliziantoj.set(ero,{
                tempo,
                poz1: poz,
                ero1: ero
            });
        }
    }*/

    /**
     * Ni registras estontan kolizion inter la du eroj, kondiĉe,
     * ke ne unu el ambaŭ jam havos pli fruan kolizion kun alia
     * ero aŭ kun unu el la vandoj. Pli malfruan kolizion de
     * la du eroj evtl. ni anstataŭigos
     */
    registru_kolizion(tempo,poz1,ero1,poz2,ero2) {
        const kolizio1 = this.koliziantoj(ero1);
        const kolizio2 = this.koliziantoj(ero1);
        // okazos tro malfrue, do ignoru
        if (kolizio1 && kolizio1.tempo <= tempo) return;
        if (kolizio2 && kolizio2.tempo <= tempo) return;
        // la kolizio ne okazus interne de la vandoj, do ignoru ĝin
        if (poz1.x - ero1.rad < 0 && poz1.x + ero1.x > this.larĝo) return;
        if (poz1.y - ero1.rad < 0 && poz1.y + ero1.y > this.alto) return;
        if (poz1.x - ero2.rad < 0 && poz1.x + ero2.x > this.larĝo) return;
        if (poz1.y - ero2.rad < 0 && poz1.y + ero2.y > this.alto) return;
        
        // bone, ni registras la kolizion ĉe ambaŭ eroj, 
        // evtl. pli malfruan ni anstataŭigos tiel
        const kolizio = {tempo,poz1,ero1,poz2,ero2}
        this.koliziantoj.set(ero1,kolizio);
        this.koliziantoj.set(ero2,kolizio);
    }

    /**
     * Traktas koliziojn kun la eksteraj vandoj. Por specialaj aranĝoj, ekz-e internaj
     * vandoj, vi povas superŝargi tiun metodon.
     * 
     * @param {object} e la traktenda ero
     * @param {number} nx nova x-koordinato
     * @param {number} ny nova y-koordinato
     */
    vandokolizio(e,nx,ny) {
        const vando = {};

        // momente ni nur movas la erojn
        if (nx < 0) { // kolizio maldekstre
            e.vx = -e.vx;
            nx = -nx; // e.x - vx;
            vando.md = true;
        } else if (nx > this.larĝo) { // kolizio dekstre
            e.vx = -e.vx;
            nx = this.larĝo - (nx-this.larĝo); // e.x - vx;
            vando.d = true;
        }

        if (ny < 0) { // kolizio supre
            e.vy = -e.vy;
            ny = -ny; //e.y + e.vy;
            vando.s = true;
        } else if (ny > this.alto) { // kolizio malsupre
            e.vy = -e.vy;
            ny = this.alto - (ny-this.alto); //e.y + e.vy;
            vando.ms = true;
        }
        // movo al nx, ny, eventuale al nova ĉelo
        e.t = this.t;
        this.ĉelmovo(e,nx,ny);
        return vando;
    }

}