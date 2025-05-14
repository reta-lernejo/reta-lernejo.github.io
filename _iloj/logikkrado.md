---
layout: laborfolio
title: Logik-krado
js:
  - folio-0a
  - svg-0c
---

<!-- 
https://de.wikipedia.org/wiki/Logikgatter

-->

<script>


lanĉe(() => {
    krado = ĝi("#krado");
    const K = new Krado();
    K.relajso(0,20);
    K.kontakto('x',3,23);
    K.ponto(0,20,70,true);
    K.relajso(0,60);
    K.kontakto('y',3,63);
    K.ponto(0,60,90,false);
    K.vdrato(70,10,19);
    K.vdrato(70,46,50);
    K.poluso(70,5);
    K.vdrato(90,10,59);
    K.vdrato(90,86,10);
    K.poluso(90,5);
    K.hdrato(70,96,26);
    K.kontakto('e',98,96);

    SVG.aldonu(krado,K.g);
});


class Krado {
    constructor() {
        this.g = SVG.grupo();
    }

    relajso(x,y) {
        this.x = x;
        this.y = y;

        const r = SVG.uzo("#relajs");
        SVG.atributoj(r, {
            x: x,
            y: y
        });
        SVG.aldonu(this.g,r);
    }

    vdrato(x,y,l) {
        const p = SVG.pado(`M${x} ${y}l0 ${l}`);

        SVG.atributoj(p, {
            fill: "none",
            stroke: "black",
        });
        SVG.aldonu(this.g,p)
    }

    hdrato(x,y,l) {
        const p = SVG.pado(`M${x} ${y}l${l} 0`);

        SVG.atributoj(p, {
            fill: "none",
            stroke: "black",
        });
        SVG.aldonu(this.g,p)
    }

    kontakto(N,x,y) {
        const t = SVG.teksto(N,x+3,y+15);
        const c = SVG.cirklo(x,y,2);
        SVG.atributoj(c,{
            fill: "none",
            stroke:"black"
        });            
        SVG.aldonu(this.g,c,t);
    }

    poluso(x,y) {
        const c = SVG.cirklo(x,y,4);
        SVG.atributoj(c,{
            stroke: "black",
            fill: "none"
        });
        const p = SVG.pado(`M${x} ${y-3}L${x} ${y+3}M${x-3} ${y}L${x+3} ${y}`);
        SVG.atributoj(p, {
            fill: "none",
            stroke: "black",
        });
        SVG.aldonu(this.g,c,p);
    }

    ponto(x,y,w,fermita) {
       // strekita
        const p = SVG.pado(`M${x+50} ${y+17.5}L${x+w} ${y+17.5}`);
        SVG.atributoj(p, {
            fill: "none",
            stroke: "black",
            "stroke-dasharray": "5,2"
        });
        // klapo
        const p1 = SVG.pado(`M${x+w+2*(1-fermita)} ${y+10}L${x+w} ${y+25}`);
        SVG.atributoj(p1, {
            fill: "none",
            stroke: "black",
        });
        SVG.aldonu(this.g,p,p1);
    }
}    


</script>    


<svg id="metalo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="900" height="600" viewBox="0 0 300 200">    
    <defs>
        <g id="relajs">
            <rect x="30" y="10" width="20" height="15" fill="none"  stroke="black"/>
            <path d="M5 3L40 3L40 10M40 25L40 35M36 35L44 35" fill="none"  stroke="black"/>
        </g>
    </defs>
    <g id="krado">
    </g>
</svg>
