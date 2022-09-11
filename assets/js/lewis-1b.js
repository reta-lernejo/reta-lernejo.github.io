/**
 * JSON-strukturo de formuloj, ekz-e CH4 + 2 O2 -> CO2 + 2 H2O
 * -----------------------------------------------------------------
 * KOREKTU: se ni donas atomojn kiel objekto ni ankoraŭ devas difini, kies pozicio estas en (0,0)!
 * ĉe signaro ĉiam la unua atomo estas la centra ĉe (0,0) per difino.
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
 *
 * Angulsignoj por elektron- kaj ligaranĝoj ĉikaŭ la elementsimbolo:
 * -----------------------------------------------------------------
 * angulojn vi povas doni absolute, laŭ la horloĝo:
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
 * 
 * Opcioj por prezentado de molekuloj:
 * --------------------------------------
 * - eneg: funkcio redonante la elektronegativecon de elemento por sia simbolo, ekz-e eneg('H') -> 2.2
 * - on_arkoj: kalkulu kaj montru arkojn de elektronatribuo (por difini oksidnombrojn)
 * - on_fŝ: kalkulu oksidnombrojn helpe de formala ŝargoj (pli facila, sed ncecesas doni ŝargojn en la molekul-specifo per sh: {...})
 * - on_val: kalkulu oksidnombrojn pere de valentoj (ne jam realigita, necesas doni elementliston aŭ valent-funkcion...)
 */


class Lewis {

    constructor(svg) {
        this.svg = svg;
        this.atomoj = {}; // atomoj kaj ilia pozicioj aranĝataj dum kreo de molekulprezento
        this.grupoj = []; // nomoj (id/href) de konataj grupoj uzeblaj en molekulo
        this.opcioj = {};
        // this.grupo_ref = {}; // referencoj al grupoj el de atomo, al kiu ĝi ligiĝas
    }


    // parametroj por distantcoj ktp. de la desegno
    // PLIBONIGU: donu al la variabloj longajn nomojn
    // kaj difinu rekte kiel static dist#elktr = 7;  ktp.
    static _L = {
        de: 7, // distanco de elektronoj de atommezo
        sy: 4, // dy de ŝargo relative al la elementsimbolo
        dkr: 10,// distanco de jonkrampoj
        lkr: 12, // longeco de angula jon-streko
        dsh: 1.5, // distanco de ŝargindiko rilate al jonkrampo 
        re: .5, // radiuso de elektrono(punkto)
        rf: 1.2, // radiuso de formalŝargo-cirkleto
        dv: 6, // distanco de valentstreko
        lv: 4, // longeco de valentstreko
        dk: 4, // distanco de kojno
        yk: 1, // duona larĝeco de kojno
        lk: 5, // longeco de kojno
        la: 8, // alteco (dy) de e-atribua arko
        dO: 5, // distanco de oksidnombro
        dh: 6, // distanco de hidrogenponto
        lh: 10, // longeco de hidrogenponto
        // dJ: 19, // distanco inter jonoj
        dM: 16, // distanco inter atomoj ĉe molekuloj (? - problemo estas ĉu ni uzas nur puhktoj aŭ valentstrekojn!)
        ti: 200 // tempintervalo por animacio
    }


    /** Kreas SVG-elementon kun atributoj
     * @param nomo elementnomo, ekz-e 'div'
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     */
    #kreu(nomo, atributoj, teksto) {
        const ns = "http://www.w3.org/2000/svg";
        const el = document.createElementNS(ns, nomo);
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                el.setAttribute(atr,val);
            }
        };
        if (teksto) el.textContent = teksto;
        return el;
    }

    /**
     * Aldonas aŭ ŝanĝas atributojn de SVG-DOM-elemento
     * 
     * @param elemento la DOM-elemento 
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     * @returns 
     */
    #atr(elemento, atributoj) {
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                elemento.setAttribute(atr,val);
            }
        };
        return elemento;
    }

    /** Elkalkulas la sekvan angulon surbaze de donita signo, antaŭa kaj apriora angulo 
     * 
    */
   #angulo(sgn,aa,def,af=1) {
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
    #teksto(tx) {
        const parts = tx.split('^');
        const sy = Lewis._L.sy;
        const text = this.#kreu("text",{},parts[0]);
        if (parts.length>1) {
            const tspan = this.#kreu("tspan", {
                dy: -sy,
                class: "sup"
            }, parts[1]);
            text.append(tspan);
        }
        return text;
    }

    /**
     * helpfunkcio por krei oksidnombron super la elementsimbolo
     */
    #oksidnombro(on) {
        const dO = Lewis._L.dO;
        // on nepre havu antaŭsignon!
        const on_ = on == "0"? "±0" : (on > 0 && on[0] != '+'? '+'+on : on);
        const text = this.#kreu("text",{
            class: "o-nro",
            y: -dO
        }, on_);
        return text;
    }

    /**
     * helpfunkcio por desegni cirkleton por elektrono
     * 
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la punkto aperu, 0 = supre, 270 = maldekstre
     */ 
    #elktr(dy=0,a=0) {
        const re = Lewis._L.re;
        const de = Lewis._L.de;
        const e = this.#kreu("circle", {
            r: re,
            cx: de
        });
        if (dy) this.#atr(e,{
            cy: dy
        });
        if (a != 90) this.#atr(e, {
            transform: `rotate(${a-90})`
        });
        return e;
    }

    /**
     * helpfunkcio por desegni linion por ligo
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
    #ligo(dy,a) {
        const dv = Lewis._L.dv;
        const lv = Lewis._L.lv;
        const p = this.#kreu("line", {
            x1: dv,
            x2: dv+lv
        });
        if (dy) {
            this.#atr(p, {
                y1: dy,
                y2: dy
            });
        }
        if (a != 90) this.#atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;     
    }

    /**
     * helpfunkcio por desegni arkon de elektron-atribuo 
     * por oksidnombroj (al la pli e-negativa atomo aŭ samdivide)
     * @param at arktipo ( | )
     * @param a  angulo ĉe kiu la arko aperu, 0 = supre, 270 = maldekstre
     */ 
     #e_arko(at,a) {
        const dv = Lewis._L.dv;
        const lv = Lewis._L.lv;
        const la = Lewis._L.la;
        let p;
        switch (at) {
        case "|": 
            p = this.#kreu("line", {
                class: "e-atr",
                x1: dv+lv/2,
                x2: dv+lv/2,
                y1: -la/2,
                y2: +la/2
            });
            break;
        case "(":
            p = this.#kreu("path", {
                class: "e-atr",
                d: `M${dv+lv/2} ${-la/2}A${lv/2} ${la/2} 0 0 0 ${dv+lv/2} ${la/2}`
            });
            break;
        case ")":
            p = this.#kreu("path", {
                class: "e-atr",
                d: `M${dv+lv/2} ${-la/2}A${lv/2} ${la/2} 0 0 1 ${dv+lv/2} ${la/2}`
            });
            break;
        }
        if (a != 90) this.#atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;
     }

    /**
     * helpfunkcio por desegni kojnon por ligo antaŭen
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
     #a_kojno(a) {
        const lk = Lewis._L.lk;
        const yk = Lewis._L.yk;
        const dk = Lewis._L.dk;

        const p = this.#kreu("path", {
            d: `M${dk},0 l${lk},${-yk} l0,${2*yk} Z`,
            class: "akojno"
        });
        if (a != 90) this.#atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;     
    }

    /**
     * helpfunkcio por desegni kojnon por ligo malantaŭen
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
     #m_kojno(a) {
        const lk = Lewis._L.lk;
        const dk = Lewis._L.dk;
        const yk = Lewis._L.yk;

        const p = this.#kreu("path", {
            d: `M${dk},0 l${lk},${-yk} l0,${2*yk} Z`,
            class: "mkojno"
        });
        if (a != 90) this.#atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;     
    }

    /**
     * helpfunkcio por desegni linion por hidgrogenponto
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
     #h_ponto(dy,a) {
        const lh = Lewis._L.lh;

        const p = this.#kreu("line", {
            x1: dh,
            x2: dh+lh,
            class: "hponto"
        });
        if (dy) {
            this.#atr(p, {
                y1: dy,
                y2: dy
            })
        }
        if (a != 90) this.#atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;     
    }

    /**
     * desegnu maldekstran jonkrampon apud unuopa atomo
     */
    _kl() {
        const dk = Lewis._L.dkr;

        const pl = this.#kreu("polyline", {
            points: `${-dk*.8},${-dk} ${-dk},${-dk} ${-dk},${dk} ${-dk*.8},${dk}`,
            fill: "none"
        });
        return pl;
    }

    /**
     * desegnu dekstran jonkrampon apud unuopa atomo
     */
    _kr(shargo) {
        const dk = Lewis._L.dkr;

        const pl = this.#kreu("polyline", {
            points: `${dk*.7},${-dk} ${dk},${-dk} ${dk},${dk} ${dk*.7},${dk}`,
            fill: "none"
        });
        return pl;
    }


    /**
     * desegnu formalŝargon kiel cirklitan + aŭ -
     */
    /*
    _fs(plus) {
        const de = Lewis._L.de;
        const rf = Lewis._L.rf;

        const g = this.#kreu("g", {
            class: "shargo"
        });
        const c = this.#kreu("circle", {
            r: rf,
            cx: de
        });
        const p = this.#kreu("path");
        const l = 5/6*rf;
        let d = `M${de-l/2} 0L${de+l/2} 0`;
        if (plus) d+= `M${de} ${-l/2}L${de} ${l/2}`
        this.#atr(p, {d: d});
        g.append(c,p);
        if (a != 90) this.#atr(g, {
            transform: `rotate(${a-90})`
        });
        return g;     
    }
    */


    /** 
     * desegnu ŝargon apud unuopan atomon (elementsimbolon)
     */    
     #ash(shargo) {
        const sy = Lewis._L.sy;

        const text = this.#kreu("text", {
            class: "shargo",
            x: sy,
            y: -sy
        }, shargo);
        return text;
    }
    

    /**
     * desegnu formalŝargon kiel cirklitan + aŭ - apud atomon
     */
     #fsh(sgn) {
        const rf = Lewis._L.rf;
        const sy = Lewis._L.sy;

        const g = this.#kreu("g", {
            class: "shargo"
        });
        const c = this.#kreu("circle", {
            r: rf
        });
        const p = this.#kreu("path");
        const l = 5/6*rf;
        let d = `M${-l/2} 0L${+l/2} 0`;
        if (sgn == '+') d+= `M0 ${-l/2}L0 ${l/2}`
        this.#atr(p, {d: d});
        g.append(c,p);
        this.#atr(g, {transform: `translate(${sy} ${-sy})`});
        return g;     
    }
    

    /** 
     * desegnu ŝargon apud jonkrampo de unuopa atomo
     */
    #shargo(shargo) {
        const dk = Lewis._L.dkr;

        const text = this.#kreu("text", {
            x: dk*1.3,
            y: -dk*.9
        }, shargo);
        return text;
    }

    /** 
     * Atomojn donitajn kiel signaro ni transformas tion al objekto 
     * 
     * @param a atomoj kiel signaro (ekz. "OH2" - O estas la cetnra atomo ĉe origino (0,0), aŭ kiel objekto {<atomid>: <simbolo>,...})
     * @param on oksidnombro en la vicordo de kreotaj atomoj; KOREKTU: tio momente nur funkcias ĉe signaro, en la alia kazo donu jam en la objekto 
     */
    #angulo_obj(a, on) {  
        let obj = {};      
        if (typeof a === "object") {
            for (const [a_, smb] of Object.entries(a)) {
                obj[a_] = {smb: smb};
            }
        } else if (typeof a === "string") {
            const re = /([A-Z][a-z]?)([1-9]?[0-9]?)/g;
            let n_on = 0; // indekso de oksidnombroj
            // ni havas komence de la signaro ĉiam majusklan elementnomon evtl. sekvita de nombro!
            let m, first=true;
            while ((m = re.exec(a))) {
                const e = m[1];
                const el = e.toLowerCase();
                const n = m[2];
                if (!n) {
                    // unu atomo
                    obj[el] = {smb: e};
                    if (on && n_on < on.length) obj[el].on = on[n_on];
                    if (first) obj[el].pos = {x: 0, y:0}
                    n_on++;
                } else {
                    for (let n_=1; n_<=n; n_++) {
                        const en = `${el}${n_}`;
                        obj[en] = {smb: e};
                        if (on && n_on < on.length) obj[en].on = on[n_on];
                        if (first) obj[en].pos = {x: 0, y:0}
                        n_on++;
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
    #pos(atm, rik=0) {
        if (rik>10) throw `Tro da rikuroj (ĉu ciklo?) ĉe ${atm}.`;
        const a = this.atomoj[atm];
        const pos = a.pos;
        if (!pos) throw `Atomo ${atm} ne havas pozicion, ĉu eraro en la molekuldifino?`
        if ('x' in pos && 'y' in pos) {
            return pos;
        } else {
            if (! 'p' in pos && 'dx' in pos && 'dy' in pos) 
                throw `Atomo ${atm} havas nek absolutan nek relativan pozicion.`
            const ppos = this.#pos(pos.p,rik++)
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
    #elektronoj(g,elektronoj) {
        let af = 1; // ŝaltebla per "m " al -1, tio minusos postajn relativajn angulojn

        // se lig-anguloj ne estas aparte donitaj ni proporcie distribuas
        let e = 0; // montrilo en la signaron de eltrj
        let a = 0, da = 0; // aktuala kaj diferenca anguloj
        if (elektronoj && elektronoj.indexOf('%') >= 0) {
            const pj = elektronoj.split('%');
            a = this.#angulo(pj[0],0,0);
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
                    a = this.#angulo(ee,a,da,af)
                }
            } else {
                // aliaj signoj donas la elektron-specon (unuopa, paro k.s.)
                switch (ee) {
                    case ".":
                        g.append(this.#elktr(0,a));
                        break;
                    case ":":
                        g.append(this.#elktr(-1,a),this.#elktr(1,a));
                        break;
                    /*
                    case ";": // triopo (ekz. N2)
                        g.append(this.#elktr(-2,a),this.#elktr(0,a),this.#elktr(2,a));
                        break;
                    */
                    // ni permesas ankaŭ indiki formalajn ŝargojn inter "elektronoj"
                    /*
                    case "+": // formala ŝargo (+)
                        g.append(this.#fsh(a,true));
                        break;
                    case "'": // formala ŝargo (-)
                        g.append(this.#fsh(a,false));
                        break;
                        */
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
     * @param {string} atm identigilo de la atomo, al kiu desegni la ligojn (ekz-e h2 por dua hidrogeno)
     * @param {*} g la SVG-grupo al kiu aldoni grafikajn elementojn
     * @param {*} ligoj la specifo de la ligoj (spacapartigitaj signaroj de angulo, speco kaj referencita atomo/grupo)
     */
    #ligoj(atm,g,ligoj) {
        const dM = Lewis._L.dM;

        let af = 1; // ŝaltebla per "m " al -1, tio minusos postajn relativajn angulojn
        let ne = 0; // nombro de alordigitaj elektronoj per negativeco (redonota valoro)

        const a_ne = (_a,_ne) => { // adlonu elektronojn al .ne de atomo _a
            const atm = this.atomoj[_a];
            if (!atm.ne) atm.ne = 0;
            atm.ne += _ne;
        }

        // se lig-anguloj ne estas aparte donitaj ni proporcie distribuas
        let a = 0, da = 0; // aktuala kaj diferenca anguloj
        let aligj = [];

        // anstataŭ doni ĉiujn angulojn unuope
        // ni post % lasas al la programo dividi la angulojn sammezure
        if (ligoj.indexOf('%') >= 0) {
            const pj = ligoj.split('%');
            a = this.#angulo(pj[0],0,0);
            aligj = pj[1].split(" ");
            da = 360 / alig.length;
        } else {
            aligj = ligoj.split(' ');
        }

        // ni trakuras la ligojn ĝis la fino...
        for (const ligo of aligj) {
            let l = 0; // montrilo en la signaron de unuopa ligo
            let lv = 0; // opeco de la ligo (0..3)
            while (l<ligo.length) {
                let ll = ligo[l];
                // ĉu la aktuala signo estas angulo 0-9, A-z
                if ((ll >= "0" && ll <= "9") || (ll >= "A" && ll <= "z")) {
                    if (ll == "m") {
                        af = -1*af;
                    } else {
                        a = this.#angulo(ll,a,da,af)
                    }
                } else if ("(|)".indexOf(ll) > -1) {
                    // temas pri elektron-atribua arko (por formala kalkulo de oksidnombroj)
                    g.append(this.#e_arko(ll,a));
                } else {
                    // nun ni atendas ligtipon
                    switch (ll) {
                        case "-":
                            g.append(this.#ligo(0,a));
                            lv = 1;
                            break;
                        case "=":
                            g.append(this.#ligo(-1,a),this.#ligo(1,a));
                            lv = 2;
                            break;
                        case "#":
                            g.append(this.#ligo(-2,a),this.#ligo(0,a),this.#ligo(2,a));
                            lv = 3;
                            break;
                        case "<": // kojno antaŭen (plena)
                            g.append(this.#a_kojno(a));
                            lv = 1;
                            break;
                        case ">": // kojno malantaŭen (streka)
                            g.append(this.#m_kojno(a));
                            lv = 1;
                            break;
                        case "~": // hidrogenponto / parta ligo
                            g.append(this.#h_ponto(0,a));
                            break;
                        case " ":
                            break;
                    } // ...switch
                    a += da; // ĉe proporcia aranĝo da>0!

                    // post ligsigno devas veni referenco al atomo aŭ grupo, ni do forlasas
                    // la while-maŝon
                    break;
                } // else
                l++;
            } // ...while
            
            // resto estas nomo de alia atomo aŭ grupo
            // ni kalkulas ties relativan pozicion per la angulo
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
                // se e-arkoj ne estas rekte donitaj sed kalkuliĝu
                // per elektronegativeco...:
                if (this.opcioj.on_arkoj && this.opcioj.eneg) {
                    const en1 = this.opcioj.eneg(this.atomoj[atm].smb);
                    const en2 = this.opcioj.eneg(this.atomoj[ref].smb);
                    if (en1 > en2) {
                        g.append(this.#e_arko(")",a));                        
                        ne += lv; // por opcioj.on_val estus ne += 2*lv;
                        a_ne(ref,-lv);
                    } else if (en1 < en2) {
                        g.append(this.#e_arko("(",a));
                        ne -= lv; // valida por opicoj.on_fŝ, por on_val tio devus esti 0
                        a_ne(ref,+lv);
                    } else {
                        g.append(this.#e_arko("|",a));
                        // por opcioj.on_val ni aldonus ne += lv;
                    }
                }
            } else if (ref && this.grupoj.indexOf(ref)>=0) {
                // temas pri referencebla grupo, ni kreu instancon de la grupo
                // por tiu ĉi atomo... (ĉu oni povu havi plurajn samajn grupojn
                // ĉe unu atomo? tio momente ne funkcius, oni devus aldoni ligon por identigo...)
                const grp_ref = `${atm}_${ref}`;
                // this.grupo_ref[grp_ref] = {ref: ref, pos: {dx:Ax, dy:Ay, p:atm}}
                const use = this.#kreu("use", {
                    id: grp_ref,
                    href: `#${ref}`,
                    x: Ax,
                    y: Ay
                });
                g.append(use);
            }    
        } // for

        // memoru nombron de aloridigtaj elektronoj
        a_ne(atm,ne);
    } // #ligoj

    /**
     * Kreas elementsimbolon kun ĉirkaŭaj elektronoj kaj ligoj ktp. kiel SVG-grupo
     * @param {*} atm 
     * @param {*} elemento 
     * @param {*} elektronoj 
     * @param {*} ligoj 
     */
    #atomo(atm,smb,elektronoj,ligoj,shargo) {
       
        // skribu elementnomon centre
        const g = this.#kreu("g", { class: `elemento ${smb}` });
        g.append(this.#teksto(smb));

        // shargo
        if (shargo) {
            if (shargo == '-' || shargo == '+') {}
            g.append(this.#fsh(shargo));
        } else {
            g.append(this.#ash(shargo));
        }    

        // desegnu elektronojn / ligojn ĉirkaŭe
        if (elektronoj) this.#elektronoj(g,elektronoj);
        if (ligoj) this.#ligoj(atm,g,ligoj);

        // oksidnombro
        if (this.atomoj[atm].on) {
            g.append(this.#oksidnombro(this.atomoj[atm].on));
        } /* ni devas unue trakti la tutan molekulon!...
        else if (this.opcioj.on_fŝ) {
            g.append(this.#oksidnombro(ne + shargo));
        } */

        return g;
    }
    
     /**
     * kreas molekulon kiel SVG-g-elementon kaj redonas tiun
     * @param {object} molekulo ojekto kun la difino de la molekulo
     * @param {object} opcioj opcioj por prezentado
     * @returns 
     */
    #molekulo(molekulo, opcioj) {
        const dM = Lewis._L.dM;
        let poz = -1;
        // atomoj povas doniĝi kiel objekto aŭ signaro, tiam ni devas ankoraŭ krei la objekton
        const on = molekulo.on? molekulo.on.split(' ') : null
        this.atomoj = this.#angulo_obj(molekulo.a, on);
        if (opcioj) this.opcioj = opcioj;
        const mlk = this.#kreu("g");

        let gj = {};
        // trakuri ĉiujn atomojn de la molekulo
        for (const atm of Object.keys(this.atomoj)) {
            //if (!this.atomoj[atm].pos) this.atomoj[atm].pos = {x:0, y:0}; // apriora pozicio, ŝovita dum trakuro de ligoj
            const smb = this.atomoj[atm].smb;
            const elektronoj = molekulo.e && molekulo.e[atm] ? molekulo.e[atm] : null;
            const ligoj = molekulo.l && molekulo.l[atm] ? molekulo.l[atm] : null;
            const shargo = molekulo.s && molekulo.s[atm] ? molekulo.s[atm] : null;
            // kreu la SVG-strukturon por la atomoj kun elektronoj, ligoj kc
            const g = this.#atomo(atm,smb,elektronoj,ligoj,shargo);
            gj[atm] = g;   
        } // ...for

        // nur post trakto de ĉiuj atomoj ni nun povas elkakluli
        // absslutajn poziciojn kaj oksidnombrojn de la atomoj/grupoj
        for (const a_ of Object.keys(gj)) {
            const g_ = gj[a_];
            // dum la procedo ni notis ĉiujn poziciojn de atomoj kaj grupoj
            // ni devos ankoraŭ ŝovi la g-elementojn al tiuj pozicioj!
            const pos = this.#pos(a_);
            if (pos.x || pos.y) {
                const x = Math.round(pos.x*100)/100;
                const y = Math.round(pos.y*100)/100;
                g_.setAttribute("transform",`translate(${x} ${y})`);    
            }
            //mlk.append(g_);

            // kalkulu oksidnombron el formala ŝargo kaj alordigitaj elektronoj
            if (this.opcioj.on_fŝ) {
                const atomo = this.atomoj[a_];
                if (atomo && ! atomo.on) {
                    const sh = molekulo.s && molekulo.s[a_] ? molekulo.s[a_] : 0;
                    const shargo = (sh == '-' || sh == '+') ? sh+1 : sh;
                    atomo.on = atomo.ne? shargo - atomo.ne : shargo;
                    g_.append(this.#oksidnombro(atomo.on));
                }    
            }
        } // for

        //this.svg.append(mlk);
        mlk.append(...Object.values(gj));

        // se la molekulo havas ŝargon ĝi estas jono kaj bezonas jonindikon
        if (molekulo.s && molekulo.s._) {
            const mm = this.kadro();
            const jg = this.#kreu("g", {
                class: "jonkrampo"
            });
            const lkr = Lewis._L.lkr;
            const dkr = 2; // Lewis._L.dkr;
            const dsh = 2; // Lewis._L.dkr;
            const jk = this.#kreu("path", {
                d: `M${mm.max_x - lkr + dkr} ${mm.min_y - dkr}`
                 + `L${mm.max_x + dkr} ${mm.min_y - dkr}` 
                 + `L${mm.max_x + dkr} ${mm.min_y + lkr - dkr}` 
            })
            const jt = this.#kreu("text",{
                x: mm.max_x + dkr + dsh,
                y: mm.min_y - dkr - dsh,
            },molekulo.s._);
            jg.append(jk,jt);
            mlk.append(jg);
        }

        return mlk;
    }

   /**
     * desegni atomojn kaj molekulojn en elektronstruktura formulo laŭ Lewis kiel SVG-desegno
     * 
     * @param {object} molekulo specifo de molekulo (vd. supre...)
     * @param {object} opcioj opcioj por prezentado
     */
    molekulo(molekulo, opcioj) {
        const mlk = this.#molekulo(molekulo, opcioj);
        this.svg.append(mlk);
        return mlk;
    }

    /**
     * Kalkulas la koordinatojn de la kadro ĉirkaŭanta la antaŭe kreitan molekulon
     */
    kadro() {
        let min_x = Number.MAX_VALUE, min_y = Number.MAX_VALUE, 
            max_x = Number.MIN_VALUE, max_y = Number.MIN_VALUE;
        for (const a of Object.values(this.atomoj)) {
            const x = a.pos.x;
            const y = a.pos.y;
            min_x = Math.min(min_x,x);
            max_x = Math.max(max_x,x);
            min_y = Math.min(min_y,y);
            max_y = Math.max(max_y,y);
        }
        // KOREKTU, se la atomo enhavas grupojn ni devas trarigardi ankaŭ tiujn...!

        const de = Lewis._L.de;
        return { 
            min_x: min_x-de, 
            max_x: max_x+de, 
            min_y: min_y-de, 
            max_y: max_y+de}
    }

    /**
     * Kreas SVG-simbolon por grupo (-COOH k.s.) uzeblan poste en molekulformulo
     * per use@href
     * @param {*} grupo 
     */
    grupo(id,grupo) {
        const g = this.#molekulo(grupo);
        g.id = id;

        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = this.#kreu("defs");
            this.svg.prepend(defs);
        }
        defs.append(g);

        // memoru la nomoj de referenceblaj grupoj
        this.grupoj.push(id);
    }

    /**
     * Tradukas liston de termoj (molekuloj aŭ kombinaj signoj) al kombinita formulo
     * 
     * @param termoj listo de termoj kiuj povas esti aŭ specifo kiel por la funkcio "molekulo" aŭ simplaj signaroj ('+', '->' k.s.)
     */
    formulo(termoj) {
        const frm = this.#kreu("g");
        let ŝovo = 0;
        for (const t of termoj) {
            const m = this.#molekulo(t);
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
     * @param n#elktr nombro da elektronoj
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
        const sym = this.#kreu("g", {
            id: id,
            class: smb.split('^')
        });

        // desegnu simbolon, evtl. kun ŝargo skribita post ^
        sym.append(this.#teksto(smb));

        // desegnu elektronojn ĉirkaŭe
        let a = 0;
        for (const e of dstrb[n_e]) {            
            if (e==2) {
                sym.append(this.#elktr(-1,a),this.#elktr(1,a));
            } else if (e==1) {
                sym.append(this.#elktr(0,a));
            }
            a += 90;
        }

        // evtl. desegnu [..] kaj ŝargon apude
        if (shargo) {
            sym.append(this._kl(),this._kr(),this.#shargo(shargo));
        }

        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = this.#kreu("defs");
            this.svg.prepend(defs);
        }
        defs.append(sym);
    }

    /**
     * desegnu simbolon id ĉe (x,y)
     */
    montru(id,x,y) {
        const use = this.#kreu("use", {
            href: "#"+id,
            x: x,
            y: y
        });
        this.svg.append(use);
    }

    /** 
     * movu simbolon id de x1,y1 ĝis x2,y2 
     * 
     * @param sek tiom da sekundoj entute daŭru
     * @param kiam_finita fine vokita
    */
    animacio(id,x1,y1,dx,dy,sek,kiam_finita) {
        
        const ani = this.#kreu("animateMotion", {
            dur: sek+"s",
            repeatCount: 1,
            fill: "freeze",
            path: `M0,0 L${dx},${dy}`
        });

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
        //const ns = #ligo.ns;
        const ti = #ligo.ti;
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

