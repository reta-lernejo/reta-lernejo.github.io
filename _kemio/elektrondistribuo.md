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
<summary># La orbitaloj
</summary>

La elektronoj distribuiĝas laŭ sia energinivelo en *orbitalojn*. Ĉiu orbitalo
povas esti identigita per tri nombroj *n*, *l* kaj *m* kun la sekvaj ecoj:

### precipa kvantumnombro *n*

Ĝi indikas la *ŝelon* kaj estas natura nombro 1, 2, 3 ktp. Foje oni indikas ĝin ankaŭ per majusklo: K, L, M ktp.

### kroma kvantumnombro *l*

Ĝi indikas la *subŝelon* kaj varias inter 0 kaj *n* - 1. Oni nomas gin ankau azimuta momanto. La energinivelo de subŝelo kreskas laŭ la sumo *n + l*. Anstataŭ numeroj oni uzas minusklojn por nomi la subŝelon: s, p, d, f, g, h, i, j

### magneta kvantumnombro *m*

Ĝi varias inter *-l* kaj *l* kaj donas la orbitalon ene de subŝelo. Ĉiu orbitalo povas enhavi maksimume du elektronojn. Ili devas havi distingan *spinon*, kiu povas esti *supren* aŭ *malsupren*.
</details>

## Notacio laŭ *Pauling*

<label for="protonnombro">nombro de protonoj:</label> <b><span id="pn_info">12</span></b><br>
<input type="range" id="protonnombro" style="width: 50em; max-width: 80%" value="protonnombro" min="1" max="118" value="12" onchange="aktualigo()">

La notacio de *Pauling* montras la distribuon de la elektronoj en la orbitalojn. La subŝeloj en tiu notacio estas aranĝitaj tiel, ke la supraj havas pli altan energinivelon ol la malsupraj.

<div id="pauling">
</div>

<script>
    function aktualigo() {
        const n_proton = document.getElementById('protonnombro').value;
        document.getElementById('pn_info').textContent = n_proton;
        distribuo(+n_proton);
    }

    // kp https://www.seilnacht.com/Lexikon/psval.htm

    // kodigu ankoraŭ la esceptojn, vd. https://de.wikipedia.org/wiki/Aufbauprinzip
    // krome montru elementonomojn, mallongigitajn notaciojn, periodon kaj blokon/grupon ktp.
    // laŭ https://de.wikipedia.org/wiki/Elektronenkonfiguration

    const subŝeloj = "spdfghij";
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

    // distribuu n_ele elektronojn laŭ la reguloj al orbitaloj
    function distribuo(n_ele) {
        const ss = subŝeloIt();
        let result = ss.next();
        let ele_rest = n_ele;
        
        while (!result.done) {
            const n = result.value[0];
            const l = result.value[1];

            let n_orbitaloj = 2 * l + 1;
            const subs = subŝeloj[l];

            const ldiv = document.getElementById("p_"+n+subs);

            for (let orb of ldiv.querySelectorAll('.orbital')) {
                // dum restas pli da elektronoj ol orbitaloj en la
                // aktuala subŝelo, ni disdonas po du
                if (ele_rest > 0 && ele_rest > n_orbitaloj) {
                    orb.textContent = '↑↓';
                    n_orbitaloj--;
                    ele_rest -= 2;
                } else if (ele_rest) {
                    orb.textContent = '↑.';
                    n_orbitaloj--;
                    ele_rest -= 1;
                } else {
                    orb.textContent = '..';
                }
            }

            // iru al sekva subŝelo
            result = ss.next();
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
/*

    for (let nivelo=1; nivelo<=8; nivelo++) {
        // l: [0..n-1], do n: [(nivelo+1)/2]..nivelo
        const n_min = Math.trunc(nivelo/2+1);
        for (let n=n_min; n<=Math.min(nivelo,7); n++) {
            const l = nivelo-n;
            const n_orbitaloj = 2*l+1;
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
            for (let o=0; o< n_orbitaloj; o++) {
                const osp = document.createElement("span");
                osp.textContent = '↑↓';
                osp.setAttribute("style","border: 1px solid black; margin: 2px; padding: 0 .4em 3px;");
                ldiv.append(osp);
            }
            pauling.prepend(ldiv);
        }    
    }
    */
</script>

