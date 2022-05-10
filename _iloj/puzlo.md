---
layout: laborfolio
title: Puzlokreilo
js: svg-0b
---

<!-- 

- travidebligi la fonon per masko: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask 
- montri fonon kiel bildo/ornamo: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern
                                https://vanseodesign.com/web-design/svg-pattern-attributes/
-->

<script type="text/javascript">
    // adaptita el https://gist.github.com/Draradech/35d36347312ca6d0887aa7d55f366e30

    function save(filename, data)
    {
        var blob = new Blob([data], {type: "text/csv"});
        if (window.navigator.msSaveOrOpenBlob)
        {
            window.navigator.msSaveBlob(blob, filename);
        }
        else
        {
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
    }

    var seed = 1;

    // pseŭdoarbitra nombro inter 0 kaj 1 uzante la sinus-funkcion
    function random() { var x = Math.sin(seed) * 10000; seed += 1; return x - Math.floor(x); }

    // arbitra nombro inter min kaj max
    function uniform(min, max) { var r = random(); return min + r * (max - min); }

    // arbitra bulea valora
    function rbool() { return random() > 0.5; }
    
    // konciza aliro de elemento per @id
    function $(id) { return document.getElementById(id); }

    // aktualigo de la kontrolelementoj
    function updateseed()     { $("_seed").value =    $("seed").value;          update(); }
    function updatetabsize()  { $("_tabsize").value = $("tabsize").value + "%"; update(); }
    function updatejitter()   { $("_jitter").value =  $("jitter").value + "%";  update(); }
    function update_seed() { 
        var val = parseFloat($("_seed").value);    
        if (!isNaN(val)) { 
            $("seed").value = val;
        }    
        updateseed(); 
    }
    function update_tabsize() { 
        var val = parseFloat($("_tabsize").value); 
        if (!isNaN(val)) { 
            $("tabsize").value = val; 
        } 
        updatetabsize(); 
    }
    function update_jitter()  { 
        var val = parseFloat($("_jitter").value);  
        if (!isNaN(val)) { 
            $("jitter").value = val; 
        }  
        updatejitter(); 
    }
    
    // generilo-parametroj / -funkcioj $

    // variabloj estas difinitaj antaŭe en generate(9 resp. parse_input()
    /*
      t = langetograndeco (tabsize)
      j = varieco (jitter)
      xn = # pecoj horizontale
      yn = # pecoj vertikale
    */
    var a, b, c, d, e, t, j, flip, xi, yi, xn, yn, vertical, offset, width, height, radius;
    var ph, pv;

    function first() { 
        e = uniform(-j, j); 
        next();
    }
    function next()  { 
        var flipold = flip; 
        flip = rbool(); 
        a = (flip == flipold ? -e: e); 
        b = uniform(-j, j); 
        c = uniform(-j, j); 
        d = uniform(-j, j); 
        e = uniform(-j, j);
    }

    // la anguloj de la pecoj formas regulan rastron (s=size, o=offset)
    function sl()  { return vertical ? height / yn : width / xn; }
    function sw()  { return vertical ? width / xn : height / yn; }
    function ol()  { return offset + sl() * (vertical ? yi : xi); }
    function ow()  { return offset + sw() * (vertical ? xi : yi); }

    function l(v)  { 
        var ret = ol() + sl() * v; 
        return Math.round(ret * 100) / 100; 
    }
    function w(v)  { 
        var ret = ow() + sw() * v * (flip ? -1.0 : 1.0); 
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
    
    function parse_input()
    {
        seed = parseInt($("seed").value);
        t = parseFloat($("tabsize").value) / 200.0;
        j = parseFloat($("jitter").value) / 100.0;
        xn = parseInt($("xn").value);
        yn = parseInt($("yn").value);
    }
    
    // preparu la horizontalajn kurbojn
    function gen_dh()
    {
        vertical = 0;
        ph = [];

        function add(x,y,s) {
            if (!ph[x]) ph[x] = [];
            ph[x][y] = s;
        } 
        
        for (yi = 1; yi < yn; ++yi) {
            xi = 0;
            first();

            // komenca punkto ĉe (p0l,pow)
            let P0 = [p0l(),p0w()];
            for (; xi < xn; ++xi)
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
                add(xi,yi,Pj);
                P0 = Pj[9];
                next();
            }
        }
    }
        
    // preparu la vertikalajn kurbojn
    function gen_dv()
    {
        vertical = 1;

        pv = [];
        function add(x,y,s) {
            if (!pv[x]) pv[x] = [];
            pv[x][y] = s;
        } 
        
        for (xi = 1; xi < xn; ++xi)
            {
            yi = 0;
            first();

            // komenca punkto ĉe (p0w,pol)
            let P0 = [p0w(),p0l()];

            for (; yi < yn; ++yi)
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
                add(xi,yi,Pj);
                P0 = Pj[9];
                next();
            }
        }
    }
        
    // pentru la kadron - anst. per puzlero()
    function gen_db()
    {
        var str = "";
        
        str += "M " + (offset + radius) + " " + (offset) + " ";
        str += "L " + (offset + width - radius) + " " + (offset) + " ";
        str += "A " + (radius) + " " + (radius) + " 0 0 1 " + (offset + width) + " " + (offset + radius) + " ";
        str += "L " + (offset + width) + " " + (offset + height - radius) + " ";
        str += "A " + (radius) + " " + (radius) + " 0 0 1 " + (offset + width - radius) + " " + (offset + height) + " ";
        str += "L " + (offset + radius) + " " + (offset + height) + " ";
        str += "A " + (radius) + " " + (radius) + " 0 0 1 " + (offset) + " " + (offset + height - radius) + " ";
        str += "L " + (offset) + " " + (offset + radius) + " ";
        str += "A " + (radius) + " " + (radius) + " 0 0 1 " + (offset + radius) + " " + (offset) + " ";
        return str;
    }

    function puzlero(xi,yi) {
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
            return ("a " + (radius) + " " + (radius) + " 0 0 1 " + (sx*radius) + " " + (sy*radius));
        }


        let pd = "";
        // supra eĝo
        if (yi==0) {
            const x1 = xi==0? offset : pv[xi][0][0][0]; // x-koordinato sur supra linio
            const x2 = xi==xn-1? offset+width-radius : pv[xi+1][0][0][0]; 
            // supra maldekstra angulo?
            if (xi == 0) {
                pd += "M" + pt([x1,offset+radius]) + " "
                   + arko(1,-1) + " "
                   + "L" + pt([x2,offset]) + " ";
            // supra dekstra angulo
            } else if (xi == xn-1) {
                pd += "M" + pt([x1,offset]) + " "
                   + "L" + pt([x2,offset]) + " "
                   + arko(1,1)  + " ";
            } else {
                pd += "M" + pt([x1,offset]) + " "
                   + "L" + pt([x2,offset]) + " ";
            }
        } else {
            pd += "M" + pt(ph[xi][yi][0]) + " ";
            pd += bezier(ph[xi][yi]) + " ";
        }

        // dekstra eĝo
        if (xi==xn-1) {
            const y = yi==yn-1? offset+height-radius : ph[xi][yi+1][9][1];
            pd += "L" + pt([offset+width,y]) + " ";
        } else {
            pd += bezier(pv[xi+1][yi]) + " "
        }

        // malsupra eĝo
        if (yi == yn-1) {
            const x = xi==0? offset : pv[xi][yi][0][0]; // x-koordinato sur malsupra linio

            // dekstra malsupra angulo
            if (xi == xn-1) {
                pd += arko(-1,1) + " "
                   + "L" + pt([x,offset+height]) + " ";
            } else if (xi == 0) {
                pd += "L" + pt([x+radius,offset+height]) + " "
                   + arko(-1,-1) + " ";
            } else {
                pd += "L" + pt([x,offset+height]) + " ";
            }
        } else {
            pd += ibezier(ph[xi][yi+1]) + " ";
        }

        // maldekstra eĝo
        if (xi == 0) {
            const y = yi==0? offset+radius : ph[0][yi][0][1];
            pd += "L" + pt([offset,y]) + " ";
        } else  {
            pd += ibezier(pv[xi][yi])
        }

        // fermu
        pd+="Z";

        const pado = SVG.pado(pd);
        SVG.atributoj(pado,{ id:"p-"+xi+"-"+yi, fill: "url(#bildo)" });
        return pado;
    }
    
    function update()
    {
        width = parseInt($("width").value);
        height = parseInt($("height").value);
        radius = parseFloat($("radius").value);
        var ratio = 1.0 * width / height;
        if (ratio > 1.5)
        {
            radius = radius * 900 / width;
            width = 900;
            height = width / ratio;
        } else {
            radius = radius * 600 / height;
            height = 600;
            width = height * ratio;
        }
        offset = 5.5;

        const svg = SVG.elemento("#puzzlecontainer");
        SVG.atributoj(svg,{
            width: width + 2*offset,
            height: height + 2*offset});
        
        const defs = SVG.defs();
        const pattern = SVG.pattern("bildo",0,0,width+2*offset,height+2*offset);
        SVG.atributoj(pattern,{patternUnits: "userSpaceOnUse"});
        const img = SVG.image($("bgimg").value,offset,offset,width,height);
        SVG.atributoj(img,{preserveAspectRatio: "none"});

        pattern.append(img);
        defs.append(pattern);
        SVG.forigu(svg,"defs"); // forigu malnovan antaŭ (re)aldoni
        svg.prepend(defs);

        parse_input();
        gen_dh();
        gen_dv();      
        
        /*
        $("puzzlepath_h").setAttribute("d", gen_dh());
        $("puzzlepath_v").setAttribute("d", gen_dv());
        $("puzzlepath_b").setAttribute("d", gen_db());
        */

        SVG.malplenigu("puzleroj");
        for (xi=0; xi<xn; xi++) {
            for (yi=0; yi<yn; yi++) {
                const p = puzlero(xi,yi);
                if (xi==0 && yi==0) SVG.atributoj(p,{ transform: "rotate(-2) translate(-3,2)" });
                SVG.aldonu("puzleroj",p)
            }
        }
    }
    
    function generate()
    {
        width = parseInt($("width").value);
        height = parseInt($("height").value);
        radius = parseFloat($("radius").value);
        offset = 0.0;
        parse_input();
        
        var data = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.0\" ";
        data += "width=\"" + width + "mm\" height=\"" + height + "mm\" viewBox=\"0 0 " + width + " " + height + "\">";

        data += "<style type=\"text/css\"><![CDATA["
             +  "path { stroke: black; stroke-width: 0.5; fill: none; }"
             +  "]]></style>";

        data += "<g id=\"puzleroj\">"
 

        /*
        data += "<path fill=\"none\" stroke=\"DarkBlue\" stroke-width=\"0.1\" d=\"";
        data += gen_dh();
        data += "\"></path>";
        data += "<path fill=\"none\" stroke=\"DarkRed\" stroke-width=\"0.1\" d=\"";
        data += gen_dv();
        data += "\"></path>";
        data += "<path fill=\"none\" stroke=\"Black\" stroke-width=\"0.1\" d=\"";
        data += gen_db();
        data += "\"></path>";
        */

        gen_dh();
        gen_dv();

        for (xi=0; xi<xn; xi++) {
            for (yi=0; yi<yn; yi++) {
                const p = puzlero(xi,yi);
                data += p.outerHTML;
            }
        }

        data += " </g></svg>";
        
        save("puzlo_"+xn+"x"+yn+".svg", data);
    }

    // helpfunkcioj
    function metu(kampo,valoro) {
        document.getElementById(kampo).textContent = valoro;
    }

    function valoro(kampo) {
        return parseInt(document.getElementById(kampo).value,10);
    }

    // preparu semon
    $('seed').value = Math.random() * 10000; 
    updateseed();

</script>

   <table>
      <tr>
         <td>Semo:</td>
         <td><input id="_seed" type="text" value="0" onchange="update_seed()"/></td>
         <td><input id="seed" type="range" value="0" min="0" max="9999" step="1" onchange="updateseed()"/></td>
      </tr>
      <tr>
         <td>Langograndeco:</td>
         <td><input id="_tabsize" type="text" value="20%" onchange="update_tabsize()"/></td>
         <td><input id="tabsize" type="range" value="20" min="10" max="30" step="0.1" onchange="updatetabsize()"/></td>
      </tr>
      <tr>
         <td>Varieco:</td>
         <td><input id="_jitter" type="text" value="4%" onchange="update_jitter()"/></td>
         <td><input id="jitter" type="range" value="4" min="0" max="13" step="0.1" onchange="updatejitter()"/></td>
      </tr>
      <tr>
         <td>Angulradiuso:</td>
         <td><input id="radius" type="text" value="2.0" size="4" onchange="update()"/> mm</td>
         <td></td>
      </tr>
      <tr>
         <td>Pecoj:</td>
         <td><input id="xn" type="text" value="15" size="4" onchange="update()"/> x <input id="yn" type="text" value="10"  size="4" onchange="update()"/></td>
         <td></td>
      </tr>
      <tr>
         <td>Formato:</td>
         <td><input id="width" type="text" value="300" size="4" onchange="update()"/> x <input id="height" type="text" value="200"  size="4" onchange="update()"/> mm</td>
         <td><button onclick="generate()">Elŝuto de SVG</button></td>
      </tr>
      <tr>
        <td>Fonbildo:</td>
        <td><input id="bgimg" type="text" value="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Nitrogen_Cycle-eo.svg/1024px-Nitrogen_Cycle-eo.svg.png"/></td>
      </tr>
   </table>

   <svg id="puzzlecontainer">

 version="1.1" 
    id="puzzlecontainer"
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    class="kartezia"
    width="600" height="400" 
    viewBox="0 0 1.0 1.0">        
     
    <style type="text/css">
    <![CDATA[

        path {
            stroke: black;
            stroke-width: 0.5;
            /*fill: none; */
        }

    ]]>
  </style> 
  <!--
  <defs>
    <pattern id="bildo" x="0" y="0" width="911" height="611" patternUnits="userSpaceOnUse" >
        <image x="5.5" y="5.5" width="900" height="600" xlink:href="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Nitrogen_Cycle-eo.svg/1024px-Nitrogen_Cycle-eo.svg.png" preserveAspectRatio="none"/>
    </pattern>
  </defs>
  -->

  <!-- rect x="0" y="0" width="911.0" height="611.0" fill="url(#bildo)"/ -->

  <!--image x="5.5" y="5.5" width="900" height="600" xlink:href="https://commons.wikimedia.org/wiki/File:Cicle_del_nitrogen_de.svg" preserveAspectRatio="none"/-->

  <!--image x="5.5" y="5.5" width="900" height="600" xlink:href="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Cicle_del_nitrogen_de.svg/1024px-Cicle_del_nitrogen_de.svg.png" preserveAspectRatio="none"/-->
  <g id="puzleroj">
  </g>
   </svg>
