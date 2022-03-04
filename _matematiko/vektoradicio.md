---
layout: laborfolio
title: Vektoradicio
js:
  - svg-0a
  - vektoro-0a
js-ext: mathjax3
---

Vektorojn oni adicias per adicio de la unuopaj koordinatoj de ĉiu dimensio, do:

<!-- https://tex.stackexchange.com/questions/526950/how-to-type-column-vectors-in-mathjax 
https://www2.physki.de/PhysKi/index.php/MathJax-Formelsatz -->
$$ \vec a + \vec b = \left( \begin{array}{} a_1 \cr a_2 \end{array}\right) + \left( \begin{array}{} b_1 \cr b_2 \end{array} \right) = \left( \begin{array}{} a_1+b_1 \cr a_2+b_2 \end{array} \right)$$

Grafike oni povas imagi tion kiel ĉenigo de du vektoroj. La sumo estas la vektoro, kiu montras al la pinto de la dua vektoro post ĉenigo.

Vi povas mem elprovi tion ĉi-malsupre.

<style>
  #tasko {
    display: grid;
    justify-items: center;
    grid-template-columns: .5em 2em .5em 2em .5em 2em .5em 2em .5em 5em .5em;
    grid-template-areas:
      'k1 x1 k2 op k3 x2 k4 eg k5 x k6'
      'k1 y1 k2 op k3 y2 k4 eg k5 y k6';
  }

  #tasko, #tasko input {
    font-size: 16pt;
  }

  #tasko input {
    width: 3em;
  }

  #butonoj input {
    font-size: 16pt;
    margin: .5em;
    background-color: lightblue;
  }

  #butonoj input:first-of {
    margin-left: 10em;
  }

  #k1,#k2,#k3,#k4,#k5,#k6,#op,#eg {
    font-size: 200%;
  }
  
  #k1 {
    grid-area: k1;
  }
  #k2 {
    grid-area: k2;
  }
  #k3 {
    grid-area: k3;
  }
  #k4 {
    grid-area: k4;
  }
  #k5 {
    grid-area: k5;
  }
  #k6 {
    grid-area: k6;
  }

  #op {
    grid-area: op;
  }
  #eg {
    grid-area: eg;
  }

  #x1 {
    grid-area: x1;
  }
  #x2 {
    grid-area: x2;
  }
  #y1 {
    grid-area: y1;
  }
  #y2 {
    grid-area: y2;
  }
  #x {
    grid-area: x;
  }
  #y {
    grid-area: y;
  }


</style>

<div id="tasko">
  <span id="k1">&#x27ee;</span>
  <span id="x1">a₁</span>
  <span id="y1">a₂</span>
  <span id="k2">&#x27ef;</span>
  <span id="op">+</span>
  <span id="k3">&#x27ee;</span>
  <span id="x2">b₁</span>
  <span id="y2">b₂</span>
  <span id="k4">&#x27ef;</span>
  <span id="eg">=</span>
  <span id="k5">&#x27ee;</span>
  <input id="x" type="text" size="2" placeholder="a₁+b₁">
  <input id="y" type="text" size="2" placeholder="a₂+b₂">
  <span id="k6">&#x27ef;</span>
</div>

<div id="butonoj">
  <input type="button" value="nova tasko" onclick="nova_tasko()"/>
  <input type="button" value="kontrolu" onclick="kontrolu()"/>
</div>

<svg version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    class="kartezia"
    width="600" height="600" 
    viewBox="-1.0 -11.0 12.0 12.0">

  <!-- https://stackoverflow.com/questions/3846015/flip-svg-coordinate-system -->

  <style type="text/css">
    <![CDATA[

      svg.kartezia {
        display:flex;
      }

      /* Flip the vertical axis in <g> to emulate cartesian. */
      svg.kartezia > g {
        transform: scaleY(-1);
      }

      /* Re-flip all <text> element descendants to their original side up. 
      
      svg.kartezia > g text {
        transform: scaleY(-1) translate(0,-10);
      }*/

        text {
            font-size: 0.5px;
            text-anchor: middle;
            fill: black;
            stroke: none;
        }
        path {
            stroke: black;
            stroke-width: 0.02;
            /*stroke-linecap: round;*/
            fill: none;
        }
        #desegno {
            stroke: #999;
            fill: none;
            stroke-width: 0.05;
            stroke-linecap: round;
        }
        .malbona {
          stroke: red;
        }
        .bona {
          stroke: green;
        }

    ]]>
  </style> 

 <!-- ni metas la fluojn antaŭ la stokojn por ke ili kovru, tio provizore ŝparas
    elkalkuli komencon kaj finon de la pado depende de radiusoj -->

    <defs>
      <g id="pinto">
        <line x1="-0.4" y1="0.1" x2="0" y2="0"/>
        <line x1="-0.4" y1="-0.1" x2="0" y2="0"/>
      </g>
    </defs> 

<image href="../assets/mat/koord10x10.svg" transform="translate(0,-10)"/>

<g id="desegno">
  <!-- tien ĉi ni kreos la vektoroj per JS (SVG.*) -->
</g>
 </svg>


<script>
  let v1 = {}, v2 = {};
  const vmax = new Vektoro([10,10]);

  function metu(kampo,valoro) {
    document.getElementById(kampo).textContent = valoro;
  }

  function valoro(kampo) {
    return parseInt(document.getElementById(kampo).value,10);
  }

  function forigu(kampo) {
    return document.getElementById(kampo).value='';
  }

  function vektoro(nomo,cls,x,y,x0=0,y0=0) {
    // kreu grupon por la vektoro, konsistanta el linio, pinto kaj etikedo

    const g = SVG.grupo(nomo,cls);
    const linio = SVG.linio(x0,y0,x0+x,y0+y);

    const a = Math.atan2(y, x) * 180 / Math.PI;
    const pinto = SVG.uzo("#pinto","translate("+(x+x0)+","+(y+y0)+") rotate("+a+")");

    const xl = x0 + x/2;
    const yl = y0 + y/2;
    const teksto = SVG.teksto(nomo,xl+.5,-yl,true); // -yl ĉar ni devos speguli la koordinasistemon

    // metu ĉion kune en la desegnon
    SVG.aldonu(g,linio,pinto,teksto);
    SVG.aldonu("desegno",g);
  }

  function nova_tasko() {
    a = new Vektoro(2).arbitra(0,10);
    b = new Vektoro(2).arbitra_v(vmax.minus(a));

    metu("x1",a[0]);
    metu("y1",a[1]);
    metu("x2",b[0]);
    metu("y2",b[1]);
    forigu("x");
    forigu("y");

    metu("desegno",'');
    vektoro("a",'',a[0],a[1]);
    vektoro("b",'',b[0],b[1]);
    /*
    vektoro("v₂",v2.x,v2.y,v1.x,v1.y);
    vektoro("v₁+v₂",v1.x+v2.x,v1.y+v2.y);
    */
  }

  function kontrolu() {
    metu("desegno",'');

    // montru ambaŭ vektorojn konektitaj
    vektoro("a",'',a[0],a[1]);
    vektoro("b",'',b[0],b[1],a[0],a[1]);

    // montru la donitan rezulton en komparo
    const X = valoro("x");
    const Y = valoro("y");
    const devio = new Vektoro([X,Y])
      .minus( a.plus(b) )
      .abs_2(); // Math.abs(X - v1[0] - v2[0]) + Math.abs(Y - v1[1] -v2[1]);
    const cls = devio < 0.1? 'bona' : 'malbona';
    vektoro("a+b",cls,+X,+Y);
  }

  //nova_tasko();
</script>