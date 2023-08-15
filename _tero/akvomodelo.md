---
layout: laborfolio
title: Akvomodelo
js:
  - folio-0b
  - sekcio-0b
js-ext:
  - three155
---

<div id="akvomodelo"></div>

<script type="module">

import {Tereno} from '/assets/jsm/tereno-0a.js';

const LARĜO = 600;
const ALTO = 500;

const tereno = new Tereno("akvomodelo",LARĜO,ALTO);


//############### modelo
// krado
tereno.direktlumo();
tereno.ebeno(-0.9, 0x754515, 0.1);
tereno.ebeno(-0.5, 0x2757a3, 0.2);
const s = 0.5;
tereno.pejzaĝo("/tero/inc/tereno_alt.png", "/tero/inc/tereno_klr.png");
tereno.nuboj(0.3,1.1, 0.9,1.0,2);
const pluvo = tereno.precipito(0.1,0.8, 1.8, 0x777788);
tereno.ŝanĝoj = () => pluvo.animacio(); // PLIBONIGU: ĉu la tereno iel povus aŭtomate mem zorgi pri tio?

tereno.animacio();

</script>