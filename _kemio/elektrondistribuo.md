---
layout: laborfolio
title: Distribuo de elektronoj
chapter: "1.1"
js:
  - folio-0a
  - sekcio-0b 
  - atomo-0a
  - jmol-0a
  - jsmol/JSmol.min  
---


La *atomoj* konsistas el kerno de *protonoj* kaj *neŭtronoj* kaj la *elektronoj* kiuj distribuiĝas ĉirkau la kerno.
Neŭtrala atomo havas sammulte da elektronoj kaj protonoj.


<!--uzi details / summary, ĉu GH-paĝojn ni povas ankaŭ etendi per *.rb?
http://movb.de/jekyll-details-support.html -->

{::options parse_block_html="true" /}


##  La orbitaloj
{: .sekcio}


La elektronoj distribuiĝas laŭ sia energinivelo en *orbitalojn*. Ĉiu orbitalo
povas esti identigita per tri nombroj *n*, *l* kaj *m* kun la sekvaj ecoj:

### precipa kvantumnombro *n*

Ĝi indikas la *ŝelon* kaj estas natura nombro 1, 2, 3 ktp. (Foje oni indikas ĝin ankaŭ per majusklo: K, L, M ktp.)

### kroma kvantumnombro *l*

Ĝi indikas la *subŝelon* (aŭ angulan movokvanton) kaj varias inter 0 kaj *n* - 1. 
La energinivelo de subŝelo kreskas laŭ la sumo *n + l*. Anstataŭ numeroj oni uzas 
minusklojn por nomi la subŝelon: s, p, d, f.

### magneta kvantumnombro *m*

Ĝi varias inter *-l* kaj *l* kaj donas la orbitalon ene de subŝelo.

### spina kvantumnombro *s*

Ĉiu orbitalo povas enhavi maksimume du elektronojn. Ili devas havi distingan *spinon* -1/2 aŭ +1/2,
respektive *supren* aŭ *malsupren*.

Ĉar elektronoj estas fermionoj, ili obeas al la ekskluda principo de *Pauli*, do
du en sama loko ne povas havi saman kvantuman staton kaj tiel klariĝas la distribuo de elektronoj
en la orbitaloj de atomo. Kaj el tio estiĝas la konstruo de la perioda sistemo de elementoj (vidu  pli malsupre).

## ondofunkcioj de orbitaloj
{: .sekcio}

Kie en la atomo troviĝas do la orbitaloj kun la elektronoj? Pli malpli "ĉie kaj nenie".
La kvar supraj nombroj estas parametroj de ondofunkcioj, kiuj priskribas 
la elektronojn kaj donas al ĉiu loko varian probablecon, ke elektrono troviĝas tie. 
La ŝelo kaj subŝelo priskribas energinivelojn. Ju pli alta
ĝi estas, des pli rapide averaĝe moviĝas elektrono kaj des pli verŝajne ĝi troviĝas 
distance de la nukleo, t.e. la centro de la atomo.

<!-- vd. https://chemapps.stolaf.edu/jmol/docs/examples-11/surfacedemos.htm 

donanten n=3,l=2,m=1
isosurface phase atomicOrbital 3 2 1
set axesMolecular;set axesScale 0.5;axes on
moveto 1.0 { 462 -868 -180 47.18} 141
-->

### orbitaloj de hidrogenatomo

Elektu valoron por n/l kaj m malsupre!
<div id="jmol_orbital">
<script type="text/javascript">
  let jmol_orbital_ref;
  lanĉe(()=>{
    jmol_orbital_ref = jmol_div("jmol_orbital",
        "",
        600,600,
        (app) => { Jmol.script(app,
        'set antialiasDisplay ON; isosurface phase atomicOrbital 3 2 1; color isosurface translucent 0.6; set axesMolecular;set axesScale 0.5;axes on; moveto 1.0 { 462 -868 -180 47.18} 141; spin on'
        )}
    );
  });
</script>
</div>


<script>
lanĉe(() => {
    const oe = ĝi("#orb_elekto_nl");
    oe.append('subŝelo (n/l):');

    const ss = atommodelo.subŝeloIteraciilo();
    let result = ss.next();
        
    while (!result.done) {
        const n = result.value[0];
        const l = result.value[1];

        const nl = atommodelo.subŝelo(result.value);
        const inp = kreu("input", {type: "radio", id: `o_${nl}`, name: "o_nl", value: nl});
        const lbl = kreu("label", {for: `o_${nl}`});
        lbl.append(nl+" ");

        if (nl[1] == "s" && n>1) oe.append(" | ");
        if (nl == "5s") oe.append(kreu("br"));
        oe.append(inp,lbl);

        inp.addEventListener("click",(event) => {
            const val = event.target.value;
            const m_max = atommodelo.m_max(val[1]); // m_max = l!
            const om = ĝi("#orb_elekto_m");
            om.textContent = 'm: ';
            // const let n_orbitaloj = 2 * l + 1;
            for (let m_ = -m_max; m_<= m_max; m_++) {
                const _inp = kreu("input", {type: "radio", id: `o_m${m_}`, name: "o_m", value: m_});
                const _lbl = kreu("label", {for: `o_m${m_}`});
                _lbl.append(""+m_+" ");
                _inp.addEventListener("click",orbitalo_elektita);

                om.append(_inp,_lbl);

                if (m_ == 0) {
                    _inp.checked = true;
                    _inp.dispatchEvent(new MouseEvent("click"));
                    //orbitalo_elektita();
                }
            }
        });

        // iru al sekva subŝelo
        result = ss.next();
    }

    function orbitalo_elektita(event) {
        const m = event.target.value;
        const nl = ĝi("input[name='o_nl']:checked").value;

        console.log("nl: "+nl+" m: "+m);

        const n = nl[0];
        const l = atommodelo.m_max(nl[1]); // m_max = l!

        Jmol.script(jmol_orbital_ref, // = jmol_orbital
            `isosurface phase atomicOrbital ${n} ${l} ${m}; color isosurface translucent 0.6;`);
    }

});
</script>

<div id="orb_elekto_nl"/>
<div id="orb_elekto_m"/>

<!-- pli detalaj klarigoj:
https://chemistry.stackexchange.com/questions/95969/what-red-and-blue-area-represent-in-a-orbital-software -->

(En la supra diagramo la surfacoj prezentas la spacon ene de kiu troviĝas elektrono de tiu
orbitalo kun 95%-a probableco. En la blua areo la ondfunkcio estas pozitiva en la ruĝa negativa.
La surfaco foje aperas iom anguleca pro limigo de la prezentoalgoritmo.)

Oni povas uzi analogion de tambura membrano por tiuj ĉi ondofunkcioj.
En tiu analogio la averaĝa distanco de la ripoza stato respondas al la verŝajneco, ke elektrono troviĝas
en tiu pozicio de la centro. La ventroj de staranta ondo membrana do respondas al la eksteraj formoj de la orbitaloj. 
[^W1]



<table>
<tr>
<td>
<a 
  title="MichaelE, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" 
  href="inc/Phi_1s.gif">
  <img width="248" alt="Phi 1s" src="https://upload.wikimedia.org/wikipedia/commons/3/33/Phi_1s.gif">
  n=1, l=s
</a>
</td>
</tr>

<tr>
<td>
<a 
  title="MichaelE, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" 
  href="inc/Phi_2s.gif">
  <img width="248" alt="Phi 2s" src="https://upload.wikimedia.org/wikipedia/commons/1/10/Phi_2s.gif">
  n=2, l=s
</a>
</td>
<td>
<a 
  title="MichaelE, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" 
  href="inc/Phi_2p.gif">
  <img width="248" alt="Phi 2p" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Phi_2p.gif">
  n=2, l=p
</a>  
</td>
</tr>

<tr>
<td>
<a 
  title="MichaelE, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" 
  href="inc/Phi_3s.gif">
  <img width="248" alt="Phi 3s" src="https://upload.wikimedia.org/wikipedia/commons/4/44/Phi_3s.gif">
  n=3, l=s
</a>
</td>
<td>
<a 
  title="MichaelE, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" 
  href="inc/Phi_3p.gif">
  <img width="248" alt="Phi 3p" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Phi_3p.gif">
  n=3, l=p
  </a>
</td>
</tr>
</table>

La membrano havas nur du dimensiojn (ĉar la tria donas la probablecon). Ĉe la atomoj aldoniĝas tria dimensio de spaco. Sed la tranĉbildoj de orbitalfunkcioj efektive tre similas al la ondbildoj de tambura membrano.

Do oni povus imagi al si izolitan atomon kiel globforman tamburan membranon, fiksitan en la centro, kie troviĝas la nukleo kaj kiu ne ĉesas soni. Koncedite, tio estas malfacile, sed eble pli bone ol neniu analogio.


<!-- 
    #orbitaloj H2O 
    http://www.bcbp.gu.se/~orjan/qc/h2o/ 
    http://www.bcbp.gu.se/~orjan/qc/h2o/H2O_14_models_a_SV.xyz

    # CO2
    https://www.staff.ncl.ac.uk/bruce.tattershall/jmolapps/orbitalmethods.html
    https://www.staff.ncl.ac.uk/bruce.tattershall/teaching/chy135/co2mo/co2.40

    # aliaj 
    http://www.bcbp.gu.se/~orjan/molorb/lessons.html
    http://www.bcbp.gu.se/~orjan/molorb/intro/aos.jms
-->


##  Notado laŭ <i>Paŭling</i>
{: .sekcio}


<label for="protonnombro">elemento:</label> <b><span id="element_info">8 - oksigeno (O)</span></b><br>
<input type="range" id="protonnombro" style="width: 50em; max-width: 80%" min="1" max="118" value="8" onchange="aktualigo()" oninput="aktualigo_info()">

La notmaniero laŭ *Pauling* montras la distribuon de la elektronoj en la orbitalojn. La subŝeloj en 
tiu prezento estas aranĝitaj tiel, ke la supraj havas pli altan energinivelon ol la malsupraj.

<style>

    div.titolo {
        font-weight: bold;
    }

    div.subŝelo {
        display: flex;
        justify-content: flex-start;
    }

    div.kaŝita {
        display: none;
    }

    div.subŝelo>:first-child {
        width: 2em; display: inline-block;
    }

    div.orbitaloj {
        display: flex;
        justify-content: center;
        flex-grow: 2;        
    }

    span.orbital {
        display: inline-block; 
        width: 1.2em; 
        text-align: center; 
        border: 1px solid black; 
        margin: 2px; 
        padding: 0 .4em 3px;
    }
</style>

<div id="pauling_inf" style="font-weight: bold;"></div>
<div id="pauling">    
</div>

<script>
    function aktualigo_info() {
        const nro = ĝi('#protonnombro').value;
        ĝi('#element_info').textContent = nro + ' - ' + elemento.nomo_mlg(nro);
    }

    function aktualigo() {
        const nro = ĝi('#protonnombro').value;
        distribuo(+nro);
    }

    // kp https://www.seilnacht.com/Lexikon/psval.htm
    // kaj https://de.wikipedia.org/wiki/Aufbauprinzip

    // krome montru elementonomojn, mallongigitajn notaciojn, periodon kaj blokon/grupon ktp.
    // laŭ https://de.wikipedia.org/wiki/Elektronenkonfiguration

    //const subŝeloj = "spdfghij";

    const esceptoj = {
        24: "3d5 4s1", 42: "4d5 5s1",
        41: "4d4 5s1", 44: "4d7 5s1", 45: "4d8 5s1",
        46: "4d10 5s0", 78: "4f14 5d9 6s1",
        29: "3d10 4s1", 47: "4d10 5s1", 79: "4f14 5d10 6s1",
        57: "5d1 4f0 6s2", 89: "6d1 5f0 7s2", 90: "6d2 5f0 7s2",
        58: "4f1 5d1 6s2", 91: "5f2 6d1 7s2", 92: "5f3 6d1 7s2", 93: "5f4 6d1 7s2",
        64: "4f7 5d1 6s2", 96: "5f7 6d1 7s2" // , 103: "5f14 7s2 7p1"
        }

    const pauling = ĝi("#pauling");

    // distribuo de elektronoj sur orbitaloj de unu subŝelo
    function distr_ss(ss, n_ele) {
        const ldiv = ĝi("#p_"+ss);
        const orbitaloj = ldiv.querySelectorAll('.orbital');
        let n_orb = orbitaloj.length;

        // kaŝu malplenajn subŝelojn...
        if (n_ele) {
            ldiv.classList.remove("kaŝita");
        } else {
            ldiv.classList.add("kaŝita");
        }

        for (let orb of orbitaloj) {
            // dum restas pli da elektronoj ol orbitaloj en la
            // aktuala subŝelo, ni disdonas po du
            if (n_ele > 0 && n_ele > n_orb) {
                orb.textContent = '↑↓';
                n_orb--;
                n_ele -= 2;
            } else if (n_ele) {
                orb.textContent = '↑.';
                n_orb--;
                n_ele -= 1;
            } else {
                orb.textContent = '..';
            }
        }

        // redonu restantajn elektronojn
        return n_ele;
    }

    // distribuu n_ele elektronojn laŭ la reguloj al orbitaloj
    function distribuo(n_ele) {
        const ss = atommodelo.subŝeloIteraciilo();
        let result = ss.next();
        let ele_rest = n_ele;
        
        while (!result.done) {
            const n = result.value[0];
            const l = result.value[1];

            // ni havas 2*l+1 orbitaloj po suŝelo (m: -l..-l)
            let n_orbitaloj = 2 * l + 1;
            //const subs = subŝeloj[l];
            const nl = atommodelo.subŝelo([n,l])

            ele_rest = distr_ss(nl,ele_rest);

            // iru al sekva subŝelo
            result = ss.next();
        }

        ĝi("#pauling_inf").textContent = elemento.nomo_mlg(n_ele);

        // por esceptaj elementoj faru korektojn
        if (esceptoj[n_ele]) {
            const esc = esceptoj[n_ele].split(' ');
            for (e of esc) {
              const ss = e.substring(0,2); // la subŝelo
              const ne = +e.substring(2); // la nombro da elektronoj
              distr_ss(ss,ne);
            }

            ĝi("#pauling_inf").textContent += " - devia distribuo!"
        }
    }

    // kreu la HTML-elementojn por la noticio laŭ Pauling
    const ss = atommodelo.subŝeloIteraciilo();
    let result = ss.next();
    
    while (!result.done) {
        const n = result.value[0];
        const l = result.value[1];
        // nombro de orbitaloj sur subŝelo estas
        // 2 * l + 1, ĉar m: -l..+l
        const n_orbitaloj = 2 * l + 1;
        //const subs = subŝeloj[l];
        const nl = atommodelo.subŝelo(result.value);

        // n+l donas la subŝelon kiun ni montru en nova linio
        // supre de la aliaj
        const ldiv = kreu("div");
        ldiv.setAttribute("id",`p_${nl}`);
        ldiv.classList.add("subŝelo");
        // montru strekon super 1s kaj p-orbitaloj pro nobelgasaj distribuoj
        if (nl[1] == 'p' || nl == "1s") {
            ldiv.setAttribute("style","border-top: 2px solid black;");
        }
        const ll = kreu("div");
        ll.textContent = nl; //+n + subs;
        //let style = "width: 2em; display: inline-block;";        
        //ll.setAttribute("style","width: 2em; display: inline-block");
        ldiv.append(ll);

        const odiv = kreu("div");
        odiv.classList.add("orbitaloj");

        // por ĉiu orbitalo sur tiu subŝelo ni alonas kesteton
        for (let o=0; o<n_orbitaloj; o++) {
            const osp = kreu("span");
            osp.textContent = '..';
            osp.classList.add('orbital');
            //osp.setAttribute("style","display: inline-block; width: 1.2em; text-align: center; border: 1px solid black; margin: 2px; padding: 0 .4em 3px;");
            odiv.append(osp);
        }
        ldiv.append(odiv);
        pauling.prepend(ldiv);     

        // iru al sekva subŝelo
        result = ss.next();
    }

    // aldonu titol-linion
    const tit = kreu("div");
    tit.innerHTML = '<div>n/l</div><div class="orbitaloj"><span>m</span></div>';
    tit.classList.add("subŝelo","titolo");
    pauling.prepend(tit);

    aktualigo();

</script>

La konstruo de atomoj kaj aparte la distribuo de la elektronoj influas la ĥemiajn ecojn de la elementoj
kaj per tiuj ecoj oni enordigas ilin en la [periodan sistemon de elementoj](perioda_sistemo).

<h2></h2>
[perioda sistemo de elementoj](perioda_sistemo){: .sekva_folio}

## fontoj
{: .fontoj}

[^W1]: [(en) Vikipedio: Atomic orbitals, shapes (Atomaj orbitaloj)](https://en.wikipedia.org/wiki/Atomic_orbital#Qualitative_understanding_of_shapes)

