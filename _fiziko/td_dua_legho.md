---
layout: laborfolio
title: Dua leĝo de termodinamiko kaj entropio
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - xpbd-0a
---

<!--
http://www.esalq.usp.br/lepse/imgs/conteudo_thumb/Entropy-Is-Simple---If-We-Avoid-The-Briar-Patches.pdf
https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Analytical_Chemistry_2.1_(Harvey)/06%3A_Equilibrium_Chemistry/6.02%3A_Thermodynamics_and_Equilibrium_Chemistry#equation6.2.3

...: entropi(diferenco) kiel mezuro de energidispersiĝo...

dS = Q/T [J/K]
vd. https://study.com/skill/learn/calculating-change-in-entropy-for-a-process-in-which-energy-is-expelled-explanation.html
-->

<!--

kiel eliro por klarigi entropion uzu modelon de pilko: 
- ideala: daŭre saltanta
- reala: iom post iom perdante energion pro varmperdo, frotvarmo...
- difektita: perdanta aeron el la interna

uzu ideojn de https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/03-billiard.html /
https://matthias-research.github.io/pages/tenMinutePhysics/09-xpbd.pdf
por simulado, sed nur 2-dimensie

-->

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>

*pilko:* (x)ideala ()reala ()truhava  
{: .elekto #pilko}


<canvas id="kampo" width="500" height="500"></canvas>
simulado de pilko
<button id="haltu">Haltu</button>

<script>

const HEIGHT=500;
const WIDTH=500;
const n_vert = 31; // verticoj de pilko

// elekto de pilkospeco
elekte((elekto,valoro) => {
    console.log(elekto+':'+valoro);
});

/**
 * Simuladas saltantan elastan pilkon en ujo
 */

class Pilko2d extends XPBDObj {

    /**
     * Kreas 2-dimensian pilkon kun radiuso r kiel "torton" el n pecoj
     * @param {*} r radiuso
     * @param {*} n nombro da pecoj
     */
    constructor(r,n,c=[0,0]) {
      super(n,2);
      const eĝoj = new Uint8Array(2*n + 2*n); // + n*(n-3)); // cirkonferencaj eĝoj + diagonaloj
      const trioj = new Uint8Array(3*n);

      // cirkonferenco...
      // ĉiu vertico havas du koordinatojn x kaj y
      let phi = 0;
      const d = 2*Math.PI/n;
      const tt = n>7?Math.trunc(n/7):1;

      for (let i=0; i<n; i++) {
          this.poz[2*i] = c[0] + r * Math.cos(phi);
          this.poz[2*i+1] = c[1] + r * Math.sin(phi);
          phi += d;

          // aldonu eĝon
          eĝoj[2*i] = i;
          eĝoj[2*i+1] = (i+1)%n; //i<n-1? i+1:0;

          // aldonu trion super tri najbaraj verticoj
          trioj[3*i] = i;
          trioj[3*i+1] = (i+tt)%n;
          trioj[3*i+2] = (i+tt+tt)%n;
      }

      // por pli da stabileco aldonu pliajn eĝojn
      const te = n>10?Math.trunc(n/5):2;
      for (let i=0; i<n; i++) {
        eĝoj[2*n+2*i] = i; //i<n-1? i+1:0;
        eĝoj[2*n+2*i+1] = (i+te)%n; //i<n-1? i+1:0;
      }

/*
      // kelkaj radioj de centro al cirkonferenco      
      let e = 2*n, paŝo = Math.trunc(n/5);
      for (let i=0; i<n; i+=paŝo) {
        for (let j=2; j<n-2; j+=paŝo) {
          eĝoj[e++]=i;
          eĝoj[e++]=(i+j)%n;
        }
      }
*/

      // restriktoj
      this.restr.push(new XRGrundo(this));
      this.restr.push(new XRDistanco(this,eĝoj,0.005));
      this.restr.push(new XRAreo(this,trioj,0.005));
    }

    vertico(i) {
      return {x: this.poz[2*i], y: this.poz[2*i+1]}
    }

    rapido(i) {
      return {x: this.rpd[2*i], y: this.rpd[2*i+1]}
    }
}

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");

const pilko = new Pilko2d(30,n_vert,[40,HEIGHT-40]);
pilko.imas.fill(1);
const xpbd = new XPBD([pilko],[0,-10]);

function desegnu() {
  // cirkonferenca eĝo 
  function eĝo(p1,p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x,HEIGHT-p1.y);
    ctx.lineTo(p2.x,HEIGHT-p2.y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // ni montras negativajn rapidojn kiel spuron...
  function rpd(p,v) {
    ctx.beginPath();
    ctx.moveTo(p.x,HEIGHT-p.y);
    ctx.lineTo(p.x-v.x,HEIGHT-p.y+v.y);
    ctx.strokeStyle = "#ddddee";
    ctx.lineWidth = 6;
    ctx.stroke();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // rapidoj kiel spuro
  for (let i=0; i<n_vert; i++) {
    rpd(pilko.vertico(i),pilko.rapido(i));
  }

  // eĝoj kiel cirkonferenco
  let i = 0, v1 = pilko.vertico(i);
  while (i < n_vert-1) {
    const v2 = pilko.vertico(i+1);
    eĝo(v1,v2);
    v1 = v2; i++;
  }
  // lasta eĝo al 0-a vertico
  v2 = pilko.vertico(0);
  eĝo(v1,v2);
}

let ripetoj; 
if (ripetoj) clearTimeout(ripetoj.p);
const intervalo = 40; //200;

desegnu();
ripetoj = ripetu(
    () => {
        xpbd.simulado(1,60);
        desegnu();
        return true; // ni ne haltos antaŭ butonpremo [Haltu]...(idealgaso.T < d_larĝo);
    },
    intervalo
)

kiam_klako("#haltu",() => {
    if (ripetoj) clearTimeout(ripetoj.p);
});

/*
function ripeto() {
  xpbd.simulado(1,10);
  desegnu();
  // requestAnimationFrame(ripeto);
}

ripeto();
*/

</script>

<!--

sono je distanco, resonado en kapelo....

-->
