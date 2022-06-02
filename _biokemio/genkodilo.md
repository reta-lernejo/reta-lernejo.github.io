---
layout: laborfolio
title: Genkodilo
js:
  - svg-0b
---

<!-- % https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables -->

<script>
  const kodonoj=[
  ['UAG','⏹','','fino'],
  ['UGA','⏹','','fino'],
  ['UAA','⏹','','fino'],
  ['AUG','⏵','','starto'],
  ['UUU','F','Phe','fenilalanino'],
  ['UUC','F','Phe','fenilalanino'],
  ['UUA','L','Leu','leŭcino'],
  ['UUG','L','Leu','leŭcino'],
  ['CUU','L','Leu','leŭcino'],
  ['CUC','L','Leu','leŭcino'],
  ['CUA','L','Leu','leŭcino'],
  ['CUG','L','Leu','leŭcino'],
  ['AUU','I','Ile','izoleŭcino'],
  ['AUC','I','Ile','izoleŭcino'],
  ['AUA','I','Ile','izoleŭcino'],
  ['AUG','M','Met','metionino'],
  ['GUU','V','Val','valino'],
  ['GUC','V','Val','valino'],
  ['GUA','V','Val','valino'],
  ['GUG','V','Val','valino'],
  ['UCU','S','Ser','serino'],
  ['UCC','S','Ser','serino'],
  ['UCA','S','Ser','serino'],
  ['UCG','S','Ser','serino'],
  ['CCU','P','Pro','prolino'],
  ['CCC','P','Pro','prolino'],
  ['CCA','P','Pro','prolino'],
  ['CCG','P','Pro','prolino'],
  ['ACU','T','Thr','treonino'],
  ['ACC','T','Thr','treonino'],
  ['ACA','T','Thr','treonino'],
  ['ACG','T','Thr','treonino'],
  ['GCU','A','Ala','alanino'],
  ['GCC','A','Ala','alanino'],
  ['GCA','A','Ala','alanino'],
  ['GCG','A','Ala','alanino'],
  ['UAU','Y','Tyr','tirozino'],
  ['UAC','Y','Tyr','tirozino'],
  ['CAU','H','His','histidino'],
  ['CAC','H','His','histidino'],
  ['CAA','Q','Gln','glutamino'],
  ['CAG','Q','Gln','glutamino'],
  ['AAU','N','Asn','asparagino'],
  ['AAC','N','Asn','asparagino'],
  ['AAA','K','Lys','lizino'],
  ['AAG','K','Lys','lizino'],
  ['GAU','D','Asp','asparaginacido'],
  ['GAC','D','Asp','asparaginacido'],
  ['GAA','E','Glu','glutaminacido'],
  ['GAG','E','Glu','glutaminacido'],
  ['UGU','C','Cys','cisteino'],
  ['UGC','C','Cys','cisteino'],
  ['UGG','W','Trp','triptofano'],
  ['CGU','R','Arg','arginino'],
  ['CGC','R','Arg','arginino'],
  ['CGA','R','Arg','arginino'],
  ['CGG','R','Arg','arginino'],
  ['AGU','S','Ser','serino'],
  ['AGC','S','Ser','serino'],
  ['AGA','R','Arg','arginino'],
  ['AGG','R','Arg','arginino'],
  ['GGU','G','Gly','glicino'],
  ['GGC','G','Gly','glicino'],
  ['GGA','G','Gly','glicino'],
  ['GGG','G','Gly','glicino']
  ];

  function kodon_mlg(L) {
    for (let k of kodonoj) {
      if ( k[1] == L ) return k.slice(2);
    }
  }

  function kodon_amino(kod) {
    for (let k of kodonoj) {
      if ( k[0] == kod ) return k;
    }
  }

  function kodon_trioj(L) {
    let tj = [];
    for (let k of kodonoj) {
      if ( k[1] == L ) tj.push(k[0]);
    }
    return tj;
  }

  function starto() {
    const k1 = document.getElementById("k1");
    const k2 = document.getElementById("k2");
    const k3 = document.getElementById("k3");

    nukle_emfazo(k1,k1.querySelector(".A"));
    nukle_emfazo(k2,k2.querySelector(".U"));
    nukle_emfazo(k3,k3.querySelector(".G"));

    const t = trio('A','U','G');
    const trioj = document.getElementById("trioj");
    SVG.malplenigu(trioj);
    SVG.aldonu(trioj,t);
  }

  function trio(k1,k2,k3) {
    const px = {
      U: 178, C: 178+30, A:178+60, G: 178+90
    };
    const py = [67,105,142];

    const g = SVG.grupo('',"trio");
    const c1 = SVG.cirklo(px[k1],py[0],1.67);
    const c2 = SVG.cirklo(px[k2],py[1],1.67);
    const c3 = SVG.cirklo(px[k3],py[2],1.67);
    const p = SVG.pado(`M${px[k1]} ${py[0]}L${px[k2]} ${py[1]}L${px[k3]} ${py[2]}`);
    SVG.atributoj(p,{fill: 'none'});
    
    SVG.aldonu(g,c1,c2,c3,p);
    return g;
  }

  function amino_elekto(event) {      
        const a = event.target;
        if (a.id=="amino") return; // ne permesu elekti la tuton, nur unopajn kvadratojn!
        const g = a.tagName == "g"? a : a.closest("g");

        amino_emfazo(g);
        amino_trioj(g.textContent.trim());
  }

  function amino_trioj(L) {
    const tj = kodon_trioj(L);

    const trioj = document.getElementById("trioj");
    SVG.malplenigu(trioj);

    for (const t of tj) {
      const T = trio(...t.split(''));
      SVG.aldonu(trioj,T);
    }
  }

  function amino_emfazo(g) {
        // emfazu
        const amino = document.getElementById("amino");
        amino.querySelectorAll("g").forEach((el) => {el.classList.remove("emfazo")});
        g.classList.add("emfazo");

        // montru nomon kaj mlg de aminacido
        const kodilo = document.getElementById("genkodilo");
        const L = g.textContent.trim();
        // kiu kodono?
        const kodon = kodon_mlg(L);
        const aa_nomo = kodilo.querySelector("#nomo_mlg .aa_nomo text");
        const aa_mlg = kodilo.querySelector("#nomo_mlg .aa_mlg text");
        aa_nomo.textContent=kodon[1];
        aa_mlg.textContent=kodon[0];
  }

  function nukle_elekto(event) {
        const a = event.target;
        if (a.id=="k1" || a.id=="k2" || a.id=="k3") return; // ne permesu elekti la tuton, nur unopajn kvadratojn!
        const g = a.tagName == "g"? a : a.closest("g");
        // emfazu
        const kg = event.currentTarget;
        nukle_emfazo(kg,g);
  }

  function nukle_emfazo(kg,g) {
        kg.querySelectorAll("g").forEach((el) => {el.classList.remove("emfazo")});
        g.classList.add("emfazo");

        // trovu la aminacidon, kiu estas aktuale kodita per la kodonoj
        const k1 = document.querySelector("#k1 .emfazo");
        const k2 = document.querySelector("#k2 .emfazo");
        const k3 = document.querySelector("#k3 .emfazo");
        const kod = k1 && k2 && k3? k1.textContent.trim() + k2.textContent.trim() + k3.textContent.trim() : '';

        if (kod) {
          const kodon = kodon_amino(kod);
          const L = kodon[1];
          // serĉu la SVG-grupon kun tiu litero...
          let ag;
          const amino = document.getElementById("amino");
          amino.childNodes.forEach((el) => {
            if (el.textContent.trim() == L) ag=el;
          })
          amino_emfazo(ag);
        }
  }

  window.onload = () => {
      document.getElementById("amino").addEventListener("click",amino_elekto);
      document.getElementById("k1").addEventListener("click",nukle_elekto);
      document.getElementById("k2").addEventListener("click",nukle_elekto);
      document.getElementById("k3").addEventListener("click",nukle_elekto);
      starto();
  };

</script>

<svg xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    stroke="black" 
    width="240" height="302"
    id="genkodilo"
>


    <style type="text/css">
    <![CDATA[
        svg>g {
            text-rendering: geometricPrecision;
            shape-rendering: geometricPrecision;
            stroke-linecap: butt;
            stroke-miterlimit: 1.45;
            transform: translate(-104px,-37px); /* matrix(1, 0, 0, 1, -104, -37); */
            cursor: pointer;
        }
        text {
            font-family: sans-serif;
            font-size: 18px;
            stroke: none;
        }
        #amino g:hover rect {
          stroke: darkred;
          stroke-dasharray: 3,2;
          stroke-width: 2px;
          /*fill: rgba(124,124,124,0.2);*/
          fill-opacity: 0.5;
        }
        .emfazo {
          stroke-dasharray: 3,2;
          stroke-width: 2px;
          fill-opacity: 0.6;
        }
        .emfazo text {
          font-weight: bold;
        } 
        .trioj {
          stroke: rgba(100,100,190,0.75);
          stroke-width: 2.4px;
        }
        .U text, .C text, .A text, .G text {
            font-weight: bold;
        }
        .U rect {
            fill: rgb(204,255,204);            
        } 
        .C rect {
            fill: rgb(255,255,153);
        }
        .A rect {
            fill: rgb(255,204,153);
        }
        .G rect {
            fill: rgb(204,255,255);
        }
        .aa_nomo rect, .aa_mlg rect {
            fill: rgb(255,204,0);
        }
        .start_stop rect {
            fill: mintcream;
        }
        .nepolusa rect {
            fill: palegoldenrod;
        }
        .polusa rect {
            fill: rgb(153,204,0);
        }
        .acida rect {
            fill: rgb(255,153,204);
        }
        .baza rect {
            fill: rgb(153,204,255);
        }
    ]]>
  </style> 

  <!--
    <g fill="none">
      <rect x="104" width="240" height="302" y="37" stroke="none"/>
    </g>
    -->

  <g id="k1">
    <g class="U">
      <rect x="163" width="30" height="30" y="52"/>
      <text x="170.6919" y="73.2314">U</text>
    </g>
    <g class="C">
      <rect x="193" width="30" height="30" y="52"/>
      <text x="201.395" y="73.2314">C</text>
    </g>
    <g class="A">
      <rect x="223" width="30" height="30" y="52"/>
      <text x="231.0347" y="73.2314">A</text>
    </g>
    <g class="G">
      <rect x="253" width="30" height="30" y="52"/>
      <text x="260.6128" y="73.2314">G</text>
    </g>
  </g>

  <g id="k2">
    <g class="U">
      <rect x="163" width="30" height="30" y="90"/>
      <text x="170.6919" y="111.2314">U</text>
    </g>
    <g class="C">
      <rect x="193" width="30" height="30" y="90"/>
      <text x="201.395" y="111.2314">C</text>
    </g>
    <g class="A">
      <rect x="223" width="30" height="30" y="90"/>
      <text x="231.0347" y="111.2314">A</text>
    </g>
    <g class="G">
      <rect x="253" width="30" height="30" y="90"/>
      <text x="260.6128" y="111.2314">G</text>
    </g>
  </g>

  <g id="k3">
    <g class="U">
      <rect x="163" width="30" height="30" y="128"/>
      <text x="170.6919" y="149.2314">U</text>
    </g>
    <g class="C">
      <rect x="193" width="30" height="30" y="128"/>
      <text x="201.395" y="149.2314">C</text>
    </g>
    <g class="A">
      <rect x="223" width="30" height="30" y="128"/>
      <text x="231.0347" y="149.2314">A</text>
    </g>
    <g class="G">
      <rect x="253" width="30" height="30" y="128"/>
      <text x="260.6128" y="149.2314">G</text>
    </g>
  </g>

  <g id="trioj" class="trioj">
  </g>

  <g id="nomo_mlg">
    <g class="aa_nomo">
      <rect x="119" y="166" width="150" rx="4" ry="4" height="30"/>
      <text x="129.8838" y="187.2314" stroke="none" xml:space="preserve">glutaminacido</text>
    </g>
    <g class="aa_mlg">
      <rect x="269" y="166" width="60" rx="4" ry="4" height="30"/>
      <text x="283.8213" y="187.2314" stroke="none" xml:space="preserve">Glu</text>
    </g>
  </g>

  <g id="amino">
    <g class="start_stop">
      <rect x="299" width="30" height="30" y="204"/>
      <text x="306.7578" y="225.2314" stroke="none" xml:space="preserve">⏹</text>
    </g>
    <g class="start_stop">
      <rect x="119" width="30" height="30" y="204"/>
      <text x="126.7578" y="225.2314" stroke="none" xml:space="preserve">⏵</text>
    </g>

    <g class="nepolusa">
      <rect x="149" width="30" height="30" y="204"/>
      <text x="158.8232" y="225.2314" stroke="none" xml:space="preserve">F</text>
    </g>
    <g class="nepolusa">
      <rect x="179" width="30" height="30" y="204"/>
      <text x="188.9858" y="225.2314" stroke="none" xml:space="preserve">L</text>
    </g>
    <g class="polusa">
      <rect x="209" width="30" height="30" y="204"/>
      <text x="218.2871" y="225.2314" stroke="none" xml:space="preserve">S</text>
    </g>
    <g class="polusa">
      <rect x="239" width="30" height="30" y="204"/>
      <text x="248.5024" y="225.2314" stroke="none" xml:space="preserve">Y</text>
    </g>
    <g class="polusa">
      <rect x="269" width="30" height="30" y="204"/>
      <text x="277.7158" y="225.2314" stroke="none" xml:space="preserve">C</text>
    </g>

    <g class="nepolusa">
      <rect x="149" width="30" height="30" y="234"/>
      <text x="155.1011" y="255.2314" stroke="none" xml:space="preserve">W</text>
    </g>
    <g class="nepolusa">
      <rect x="179" width="30" height="30" y="234"/>
      <text x="188.5728" y="255.2314" stroke="none" xml:space="preserve">P</text>
    </g>
    <g class="baza">
      <rect x="209" width="30" height="30" y="234"/>
      <text x="217.2324" y="255.2314" stroke="none" xml:space="preserve">H</text>
    </g>
    <g class="polusa">
      <rect x="239" width="30" height="30" y="234"/>
      <text x="246.916" y="255.2314" stroke="none" xml:space="preserve">Q</text>
    </g>
    <g class="baza">
      <rect x="269" width="30" height="30" y="234"/>
      <text x="277.7466" y="255.2314" stroke="none" xml:space="preserve">R</text>
    </g>

    <g class="nepolusa">
      <rect x="149" width="30" height="30" y="264"/>
      <text x="161.3457" y="285.2314" stroke="none" xml:space="preserve">I</text>
    </g>
    <g class="nepolusa">
      <rect x="179" width="30" height="30" y="264"/>
      <text x="186.2349" y="285.2314" stroke="none" xml:space="preserve">M</text>
    </g>
    <g class="polusa">
      <rect x="209" width="30" height="30" y="264"/>
      <text x="218.5024" y="285.2314" stroke="none" xml:space="preserve">T</text>
    </g>
    <g class="polusa">
      <rect x="239" width="30" height="30" y="264"/>
      <text x="247.2676" y="285.2314" stroke="none" xml:space="preserve">N</text>
    </g>
    <g class="baza">
      <rect x="269" width="30" height="30" y="264"/>
      <text x="278.0981" y="285.2314" stroke="none" xml:space="preserve">K</text>
    </g>

    <g class="nepolusa">
      <rect x="149" width="30" height="30" y="294"/>
      <text x="157.8433" y="315.2314" stroke="none" xml:space="preserve">V</text>
    </g>
    <g class="nepolusa">
      <rect x="179" width="30" height="30" y="294"/>
      <text x="187.8433" y="315.2314" stroke="none" xml:space="preserve">A</text>
    </g>
    <g class="acida">
      <rect x="209" width="30" height="30" y="294"/>
      <text x="217.0698" y="315.2314" stroke="none" xml:space="preserve">D</text>
    </g>
    <g class="acida">
      <rect fill="none" x="239" width="30" height="30" y="294"/>
      <text x="248.3135" y="315.2314" stroke="none" xml:space="preserve">E</text>
    </g>
    <g class="nepolusa">
      <rect x="269" width="30" height="30" y="294"/>
      <text x="277.0259" y="315.2314" stroke="none" xml:space="preserve">G</text>
    </g>
  </g>
</svg>
