
function lewis(svg,spec) {
    const ns = "http://www.w3.org/2000/svg";
    //const ty = 1; // y-ŝovo de teksto
    const de = 7; // distanco de elektronoj de atommezo
    const re = .5; // radiuso de elektrono(punkto)
    const lv = 5; // longeco de valentstreko
    const dA = 19; // distanco inter atomoj
    // let dg = 0; // unua atomo ĉe x=0;

    const _t = (tx) => {
        const parts = tx.split('^');
        const text = document.createElementNS(ns,"text");
        text.append(parts[0]);        
        if (parts.length>1) {
            const tspan = document.createElementNS(ns,"tspan");
            tspan.setAttribute("dy","-5");
            tspan.setAttribute("class","sup");
            tspan.textContent = parts[1]
            text.append(tspan);
        }
        return text;
    }

    const _e = (dy=0,a=0) => {
        const e = document.createElementNS(ns,"circle");
        e.setAttribute("r",re);
        e.setAttribute("cx",de);
        if (dy) e.setAttribute("cy",dy);
        if (a) e.setAttribute("transform",`rotate(${a})`);
        return e;
    }

    const _l = (dy,a) => {
        const p = document.createElementNS(ns,"line");
        p.setAttribute("x1",de);
        p.setAttribute("x2",de+lv);
        if (dy) {
            p.setAttribute("y1",dy);
            p.setAttribute("y2",dy)
        }
        if (a) p.setAttribute("transform",`rotate(${a})`);   
        return p;     
    }

    for (atom of spec) {
        // skribu elementnomon centre
        const g = document.createElementNS(ns,"g");
        g.append(_t(atom[0]));

        // se aperas valentstreko ni forŝovas la atomon
        // en la kontraŭa direkto de la centro
        // ni do antaŭsupozas, ke la centra atomo ne havas
        // valentstrekojn, sed tiuj estas notitaj ĉe la flankaj atomoj
        // de molekulo
        // Atentu, ke tiel ni momente ne subtenas kompleksajn molekulojn!
        let Ax=0, Ay=0;

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
                        g.append(_e(0,a));
                        break;
                    case ":":
                        g.append(_e(-1,a),_e(1,a));
                        break;
                    case "-":
                        g.append(_l(0,a));
                        Ax = dA * Math.cos(phi);
                        Ay = dA * Math.sin(phi);
                        break;
                    case "=":
                        g.append(_l(-1,a),_l(1,a));
                        Ax = dA * Math.cos(phi);
                        Ay = dA * Math.sin(phi);
                        break;
                    case "#":
                        g.append(_l(-2,a),_l(0,a),_l(2,a));
                        Ax = dA * Math.cos(phi);
                        Ay = dA * Math.sin(phi);
                } // ...switch
                i += 2;
    
            } // ...while
        } // ...if

        if (Ax || Ay) {
            g.setAttribute("transform",`translate(${Ax} ${Ay})`);
        }
        
        svg.append(g);
    } // ...for
}