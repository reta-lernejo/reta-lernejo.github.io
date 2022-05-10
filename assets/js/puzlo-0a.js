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

        // helpaj variabloj
        var a, b, c, d, e, t, j, flip, vertical, xi, yi;
        
        let self=this;

        t = tabsize / 200.0;
        j = jitter / 100.0;

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

    /*
    generate() {
        gen_dh();
        gen_dv();
    }
    */


        /*
    generate()
    {
        
        var data = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.0\" ";
        data += "width=\"" + width + "mm\" height=\"" + height + "mm\" viewBox=\"0 0 " + width + " " + height + "\">";

        data += "<style type=\"text/css\"><![CDATA["
             +  "path { stroke: black; stroke-width: 0.5; fill: none; }"
             +  "]]></style>";

        data += "<g id=\"puzleroj\">"
 
        
        data += "<path fill=\"none\" stroke=\"DarkBlue\" stroke-width=\"0.1\" d=\"";
        data += gen_dh();
        data += "\"></path>";
        data += "<path fill=\"none\" stroke=\"DarkRed\" stroke-width=\"0.1\" d=\"";
        data += gen_dv();
        data += "\"></path>";
        data += "<path fill=\"none\" stroke=\"Black\" stroke-width=\"0.1\" d=\"";
        data += gen_db();
        data += "\"></path>";
        

        // gen_dh();
        // gen_dv();

        for (xi=0; xi<xn; xi++) {
            for (yi=0; yi<yn; yi++) {
                const p = puzlero(xi,yi);
                data += p.outerHTML;
            }
        }

        data += " </g></svg>";

        return data;
    }
    */
}