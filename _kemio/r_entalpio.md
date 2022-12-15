---
layout: laborfolio
title: Entalpio
chapter: "3.1.2"
next_ch: r_ekvilibro
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - k_formentalpio-0a
  - svg-0c
---

... paĝo en preparo...

<!--
La t.n. termodinamikaj fenomenoj ene de iu sistemo estas determinitaj de la interagoj en mikroskopa skalo inter la eroj de la substancoj: la movoj rektaj, rotaciaj, svingaj, la elektromagnetaj itneragoj, la ĥemiaj ligoj. Sed tiujn interagojn oni ne povas simple observi pro ilia malgrandeco, rapideco kaj multeco. Aliflanke, se enestas en la sistemo nur eroj (atomoj, jonoj, molekuloj) de sama aŭ malmultaj specoj, la interefikoj en makroskopa skalo sumiĝas al grandoj, kiujn oni povas mezuri: temperaturo, premo, volumeno. La homoj trovis vojojn dedukti de tiuj makroskopaj mezureblaj grandoj, kio okazas en mikroskopa skalo. Kaj ili ankaŭ elpensis matematikajn modelojn por priskribi la makroskopan konduton de termodinamika sistemo surbaze de mezureblaj kaj kalkuleblaj grandoj.

Gravaj aspektoj de ĥemiaj reakcioj estas ankaŭ priskribeblaj per termodinamikaj modeloj kaj grandoj, i.a. la estiĝanta aŭ konsumiĝanta varmo dum reakcio, ŝanĝoj de materistato (solida, likva, gasa), ŝanĝoj de volumeno. 
-->

Antaŭ fari eksperimenton de ĥemia reakcio estas bone scii, kiom da varmo estiĝos aŭ konsumiĝos, jam por eviti katastrofajn rezultojn. Ĉiu substanco enhavas energion konservitan en la movoj rektaj, rotaciaj, svingaj, la elektromagnetaj interagoj, la ĥemiaj ligoj. Kiam la kondiĉoj kaj ena strukturo ŝanĝiĝas, parto de tiu energio povas liberiĝi kiel varmo; aŭ inverse, varmo povas konsumiĝi altigante la enan energion de la substancoj. La *enan energion* U oni ne povas facile mezuri, sed kiam dum reakcio la sistemo, en kiu ĝi okazas, interŝanĝas varmon kun la ĉirkaŭo oni scias, ke parto de tiu varminterŝanĝo rezultiĝas en aŭ el ŝanĝo de la ena energio kaj alia parto estas volumena laboro esprimata per la produkto de premo kaj volumeno pV. Ekezmple, se estiĝæs gaso, la volumeno konsiderinde grandiĝas. La sumon de ambaŭ oni nomas *entalpio*:

$$H = U + pV$$

Ĉar oni ne povas mezuri U kaj H absolute oni helpas sin per la diferenco. Multaj ĥemiaj reakcioj okazas ĉe konstanta premo, la atmosfera premo, kaj tiel oni povas apliki la ekvacion:

$$\Delta H = \Delta U + p \cdot \Delta V$$

La diferenco $$\Delta H$$ respondas al la aldonita aŭ ricevita varmo.

La entalpio dependas de la stato de io: la substanco, premo, temperaturo, sed ne la vojo, lau kiu ĝi atingis tiun staton. Per tio oni povas difini norman entalpion por formado de iu ĥemiaĵo el siaj elementoj[^W1]:

| $$\ce{H2O (g)}$$ | $$\pu {-241,83 kJ}$$ |
| $$\ce{H2O (l)}$$ | $$\pu {-285,83 kJ}$$ |
| $$\ce{C2H4 (g)}$$ | $$\pu {+52,47 kJ}$$ |

Ĉi tie *norma* signifas valida por 25°C kaj 100 kPa. *Mola normforma entalpio* $$\Delta H_f^0$$ estas la entalpio por formi unu molon da iu kombinaĵo el la elementoj sub tiaj kondiĉoj, t.e. ne la reakcio devas okazi sub tiuj kondiĉoj, sed la rezulto sub tiuj kondicoj havas la donitan entalpion. La normforman entalpion de  la elementoj ($$\ce{H2, O2, C}$$) oni difinas kiel 0. Negativa entalpio signifas, ke dum la formado liberiĝis varmenergio kaj necesus konsumi varmon por malkombino. Pozitiva entalpio foruzis energion kaj malkombino redonus ĝin.

Tiel oni povas vidi per la supraj nombroj, ke formado de unu molo da likva akvo el hidrogeno kaj oksigeno donas varmenergion de 285,83 kJ; kaj forkonsumiĝas 44 kJ por vaporigi ĝin je 25°C kaj atmosfera premo. Aliflanke por formi unu molon da etileno el karbono kaj hidrogeno forkonsumiĝus 52,47 kJ.


## Teoremo de Hess

Pli ĝenerale validas la teoremo de (Germain Henri) Hess: La norma reakcia entalpio estas la diferenco inter la sumoj de normformaj entalpioj de la produkoj kaj de tiuj de la reakciantoj: 

$$\Delta H_r^0 = \sum_{prod.}{\Delta H^0_f} - \sum_{reakc.}{\Delta H^0_f}$$

<script> 
  // devas respondi la la formato de <svg...> (malsupre)
  ALTO = 900; 
  LARĜO = 300; 

  lanĉe(() => {
 
    const e_kem = Object.keys(Entalpio.normforma);
    const min_max = Entalpio.minmax();
    const svg = ĝi("#entalpioj");

    const fy = -ALTO/(min_max.max-min_max.min);
    //const e0 = min_max.max;
    const _y = (e) => (e - min_max.max)*fy;

    const t0 = SVG.teksto("0 kJ",0,_y(0));
    SVG.aldonu(svg,t0);

    for (i=0; i<40; i++) {
      const kemiaĵo = e_kem[i];
      const entalpio = Entalpio.normforma[kemiaĵo];      

      const x = Math.random()*LARĜO;
      //const rc = SVG.rektangulo(x,y-20,50,30);
      const t = SVG.teksto(Entalpio.format(kemiaĵo),x,_y(entalpio));
      SVG.titolo(t,nombro(entalpio,5,'kJ'));
      SVG.atributoj(t,{filter: "url(#fono)"})
      SVG.aldonu(svg,t);
    }
  });
</script>  

<style>
  svg rect {
    margin: 0.1em;
    fill: cornflowerblue;
  }
</style>  

<svg id="entalpioj"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="300" viewBox="0 0 300 900">
  <defs>
    <filter x="0" y="0" width="1" height="1" id="fono">
      <feFlood flood-color="paleturquoise" result="bg" />
      <feMerge>
        <feMergeNode in="bg"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>    
</svg>

## fontoj
{: .fontoj}

[^W1]: [Enthalpie in isobaren physikalischen und chemischen_Prozessen](https://de.wikipedia.org/wiki/Enthalpie#Enthalpie_in_isobaren_physikalischen_und_chemischen_Prozessen)
