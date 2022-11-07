---
layout: laborfolio
title: Unuoj - molo
chapter: 3.1.1
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - elementoj-0d
css:
  - elementoj-0d
---

paĝo en preparo...


En ĥemio estas grave konsideri kvantojn de reakciantoj kaj reakciaj produktoj, ekzemple por scii ekzakte kiom da iu substanco oni devas reakciigi kun alia por ricevi certan kvanton de rezulta substanco.

Kiel baza unuo de kvanto establiĝis la unuo *molo* kaj unuoj derivitaj de ĝi. Unu molo da karbono estas tiom da atomoj de la izotopa speco $$\ce{^{12}C}$$ (t.e. la izotopo kun 6 protonoj kaj 6 neŭtronoj), kiom havas 12 gramoj. Oni elkalkulis, ke tio devas esti $$6,02214076 \cdot 10^{23}$$, t.e 602 triliardoj, atomoj. Tiun nombron oni nomas Avogadro-konstanto kaj ekde 1971 la molo estas baza unuo de SI difinita per tiu konstanto. Natura karbono cetere enhavas ankaŭ 1% da $$\ce{^{13}C}$$ kaj iometete da $$\ce{^{14}C}$$, pro kio unu molo da natura karbono havas mason de 12,011g

Unu molo da hidrogeno $$\ce{H2}$$ estas same multe da atomoj, sed pro la malgrandaj atomoj kun nur unu protono kaj unu elektrono, havas nur 2,016g. Unu molo da oksigeno $$\ce{O2}$$ respondas al 32g. Sekve, unu molo da akvo, kies molekuloj konsistas el po du hidrogenatomoj kaj unu oksigenatomo, havas 18,02g. Tiel oni povas scii, ke reakcio de du moloj da hidgrogeno $$\ce{H2}$$ kun unu molo da oksigeno $$\ce{O2}$$ rezultas en du moloj da akvo.

<!-- molo, ... mol/l, M (moloblo)... koncentriteco -->


<script>

  lanĉe (() => {
    // kreu SVG de perioda sistemo
    const ps = ĝi("#periodsistemo");

    // ŝargu apartan element-tabelon kun oksidnombroj...
    Elemento.json_element_tabelo(() => {
        Elemento.periodsistemo(ps,Elemento.AMAS,
        (de_smb,al_smb) => {
            malemfazo(ĝi(`#ps_${de_smb}`));
            if (al_smb) emfazo(ĝi(`#ps_${al_smb}`));
        });
    });

  });
</script>

<style>
  .emfazo1 rect {
    fill: #cceeFF;
  }
  .emfazo2 rect {
    fill: #89CFF0;
  }
  .emfazo3 rect {
    fill: #5353FF; /* #9370DB */
  }
  .emfazo3 text.smb, .emfazo3 text.eneg {
    fill: white;
  }
  .emfazo4 rect {
    fill: #bbbbEE;
  }
  .emfazo5 rect {
    fill: #e0e0FF;
  }
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