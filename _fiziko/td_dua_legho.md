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


<script>

const HEIGHT=500;
const WIDTH=500;


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
      let eĝoj = new Uint8Array(2*n);
      // ĉiu vertico havas du koordinatojn x kaj y
      let phi = 0;
      const d = 2*Math.PI/n;
      for (let i=0; i<n; i++) {
          this.poz[2*i] = c[0] + r * Math.cos(phi);
          this.poz[2*i+1] = c[1] + r * Math.sin(phi);
          phi += d;

          // aldonu eĝon
          eĝoj[2*i] = i;
          eĝoj[2*i+1] = i<n-1? i+1:0;
      }

      // restriktoj
      this.restr.push(new XRDistanco(this,eĝoj));
    }

    vertico(i) {
        return {x: this.poz[2*i], y: this.poz[2*i+1]}
    }
}

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");
const n_vert = 5; // verticoj de pilko
const pilko = new Pilko2d(30,n_vert,[40,HEIGHT-40]);
pilko.imas.fill(1);
const xpbd = new XPBD([pilko],[0,-10]);

function desegnu() {
  function eĝo(p1,p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x,HEIGHT-p1.y);
    ctx.lineTo(p2.x,HEIGHT-p2.y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let i = 0, v1 = pilko.vertico(i);
  while (i < n_vert-1) {
    const v2 = pilko.vertico(i+1);
    eĝo(v1,v2);
    v1 = v2; i++
  }
  // lasta eĝo al 0-a vertico
  v2 = pilko.vertico(0);
  eĝo(v1,v2);
}

let ripetoj; 
if (ripetoj) clearTimeout(ripetoj.p);
const intervalo = 200;

desegnu();
ripetoj = ripetu(
    () => {
        xpbd.simulado(1,10);
        desegnu();
        return true; // ni ne haltos antaŭ butonpremo [Haltu]...(idealgaso.T < d_larĝo);
    },
    intervalo
)

/*
function ripeto() {
  xpbd.simulado(1,10);
  desegnu();
  // requestAnimationFrame(ripeto);
}

ripeto();
*/

</script>
