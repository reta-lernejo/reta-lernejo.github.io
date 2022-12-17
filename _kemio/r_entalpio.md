---
layout: laborfolio
title: Entalpio kaj teoremo de Hess
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

Kiam tiu sumo estas pozitiva, la reakcio foruzas varmon, oni nomas ĝin *varmeniga*, aŭ *endoterma*. Sed kiam la reakcia entalpio estas negativa, la reakcio eligas varmon, oni nomas ĝin *varmeliga*, aŭ *ekzoterma*. 

<script> 
  // devas respondi la la formato de <svg...> (malsupre)
  ALTO = 900; 
  LARĜO = 600; 

  // trovu la ekvaciojn kaj entalpiojn por kemiaĵo
  function ekvacioj(kem) {
      let ekvjHTML = '';
      const f2 = (n) => n.toFixed(2).replace('.',',').replace(/^([0-9])/,'+$1');

      if (kem) {
        const ekvj = Entalpio.ekvacioj_kun(kem);

        if (ekvj) {
          for (const ekv of ekvj) {

            const ej = Entalpio.ekvaciaj_entalpioj(ekv);
            const sumo = ej.reduce((s,e) => e+s,0);

            let Hj = '';
            for (e of ej) {
              Hj += `${f2(e)} `;
            }

            ekvjHTML += '\\(\\ce{'+ekv+'}\\)<br/>\n';
            ekvjHTML += `\\(\\Delta H_r^0 = ${Hj} = \\pu{${f2(sumo)} kJ}\\)<br/><br/>\n`;
          }

        }
      }
      return ekvjHTML;
  }

  /**
   * Desegnas interligojn en la SVG kun kemiaĵo per ekvacioj
   */
  function interligoj(kem) {
    // malplenigu grupon por interligoj
    SVG.malplenigu("ligoj");

    const kmj = Entalpio.ekvaciaj_rilatoj(kem);

    if (kmj) {
      for (const k2 of kmj) {

        const bb1 = ĝi(`[data-frm="${kem}"]`).getBBox();
        const bb2 = ĝi(`[data-frm="${k2}"]`).getBBox();

        let lin;
        if (bb1.y <= bb2.y) { // fakte por '==' ni devus desegni la linion horizontale komparinte ambaŭ x
          linio = SVG.linio(
            bb1.x + bb1.width/2,
            bb1.y + bb1.height,
            bb2.x + bb2.width/2,
            bb2.y)
        } else {
          linio = SVG.linio(
            bb2.x + bb2.width/2,
            bb2.y + bb2.height,
            bb1.x + bb1.width/2,
            bb1.y)
        }
        SVG.aldonu("ligoj",linio);
      }
    }

  }

  // plenigu la diagramon (SVG)
  lanĉe(() => {
    //const min_max = Entalpio.minmax();
    //const min_max = {min: -1530, max: 530}; // tio provizore sufiĉas, ne tro grandigu la tutan skalon...

    // kemiaĵoj por kiuj ni havas ekvaciojn
    const kolekto = Entalpio.el_ekvacioj();
    const min_max = {min: kolekto.min-30, max:kolekto.max+30};
    delete kolekto.min; delete kolekto.max;

    const svg = ĝi("#entalpioj");

    const fy = -ALTO/(min_max.max-min_max.min);
    //const e0 = min_max.max;
    const _y = (e) => (e - min_max.max)*fy;

    // skalo
    const g = SVG.grupo("skalo","skalo");
    let s = Math.ceil(min_max.min/100)*100;
    while (s < min_max.max) {
      const sy = _y(s);
      const sl = SVG.linio(42,sy,50,sy);
      const st = SVG.teksto(s?s:"[kJ] 0",40,sy) ;
      SVG.aldonu(g,sl,st);
      s += 100;
    }
    const l = SVG.linio(45,0,45,min_max.max-min_max.min);
    SVG.aldonu(g,l);
    SVG.aldonu(svg,g);

    // redonu konvenajn xy-koordinatojn laŭ entalpivaloro
    // kaj tekstolarĝo
    function _xy(entalpio, lrĝ) {
      // eltrovu konvenan x-koordinaton evitante interkovrojn
      let x, yx = 0;
      const dx = 9;
      const yi = Math.round(entalpio/150);
      if (xi[yi] && xi[yi]<LARĜO-lrĝ) { // aldonu dekstre en nemalplena linio
        x = xi[yi];
        xi[yi] = x+lrĝ+dx;
      } else if (xi[yi]) { // komencu novan linion
        // KOREKTU: ni devas aŭ tuj dividi xi[yi] pr LARĜO aŭ
        // aldoni yx al xi[yi] iel..
        x = 50;
        yx = 20;
        xi[yi] = x + LARĜO;
      } else { // unua en la linio
        x = 50;
        xi[yi] = 50+lrĝ+dx;
      }

      return {x:x, y:_y(entalpio)+yx};
    }

    // desegnu kemiaĵon en kesto...
    function _kk(kemiaĵo) {

      // la teksto ĉe konvenaj x-y-koordinatoj
      const entalpio = kolekto[kemiaĵo];
      const f_s = Entalpio.format(kemiaĵo);

      // kreu grupon por enhavi tekston kun kadro
      const g = SVG.grupo(); 
      SVG.atributoj(g,{'data-frm': kemiaĵo});
      SVG.aldonu(svg,g);

      const t = SVG.teksto(f_s.formulo); SVG.aldonu(g,t); // koordinatojn ni metos tuj...
      const bb = t.getBBox();
      const pt = _xy(entalpio,bb.width);
      SVG.atributoj(t,{x: pt.x, y: pt.y});
      SVG.titolo(t,f_s.formulo+'('+f_s.stato+'): '+nombro(entalpio,5,'kJ'));

      // kadro ĉirkaŭ la teksto
      const r = SVG.rektangulo(pt.x-2,pt.y-14,bb.width+4,27);
      SVG.atributoj(r,{rx: 3, class: f_s.stato});
      SVG.enŝovu(g,r);

      //const rc = SVG.rektangulo(x,y-20,50,30);
    }

    let xi = {};

    for (const kemiaĵo in kolekto) {
      _kk(kemiaĵo);
    }

    // kreu grupon por ligoj fine, por ke ili aperu super la kemiaĵoj
    const lg = SVG.grupo("ligoj");
    SVG.aldonu(svg,lg);

    // kiam ni klakas sur kemiaĵon, ni montru la ekvaciojn
    // en kiuj ĝi aperas...
    svg.addEventListener("click", (event) => {
      const g = event.target.closest("g");
      const kem = g.getAttribute("data-frm");
      const ediv = ĝi("#ekvacioj");
      // montru rilatojn kun tiu kemiaĵo per ekvacioj
      interligoj(kem);
      // trovu kaj montru ekvaciojn por la elektita kemiaĵo
      const ekvj = ekvacioj(kem);
      if (ekvj) {
        ediv.innerHTML = ekvj;
        // kompostu formulojn
        if (typeof(MathJax) != 'undefined' && MathJax.typeset());
      } else ediv.textContent = '';
    });
    //svg.addEventListener("keydown",(event) => {

  });
</script>  

<style>
  svg rect {
    margin: 0.1em;
    fill: #74a5fD;
    stroke: black;
    stroke-width: 1;
  }

  svg rect.l,
  svg rect.aq {
    stroke-dasharray: 5 2;
    fill: #94c5ff;
  }

  svg rect.g {
    stroke-dasharray: 1 2;
    fill: #a4d5ff;
  }

  svg text {
    font-size: 20px;
    text-anchor: start;
    dominant-baseline: middle;
  }

  svg .skalo text {
    font-size: 16px;
    text-anchor: end;
    dominant-baseline: middle;
  }

  svg line {
    stroke: black;
    stroke-width: 1;
  }
</style>  

<svg id="entalpioj"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="600" viewBox="0 0 600 900"
    tabindex="0">
</svg>

<div id="ekvacioj"></div>

## fontoj
{: .fontoj}

[^W1]: [Enthalpie in isobaren physikalischen und chemischen Prozessen](https://de.wikipedia.org/wiki/Enthalpie#Enthalpie_in_isobaren_physikalischen_und_chemischen_Prozessen)
