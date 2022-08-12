
const _L = {
    ns: "http://www.w3.org/2000/svg",
    de: 7, // distanco de elektronoj de atommezo
    dk: 10,// distanco de jonkrampoj
    re: .5, // radiuso de elektrono(punkto)
    lv: 5, // longeco de valentstreko
    dA: 19, // distanco inter atomoj
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
            tspan.setAttribute("dy","-5");
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
        p.setAttribute("x1",_L.de);
        p.setAttribute("x2",_L.de+_L.lv);
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
        const dk = _L.dk;
        pl.setAttribute("points",`${-dk*.8},${-dk} ${-dk},${-dk} ${-dk},${dk} ${-dk*.8},${dk}`);
        pl.setAttribute("fill","none");
        return pl;
    }

    /**
     * desegnu dekstran krampon
     */
    _kr(shargo) {
        const pl = document.createElementNS(_L.ns,"polyline");
        const dk = _L.dk;
        pl.setAttribute("points",`${dk*.7},${-dk} ${dk},${-dk} ${dk},${dk} ${dk*.7},${dk}`);
        pl.setAttribute("fill","none");
        return pl;
    }

    /** 
     * desegnu ŝargon apud jonkrampo
     */
    _sh(shargo) {
        const text = document.createElementNS(_L.ns,"text");
        const dk = _L.dk;
        text.textContent = shargo;
        text.setAttribute("x",dk*1.3);
        text.setAttribute("y",-dk*.9);
        return text;
    }
    
    /**
     * desegni atomojn kaj molekulojn en elektronstruktura formulo laŭ Lewis kiel SVG-desegno
     */
    molekulo(spec) {
        const ns = _L.ns;

        for (atom of spec) {
            // skribu elementnomon centre
            const g = document.createElementNS(ns,"g");
            g.append(this._t(atom[0]));

            // se aperas valentstreko ni forŝovas la atomon
            // en la kontraŭa direkto de la centro
            // ni do antaŭsupozas, ke la centra atomo ne havas
            // valentstrekojn, sed tiuj estas notitaj ĉe la flankaj atomoj
            // de molekulo
            // Atentu, ke tiel ni momente ne subtenas kompleksajn molekulojn!
            let Ax=0, Ay=0; dA = _l.dA;

            // desegnu elektronojn / ligojn ĉirkaŭe
            if (atom.length>1) {
                const s1 = atom[1];
                let i = 0;
                while (i < s1.length) {
                    // KOREKTU: ni uzu angulojn 30, 150, ktp. por oblikvaj lokoj (komparu chemfig)
                    const a = parseInt(s1[i]) * 45; //* s1[i] % 2;
                    const phi = (180+a)/180 * Math.PI;
        
                    switch (s1[i+1]) {
                        case ".":
                            g.append(this._e(0,a));
                            break;
                        case ":":
                            g.append(this._e(-1,a),this._e(1,a));
                            break;
                        case "-":
                            g.append(this._l(0,a));
                            Ax = dA * Math.cos(phi);
                            Ay = dA * Math.sin(phi);
                            break;
                        case "=":
                            g.append(this._l(-1,a),this._l(1,a));
                            Ax = dA * Math.cos(phi);
                            Ay = dA * Math.sin(phi);
                            break;
                        case "#":
                            g.append(this._l(-2,a),this._l(0,a),this._l(2,a));
                            Ax = dA * Math.cos(phi);
                            Ay = dA * Math.sin(phi);
                    } // ...switch
                    i += 2;
        
                } // ...while
            } // ...if

            if (Ax || Ay) {
                g.setAttribute("transform",`translate(${Ax} ${Ay})`);
            }
            
            this.svg.append(g);
        } // ...for
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