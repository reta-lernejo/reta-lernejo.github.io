---
layout: laborfolio
title: Karnot-ciklo
js:
  - folio-0b
  - sekcio-0b  
  - mathjax/es5/tex-chtml
  - diagramo-0a 
  - f_karnotciklo-0a
---

... paĝo en preparo ...

<!--
https://de.wikipedia.org/wiki/Carnot-Prozess

-->

<canvas id="karnot" width="400" height="400"></canvas>
<canvas id="pV_dgr" width="400" height="400"></canvas>
<canvas id="TS_dgr" width="400" height="400"></canvas>

<script>

const karnot = document.getElementById("karnot");
const modelo = new Diagramo(karnot);


/**
 * Pentras la piŝton kaj medion de la Karnot-modelo
 */
function modelo_pentru() {
    modelo.viŝu(); // ĉu necesas ĉiufoje?

    // medio
    // koloro laŭ temperaturo...
    modelo.rektangulo(80,20,140,380,"#c11");
    modelo.linio(80,20,80,400);
    modelo.linio(80,400,220,400);
    modelo.linio(220,20,220,400);

    // gasujo
    modelo.rektangulo(100,20,100,300,"#fff");
    modelo.linio(100,20,100,320);
    modelo.linio(100,320,200,320);
    modelo.linio(200,20,200,320);

    // piŝto
    //modelo.linio(101,200,199,200,"#bbb",10);
    modelo.rektangulo_h3k(101,200,98,10,"#eee","#bbb","#999");
    modelo.rektangulo_h3k(120,200-80,60,80,"#eee","#bbb","#999");

}    


modelo_pentru();

</script>