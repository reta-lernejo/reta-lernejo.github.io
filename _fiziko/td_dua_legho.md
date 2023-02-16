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
let tipo='ideala'; // pilkotipo
const n_vert = 36; // 17; //31; // verticoj de pilko
const gravito = [0,-100]; // -1000 -> 500px ~ 5m, -100 -> 500px ~ 50m
const premo = 1-0.00005; // 0...1
const moleco =  0.0001;
const intervalo = 1/60; //200;
const paŝeroj = 10;

// elekto de pilkospeco
elekte((elekto,valoro) => {
    console.log(elekto+':'+valoro);
    if (elekto=='pilko') tipo = valoro;
    eksperimento();
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
  constructor(tipo,r,n,c=[0,0]) {
    super(n,gravito,2);
    this.rad = r;
    this.imas.fill(1);
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
      if (tipo!='truhava' || i<n-1) { // rezignu pri ferma eĝo ĉe truhava pilko
        eĝoj[2*i] = i;
        eĝoj[2*i+1] = (i+1)%n; //i<n-1? i+1:0;
      }
      
      // aldonu trion super tri najbaraj verticoj
      trioj[3*i] = i;
      trioj[3*i+1] = (i+tt)%n;
      trioj[3*i+2] = (i+tt+tt)%n;
    }

    // por pli da stabileco de 2D-cirklo, aldonu kelkajn "spokojn"
    const te = n>10?Math.trunc(n/5):2;
    for (let i=0; i<n; i++) {

      if (tipo!='truhava' || i<n-1) { // rezignu pri ferma eĝo ĉe truhava pilko
      eĝoj[2*n+2*i] = i; //i<n-1? i+1:0;
      eĝoj[2*n+2*i+1] = (i+te)%n; //i<n-1? i+1:0;
      }
    }

    // restriktoj
    const mlc = (tipo=='truhava')? moleco*50 : moleco;
    this.restr.push(new XRGrundo(this));
    this.restr.push(new XRFlanko(this,0,WIDTH));
    this.restr.push(new XRDistanco(this,eĝoj,mlc));
    this.restr.push(new XRAreo(this,trioj,mlc));

    // perdu neniun energion
    if (tipo=='ideala') {
      this.restrE.push(new XREnergio(this,0));
    } if (tipo=='reala') {
      this.restrE.push(new XREnergio(this,0.001));
    }
  }

  vertico(i) {
    return {x: this.poz[2*i], y: this.poz[2*i+1]}
  }

  rapido(i) {
    return {x: this.rpd[2*i], y: this.rpd[2*i+1]}
  }


  desegnu(ctx) {
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
      ctx.strokeStyle = "#cce"; //"#eeeeff";
      ctx.lineWidth = 1; //3;
      ctx.stroke();
    }

    function koloro(self,n1,n2,n3,n4,klr) {
      const p1 = self.vertico(n1);
      const p3 = self.vertico(n3);
      // mezpunkto
      const m = {x: (p1.x+p3.x)/2, y: (p1.y+p3.y)/2};

      ctx.beginPath();
      ctx.moveTo(p1.x,HEIGHT-p1.y);
      for (let n=n1; n<=n2; n++) {
        const p = self.vertico(n);
        ctx.lineTo(p.x,HEIGHT-p.y);
      }
      ctx.lineTo(m.x,HEIGHT-m.y);
      ctx.closePath();
      ctx.fillStyle = klr; //"#eeeeff";      
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(p3.x,HEIGHT-p3.y);
      for (let n=n3; n<=n4; n++) {
        const p = self.vertico(n);
        ctx.lineTo(p.x,HEIGHT-p.y);
      }      
      ctx.lineTo(m.x,HEIGHT-m.y);
      ctx.closePath();
      ctx.fillStyle = klr; //"#eeeeff";      
      ctx.fill();
    }
    
/*
    function strio(self,n1,n2) {
      const p1 = self.vertico(n1);
      const p2 = self.vertico(n2);
      ctx.beginPath();
      ctx.moveTo(p1.x,HEIGHT-p1.y);
      ctx.lineTo(p2.x,HEIGHT-p2.y);
      ctx.strokeStyle = "cornflowerblue"; //"#eeeeff";
      ctx.lineWidth = 3; //3;
      ctx.stroke();
    }

    function arko(self,n1,n2,m) {
      const p1 = self.vertico(n1);
      const p2 = self.vertico(n2);
      // punkto meze kontrasŭflanka
      const M = self.vertico(m);

      ctx.beginPath();
      ctx.moveTo(p1.x,HEIGHT-p1.y);
      ctx.arcTo(M.x,HEIGHT-M.y,p2.x,HEIGHT-p2.y,3*self.rad/4);
      ctx.lineTo(p2.x,HEIGHT-p2.y);
      ctx.strokeStyle = "cornflowerblue"; //"#eeeeff";
      ctx.lineWidth = 3; //3;
      ctx.stroke();
    }
    */

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // rapidoj kiel spuro  
    /*
    for (let i=0; i<n_vert; i++) {
      rpd(this.vertico(i),this.rapido(i));
    }
    */
    
    // ornamaj strioj
    const n = this.eroj;
    /*
    strio(this,0,Math.trunc(n/2));
    strio(this,Math.trunc(n/4),Math.trunc(3*n/4));
    arko(this,Math.trunc(n/8),Math.trunc(7*n/8),Math.trunc(n/2));
    arko(this,Math.trunc(5*n/8),Math.trunc(3*n/8),0);
    */
    koloro(this,0,Math.trunc(n/6),Math.trunc(3*n/6),Math.trunc(4*n/6),"cornflowerblue");
    koloro(this,Math.trunc(n/6),Math.trunc(2*n/6),Math.trunc(4*n/6),Math.trunc(5*n/6),"chocolate");
    
    // eĝoj kiel cirkonferenco
    let i = 0, v1 = this.vertico(i);
    while (i < n_vert-1) {
      const v2 = this.vertico(i+1);
      eĝo(v1,v2);
      v1 = v2; i++;
    }
    // lasta eĝo al 0-a vertico
    const v2 = this.vertico(0);
    eĝo(v1,v2);
  }

}

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");
let ripetoj; 

function eksperimento() {
  const centro = [50+400*Math.random(),HEIGHT-50+20*Math.random()];
  const pilko = new Pilko2d(tipo,30,n_vert,centro);
  const xpbd = new XPBD([pilko],gravito);

  if (ripetoj) clearTimeout(ripetoj.p);

  pilko.desegnu(ctx);
  ripetoj = ripetu(
      () => {
          xpbd.simulado(1/60,paŝeroj);
          pilko.desegnu(ctx);
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
}

kiam_klako("#haltu",() => {
    if (ripetoj) clearTimeout(ripetoj.p);
});

eksperimento();

</script>

<!--

sono je distanco, resonado en kapelo....

-->

Se vi staras ie en la naturo kaj ekkantas aŭ ekkrias, oni tion aŭdas depende de la tereno ankoraŭ en granda distanco. Kiam vi ĉesas, se ne okazas eĥo, ankaŭ la sono, kiun vi mem aŭdas tuj ĉesas. La energio de via voĉo transdoniĝas al la molekuloj de la aero kaj ŝtonoj kaj plantoj ktp, sed precipe transportiĝas per la eksvingoj kaj interpuŝiĝoj de aeraj molekuloj. Sed la origina energio disiĝas al ĉiam pli kaj pli da molekuloj en multaj diversaj manieroj moviĝi plurdirekte, rotacio ktp. ke oni baldaŭ ne plu povas percepti ĝin. Fakuloj diras, ke la energio dispersiĝas.

Alie, se vi troviĝas en kapelo aŭ kelo kun bona akustiko, sono povas dum pluraj sekundoj, eĉ minutoj ankoraŭ aŭdiĝi. La muroj ĉiam reĵetas ĝin kaj dum certa tempo ne permesas, ke ĝia energio eliras ekster la murojn.

