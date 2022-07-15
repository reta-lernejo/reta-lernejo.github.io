---
layout: laborfolio
title: Aminacidoj
js:
  - jsmol/JSmol.min
js-ext:
  - mathjax3  
---


<script type="text/javascript">
//Jmol._isAsync = true;

JsPath = '../assets/js/jsmol/';
Files = {
  alanino: "alanino_CID_5950.sdf",
  arginino: "arginino_CID_6322.sdf",
  asparagino: "asparagino_CID_6267.sdf",
  aspartato: "aspartato_CID_5960.sdf",
  cisteino: "cisteino_CID_5862.sdf",
  glutamino: "glutamino_CID_5961.sdf",
  glutamato: "glutamato_CID_33032.sdf",
  glicino: "glicino_CID_750.sdf",
  histidino: "histidino_CID_6274.sdf",
  fenilalanino: "fenilalanino_CID_6140.sdf",
  izoleucino: "izoleucino_CID_791.sdf",
  leucino: "leucino_CID_6106.sdf",
  lizino: "lizino_CID_866.sdf",
  metionino: "metionino_CID_6137.sdf",
  prolino: "prolino_CID_145742.sdf",
  serino: "serino_CID_5951.sdf",
  treonino: "treonino_CID_6288.sdf",
  triptofano: "triptofano_CID_6305.sdf",
  tirozino: "tirozino_CID_6057.sdf",
  valino: "valino_CID_6287.sdf"
};

// vd. https://wiki.jmol.org/index.php/Jmol_JavaScript_Object/Info
var Info = {
	width: 300,
	height: 200,
  color: "#AFEEEE",
  //language: "eo",
	debug: false,
	use: "HTML5",   // JAVA HTML5 WEBGL are all options
	j2sPath: JsPath + "j2s", // this needs to point to where the j2s directory is.
	//jarPath: JsPath + "jsmol/java",// this needs to point to where the java directory is.
	//jarFile: JsPath + "jsmol/java/JmolAppletSigned.jar",
	// isSigned: true,
	//src: "chymotrypsin.pdb",
	//script: "set background white; wireframe 40; spacefill 120",
	//serverURL: JsPath + "jmol.php",
  serverURL: '',
    //serverURL: "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php",
    //defaultModel: ':caffeine',
    
    // https://wiki.jmol.org/index.php/File_formats/Coordinates
    //https://wiki.jmol.org/index.php/Jmol_JavaScript_Object/Info#Model_loading
    //src: "inc/PAPS_CID_10214.sdf",
	  //readyFunction: jmol_isReady,
	  disableJ2SLoadMonitor: true,
    disableInitialConsole: true,
    allowJavaScript: true
}
//var jmolApplets = {};
var jmolApplet_kondenso;

$(document).ready(function() {
  /*
  for (aa of Object.keys(Files)) {
    const applet = Jmol.getAppletHtml("jmolApplet_"+aa, Object.assign(
      {src:"inc/"+Files[aa]},Info));
    if (applet) document.getElementById("jmol_"+aa).innerHTML = applet;
  }
  */
  

  // montro de kondensreago
  const apl2 = Jmol.getAppletHtml("jmolApplet_kondenso", Object.assign(
      {width: 1000, height: 600},Info));
  if (apl2) document.getElementById("jmol_kondenso").innerHTML = apl2;

  Jmol.script(jmolApplet_kondenso,
    'load FILES "inc/metionino_CID_6137.sdf" "inc/alanino_CID_5950.sdf";set antialiasdisplay true;'
    + 'model all; select 1.1; translateSelected X -80; select 2.1; translateSelected X 80');

  Jmol._persistentMenu = true;

    /*
    https://chemapps.stolaf.edu/jmol/docs/?ver=14.32#atomexpressions
    $ select 1.0 // ĉiuj atomoj de unua dosiero...
    $ select _H,_O
    $ translateSelected X -140.0
    */
  
})
</script>

Aminacidoj estas estas la bazaj konstrueroj de la [proteinoj](proteino). Dudek du el ili estas rekte koditaj per la genetika kodo, sed du el tiuj estas enkorpigitaj nur per aparta tradukmaniero. La dudek normalajn oni nomas *kanonaj proteinogenoj* (proteinkreaj).

<!-- https://en.wikipedia.org/wiki/Amino_acid 

alfo, beto,...
ecoj (hidrofoba, polara, pos., neg....)
kondensigo al proteino
peptid-ligo / ebeneco 

-->

|esperanta nomo|mlg.|lit.|eco|sumformulo|
|-|-|-|
|alanino|Ala|A|h|$$\ce{C3H7NO2}$$|<span id="jmol_alanino"></span>|
|arginino|Arg|R|+|$$\ce{C6H14N4O2}$$|<span id="jmol_arginino"></span>|
|asparagino|Asn|N|p|$$\ce{C4H8N2O3}$$|<span id="jmol_asparagino"></span>|
|aspartato|Asp|D|-|$$\ce{C4H7NO4}$$|<span id="jmol_aspartato"></span>|
|cisteino|Cys|C|s|$$\ce{C3H7NO2S}$$|<span id="jmol_cisteino"></span>|
|glutamino|Gln|Q|p|$$\ce{C5H10N2O3}$$|<span id="jmol_glutamino"></span>|
|glutamato|Glu|E|-|$$\ce{C5H9NO4}$$|<span id="jmol_glutamato"></span>|
|glicino|Gly|G|s|$$\ce{C2H5NO2}$$|<span id="jmol_glicino"></span>|
|histidino|His|H|+|$$\ce{C6H9N3O2}$$|<span id="jmol_histidino"></span>|
|izoleŭcino|Ile|I|h|$$\ce{C6H13NO2}$$|<span id="jmol_izoleucino"></span>|
|leŭcino|Leu|L|h|$$\ce{C6H13NO2}$$|<span id="jmol_leucino"></span>|
|lizino|Lys|K|+|$$\ce{C6H14N2O2}$$|<span id="jmol_lizino"></span>|
|metionino|Met|M|h|$$\ce{C5H11NO2S }$$|<span id="jmol_metionino"></span>|
|fenilalanino|Phe|F|h|$$\ce{C9H11NO2}$$|<span id="jmol_fenilalanino"></span>|
|prolino|Pro|P|s|$$\ce{C5H9NO2}$$|<span id="jmol_prolino"></span>|
|serino|Ser|S|p|$$\ce{C3H7NO3}$$|<span id="jmol_serino"></span>|
|treonino|Thr|T|p|$$\ce{C4H9NO3}$$|<span id="jmol_treonino"></span>|
|triptofano|Trp|W|h|$$\ce{C11H12N2O2}$$|<span id="jmol_triptofano"></span>|
|tirozino|Tyr|Y|h|$$\ce{C9H11NO3}$$|<span id="jmol_tirozino"></span>|
|valino|Val|V|h|$$\ce{C5H11NO2}$$|<span id="jmol_valino"></span>|


La du nekanonaj proteinogenoj estas la sekvaj. Ekzistas aliaj aminacidoj nekodeblaj per la genetika kodo.

|esperanta nomo|mlg.|lit.|eco|sumformulo|
|-|-|-|
|pirolizino|Pyl|O||$$\ce{C12H21N3O3}$$|
|selenocisteino|Sec|U|s|$$\ce{C3H7NO2Se}$$|

Homoj povas genetike sintezi nur 12 aminacidojn. La aliajn ili devas enpreni per nutraĵo.

<!--

- Priskribo de peptidligo / kondensiĝo / baza strukturo kun "spina" parto kaj flankĉeno

/*
Jmol.script(applet,'load FILES "metionino.sdf" "water.sdf" ;display *;’)

https://wiki.jmol.org/index.php/Load/Filter
https://chemapps.stolaf.edu/jmol/docs/#load (load FILES...)
https://wiki.jmol.org/index.php/Coordinate_Systems

https://jmol-users.narkive.com/tChl9uLN/parallel-multiple-model-animation

load files "xxxx" "yyyy"
frame 0.0;display 1.1,2.1

Now create the animation loop yourself. You could have a problem
incrementing floating point numbers, so I would recommend instead:

set echo echoBegin [50 50]
echo [GO]
set echo echoBegin script "!quit;doAnimate"
background echo yellow

set echo echoQuit [120 50]
echo [QUIT]
set echo echoQuit script "!quit"
background echo yellow
set debugscript

function doAnimate()
var nFrames = {1.0}.model.max
for (var i = 1; i < nFrames; i = i + 1)
script inline "display 1." + i + ", 2." + i
delay 0.10
refresh
end for
end function
*/

- Divenludo 1:
   -> montru modelon, divenu la ecojn kiel neg/pos/pol...
   -> montrul elekton de aminacidoj kun tiu eco kun aldona priskribo: simpla, havas sulfuron, aroman ringon k.s.
   -> lernanto divenu la ĝustan el tio, montru bone/malbone divenita

- Filtrilo:
   -> elektu ecojn polara/hidrofoba/aroma ktp: 
   -> kaj montru la aminacidojn , kiuj havas tiujn ecojn
   -> permesu ruli tra la aminacidoj por vidi la modelon.

detaloj:
https://en.wikipedia.org/wiki/Proteinogenic_amino_acid

-->

<div id="jmol_kondenso"></div>
<!-- https://chemapps.stolaf.edu/jmol/docs/ -->
<button onclick="Jmol.script(jmolApplet_kondenso,'console');">komandilo</button>
<button onclick="Jmol.script(jmolApplet_kondenso,'menu');">menuo</button>