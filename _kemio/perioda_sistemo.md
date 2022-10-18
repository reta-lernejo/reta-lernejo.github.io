---
layout: laborfolio
title: Perioda sistemo de elementoj
chapter: "1.2"
js:
  - folio-0b
  - sekcio-0b
  - elementoj-0c
  - atomo-0a
css:
  - elementoj-0a
---

Atomojn oni specigas laŭ ilia nombro da protonoj. Tiujn specojn oni nomas *elementoj*.

## la elementoj
{: .sekcio}

Historiaj malkovroj pri la ĥemiaj elementoj[^C1].

- Daniel Sennert (1618): leĝo pri la konservo de la elementoj: dum ĥemia reakcio elementoj nek perdiĝas nek nove kreiĝas.
- Robert Boyle (1661): elementoj estas primitivaj kaj simplaj nemiksitaj korpoj, kiuj ne enhavas alian korpon. Ili estas ingrediencoj, el kiuj konsistas ĉiuj perfekte miksitaj korpoj.
- Antoine Laurent de Lavoisier (1785): leĝo pri la konservo de la maso: La sumo de la masoj de la reakciantoj egalas al la sumo de la masoj de la reakciaj produktoj.

Kelkaj elementoj jam estas konataj de [antikva tempo](#){: .ref #antikvo}:

<div id="alisto"></div>

Aliaj elementoj eltroviĝis nur ekde la 18a jarcento. Ĉiuj elementoj post ilia scienca [malkovro](#){: .ref #malkovroj} ricevis nomon kaj simbolon (de Berzelius 1814).

<div id="elisto"></div>
(Ni donas la esperantajn nomojn, ne la latinajn.)


<script>
reference((ref) => {
    if (ref == "antikvo") {
        const al = ĝi("#alisto");
        const antikvaj = Elemento.laŭ_jaro().entries();
        // plenigu per la antikvaj la kadretojn...
        for (let e of al.children) {            
            const mk = antikvaj.next().value[1];

            e.innerHTML = '<b>?</b>';
            atributoj(e, { "data": mk[1] });
            kiam_klako(e, (event) => {
                const d = event.currentTarget;
                //const s = d.getAttribute("data");
                const elm = Elemento.smb(mk[1]);
                d.innerHTML = `<i>${elm.nomo}</i> (<span class="simb">${elm.simbolo}</span>)`;
            }); // ...klako            
        }

    } else if (ref == "malkovroj") {
        const el = ĝi("#elisto");
        const malkovroj = Elemento.laŭ_jaro().entries();
        // transsaltu antikvajn...
        let mk = malkovroj.next().value[1];
        while (mk[0] < 1000) {
            // console.log(mk[1]);
            mk = malkovroj.next().value[1];
        };

        // per la nun unuaj plenigu la kadretojn
        for (let e of el.children) {            
            e.innerHTML = `${mk[0]}: <b>?</b>`;
            atributoj(e, { "data": mk[1] });
            kiam_klako(e, (event) => {
                const d = event.currentTarget;
                const s = d.getAttribute("data");
                const elm = Elemento.smb(s);
                const jelm = Elemento.json_elemento(s);
                d.innerHTML = `${jelm.YearDiscovered}: <i>${elm.nomo}</i> (<span class="simb">${elm.simbolo}</span>)`;
            }); // ...klako

            mk = malkovroj.next().value[1];
        } // for

    }
});

lanĉe(()=>{
    const al = ĝi("#alisto");
    for (let e=1; e<13; e++) {
        al.append(kreu("span",{class: "kadro"},e))
    }

    const el = ĝi("#elisto");
    for (let e=14; e<34; e++) {
        el.append(kreu("span",{class: "kadro"},e))
    }
    el.append("...");
});

/*
function malkovro_elementoj() {
    const el = ĝi("#elisto");
    const malkovroj = Elemento.laŭ_jaro().entries();
    for (e of el.children) {
        const mk = malkovroj.next().value;
        e.innerHTML = `${j}: <b>?>/b>`;
        const nomo = Elemento.smb(mk[1]).nomo;
        e.innerHTML = `${mk[0]}: <i>${nomo}</i> (<span class="simb">${mk[1]}</span>)`;
    }
}
*/


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
     #alisto .kadro, #elisto .kadro {
        border: 1px solid black;
        background-color: #cce8ff;
        /* width: 3em;*/
        min-width: 2em;
        height: 2.2em;
        line-height: 2.1em;
        display: inline-block;
        padding-left: .5em;
        padding-right: .5em;
        margin-right: .3em;
        margin-bottom: .5em;
    }
    #alisto .simb, #elisto .simb {
        font-weight: bold;
        font-size: 18px;
        margin: 0;
        padding: 0.1;
    }
</style>


<!--
H: hidrogeno, He: heliumo, Li: litio, Be: berilio, B: boro, C: karbono,
N: nitrogeno, O: oksigeno, F: fluoro, Ne: neono ktp.
-->


## perioda sistemo de elementoj
{: .sekcio}

Montriĝas ke elementoj kun simila [distribuo de elektronoj](elektrondistribuo) en la plej altaj orbitaloj 
havas similajn ĥemiajn ecojn. Elementojn kun similantaj ecoj oni ordigas laŭ kolumnoj,
la *grupoj*, tiel ricevante tabelon.

La horizontalojn de tiu tabelo oni nomas *periodoj*, ĉar ili indikas periodan ripetiĝon
de elementaj ecoj. La periodo (indikita per romia nombro) respondas al la plej alta okupita elektronŝelo, 
t.e. la kvantumnombro *n*.

<style>
    /*
    #spdf {
        display: grid;
        grid-template-columns: repeat(4,2em);
        grid-template-rows: auto;
        grid-template-areas: "h h h h" "n n n n";
    }
    #spdf .h {
        font-weight: bold;
    }
    */

  .emfazo_1 rect {
    fill: #000088 !important;
  }
  .emfazo_1 text {
    fill: white !important;
  }  

</style>    
<div id="spdf">
<!--
  <span class="h">s</span><span class="h">p</span><span class="h">d</span><span class="h">f</span>
  <span id="o_s">1</span><span id="o_p">-</span><span id="o_d">-</span><span id="o_f">-</span>
  -->
</div>

|plej alta ŝelo     |ajna|1 |2 |3 |4 |5 |6 |7 |
{: #distrib_shelo}

<label for="elektronoj">elektronoj:</label> <b><span id="elektronoj_info">iom</span></b>
<input type="range" id="elektronoj" style="width: 20em; max-width: 80%" min="0" max="32" value="1" onchange="aktualigo_ss()" oninput="aktualigo_ss()">

|subŝelo okupita|s|egale jes ne|
|               |p|egale jes ne|
|               |d|egale jes ne|
|               |f| egale jes ne|
{: #distrib_subshelo}


<div id="e_distrib"></div>

<script>
    let elementoj_tab = [];

    function tab_distrib() {
        //const dtab = ĝi("#distrib");

        // ebligu elekton de ŝelo
        const ŝeloj = ĝi("#distrib_shelo tr:first-of-type");
        for (const ch of ŝeloj.children) {
            if (ch !== ŝeloj.children.item(0)) {
                const v = ch.textContent.trim();
                const id = "ŝelo_"+v;
                const checked = (v == 1)? "checked" : "";
                ch.innerHTML = `<input type="radio" id="${id}" name="ŝelo" value="${v}" ${checked}></input><label for="${id}">${v}</label>`;
                kiam_klako(ch,aktualigo_ss);
            }
        }


        // ebligu elekton de subŝelo
        const sŝeloj = ĉiuj("#distrib_subshelo td:nth-child(2)");        
        for (const ch of sŝeloj) {
            const v = ch.textContent;
            ch1 = ch.nextElementSibling;
            let html = '';
            for (opt of ['egale','jes','ne']) {
                const checked = (opt == 'egale')? "checked" : "";
                html += `<input type="radio" id="ss_${v}_${opt}" name="ss_${v}" value="${opt}" ${checked}></input>`
                html += `<label for="ss_${v}_${opt}">${opt}</label>`
            } // for opt
            ch1.innerHTML = html;
        } // for ch
        kiam_klako("#distrib_subshelo input",aktualigo_ss);                    
    }
    

    // aktualigu la emfazon de elementoj elektitaj per ŝelo, subŝelo, elektronnombro
    function aktualigo_ss() {
        const ŝelo = ĝi("input[name='ŝelo']:checked");
        const ss_s = ĝi("input[name='ss_s']:checked");
        const ss_p = ĝi("input[name='ss_p']:checked");
        const ss_d = ĝi("input[name='ss_d']:checked");
        const ss_f = ĝi("input[name='ss_f']:checked");

        function edistr(smb,ŝ,sŝ,ne) {
            if (ŝ == 0 && ne==0 
                && ss_s.value == 'egale' && ss_p.value == 'egale'
                && ss_d.value == 'egale' && ss_f.value == 'egale') { 
                return true;
            }

            return Elemento.e_distr(smb,ŝ,sŝ,ne);

            // en ĉiu alia kazo
            return false;
        }

        let ŝv = 0;
        if (ŝelo && ŝelo.value >= 1 && ŝelo.value <=7) {
            ŝv = ŝelo.value;
        }

        // nombro da maksimuma elektronoj dependas de la ŝelo/periodo 
        const n_e = [32,2,8,8,18,18,32,32][ŝv];
        const enro = ĝi("#elektronoj");
        const einf = ĝi("#elektronoj_info");

        // console.log(ŝv+'-'+sŝv);
        // nombro da elektronoj dependas de la subŝelo...
        // laŭbezone adaptu la maksimumon de elektrono-elektilo
        atributoj(enro,{
            max: n_e, 
            value: Math.min(enro.value,n_e)
        });
        /*
        if (sŝv) {
            enro.removeAttribute("disabled");
        } else {
            enro.setAttribute("disabled","disabled");
        }
        */

        einf.textContent = enro.value == 0? "iom" : enro.value;

        // valoroj por subŝeloj 0: egale, jes: 1, ne: -1
        const ss_val = {jes: 1, ne: -1, egale:0};
        const sŝv = [
            ss_val[ss_s.value],
            ss_val[ss_p.value],
            ss_val[ss_d.value],
            ss_val[ss_f.value]];        

        // trakuru elementojn kaj emfazu laŭ elekto
        for (const e of ĉiuj("#periodsistemo .elm")) {
            const smb = e.id.split('_')[1];
            if (edistr(smb,ŝv,sŝv,enro.value)) {
                emfazo(e);
            } else {
                malemfazo(e);
            }
        }
    }

    // aktualigu la informon pri la elektron-distribu de elektita elemento (teksto)
    function aktualigo_distrib(smb) {
        if (smb) {
            const nomo = Elemento.smb(smb).nomo;
            const distrib = Elemento.e_distribuo(smb)
                .replace(/([spdf])(\d\d?)/g,'$1<sup>$2</sup>');
            ĝi("#e_distrib").innerHTML = `distribuo de <i>${nomo}</i> (<strong>${smb}</strong>): ${distrib}`
        } else {
            ĝi("#e_distrib").textContent = ''; // malplenigu
        }
    }


  lanĉe (() => {
    const ps = ĝi("#periodsistemo");
    Elemento.periodsistemo(ps,false,(de_smb,al_smb) => {
        malemfazo(ĝi(`#ps_${de_smb}`),"emfazo_1");
        aktualigo_distrib(al_smb);                
        if (al_smb) emfazo(ĝi(`#ps_${al_smb}`),"emfazo_1");
    });
    tab_distrib();

    // ŝargu apartan element-tabelon kun elektrondistribuoj...
    Elemento.json_element_tabelo((elmTab) => {
        //valTab = Elemento.laŭ_ŝelo(elmTab);
        elementoj_tab = elmTab;
        aktualigo_ss();
    });
  });
</script>

<style>
  .emfazo rect {
    fill: #5353FF; /* #9370DB */
  }
  .emfazo text.smb {
    fill: white;
  }
</style>
<svg id="periodsistemo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="100%"
    viewBox="0 0 195 115"
    tabindex="0">
</svg>

### klarigoj 

Energie ekvilibra stato estas atingita se ĉefa energinivelo estas plenigita per ok elektronoj, do se
la subŝeloj s kaj p estas plenokupitaj. Tio estas la distribuo de *noblaj gasoj*, plej dekstra kolumno de la grupo 18. 
(Ĉe heliumo tio estas escepte nur du elektronoj ĉar la unua energinivelo havas nur unu s-orbitalon kun kapacito de du elektronoj.)

Kun la elemento sekvanta noblan gason, kaj do ekplenigo de la s-orbitalo de la venonta ĉefa energinivelo
komenciĝas nova *periodo*. 

La plenigo de la s-orbitaloj respondas al la unuaj du ĉefgrupoj en la perioda sistemo. La plenigo de la 
tri p-orbitaloj al la grupoj 13 ĝis 18.

La grupoj 3 ĝis 12 respondas al plenigo de d-orbitaloj, 
dek elektronoj respondas al dek kromgrupoj.

La lantanidoj kaj aktinidoj, ordigitaj (fakte por ne tro larĝigi la tabelon) 
en du vicoj sub la tabelo de la ceteraj elementoj, 
respondas al la plenigo de la sep f-orbitaloj (14 elektronoj). Tamen kelkaj el tiu serio
havas iom devian distribuon, kelkaj elektronoj jam okupas la subŝelojn 5d resp. 6d antaŭ plenigi tute
la subŝelojn 4f respektive 5f.

<style>
    #perioda_sistemo {
        display: grid; 
        grid-template-rows: repeat(7,1.5em); 
        grid-template-columns: repeat(19,1.5em);
    }

    #perioda_sistemo_f {
        display: grid; 
        grid-template-rows: repeat(2,1.5em); 
        grid-template-columns: repeat(15,1.5em);
        margin-left: 4.5em;
        margin-top: 1em;
    }    
    
    #perioda_sistemo span {
        border: 1px solid black;
    }

    #perioda_sistemo span.c_prd,
    #perioda_sistemo_f span.c_prd  {
        border: none;
        text-align: center;
        padding-right: .5em;
    }

    #perioda_sistemo span.c_grp {
        border: none;
        text-align: center;
    }

    /* noblaj gasoj */
    #perioda_sistemo .c_ng {
        border-left: 2px dotted black;
        border-right: 2px dotted black;
    }
    #perioda_sistemo .c_s.c_ng {
        border-top: 2px dotted black;
    }
    #perioda_sistemo span:last-child.c_ng {
        border-bottom: 2px dotted black;
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
    const romia = (n) => { return ['0','I','II','III','IV','V','VI','VII'][n] };

    // grupnumeroj
    for (let g =1; g<=18; g++) {
        const r = (g==1 || g==18)? 1 : ((g>2 && g<13)? 4 : 2);
        ps.append(kreu("span",{
                class: 'c_grp',
                style: `grid-column-start:${g+1};grid-row-start:${r}`
            }, g));
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
            ps.append(kreu("span",{
                class: 'c_prd',
                style: "grid-column-start:1;grid-row-start:"+(n+1)
            }, romia(n)));
        }

        // 1s - orbitalo
        if (nl == "1s") {
            ps.append(kreu("span",{
                class: "c_s",
                style: "grid-column-start:2;grid-row-start:2"
            }, "1s"));
            ps.append(kreu("span",{
                class: "c_s c_ng",
                style: "grid-column-start:19;grid-row-start:2"
            }, "1s"));
        // ceteraj s-orbitaloj
        } else if (l==0) { // Xs
            for (let i=0; i<n_ele; i++) {
                ps.append(kreu("span",{
                    class: 'c_s',
                    style: "grid-column-start:" + (i+2) + ";grid-row-start:" + (n+1)
                }, nl));
            } // for
        // p-orbitaloj
        } else if (l==1) { // Xp
            for (let i=0; i<n_ele; i++) {
                ps.append(kreu("span",{
                    class: i+1 == 6? 'c_p c_ng' : 'c_p',
                    style: "grid-column-start:" + (i+14) + ";grid-row-start:" + (n+1)
                }, nl));
            }
        // d-orbitaloj
        } else if (l==2) { // Xd
            for (let i=0; i<n_ele; i++) {
                ps.append(kreu("span",{
                    class: 'c_d',
                    style: "grid-column-start:" + (i+4) + ";grid-row-start:" + (n+2)
                }, nl));
            }        

        // f-orbitaloj
        } else if (l==3) { // Xf
            // periodo
            ps_f.append(kreu("span",{
                class: 'c_prd',
                style: "grid-column-start:1;grid-row-start:" + (n-3)
            }, romia(n+2)));

            for (let i=0; i<n_ele; i++) {
                ps_f.append(kreu("span",{
                    class: 'c_f',
                    style: "grid-column-start:" + (i+2) + ";grid-row-start:" + (n-3)
                }, nl));
            }
        }

        result = ss.next();
    }
}

perioda_sistemo();
</script>

<h2></h2>
[interatomaj fortoj](atomaj_fortoj){: .sekva_folio}

## fontoj
{: .fontoj}

[^C1]: [(de Atommodell)](https://www.chemie.de/lexikon/Atommodell.html#:~:text=Ein%20Atommodell%20ist%20ein%20Modell,erkl%C3%A4ren%2C%20wurden%20aber%20auch%20komplizierter.)