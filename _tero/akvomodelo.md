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
tereno.ebeno(-0.9, 0x754515, 0.1);
tereno.ebeno(-0.5, 0x2757a3, 0.2);
const s = 0.5;
tereno.pejzaĝo("/tero/inc/tereno_alt.png", "/tero/inc/tereno_klr.png");
const pluvo = tereno.precipito(.9,200);


function animate() {
	requestAnimationFrame( animate );

    // movu pluvon
    /*
    const pluv_geom = pluvo.geometry;
    const pluveroj = pluv_geom.getAttribute('position');
    const eroj = pluveroj.array;
    for (let i=0; i<eroj.length; i++) {
        if (i%3 == 1) {
            let y = eroj[i];
            y -= .01;
            if (y<0.5) y = .9;
            eroj[i] = y;
        }
    }
    pluv_geom.setAttribute( 'position', pluveroj);    

    //verticesNeedUpdate = true;
    pluv_geom.rotateY(0.008);
    */

    // rebildigu
	tereno.bildigo.render( tereno.sceno, tereno.kamerao );
}
animate();

</script>