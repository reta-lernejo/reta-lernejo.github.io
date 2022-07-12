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
	height: 300,
  color: "#AFEEEE",
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

$(document).ready(function() {
  for (aa of Object.keys(Files)) {
    const applet = Jmol.getAppletHtml("jmolApplet_"+aa, Object.assign(
      {src:"inc/"+Files[aa]},Info));
    if (applet) document.getElementById("jmol_"+aa).innerHTML = applet;
  }

})
</script>

Aminacidoj estas estas la bazaj konstrueroj de la [proteinoj](proteino). Ili estas rekte koditaj per la genetika 
kodo.

La sekvajn dudek oni nomas *kanonaj proteinogenoj*.

<!-- https://en.wikipedia.org/wiki/Amino_acid 

alfo, beto,...
ecoj (hidrofoba, polara, pos., neg....)
kondensigo al proteino
peptid-ligo / ebeneco 

-->

|esperanta nomo|mallongigo|unulitera|sumformulo|
|-|-|-|
|alanino|Ala|A|$$\ce{C3H7NO2}$$|<span id="jmol_alanino"></span>|
|arginino|Arg|R|$$\ce{C6H14N4O2}$$|<span id="jmol_arginino"></span>|
|asparagino|Asn|N|$$\ce{C4H8N2O3}$$|<span id="jmol_asparagino"></span>|
|aspartato|Asp|D|$$\ce{C4H7NO4}$$|<span id="jmol_aspartato"></span>|
|cisteino|Cys|C|$$\ce{C3H7NO2S}$$|<span id="jmol_cisteino"></span>|
|glutamino|Gln|Q|$$\ce{C5H10N2O3}$$|<span id="jmol_glutamino"></span>|
|glutamato|Glu|E|$$\ce{C5H9NO4}$$|<span id="jmol_glutamato"></span>|
|[glicino](https://pubchem.ncbi.nlm.nih.gov/compound/750)|Gly|G|$$\ce{C2H5NO2}$$|<span id="jmol_glicino"></span>|
|[histidino](https://pubchem.ncbi.nlm.nih.gov/compound/6274)|His|H|$$\ce{C6H9N3O2}$$|<span id="jmol_histidino"></span>|
|[izoleŭcino](https://pubchem.ncbi.nlm.nih.gov/compound/791)|Ile|I|$$\ce{C6H13NO2}$$|<span id="jmol_izoleucino"></span>|
|[leŭcino](https://pubchem.ncbi.nlm.nih.gov/compound/6106)|Leu|L|$$\ce{C6H13NO2}$$|<span id="jmol_leucino"></span>|
|[lizino](https://pubchem.ncbi.nlm.nih.gov/compound/866)|Lys|K|$$\ce{C6H14N2O2}$$|<span id="jmol_lizino"></span>|
|metionino|Met|M|$$\ce{C5H11NO2S }$$|<span id="jmol_metionino"></span>|
|[fenilalanino](https://pubchem.ncbi.nlm.nih.gov/compound/6140)|Phe|F|$$\ce{C9H11NO2}$$|<span id="jmol_fenilalanino"></span>|
|prolino|Pro|P|$$\ce{C5H9NO2}$$|<span id="jmol_prolino"></span>|
|serino|Ser|S|$$\ce{C3H7NO3}$$|<span id="jmol_serino"></span>|
|[treonino](https://pubchem.ncbi.nlm.nih.gov/compound/6288)|Thr|T|$$\ce{C4H9NO3}$$|<span id="jmol_treonino"></span>|
|triptofano|Trp|W|$$\ce{C11H12N2O2}$$|<span id="jmol_triptofano"></span>|
|tirozino|Tyr|Y|$$\ce{C9H11NO3}$$|<span id="jmol_tirozino"></span>|
|valino|Val|V|$$\ce{C5H11NO2}$$|<span id="jmol_valino"></span>|


Nekonanaj proteinogenoj estas

|esperanta nomo|mallongigo|unulitera|sumformulo|
|-|-|-|
|pirolizino|Pyl|O|$$\ce{C12H21N3O3}$$|
|selenocisteino|Sec|U|$$\ce{C3H7NO2Se}$$|

