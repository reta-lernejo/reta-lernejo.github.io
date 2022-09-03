/**
 * JSON-strukturo de formuloj, ekz-e CH4 + 2 O2 -> CO2 + 2 H2O
 * 
 * KOREKTU: se ni donas atomojn kiel objekto ni ankoraŭ devas difini, kies pozicio estas en (0,0)!
 * 
 *  m: {
 * // molekuloj
 * CH4: {
 *   // atomoj
 *   a: { c: "C", h1: "H", h2: "H", h3: "H", h4: "H" }, // mlg. eble: "CH4" kreas la antaŭan strukturon...
 *   // ligoj
 *   l: { c: "0-h1 3-h2 6-h3 9-h4"} // pli mallonge eble: "-% h1 h2 h3 h4"
 *  }
 *  O2: {
 *   a: { o1: "O", o2: "O" } // mlg. "O2"
 *   l: { o1: "3=o2" }
 *   }
 *  ...
 * }
 * // formulo:
 *   f: ["CH4","+","2","O2",...] // mlg.: "CH4 + 2 O2 ..." nomoj kun komenca litero referencas al supraj difinoj...
 * }
 * 
 * kompleksaj molekuloj ankaŭ povas enhavi grupojn difinendaj per g: {...}
 * kie en la strukturo ni difinu elktron(par)ojn, ŝargojn, oksidnombroj k.c.?
 * verŝajne plej bone tiam anstataŭ "C" ni aldonu strukturon {s: "C", o: "+2", e: "2:"}
 * aŭ post a kaj l donu per ŝlosilo e: {c: ..., h1: ... } pliajn informojn pri la elektronoj de la atomoj
 * ĉi-lasta estas verŝajne pli fleksebla kaj legebla solvo, krome tio permesus ŝovi tiujn informojn de la grupo
 * al la molekulo aŭ eĉ formulo!
 */



/**
 * Angulojn vi povas doni absolute, laŭ la horloĝo:
 * 0 (supre), 1 (30°), 2 (60°), 3 (90°), 4 (120°), 5 (150°), 6 (180°)
 * 7 (210°), 8 (240°), 9 (270°), x (300°), y (330°)
 * aŭ relative al la antaŭa:
 * d (duoncirklo, 180°), t (trioncirklo, 120°), k (kvaroncirklo, 90°), 
 * e (seponciriklo, 51,5°), o (okonocirklo, 45°), 
 * A (akvo, 105°), a (85°), p (piramida/tetraedra, 109,5°), s (72°), S (144°), z (36°), Z (42°)
 * "m " - minusas la sekvantajn angulojn
 * 
 * elektronoj/ligoj:
 * . unuopa elektrono, : elektronparo, ; elektrontriopo
 * - unuopa ligo, = duopa ligo, # triopa ligo
 * < kojno plena (antaŭen) > kojno striita (malantaŭen)  
 * ~ hidrogenponto / parta ligo
 * (|) atribuo de kovalentaj elektronoj al la atomoj por kalkulo de oksidstatoj
 *  
 * La distribuon de elektronoj/ligoj vi donu kiel unu signaro en
 * kiu alternas angulo kun elektrono/ligo. Vi povas tute rezigni pri
 * la donado de anguloj komencante la distribuon per % aŭ doni
 * nur la komencan angulon kaj poste % Tiam la elektronoj/ligoj
 * estas sammezure aranĝataj ĉirkaŭ la elementsimbolo. En tiu okazo
 * vi ankaŭ povas enŝovi spacsignon aŭ _ por ellasi unu pozicion
 */


class Lewis {

    constructor(svg) {
        this.svg = svg;
    }


    // parametroj por distantcoj ktp. de la desegno
    static _L = {
        ns: "http://www.w3.org/2000/svg",
        de: 7, // distanco de elektronoj de atommezo
        sy: 4, // dy de ŝargo relative al la elementsimbolo
        dkr: 10,// distanco de jonkrampoj
        re: .5, // radiuso de elektrono(punkto)
        rf: 2, // radiuso de formalŝargo-cirkleto
        dv: 6, // distanco de valentstreko
        lv: 4, // longeco de valentstreko
        dk: 4, // distanco de kojno
        yk: 1, // duona larĝeco de kojno
        lk: 5, // longeco de kojno
        dh: 6, // distanco de hidrogenponto
        lh: 10, // longeco de hidrogenponto
        // dJ: 19, // distanco inter jonoj
        dM: 16, // distanco inter atomoj ĉe molekuloj (? - problemo estas ĉu ni uzas nur puhktoj aŭ valentstrekojn!)
        ti: 200 // tempintervalo por animacio
    }

    /** Elkalkulas la sekvan angulon surbaze de donita signo, antaŭa kaj apriora angulo 
     * 
    */
   _a(sgn,aa,def,af=1) {
        // absoluta angulo
        if (sgn >= "0" && sgn <= "9") {
            return 30 * (sgn - "0")
        };
        
        if (sgn == "x") return 300;
        if (sgn == "y") return 330;

        // relativa angulo
        return aa + af*({
            d: 180, t: 120, k: 90, e: 51.5, o: 45,
            A: 105, a: 85, p: 109.5, 
            s: 72, S: 144, z:36, Z: 42
        }[sgn] || def);
    }


    /**
     * helfunkcio por krei tekston kun evtl. supra indico (ekz-e ŝargo)
     * @param tx: la texto, supra indico estu apartigita per '^'
     */ 
    _t(tx) {
        const parts = tx.split('^');
        const ns = Lewis._L.ns;
        const sy = Lewis._L.sy;
        const text = document.createElementNS(ns,"text");
        text.append(parts[0]);        
        if (parts.length>1) {
            const tspan = document.createElementNS(ns,"tspan");
            tspan.setAttribute("dy",-sy);
            tspan.setAttribute("class","sup");
            tspan.textContent = parts[1]
            text.append(tspan);
        }
        return text;
    }

    /**
     * helpfunkcio por desegni cirkleton por elektrono
     * 
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la punkto aperu, 0 = supre, 270 = maldekstre
     */ 
    _e(dy=0,a=0) {
        const ns = Lewis._L.ns;
        const re = Lewis._L.re;
        const de = Lewis._L.de;
        const e = document.createElementNS(ns,"circle");
        e.setAttribute("r",re);
        e.setAttribute("cx",de);
        if (dy) e.setAttribute("cy",dy);
        if (a != 90) e.setAttribute("transform",`rotate(${a-90})`);
        return e;
    }

    /**
     * helpfunkcio por desegni linion por ligo
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
    _l(dy,a) {
        const ns = Lewis._L.ns;
        const dv = Lewis._L.dv;
        const lv = Lewis._L.lv;
        const p = document.createElementNS(ns,"line");
        p.setAttribute("x1",dv);
        p.setAttribute("x2",dv+lv);
        if (dy) {
            p.setAttribute("y1",dy);
            p.setAttribute("y2",dy)
        }
        if (a != 90) p.setAttribute("transform",`rotate(${a-90})`);   
        return p;     
    }

    /**
     * helpfunkcio por desegni kojnon por ligo antaŭen
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
     _ka(a) {
        const ns = Lewis._L.ns;
        const lk = Lewis._L.lk;
        const yk = Lewis._L.yk;
        const dk = Lewis._L.dk;

        const p = document.createElementNS(ns,"path");
        p.setAttribute("d",`M${dk},0 l${lk},${-yk} l0,${2*yk} Z`);
        p.setAttribute("class","akojno");
        if (a != 90) p.setAttribute("transform",`rotate(${a-90})`);   
        return p;     
    }

    /**
     * helpfunkcio por desegni kojnon por ligo malantaŭen
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
     _km(a) {
        const ns = Lewis._L.ns;
        const lk = Lewis._L.lk;
        const dk = Lewis._L.dk;
        const yk = Lewis._L.yk;

        const p = document.createElementNS(ns,"path");
        p.setAttribute("d",`M${dk},0 l${lk},${-yk} l0,${2*yk} Z`);
        // p.setAttribute("d",`M${_L.dk},${-_L.yk} l${_L.lk},${_L.yk} L${_L.dk},${_L.yk} Z`);
        p.setAttribute("class","mkojno");
        if (a != 90) p.setAttribute("transform",`rotate(${a-90})`);   
        return p;     
    }

    /**
     * helpfunkcio por desegni linion por hidgrogenponto
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
     _h(dy,a) {
        const ns = Lewis._L.ns;
        const dh = Lewis._L.dh;
        const lh = Lewis._L.lh;

        const p = document.createElementNS(ns,"line");
        p.setAttribute("x1",dh);
        p.setAttribute("x2",dh+lh);
        p.setAttribute("class","hponto");
        if (dy) {
            p.setAttribute("y1",dy);
            p.setAttribute("y2",dy)
        }
        if (a != 90) p.setAttribute("transform",`rotate(${a-90})`);   
        return p;     
    }

    /**
     * desegnu maldekstran krampon
     */
    _kl() {
        const ns = Lewis._L.ns;
        const dk = Lewis._L.dkr;

        const pl = document.createElementNS(s,"polyline");
        pl.setAttribute("points",`${-dk*.8},${-dk} ${-dk},${-dk} ${-dk},${dk} ${-dk*.8},${dk}`);
        pl.setAttribute("fill","none");
        return pl;
    }

    /**
     * desegnu dekstran krampon
     */
    _kr(shargo) {
        const ns = Lewis._L.ns;
        const dk = Lewis._L.dkr;

        const pl = document.createElementNS(ns,"polyline");
        pl.setAttribute("points",`${dk*.7},${-dk} ${dk},${-dk} ${dk},${dk} ${dk*.7},${dk}`);
        pl.setAttribute("fill","none");
        return pl;
    }

    /**
     * desegnu formalŝargon kiel cirklitan + aŭ -
     */
    _fs(a,plus) {
        const ns = Lewis._L.ns;
        const de = Lewis._L.de;
        const rf = Lewis._L.rf;

        const g = document.createElementNS(ns,"g");
        g.setAttribute("class","shargo");
        const c = document.createElementNS(ns,"circle");
        c.setAttribute("r",rf);
        c.setAttribute("cx",de);
        const p = document.createElementNS(ns,"path");
        const l = 3/4*rf;
        let d = `M${de-l/2} 0L${de+l/2} 0`;
        if (plus) d+= `M${de} ${-l/2}L${de} ${l/2}`
        p.setAttribute("d",d);
        g.append(c,p);
        if (a != 90) g.setAttribute("transform",`rotate(${a-90})`);
        return g;     
    }

    /** 
     * desegnu ŝargon apud jonkrampo
     */
    _sh(shargo) {
        const ns = Lewis._L.ns;
        const dk = Lewis._L.dkr;

        const text = document.createElementNS(ns,"text");
        text.textContent = shargo;
        text.setAttribute("x",dk*1.3);
        text.setAttribute("y",-dk*.9);
        return text;
    }

    /** se atomoj estas donitaj kiel signaro ni transformas tion al objekto */
    _a_obj(a) {  
        let obj = {};      
        if (typeof a === "object") {
            for (const [a_, smb] of Object.entries(a)) {
                obj[a_] = {smb: smb};
            }
        } else if (typeof a === "string") {
            const re = /([A-Z][a-z]?)([1-9]?[0-9]?)/g;
            // ni havas komence de la signaro ĉiam majusklan elementnomon evtl. sekvita de nombro!
            let m, first=true;
            while ((m = re.exec(a))) {
                const e = m[1];
                const el = e.toLowerCase();
                const n = m[2];
                if (!n) {
                    // unu atomo
                    obj[el] = {smb: e};
                    if (first) obj[el].pos = {x: 0, y:0}
                } else {
                    for (let n_=1; n_<=n; n_++) {
                        const en = `${el}${n_}`;
                        obj[en] = {smb: e};
                        if (first) obj[en].pos = {x: 0, y:0}
                    }
                }
                first = false;
            }
        }
        return obj;
    }

    /** Redonas la pozicion de atomo. Se ekzistas absoluta, tiun, se
     * estas relativa ĝi kalkulas la absoluton el la relativa
     * @param atm la ŝlosilo de la atomo, ekz-e h1
     * @param rikuro ni permesas maksimume 10 rikurojn por eviti etenre kuri en cikloj!
     */
    _pos(atm, rik=0) {
        if (rik>10) throw `Tro da rikuroj (ĉu ciklo?) ĉe ${atm}.`;
        const a = this.atomoj[atm];
        const pos = a.pos;
        if ('x' in pos && 'y' in pos) {
            return pos;
        } else {
            if (! 'p' in pos && 'dx' in pos && 'dy' in pos) 
                throw `Atomo ${atm} havas nek absolutan nek relativan pozicion.`
            const ppos = this._pos(pos.p,rik++)
            pos.x = ppos.x + pos.dx;
            pos.y = ppos.y + pos.dy;
            this.atomoj[atm].pos = pos; // aktualigu la pozicion de la atomo per la absoluta
            return pos;
        }
    }

    /**
     * Ornamas SVG-grupon g de atomsimbolo per elektronoj ĉirkaŭe
     * @param {*} g 
     * @param {*} elektronoj 
     */
    _elektronoj(g,elektronoj) {
        let af = 1; // ŝaltebla per "m " al -1, tio minusos postajn relativajn angulojn

        // se lig-anguloj ne estas aparte donitaj ni proporcie distribuas
        let e = 0; // montrilo en la signaron de eltrj
        let a = 0, da = 0; // aktuala kaj diferenca anguloj
        if (elektronoj && elektronoj.indexOf('%') >= 0) {
            const pj = elektronoj.split('%');
            a = this._a(pj[0],0,0);
            da = 360 / pj[1].length;
            e = elektronoj.indexOf('%')+1;
        };

        // ni trakuras la elektronaranĝon per
        // kura variablo e ĝis la fino...
        while (e < elektronoj.length) {
            const ee = elektronoj[e];
            // la aktuala signo estas angulo, se la signo estas el 0-9, A-z
            if ((ee >= "0" && ee <= "9") || (ee >= "A" && ee <= "z")) {
                if (ee == "m") {
                    af = -1*af;
                } else {
                    a = this._a(ee,a,da,af)
                }
            } else {
                // aliaj signoj donas la elektron-specon (unuopa, paro k.s.)
                switch (ee) {
                    case ".":
                        g.append(this._e(0,a));
                        break;
                    case ":":
                        g.append(this._e(-1,a),this._e(1,a));
                        break;
                    /*
                    case ";": // triopo (ekz. N2)
                        g.append(this._e(-2,a),this._e(0,a),this._e(2,a));
                        break;
                    */
                    // ni permesas ankaŭ indiki formalajn ŝargojn inter "elektronoj"
                    case "+": // formala ŝargo (+)
                        g.append(this._fs(a,true));
                        break;
                    case "'": // formala ŝargo (-)
                        g.append(this._fs(a,false));
                        break;
                    case " ":
                        break;
                } // ...switch  
                a += da; // ĉe proporcia aranĝo da>0!
            } // else
            e++;
        } // ...while
    }

    /**
     * Ornamas SVG-grupon g de atomsimbolo per lig-strekoj ĉirkaŭe
     * @param {*} g 
     * @param {*} ligoj 
     */
    _ligoj(atm,g,ligoj) {
        const dM = Lewis._L.dM;

        let af = 1; // ŝaltebla per "m " al -1, tio minusos postajn relativajn angulojn

        // se lig-anguloj ne estas aparte donitaj ni proporcie distribuas
        let a = 0, da = 0; // aktuala kaj diferenca anguloj
        let aligj = [];

        // anstataŭ doni ĉiujn angulojn unuope
        // ni post % lasas al la programo dividi la angulojn sammezure
        if (ligoj.indexOf('%') >= 0) {
            const pj = ligoj.split('%');
            a = this._a(pj[0],0,0);
            aligj = pj[1].split(" ");
            da = 360 / alig.length;
        } else {
            aligj = ligoj.split(' ');
        }

        // ni trakuras la ligojn ĝis la fino...
        for (const ligo of aligj) {
            let l = 0; // montrilo en la signaron de unuopa ligo
            while (l<ligo.length) {
                let ll = ligo[l];
                // ĉu la aktuala signo estas angulo 0-9, A-z
                if ((ll >= "0" && ll <= "9") || (ll >= "A" && ll <= "z")) {
                    if (ll == "m") {
                        af = -1*af;
                    } else {
                        a = this._a(ll,a,da,af)
                    }
                } else {
                    // nun ni atendas ligtipon
                    switch (ll) {
                        case "-":
                            g.append(this._l(0,a));
                            break;
                        case "=":
                            g.append(this._l(-1,a),this._l(1,a));
                            break;
                        case "#":
                            g.append(this._l(-2,a),this._l(0,a),this._l(2,a));
                            break;
                        case "<": // kojno antaŭen (plena)
                            g.append(this._ka(a));
                            break;
                        case ">": // kojno malantaŭen (streka)
                            g.append(this._km(a));
                            break;
                        case "~": // hidrogenponto / parta ligo
                            g.append(this._h(0,a));
                            break;
                        case " ":
                            break;
                    } // ...switch
                    a += da; // ĉe proporcia aranĝo da>0!

                    // post ligsigno devas veni referenco al atomo au grupo, ni do forlasas
                    // la while-maŝon
                    break;
                } // else
                l++;
            } // ...while
            
            // resto estas nomo de alia atomo aŭ grupo
            const ref = ligo.substring(l+1);
            //const pos = this.atomoj[atm].pos || {x:0, y:0};
            const phi = (a-90)/180 * Math.PI; // -90°, ĉar 0° ĉe ni estas supre kaj ne dekstre!
            const Ax = dM * Math.cos(phi);
            const Ay = dM * Math.sin(phi);

            // ĉar ni ne scias en kiu ordo la atomoj kaj grupoj
            // traktiĝas kaj ĉu do nuna atm jam havas validan pozicion,
            // ni notas la pozicion relative al nuna atomo atm
            if (ref && this.atomoj[ref]) {
                // pozicio de referencita atomo estas relativa al la nuna pozicio per angulo 180-a
                this.atomoj[ref].pos = {dx:Ax,dy:Ay,p:atm}
            } else if (ref && this.atomoj[ref]) {
                this.grupoj[ref].pos = {dx:Ax,dy:Ay,p:atm};
            }
    
        } // for

    } // _ligoj

    /**
     * Kreas elementsimbolon kun ĉirkaŭaj elektronoj kaj ligoj ktp. kiel SVG-grupo
     * @param {*} atm 
     * @param {*} elemento 
     * @param {*} elektronoj 
     * @param {*} ligoj 
     */
    _atomo(atm,smb,elektronoj,ligoj) {
        const ns = Lewis._L.ns;
       
        // skribu elementnomon centre
        const g = document.createElementNS(ns,"g");
        g.setAttribute("class",smb);

        g.append(this._t(smb))

        // desegnu elektronojn / ligojn ĉirkaŭe
        let ne = 0;
        if (elektronoj) this._elektronoj(g,elektronoj);
        if (ligoj) this._ligoj(atm,g,ligoj);

        return g;
    }
    
     /**
     * kreas molekulon kiel SVG-g-elementon kaj redonas tiun
     * @param {*} molekulo ojekto kun la difino de la molekulo
     * @param {*} grupoj se donita, povas enhavi grupoj kiel partoj de la molekulo, ekz -OH aŭ -COOH grupo povas doniĝi tiel
     * @returns 
     */
    _molekulo(molekulo,grupoj) {
        const ns = Lewis._L.ns;
        const dM = Lewis._L.dM;
        let poz = -1;
        this.grupoj = grupoj;
        // atomoj povas doniĝi kiel objekto aŭ signaro, tiam ni devas ankoraŭ krei la objekton
        this.atomoj = this._a_obj(molekulo.a);
        const mlk = document.createElementNS(Lewis._L.ns,"g");

        let gj = {};
        for (const atm of Object.keys(this.atomoj)) {
            //if (!this.atomoj[atm].pos) this.atomoj[atm].pos = {x:0, y:0}; // apriora pozicio, ŝovita dum trakuro de ligoj
            const smb = this.atomoj[atm].smb;
            const elektronoj = molekulo.e && molekulo.e[atm] ? molekulo.e[atm] : null;
            const ligoj = molekulo.l && molekulo.l[atm] ? molekulo.l[atm] : null;
            const g = this._atomo(atm,smb,elektronoj,ligoj);
            gj[atm] = g;   
        } // ...for

        // dum la procedo ni notis ĉiujn poziciojn de atomoj kaj grupoj
        // ni devos ankoraŭ ŝovi la g-elementojn al tiuj pozicioj!
        for (const a_ of Object.keys(gj)) {
            const pos = this._pos(a_);
            if (pos.x || pos.y) {
                const g_ = gj[a_];
                g_.setAttribute("transform",`translate(${pos.x} ${pos.y})`);    
            }
            //mlk.append(g_);
        }

        //this.svg.append(mlk);
        mlk.append(...Object.values(gj));
        return mlk;
    }

   /**
     * desegni atomojn kaj molekulojn en elektronstruktura formulo laŭ Lewis kiel SVG-desegno
     * 
     * @param spec listo de atomoj donita kiel 4-opoj [simbolo^ŝargo,elektronoj,ŝovo,ŝovangulo]
     * elementoj de la kvaropoj krom la unua estas forlaseblaj, la unua signo en elektronoj
     * donas la flankon, kie komenci desegnadon en horloĝa direkto la elektronojn (>,<,^,v)
     * eblaj valoroj estas .:; -=# (ĉu subteni ankaŭ kojnojn per vV?), valentstrekojn
     * ni desgnas nur ĉe unu kaj en la alia donas spacsignon anstataŭe.
     * 
     * Ŝovoj estas aŭtomataj laŭ numero en la listo je unu loko, sed por nelinie
     * skribitaj molekuloj povas esti donitaj per nombro de atomlokoj kaj angulo.
     * Anguloj por ŝovi atomon ene de la molekulo estas tiel, ke 1,0 = dekstren je unu loko,
     * 2,30 = du lokojn en direkto 30°.
     * 
     * Ekz-e por O2 ni donus ["O",">:::"], ["O","<:::",1] aŭ per valentstrekoj
     * ["O","3%=::"], ["O","< ::",1]
     * 
     * IDEOJ: eble pli bone anst. angulaj ŝovoj de centro, kiuj malfaciliĝas ĉe pli kompleksaj
     * molekuloj, ni ŝanĝu la strukturon tiel, ke ni permesu ingigi la ligantojn 
     * kaj donu la angulojn per samajn rimedoj kiel la elektronŝargojn:
     * ekz-e por H2O ["O","3-A-a:a:",[3,["H"],A,["H"]], aŭ mallongigite
     * ["O","3-A-a:a:","3H,AH"]
     * Alia maniero estas doni unue liston de ĉiuj atomoj kaj poste
     * montru la strukturon per aparta signaro:
     * atomoj: [["O","3-A-a:a:"],"H","H"]
     * strukturo: ["1-2","1-3"] aŭ {1: [2,3]}
     */
    molekulo(molekulo,grupoj) {
        const mlk = this._molekulo(molekulo,grupoj);
        this.svg.append(mlk);
    }    

    /**
     * Tradukas liston de termoj (molekuloj aŭ kombinaj signoj) al kombinita formulo
     * 
     * @param termoj listo de termoj kiuj povas esti aŭ specifo kiel por la funkcio "molekulo" aŭ simplaj signaroj ('+', '->' k.s.)
     */
    formulo(termoj) {
        const frm = document.createElementNS(Lewis._L.ns,"g");
        let ŝovo = 0;
        for (const t of termoj) {
            const m = this._molekulo(t);
            // ĝi jam estas aldonita al svg, sed ni povas ankoaŭ ŝovi ĝin
            if (ŝovo) {
                m.setAttribute("transform",`translate(${ŝovo} 0)`);
                ŝovo += 20; // plibonigenda...
            }
            frm.append(m);
        }

        this.svg.append(frm);
        return frm;
    }

    /**
     * Kreas neŭtralan atomon aŭ jonon kiel simbolo, poste desegnebla per <use>...
     * 
     * @param smb elem,entsimbolo, ŝargo povas donigi post '^', tiam ne aperas [...] cirkaŭ la jono
     * @param n_e nombro da elektronoj
     * @param shargo ŝargo, se donita tiel aperas apud [..]
     */ 

    simbolo(id,smb,n_e,shargo) {
        const dstrb = [
            [0,0,0,0],
            [1,0,0,0],
            [1,0,1,0],
            [1,1,1,0],
            [1,1,1,1],
            [2,1,1,1],
            [2,2,1,1],
            [2,2,2,1],
            [2,2,2,2]
        ];
        const ns = Lewis._L.ns;        
        const sym = document.createElementNS(ns,"g");
        sym.id = id;
        sym.setAttribute("class",smb.split('^'));

        // desegnu simbolon, evtl. kun ŝargo skribita post ^
        sym.append(this._t(smb));

        // desegnu elektronojn ĉirkaŭe
        let a = 0;
        for (const e of dstrb[n_e]) {            
            if (e==2) {
                sym.append(this._e(-1,a),this._e(1,a));
            } else if (e==1) {
                sym.append(this._e(0,a));
            }
            a += 90;
        }

        // evtl. desegnu [..] kaj ŝargon apude
        if (shargo) {
            sym.append(this._kl(),this._kr(),this._sh(shargo));
        }

        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = document.createElementNS(ns,"defs");
            this.svg.prepend(defs);
        }
        defs.append(sym);
    }

    /**
     * desegnu simbolon id ĉe (x,y)
     */
    montru(id,x,y) {
        const ns = Lewis._L.ns;
        const use = document.createElementNS(ns,"use");
        use.setAttribute("href","#"+id);
        use.setAttribute("x",x);
        use.setAttribute("y",y);
        this.svg.append(use);
    }

    /** 
     * movu simbolon id de x1,y1 ĝis x2,y2 
     * 
     * @param sek tiom da sekundoj entute daŭru
     * @param kiam_finita fine vokita
    */
    animacio(id,x1,y1,dx,dy,sek,kiam_finita) {
        const ns = Lewis._L.ns;
        
        const ani = document.createElementNS(ns,"animateMotion");
        ani.setAttribute("dur",sek+"s");
        ani.setAttribute("repeatCount",1);
        ani.setAttribute("fill","freeze");
        ani.setAttribute("path",`M0,0 L${dx},${dy}`);

        let j = this.svg.querySelector(`use[href='#${id}']`);
        if (!j) { // se ankoraŭ ne videbla, nun montru!
            this.montru(id,x1,y1);
            j = this.svg.querySelector(`use[href='#${id}']`);
        }
        j.append(ani);

        //ani.onend = kiam_finita;
        setTimeout(kiam_finita,sek*1000);

        ani.beginElement();


/*
        //const ns = _L.ns;
        const ti = _L.ti;
        let j = this.svg.querySelector(`use[href='#${id}']`);
        if (!j) { // se ankoraŭ ne videbla, nun montru!
            this.montru(id,x1,y1);
            j = this.svg.querySelector(`use[href='#${id}']`);
        }

        j.setAttribute("x",x1);
        j.setAttribute("y",y1);

        // paŝoj
        let n = 1000/ti * sek;
        const dx = (x2-x1) / n;
        const dy = (y2-y1) / n;

        // venonta punkto
        let x = x1 + dx;
        let y = y2 + dy;

        setTimeout(pasho,ti);

        function pasho() {
            if (n>0) {
                j.setAttribute("x",x2 - n*dx);
                j.setAttribute("y",y2 - n*dy);  
                n--;      
                setTimeout(pasho,ti);
            } else if (kiam_finita) {
                kiam_finita(id);
            }
        }
*/
    }
}

