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

/**
 * longoj, distancoj por la aranĝo de elementoj, elektronoj, ŝargoj, jonanguloj ktp.
 */
class Kform {
    static dist_jon = 24; // distanco inter jonoj, PROBLEMO: por krampoj [...] necesus pli (28)!
    static dist_atm = 16; // distanco inter atomoj ĉe molekuloj (? - problemo estas ĉu ni uzas nur punktoj aŭ valentstrekojn!)   

    // parametroj por distantcoj ktp. de la desegno
    // PLIBONIGU: donu al la variabloj longajn nomojn
    // dist_elktr = 7;  ktp.
    static dist_ele = 7; // distanco de elektronoj de atommezo
    static dist_ŝrg = 4; // distanco de (formala) ŝargo relative al la elementsimbolo
    static dist_jkr = 2;// distanco de jonkrampoj
    static duon_jkr = 10; // distanco/duonlongeco de jonkrampo ĉirkaŭ unuopa atomo [O]²-
    static long_jkr = 12; // longeco de angula jon-streko ĉe angulo
    static dist_jnŝ = 1.5; // distanco de ŝargindiko rilate al jonkrampo 
    static rad_ele = .5; // radiuso de elektrono(punkto)
    static rad_ŝrg = 1.2; // radiuso de formalŝargo-cirkleto
    static dist_lig = 6; // distanco de valentstreko
    static long_lig = 4; // longeco de valentstreko
    static dist_kjn = 4; // distanco de kojno
    static larĝ_kjn = 1; // duona larĝeco de kojno
    static long_kjn = 5; // longeco de kojno
    static long_ark = 8; // alteco (dy) de e-atribua arko
    static dist_onr = 5; // distanco de oksidnombro
    //static #dh = 6; // ---> dist_hpo? distanco de hidrogenponto
    static long_hpo = 10; // longeco de hidrogenponto


    /** 
     * Helpfunkcio por elkalkuli angulon de elektron- kaj ligaranĝoj
     * ĉikaŭ la elementsimbolo surbaze de donita signo, antaŭa kaj apriora angulo.
     * 
     * Angulsignoj:
     * 
     * angulojn vi povas doni _absolute_, laŭ la horloĝo:
     * 0 (supre), 1 (30°), 2 (60°), 3 (90°), 4 (120°), 5 (150°), 
     * 6 (180°), 7 (210°), 8 (240°), 9 (270°), x (300°), y (330°)
     * 
     * aŭ _relative_ al la antaŭa:
     * d (duoncirklo, 180°), t (trioncirklo, 120°), k (kvaroncirklo, 90°), 
     * e (seponciriklo, 51,5°), o (okonocirklo, 45°), 
     * A (akvo, 105°), a (85°), p (piramida/tetraedra, 109,5°), 
     * s (kvinoncirklo, 72°), S (144°), z (dekoncirklo, 36°), Z (42°)
     * m minusas la sekvantajn angulojn
     * 
     * @param sgn la angulsigno, unu el la supraj literoj au ciferoj
     * @param aa  la antaŭa angulo, necesa por kalkuli relativajn angulojn
     * @param def apriora angulo, se la signo ne donas validan angulon
     * @param af  faktoro per kiu ni multiplikas relativan angulon
     * 
    */
    static angulo(sgn,aa,def,af=1) {
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
     * Redonas 'true' se temas pri valida signo de angulo (cifero aŭ litero)
     */
    static angulsigno(sgn) {
        return (sgn >= "0" && sgn <= "9") 
            || (sgn >= "a" && sgn <= "z")
            || (sgn >= "A" && sgn <= "Z");
    }

    /**
     * Redonas la angulfaktoron, depende, ĉu signo estas 'm'
     */
    static angulfaktoro(sgn) {
        return (sgn == "m")? -1 : 1;
    }
}

class KformSVG {
    
    constructor(svg) {
        this.svg = svg;
    }

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
        const sy = Kform.dist_ŝrg;
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
        const dO = Kform.dist_onr;
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
        const re = Kform.rad_ele;
        const de = Kform.dist_ele;
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
        const dv = Kform.dist_lig;
        const lv = Kform.long_lig;
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
        const dv = Kform.dist_lig;
        const lv = Kform.long_lig;
        const la = Kform.long_ark;
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
        const lk = Kform.long_kjn;
        const yk = Kform.larĝ_kjn;
        const dk = Kform.dist_kjn;

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
        const lk = Kform.long_kjn;
        const dk = Kform.dist_kjn;
        const yk = Kform.larĝ_kjn;

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
        const lh = Kform.long_hpo;

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
        const dk = Kform.duon_jkr; 

        const pl = this.kreu("polyline", {
            points: `${-dk*.8},${-dk} ${-dk},${-dk} ${-dk},${dk} ${-dk*.8},${dk}`,
            class: "jonkrampo"
        });
        return pl;
    }

    /**
     * desegnu dekstran jonkrampon apud unuopa atomo
     */
    jkr_dekstra() {
        const dk = Kform.duon_jkr;

        const pl = this.kreu("polyline", {
            points: `${dk*.7},${-dk} ${dk},${-dk} ${dk},${dk} ${dk*.7},${dk}`,
            class: "jonkrampo"
        });
        return pl;
    }

    /** desgnu jonangulon dekstre supre
     * @param shargo la ŝargo de la jono
     * @param mm kadro de la molekulo (min x,y; max x,y)
     */
    jon_angulo(shargo,mm) {
        const jg = this.kreu("g", {
            class: "jonkrampo"
        });
        const lkr = Kform.long_jkr;
        const dkr = Kform.dist_jkr;
        const dsh = Kform.dist_jnŝ;
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
        const sy = Kform.dist_ŝrg;

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
        const rf = Kform.rad_ŝrg;
        const sy = Kform.dist_ŝrg;

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
        const dk = Kform.duon_jkr;

        const text = this.kreu("text", {
            x: dk*1.3,
            y: -dk*.9,
            class: "jonshargo"
        }, shargo);
        return text;
    }


}

/**
 * Grafo helpanta pri la geometria aranĝo de partoj de formuloj (atomoj, jonoj, grupoj).
 * (La nodoj enhavas precipe la poziciojn kaj simbolojn. Specifaj nodoj povas enteni 
 * pliajn informojn kiel ŝargo, oksidnombro k.s.)
 */
class KformGraf {

    constructor() {
        this.nodoj = {};
    }

    ŝlosiloj() {
        return Object.keys(this.nodoj);
    }

    /** 
     * Kreu nodon per tipo, simbolo kaj eventuala pozicio de la centro 
     * @param {string} smb la simbolo, ekz-e Si, Fe2+, OH
     * @param {string} tip la tipo atomo, jono, grupo, centro, ligando
     * @param {object} pos pozicio povas esti absoluta donita per x,y aŭ relativa al parenco p, donita per dx, dy)
     */
    nova(n_id, tip, smb, pos = {}) {
        const nodo = {
            tip: tip,
            smb: smb,
            pos: pos
        }
        this.nodoj[n_id] = nodo;
    }

    /**
     * Ŝanĝas la ŝlosilon de nodo
     */
    alinomu(n_id,n_id_nova) {
        this.nodoj[n_id_nova] = this.nodoj[n_id];
        delete this.nodoj[n_id];
    }

    /**
     * Metu nodon en relativan aŭ absolutan pozicion
     */
    metu(n_id,pos) {
        this.nodoj[n_id].pos = pos;
    }

    /** metu kadron per anguloj supra-maldekstra kaj malsupra-dekstra */
    kadru(n_id,su_md,ms_de) {
        const nodo = this.nodoj[n_id];
        nodo.su_md = su_md;
        nodo.ms_de = ms_de;
    }

    /**
     * Difinas la pozicion relative al parenca nodo
     * @param {string} n_id la nodo, kies pozicion ni metas relative al parenca nodo
     * @param {string} par la parenca nodo
     * @param {number} dist la distanco
     * @param {number} ang la angulo en gradoj
     */
    metu_relative(n_id,par,dist,ang) {
        const nodo = this.nodoj[n_id];

        const phi = (ang-90)/180 * Math.PI; // -90°, ĉar 0° ĉe ni estas supre kaj ne dekstre!
        let Ax = dist * Math.cos(phi);
        const Ay = dist * Math.sin(phi);

        if (nodo.tip == 'grupo')
            Ax -= Kform.dist_atm/5;

        // ĉar ni ne scias en kiu ordo la atomoj kaj grupoj
        // traktiĝas kaj ĉu do nuna nodo jam havas validan pozicion,
        // ni notas la pozicion relative al nodo par
        
        nodo.pos = { dx:Ax, dy:Ay };
        nodo.par = par;
    }

    /** Redonas la pozicion de la grupo. Se ekzistas absoluta, tiun, se
     * estas relativa ĝi kalkulas la absoluton el la relativa
     * @param rikuro ni permesas maksimume 10 rikurojn por eviti eterne kuri en cikloj!
     */
    pozicio(n_id,rnd=1,rik=0) {
        if (rik>10) throw `Tro da rikuroj (ĉu ciklo?) ĉe ${n_id}.`;

        const ronda = (pos) => {
            if (rnd>1) {
                pos.x = Math.round(pos.x*100)/100;
                pos.y = Math.round(pos.y*100)/100;
                if (pos.dx) pos.dx = Math.round(pos.dx*100)/100;
                if (pos.dy) pos.dy = Math.round(pos.dy*100)/100;
            }
            return pos;
        }

        const nodo = this.nodoj[n_id];
        if ('x' in nodo.pos && 'y' in nodo.pos) {
            return ronda(nodo.pos);
        } else if (nodo.tip=='grupo' && 'dx' in nodo.pos && 'dy' in nodo.pos) {
            return nodo.pos;
        } else if ('par' in nodo && 'dx' in nodo.pos && 'dy' in nodo.pos) {
            const ppos = this.pozicio(nodo.par,1,rik++);
            // aktualigu la pozicion de la atomo per la absoluta
            nodo.pos.x = ppos.x + nodo.pos.dx;
            nodo.pos.y = ppos.y + nodo.pos.dy;
            
            return ronda(nodo.pos);
        } else {
            throw `${n_id} ne havas pozicion absolutan aŭ relativan, ĉu eraro en la formul-specifo?`
        }
    }


    /**
     * Kalkulas la koordinatojn de la kadro ĉirkaŭanta la tutan kombinaĵon.
     */
    kadro() {
        const de = Kform.dist_ele;
        const dj = Kform.duon_jkr;
        let min_x = Number.MAX_VALUE, min_y = Number.MAX_VALUE, 
            max_x = Number.MIN_VALUE, max_y = Number.MIN_VALUE;

        for (const g of Object.values(this.nodoj)) {
            if (g.tip != 'grupo') { // ignoru tipon 'grupo', tiuj estas relative poziciitaj
                // PLIBONIGU: uzu la kadron g.su_md, g.ms_de...!
                const x = g.pos.x;
                const y = g.pos.y;
                min_x = Math.min(min_x,x-de);
                max_x = Math.max(max_x,x)+de;
                min_y = Math.min(min_y,y-de);
                max_y = Math.max(max_y,y+de);    
            }
        }
        /*
        if (this.jonoj && this.jonoj._vic) {
            for (const ji of this.jonoj._vic) {
                const j = this.jonoj[ji];
                const x = j.pos.x;
                const y = j.pos.y;
                min_x = Math.min(min_x,x-dj);
                max_x = Math.max(max_x,x+dj);
                min_y = Math.min(min_y,y-dj);
                max_y = Math.max(max_y,y+dj);
            }
        }
        // se la molekulo/jonaro enhavas grupojn ni devas trarigardi ankaŭ tiujn...!
        for (const g of Object.values(this.grupo_ref)) {
            const g_pos = g.pos;
            console.log(`pos ${g.ref} ${g_pos.p}...`);
            const a_j = this.atomoj[g_pos.p] || this.jonoj[g_pos.p];
            const a_pos = a_j.pos;
            const x = a_pos.x+g_pos.dx;
            const y = a_pos.y+g_pos.dy;
            min_x = Math.min(min_x,x);
            max_x = Math.max(max_x,x);
            min_y = Math.min(min_y,y);
            max_y = Math.max(max_y,y);
        }
        */

        return { 
            min_x: min_x, 
            max_x: max_x, 
            min_y: min_y, 
            max_y: max_y}
    }
}

/**
 * Kreas el specifo kemian kombinon (molekulon, jonon, jonaron)
 */

class KformKombino {


    //static #ti = 200; // ---> temp_int? tempintervalo por animacio
    #vico; #grafo; #kgraf;

    constructor(svg, opcioj) {
        this.desegno = new KformSVG(svg);
        this.opcioj = opcioj;
        this.#grafo = new KformGraf; // atomoj/jonoj/grupoj kaj ilia pozicioj aranĝataj dum kreo de molekulprezento
        // por kompleksoj ni bezonas apartan grafon, ĉar la apriora uziĝas
        // por la unuopaj ligandoj kaj intere foriĝas!
        this.#kgraf = new KformGraf();

        this.grupspec = {};
        this.#vico = [];
        this.opcioj = opcioj;

         /**
         * Redonas peranto-objekton por ebligi aliri la nodoj per this.nodoj[..] anstataŭ
         * pli longa this.grafo.nodoj[..]
         */           
        this.nodoj = new Proxy(this.#grafo, {
            get: function(target, prop, receiver) {
                if (typeof prop === 'string') {
                    if ( prop in target) {
                        return Reflect.get(...arguments);
                    } else {
                        return target.nodoj[prop];
                    }
                } else {
                    return Reflect.get(...arguments);
                }
                /*
                const value = target[prop];
                if (value instanceof Function) {
                    return function (...args) {
                        return value.apply(this === receiver ? target : this, args);
                    };
                }
                return value;
                */
            }
        });
    }

   

    /** 
     * Atomojn donitajn kiel signaro ni transformas al graf-nodoj
     * 
     * @param a atomoj kiel signaro (ekz. "OH2" - O estas la centra atomo ĉe origino (0,0), aŭ kiel objekto {<atomid>: <simbolo>,...})
     * @param on oksidnombro en la vicordo de kreotaj atomoj; KOREKTU: tio momente nur funkcias ĉe signaro, en la alia kazo donu jam en la objekto 
     */
    #a_obj(a, on) {  
        let obj = {};      
        if (typeof a === "object") {
            for (const [a_, smb] of Object.entries(a)) {
                this.nodoj.nova(a_,'atomo',smb);
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
                    this.nodoj.nova(el,'atomo',e,first?{x:0,y:0}:{});
                    if (on && n_on < on.length) this.nodoj[el].on = on[n_on];
                    n_on++;
                } else {
                    // n atomoj, ekz-e O2
                    for (let n_=1; n_<=n; n_++) {
                        const en = `${el}${n_}`;
                        this.nodoj.nova(en,'atomo',e,first?{x:0,y:0}:{});
                        if (on && n_on < on.length) this.nodoj[en].on = on[n_on];
                        n_on++;
                    }
                }
                first = false;
            }
        }
    }


    /** 
     * Jonojn donitajn kiel listo ni transformas al objekto 
     * 
     * @param jj jonoj kiel listo (ekz. ["O2-","Fe3+",...], alternative signaro kun apartigaj spacoj
     */
     #j_obj(jj) {  
        let obj = {_vic: []};
        let jlst = jj, nj = {}, jn = 0;    
        
        if (typeof jj === "string") {
            jlst = jj.split(/ /);
        }

        // jondifinoj konsistas el elementnomo kaj ŝargo
        const re = /([A-Z][a-z]?)([1-9]?[+-])/;
        for (const j of jlst) {
        // ni havas komence de la signaro ĉiam majusklan elementnomon evtl. sekvita de nombro!
            let m;
            if ((m = re.exec(j))) {
                const e = m[1]; // elementsimbolo

                // se unu elemento aperas plurope, ni nombru 1..n
                const n = nj[e]+1 || '';
                nj[e] = n? n : 1;    
                const el = e.toLowerCase() + n; // e-ŝlosilo

                // se la elemento aperas duan fojon ni devas ankoraŭ renomi <e> al <e1>
                // iom neelegante solvita: eble pli bone unue eltrovu la nombrojn de unuopaj elementoj!?
                if (n==2) {
                    this.nodoj.alinomu(e.toLowerCase(),e.toLowerCase()+'1');
                    const i = this.#vico.indexOf(e.toLowerCase());
                    this.#vico[i] = e.toLowerCase()+'1';
                }

                const sh = m[2]; // jonŝargo
                const _jg = this.nodoj.nova(el,'jono',e,jn==0?{x:0,y:0}:{});
                this.nodoj[el].sh = sh;
                // vicordo de jonoj
                this.#vico[jn] = el;

                jn++;
            }
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
            a = Kform.angulo(pj[0],0,0);
            da = 360 / pj[1].length;
            e = elektronoj.indexOf('%')+1;
        };

        // ni trakuras la elektronaranĝon per
        // kura variablo e ĝis la fino...
        while (e < elektronoj.length) {
            const ee = elektronoj[e];
            // la aktuala signo estas angulo, se la signo estas el 0-9, A-z
            if (Kform.angulsigno(ee)) {
                const _f = Kform.angulfaktoro(ee);
                if (_f < 0) {
                    af = _f * af;
                } else {
                    a = Kform.angulo(ee,a,da,af)
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
                    case " ":
                    case "_":
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
        const dM = Kform.dist_atm;
        const lv = Kform.long_lig;

        let af = 1; // ŝaltebla per "m " al -1, tio minusos postajn relativajn angulojn
        let ne = 0; // nombro de alordigitaj elektronoj per negativeco (redonota valoro)

        // funkcio por aldoni nombron de elektronoj al .ne de atomo _a
        const a_ne = (_a,_ne) => { 
            const a1 = this.nodoj[_a];
            if (a1) {
                if (!a1.ne) a1.ne = 0;
                a1.ne += _ne;
            } 
        }

        // se lig-anguloj ne estas aparte donitaj ni proporcie distribuas
        let a = 0, da = 0; // aktuala kaj diferenca anguloj
        let aligj = [], n = 1;

        // anstataŭ doni ĉiujn angulojn unuope
        // ni post % lasas al la programo dividi la angulojn sammezure
        if (ligoj.indexOf('%') >= 0) {
            const pj = ligoj.split('%');
            a = Kform.angulo(pj[0],0,0);
            aligj = pj[1].split(" ");
            da = 360 / alig.length;
        } else {
            aligj = ligoj.split(' ');
        }

        // ni trakuras la ligojn ĝis la fino...
        for (const ligo of aligj) {
            let l = 0; // montrilo en la signaron de unuopa ligo
            let lv = 0; // opeco de la ligo (0..3)
            let lf = 1; // faktoro de longeco (2=duobla longeco)
            while (l<ligo.length) {
                let ll = ligo[l];

                // unue ni atendas angulsigno(j)n
                if (Kform.angulsigno(ll)) {
                    const _f = Kform.angulfaktoro(ll);
                    if (_f < 0) {
                        af = _f * af;
                    } else {
                        a = Kform.angulo(ll,a,da,af)
                    }
                    
                // elektron-arko-signo?
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
                        case "_":
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
            let ref = ligo.substring(l+1);

            if (!ref) throw `Eraro en la ligo-specifo de ${atm}`;

            let grp;
            if (this.grupspec && this.grupspec[ref]) {
                // temas pri referencebla grupo, ni kreu instancon de la grupo
                // por tiu ĉi atomo... 
                const grp_ref = `${atm}_${ref}_${n}`; n++;
                // const g_pos = { dx:fD*Ax, dy:fD*Ay, p:atm };
                grp = this.#grupo(ref,grp_ref); //,g_pos);
                g.append(grp);

                // ni memoras la relativan pozicion de la grupo al la
                // atomo por poste kalkuli la absolutan pozicion
                this.nodoj.nova(grp_ref,'grupo',ref); //,g_pos);
                this.nodoj[grp_ref].ref = ref;

                ref = grp_ref;
            }             

            const distM = lf == 2? dM + 2.5*lv : dM;
            // necesas pli granda distanco por jonoj... pro la angulo/ŝargo
            const fD = this.nodoj[atm].tip == 'jono'
                || this.nodoj[ref].tip == 'jono' ? 1.5 : 1;

            this.nodoj.metu_relative(ref,atm,fD*distM,a);

            if (grp) {
                // ni ŝovas la grupon relative al la atomo...
                const g_pos = this.nodoj.pozicio(ref,100);
                this.desegno.atr(grp,{transform: `translate(${g_pos.dx} ${g_pos.dy})`});
            }

            // por atomoj de molekulo ni eventuale pentru ankoraŭ elektron-arkon
            // traktiĝas kaj ĉu do nuna atm jam havas validan pozicion,
            // ni notas la pozicion relative al nuna atomo atm
            if (this.opcioj.on_arkoj && this.opcioj.eneg && this.nodoj[ref].tip == 'atomo') {
                // se e-arkoj ne estas rekte donitaj sed kalkuliĝu
                // per elektronegativeco...:
                const en1 = this.opcioj.eneg(this.nodoj[atm].smb);
                const en2 = this.opcioj.eneg(this.nodoj[ref].smb);
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
                
            };        
            
        } // for

        // memoru nombron de alordigtaj elektronoj
        a_ne(atm,ne);
    } // #ligoj

    /**
     * Ornamas SVG-grupon g de centra jono per ligandoj ĉirkaŭe
     * @param {string} jon identigilo de la atomo, al kiu desegni la ligojn (ekz-e h2 por dua hidrogeno)
     * @param {*} g la SVG-grupo al kiu aldoni grafikajn elementojn
     * @param {*} ligandoj la specifo de la ligandoj (spacapartigitaj signaroj de angulo, speco kaj referencita grupo)
     */
     #ligandoj(ligandoj, distancoj) {
        const dM = Kform.dist_jon;

        let af = 1; // ŝaltebla per "m " al -1, tio minusos postajn relativajn angulojn

        // se lig-anguloj ne estas aparte donitaj ni proporcie distribuas
        let a = 0, da = 0; // aktuala kaj diferenca anguloj
        let aligj = [], n = 1;

        // anstataŭ doni ĉiujn angulojn unuope
        // ni post % lasas al la programo dividi la angulojn sammezure
        if (ligandoj.indexOf('%') >= 0) {
            const pj = ligoj.split('%');
            a = Kform.angulo(pj[0],0,0);
            aligj = pj[1].split(" ");
            da = 360 / alig.length;
        } else {
            aligj = ligandoj.split(' ');
        }

        // ni trakuras la ligojn ĝis la fino...
        for (const ligo of aligj) {
            let l = 0; // montrilo en la signaron de unuopa ligo
            let lv = 0; // opeco de la ligo (0..3)
            let lf = 1; // faktoro de longeco (2=suobla longeco)
            while (l<ligo.length) {
                let ll = ligo[l];

                // unue ni atendas angulsigno(j)n
                if (Kform.angulsigno(ll)) {
                    const _f = Kform.angulfaktoro(ll);
                    if (_f < 0) {
                        af = _f * af;
                    } else {
                        a = Kform.angulo(ll,a,da,af)
                    }
    
                // nun ni atendas ligtipon
                } else {
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
                        case "_":
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
            let ref = ligo.substring(l+1);

            if (!ref) throw `Eraro en la ligo-specifo de komplekso kun centro ${this.#kgraf._centro.smb}`;

            let fD = 1.0;
            if (distancoj && distancoj[ref]) fD = distancoj[ref]; //  ligand-specifa distanc-faktoro
            else if (distancoj && distancoj._) fD = distancoj._; // komleks-specifa distanc-faktoro
            const distM = fD * lf * dM;

            this.#kgraf.metu_relative(ref,'_centro',distM,a);
            // ni ŝovas la ligandogrupon relative al la centro...
            const grp = this.#kgraf.nodoj[ref].g;
            const g_pos = this.#kgraf.pozicio(ref,100);
            this.desegno.atr(grp,{transform: `translate(${g_pos.dx} ${g_pos.dy})`}); 
        } // for

    } // #ligandoj

    /**
     * Kreas elementsimbolon kun ĉirkaŭaj elektronoj kaj ligoj ktp. kiel SVG-grupo
     * @param {string} atm ŝlosilnomo de la atomo en la grafo, ekz-e "c1"
     * @param {string} elemento elementsimbolo, ekzemple "C"
     * @param {string} elektronoj elektronaranĝo (alternaj angulo- kaj elektronspecifoj)
     * @param {string} ligoj ligaranĝo al aliaj atomoj de la molekulo
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
        if (this.nodoj[atm].on) {
            g.append(this.desegno.oksidnombro(this.nodoj[atm].on));
        } /* ni devas unue trakti la tutan molekulon!...
        else if (this.opcioj.on_fŝ) {
            g.append(this.#oksidnombro(ne + shargo));
        } */

        return g;
    }


    /**
     * Kreas elementsimbolon kun ĉirkaŭaj elektronoj kaj jonŝargo kiel SVG-grupo
     * @param {string} jn ŝlosilo de la jono en la grafo, ekzemple "na"
     * @param {string} smb elementsimbolo
     * @param {string} elektronoj elektronaranĝo ĉirkaŭ la atomo/jono
     * @param {string} ŝargo ŝargo de la jono
     */
    #jono(jn,smb,elektronoj,ligoj,ŝargo) {
       
        // skribu elementnomon centre
        const g = this.desegno.kreu("g", { 
            class: `elemento ${smb}` 
        });
        g.append(this.desegno.teksto(smb));
        
        // desegnu elektronojn ĉirkaŭe
        if (elektronoj) this.#elektronoj(g,elektronoj);
        // normale ni ne havas verajn ligojn, sed ĉirkaŭaranĝon de aliaj jonoj...
        if (ligoj) this.#ligoj(jn,g,ligoj);

        // angulo aŭ krampo kun jonŝargo
        if (this.opcioj.jon_angulo) {
            const de = Kform.dist_ele;
            const mm = {min_x: -de, min_y: -de, max_x: de, max_y: de};
            g.append(this.desegno.jon_angulo(ŝargo,mm));
        } else {
            g.append(
                this.desegno.jkr_maldekstra(),
                this.desegno.jkr_dekstra(),
                this.desegno.j_shargo(ŝargo));    
        }

        return g;
    }

    /**
     * Kreas SVG-elementojn por grupo (-OH, -COOH k.s.) koncizigante la molekulprezenton
     * @param {string} id nomo de la grupo (en la specifo) 
     * @param {string} g_ref referencilo de la grupo <atomo>_<grupo>
     */
    #grupo(id,g_ref) { //},pos) {
        const dA = Kform.dist_atm;
        const grp = this.grupspec[id];

        /*
        const x = Math.round((pos.dx - dA/5) * 100)/100 ;
        const y = Math.round(pos.dy*100)/100;
        */
               
        // skribu elementnomojn centre
        const g = this.desegno.kreu("g", { 
            id: g_ref,
            class: `grupo ${grp.a}`
            //transform: `translate(${x} ${y})`
        });
        g.append(this.desegno.teksto(grp.a));

        if (grp.s && grp.s._) {
            
            // provizora kadro.. ni bezonos pli ekzaktan algoritmon
            const mm = {min_x: 0, min_y: -dA/2, max_x: grp.a.length*dA/2, max_y: dA};
            const jg = this.desegno.jon_angulo(grp.s._,mm);
            /*
            // tio estus tro frue, alternative ni povus aldoni jg sub <defs> por uzi getBBox()
            // aŭ provizore aldoni kaj poste ŝovi ĝustaloken...
            // vd https://stackoverflow.com/questions/28282295/getbbox-of-svg-when-hidden
           const bb = mlk.getBBox();
           const jg = this.desegno.jon_angulo(molekulo.s._,{
                min_x: bb.x, min_y: bb.y, 
                max_x: bb.x+bb.width, max_y: bb.y+bb.height});
                */
           g.append(jg);
        }

        return g;
    }

    /**
     * Nuligas helpstrukturojn antaŭ kreo de nova molekulo aŭ jonaro...
     * alternative forĵetu klason post unufoja uzo, sed tio eble
     * ĝenas en kreado de ekacioj...
     */
    nulu() {
        this.#grafo = new KformGraf(); // atomoj/jonoj/grupoj kaj ilia pozicioj aranĝataj dum kreo de molekulprezento
        this.grupspec = {};
        this.#vico = [];        
    }

    
     /**
     * kreas molekulon kiel SVG-g-elementon kaj redonas tiun
     * @param {object} molekulo ojekto kun la difino de la molekulo
     * @returns 
     */
    #molekulo(molekulo) {
        this.nulu();
        let poz = -1;
        // atomoj povas doniĝi kiel objekto aŭ signaro, tiam ni devas ankoraŭ krei la objekton
        const on = molekulo.on? molekulo.on.split(' ') : null;
        this.#a_obj(molekulo.a, on);
        this.grupspec = molekulo.g;
        const mlk = this.desegno.kreu("g");

        let gj = {};
        // trakuri ĉiujn atomojn de la molekulo
        for (const atm of this.nodoj.ŝlosiloj()) {
            const atomo = this.nodoj[atm];
            if (atomo.tip == 'atomo') {
                const smb = atomo.smb;
                const elektronoj = molekulo.e && molekulo.e[atm] ? molekulo.e[atm] : null;
                const ligoj = molekulo.l && molekulo.l[atm] ? molekulo.l[atm] : null;
                const shargo = molekulo.s && molekulo.s[atm] ? molekulo.s[atm] : null;
                // kreu la SVG-strukturon por la atomoj kun elektronoj, ligoj kc
                const g = this.#atomo(atm,smb,elektronoj,ligoj,shargo);
                gj[atm] = g;   
            }
        } // ...for

        // nur post trakto de ĉiuj atomoj ni nun povas elkakluli
        // absolutajn poziciojn kaj oksidnombrojn de la atomoj
        for (const a_ of Object.keys(gj)) {
            const g_ = gj[a_];
            // dum la procedo ni notis ĉiujn poziciojn de atomoj kaj grupoj
            // ni devos ankoraŭ ŝovi la g-elementojn al tiuj pozicioj!
            const pos = this.nodoj.pozicio(a_,100);
            if (pos.x || pos.y) {
                this.desegno.atr(g_,{transform: `translate(${pos.x} ${pos.y})`});    
            }
            //mlk.append(g_);

            // kalkulu oksidnombron el formala ŝargo kaj alordigitaj elektronoj
            if (this.opcioj.on_fŝ) {
                const atomo = this.nodoj[a_];
                if (atomo && ! atomo.on) {
                    const sh = molekulo.s && molekulo.s[a_] ? molekulo.s[a_] : 0;
                    const shargo = (sh == '-' || sh == '+') ? sh+1 : sh;
                    atomo.on = atomo.ne? shargo - atomo.ne : shargo;
                    g_.append(this.desegno.oksidnombro(atomo.on));
                }    
            }
        } // for


        //this.svg.append(mlk);
        mlk.append(...Object.values(gj));

        // se la molekulo havas ŝargon ĝi estas jono kaj bezonas jonindikon
        if (molekulo.s && molekulo.s._) {
            
            const mm = this.nodoj.kadro();
            const jg = this.desegno.jon_angulo(molekulo.s._,mm);
            /*
            // tio estus tro frue, alternative ni povus aldoni jg sub <defs> por uzi getBBox()
            // aŭ provizore aldoni kaj poste ŝovi ĝustaloken...
            // vd https://stackoverflow.com/questions/28282295/getbbox-of-svg-when-hidden
           const bb = mlk.getBBox();
           const jg = this.desegno.jon_angulo(molekulo.s._,{
                min_x: bb.x, min_y: bb.y, 
                max_x: bb.x+bb.width, max_y: bb.y+bb.height});
                */
           mlk.append(jg);
        }

        return mlk;
    }

   /**
     * desegni atomojn kaj molekulojn en formulo (laŭbezono kun elektronoj laŭ Lewis) kiel SVG-desegno
     * 
     * @param {object} molekulo specifo de molekulo (vd. supre...)
     * @param {object} opcioj opcioj por prezentado
     */
    molekulo(molekulo) {
        const mlk = this.#molekulo(molekulo);
        this.desegno.svg.append(mlk);
        return mlk;
    }


     /**
     * kreas jonaron kiel SVG-g-elementon kaj redonas tiun
     * @param {object} jonspec ojekto kun la difino de la jonoj
     * @returns 
     */
    #jonaro(jonspec) {
        this.nulu();

        let poz = -1;
        this.#j_obj(jonspec.j);
        this.grupspec = jonspec.g;
        const jnr = this.desegno.kreu("g");

        let gj = {}, x = 0;

        // trakuri ĉiujn jonojn
        for (const jn of this.#vico) {
            const smb = this.nodoj[jn].smb;
            const elektronoj = jonspec.e && jonspec.e[jn] ? jonspec.e[jn] : null;
            // ligoj: ne temas pri kovalentaj ligoj, sed la geometria aranĝo de jonligoj
            const ligoj = jonspec.l && jonspec.l[jn] ? jonspec.l[jn] : null;
            const ŝargo = this.nodoj[jn].sh
            //const shargo = jonspec.s && jonspec.s[jn] ? jonspec.s[jn] : null;
            // kreu la SVG-strukturon por la atomoj kun elektronoj, ligoj kc
            const g = this.#jono(jn,smb,elektronoj,ligoj,ŝargo);

            this.nodoj[jn].pos = { x: x, y: 0};
            if (x) this.desegno.atr(g,{transform: `translate(${x} 0)`});
            x += Kform.dist_jon;

            gj[jn] = g;
        } // ...for

        // nur post trakto de ĉiuj, ni nun povas elkakluli
        // poziciojn kaj ŝovi erojn ĝustaloke...
        for (const a_ of Object.keys(gj)) {
            const g_ = gj[a_];
            // dum la procedo ni notis ĉiujn poziciojn de atomoj kaj grupoj
            // ni devos ankoraŭ ŝovi la g-elementojn al tiuj pozicioj!
            const pos = this.nodoj.pozicio(a_,100);
            if (pos.x || pos.y) {
                this.desegno.atr(g_,{transform:`translate(${pos.x} ${pos.y})`});
            }
        } // for

        //this.svg.append(mlk);
        jnr.append(...Object.values(gj));

        /*
        // se la jonoj havas ŝargon ĝi estas jono kaj bezonas jonindikon
        if (jonaro.s && jonaro.s._) {
            
            const mm = this.kadro();
            const jg = this.desegno.jono(molekulo.s._,mm);
           mlk.append(jg);
        }
        */

        return jnr;
    }

    /**
     * desegni atomojn kaj molekulojn en elektronstruktura formulo laŭ Lewis kiel SVG-desegno
     * 
     * @param {object} jonspec specifo de jonaro 
     * @param {object} opcioj opcioj por prezentado
     */
    jonaro(jonspec) {
        const jnr = this.#jonaro(jonspec);
        this.desegno.svg.append(jnr);
        return jnr;
    }


     /**
     * kreas kunordigan komplekson kiel SVG-g-elementon kaj redonas tiun
     * @param {object} kspec ojekto kun la difino de la komplekso kun centro "c" kaj ligandoj "g"
     * @returns 
     */
    #komplekso(kspec) {
        this.nulu();

        const kmpl = this.desegno.kreu("g");

        // trakuri ĉiujn ligandojn kaj kreu la resp. molekulojn
        const ligspec = kspec.g;
        for (const lg of Object.keys(ligspec)) {
            const lspec = ligspec[lg];
            // kreu molekulgrupon (SVG g) kaj aldonu al la grafo kiel ligando
            this.#kgraf.nova(lg,'ligando',lspec.a);
            const g = this.#molekulo(lspec);
            g.id = lg;
            this.#kgraf.nodoj[lg].g = g;
        }

        // krei la centran jonon kaj aldonu al la grafo...
        const jspec = kspec.c.j;
        // jondifinoj konsistas el elementnomo kaj ŝargo
        const re = /([A-Z][a-z]?)([1-9]?[+-])/;
        const m = re.exec(jspec);
        let jsmb = jspec, jsh = ''; // se regulesprimo fiaskos..., ĉu anstataŭe ĵeti escepton?
        if (m) {
            jsmb = m[1]; // elementsimbolo
            jsh = m[2]; // ŝargo
        }
        this.#kgraf.nova("_centro",'centro',jsmb,{x:0,y:0});
        this.#kgraf.nodoj._centro.g = this.#jono('_centro',jsmb,null,null,jsh);

        // aranĝi la ligandojn
        const alig = kspec.c.l;
        this.#ligandoj(alig, kspec.c.d);

        // aldonu ĉiujn grupojn al la desegno
        const gj = Object.values(this.#kgraf.nodoj).map((x) => x.g); 
        kmpl.append(...gj);

        return kmpl;
    }

    /**
     * desegni kunordigan komplekson el centra jono kun ĉirkaŭaj ligandoj
     * @param {object} kspec objekto specifanta la komplekson, ĝi devas enhavi ŝolsilojn c (centro) kaj g (ligandoj)
     */
    komplekso(kspec) {
        const kmpl = this.#komplekso(kspec);
        this.desegno.svg.append(kmpl);
        return kmpl;
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
                this.desegno.jkr_dekstra(),
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

/**
 * Kreas ekvacion el pluraj termoj kiuj povas esti aŭ signoj aŭ kemiaj kombinaĵoj
 */
class KformEkvacio {

    static #ekv_isp = 5; // aldona spaco inter termoj de ekvacio
    static sgn = {
        '+': "+",
        '*': '\u00d7', //\u00b7
        '->': "\u27f6",
        '<->': "\u27f7",
        '<=>': "\u27fa",
        '½': '½'
    };

    constructor(svg,opcioj) {
        this.desegno = new KformSVG(svg);
        this.opcioj = opcioj;
    }

    /**
     * Desegnas ekvacion (molekuloj aŭ kombinaj signoj) 
     * 
     * @param {string} ekvacio listo de termoj apartigitaj per spacoj, kiuj povas esti aŭ nomo de molekulo el mspec aŭ simplaj signaroj ('+', '->', '<->' k.s.)
     * @param {object} tspec specifoj de molekuloj/jonoj/atomoj referencitaj en la ekvacio
     */
    ekvacio(ekvacio,tspec,opcioj) {
        const isp = KformEkvacio.#ekv_isp;
        let maxY = 30; // provizore, aktualigu per terma kadro...

        const ekv = this.desegno.kreu("g");
        this.desegno.svg.append(ekv); // getBBox() nur funkcias, kiam la elementoj jam estas aldonitaj al la desegno!

        const termoj = ekvacio.split(/ /).reduce((arr,x) => {
            const x_ = x.split('*');
            if (x_.length == 2) arr.push(x_[0],'*',x_[1]);
            else if (x_.length == 1) arr.push(x_[0]);
            else throw "Ekvacio nevalida, mankas spacsigno inter la termoj de "+x;
            return arr;
        },[]);


        let ŝovo = {x:0, y:0};
        for (const t of termoj) {
            // temas pri ekvacia signo aŭ nombro...
            const sgn = KformEkvacio.sgn[t];
            if (sgn || !isNaN(t)) {
                const s = sgn? sgn : t;
                const t_ = this.desegno.teksto(s,'e-sgn');
                ekv.append(t_);

                if (this.opcioj.dulinie && t.endsWith('->')) {
                    ŝovo.x = 0;
                    ŝovo.y += maxY;
                    //maxY = 0;
                }

                this.desegno.ŝovu(t_, ŝovo.x, ŝovo.y);
                const bb = t_.getBBox();
                ŝovo.x += bb.width + (!isNaN(t)? isp/2 : isp);

            // temas pri molekulo/jonoj/atomoj
            } else if (t.trim() != "") {
                const sp = tspec[t];
                if (!sp) throw `Mankas specifo de ${t}.`;
                let termo;
                const kombin = new KformKombino(this.desegno.svg,this.opcioj);
                if (sp.a) {
                    termo = kombin.molekulo(sp);
                } else if (sp.j) {
                    termo = kombin.jonaro(sp);
                }
                
                // ŝovu la termon horizontale en sian lokon
                const mm = kombin.nodoj.kadro();
                this.desegno.ŝovu(termo, ŝovo.x - mm.min_x, ŝovo.y);
                ŝovo.x += mm.max_x - mm.min_x + isp;
                /* tio estus tro frue, alternative oni povus enigi m en SVG, ekz-e sub defs...
                const bb = m.getBBox();
                this.desegno.ŝovu(m, ŝovo - bb.x, sovo.y);
                ŝovo += bb.width + isp;
                */
                ekv.append(termo);
            }
            console.log(`${t} ${ŝovo}`);
        }

        return ekv;
    }

}

