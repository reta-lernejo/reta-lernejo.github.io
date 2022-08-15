---
layout: laborfolio
title: Metala ligado
js:
  - lewis-0b
  - jmol-0a
  - jsmol/JSmol.min  
js-ext:
  - mathjax3
---


<!-- 
https://en.wikipedia.org/wiki/Metallic_bonding

-->

<script>
    let svg;
    const ns = "http://www.w3.org/2000/svg";


    function katjono(x,y) {
        const use = document.createElementNS(ns,"use");
        use.setAttribute("href","#katjono");
        use.setAttribute("x",x);
        use.setAttribute("y",y);
        svg.append(use);
    }

    function elektrono(x,y) {
        const use = document.createElementNS(ns,"use");
        use.setAttribute("href","#elektrono");
        use.setAttribute("x",x);
        use.setAttribute("y",y);

        const am = 50; // mezuro de arbitreco
        const ani = document.createElementNS(ns,"animateMotion");
        ani.setAttribute("dur",(Math.floor(Math.random()*am/3))+"s");
        ani.setAttribute("repeatCount","10");
        let a=[];
        for (i=0;i<12;i++) {
            a[i] = (Math.random()-0.5) * am;
        }
        ani.setAttribute("path",`M0,0 C${a[0]},${a[1]} ${a[2]},${a[3]} ${a[4]},${a[5]} C${a[6]},${a[7]} ${a[8]},${a[9]} ${a[10]},${a[11]} z`);
        use.append(ani);

        svg.append(use);
    }


    window.onload = () => {
        svg = document.getElementById("metalo");
        // kvar vicoj de po 5 atomoj
        const atomoj = 80; 
        const avico = 16;
        const d = 15; // distanco inter katjonoj
        const de = 20; // maksimuma forlokiĝo de elektrono
        for (a=0;a<atomoj;a++) {
            const v = Math.trunc(a/avico);
            const k = a%avico;
            const x = d + k*d + d/2*(v%2);
            const y = d + v*d;
            katjono(x,y);

            const dx = (Math.random()-0.5)*de;
            const dy = (Math.random()-0.5)*de;
            elektrono(x+dx,y+dy);
        }
    }
</script>

<svg id="metalo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="520" height="180" viewBox="0 0 260 90">    
    <defs>
        <g id="katjono">
            <circle r="5" fill="none" stroke="black"/>
            <path d="M-2 0L2 0M0 -2L0 2" stroke="black">
        </g>
        <g id="elektrono">
            <circle r="1" fill="#2222aa"/>
        </g>
    </defs>    
</svg>