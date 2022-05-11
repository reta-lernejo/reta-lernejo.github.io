class Puzlo {

    constructor(seed, xn, yn, 
        height, width, offset, radius) {
        this.seed = seed;
        this.xn = xn;
        this.yn = yn;
        this.height = height;
        this.width = width;
        this.offset = offset;
        this.radius = radius;

        this.pv = [];
        this.ph = [];

        //this.gen_dh_dw();
    }



       
    // generilo-parametroj / -funkcioj $

    // variabloj estas difinitaj antaŭe en generate(9 resp. parse_input()
    /*
      t = langetograndeco (tabsize)
      j = varieco (jitter)
      xn = # pecoj horizontale
      yn = # pecoj vertikale
    */   
   
    gen_dh_dw(tabsize,jitter)
    {    
        let self=this;

        const t = tabsize / 200.0;
        const j = jitter / 100.0;

        // helpaj variabloj
        var a, b, c, d, e, flip, vertical, xi, yi;

     /**** helpaj funkcioj por kalkuladoj */

        // pseŭdoarbitra nombro inter 0 kaj 1 uzante la sinus-funkcion
        function random() { 
            const x = Math.sin(self.seed) * 10000; 
            self.seed += 1; 
            return x - Math.floor(x); 
        }

        // arbitra nombro inter min kaj max
        function uniform(min, max) { 
            const r = random(); 
            return min + r * (max - min); 
        }

        function first() { 
            e = uniform(-j, j); 
            next();
        }

        function next()  { 
            const flipold = flip; 
            flip = (random() > 0.5); // arbitra buleo
            a = (flip == flipold ? -e: e); 
            b = uniform(-j, j); 
            c = uniform(-j, j); 
            d = uniform(-j, j); 
            e = uniform(-j, j);
        }
    
        // la anguloj de la pecoj formas regulan rastron (s=size, o=offset)
        function sl()  { return vertical ? self.height / self.yn : self.width / self.xn; }
        function sw()  { return vertical ? self.width / self.xn : self.height / self.yn; }
        function ol()  { return self.offset + sl() * (vertical ? yi : xi); }
        function ow()  { return self.offset + sw() * (vertical ? xi : yi); }
    
        function l(v)  { 
            const ret = ol() + sl() * v; 
            return Math.round(ret * 100) / 100; 
        }
        function w(v)  { 
            const ret = ow() + sw() * v * (flip ? -1.0 : 1.0); 
            return Math.round(ret * 100) / 100; 
        }
    
        // l,w estas la du koordinatoj
        // unu egon de peco ni desegnas per 3 bezierkurboj;
        // inter punktoj 0 kaj 3 uzante kontrolpunktojn 1 kaj 2
        // poste inter punktoj 3 kaj 6 uzante kontrolpunktojn 4 kaj 5 
        // poste inter punktoj 6 kaj 9 uzante kontrolpunktojn 7 kaj 8
        // la meza kurbo estas la langeto
        function p0l() { return l(0.0); }
        function p0w() { return w(0.0); }
        function p1l() { return l(0.2); }
        function p1w() { return w(a); }
        function p2l() { return l(0.5 + b + d); }
        function p2w() { return w(-t + c); }
        function p3l() { return l(0.5 - t + b); }
        function p3w() { return w(t + c); }
        function p4l() { return l(0.5 - 2.0 * t + b - d); }
        function p4w() { return w(3.0 * t + c); }
        function p5l() { return l(0.5 + 2.0 * t + b - d); }
        function p5w() { return w(3.0 * t + c); }
        function p6l() { return l(0.5 + t + b); }
        function p6w() { return w(t + c); }
        function p7l() { return l(0.5 + b + d); }
        function p7w() { return w(-t + c); }
        function p8l() { return l(0.8); }
        function p8w() { return w(e); }
        function p9l() { return l(1.0); }
        function p9w() { return w(0.0); }        

        /**** preparu la horizontalajn kurbojn  */
        vertical = 0;
        this.ph = [];

        function h_add(x,y,s) {
            if (!self.ph[x]) self.ph[x] = [];
            self.ph[x][y] = s;
        } 
        
        for (yi = 1; yi < this.yn; ++yi) {
            xi = 0;
            first();

            // komenca punkto ĉe (p0l,pow)
            let P0 = [p0l(),p0w()];
            for (; xi < this.xn; ++xi)
            {
                // ni ĉiam kalkulas 4 punktojn por bezier-kurbo:
                // komenca, kontrol1, kontrol2, fina punktoj
                // tri tiaj kurboj priskribas la falnkon de puzlero
                // la dua (meza) estas la langeto 
                // la fina punkto samtempe estas la komencpunkto de la
                // sekva, do ni bezonas sume nur 10 punktojn
                const Pj = [
                   P0, 
                   [p1l(),p1w()], [p2l(),p2w()], [p3l(),p3w()],
                   [p4l(),p4w()], [p5l(),p5w()], [p6l(),p6w()],
                   [p7l(),p7w()], [p8l(),p8w()], [p9l(),p9w()]
                ];
                h_add(xi,yi,Pj);
                P0 = Pj[9];
                next();
            }
        }
    
        
       /****  preparu la vertikalajn kurbojn */
        vertical = 1;

        this.pv = [];
        function v_add(x,y,s) {
            if (!self.pv[x]) self.pv[x] = [];
            self.pv[x][y] = s;
        } 
        
        for (xi = 1; xi < this.xn; ++xi)
        {
            yi = 0;
            first();

            // komenca punkto ĉe (p0w,pol)
            let P0 = [p0w(),p0l()];

            for (; yi < this.yn; ++yi)
            {
                // ni ĉiam kalkulas 4 punktojn por bezier-kurbo:
                // komenca, kontrol1, kontrol2, fina punktoj
                // tri tiaj kurboj priskribas la falnkon de puzlero
                // la dua (meza) estas la langeto 
                // la fina punkto samtempe estas la komencpunkto de la
                // sekva, do ni bezonas sume nur 10 punktojn
                const Pj = [
                    P0, 
                    [p1w(),p1l()],[p2w(),p2l()],[p3w(),p3l()],
                    [p4w(),p4l()],[p5w(),p5l()],[p6w(),p6l()],
                    [p7w(),p7l()],[p8w(),p8l()],[p9w(),p9l()]
                ];
                v_add(xi,yi,Pj);
                P0 = Pj[9];
                next();
            }
        }
    }


    puzlero(xj,yj) {
        let self = this;

        function pt(p) {
            return p[0] + " " + p[1];
        }
        function bezier(p9) { // "M" + pt(p9[0]) + " "
            return (
                 "C" + pt(p9[1]) + " " + pt(p9[2]) + " " + pt(p9[3]) + " "
                + "C" + pt(p9[4]) + " " + pt(p9[5]) + " " + pt(p9[6]) + " "
                + "C" + pt(p9[7]) + " " + pt(p9[8]) + " " + pt(p9[9]));
        }
        function ibezier(p9) { // "M" + pt(p9[0]) + " "
            return (
                 "C" + pt(p9[8]) + " " + pt(p9[7]) + " " + pt(p9[6]) + " "
                + "C" + pt(p9[5]) + " " + pt(p9[4]) + " " + pt(p9[3]) + " "
                + "C" + pt(p9[2]) + " " + pt(p9[1]) + " " + pt(p9[0]));
        }
        function arko(sx,sy) {
            return ("a "
                + (self.radius) + " " + (self.radius) 
                + " 0 0 1 " 
                + (sx*self.radius) + " " + (sy*self.radius));
        }


        let pd = "";
        // supra eĝo
        if (yj==0) {
            const x1 = xj==0? this.offset : this.pv[xj][0][0][0]; // x-koordinato sur supra linio
            const x2 = xj==this.xn-1? this.offset+this.width-this.radius : this.pv[xj+1][0][0][0]; 
            // supra maldekstra angulo?
            if (xj == 0) {
                pd += "M" + pt([x1,this.offset+this.radius]) + " "
                   + arko(1,-1) + " "
                   + "L" + pt([x2,this.offset]) + " ";
            // supra dekstra angulo
            } else if (xj == this.xn-1) {
                pd += "M" + pt([x1,this.offset]) + " "
                   + "L" + pt([x2,this.offset]) + " "
                   + arko(1,1)  + " ";
            } else {
                pd += "M" + pt([x1,this.offset]) + " "
                   + "L" + pt([x2,this.offset]) + " ";
            }
        } else {
            pd += "M" + pt(this.ph[xj][yj][0]) + " ";
            pd += bezier(this.ph[xj][yj]) + " ";
        }

        // dekstra eĝo
        if (xj==this.xn-1) {
            const y = yj==this.yn-1? this.offset+this.height-this.radius : this.ph[xj][yj+1][9][1];
            pd += "L" + pt([this.offset+this.width,y]) + " ";
        } else {
            pd += bezier(this.pv[xj+1][yj]) + " "
        }

        // malsupra eĝo
        if (yj == this.yn-1) {
            const x = xj==0? this.offset : this.pv[xj][yj][0][0]; // x-koordinato sur malsupra linio

            // dekstra malsupra angulo
            if (xj == this.xn-1) {
                pd += arko(-1,1) + " "
                   + "L" + pt([x,this.offset+this.height]) + " ";
            } else if (xj == 0) {
                pd += "L" + pt([x+this.radius,this.offset+this.height]) + " "
                   + arko(-1,-1) + " ";
            } else {
                pd += "L" + pt([x,this.offset+this.height]) + " ";
            }
        } else {
            pd += ibezier(this.ph[xj][yj+1]) + " ";
        }

        // maldekstra eĝo
        if (xj == 0) {
            const y = yj==0? this.offset+this.radius : this.ph[0][yj][0][1];
            pd += "L" + pt([this.offset,y]) + " ";
        } else  {
            pd += ibezier(this.pv[xj][yj])
        }

        // fermu
        pd+="Z";

        return pd;
    }
}

class SVGPuzlo {

    constructor(svgElement,bgimg,seed,tabsize,jitter,
        xn,yn,width,height,offset,radius)
    {
        const ns = "http://www.w3.org/2000/svg";
        const xlink = "http://www.w3.org/1999/xlink";
    
        function attr(objekto,atributoj) {
            let obj = objekto;
            if (typeof objekto === 'string') {
                obj = document.getElementById(objekto);
            }
            for (const [atr,val] of Object.entries(atributoj)) {
                obj.setAttribute(atr,val);
            }
        }
        
        function puzlero_pos(puzlero) {
            const p = puzlero.id.split("-");
            return { x: +p[1], y: +p[2] };
        }
    
        // movu puzleron sur la demetejon
        function demetu(puzlero) {
            // demetejo etendiĝas dekstre kaj malsupre je duonlarĝeco de la fono
            const exc = 0.7; // evitu transŝovon sub la randon per tro grandaj
                             // dissovoj!
            const pos = puzlero_pos(puzlero);
    
            // la ordinata meza pozicio de la puzlero
            const xm = (pos.x+0.5)*width/xn;
            const ym = (pos.y+0.5)*height/yn;
    
            // la proksimuma grandeco de puzlero
            const xp = (1+tabsize/100) * width/xn;
            const yp = (1+tabsize/100) * height/yn;
    
            // arbitra rotacia angulo kaj loko kien meti la puzleron en la demetejo
            const dekstre = (Math.random() > 0.5); // arbitra buleo
            const xd = dekstre
                ? offset + width + xp/2 + Math.random() * (0.5*width - xp)
                : xp/2 + Math.random() * (1.5*width-xp); 
            const yd = dekstre
                ? yp/2 + Math.random() * (1.5*height - yp)
                : offset + height + yp/2 + Math.random() * (0.5*height - yp); 
            const rot = Math.random()*360;
    
            // movu la puzleron relative al ĝia ordinara mezpunkto
            //const tx = width/2 - xm + (Math.random()-0.5)*width*exc;
            //const ty = height + height/2 - ym + (Math.random()-0.5)*height*exc;
            attr(puzlero,{ transform: `translate(${xd - xm} ${yd - ym}) rotate(${rot} ${xm} ${ym})` });
        }
    
        function surmetu(puzlero,xi,yi) {
            const pos = puzlero_pos(puzlero)
    
            const tx = (xi-pos.x) * width/xn;
            const ty = (yi-pos.y) * height/yn;
    
            attr(puzlero,{ transform: `translate(${tx} ${ty})` });
        }
    
        function kreu_puzleron(puzlo,xi,yi) {
            const pado = SVG.pado(
                    puzlo.puzlero(xi,yi)
                );
                attr(pado,{ 
                id: `p-${xi}-${yi}`, 
                class: "puzlero",
                fill: "url(#bildo)" });
    
            // disĵetu la puzlerojn
            demetu(pado);
            return pado;
        }


        let svg = svgElement;
        if (typeof svg === 'string') {
            svg = document.getElementById(svgElement);
        }

        // enŝovu grupon por la tabulo, eventuale forigu antaŭan
        const malnova = document.getElementById("puzleroj");
        if (malnova) malnova.remove();        
        const puzleroj = document.createElementNS(ns,"g");
        puzleroj.id="puzleroj";
        svg.append(puzleroj);

        // difinu la grandecon de la tabulo, dekstre kaj malsupre
        // ni rezervas spacon kiel demetejo!
        svg.setAttribute("width",1.5*width);
        svg.setAttribute("height",1.5*height);
        
        // difinu fonbildon
        const pattern = document.createElementNS(ns,"pattern");
        attr(pattern,{
                id: "bildo",
                x: 0, y: 0,
                width: width+2*offset,
                height: height+2*offset,
                patternUnits: "userSpaceOnUse"
        });
        const image = document.createElementNS(ns,"image");
        image.setAttributeNS(xlink,"href",bgimg);
        attr(image, {
            x: offset, y: offset,
            width: width,
            height: height,
            preserveAspectRatio: "none"
        });
        pattern.append(image);

        // enmetu ĉiujn difinojn
        const defs = document.createElementNS(ns,"defs");
        defs.append(pattern);
        // evtl. forigu malnovan antaŭ (re)aldoni
        for (const d of svg.querySelectorAll("defs")) {
            d.remove();
        }
        svg.prepend(defs);

        // kreu la eĝojn de la puzleroj
        const puzlo = new Puzlo(seed, xn, yn, height, width, offset, radius);
        
        const tablo = document.createElementNS(ns,"rect");
        attr(tablo, {
            id: "tablo",
            x: 0, y: 0,
            width: 1.5*width,
            height: 1.5*height,
            rx: radius,
            ry: radius
        });
            
        const fono = document.createElementNS(ns,"rect");
        attr(fono,{
            id: "fono",
            x: offset,
            y: offset,
            width: width,
            height: height, 
            rx: radius, 
            ry: radius
        });

        puzleroj.append(tablo,fono);
        
        puzlo.gen_dh_dw(tabsize, jitter);
        for (let xi=0; xi<xn; xi++) {
            for (let yi=0; yi<yn; yi++) {
                const pz = kreu_puzleron(puzlo,xi,yi);
                puzleroj.append(pz);
            }
        }

        puzleroj.addEventListener("click",
            function(event) {
                event.preventDefault();
                const trg = event.target; // elemento ene de g#puzleroj
                const g = event.currentTarget; // g#puzleroj
                if (trg.localName == "path") {
                    if (trg.classList.contains("elektita")) {
                        // malelektu
                        trg.classList.remove("elektita");
                    } else {
                        // elektu tuŝitan, malelektu aliajn
                        for (let p of g.querySelectorAll("path")) {
                            p.classList.remove("elektita")
                        };
                        trg.classList.add("elektita");
                    }
                // fono tuŝita, metu elektitan puzleron al koncerna pozicio    
                } else if (trg.id == "fono") {
                    const puzlero = g.querySelector(".elektita");
                    if (puzlero) {
                        const xi = Math.floor(event.offsetX / width * xn);
                        const yi = Math.floor(event.offsetY / height * yn);
                        surmetu(puzlero,xi,yi);
                    }
                // nek fono nek puzlero tuŝita, se iu puzlero
                // estas elektita demetu ĝin (malsupre de la fono)
                } else {
                    const puzlero = g.querySelector(".elektita");
                    if (puzlero && (event.offsetY > height || event.offsetX > width)) {
                        demetu(puzlero)
                    }
                }
            });

        puzleroj.addEventListener("dblclick",
            function(event) {
                event.preventDefault();
                const trg = event.target; // elemento ene de g#puzleroj
                if (trg.localName == "path") {
                    demetu(trg);
                }                    
            });
    }
    
    svg_export()
    {
        const svg = SVG.elemento("puzzlecontainer");

        /*
        width = parseInt($("width").value);
        height = parseInt($("height").value);
        radius = parseFloat($("radius").value);
        offset = 0.0;
        parse_input();
        
        const puzlo = new Puzlo(seed, tabsize, jitter, xn, yn, height, width, offset, radius);

        const data = puzlo.generate();       
        */
        save("puzlo_"+xn+"x"+yn+".svg", svg.outerHTML);
    }

}