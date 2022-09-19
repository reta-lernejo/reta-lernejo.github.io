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

class LewisSVG {
    
    constructor(svg) {
        this.svg = svg;
    }

    // parametroj por distantcoj ktp. de la desegno
    // PLIBONIGU: donu al la variabloj longajn nomojn
    // dist_elktr = 7;  ktp.
    static #dist_ele = 7; // distanco de elektronoj de atommezo
    static #dist_ŝrg = 4; // distanco de (formala) ŝargo relative al la elementsimbolo
    static #dist_jkr = 2;// distanco de jonkrampoj
    static #long_jkr = 12; // longeco de angula jon-streko
    static #dist_jnŝ = 1.5; // distanco de ŝargindiko rilate al jonkrampo 
    static #rad_ele = .5; // radiuso de elektrono(punkto)
    static #rad_ŝrg = 1.2; // radiuso de formalŝargo-cirkleto
    static #dist_lig = 6; // distanco de valentstreko
    static #long_lig = 4; // longeco de valentstreko
    static #dist_kjn = 4; // distanco de kojno
    static #larĝ_kjn = 1; // duona larĝeco de kojno
    static #long_kjn = 5; // longeco de kojno
    static #long_ark = 8; // alteco (dy) de e-atribua arko
    static #dist_onr = 5; // distanco de oksidnombro
    //static #dh = 6; // ---> dist_hpo? distanco de hidrogenponto
    static #long_hpo = 10; // longeco de hidrogenponto

    static dist_ele = () => LewisSVG.#dist_ele;
    static long_lig = () => LewisSVG.#long_lig;

    /** Kreas SVG-elementon kun atributoj
     * @param nomo elementnomo, ekz-e 'div'
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     */
    kreu(nomo, atributoj, teksto) {
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
    atr(elemento, atributoj) {
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                elemento.setAttribute(atr,val);
            }
        };
        return elemento;
    }

    /**
     * Trovas SVG-elementon per CSS-elektilo
     */
    trovu(elektilo) {
        return this.svg.querySelector(elektilo)
    }

    /** 
     * Ŝovas elementon uzante atributon transform al nova pozicio (dx,dy)
     */
    ŝovu(elm, x, y=0) {
        if (x || y)
            this.atr(elm, {transform: `translate(${x} ${y})`});
    }


    /**
     * desegnu simbolon id ĉe (x,y) 
     */
    simbol_uzo(id,x,y) {
        const use = this.kreu("use", {
            href: "#"+id,
            x: x,
            y: y
        });
        this.svg.append(use);
    }    

    /**
     * redonas elementon defs (kreante ĝins se ankoraŭ mankas)
     */
    difinoj() {
        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = this.desegno.kreu("defs");
            this.svg.prepend(defs);
        }
        return defs;
    }


    /**
     * helfunkcio por krei tekston kun evtl. supra indico (ekz-e ŝargo)
     * @param tx: la texto, supra indico estu apartigita per '^'
     */ 
    teksto(tx,cls) {
        const parts = tx.split('^');
        const sy = LewisSVG.#dist_ŝrg;
        const text = this.kreu("text",{},parts[0]);
        if (cls) this.atr(text,{class: cls});
        if (parts.length>1) {
            const tspan = this.kreu("tspan", {
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
    oksidnombro(on) {
        const dO = LewisSVG.#dist_onr;
        // on nepre havu antaŭsignon!
        const on_ = on == "0"? "±0" : (on > 0 && on[0] != '+'? '+'+on : on);
        const text = this.kreu("text",{
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
    elektrono(dy=0,a=0) {
        const re = LewisSVG.#rad_ele;
        const de = LewisSVG.#dist_ele;
        const e = this.kreu("circle", {
            r: re,
            cx: de
        });
        if (dy) this.atr(e,{
            cy: dy
        });
        if (a != 90) this.atr(e, {
            transform: `rotate(${a-90})`
        });
        return e;
    }

    /**
     * helpfunkcio por desegni linion por ligo
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     * @param f faktoro (2 = duobla longeco)
     */ 
    ligo(dy,a,f=1) {
        const dv = LewisSVG.#dist_lig;
        const lv = LewisSVG.#long_lig;
        const p = this.kreu("line", {
            x1: dv,
            x2: dv+f*lv
        });
        if (dy) {
            this.atr(p, {
                y1: dy,
                y2: dy
            });
        }
        if (a != 90) this.atr(p, {
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
    e_arko(at,a) {
        const dv = LewisSVG.#dist_lig;
        const lv = LewisSVG.#long_lig;
        const la = LewisSVG.#long_ark;
        let p;
        switch (at) {
        case "|": 
            p = this.kreu("line", {
                class: "e-atr",
                x1: dv+lv/2,
                x2: dv+lv/2,
                y1: -la/2,
                y2: +la/2
            });
            break;
        case "(":
            p = this.kreu("path", {
                class: "e-atr",
                d: `M${dv+lv/2} ${-la/2}A${lv/2} ${la/2} 0 0 0 ${dv+lv/2} ${la/2}`
            });
            break;
        case ")":
            p = this.kreu("path", {
                class: "e-atr",
                d: `M${dv+lv/2} ${-la/2}A${lv/2} ${la/2} 0 0 1 ${dv+lv/2} ${la/2}`
            });
            break;
        }
        if (a != 90) this.atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;
     }

    /**
     * helpfunkcio por desegni kojnon por ligo antaŭen
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
    a_kojno(a) {
        const lk = LewisSVG.#long_kjn;
        const yk = LewisSVG.#larĝ_kjn;
        const dk = LewisSVG.#dist_kjn;

        const p = this.kreu("path", {
            d: `M${dk},0 l${lk},${-yk} l0,${2*yk} Z`,
            class: "akojno"
        });
        if (a != 90) this.atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;     
    }

    /**
     * helpfunkcio por desegni kojnon por ligo malantaŭen
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
    m_kojno(a) {
        const lk = LewisSVG.#long_kjn;
        const dk = LewisSVG.#dist_kjn;
        const yk = LewisSVG.#larĝ_kjn;

        const p = this.kreu("path", {
            d: `M${dk},0 l${lk},${-yk} l0,${2*yk} Z`,
            class: "mkojno"
        });
        if (a != 90) this.atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;     
    }

    /**
     * helpfunkcio por desegni linion por hidgrogenponto
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
    h_ponto(dy,a) {
        const lh = LewisSVG.#long_hpo;

        const p = this.kreu("line", {
            x1: dh,
            x2: dh+lh,
            class: "hponto"
        });
        if (dy) {
            this.atr(p, {
                y1: dy,
                y2: dy
            })
        }
        if (a != 90) this.atr(p, {
            transform: `rotate(${a-90})`
        });   
        return p;     
    }

    /**
     * desegnu maldekstran jonkrampon apud unuopa atomo
     */
    jkr_maldekstra() {
        const dk = LewisSVG.#dist_jkr;

        const pl = this.kreu("polyline", {
            points: `${-dk*.8},${-dk} ${-dk},${-dk} ${-dk},${dk} ${-dk*.8},${dk}`,
            fill: "none"
        });
        return pl;
    }

    /**
     * desegnu dekstran jonkrampon apud unuopa atomo
     */
    jkr_dekstra(shargo) {
        const dk = LewisSVG.#dist_jkr;

        const pl = this.kreu("polyline", {
            points: `${dk*.7},${-dk} ${dk},${-dk} ${dk},${dk} ${dk*.7},${dk}`,
            fill: "none"
        });
        return pl;
    }

    /** desgnu jonangulon dekstre supre
     * @param shargo la ŝargo de la jono
     * @param mm kadro de la molekulo (min x,y; max x,y)
     */
    jono(shargo,mm) {
        const jg = this.kreu("g", {
            class: "jonkrampo"
        });
        const lkr = LewisSVG.#long_jkr;
        const dkr = LewisSVG.#dist_jkr;
        const dsh = LewisSVG.#dist_jnŝ;
        const jk = this.kreu("path", {
            d: `M${mm.max_x - lkr + dkr} ${mm.min_y - dkr}`
            + `L${mm.max_x + dkr} ${mm.min_y - dkr}` 
            + `L${mm.max_x + dkr} ${mm.min_y + lkr - dkr}` 
        })
        const jt = this.kreu("text",{
            x: mm.max_x + dkr + dsh,
            y: mm.min_y - dkr - dsh,
        }, shargo);

        jg.append(jk,jt);
            
        return jg;
    }

    /** 
     * desegnu ŝargon apud unuopa atomo (t.e. elementsimbolo)
     */    
    a_shargo(shargo) {
        const sy = LewisSVG.#dist_ŝrg;

        const text = this.kreu("text", {
            class: "shargo",
            x: sy,
            y: -sy
        }, shargo);
        return text;
    }
    

    /**
     * desegnu formalŝargon kiel cirklitan + aŭ - apud atomon
     */
    f_shargo(sgn) {
        const rf = LewisSVG.#rad_ŝrg;
        const sy = LewisSVG.#dist_ŝrg;

        const g = this.kreu("g", {
            class: "shargo"
        });
        const c = this.kreu("circle", {
            r: rf
        });
        const p = this.kreu("path");
        const l = 1.4*rf;
        let d = `M${-l/2} 0L${+l/2} 0`;
        if (sgn == '+') d+= `M0 ${-l/2}L0 ${l/2}`
        this.atr(p, {d: d});
        g.append(c,p);
        this.atr(g, {transform: `translate(${sy} ${-sy})`});
        return g;     
    }
    
    /** 
     * desegnu ŝargon apud jonkrampo de unuopa atomo
     */
    j_shargo(shargo) {
        const dk = LewisSVG.#dist_jkr;

        const text = this.kreu("text", {
            x: dk*1.3,
            y: -dk*.9
        }, shargo);
        return text;
    }


}


class Lewis {

    // static =#dJ: 19; // distanco inter jonoj
    static #dist_atm = 16; // distanco inter atomoj ĉe molekuloj (? - problemo estas ĉu ni uzas nur punktoj aŭ valentstrekojn!)
    //static #ti = 200; // ---> temp_int? tempintervalo por animacio
    static #ekv_isp = 5; // aldona spaco inter termoj de ekvacio

    constructor(svg) {
        this.desegno = new LewisSVG(svg);
        this.atomoj = {}; // atomoj kaj ilia pozicioj aranĝataj dum kreo de molekulprezento
        this.grupoj = []; // nomoj (id/href) de konataj grupoj uzeblaj en molekulo
        this.opcioj = {};
        this.grupo_ref = {}; // referencoj al grupoj el de atomo, al kiu ĝi ligiĝas
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
     * @param rikuro ni permesas maksimume 10 rikurojn por eviti eterne kuri en cikloj!
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
            const ppos = this.#pos(pos.p,rik++);
            pos.x = ppos.x + pos.dx;
            pos.y = ppos.y + pos.dy;
            this.atomoj[atm].pos = pos; // aktualigu la pozicion de la atomo per la absoluta
            return pos;
        }
    }

    /** Redonas la pozicion de grupo. Se ekzistas absoluta, tiun, se
     * estas relativa ĝi kalkulas la absoluton el la relativa
     * @param g_ref la ŝlosilo de la grupo, ekz-e c1_OH
     * @param rikuro ni permesas maksimume 10 rikurojn por eviti eterne kuri en cikloj!
     */
    /*
    #g_pos(g_ref, rik=0) {
        if (rik>10) throw `Tro da rikuroj (ĉu ciklo?) ĉe ${g_ref}.`;
        const g = this.grupo_ref[g_ref];
        const pos = g.pos;
        if (!pos) throw `Grupo ${g_ref} ne havas pozicion, ĉu eraro en la molekuldifino?`
        if ('x' in pos && 'y' in pos) {
            return pos;
        } else {
            if (! 'p' in pos && 'dx' in pos && 'dy' in pos) 
                throw `Grupo ${g_ref} havas nek absolutan nek relativan pozicion.`
            const ppos = this.#pos(pos.p,rik++); // pozicio relative al la liganta atomo 
            pos.x = ppos.x + pos.dx;
            pos.y = ppos.y + pos.dy;
            this.grupo_ref[g_ref].pos = pos; // aktualigu la pozicion de la atomo per la absoluta
            return pos;
        }
    }    */

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
                        g.append(this.desegno.elektrono(0,a));
                        break;
                    case ":":
                        g.append(
                            this.desegno.elektrono(-1,a),
                            this.desegno.elektrono(1,a));
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
        const dM = Lewis.#dist_atm;
        const lv = LewisSVG.long_lig;

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
            let lf = 1; // faktoro de longeco (2=suobla longeco)
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
                    g.append(this.desegno.e_arko(ll,a));
                } else {
                    // nun ni atendas ligtipon
                    switch (ll) {
                        case "-":
                            if (ligo[l+1] == '-') { lf = 2; l++ } // duobla longeco!                               
                            g.append(this.desegno.ligo(0,a,lf));
                            lv = 1;
                            break;
                        case "=":
                            if (ligo[l+1] == '=') { lf = 2; l++ } // duobla longeco!  
                            g.append(
                                this.desegno.ligo(-1,a,lf),
                                this.desegno.ligo(+1,a,lf));
                            lv = 2;
                            break;
                        case "#":
                            if (ligo[l+1] == '#') { lf = 2; l++ } // duobla longeco!  
                            g.append(
                                this.desegno.ligo(-2,a,lf),
                                this.desegno.ligo(0,a,lf),
                                this.desegno.ligo(2,a,lf));
                            lv = 3;
                            break;
                        case "<": // kojno antaŭen (plena)
                            g.append(this.desegno.a_kojno(a));
                            lv = 1;
                            break;
                        case ">": // kojno malantaŭen (streka)
                            g.append(this.desegno.m_kojno(a));
                            lv = 1;
                            break;
                        case "~": // hidrogenponto / parta ligo
                            g.append(this.desegno.h_ponto(0,a));
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
            const distM = lf == 2? dM + 2.5*lv : dM;
            const Ax = distM * Math.cos(phi);
            const Ay = distM * Math.sin(phi);

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
                        g.append(this.desegno.e_arko(")",a));                        
                        ne += lv; // por opcioj.on_val estus ne += 2*lv;
                        a_ne(ref,-lv);
                    } else if (en1 < en2) {
                        g.append(this.desegno.e_arko("(",a));
                        ne -= lv; // valida por opicoj.on_fŝ, por on_val tio devus esti 0
                        a_ne(ref,+lv);
                    } else {
                        g.append(this.desegno.e_arko("|",a));
                        // por opcioj.on_val ni aldonus ne += lv;
                    }
                }
            } else if (ref && this.grupoj[ref]) {
                // temas pri referencebla grupo, ni kreu instancon de la grupo
                // por tiu ĉi atomo... (ĉu oni povu havi plurajn samajn grupojn
                // ĉe unu atomo? tio momente ne funkcius, oni devus aldoni ligon por identigo...)
                const grp_ref = `${atm}_${ref}`;
                const g_pos = {dx:Ax, dy:Ay, p:atm};
                const grp = this.#grupo(ref,grp_ref,g_pos);
                // ni memoras la relativan pozicion de la grupo al la
                // atomo por poste kalkuli la absolutan pozicion
                this.grupo_ref[grp_ref] = {ref: ref, pos: g_pos};

                /*
                const use = this.desegno.kreu("use", {
                    id: grp_ref,
                    href: `#${ref}`,
                    x: Ax,
                    y: Ay
                });
                */
                g.append(grp);
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
        const g = this.desegno.kreu("g", { 
            class: `elemento ${smb}` 
        });
        g.append(this.desegno.teksto(smb));

        // shargo
        if (shargo) {
            if (shargo == '-' || shargo == '+') {
                g.append(this.desegno.f_shargo(shargo));
            } else {
                g.append(this.desegno.f_shargo(shargo));
            }    
        }
        
        // desegnu elektronojn / ligojn ĉirkaŭe
        if (elektronoj) this.#elektronoj(g,elektronoj);
        if (ligoj) this.#ligoj(atm,g,ligoj);

        // oksidnombro
        if (this.atomoj[atm].on) {
            g.append(this.desegno.oksidnombro(this.atomoj[atm].on));
        } /* ni devas unue trakti la tutan molekulon!...
        else if (this.opcioj.on_fŝ) {
            g.append(this.#oksidnombro(ne + shargo));
        } */

        return g;
    }

    /**
     * Kreas SVG-elementojn por grupo (-OH, -COOH k.s.) koncizigante la molekulprezenton
     * @param {string} id nomo de la grupo (en la specifo) 
     * @param {string} g_ref referencilo de la grupo <atomo>_<grupo>
     */
    #grupo(id,g_ref,pos) {
        const grp = this.grupoj[id];

        const x = Math.round((pos.dx - Lewis.#dist_atm/5) * 100)/100 ;
        const y = Math.round(pos.dy*100)/100;
               
        // skribu elementnomojn centre
        const g = this.desegno.kreu("g", { 
            id: g_ref,
            class: `grupo ${grp.a}`,
            transform: `translate(${x} ${y})`
        });
        g.append(this.desegno.teksto(grp.a));

        return g;
    }

    
     /**
     * kreas molekulon kiel SVG-g-elementon kaj redonas tiun
     * @param {object} molekulo ojekto kun la difino de la molekulo
     * @returns 
     */
    #molekulo(molekulo) {
        // const dM = Lewis.#dist_atm;
        let poz = -1;
        // atomoj povas doniĝi kiel objekto aŭ signaro, tiam ni devas ankoraŭ krei la objekton
        const on = molekulo.on? molekulo.on.split(' ') : null;
        this.atomoj = this.#angulo_obj(molekulo.a, on);
        this.grupoj = molekulo.g;
        this.grupo_ref = {}; // PLIBONIGU: forĵetu klason Lewis post unufoja uzo, ĉu?
        const mlk = this.desegno.kreu("g");

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
        // absslutajn poziciojn kaj oksidnombrojn de la atomoj
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
                    g_.append(this.desegno.oksidnombro(atomo.on));
                }    
            }
        } // for

        // same ni kalkulas la absolutajn poziciojn de la grupoj
        /*
        for (const g_ref of Object.keys(this.grupo_ref)) {
            const pos = this.#g_pos(g_ref);
            if (pos.x || pos.y) {
                const x = Math.round(pos.x*100)/100;
                const y = Math.round(pos.y*100)/100;
                //const grp_ = document.getElementById(g_ref);
                const grp_ = this.grupo_ref[g_ref].svg;
                grp_.setAttribute("transform",`translate(${x} ${y})`);    
            }
        }
        */

        //this.svg.append(mlk);
        mlk.append(...Object.values(gj));

        // se la molekulo havas ŝargon ĝi estas jono kaj bezonas jonindikon
        if (molekulo.s && molekulo.s._) {
            
            const mm = this.kadro();
            const jg = this.desegno.jono(molekulo.s._,mm);
            /*
            // tio estus tro frue, alternative ni povus aldoni jg sub <defs> por uzi getBBox()
            // aŭ provizore aldoni kaj poste ŝovi ĝustaloken...
            // vd https://stackoverflow.com/questions/28282295/getbbox-of-svg-when-hidden
           const bb = mlk.getBBox();
           const jg = this.desegno.jono(molekulo.s._,{
                min_x: bb.x, min_y: bb.y, 
                max_x: bb.x+bb.width, max_y: bb.y+bb.height});
                */
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
        if (opcioj) this.opcioj = opcioj;
        const mlk = this.#molekulo(molekulo);
        this.desegno.svg.append(mlk);
        return mlk;
    }

    /**
     * Kalkulas la koordinatojn de la kadro ĉirkaŭanta la antaŭe kreitan molekulon.
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
        // se la atomo enhavas grupojn ni devas trarigardi ankaŭ tiujn...!
        for (const g of Object.values(this.grupo_ref)) {
            const g_pos = g.pos;
            console.log(`pos ${g.ref} ${g_pos.p}...`)
            const a_pos = this.atomoj[g_pos.p].pos;
            const x = a_pos.x+g_pos.dx;
            const y = a_pos.y+g_pos.dy;
            min_x = Math.min(min_x,x);
            max_x = Math.max(max_x,x);
            min_y = Math.min(min_y,y);
            max_y = Math.max(max_y,y);
        }

        const de = LewisSVG.dist_ele();
        return { 
            min_x: min_x-de, 
            max_x: max_x+de, 
            min_y: min_y-de, 
            max_y: max_y+de}
    }
    

    /**
     * Redonas la kadron de la SVG-elemento uzante getBBox...
     */
    /*
    svg_kadro(elemento) {

    }
    */


    /**
     * Desegnas ekvacion (molekuloj aŭ kombinaj signoj) 
     * 
     * @param {string} ekvacio listo de termoj apartigitaj per spacoj, kiuj povas esti aŭ nomo de molekulo el mspec aŭ simplaj signaroj ('+', '->', '<->' k.s.)
     * @param {object} mspec specifoj de molekuloj/atomoj referencitaj en la ekvacio
     */
    ekvacio(ekvacio,mspec,opcioj) {
        const isp = Lewis.#ekv_isp;

        if (opcioj) this.opcioj = opcioj;
        const ekv = this.desegno.kreu("g");
        this.desegno.svg.append(ekv); // getBBox() nur funkcias, kiam la elementoj jam estas aldonitaj al la desegno!

        const termoj = ekvacio.split(/ /).reduce((arr,x) => {
            const x_ = x.split('*');
            if (x_.length == 2) arr.push(x_[0],'*',x_[1]);
            else if (x_.length == 1) arr.push(x_[0]);
            else throw "Ekvacio nevalida, mankas spacsigno inter la termoj de "+x;
            return arr;
        },[]);
        const sgn = {
            '+': "+",
            '*': '\u00b7',
            '->': "\u27f6",
            '<->': "\u27f7"
        };

        let ŝovo = 0;
        for (const t of termoj) {
            // temas pri ekvacia signo aŭ nombro
            if (sgn[t] || !isNaN(t)) {
                const s = sgn[t]? sgn[t] : t;
                const t_ = this.desegno.teksto(s,'e-sgn');
                ekv.append(t_);
                this.desegno.ŝovu(t_, ŝovo);
                const bb = t_.getBBox();
                ŝovo += bb.width + (!isNaN(t)? isp/2 : isp);

            // temas pri molekulo
            } else if (t.trim() != "") {
                const sp = mspec[t];
                if (!sp) throw `Mankas specifo de ${t}.`;
                const m = this.#molekulo(sp);
                
                // ŝovu la termon horizontale en sian lokon
                const mm = this.kadro();
                this.desegno.ŝovu(m, ŝovo - mm.min_x);
                ŝovo += mm.max_x - mm.min_x + isp;
                /* tio estus tro frue, alternative oni povus enigi m en SVG, ekz-e sub defs...
                const bb = m.getBBox();
                this.desegno.ŝovu(m, ŝovo - bb.x);
                ŝovo += bb.width + isp;
                */
                ekv.append(m);
            }
            console.log(`${t} ${ŝovo}`);
        }

        return ekv;
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
        const sym = this.desegno.kreu("g", {
            id: id,
            class: smb.split('^')
        });

        // desegnu simbolon, evtl. kun ŝargo skribita post ^
        sym.append(this.desegno.teksto(smb));

        // desegnu elektronojn ĉirkaŭe
        let a = 0;
        for (const e of dstrb[n_e]) {            
            if (e==2) {
                sym.append(
                    this.desegno.elektrono(-1,a),
                    this.desegno.elektrono(1,a));
            } else if (e==1) {
                sym.append(this.desegno.elektrono(0,a));
            }
            a += 90;
        }

        // evtl. desegnu [..] kaj ŝargon apude
        if (shargo) {
            sym.append(
                this.desegno.jkr_maldekstra(),
                this.desegno.jkr_deskra(),
                this.desegno.shargo(shargo));
        }

        let defs = this.desegno.difinoj();
        defs.append(sym);
    }

    /**
     * desegnu simbolon id ĉe (x,y) 
     */
    montru(id,x,y) {
        this.desegno.simbol_uzo(id,x,y);
    }


    /** 
     * movu simbolon id de x1,y1 ĝis x2,y2 
     * 
     * @param sek tiom da sekundoj entute daŭru
     * @param kiam_finita fine vokita
    */
    animacio(id,x1,y1,dx,dy,sek,kiam_finita) {
        
        const ani = this.desegno.kreu("animateMotion", {
            dur: sek+"s",
            repeatCount: 1,
            fill: "freeze",
            path: `M0,0 L${dx},${dy}`
        });

        let j = this.desegno.trovu(`use[href='#${id}']`);
        if (!j) { // se ankoraŭ ne videbla, nun montru!
            this.montru(id,x1,y1);
            j = this.desegno.trovu(`use[href='#${id}']`);
        }
        j.append(ani);

        //ani.onend = kiam_finita;
        setTimeout(kiam_finita,sek*1000);

        ani.beginElement();
    }
}

