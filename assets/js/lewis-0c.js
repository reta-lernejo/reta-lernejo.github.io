
const _L = {
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

/**
 * Angulojn vi povas doni absolute, laŭ la horloĝo:
 * 0 (supre), 1 (30°), 2 (60°), 3 (90°), 4 (120°), 5 (150°), 6 (180°)
 * 7 (210°), 8 (240°), 9 (270°), x (300°), y (330°)
 * aŭ relative al la antaŭa:
 * d (duoncirklo, 180°), t (trioncirklo, 120°), k (kvaroncirklo, 90°), o (okonocirklo, 45°)
 * A (akvo, 105°), a (85°), p (piramida/tetraedra, 109,5°), s (72°), S (144°)
 * 
 * elektronoj/ligoj:
 * . unuopa elektrono, : elektronparo, ; elektrontriopo
 * - unuopa ligo, = duopa ligo, # triopa ligo
 * < kojno plena (antaŭen) > kojno striita (malantaŭen)  
 * ~ hidrogenponto / parta ligo
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

    /** Elkalkulas la sekvan angulon surbaze de donita signo, antaŭa kaj apriora angulo 
     * 
    */
   _a(sgn,aa,def) {
        // absoluta angulo
        if (sgn >= "0" && sgn <= "9") {
            return 30 * (sgn - "0")
        };
        
        if (sgn == "x") return 300;
        if (sgn == "y") return 330;

        // relativa angulo
        return aa + ({
            d: 180, t: 120, k: 90, o: 45,
            A: 105, a: 85, p: 109.5, s: 72, S: 144
        }[sgn] || def);
    }


    /**
     * helfunkcio por krei tekston kun evtl. supra indico (ekz-e ŝargo)
     * @param tx: la texto, supra indico estu apartigita per '^'
     */ 
    _t(tx) {
        const parts = tx.split('^');
        const text = document.createElementNS(_L.ns,"text");
        text.append(parts[0]);        
        if (parts.length>1) {
            const tspan = document.createElementNS(_L.ns,"tspan");
            tspan.setAttribute("dy",-_L.sy);
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
        const e = document.createElementNS(_L.ns,"circle");
        e.setAttribute("r",_L.re);
        e.setAttribute("cx",_L.de);
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
        const p = document.createElementNS(_L.ns,"line");
        p.setAttribute("x1",_L.dv);
        p.setAttribute("x2",_L.dv+_L.lv);
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
        const p = document.createElementNS(_L.ns,"path");
        p.setAttribute("d",`M${_L.dk},0 l${_L.lk},${-_L.yk} l0,${2*_L.yk} Z`);
        p.setAttribute("class","akojno");
        if (a != 90) p.setAttribute("transform",`rotate(${a-90})`);   
        return p;     
    }

    /**
     * helpfunkcio por desegni kojnon por ligo malantaŭen
     * @param a  angulo ĉe kiu la linio aperu, 0 = supre, 270 = maldekstre
     */ 
     _km(a) {
        const p = document.createElementNS(_L.ns,"path");
        p.setAttribute("d",`M${_L.dk},0 l${_L.lk},${-_L.yk} l0,${2*_L.yk} Z`);
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
        const p = document.createElementNS(_L.ns,"line");
        p.setAttribute("x1",_L.dh);
        p.setAttribute("x2",_L.dh+_L.lh);
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
        const pl = document.createElementNS(_L.ns,"polyline");
        const dk = _L.dkr;
        pl.setAttribute("points",`${-dk*.8},${-dk} ${-dk},${-dk} ${-dk},${dk} ${-dk*.8},${dk}`);
        pl.setAttribute("fill","none");
        return pl;
    }

    /**
     * desegnu dekstran krampon
     */
    _kr(shargo) {
        const pl = document.createElementNS(_L.ns,"polyline");
        const dk = _L.dkr;
        pl.setAttribute("points",`${dk*.7},${-dk} ${dk},${-dk} ${dk},${dk} ${dk*.7},${dk}`);
        pl.setAttribute("fill","none");
        return pl;
    }

    /**
     * desegnu formalŝargon kiel cirklitan + aŭ -
     */
    _fs(a,plus) {
        const g = document.createElementNS(_L.ns,"g");
        g.setAttribute("class","shargo");
        const c = document.createElementNS(_L.ns,"circle");
        c.setAttribute("r",_L.rf);
        c.setAttribute("cx",_L.de);
        const p = document.createElementNS(_L.ns,"path");
        const l = 3/4*_L.rf;
        let d = `M${_L.de-l/2} 0L${_L.de+l/2} 0`;
        if (plus) d+= `M${_L.de} ${-l/2}L${_L.de} ${l/2}`
        p.setAttribute("d",d);
        g.append(c,p);
        if (a != 90) g.setAttribute("transform",`rotate(${a-90})`);
        return g;     
    }

    /** 
     * desegnu ŝargon apud jonkrampo
     */
    _sh(shargo) {
        const text = document.createElementNS(_L.ns,"text");
        const dk = _L.dkr;
        text.textContent = shargo;
        text.setAttribute("x",dk*1.3);
        text.setAttribute("y",-dk*.9);
        return text;
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
    molekulo(spec) {
        const ns = _L.ns;
        const dM = _L.dM;
        let poz = -1;

        const mlk = document.createElementNS(ns,"g");

        for (const atom of spec) {

            const smb = atom[0];
            let eltrj = atom[1];
            const ŝovo = atom[2] || poz+1; 
            poz = ŝovo; // se ŝovo ne estas donita ni ŝovas je unu pozicio de la lasta
            const aŝov = atom[3] || 90;
            
            // skribu elementnomon centre
            const g = document.createElementNS(ns,"g");
            g.setAttribute("class",atom[0].split('^')[0]);

            // desegnu elektronojn / ligojn ĉirkaŭe
            let ne = 0;
            if (eltrj) {

                // se lig-anguloj ne estas aparte donitaj ni proporcie distribuas
                let e = 0; // montrilo en la signaron de eltrj
                let a = 0, da = 0; // aktuala kaj diferenca anguloj
                if (eltrj && eltrj.indexOf('%') >= 0) {
                    const pj = eltrj.split('%');
                    a = this._a(pj[0],0,0);
                    da = 360 / pj[1].length;
                    e = eltrj.indexOf('%')+1;
                };

                // ni trakuras la elektronaranĝon eltrj per
                // kura variablo e ĝis la fino...
                while (e < eltrj.length -1) {
                    let ee = eltrj[e];
                    // ĉu la aktuala signo estas angulo 0-9, A-z
                    if ((ee >= "0" && ee <= "9") || (ee >= "A" && ee <= "z")) {
                        a = this._a(ee,a,da)
                        ee = eltrj[++e];
                    };

                    // nun ĉiuokaze ni atendas ligtipon
                    switch (ee) {
                        case ".":
                            g.append(this._e(0,a));
                            break;
                        case ":":
                            g.append(this._e(-1,a),this._e(1,a));
                            break;
                        case ";":
                            g.append(this._e(-2,a),this._e(0,a),this._e(2,a));
                            break;
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
                        case "+": // formala ŝargo (+)
                            g.append(this._fs(a,true));
                            break;
                        case "'": // formala ŝargo (-)
                            g.append(this._fs(a,false));
                            break;
                        case " ":
                            break;
                    } // ...switch  
                    
                    e++;
                    a += da; // ĉe proporcia aranĝo da>0!
                } // ...while
            } // ...if

            // skribu la elementsimbolon centre
            g.append(this._t(atom[0]));

            if (ŝovo) {
                const phi = (aŝov-90)/180 * Math.PI;
                const Ax = ŝovo * dM * Math.cos(phi);
                const Ay = ŝovo * dM * Math.sin(phi);
                g.setAttribute("transform",`translate(${Ax} ${Ay})`);
            }
            
            mlk.append(g);
        } // ...for

        this.svg.append(mlk);
        return mlk;
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
        const ns = _L.ns;        
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
        const ns = _L.ns;
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
        const ns = _L.ns;
        
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