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
---


<!-- kp.
https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/intermolecular_forces/02imf/imf3.htm

The especially strong intermolecular forces in ethanol are a result of a special class of dipole-dipole forces called hydrogen bonds. This term is misleading since it does not describe an actual bond. A hydrogen bond is the attraction between a hydrogen bonded to a highly electronegative atom and a lone electron pair on a fluorine, oxygen, or nitrogen atom. Because the hydrogen atom is very small, the partial positive charge that occurs because of the polarity of the bond between hydrogen and a very electronegative atom is concentrated in a very small volume. This allows the positive charge to come very close to a lone electron pair on an adjacent molecule and form an especially strong dipole-dipole force.

-->

## dipol-dipol-fortoj
{: .sekcio}

<div id="jmol_dms">
<script type="text/javascript">
  // au uzu inc/glacio_mep.spt kun isosurface off; 
  Jmol._isAsync = true;
  jmol_kesto("jmol_dms",
    "inc/DMS_MEP.spt",
    600,600,
    (app) => { Jmol.script(app,
      'set antialiasDisplay ON'
    )}
  );
</script>
</div>
 
.

## hidrogenpontoj
{: .sekcio}

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
- [akvomoekuloj](#akvo){: #akvo onclick="ekzemplo(event);"}
- [amoniakmolekuloj](#amoniako2){: #amoniako2 onclick="ekzemplo(event);"}
- [inter akvo kaj amoniako](#amoniako){: #amoniako onclick="ekzemplo(event);"}

<script>

  const H2O_1 = [["O^δ-","3-A-a:a:"],["H^δ+","3~"],["H^δ+","",1,90+105]];
  const H2O_2 = [["O^δ-","2<A-9:y:"],["H^δ+","",1,90+105-37],["H^δ+","",1,60]];
  const NH3_1 = [["N^δ-","3-5<7>y:"],["H^δ+","3~"],["H^δ+","",1,150],["H^δ+","",1,210]];
  const NH3_2 = [["N^δ-","1-3<5>9:"],["H^δ+"],["H^δ+","",1,30],["H^δ+","",1,150]];

  const ekz = {
    akvo: [H2O_1,H2O_2],
    amoniako: [H2O_1,NH3_2],
    amoniako2: [NH3_1,NH3_2]
  }


  function ekzemplo(event) {
    event.preventDefault();
    frm = event.target.id;

    // malplenigu
    ĝi("#enhavo").textContent = "";

    // desegnu Lewis-strukturon
    svg_fortoj(frm);
  }

  function svg_fortoj(e) {
    lewis = new Lewis(ĝi("#enhavo"));

    //const H2O_2 = [["O",">--::[-52,105,85,85]"],["H","",1,-52],["H","",1,52]];
    const molekuloj = ekz[e];

    lewis.molekulo(molekuloj[0]);
    const m2 = lewis.molekulo(molekuloj[1]); 
    m2.setAttribute("transform","translate(42 0)");
    //lewis.molekulo(H2O_2);
    
  }

  lanĉe(()=>{svg_fortoj("akvo")});
</script>

<style>
/*
  svg {
    stroke-width: 0px;
    background-color: lightblue;
  }
  */

  /* koloroj vd. http://jmol.sourceforge.net/jscolors/#color_H ... */

  g.H * {
    fill: #777777;
  }

  g.O * {
    fill: #FF0D0D;
  }

  g.N * {
    fill: #3050F8;
  }

  g.C * {
    fill: #222222;
  }

  text {
      font-family: helvetica, sans-serif;
      /*
      stroke: black;
      stroke-width: 0.2px;
      */
      font-size: 8px; /* iom pli malgranda ol kutima 10px pro aldono de ŝargoj! */
      text-anchor: middle;
      dominant-baseline: central;
  }
  tspan.sup {
    font-size: 4px;
    font-weight: bold;
  }
  circle {
      fill: black;
  }
  line {
      stroke: black;
      stroke-width: .6;
  }
  line.hponto {
      stroke: black;
      stroke-linecap: round;
      stroke-dasharray: .2,1.8;
      stroke-width: .6;
  }
  path.akojno {
    stroke: black;
    stroke-linecap: round;
    stroke-width: .4;
    fill: black;
  }
  path.mkojno {
    /*stroke: gray;
    stroke-linecap: round;
    stroke-width: 2;*/
    fill: url(#strie);
  }
</style>


<svg id="fortoj"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="480" height="240" viewBox="-30 -30 120 60">
  <defs>
     <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <!--line x1="1" x2="1" y1="0" y2="1" stroke="black" stroke-linecap="square" stroke-width="2"/-->
      <rect width="2" height="1" fill="black" stroke="black" stroke-width="0.6"/>
    </pattern>
  </defs>
  <g id="enhavo"></g>
</svg>

La molekuloj de akvo tiel estas interligitaj per multnombraj hidrogenaj pontoj. Kiam flua akvo glaciiĝas per ĉi tiuj hidrogenpontoj formiĝas kristalo, en kiu po ses akvomelkuloj formas ringon kun la oksigenaj atomoj en la anguloj. Ĉe ĉiu oksigenatomo kuniĝas kvar tiaj ringoj. Neĝflokoj tial cetere havas ses radiojn. 

En pli malvarmaj kondiĉoj, sub -22°C formiĝas ankaŭ aliaj strukturoj.[^W1]

La ringa strukturo ĉirkaŭas relative multe da malplena spaco inter la molekuloj. Kiam glacio degelas, rompiĝas proksimume 15% el la hidrogenpontoj.[^N1] Ili estas tiom fortaj, ke la degelado efektive konsumas multe da energio. Tiam akvomolekuloj povas eniĝi en la antaŭe malplenan spacon, pro kio flua akvo estas 8% pli densa ol glacio. Tio klarigas la unikan econ de glacio naĝi surface de lagoj kaj disrompi konstruaĵojn, kiam flua akvo eniĝas en krevetojn kaj poste glaciiĝas. 

<!-- DEZIRO: modelo, kiu montrus por diversaj temperautroj/premoj/fazoj, kiel akvo
aspektas en molekula skalo -->

<div id="jmol_glacio">
<script type="text/javascript">
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

...

<!-- klarigi rilaton al ...agregataj statoj...  ??? -->

## fontoj

[^W1]: [(de) Eis, Modifikation (glacio, variaĵoj)](https://de.wikipedia.org/wiki/Eis#Modifikationen)
[^N1]: [(en) 	ChemPages, Intermolecular Forces (intermolekulaj fortoj)](https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/intermolecular_forces/02imf/imf3.htm)