
function lewis(svg,spec) {
    const ns = "http://www.w3.org/2000/svg";
    //const ty = 1; // y-ŝovo de teksto
    const de = 6; // distanco de elektonoj de atommezo
    const re = .5; // radiuso de elektronopunkto
    const lv = 5; // longeco de valentstreko
    const da = 17; // distanco inter atomoj
    let dg = 0; // unua atomo ĉe x=0;

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

        const text = document.createElementNS(ns,"text");
        text.textContent = atom[0];
        g.append(text);

        // desegnu elektronojn / ligojn ĉirkaŭe
        const s1 = atom[1];
        let i = 0;
        while (i < s1.length) {
            // KOREKTU: ni uzu angulojn 30, 150, ktp. por oblikvaj lokoj (komparu chemfig)
            const a = parseInt(s1[i]) * 45; //* s1[i] % 2;
            switch (s1[i+1]) {
                case ".":
                    g.append(_e(0,a));
                    break;
                case ":":
                    g.append(_e(-1,a),_e(1,a));
                    break;
                case "-":
                    g.append(_l(0,a));
                    break;
                case "=":
                    g.append(_l(-1,a),_l(1,a));
                    break;
                case "#":
                    g.append(_l(-2,a),_l(0,a),_l(2,a));
            } // ...switch
            i += 2;

        } // ...while
        if (dg>0) {
            g.setAttribute("transform",`translate(${dg} 0)`);
        }
        dg += da; // ŝovu unu dekstren...

        svg.append(g);
    } // ...for
}