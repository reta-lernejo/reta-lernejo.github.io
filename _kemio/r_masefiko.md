---
layout: laborfolio
title: Leĝo de masefiko
_chapter: "3.1.2"
_next_ch: r_acido
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - kadrarb-0a
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

<canvas id="kampo" height="320" width="480"></canvas>

<script>

const canvas = document.getElementById("kampo");
// kolizi-detektilo
const akarbo = new AKArbo(new AKadro([0,0],[480,320])); // estu sama grandeco kiel #kampo!
const ctx = canvas.getContext("2d");

const n_eroj = 2; // nombro da eroj
const r_ero = 10; // radiuso de eroj

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

let eroj = [];
for (let n = 0; n < n_eroj; n++) {
    const poz = [0,0]
    eroj[n] = { poz: poz };
    akarbo.adonu(n,poz,[r_ero,r_ero]);
}

function kolizioj() {
    // provizore, teste nur testu maldekstran kampon...
    const ik = akarbo.interkovroj([0,0],[240,320]);
    console.log("interkovroj: "+ik.join(', '));
}

function globo() {
    ctx.beginPath();
    ctx.arc(x, y, r_ero, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function pentru() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    kolizioj();

    if (x + dx > canvas.width - r_ero || x + dx < r_ero) {
        dx = -dx;
    }
    if (y + dy < r_ero) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

var interval = setInterval(pentru, 10);
</script>