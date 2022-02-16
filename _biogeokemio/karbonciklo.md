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
            transform: scale(0.5) translate(750px,1310px);
        }
        #KON {
            transform: scale(0.5) translate(850px,1310px);
        }
        #HOR {
            transform: scale(0.5) translate(210px,1365px);
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

  <path d="M5.000305 87.350052L5.000305 63.050217L94.999695 63.050217L94.999695 87.350052L85.999756 87.350052C87.369003 79.395630,80.454269 72.480896,72.499847 73.850143C66.184097 74.937317,62.074326 81.101974,63.499908 87.350052L36.500092 87.350052C37.925690 81.101974,33.815918 74.937317,27.500153 73.850143C19.545731 72.480896,12.630997 79.395630,14.000244 87.350052Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M8.600281 64.850204C13.418503 55.213745,21.454895 46.850327,32.000122 46.850327L85.999756 46.850327C90.920807 46.850327,93.649704 52.181900,93.649704 57.650253L93.649704 64.850204" style="stroke:rgb(0.000000%,0.000000%,0.000000%); stroke-width: 2.699982;stroke-linecap: round;stroke-linejoin: round;stroke-miterlimit: 10.000000;fill: none;"></path>
  <path d="M36.500092 46.850327L36.500092 64.850204" style="stroke:rgb(0.000000%,0.000000%,0.000000%); stroke-width: 2.699982;stroke-linecap: round;stroke-linejoin: round;stroke-miterlimit: 10.000000;fill: none;"></path>
  <path d="M55.399963 46.850327L55.399963 64.850204" style="stroke:rgb(0.000000%,0.000000%,0.000000%); stroke-width: 2.699982;stroke-linecap: round;stroke-linejoin: round;stroke-miterlimit: 10.000000;fill: none;"></path>
  <path d="M75.199829 46.850327L75.199829 64.850204" style="stroke:rgb(0.000000%,0.000000%,0.000000%); stroke-width: 2.699982;stroke-linecap: round;stroke-linejoin: round;stroke-miterlimit: 10.000000;fill: none;"></path>
  <path d="M35.150101 85.100067C35.150101 82.474319,34.106873 79.956436,32.250336 78.099899C30.393799 76.243362,27.875916 75.200134,25.250168 75.200134C22.624420 75.200134,20.106537 76.243362,18.250000 78.099899C16.393463 79.956436,15.350235 82.474319,15.350235 85.100067C15.350235 87.725815,16.393463 90.243698,18.250000 92.100235C20.106537 93.956772,22.624420 95.000000,25.250168 95.000000C27.875916 95.000000,30.393799 93.956772,32.250336 92.100235C34.106873 90.243698,35.150101 87.725815,35.150101 85.100067Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M84.649765 85.100067C84.649765 82.474319,83.606537 79.956436,81.750000 78.099899C79.893463 76.243362,77.375580 75.200134,74.749832 75.200134C72.124084 75.200134,69.606201 76.243362,67.749664 78.099899C65.893127 79.956436,64.849899 82.474319,64.849899 85.100067C64.849899 87.725815,65.893127 90.243698,67.749664 92.100235C69.606201 93.956772,72.124084 95.000000,74.749832 95.000000C77.375580 95.000000,79.893463 93.956772,81.750000 92.100235C83.606537 90.243698,84.649765 87.725815,84.649765 85.100067Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
</g>

<g id="KON">
  <path d="M9.901428 78.158600L9.901428 61.317200L50.000000 61.317200L50.000000 78.158600L45.990143 78.158600L45.990143 66.129028L37.970428 66.129028L37.970428 78.158600L33.960571 78.158600L33.960571 66.129028L25.940857 66.129028L25.940857 78.158600L21.931000 78.158600L21.931000 66.129028L13.911285 66.129028L13.911285 78.158600Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M9.901428 62.119171L9.901428 45.277771L50.000000 45.277771L50.000000 62.119171L45.990143 62.119171L45.990143 50.089600L37.970428 50.089600L37.970428 62.119171L33.960571 62.119171L33.960571 50.089600L25.940857 50.089600L25.940857 62.119171L21.931000 62.119171L21.931000 50.089600L13.911285 50.089600L13.911285 62.119171Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M9.901428 46.079742L9.901428 29.238342L50.000000 29.238342L50.000000 46.079742L45.990143 46.079742L45.990143 34.050171L37.970428 34.050171L37.970428 46.079742L33.960571 46.079742L33.960571 34.050171L25.940857 34.050171L25.940857 46.079742L21.931000 46.079742L21.931000 34.050171L13.911285 34.050171L13.911285 46.079742Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M9.901428 94.198029L9.901428 77.356628L50.000000 77.356628L50.000000 94.198029L35.564514 94.198029L35.564514 79.762543L24.336914 79.762543L24.336914 94.198029Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M9.901428 28.436371L19.525085 18.010742L40.376343 18.010742L50.000000 28.436371Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M9.901428 93.396057L9.901428 95.000000L11.505371 95.000000L50.000000 95.000000L50.000000 93.396057L48.396057 93.396057Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M62.029572 86.178314L62.029572 69.336914L90.098572 69.336914L90.098572 86.178314L86.088715 86.178314L86.088715 74.148743L78.069000 74.148743L78.069000 86.178314L74.059143 86.178314L74.059143 74.148743L66.039429 74.148743L66.039429 86.178314Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M62.029572 70.138885L62.029572 53.297485L90.098572 53.297485L90.098572 70.138885L86.088715 70.138885L86.088715 58.109314L78.069000 58.109314L78.069000 70.138885L74.059143 70.138885L74.059143 58.109314L66.039429 58.109314L66.039429 70.138885Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M62.029572 54.099457L62.029572 37.258057L90.098572 37.258057L90.098572 54.099457L86.088715 54.099457L86.088715 42.069885L78.069000 42.069885L78.069000 54.099457L74.059143 54.099457L74.059143 42.069885L66.039429 42.069885L66.039429 54.099457Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M62.029572 38.060028L62.029572 21.218628L90.098572 21.218628L90.098572 38.060028L86.088715 38.060028L86.088715 26.030457L78.069000 26.030457L78.069000 38.060028L74.059143 38.060028L74.059143 26.030457L66.039429 26.030457L66.039429 38.060028Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M62.029572 94.198029L62.029572 85.376343L90.098572 85.376343L90.098572 94.198029Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M62.029572 20.416656L76.064072 14.000885L90.098572 20.416656Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
</g>
 <g id="HOR">
  <g transform="rotate(-8)">
  <path d="M50.870865 69.318268C43.230652 70.545258,38.032272 62.381897,37.437347 53.514130C36.584732 40.805237,42.730423 13.638641,53.241486 14.003784C64.160416 14.383118,63.657928 40.481644,61.143555 53.514130C59.786270 60.549240,57.585922 68.239868,50.870865 69.318268Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M39.412857 91.048950L39.412857 95.000000L43.363907 95.000000L59.168045 95.000000L59.168045 91.048950L55.216995 91.048950Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M47.314926 95.000000L51.265976 95.000000L51.265976 91.048950L51.265976 59.440674L47.314926 59.440674L47.314926 63.391724Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M25.584244 69.318268C17.944031 70.545258,12.745651 62.381897,12.150726 53.514130C11.298111 40.805237,17.443802 13.638641,27.954865 14.003784C38.873795 14.383118,38.371307 40.481644,35.856934 53.514130C34.499649 60.549240,32.299301 68.239868,25.584244 69.318268Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M14.126236 91.048950L14.126236 95.000000L18.077286 95.000000L33.881424 95.000000L33.881424 91.048950L29.930374 91.048950Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M22.028305 95.000000L25.979355 95.000000L25.979355 91.048950L25.979355 59.440674L22.028305 59.440674L22.028305 63.391724Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M76.157486 69.318268C68.517273 70.545258,63.318893 62.381897,62.723969 53.514130C61.871353 40.805237,68.017044 13.638641,78.528107 14.003784C89.447037 14.383118,88.944550 40.481644,86.430176 53.514130C85.072891 60.549240,82.872543 68.239868,76.157486 69.318268Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M64.699478 91.048950L64.699478 95.000000L68.650528 95.000000L84.454666 95.000000L84.454666 91.048950L80.503616 91.048950Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  <path d="M72.601547 95.000000L76.552597 95.000000L76.552597 91.048950L76.552597 59.440674L72.601547 59.440674L72.601547 63.391724Z" style="fill: rgb(0.000000%,0.000000%,0.000000%);stroke: none;"></path>
  </g></g>
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