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
</style>

<canvas id="kampo" width="480" height="320"></canvas>

|$$c(A)$$||
|$$c(B)$$||
|$$c(AB)$$||
|$$v(\ce{A + B -> AB})$$||
|$$v(\ce{AB -> A + B})$$||

<script>

const canvas = document.getElementById("kampo");
const WIDTH = canvas.getAttribute("width");
const HEIGHT = canvas.getAttribute("height");
const K = 10, KW = WIDTH/K; // ni uzas 10x10-kahelojn por faciligi la kolizi-simuladon k.s.
  // atentu ke WIDTH kaj HEIGHT devas est multobloj de K!

// kolizi-detektilo
const ctx = canvas.getContext("2d");

const n_eroj = 12; // nombro da eroj
const r_ero = 10; // radiuso de eroj
const v_max = 10;

// kreu erojn kaj alordigu al kaheloj laŭ koordinatoj
let eroj = [], 
kaheloj = Array.apply(null, Array(WIDTH/K * HEIGHT/K))
    .map(() => []);
for (let n = 0; n < n_eroj; n++) {
    const e = {
        n: n,
        k: n%2,
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        vx: Math.random() * v_max,
        vy: Math.random() * v_max
    }
    const kx = Math.trunc(e.x/K);
    const ky = Math.trunc(e.y/K);
    const k = ky*KW+kx;
    kaheloj[k].push(e);
}

function procezo() {
    for (const kahelo of kaheloj) {
        for (e of kahelo) {
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
            e.x = nx;
            e.y = ny;
        }
    }
}

function globo(e) {
    const koloro = e.k? "#0095DD" : "#DD9900";
    ctx.beginPath();
    ctx.arc(e.x, e.y, r_ero, 0, Math.PI * 2);
    ctx.fillStyle = koloro;
    ctx.fill();
    ctx.closePath();
}

function pentru() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const kahelo of kaheloj) {
        for (e of kahelo) {
            globo(e);
        }
    }

    procezo();
    // kolizioj();
/*
    if (x + dx > canvas.width - r_ero || x + dx < r_ero) {
        dx = -dx;
    }
    if (y + dy < r_ero) {
        dy = -dy;
    }

    x += dx;
    y += dy;
    */
}

var interval = setInterval(pentru, 50);
</script>