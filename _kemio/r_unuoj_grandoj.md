---
layout: laborfolio
title: Unuoj kaj grandoj
chapter: "3.1.1"
next_ch: r_entalpio
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - elementoj-1a
css:
  - elementoj-1a
---

paĝo en preparo...

## molo kaj mola maso

En ĥemio estas grave konsideri kvantojn de reakciantoj kaj reakciaj produktoj, ekzemple por scii ekzakte kiom da iu substanco devas reakcii kun alia por ricevi certan kvanton de rezulta substanco.

Kiel baza unuo de kvanto establiĝis la unuo *molo* kaj unuoj derivitaj de ĝi. Unu molo da karbono estas tiom da atomoj de la izotopa speco $$\ce{^{12}C}$$ (t.e. la izotopo kun 6 protonoj kaj 6 neŭtronoj), kiom havas 12 gramoj. Oni elkalkulis, ke tio devas esti $$\pu{6,02214076e23 mol-1}$$, t.e 602 triliardoj atomoj. Tiun nombron oni nomas Avogadro-konstanto $$N_A$$ kaj ekde 1971 la molo estas baza unuo de SI difinita per tiu konstanto. 

Natura karbono cetere enhavas ankaŭ 1% da $$\ce{^{13}C}$$ kaj iometete da $$\ce{^{14}C}$$, pro kio unu molo da natura karbono havas la *molan mason* $$M = \pu{12,011 g}$$. Pli ĝenerale la maso de iu ĥemia substanco estas la produkto de ĝia mola maso kaj la kvanto en moloj: 
$$m = M \cdot n$$. La kvanton en moloj de konata substanco kun donita maso $$m$$ oni do ricevas per $$n=\frac{m}{M}$$ [^W1]

Unu molo da hidrogeno $$\ce{H2}$$ havas $$N_a$$ da duatomaj molekuloj. Pro la malgrandaj atomoj kun nur unu protono ĝia maso estas nur $$\pu{2,016 g}$$, dum unu molo da molekula oksigeno $$\ce{O2}$$ havas $$\pu{32 g}$$. Sekve, unu molo da akvo, kies molekuloj konsistas el po du hidrogenatomoj kaj unu oksigenatomo, havas 
$$\pu{18,02 g}$$. Tiel oni scias, ke reakcio de du moloj da hidgrogeno $$\ce{H2}$$ kun unu molo da oksigeno $$\ce{O2}$$ rezultas en du moloj da akvo.



## atoma masunuo kaj molekula maso

La *atoma masunuo* $$\pu{u}$$ estas dekduono de la maso de izotopo $$\ce{^{12}C}$$, t.e.
$$\pu{1 u} = \pu{1,66053906660e-27 kg}$$. La atomaj masoj de la elementoj estas donitaj en la perioda sistemo. Tiel oni povas sumigi tiujn por ricevi la mason de unuopa molekulo $$m_M$$.
La *mola maso*, t.e. la maso de unu molo de tiu substanco, tiam kalkuliĝas el la *molekula maso* per la ekvacio $$M=N_A \cdot m_M$$.


<!-- molo, ... mol/l, M (moloblo)... koncentriteco -->


<script>

  lanĉe (() => {
    // kreu SVG de perioda sistemo
    let elementoj, molekulo = {}, maso = {};

    function aktualigu() {
      const elemento = ĝi("#periodsistemo .emfazo");
      if (elemento) {
        const smb = elemento.id.split('_')[1];
        const e1 = Elementoj.smb(smb);
        const e2 = elementoj.pselementoj[e1.nro-1];
        maso[smb] = e2.maso;
        if (molekulo[smb]) {
          molekulo[smb]++
        } else {
          molekulo[smb] = 1;
        }

        // aktualigu la informon
        let mlk = '', am = 0;
        for (s in molekulo) {
          mlk += s;
          if (molekulo[s] > 1) mlk += `<sub>${molekulo[s]}</sub>`;
          am += molekulo[s] * maso[s];
        }
        const mmaso = ĝi("#mmaso");
        let mm = parseFloat(am).toFixed(2).replace('.',',');
        mmaso.innerHTML = `${mlk}: <i>m<sub>M</sub></i> = ${mm}u; <i>M</i> = ${mm}g`;

      }
    }

    // ŝargu apartan element-tabelon kun oksidnombroj...
    const ps = ĝi("#periodsistemo");

    elementoj = new Elementoj();
    elementoj.ŝargu().then(() => {
      elementoj.periodsistemo(ps,Elementoj.AMAS,
        (de_smb,al_smb) => {
            malemfazo(ĝi(`#ps_${de_smb}`));
            if (al_smb) {
              const el = ĝi(`#ps_${al_smb}`)
              emfazo(el);
              aktualigu();
              prokrastu(() => malemfazo(el),1000);
            }
        });
      }
    );
/*
    Elemento.json_element_tabelo(() => {
        Elemento.periodsistemo(ps,Elemento.AMAS,
        (de_smb,al_smb) => {
            malemfazo(ĝi(`#ps_${de_smb}`));
            if (al_smb) {
              const el = ĝi(`#ps_${al_smb}`)
              emfazo(el);
              aktualigu();
              prokrastu(() => malemfazo(el),1000);
            }
        });
    });
*/
  });
</script>

<div id="mmaso"><i>M</i> = ?g</div>

<style>
  .emfazo rect {
    fill: #000088 !important;
  }
  .emfazo text {
    fill: white !important;
  }  
</style>

<svg id="periodsistemo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="0 0 195 115">
</svg>


<!-- 

## Energio
## Entropio
## Entalpio, normform-entalpio...

-->

## fontoj
{: .fontoj}

[^W1]: [Molare Masse](https://de.wikipedia.org/wiki/Molare_Masse)