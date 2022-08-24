---
layout: laborfolio
title: Perioda sistemo de elementoj
chapter: 1.2
js:
  - folio-0a
  - elementoj-0b
  - atomo-0a
---

Atomojn oni specigas laŭ ilia nombro da protonoj. Tiujn specojn oni nomas *elementoj*.
Ĉiuj elementoj post ilia malkovro ricevis nomon kaj [simbolon](#simbolo){: #simbolo onclick="simbolo(event);"}.

<script>
lanĉe(()=>{
    const el = ĝi("#elisto");
    for (let e=1; e<21; e++) {
        el.append(kreu("span",{class: "kadro"},e))
    }
    el.append("...");
});

function simbolo(event) {
    const el = ĝi("#elisto");
    for (e of el.children) {
        //console.log(e.textContent)
        const n = parseInt(e.textContent);
        if (n) {
            const element = Elemento.nro(n);
            e.textContent = '';
            e.append(
                kreu("sup",{},n),
                kreu("span",{class: "simb"},element.simbolo)
            );
            atributoj(e,{title: element.nomo});
        }
    }
}
</script>
<style>
    #elisto .kadro {
        border: 1px solid black;
        width: 3em;
        height: 2em;
        display: inline-block;
    }
    #elisto .simb {
        font-weight: bold;
        font-size: 18px;
    }
</style>
<div id="elisto"></div>

H: hidrogeno, He: heliumo, Li: litio, Be: berilio, B: boro, C: karbono,
N: nitrogeno, O: oksigeno, F: fluoro, Ne: neono ktp.

## perioda sistemo de elementoj
{: .sekcio}

Montriĝas ke elementoj kun ekvivalenta [distribuo de elektronoj](elektrondistribuo) en la plej altaj orbitaloj havas similajn ĥemiajn ecojn. Elementojn kun similantaj ecoj oni ordigas laŭ kolumnoj,
tiel ricevante tabelon.

La horizontalojn de tiu tabelo oni nomas periodoj, ĉar ili indikas periodan ripetigon
de elementaj ecoj. La nombro de periodo (indikita per romia nombro) respondas al la plej alta okupita elektronŝelo, t.e. la kvantumnombro *n*.

<style>
    #spdf {
        display: grid;
        grid-template-columns: repeat(4,2em);
        grid-template-rows: auto;
        grid-template-areas: "h h h h" "n n n n";
    }
    #spdf .h {
        font-weight: bold;
    }
</style>    
<div id="spdf">
  <span class="h">s</span><span class="h">p</span><span class="h">d</span><span class="h">f</span>
  <span id="o_s">1</span><span id="o_p">-</span><span id="o_d">-</span><span id="o_f">-</span>
</div>

<input type="range" id="elektronoj" style="width: 20em; max-width: 80%" min="1" max="32" value="1" onchange="aktualigo()" oninput="aktualigo()">

<script>
    function aktualigo() {
        let n = ĝi('#elektronoj').value;
        const f = Math.max(n-(2+6+10),0); n-=f;
        const d = Math.max(n-(2+6),0); n-=d;
        const p = Math.max(n-2,0); 
        const s=n-p;
        ĝi("#o_s").textContent = s;
        ĝi("#o_p").textContent = p;
        ĝi("#o_d").textContent = d;
        ĝi("#o_f").textContent = f;

        let cls = "o_s1";
        if (f > 0) cls = `o_f${f}`
        else if (d > 0) cls = `o_d${d}`
        else if (p > 0) cls = `o_p${p}`
        else cls = `o_s${s}`;

        for (const e of ĉiuj("#periodsistemo .elm")) {
            const cl = e.classList;
            if (cl.contains(cls)) cl.add("emfazo")
            else cl.remove("emfazo");
        }
    }


  lanĉe (() => {
    const ps = ĝi("#periodsistemo");
    Elemento.periodsistemo(ps,false);
    aktualigo();
  });
</script>

<style>
  rect {
    fill: none;
    stroke: black;
    stroke-width: .3;
  }

  text {
      font-family: helvetica, sans-serif;
      /*
      stroke: black;
      stroke-width: 0.2px;
      */
  }

  text.etikedo {
      font-size: 4px;
      text-anchor: middle;
      dominant-baseline: central;
  }

  text.smb {
      font-size: 4.8px;
      font-weight: bold;
      text-anchor: middle;
      dominant-baseline: central;
  }

  .emfazo rect {
    fill: #5353FF; /* #9370DB */
  }
  .emfazo text.smb {
    fill: white;
  }

  text.nro {
    font-size: 2.4px;
    font-weight: bold;
    dominant-baseline: hanging;
  }

  text.eneg {
    font-size: 2.4px;
    dominant-baseline: text-bottom;
  }
</style>
<svg id="periodsistemo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="0 0 195 115">
</svg>


Energie ekvilibra stato estas atingita se ĉefa energinivelo estas plenigita per ok elektronoj, do se
la subŝeloj s kaj p estas plenokupitaj. Tio estas la distribuo de noblaj gasoj. Ĉe heliumo tio estas escepte nur du elektronoj ĉar la unua energinivelo havas nur unu s-orbitalon kun kapacito de du elektronoj.

Kun la elemento sekvanta noblan gason, kaj do ekplenigo de la s-orbitalo de la venonta ĉefa energinivelo
komenciĝas nova periodo. 

La plenigo de la s-orbitaloj respondas al la unuaj du ĉefgrupoj en la perioda sistemo. La plenigo de la 
tri p-orbitaloj al la grupoj 13 ĝis 18.

La grupoj 3 ĝis 12 respondas al plenigo de d-orbitaloj, 
dek elektronoj respondas al dek kromgrupoj.

La lantanidoj kaj aktinidoj respondas al la plenigo de la f-orbitaloj (14 elektronoj). Tamen kelkaj el tiu serio
havas iom devian distribuon, kelkaj elektronoj jam okupas la subŝelojn 5d resp. 6d antaŭ plenigi tute
la subŝelojn 4f resp. 5f.

<style>
    #perioda_sistemo {
        display: grid; 
        grid-template-rows: repeat(7,1.5em); 
        grid-template-columns: repeat(19,1.5em);
    }

    #perioda_sistemo_f {
        display: grid; 
        grid-template-rows: repeat(2,1.5em); 
        grid-template-columns: repeat(14,1.5em);
        margin-left: 6em;
        margin-top: 1em;
    }    
    
    #perioda_sistemo span {
        border: 1px solid black;
    }

    #perioda_sistemo .c_prd {
        border: none;
    }

    #perioda_sistemo .c_s {
        background-color: bisque;
    }

    #perioda_sistemo .c_p {
        background-color: darksalmon;
    }

    #perioda_sistemo .c_d {
        background-color: lightblue;
    }

    #perioda_sistemo_f .c_f {
        background-color: moccasin;
        border: 1px solid black;
    }



</style>
<div id="perioda_sistemo"></div>
<div id="perioda_sistemo_f"></div>

<script>
function perioda_sistemo() {
    const ps = ĝi("#perioda_sistemo");
    const ps_f = ĝi("#perioda_sistemo_f");

    function cell(cls, content, style) {
        const cell = kreu("span");
        cell.classList.add(cls);
        if (style) cell.setAttribute("style",style);
        cell.textContent = content;
        return cell;
    }

    const ss = atommodelo.subŝeloIteraciilo();
    let result = ss.next();
    
    while (!result.done) {
        const n = result.value[0];
        const l = result.value[1];
        // nombro de orbitaloj sur subŝelo estas
        // 2 * l + 1, ĉar m: -l..+l
        const n_ele = 2 * (2*l+1);
        nl = atommodelo.subŝelo(result.value);
        //const subs = subŝeloj[l];

        if (l==0) { // Xs
            //komencu novan periodon
            ps.append(cell('c_prd',n,"grid-column-start:1;grid-row-start:"+(n+1)));
        }

        // 1s - orbitalo
        if (nl == "1s") {
            ps.append(cell('c_s','1s',"grid-column-start:2;grid-row-start:2"));
            ps.append(cell('c_s','1s',"grid-column-start:19;grid-row-start:2"));
        // ceteraj s-orbitaloj
        } else if (l==0) { // Xs
            for (let i=0;i<n_ele;i++) {
                ps.append(cell('c_s',nl,"grid-column-start:" + (i+2) + ";grid-row-start:" + (n+1)));
            }
        // p-orbitaloj
        } else if (l==1) { // Xp
            for (let i=0;i<n_ele;i++) {
                ps.append(cell('c_p',nl,"grid-column-start:" + (i+14) + ";grid-row-start:" + (n+1)));
            }
        // d-orbitaloj
        } else if (l==2) { // Xd
            for (let i=0;i<n_ele;i++) {
                ps.append(cell('c_d',nl,"grid-column-start:" + (i+4) + ";grid-row-start:" + (n+2)));
            }        

        // f-orbitaloj
        } else if (l==3) { // Xf
            for (let i=0;i<n_ele;i++) {
                ps_f.append(cell('c_f',nl,"grid-column-start:" + (i+1) + ";grid-row-start:" + (n-3)));
            }
        }

        result = ss.next();
    }

}

perioda_sistemo();
</script>

