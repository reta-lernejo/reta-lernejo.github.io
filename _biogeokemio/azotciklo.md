---
layout: laborfolio
title: Azotociklo
js:
  - puzlo-0b
js-ext:
  - mathjax3
---

<script>

  function simple_hash(str) { 
      for(var a=0,c=str.length;c--;)a+=str.charCodeAt(c),a+=a<<10,a^=a>>6;a+=a<<3;a^=a>>11;return((a+(a<<15)&4294967295)>>>0).toString(16)
  }

  function respondo(event) {
    event.preventDefault();
    const trg = event.target
    const h = trg.id.substring(1);
    const ref = trg.getAttribute("href").substring(1);
    
    if ( h == simple_hash(ref)) {
      // ĉe gusta respondo videbligu la puzleron!
      montru(ref);
    }
  }

  function montru(svg_id) {
      const svg = document.getElementById(svg_id); 
      svg.removeAttribute("style");
      const [s,xi,yi] = svg_id.split('-');
      document.getElementById(`p-${xi}-${yi}`).classList.remove('kashita');
  }

  window.onload = () => {
    const bgimg = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Nitrogen_Cycle-eo.svg/1024px-Nitrogen_Cycle-eo.svg.png";
    const svgpuzlo = new SVGPuzlo("puzzlecontainer","puzzlepieces",4,3,700,500,5,3,21.0);
    svgpuzlo.kreu(bgimg,13,0.04);

   // aranĝu unuopajn disajn puzlerojn
   for (let xi=0;xi<4;xi++) {
     for (let yi=0;yi<3;yi++) {
       const id = `svg-${xi}-${yi}`;
       const sp = document.getElementById(id);
       if (sp) {
         svgpuzlo.puzlero(id,xi,yi,{style: "display: none;"});
         // kaŝu la unuopan puzleron en la tuta puzlo
         document.getElementById(`p-${xi}-${yi}`).classList.add('kashita');
       }
     }
   }

   // post adapto de puzlero ni povas fermi la sekcion
   // alternative ni povus krei la puzlerojn nur kiam malfermiĝas la sekcio
   // atentante ke ni ne duobligas la enhavatajn puzlerojn
   document.getElementById("demandoj").removeAttribute("open");

  }
</script>

<svg id="puzzlepieces"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" viewbox="0 0 0 0"></svg>


{::options parse_block_html="true" /}

<details class="sekcio" id="bazaj-procezoj" open>
  <summary markdown="span">
  Bazaj procezoj
</summary>


Ĉiuj organismoj bezonas azoton (alinome "nitrogeno") por siaj molekuloj kiel nukleacidoj, proteinoj k.a. Sed la plej multaj el ili ne povas uzi la molekulan azoton de la atmosfero, ĉar pro la triobla elektronligo
$$\ce{N#N}$$, necesas multe da energio por disrompo. Aparte plantoj kutime ne povantaj digesti aliajn organismojn bezonas do azoton en alia energie pli favora formo, t.e. kiel amoni-jonoj
$$\ce{NH4+}$$ aŭ nitrato $$\ce{NO3-}$$, kiuj estiĝas kaj en anorganikaj procezoj: sunlumo, fulmoj, vulkanoj kaj de mikroorganismoj.

La bazajn procezojn de la azotociklo oni nomas:

 - [azotfikso](#azotfikso)
 - [nitratigo](#nitratigo)
 - [amoniigo](#amoniigo)
 - [malnitratigo](#malnitratigo)

<!-- https://studyflix.de/biologie/stickstoffkreislauf-2799 -->

## Azotfikso

Ĉe la azotfikso la triobla ligo de la azotmolekuloj estas disrompata kaj la unuopaj azotatomoj ligitaj en molekuloj de amonijonoj aŭ nitrato:

$$\ce{N#N->NH4+}$$

$$\ce{N#N->NO3-}$$

Tio povas okazi ekzemple pro efiko de sunlumo aŭ fulmoj.

Ankaŭ azotfiksaj mikroorganismoj, rizobioj, kapablas tion. Ili formas fortan simbiozon kun fabo, fazeolo, pizo, vicio, trifolio kaj aliaj samfamiliaj plantoj. Sidante ĉe iliaj radikoj ili ricevas la bezonatan energion de la planto kaj redonas la transformitan azoton.


## Nitratigo

Se la grundo aŭ akvejo enhavas surfiĉe da oksigeno (aero), bakterioj povas transformi amonijonojn en du paŝoj al nitrato, kion vegetaĵoj preferas por sia nutrado:

$$\ce{NH4+ -> NO2- -> NO3–}$$

Ankaŭ amoniako estas transformebla la nitrato:

$$\ce{NH3 + 2 O2 -> NO3- + H+ + H2O}$$


## Amoniigo / Mineraligo

Bestoj manĝas kaj digestas vegetaĵojn. La fekaĵo enhavas organikajn kombinaĵojn, kiujn putraj bakterioj kaj fungoj povas malkomponi ĉe kio estiĝas i.a. amoniako ($$\ce{NH3}$$), kiu povas plureagi al amonijonoj ($$\ce{NH4+}$$). Tio kune kun la nitratigo formas la mallongan "internan" ciklon.


## Malnitratigo

Krom vegetaĵoj ankaŭ bakterioj uzas nitraton, aparte en grundo kun manko de aero (oksigeno). Ili reduktas nitraton al nitrito ($$\ce{NO2-}$$) kaj plu al azota monooksido ($$\ce{NO}$$) kaj diazotoksido ($$\ce{N2O}$$ - tiel nomata ridgaso) kaj eventuale eĉ finproduktas molekulan azoton ($$\ce{N2}$$). Tio fermas la longan "eksteran" ciklon.

$$\ce{NO3- -> NO2- -> NO + N2O -> N2}$$


</details>



<details class="sekcio" id="puzlo">
  <summary markdown="span">
  Puzlo
</summary>

Por solvi la tutan puzlon mankas kelkaj puzleroj. 
Trovu ilin per ĝustaj respondoj al la malsupraj [demandoj](#demandoj)!

<svg id="puzzlecontainer"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="700" height="500" 
    viewBox="0 0 1050 750"
    >        
     
    <style type="text/css">
    <![CDATA[

        #puzzlecontainer {
            /*width: 94vw;*/
            position: relative;
            left: calc(-50vw + 60%);
        }

        #tablo {
            stroke: none;
            fill: Gainsboro;
        }

        #fono {
            stroke: none;
            fill: LightBlue;
        }

        .puzlero {
            stroke: #444;
            stroke-width: 1;
            /*            
            stroke-opacity: 0.8
            stroke-dasharray: 5,1;
            fill: none; 
            */
            fill: url(#bildo);
        }

        .puzlero.kashita {
          display: none;
        }

        .puzlero:hover {
            stroke-width: 3;
            stroke: #822;
        }

        .puzlero.elektita {
            stroke-width: 4;
            stroke: #C44;
            stroke-dasharray: 3,2;
            fill: url(#bld_elektita);
            /*fill: gray;*/
        }

    ]]>
  </style>   

  <g id="puzleroj"></g>
</svg>

<a title="Dario Aralezo, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Nitrogen_Cycle-eo.svg">ilustraĵo de la azotciklo: Dario Aralezo, CC BY-SA 4.0, per Wikimedia Commons</a>

</details>

<details class="sekcio" id="demandoj" open>
  <summary markdown="span">
  Demandoj
</summary>


- Kial vivaĵoj bezonas azoton?
  - [ili bezonas ĝin por spirado](#svg-2-1){: #h78475f61 onclick="respondo(event);"}
  - [la organikaj molekuloj, el kiuj vivaĵoj konsistas, enhavas azoton](#svg-2-1){: #h75475e61 onclick="respondo(event);"}
  - ...
  <svg id="svg-2-1" version="1.1"></svg>


- Kial nur malmultaj vivaĵoj uzas la azoton de la atmosfero?
  - [ĉar ili ne kapablas flugi por kolekti sufiĉe](#svg-1-0){: #h8b1d14a5 onclick="respondo(event);"}
  - [ĉar uzi N₂ kostus tro da energio](#svg-1-0){: #h6b1c74b5 onclick="respondo(event);"}
  - [ĉar kombinaĵoj kun hidrogeno aŭ oksigeno estas pli facile uzeblaj](#svg-2-0){: #hcd728582 onclick="respondo(event);"}
  - [ĉar ili povas pli facile povas akiri azoton per radikoj/digestado](#svg-1-0){: #hbb1a7eb2 onclick="respondo(event);"}

  <svg id="svg-1-0" version="1.1"></svg>
  <svg id="svg-2-0" version="1.1"></svg>


- De kie originas la azoto de la atmosfero?
  - [ĝi originas el la kosma gasnubo, el kiu poste fariĝis la planedo Tero](#svg-3-2){: #hcd7b8582 onclick="respondo(event);"}
  - [ĝi eliĝis el vulkanoj dum la historio de la tero](#svg-3-2){: #hcd728562 onclick="respondo(event);"}
  - [la plantoj kaj bestoj elspiras ĝin](#svg-3-1){: #hcd726582 onclick="respondo(event);"}
  - [iuj mikroorganismoj transformas nitraton al molekula azoto](#svg-3-1){: #hd2be8fb2 onclick="respondo(event);"}

  <svg id="svg-3-1" version="1.1"></svg>


</details>