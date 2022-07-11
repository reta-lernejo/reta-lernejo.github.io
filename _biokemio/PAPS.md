---
layout: laborfolio
title: PAPS
js:
  - jsmol/JSmol.min
---

<!-- https://chemapps.stolaf.edu/jmol/docs/ 
https://chemapps.stolaf.edu/jmol/docs/#connect
http://openmopac.net/Manual/Individual%20JSmol%20paths/Animations.html
http://molmovdb.org/

https://wiki.jmol.org/index.php/Jmol_JavaScript_Object/Functions
https://wiki.jmol.org/index.php/Lightweight_JSmol
http://wiki.jmol.org/index.php/Jmol_JavaScript_Object

-->

La adenozinkombinaĵo 3′-fosfoadenozin-5′-fosfosulfato kun du fosfat- kaj unu sulfat-grupoj ludas gravan rolon en
la sintezo de karageno kaj heparino aŭ la malvenenigo de damaĝaj substancoj. Tial PAPS ekzemple troviĝas abunde en la hepato de bestoj.

<script type="text/javascript">
//Jmol._isAsync = true;

jmol_isReady = function(applet) {
	document.title = (applet._id + " - Jmol " + Jmol.___JmolVersion)
	Jmol._getElement(applet, "appletdiv").style.border="1px solid white"
}

JsPath = '../assets/js/jsmol/';

// vd. https://wiki.jmol.org/index.php/Jmol_JavaScript_Object/Info
var Info = {
	width: 600,
	height: 600,
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
    //serverURL: "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php",
    //defaultModel: ':caffeine',
    
    // https://wiki.jmol.org/index.php/File_formats/Coordinates
    //https://wiki.jmol.org/index.php/Jmol_JavaScript_Object/Info#Model_loading
    src: "../assets/kem/PAPS_CID_10214.sdf",
	readyFunction: jmol_isReady,
	disableJ2SLoadMonitor: true,
    disableInitialConsole: true,
    allowJavaScript: true
}
var jmolApplet0;

$(document).ready(function() {
  const applet = Jmol.getAppletHtml("jmolApplet0", Info);
  if (applet) document.getElementById("appdiv").innerHTML = applet;
})
</script>

<div id="appdiv"></div>

<!--
<script type="text/javascript" src="https://chemapps.stolaf.edu/jmol/jmol.php?model=C1%3DNC2%3DC%28C%28%3DN1%29N%29N%3DCN2%5BC%40H%5D3%5BC%40%40H%5D%28%5BC%40%40H%5D%28%5BC%40H%5D%28O3%29COP%28%3DO%29%28O%29OS%28%3DO%29%28%3DO%29O%29OP%28%3DO%29%28O%29O%29O&inline&height=600&width=800"></script>
-->