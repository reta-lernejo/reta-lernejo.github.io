/**
 * Utilfunkcio por prepari objekton JMol-Info kun kelkaj aprioraj valoroj...
 * 
 * @param id unika identigilo por la variablo de la aplikaĵeto
 * @param modelo relativa pado al la modeldosiero, ekz 'inc/salo.pdb'
 * @param largho larĝo de la fenestreto en pikseloj
 * @param alto alto de la fenestreto en pikseloj
 * @param kiam_preta funkcio vokata kiam la aplikaĵeto estas preta, tie vi ekz-e povas lanĉi aldonan JMol-skripton kiel Jmol.script(applet,'spacefill 80%');
 */
function jmol_info(id,modelo,largho,alto,kiam_preta) {
    // vd. https://wiki.jmol.org/index.php/Jmol_JavaScript_Object/Info
    return {
        src: modelo,
        width: largho,
        height: alto,
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
        readyFunction: kiam_preta,
        disableJ2SLoadMonitor: true,
        disableInitialConsole: true,
        allowJavaScript: true
    }
}

/**
 * Utilfunkcio por voki JMol kun kelkaj aprioraj valoroj...
 * en via laborfolio vi devas ŝargi ambaŭ:
 * 
 * js:
 *   - jmol0a
 *   - jsmol/JSmol.min
 * 
 * @param id unika identigilo por la variablo de la aplikaĵeto
 * @param modelo relativa pado al la modeldosiero, ekz 'inc/salo.pdb'
 * @param largho larĝo de la fenestreto en pikseloj
 * @param alto alto de la fenestreto en pikseloj
 * @param kiam_preta funkcio vokata kiam la aplikaĵeto estas preta, tie vi ekz-e povas lanĉi aldonan JMol-skripton kiel Jmol.script(applet,'spacefill 80%');
 */
function jmol_kesto(id,modelo,largho,alto,kiam_preta) {
    JsPath = '../assets/js/jsmol/';

    const info = jmol_info(id,modelo,largho,alto,kiam_preta)
    return Jmol.getApplet(id, info);
}

/**
 * Utilfunkcio por voki JMol kun kelkaj aprioraj valoroj...
 * redononte la HTML-enhavon, kiun vi povas al innerHtml de iu elemento (<div)
 * en via laborfolio. En ĝia kapo vi devas ŝargi ambaŭ:
 * 
 * js:
 *   - jmol0a
 *   - jsmol/JSmol.min
 * 
 * @param id unika identigilo por la variablo de la aplikaĵeto
 * @param modelo relativa pado al la modeldosiero, ekz 'inc/salo.pdb'
 * @param largho larĝo de la fenestreto en pikseloj
 * @param alto alto de la fenestreto en pikseloj
 * @param kiam_preta funkcio vokata kiam la aplikaĵeto estas preta, tie vi ekz-e povas lanĉi aldonan JMol-skripton kiel Jmol.script(applet,'spacefill 80%');
 */
 function jmol_html(id,modelo,largho,alto,kiam_preta) {
    JsPath = '../assets/js/jsmol/';

    const info = jmol_info(id,modelo,largho,alto,kiam_preta)
    return Jmol.getAppletHtml(id, info);
}
