---
layout: laborfolio
title: Metala ligado
chapter: 2.3
js:
  - folio-0a
  - svg-0c
---


<!-- 
https://en.wikipedia.org/wiki/Metallic_bonding

-->

<script>
    let svg;

    function movo(am) { // am: mezuro de arbitreco    
        const dur = Math.floor(Math.random()*am/3);
        let a=[]; for (i=0;i<12;i++) { a[i] = (Math.random()-0.5) * am; }
        const ani = SVG.movo('',
            `M0,0 C${a[0]},${a[1]} ${a[2]},${a[3]} ${a[4]},${a[5]} C${a[6]},${a[7]} ${a[8]},${a[9]} ${a[10]},${a[11]} z`,
            50/dur, dur)
        return ani;
    }

    function katjono(x,y) {
        const k = SVG.uzo("#katjono");
        SVG.atributoj(k, {
            x: x,
            y: y
        });
        //SVG.aldonu(k,movo(3.5));
        SVG.aldonu(svg,k);
    }

    function elektrono(x,y) {
        const e = SVG.uzo("#elektrono");
        SVG.atributoj(e, {
            x: x,
            y: y
        });
        SVG.aldonu(e,movo(50));
        SVG.aldonu(svg,e);
    }


    lanĉe( () => {
        svg = ĝi("#metalo");
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
    });
</script>

<svg id="metalo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="520" height="167" viewBox="5 5 250 80">    
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