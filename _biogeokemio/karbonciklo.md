---
layout: page
title: Karbonciklo
---


## mallongperioda karbonciklo



<!--

// enhavoj GT C
Atmosphere 	720

Ocean (total) 	38,400
  Total inorganic 	37,400
  Total organic 	1,000
  Surface layer 	670
  Deep layer 	36,730

Lithosphere 	
  Sedimentary carbonates > 60,000,000
  Kerogens 	15,000,000

Terrestrial biosphere (total) 	2,000
  Living biomass 	600 – 1,000
  Dead biomass 	1,200

Aquatic biosphere 	1 – 2

Fossil fuels (total) 	4,130
  Coal 	3,510
  Oil 	230
  Gas 	140
  Other (peat) 	250 

// jaraj fluoj

fotosintezo: atm -> bio 120+3
respiro: bio -> atm 60
respiro: grundo -> atm 60
---
nete: +3

solvo en akvo: atm -> mar 90+2
elgasiĝo: mar -> atm 90
---
nete +2

bruligo: fos -> atm 9
=====
ĉio kune:
nete jare: +4 (atm)

-->

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="600" height="600" viewBox="0 0 1000.0 1000.0">

  <style type="text/css">
    <![CDATA[
        text {
            font-size: 24px;
            text-anchor: middle
        }
        circle {
            stroke: black;
            stroke-width: 2px;
        }
        /* kial ne funkcias? ĉu necesas SVG 2.0?
        tspan.c_off {
            dy: 10;
        }*/
        path {
            stroke: black;
            stroke-linecap: round;
            /*stroke-dashoffset: 0; ni movas tion per JS, CSS ŝajne malhelpus tion! */
            fill: none;
        }

        #s_lit {
            cx: 500px;
            cy: 3200px;
            r: 2500px;
            fill: gray;
        }

        #s_gas {
            transform: translate(330px,760px);
        }
        #s_gas circle {
            r: 12px;
            fill: slategray;
        }

        #s_nft {
            transform: translate(400px,800px);
        }
        #s_nft circle {
            r: 15px;
            fill: tan;
        }

        #s_krb {
            transform: translate(510px,800px);
        }
        #s_krb circle {
            r: 60px;
            fill: dimgray;
        }

        #s_akv {
            transform: translate(800px,600px);
        }
        #s_akv circle {      
            r: 195px;
            fill: navy;
        }

        #s_bio {
            transform: translate(200px,650px);
        }
        #s_bio circle {
            r: 48px;
            fill: green;
        }

        #s_gru {
            transform: translate(200px,700px);
        }
        #s_gru circle {
            r: 40px;
            fill: sienna;
        }

        #s_atm {
            transform: translate(500px,200px);
        }
        #s_atm circle {
            r: 27px;
            fill: skyblue;
        }

        #bio_atm {
            /*d: M210 650 Q250 300 500 200;*/
            stroke-width: 6.0px;
            stroke-dasharray: 0,12px;
        }

        #gru_atm {
            stroke-width: 6.0px;
            stroke-dasharray: 0,12px;
        }

        #AUT {
            transform: translate(370px,654px);
        }
        #KON {
            transform: translate(415px,616px);
        }
        #HOR {
            transform: translate(80px,658px);
        }

    ]]>
  </style> 

 <!-- ni metas la fluojn antaŭ la stokojn por ke ili kovru, tio provizore ŝparas
    elkalkuli komencon kaj finon de la pado depende de radiusoj -->

 <circle id="s_lit"/>
 <text><textPath xlink:href="#s_lit" startOffset="75.1%">
    <tspan dy="28">terkrusto 123 mio Gt</tspan></textPath></text>

 <path id="fos_atm" d="M400 740 Q400 500 500 200" stroke-width="2.7" stroke-dasharray="0,10" 
   stroke-dashoffset="0"></path>
 <text><textPath xlink:href="#fos_atm" startOffset="30%">
    <tspan dy="-10">bruligo 9 Gt ▸</tspan></textPath></text>

 <g id="s_gas">
   <circle/>
   <text y="-20">tergaso</text><text y="34">140 Gt</text>
 </g>

 <g id="s_nft">
   <circle/>
   <text y="-20">nafto</text><text y="36">230 Gt</text>
 </g>

 <g id="s_krb">
   <circle/>
   <text y="-10">karbo</text><text y="20">3500 Gt</text>
 </g>

 <path id="atm_akv" d="M500 200 Q800 200 800 600" stroke-width="9.2" stroke-dasharray="0,18" 
   stroke-dashoffset="0"></path>
 <text><textPath xlink:href="#atm_akv" startOffset="40%">
    <tspan dy="-10">solviĝo 92 Gt ▸</tspan></textPath></text>

 <path id="akv_atm" d="M800 600 Q500 600 500 200" stroke-width="9.0" stroke-dasharray="0,18" 
   stroke-dashoffset="0"></path>
 <text><textPath xlink:href="#akv_atm" side="right" startOffset="40%">
    <tspan dy="-10">◂ elgasiĝo 90 Gt</tspan></textPath></text>


 <path id="atm_bio" d="M500 200 Q180 200 190 650" stroke-width="12.3" stroke-dasharray="0,24" 
   stroke-dashoffset="0"></path>
 <text><textPath xlink:href="#atm_bio" side="right" startOffset="40%">
    <tspan dy="-10">◂ fotosintezo 123 Gt</tspan></textPath></text>

<!--
 <path id="bio_atm" d="M210 650 Q250 300 500 200" stroke-width="6.0" stroke-dasharray="0,12" 
   stroke-dashoffset="0"></path>
-->

 <!-- ŝajne, bedaŭerinde, d ne estas influebla per CSS kaj ĉar la pado dependas de du punktoj (fonto/celo)
   ni ne povas uzi transform/translate -->
 <path id="bio_atm" d="M210 650 Q250 300 500 200" stroke-dashoffset="0"></path>
 <text><textPath xlink:href="#bio_atm" startOffset="60%">
    <tspan dy="-10">respiro 60 Gt ▸</tspan></textPath></text>

 <path id="gru_atm" d="M200 725 Q400 550 490 200" stroke-dashoffset="0"></path>
 <text><textPath xlink:href="#gru_atm" startOffset="40%">
    <tspan dy="-10">respiro 60 Gt ▸</tspan></textPath></text>

 <g id="s_atm">
   <circle/>
   <text y="-56">atmosfero</text><text y="-30">720 Gt</text>
  </g>

 <g id="s_bio">
   <circle/>
   <text y="-12">vivaĵoj</text>
   <text y="10">2300 Gt</text>
 </g>

 <g id="s_gru">
   <circle/>
   <text y="60">grundo</text><text y="84">1600 Gt</text>
 </g>

 <g id="s_akv">
   <circle id="c_akv"/>
   <text><textPath xlink:href="#c_akv" startOffset="81%">
    <tspan dy="-10">maroj 38000 Gt</tspan></textPath></text>
 </g>

 <g id="AUT">
    <image transform="scale(0.5)" href="../assets/smb/AUT.svg" />
  </g>

 <g id="KON">
    <image transform="scale(0.9)" href="../assets/smb/KON.svg" />
  </g>

 <g id="HOR">
    <image transform="rotate(-8) scale(0.8)" href="../assets/smb/HOR.svg" />
  </g>

</svg>

<!-- https://www.mediaevent.de/tutorial/svg-javascript.html 
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial
https://css-tricks.com/scale-svg/
https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
https://vanseodesign.com/web-design/svg-text-tspan-element/
-->
<script>
  const fluoj = {
      // la rapidecon ni kalkulas
      // per flukvanto/linidikeco
      // por eviti tro variajn linidikojn
      // alternative ni povus uzi logaritman dikecon eble.
      "atm_akv": 92/9.2,
      "akv_atm": 90/9.0,
      "fos_atm": 9/3,

      "atm_bio": 123/12.3,
      "bio_atm": 60/6.0,
      "gru_atm": 60/6.0
  }

  function sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
  }

  // pentras cirklon kun radiuso r = sqrt(val) ĉe (x,y)
  function store(x,y,val) {

  }
    

  let x = 10;
    
  function move() {
      if (x<500) {
        x-=1;
        //console.log(x);
        for (const f of Object.keys(fluoj)) {
            const pado = document.getElementById(f);
            const rapido = fluoj[f];
            const x_ = x/rapido; 
            pado.setAttribute("stroke-dashoffset",x);
        }
        sleep(100).then(move);
      }
  };
    
  move();
</script>        

## Taskoj

1. Faru bilancon de la fluoj kaj eltrovu:
  - fontojn de karbono kaj jaran deprenon
  - malfontojn (akceptejojn) de karbono kaj jaran aldonon

2. Se vi trovis neekvilibran bilancon, kiel oni povus ekvilibrigi ĝin?




fontoj:
  - [W: Carbon cycle](https://en.wikipedia.org/wiki/Carbon_cycle)
  - [W: Kohlenstoffzyklus](https://de.wikipedia.org/wiki/Kohlenstoffzyklus)