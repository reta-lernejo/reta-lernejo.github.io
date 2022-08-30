---
layout: laborfolio
title: Intermolekulaj fortoj
chapter: 2.5
js:
  - folio-0a
  - sekcio-0b 
  - lewis-0c
  - jmol-0a
  - jsmol/JSmol.min
css:
  - lewis-0c  
---

Inter molekuloj kaj atomoj efikas ankaŭ fortoj malpli grandaj ol tiuj de kovalentaj aŭ jonaj ligoj,
tiel nomataj *vandervalsaj fortoj* (nomitaj laŭ la fizikisto Johannes Diderik van der Waals). Ili
malfortiĝas proksimume proporcie de la distanco kun la sesa potenco, alivorte efikas nur mallongdistance.

Ekzemple teniĝas gekoj ĉe surfacoj helpe de kombinitaj elektrostatikaj kaj vandervalsaj fortoj.[^W3]

<!-- kp.
https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/intermolecular_forces/02imf/imf3.htm

The especially strong intermolecular forces in ethanol are a result of a special class of dipole-dipole forces called hydrogen bonds. This term is misleading since it does not describe an actual bond. A hydrogen bond is the attraction between a hydrogen bonded to a highly electronegative atom and a lone electron pair on a fluorine, oxygen, or nitrogen atom. Because the hydrogen atom is very small, the partial positive charge that occurs because of the polarity of the bond between hydrogen and a very electronegative atom is concentrated in a very small volume. This allows the positive charge to come very close to a lone electron pair on an adjacent molecule and form an especially strong dipole-dipole force.


https://www.chemie.de/lexikon/Dipol-Dipol-Kr%C3%A4fte.html
https://www.u-helmich.de/che/lexikon/D/Dipol-Dipol-Wechselwirkung.html


Chlorwasserstoff H-Cl: 1,11
Schwefelwasserstoff H-S-H: 0,97
Bromwasserstoff H-Br: 0,83
Iodwasserstoff H-I: 0,45

CO 0,11
-->

## dipol-dipol-fortoj
{: .sekcio}

Se molekuloj enhavas polusecajn ligojn pro diferencaj elektronegativecoj de ĝiaj atomoj
estiĝas partaj ŝargoj: negativa ĉe la pli elektronegativa atomo kaj pozitiva ĉe la alia.
En simetria molekulo tiuj partaj ŝargoj ekvilibriĝas, sed en aliaj ĝi ŝanĝas la densecon
de la elektronoj en la molekulo kiel tuto tiel, ke estiĝas dipolo.

Inter pluraj molekuloj, kiuj formas tian dipolon do estiĝas elektrostatika forto,
t.e. inter la pozitiva parta ŝargo de unu molekulo kaj la negativa parta ŝargo de 
najbara molekulo. Oni nomas tiun forton do dipol-dipol-forto. Ĝi estas malpli forta
ol la enmolekulaj lig-fortoj, sed ja influas la strukturon de substancoj el tiaj molekuloj, 
ekz. la temperaturo, kiam fluaĵo de tiu substanco gasiĝas. Ju pli fortaj etas dipol-dipol-fortoj,
des pli alta estas la gasiĝas temperaturo.


Ekzemploj:
- [hidrogenklorido](#hidrogenklorido){: #hidrogenklorido onclick="ekz_dipolo(event);"}
- [hidrogensulfido](#hidrogensulfido){: #hidrogensulfido onclick="ekz_dipolo(event);"}

<script>


/*
  // por plibonigi la prezenton de la ŝargoj ni pentras la negativajn al "nevidebla elementsimbolo",
  // libere poziciebla
  const HCl_1 = [["H","3-9+"],["Cl","0:3:6:"],["","9'3~",2.2,90]];
  const HCl_2 = [["H","3-9+"],["Cl","0:3:6:"],["","9'",2.2,90]];
  //const H2S = [["S^δ-","o-k-k:k:"],["H^½δ","",1,45],["H^½δ","",1,135]];
  // por plibonigi la prezenton de la ŝargoj ni pentras ilin al "nevidebla elementsimbolo",
  // libere poziciebla
  const H2S_1 = [["S","o-k-k:k:"],["H","",1,45],["H","",1,135],["","9'",0.2,270],["","9+3~",1.6,90]];
  const H2S_2 = [["S","o-k-k:k:"],["H","",1,45],["H","",1,135],["","9'",0.2,270],["","9+",1.6,90]];

  // const CO_1 = [["C^δ-","3#9:"],["O^δ+","3:9#3~"]];
  // const CO_2 = [["C^δ-","3#9:"],["O^δ+","3:9#"]];
*/

  const HCl_1 = [["H^δ+","3-"],["Cl^δ-","0:3:6:"]];
  const HCl_2 = [["H^δ+","3-9~"],["Cl^δ-","0:3:6:"]];
  //const H2S = [["S^δ-","o-k-k:k:"],["H^½δ","",1,45],["H^½δ","",1,135]];
  // por plibonigi la prezenton de la ŝargoj ni pentras ilin al "nevidebla elementsimbolo",
  // libere poziciebla
  const H2S_1 = [["S^δ-","3-k-k:k:"],["H^δ+","3~"],["H^δ+","",1,180]];
  const H2S_2 = [["S^δ-","3-k-k:k:"],["H^δ+"],["H^δ+","",1,180]];


  const ekzdp = {
    hidrogenklorido: [HCl_1,HCl_2,42],
    hidrogensulfido: [H2S_1,H2S_2,42]
  }


  function ekz_dipolo(event) {
    event.preventDefault();
    frm = event.target.id;

    // malplenigu
    ĝi("#dipolo_enhavo").textContent = "";

    // desegnu Lewis-strukturon
    svg_dipolo(frm);
  }

  function svg_dipolo(e) {
    lewis = new Lewis(ĝi("#dipolo_enhavo"));

    //const H2O_2 = [["O",">--::[-52,105,85,85]"],["H","",1,-52],["H","",1,52]];
    const molekuloj = ekzdp[e];

    lewis.molekulo(molekuloj[0]);
    const m2 = lewis.molekulo(molekuloj[1]); 
    m2.setAttribute("transform",`translate(${molekuloj[2]} 0)`);
    //lewis.molekulo(H2O_2);
    
  }

</script>


<svg id="dipolo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="600" height="140" viewBox="-20 -10 150 35">
  <style>
    <![CDATA[ 
      #dipolo_enhavo line.hponto { stroke: silver; stroke-width: .5; stroke-dasharray: .5 2; } 
    ]]>
  </style>
  <g id="dipolo_enhavo"></g>
</svg>

Elektrostatika potencialo de dimetilsulfido:
<div id="jmol_dms">
<script type="text/javascript" async>
  // au uzu inc/glacio_mep.spt kun isosurface off; 
  //Jmol._isAsync = true;
  lanĉe(()=>{
    jmol_div("jmol_dms",
      "inc/DMS_MEP.spt",
      500,300,
      (app) => { Jmol.script(app,
        'set antialiasDisplay ON'
      )}
    );

    // provu manipuli lingvo-ŝargon de Jmol
    //window.JV.Viewer.appletIdiomaBase = "/kemio/../assets/js/jsmol/xxx";
  // 
  // J.i18n.Language.getLanguageList()
  })
</script>
</div>


## hidrogenpontoj
{: .sekcio}

La elektronegativeco de oksigeno, nitrogeno kaj fluoro aparte diferencaj
de tiu de hidrogeno, kiu siavice estas tre malgranda atomo. Tiel ke la
elektrono de hidrogeno ligita en kovalenta paro kun iu el tiuj tri elementoj
lokiĝas tre distance de la hidrogena nukleo (protono). Tiu ĉi do eksponiĝas
kiel tre forta pozitiva ŝargo. Kiam efikas dipol-dipol-forto inter tiu
pozitiva ŝargo kaj la negativa ŝargo de libera elektronparo de najbara molekulo
(aŭ ĉe grandaj molekuloj, alia parto de la sama molekulo), oni nomas tion hidrogenponto.

Tiaj hidrogenpontoj pro sia forteco povas tre stabiligi molekulan strukturon.
Ili grave rolas ekzemple en la stabila spirala formo de DNA aŭ en la spiralaj kaj faldfoliaj 
strukturoj de peptidoj (proteinoj).

<!--
$$\ce{F−H \bond{~} :F}$$ (161.5 kJ/mol or 38.6 kcal/mol), illustrated uniquely by HF2−, bifluoride

$$\ce{O−H \bond{~} :N}$$ (29 kJ/mol or 6.9 kcal/mol), illustrated water-ammonia

$$\ce{O−H \bond{~} :O}$$ (21 kJ/mol or 5.0 kcal/mol), illustrated water-water, alcohol-alcohol

$$\ce{N−H \bond{~} :N}$$ (13 kJ/mol or 3.1 kcal/mol), illustrated by ammonia-ammonia

$$\ce{N−H \bond{~} :O}$$ (8 kJ/mol or 1.9 kcal/mol), illustrated water-amide


https://pubs.acs.org/doi/10.1021/acsomega.0c04274
Understanding the Hydrogen-Bonded Clusters of Ammonia (NH3)n (n = 3–6): Insights from the Electronic Structure Theory

https://techiescientist.com/does-nh3-have-hydrogen-bonding/

-->

Ekzemploj:
- [akvomolekuloj](#akvo){: #akvo onclick="ekz_hponto(event);"}
- [amoniakmolekuloj](#amoniako2){: #amoniako2 onclick="ekz_hponto(event);"}
- [inter akvo kaj amoniako](#amoniako){: #amoniako onclick="ekz_hponto(event);"}

<script>

  const H2O_1 = [["O^δ-","3-A-a:a:"],["H^δ+","3~"],["H^δ+","",1,90+105]];
  const H2O_2 = [["O^δ-","2<A-9:y:"],["H^δ+","",1,90+105-37],["H^δ+","",1,60]];
  const NH3_1 = [["N^δ-","3-5<7>y:"],["H^δ+","3~"],["H^δ+","",1,150],["H^δ+","",1,210]];
  const NH3_2 = [["N^δ-","1-3<5>9:"],["H^δ+"],["H^δ+","",1,30],["H^δ+","",1,150]];

  const ekzhp = {
    akvo: [H2O_1,H2O_2],
    amoniako: [H2O_1,NH3_2],
    amoniako2: [NH3_1,NH3_2]
  }


  function ekz_hponto(event) {
    event.preventDefault();
    frm = event.target.id;

    // malplenigu
    ĝi("#hponto_enhavo").textContent = "";

    // desegnu Lewis-strukturon
    svg_hponto(frm);
  }

  function svg_hponto(e) {
    lewis = new Lewis(ĝi("#hponto_enhavo"));

    //const H2O_2 = [["O",">--::[-52,105,85,85]"],["H","",1,-52],["H","",1,52]];
    const molekuloj = ekzhp[e];

    lewis.molekulo(molekuloj[0]);
    const m2 = lewis.molekulo(molekuloj[1]); 
    m2.setAttribute("transform","translate(42 0)");
    //lewis.molekulo(H2O_2);
    
  }

  lanĉe(()=>{
    svg_dipolo("hidrogenklorido");
    svg_hponto("akvo")
  });
</script>


<svg id="hponto"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="480" height="160" viewBox="-20 -20 120 40">
 <style type="text/css">
    <![CDATA[      
      path.mkojno {
        stroke: none;
        fill: url(#strie);    
      }
    ]]>
  </style>     
  <defs>
    <!-- https://jenkov.com/tutorials/svg/fill-patterns.html 
    https://www.svgbackgrounds.com/svg-pattern-guide/#tile
    -->
    <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <rect width="2" height="1" fill="black" stroke="black" stroke-width="0.6"/>
    </pattern>
  </defs>
  <g id="hponto_enhavo"></g>
</svg>

La molekuloj de akvo tiel estas interligitaj per multnombraj hidrogenaj pontoj. Kiam flua akvo glaciiĝas per ĉi tiuj hidrogenpontoj formiĝas kristalo, en kiu po ses akvomelkuloj formas ringon kun la oksigenaj atomoj en la anguloj. 
(Neĝflokoj tial cetere havas ses radiojn.) Ĉe ĉiu oksigenatomo kuniĝas kvar tiaj ringoj.
(En pli malvarmaj kondiĉoj, sub -22°C formiĝas ankaŭ aliaj strukturoj.)[^W1]

La ringa strukturo ĉirkaŭas relative multe da malplena spaco inter la molekuloj. Kiam glacio degelas, rompiĝas proksimume 15% el la hidrogenpontoj.[^N1] Ili estas tiom fortaj, ke la degelado efektive konsumas multe da energio. Tiam akvomolekuloj povas eniĝi en la antaŭe malplenan spacon, pro kio flua akvo estas 8% pli densa ol glacio. Tio klarigas la unikan econ de glacio naĝi surface de lagoj; aŭ krevigi konstruaĵojn, kiam flua akvo eniĝas en fendetojn kaj poste glaciiĝas. 

<!-- DEZIRO: modelo, kiu montrus por diversaj temperautroj/premoj/fazoj, kiel akvo
aspektas en molekula skalo -->

<div id="jmol_glacio">
<script type="text/javascript" async>
  // au uzu inc/glacio_mep.spt kun isosurface off; 
  Jmol._isAsync = true;
  jmol_kesto("jmol_glacio",
    "inc/glacio.pdb",
    600,600,
    (app) => { Jmol.script(app,
      'set antialiasDisplay ON; calculate hbonds;'
    )}
  );
</script>
</div>


## London-fortoj
{: .sekcio}

Dipolaj molekuloj en kontakto kun nepolusecaj molekuloj ankaŭ influas ties elektrondensecon. En proksima kontakto la elektronoj evitas la pozitivan partan ŝargon de la dipolo. Tiel la nepoluseca molekulo mem fariĝas dipolo pro indukto. 
Tia induktita dipol-molekulo siavice povas indukti dipolecon en alia nepoluseca molekulo.

Tiele efikas malgrandaj elektrostatikaj fortoj eĉ inter apriore nepolusecaj molekuloj. Tiajn malgrandajn intemolekulajn fortojn oni nomas London-fortoj laŭ la fizikisto
Fritz London.[^W2]

Grandaj atomoj kaj grandaj molekuloj kun multaj elektronoj pli facile polusiĝas kaj aperigas do pli grandajn London-fortojn ol malgrandaj atomoj kaj molekuloj kun malmultaj nukleproksimaj elektronoj.[^N1]

<!-- klarigi rilaton al ...agregataj statoj...  ??? -->


## fontoj
{: .fontoj}

[^W1]: [(de) Eis, Modifikation (glacio, variaĵoj)](https://de.wikipedia.org/wiki/Eis#Modifikationen)
[^N1]: [(en) ChemPages, Intermolecular Forces (intermolekulaj fortoj)](https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/intermolecular_forces/02imf/imf3.htm)
[^W2]: [(de) London-Kraft](https://de.wikipedia.org/wiki/London-Kraft)
[^W3]: [(de) Van-der-Waals-Kräfte](https://de.wikipedia.org/wiki/Van-der-Waals-Kr%C3%A4fte)
