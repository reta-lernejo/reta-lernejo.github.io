---
layout: laborfolio
title: Metala ligado
chapter: "2.3"
next_ch: l_elektronegativeco
js:
  - folio-0a
  - svg-0c
---


<!-- 
https://en.wikipedia.org/wiki/Metallic_bonding

-->

Metaloj havas mankon de elektronoj en siaj eksteraj altenergiaj 
[orbitaloj](elektrondistribuo). Tiel iliaj atomoj povas 
formi inter si densan kradon, kie orbitaloj de najbaraj atomoj 
parte okupas la saman spacon.

La valentaj elektronoj povas relative facile ŝanĝi inter tiuj interkovrantaj orbitaloj formante
per siaj negativaj ŝargoj kvazaŭ fluan gluaĵon inter la pozitive ŝargitaj katjonoj.

<script>
    let krado;
    // kvin vicoj de po 16 atomoj
    const atomoj = 80; 


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
        SVG.enŝovu(krado,k);
    }

    function elektrono(n,x,y) {
        const e = SVG.uzo("#elektrono");
        SVG.atributoj(e, {
            id: `e_${n}`,
            x: Math.round(x*100)/100,
            y: Math.round(y*100)/100
        });
        //SVG.aldonu(e,movo(50));
        SVG.aldonu(krado,e);
    }

    // kalkulas pozicion de atomoj (katjonoj)
    // kaj elektronoj en la metala krado
    // la pozicio de elektronoj estas iom hazarda
    // en la ŝelo per distanco r kaj angulo phi.
    function pos(n,nvico=16) {
        const dx = 14.5, dy = 11.5; // distanco inter katjonoj

        const v = Math.trunc(n/nvico); // vico
        const k = n%nvico; // kolumno

        function a() {
            return {
                x: dx + k*dx + dx/2*(v%2),
                y: dy + v*dy
            };
        }
        function e() {
            const phi = Math.random()*2*Math.PI;
            const r = 5 + Math.random()*(8-5);
            const pa = a();
            return {
                x: pa.x + r*Math.cos(phi),
                y: pa.y + r*Math.sin(phi)
            }
        }

        return {a: a, e: e}
    }

    let mmax = 420;
    function e_movo() {
        for (let a=0;a<atomoj;a++) {
            const pe = pos(a).e();
            const e = ĝi(`#e_${a}`);
            SVG.atributoj(e, {
                x: pe.x,
                y: pe.y
            })
        };
        if (mmax-- > 0) setTimeout(e_movo,100);
    }


    lanĉe( () => {
        krado = ĝi("#krado");
        //const de = 20; // maksimuma forlokiĝo de elektrono

        for (let a=0;a<atomoj;a++) {
            const p = pos(a);
            const pa = p.a();
            const pe = p.e();
            katjono(pa.x,pa.y);
            //const ex = (Math.random()-0.5)*de;
            //const ey = (Math.random()-0.5)*de;
            //elektrono(pe.x+ex,pe.y+ey);
            elektrono(a,pe.x,pe.y);
        }

        setTimeout(e_movo,100);
    });
</script>

<svg id="metalo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="520" height="140" viewBox="5 2 252 68">    
    <defs>
        <g id="katjono">
            <circle r="8" fill="#cce0ee" stroke="none"/>
            <circle r="5" fill="none" stroke="black"/>
            <path d="M-2 0L2 0M0 -2L0 2" stroke="black"/>
        </g>
        <g id="elektrono">
            <circle r="1" fill="#2222aa"/>
        </g>
    </defs>
    <g id="krado"/> 
</svg>

Do metala ligado estas unuflanke karakterizita per translokiĝo de elektronoj 
kiel ĉe [jona ligado](jona_ligo) kaj aliflanke elektronoj estas komunigitaj 
kiel ĉe [kovalenta ligado](kovalenta_ligo). Sekve metala krado estas fenomeno
dunatura havanta ecojn kaj de jona krado kaj de grandega molekulo.

