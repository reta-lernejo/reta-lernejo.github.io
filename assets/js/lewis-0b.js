
const _L = {
    ns: "http://www.w3.org/2000/svg",
    de: 7, // distanco de elektronoj de atommezo
    sy: 4, // dy de ŝargo relative al la elementsimbolo
    dkr: 10,// distanco de jonkrampoj
    re: .5, // radiuso de elektrono(punkto)
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


class Lewis {

    constructor(svg) {
        this.svg = svg;
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
     * @param a  angulo ĉe kiu la punkto aperu, 0 = dekstre, 270 = supre
     */ 
    _e(dy=0,a=0) {
        const e = document.createElementNS(_L.ns,"circle");
        e.setAttribute("r",_L.re);
        e.setAttribute("cx",_L.de);
        if (dy) e.setAttribute("cy",dy);
        if (a) e.setAttribute("transform",`rotate(${a})`);
        return e;
    }

    /**
     * helpfunkcio por desegni linion por ligo
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la linio aperu, 0 = dekstre, 270 = supre
     */ 
    _l(dy,a) {
        const p = document.createElementNS(_L.ns,"line");
        p.setAttribute("x1",_L.dv);
        p.setAttribute("x2",_L.dv+_L.lv);
        if (dy) {
            p.setAttribute("y1",dy);
            p.setAttribute("y2",dy)
        }
        if (a) p.setAttribute("transform",`rotate(${a})`);   
        return p;     
    }

    /**
     * helpfunkcio por desegni kojnon por ligo antaŭen/malantaŭen
     * @param a  angulo ĉe kiu la linio aperu, 0 = dekstre, 270 = supre
     * @param cls CSS-klaso por doni stilon
     */ 
     _k(a,cls) {
        const p = document.createElementNS(_L.ns,"path");
        p.setAttribute("d",`M${_L.dk},0 l${_L.lk},${-_L.yk} l0,${2*_L.yk} Z`);
        if (cls) p.setAttribute("class",cls);
        if (a) p.setAttribute("transform",`rotate(${a})`);   
        return p;     
    }

    /**
     * helpfunkcio por desegni linion por hidgrogenponto
     * @param dy ŝovo supren aŭ malsupren de la origino (-1 / 1)
     * @param a  angulo ĉe kiu la linio aperu, 0 = dekstre, 270 = supre
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
        if (a) p.setAttribute("transform",`rotate(${a})`);   
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
     * ["O",">=::"], ["O","< ::",1]
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
            const aŝov = atom[3] || 0;

            // evtl. lig-anguloj estas aparte donitaj
            const espec = eltrj? eltrj.split('[') : []; 
            let eang = [];
            if(espec.length>1) {
                eltrj = espec[0];
                eang = espec[1].slice(0,-1).split(',');
            }

            // skribu elementnomon centre
            const g = document.createElementNS(ns,"g");
            g.setAttribute("class",atom[0].split('^')[0]);

            // desegnu elektronojn / ligojn ĉirkaŭe
            let ne = 0;
            if (eltrj) {
                let a = parseInt(eang[ne]) || {">": 0, "<": 180, "^": 270, "v": 90}[eltrj[0]];
                const da = 360 / (eltrj.length-1);

                for (const e of eltrj.slice(1)) {
        
                    switch (e) {
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
                        case "K": // kojno antaŭen (plena)
                            g.append(this._k(a,"kojno_plena"));
                            break;
                        case "k": // kojno antaŭen (streka)
                            g.append(this._k(a,"kojno_streka"));
                            break;
                        case "h":
                            g.append(this._h(0,a));
                            break;
                        case " ":
                            break;
                    } // ...switch  
                    
                    a += parseInt(eang[++ne]) || da;
                } // ...for
            } // ...if

            // skribu la elementsimbolon centre
            g.append(this._t(atom[0]));

            if (ŝovo) {
                const phi = (aŝov)/180 * Math.PI;
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