---
layout: laborfolio
title: Leĝo de masefiko
_chapter: "3.1.2"
_next_ch: r_acido
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
---

<!--
https://www.chemieunterricht.de/dc2/mwg/mwg-kon.htm

https://www.chemie.de/lexikon/Gleichgewichtskonstante

- ekvilibro klarigita per pombatalo
https://www.seilnacht.com/Lexikon/chemgl.htm
http://daten.didaktikchemie.uni-bayreuth.de/umat/mwg/archiv/mwg.htm
https://www.youtube.com/watch?v=TzwKJ1xt8oU
https://www.chids.de/dachs/expvortr/392ChemischesGleichgewicht_Holfeld_Scan.pdf

simulado:
https://javalab.org/en/equilibrium_constants_en/
https://vincentgarreau.com/particles.js
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection

kolizioj
https://www.azurefromthetrenches.com/introductory-guide-to-aabb-tree-collision-detection/
https://github.com/lohedges/aabbcc
https://sourceforge.net/p/javascripaabbtr/code/HEAD/tree/aabbTreeExample.html

-->

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }

    table {
        table-layout: fixed;
    }

    td:first-child {
        width: 60%;
    }
    td:nth-child(2) {
        width: 20%;
    }
</style>

|koncentriteco c(A)/c(B)|malalta meza alta|
|reakciemo A kun B|malalta meza alta|
|disociiĝemo AB|malalta meza alta|
|temperaturo|malalta meza alta|

<canvas id="kampo" width="480" height="320"></canvas>
simulado de reakcio $$\ce{A + B <-> AB}$$

<canvas id="nombroj" width="480" height="320"></canvas>
koncentritecoj de A (=B) kaj de AB (dukolora)

|$$c(A) = c(B)$$|<span id="cA"/>|
|$$c(AB)$$|<span id="cAB"/>|

<canvas id="rapidoj" width="480" height="320"></canvas>
rapidecoj de kombino (dukolora) kaj malkombino (flava); 
ekvilibraj konstantoj: $$k_{tien}$$ (verda), $$k_{reen}$$ (ruĝa), proporcio (nigra);
logaritma skalo

|$$v_{tien} (\ce{A + B -> AB})$$|<span id="vkun"/>|
|$$v_{reen} (\ce{AB -> A + B})$$|<span id="vdis"/>|
|$$k_{tien} = v_{tien} / (c(A) \cdot c(B))$$|<span id="ktien"/>|
|$$k_{reen} = v_{reen} / c(AB)$$|<span id="kreen"/>|
|$$K = c(AB) / (c{A} \cdot c{B}) = k_{tien}/k_{reen}$$|<span id="Ke"/>|

<script>

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");
const d_nombroj = document.getElementById("nombroj");
const dgr_n = d_nombroj.getContext("2d");
const d_rapidoj = document.getElementById("rapidoj");
const dgr_r = d_rapidoj.getContext("2d");

const WIDTH = canvas.getAttribute("width");
const HEIGHT = canvas.getAttribute("height");
const K = 16, KW = WIDTH/K; // ni uzas 16x16-kahelojn por faciligi la kolizi-simuladon k.s.
  // atentu ke WIDTH kaj HEIGHT devas est multobloj de K!

linio(HEIGHT/2,dgr_r);
linio(3/4*HEIGHT,dgr_r);

const n_eroj = 1000; // nombro da eroj
const r_ero = 2; // radiuso de eroj
const v_max = K/2; // 10*K; K(20;  // maksimuma rapideco ~ temperaturo

// probablecoj por kunigo kaj divido
const p_kunigo = 0.1; //0.1;
const p_divido = 0.7; //0.0005;

// kiom da ĉiu speco ni havas en iu momento..
let k_nombroj = {"-1": 0, "0": 0, "1": 0};
// kiom da tempo pasis kaj kiom da reakcioj okazis 
const Ti = 30; // tempintervaloj por averaĝi rapidecon
let T = 0; // la tuta tempo en paŝoj
let v = Array.apply(null, new Array(Ti))
    .map(() => Object.create({kun: 0, dis: 0}));

// alterno inter 1 kaj 0 por eviti duoblan movon de eroj
let m_alt = 1;

// kreu erojn kaj alordigu al kaheloj laŭ koordinatoj
let eroj = [];
let kaheloj = Array.apply(null, new Array(WIDTH/K * HEIGHT/K))
    .map(() => new Object());
for (let n = 0; n < n_eroj; n++) {
    const e = {
        id: n,
        m: 1, // alterno inter 0 kaj 1, vd. m_alt
        k: 1 - 2*(n%2), // tipoj -1 aŭ 1 por unopaj kaj 0 por fanditaj eroj
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        vx: Math.random() * 2 * v_max - v_max,
        vy: Math.random() * 2 * v_max - v_max
    }
    const k = kahelo(e.x,e.y);
    if (k) {
        k[e.id] = e;
        k_nombroj[e.k]++;
    }
}

function kahelo(x,y) {
    const k = Math.trunc(x/K) + KW * Math.trunc(y/K);
    if (k>=kaheloj.length) throw(`neniu kahelo ${k} por x: ${x}, y: ${y}`);
    return kaheloj[k];
}

/**
 * movas eron e al novaj koordinatoj nx, ny,
 * se necese ankaŭ al nova kahelo
 */
function kmovo(e,nx,ny) {
    const x = e.x;
    const y = e.y;
    const kx = Math.trunc(x/K);
    const ky = Math.trunc(y/K);
    const nkx = Math.trunc(nx/K);
    const nky = Math.trunc(ny/K);
    e.x = nx; e.y = ny;
    if (kx != nkx || ky != nky) {
        const k = kahelo(x,y);
        const nk = kahelo(nx,ny);
        if (k && nk) {
            delete k[e.id];
            nk[e.id] = e;
        }
    }
}

/**
 * Trakuri la kahelojn, movi ĉiujn erojn en ĉiu kahelo,
 * laŭ la reguloj kunigu aŭ dividu ilin. Por eviti plurfoje tuŝi la samajn erojn,
 * kiuj ja ŝanĝas eventuele al nova kahelo ni uzas parametron m alternante inter 0 kaj 1
 */
function procezo(m) {
    function movo(e,kx,ky) {
        if (e.m == m) {
            // momente ni nur movas la erojn
            let nx = e.x + e.vx;
            if (nx < 0 || nx > WIDTH) {
                e.vx = - e.vx;
                nx = e.x + e.vx;
            }
            let ny = e.y + e.vy;
            if (ny < 0 || ny > HEIGHT) {
                e.vy = -e.vy;
                ny = e.y + e.vy;
            }
            // movo al nx, ny, eventuale al nova kahelo
            e.m = 1-m;
            kmovo(e,nx,ny);
        }
    }

    /**
     * donas al e novan rapidon (vx,vy) aldonante iom
     * da hazardo kaj limigante al v_max por tipoj k:-1, 1 kaj
     * v_max/2 por kunigo k: 0
     */
    function rapido(e,vx,vy) {
        const max = e.k? v_max : v_max/2;
        const dx = Math.random()*0.1*max - 0.05*max;
        const dy = Math.random()*0.1*max - 0.05*max;
        e.vx = Math.max(-max,Math.min(vx+dx,max));
        e.vy = Math.max(-max,Math.min(vy+dy,max));
    }

    /**
     * Kontrolas la reakcion (kunigo / divido) de eroj en sama kahelo
     */
    function reakcio(k) {
        const K = kaheloj[k];
        const eroj = Object.keys(K);
        // ĉu ni havas almenaŭ 2 erojn sur la kahelo
        if (eroj.length>1) {
            const n = Math.trunc(Math.random() * (eroj.length-1.1));
            const e1 = K[eroj[n]];
            const e2 = K[eroj[n+1]];

            // reakcio okazu nur inter 1 kaj -1 aŭ 0 kaj 0
            // PLIBONIGU: antentu konservon de momanto (vd http://www.sciencecalculators.org/mechanics/collisions/), momente ni improvizas per adicio kaj duonigo de rapidecoj v
            if (e1.k + e2.k == 0) {
                // kunigo
                if (e1.k && Math.random() < p_kunigo) {
                    // kunigo
                    delete K[e1.id];
                    delete K[e2.id];
                    k_nombroj[e1.k]--;
                    k_nombroj[e2.k]--;
                    e1.k = 0;
                    e1.id = `${e1.id}-${e2.id}`;
                    rapido(e1,(e1.vx + e2.vx)/2,(e1.vy + e2.vy)/2);
                    K[e1.id] = e1;
                    k_nombroj[e1.k]++;
                    v[T%Ti].kun++;
                } else if (!e1.k && Math.random() < p_divido) {
                    // disigo
                    delete K[e1.id];
                    k_nombroj[e1.k]--;
                    const idj = e1.id.split('-');
                    const e1a = Object.assign({},e1); 
                    e1.k = -1; e1.id = idj[0];
                    rapido(e1,2*e1.vx,2*e1.vy);
                    e1a.k = 1; e1a.id = idj[1];
                    const f2 = 2-Math.abs(e2.k);
                    rapido(e1a,e2.vx*f2,e2.vy*f2);
                    K[e1.id] = e1;
                    K[e1a.id] = e1a;
                    k_nombroj[e1.k]++;
                    k_nombroj[e1a.k]++;
                    v[T%Ti].dis++;
                }
            }
        }
    }

    v[T%Ti] = {kun: 0, dis: 0};
    for (let k in kaheloj) {
        reakcio(k);
        // movo
        const kx = k % KW;
        const ky = Math.trunc(k / KW);
        Object.values(kaheloj[k]).map((e) => movo(e,kx,ky));
    }

    // aktualigu valorojn en la tabelo
    T++;

    // montru valorojn en diagramo
    if (T<WIDTH) {
        ero({k: -1, x: T, y: HEIGHT - k_nombroj[-1]/n_eroj * 2 * HEIGHT},dgr_n);
        // ero({k: 1, x: T, y: k_nombroj[1]/540*HEIGHT},dgr);
        ero({k: 0, x: T, y: HEIGHT - k_nombroj[0]/n_eroj * 2 * HEIGHT},dgr_n);

        ĝi("#cA").textContent = k_nombroj[-1];
        //ĝi("#cB").textContent = k_nombroj[1];
        ĝi("#cAB").textContent = k_nombroj[0];

        let kun=0, dis=0;
        const t = Math.min(T,Ti);
        v.map((vt) => {kun += vt.kun; dis += vt.dis});
        // PLIBONIGU v estu -k1 * c(A)*c(B) resp. -k1 * c(AB)
        // ĉu tamen ni uzu absolutajn nombrojn aŭ ni dividu tra
        // n_eroj?
        const vkun = kun/t;
        const vdis = dis/t;
        ĝi("#vkun").textContent = vkun.toPrecision(3);
        ĝi("#vdis").textContent = vdis.toPrecision(3);

        /*
        ero({k: -1, x: T, y: HEIGHT-vdis/2*HEIGHT},dgr_r);
        // ero({k: 1, x: T, y: k_nombroj[1]/540*HEIGHT},dgr);
        ero({k: 0, x: T, y: HEIGHT-vkun/2*HEIGHT},dgr_r);
        */
        ero({k: -1, x: T, y: HEIGHT/2
            - Math.log10(vdis)*50},dgr_r);
        // ero({k: 1, x: T, y: k_nombroj[1]/540*HEIGHT},dgr);
        ero({k: 0, x: T, y: HEIGHT/2
            - Math.log10(vkun)*50},dgr_r);

        const k_tien = vdis / (k_nombroj[-1]*k_nombroj[1]);
        const k_reen = vkun / k_nombroj[0];
        ero({k: "#0d0", x: T, y: 3/4*HEIGHT
            - Math.log10(k_tien)*10},dgr_r);
        ero({k: "#d00", x: T, y: 3/4*HEIGHT
            - Math.log10(k_reen)*10},dgr_r);
        ĝi("#kreen").textContent = k_reen.toPrecision(3);
        ĝi("#ktien").textContent = k_tien.toPrecision(3);

        // Ke
        const Ke = (k_nombroj[0]/(k_nombroj[-1]*k_nombroj[1])).toPrecision(3);
        ero({k: "#000", x: T, y: 3/4*HEIGHT
            - Math.log10(Ke)*10},dgr_r);
        ĝi("#Ke").textContent = Ke;
    }

}

function linio(y,ctx) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH,y);
    ctx.stroke();
}

function ero(e,ctx) {
    // unu ero tipo -1 aŭ 1
    if (e.k) {
        const koloro = {"-1": "#DD9900", "1": "#0095DD"}[e.k] || e.k;
        ctx.beginPath();
        ctx.arc(e.x, e.y, r_ero, 0, Math.PI * 2);
        ctx.fillStyle = koloro;
        ctx.fill();
    } else {
        // kunigite
        ctx.beginPath();
        ctx.arc(e.x, e.y, 1.5*r_ero, Math.PI/4, Math.PI*5/4);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(e.x, e.y, 1.5*r_ero, Math.PI*5/4, Math.PI*9/4);
        ctx.fillStyle = "#DD9900";
        ctx.fill();
    }
}

function pentru() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const kahelo of kaheloj) {
        for (e of Object.values(kahelo)) {
            ero(e,ctx);
        }
    }

    procezo(m_alt);
    m_alt = 1-m_alt;
}

//var interval = setInterval(pentru, 100);
const intervalo = 50;
(function loop() {
    setTimeout(() => {        
    pentru();
    if (T<WIDTH) loop();
    }, intervalo);
})();

</script>