---
layout: page
title: Distribuo de elektronoj en orbitaloj
---

La *atomoj* konsistas el kerno de *protonoj* kaj *neŭtronoj* kaj la *elektronoj* kiuj distribuiĝas ĉirkau la kerno.
Neŭtrala atomo havas sammulte da elektronoj kaj protonoj.


<!--uzi details / summary, ĉu GH-paĝojn ni povas ankaŭ etendi per *.rb?
http://movb.de/jekyll-details-support.html -->

{::options parse_block_html="true" /}

<details>
  <summary markdown="span">
  La orbitaloj
</summary>

# La orbitaloj

La elektronoj distribuiĝas laŭ sia energinivelo en *orbitalojn*. Ĉiu orbitalo
povas esti identigita per tri nombroj *n*, *l* kaj *m* kun la sekvaj ecoj:

### precipa kvantumnombro *n*

Ĝi indikas la *ŝelon* kaj estas natura nombro 1, 2, 3 ktp. Foje oni indikas ĝin ankaŭ per majusklo: K, L, M ktp.

### kroma kvantumnombro *l*

Ĝi indikas la *subŝelon* kaj varias inter 0 kaj *n* - 1. Oni nomas gin ankau azimuta momanto. La energinivelo de subŝelo kreskas laŭ la sumo *n + l*. Anstataŭ numeroj oni uzas minusklojn por nomi la subŝelon: s, p, d, f, g, h, i, j

### magneta kvantumnombro *m*

Ĝi varias inter *-l* kaj *l* kaj donas la orbitalon ene de subŝelo. Ĉiu orbitalo povas enhavi maksimume du elektronojn. Ili devas havi distingan *spinon*, kiu povas esti *supren* aŭ *malsupren*.
</details>



<details>
  <summary markdown="span">
  Notacio laŭ <i>Pauling</i>
</summary>

## Notacio laŭ *Pauling*

<label for="protonnombro">nombro de protonoj:</label> <b><span id="pn_info">12</span></b><br>
<input type="range" id="protonnombro" style="width: 50em; max-width: 80%" value="protonnombro" min="1" max="118" value="12" onchange="aktualigo()">

La notacio de *Pauling* montras la distribuon de la elektronoj en la orbitalojn. La subŝeloj en tiu notacio estas aranĝitaj tiel, ke la supraj havas pli altan energinivelon ol la malsupraj.

<div id="pauling_inf" style="font-weight: bold;"></div>
<div id="pauling">
</div>

<script>
    function aktualigo() {
        const n_proton = document.getElementById('protonnombro').value;
        document.getElementById('pn_info').textContent = n_proton;
        distribuo(+n_proton);
    }

    // kp https://www.seilnacht.com/Lexikon/psval.htm
    // kaj https://de.wikipedia.org/wiki/Aufbauprinzip

    // krome montru elementonomojn, mallongigitajn notaciojn, periodon kaj blokon/grupon ktp.
    // laŭ https://de.wikipedia.org/wiki/Elektronenkonfiguration

    const subŝeloj = "spdfghij";
    const elementoj = [
    'hidrogeno (H)',
    'heliumo (He)',
    'litio (Li)',
    'berilio (Be)',
    'boro (B)',
    'karbono (C)',
    'azoto (N)',
    'oksigeno (O)',
    'fluoro (F)',
    'neono (Ne)',
    'natrio (Na)',
    'magnezio (Mg)',
    'aluminio (Al)',
    'silicio (Si)',
    'fosforo (P)',
    'sulfuro (S)',
    'kloro (Cl)',
    'argono (Ar)',
    'kalio (K)',
    'kalcio (Ca)',
    'skandio (Sc)',
    'titano (Ti)',
    'vanado (V)',
    'kromo (Cr)',
    'mangano (Mn)',
    'fero (Fe)',
    'kobalto (Co)',
    'nikelo (Ni)',
    'kupro (Cu)',
    'zinko (Zn)',
    'galiumo (Ga)',
    'germaniumo (Ge)',
    'arseno (As)',
    'seleno (Se)',
    'bromo (Br)',
    'kriptono (Kr)',
    'rubidio (Rb)',
    'stroncio (Sr)',
    'itrio (Y)',
    'zirkonio (Zr)',
    'niobo (Nb)',
    'molibdeno (Mo)',
    'teknecio (Tc)',
    'rutenio (Ru)',
    'rodio (Rh)',
    'paladio (Pd)',
    'arĝento (Ag)',
    'kadmio (Cd)',
    'indio (In)',
    'stano (Sn)',
    'antimono (Sb)',
    'teluro (Te)',
    'jodo (I)',
    'ksenono (Xe)',
    'cezio (Cs)',
    'bario (Ba)',
    'lantano (La)',
    'cerio (Ce)',
    'prazeodimo (Pr)',
    'neodimo (Nd)',
    'prometio (Pm)',
    'samario (Sm)',
    'eŭropio (Eu)',
    'gadolinio (Gd)',
    'terbio (Tb)',
    'disprozio (Dy)',
    'holmio (Ho)',
    'erbio (Er)',
    'tulio (Tm)',
    'iterbio (Yb)',
    'lutecio (Lu)',
    'hafnio (Hf)',
    'tantalo (Ta)',
    'volframo (W)',
    'renio (Re)',
    'osmio (Os)',
    'iridio (Ir)',
    'plateno (Pt)',
    'oro (Au)',
    'hidrargo (Hg)',
    'talio (Tl)',
    'plumbo (Pb)',
    'bismuto (Bi)',
    'polonio (Po)',
    'astato (At)',
    'radono (Rn)',
    'franciumo (Fr)',
    'radiumo (Ra)',
    'aktiniumo (Ac)',
    'torio (Th)',
    'protaktinio (Pa)',
    'uranio (U)',
    'neptunio (Np)',
    'plutonio (Pu)',
    'americio (Am)',
    'kuriumo (Cm)',
    'berkelio (Bk)',
    'kaliforniumo (Cf)',
    'ejnŝtejnio (Es)',
    'fermio (Fm)',
    'mendelevio (Md)',
    'nobelio (No)',
    'laŭrencio (Lr)',
    'ruterfordio (Rf)',
    'dubnio (Db)',
    'seborgio (Sg)',
    'borio (Bh)',
    'hasio (Hs)',
    'mejtnerio (Mt)',
    'darmŝtatio (Ds)',
    'rentgenio (Rg)',
    'kopernicio (Cn)',
    'nihonio (Nh)',
    'flerovio (Fl)',
    'moskovio (Mc)',
    'livermorio (Lv)',
    'teneso (Ts)',
    'oganesono (Og)'
    ]; 

    const esceptoj = {
        24: "3d5 4s1", 42: "4d5 5s1",
        41: "4d4 5s1", 44: "4d7 5s1", 45: "4d8 5s1",
        46: "4d10 5s0", 78: "4f14 5d9 6s1",
        29: "3d10 4s1", 47: "4d10 5s1", 79: "4f14 5d10 6s1",
        57: "5d1 4f0 6s2", 89: "6d1 5f0 7s2", 90: "6d2 5f0 7s2",
        58: "4f1 5d1 6s2", 91: "5f2 6d1 7s2", 92: "5f3 6d1 7s2", 93: "5f4 6d1 7s2",
        64: "4f7 5d1 6s2", 96: "5f7 6d1 7s2" // , 103: "5f14 7s2 7p1"
        }

    const pauling = document.getElementById("pauling");

    function subŝeloIt() {
        let nivelo = 1;
        let n = 1;

        // trakuras laŭ kreskanta energinivelo (n+l) la
        // subŝeloj priskribitajn per kvantumnombroj n kaj l
        const ssIterator = {

            next: function() {
                // aktuala subŝelo
                const l = nivelo - n;  // energio: n + l = nivelo
                const result = {value:  [n,l], done: (nivelo>8  )};

                if ( n < Math.min(nivelo,7) ) {
                    n++;
                } else {
                    // sekva energinivelo
                    nivelo++;
                    // l: [0..n-1], do n: [(nivelo+1)/2]..nivelo
                    n = Math.trunc(nivelo/2)+1;
                }
                return result;
            }
        };
        return ssIterator;
    }

    // distribuo de elektronoj sur orbitaloj de unu subŝelo
    function distr_ss(ss, n_ele) {
        const ldiv = document.getElementById("p_"+ss);
        const orbitaloj = ldiv.querySelectorAll('.orbital');
        let n_orb = orbitaloj.length;

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
        const ss = subŝeloIt();
        let result = ss.next();
        let ele_rest = n_ele;
        
        while (!result.done) {
            const n = result.value[0];
            const l = result.value[1];

            // ni havas 2*l+1 orbitaloj po suŝelo (m: -l..-l)
            let n_orbitaloj = 2 * l + 1;
            const subs = subŝeloj[l];
            ele_rest = distr_ss(+n+subs,ele_rest);

            // iru al sekva subŝelo
            result = ss.next();
        }

        document.getElementById("pauling_inf").textContent = elementoj[n_ele-1];

        // por esceptaj elementoj faru korektojn
        if (esceptoj[n_ele]) {
            const esc = esceptoj[n_ele].split(' ');
            for (e of esc) {
              const ss = e.substring(0,2); // la subŝelo
              const ne = +e.substring(2); // la nombro da elektronoj
              distr_ss(ss,ne);
            }

            document.getElementById("pauling_inf").textContent += " - devia distribuo!"
        }
    }

    // kreu la HTML-elementojn por la noticio laŭ Pauling
    const ss = subŝeloIt();
    let result = ss.next();
    
    while (!result.done) {
        const n = result.value[0];
        const l = result.value[1];
        // nombro de orbitaloj sur subŝelo estas
        // 2 * l + 1, ĉar m: -l..+l
        const n_orbitaloj = 2 * l + 1;
        const subs = subŝeloj[l];

        // n+l donas la subŝelon kiun ni montru en nova linio
        // supre de la aliaj
        const ldiv = document.createElement("div");
        ldiv.setAttribute("id","p_" + n + subs);
        const ll = document.createElement("span");
        ll.textContent = +n + subs;
        ll.setAttribute("style","width: 2em; display: inline-block");
        ldiv.append(ll);

        // por ĉiu orbitalo sur tiu subŝelo ni alonas kesteton
        for (let o=0; o<n_orbitaloj; o++) {
            const osp = document.createElement("span");
            osp.textContent = '..';
            osp.classList.add('orbital');
            osp.setAttribute("style","display: inline-block; width: 1.2em; text-align: center; border: 1px solid black; margin: 2px; padding: 0 .4em 3px;");
            ldiv.append(osp);
        }
        pauling.prepend(ldiv);     

        // iru al sekva subŝelo
        result = ss.next();
    }

    aktualigo();

</script>

</details>