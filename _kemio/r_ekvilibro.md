---
layout: laborfolio
title: Kemia ekvilibro
chapter: "3.1.2"
next_ch: r_precipito
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - k_masefiko-0a
---

<!--
https://www.chemieunterricht.de/dc2/mwg/mwg-kon.htm
https://www.chemie.de/lexikon/Gleichgewichtskonstante
https://chem.libretexts.org/Courses/University_of_Arkansas_Little_Rock/Chem_1403%3A_General_Chemistry_2/Text/15%3A_Equilibria/15.02%3A_Equilibrium_Constant_and_Reaction_Quotient

- ekvilibro klarigita per pombatalo
https://www.seilnacht.com/Lexikon/chemgl.htm
http://daten.didaktikchemie.uni-bayreuth.de/umat/mwg/archiv/mwg.htm
https://www.youtube.com/watch?v=TzwKJ1xt8oU
https://www.chids.de/dachs/expvortr/392ChemischesGleichgewicht_Holfeld_Scan.pdf

simulado:
https://javalab.org/en/equilibrium_constants_en/
https://vincentgarreau.com/particles.js
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection

kolizioj
https://www.azurefromthetrenches.com/introductory-guide-to-aabb-tree-collision-detection/
https://github.com/lohedges/aabbcc
https://sourceforge.net/p/javascripaabbtr/code/HEAD/tree/aabbTreeExample.html

-->

... paĝo en preparo...

Kiam ĥemiaĵoj reakcias, el *reakciantaj* substancoj formiĝas aliaj, la reakciaj *produktoj*. Multaj reakcioj okazas ne nur en unu direkto kaj komplete, sed en ambaŭ direktoj samtempe ĝis ekestas *ekvilibro*, do kiam ambaŭ direktoj de la reakcio okazas kun sama rapido.

La ekvilibron de la reakcio oni priskribas per ekvilibro de *aktivecoj* de la unuopaj substancoj, kiuj depedas de la kvantoj de la unuopaj reakciantaj substancoj. En ideala miksaĵo ili estas proporciaj al la kvanto, en realaj necesas aldoni koeficienton, ordinare pli malgrandan ol 1.

En solvaĵoj, krom de ĝeneralaj cirkonstancoj kiel temperaturo kaj premo, la rapido de reakcio dependas de la varianta koncentriteco de partoprenantaj substancoj per koeficientoj $$k_{tien}$$ kaj $$k_{reen}$$. Por simpla reakcio en ideala miksaĵo $$\ce{A + B <-> AB}$$, t.e. proporcio:

$$v_{tien}  =  k_{tien} \cdot c(A) \cdot c(B) \tag{1}$$

$$v_{reen}  =  k_{reen} \cdot c(AB) \tag{2}$$

## Leĝo de masefiko

Kiam la reakcio troviĝas en ekvilibro, (1) kaj (2) havas saman valoron kaj do la proporcio inter la koncentritecoj estas priskribita de ekvilibra konstanta nombro[^cu1]:

$$K_e = \frac{c(AB)}{c(A) \cdot c(B)} = \frac{k_{tien}}{k_{reen}}$$

Tiun rilaton oni nomas *leĝo de masefiko* formulitan de de Cato Maximilian Guldberg kaj Peter Waage. Tiu konstanto dependas nur de la reakcio kaj la temperaturo, sed ne de la koncentriteco aŭ premo. Alivorte, se ekzemple altiĝas la koncentriteco de A, la koncentriteco de AB altiĝas kaj tiu de de B malaltiĝas ĝis la proporcio $$K$$ atingas denove la ekvilibran valoron $$K_e$$.

(Tiu leĝo validas ankaŭ por reakcioj de gasoj, kie oni uzas la partajn premojn de la unuopaj gasoj anstataŭ la koncentritecon. Estas notinde, ke tiu ĉi kineta klarigo de la leĝo de masefiko (dekstra parto de la ekvacio) estas aplikebla ne al ĉiaj reakcioj; ekzemple plurpaŝaj, kiuj okazas sub influo de fotoĥemiaj fenomenoj. Ekzistas pli ĝenerala termodinamika priskribo per la energio de Gibbs.)

En simpla simulita eksperimento vi povas esplori tiujn rilatojn malsupre.

## eksperimento
{: .sekcio}

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
    table {
        table-layout: fixed;
    }
    td:first-child {
        width: 60%;
    }
    td:nth-child(2) {
        width: 20%;
    }
    .elekto label {
        padding: 0.2em;
        padding-left: 0;
        border-radius: 4px;
        border: 1px dotted cornflowerblue;
        border-left: none;
        /*background: linear-gradient(90deg, rgba(9,9,121,0) 0%, rgba(34,102,116,1) 60%, rgba(9,9,121,0) 100%);*/
    }
</style>

*koncentriteco c(A)*: ()malalta (x)meza ()alta
{: .elekto #koncentrA}

*koncentriteco c(B)*: ()malalta (x)meza ()alta
{: .elekto #koncentrB}

*reakciemo A kun B*: ()malalta (x)meza ()alta
{: .elekto #reakciem}

*disociiĝemo de AB*: (x)malalta ()meza ()alta
{: .elekto #disociem}

*temperaturo*: ()malalta (x)meza ()alta
{: .elekto #temperatur}

<button id="starto">Komencu</button>

<script>
    elekte((elekto,valoro) => {
        console.log(elekto+':'+valoro);
    });

    kiam_klako("#starto",() => {
        eksperimento();
    })
</script>

<canvas id="kampo" width="480" height="320"></canvas>
simulado de reakcio $$\ce{A + B <-> AB}$$

<canvas id="nombroj" width="480" height="320"></canvas>
proporciaj kvantoj de A (flava), B (blua) kaj AB (grasa dukolora)

|$$x_A = c_A/(c_A+c_B+c_{AB})$$|<span id="cA"/>|
|$$x_B = c_B/(c_A+c_B+c_{AB})$$|<span id="cB"/>|
|$$x_{AB} = c_{AB}/(c_A+c_B+c_{AB})$$|<span id="cAB"/>|

<canvas id="rapidoj" width="480" height="320"></canvas>
rapidecoj de kombino (verda) kaj malkombino (ruĝa); 
ekvilibraj konstantoj: $$k_{tien}$$ (verda), $$k_{reen}$$ (ruĝa), proporcio $$K$$ (nigra);
logaritma skalo

|$$v_{tien} (\ce{A + B -> AB})$$|<span id="vkun"/>|
|$$v_{reen} (\ce{AB -> A + B})$$|<span id="vdis"/>|
|$$k_{tien} = v_{tien} / (x_{A} \cdot x_{B})$$|<span id="ktien"/>|
|$$k_{reen} = v_{reen} / x_{AB}$$|<span id="kreen"/>|
|$$K = x_{AB} / (x_{A} \cdot x_{B}) \to k_{tien}/k_{reen}$$|<span id="Ke"/>|

<script>

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");
const d_nombroj = document.getElementById("nombroj");
const dgr_n = d_nombroj.getContext("2d");
const d_rapidoj = document.getElementById("rapidoj");
const dgr_r = d_rapidoj.getContext("2d");

// ni uzas 16x16-kahelojn por faciligi la kolizi-simuladon k.s.
// larĝo kaj alto estu multoblo de 16!
const masefiko = new Masefiko(
    canvas.getAttribute("width"),
    canvas.getAttribute("height"),
    16);

let n_eroj_A = 500; // nombro da eroj A
let n_eroj_B = 500; // nombro da eroj B
const r_ero = 2; // radiuso de eroj
let temperaturo = 1; // = maksiuma rapideco: 1*16 (kahelgrando)
//let v_max = K/2; // 10*K; K*2;  // maksimuma rapideco ~ temperaturo

// probablecoj por kunigo kaj divido
let p_kunigo = 0.1; //0.1;
let p_divido = 0.7; //0.0005;

let ry_lasta = { ykun: 0, ydis: 0 }; // memoru antaŭajn rapidojn

// preparo de la eksperimento
function preparo() {
    dgr_n.clearRect(0, 0, d_nombroj.width, d_nombroj.height);
    dgr_r.clearRect(0, 0, d_rapidoj.width, d_rapidoj.height);

    const d_alto = d_rapidoj.getAttribute("height");
    linio(d_alto/3,dgr_r);
    linio(3/4*d_alto,dgr_r);

    masefiko.preparo(n_eroj_A,n_eroj_B,temperaturo,p_kunigo,p_divido);
}


// aktualigi valorojn kaj diagramojn
function valoroj() {
    // skribu nombro kun precizo 3, sed komo kaj 10^ anstatŭ e...
    function n_eo(nombro) {
        const p = nombro.toPrecision(3).replace('.',',');
        return p.replace(/e\+?/,' 10^').replace('Infinity','--').replace('NaN','--');
    }

    const d_alto = d_rapidoj.getAttribute("height");
    const d_larĝo = d_rapidoj.getAttribute("width");
    const T = masefiko.T;

    const kvantoj = masefiko.proporciaj_kvantoj();
    const nA= kvantoj[-1];
    const nB= kvantoj[1];
    const nAB= kvantoj[0];

    // montru valorojn en diagramo
    if (T < d_larĝo) {
        // maksimuma nombro de iuspecaj eroj
        const n_max = 1; // Math.max(n_eroj_A,n_eroj_B)/(n_eroj_A+n_eroj_B);
        // kalkulu y-koordinaton en la diagramo el valoro v je tempo T
        // la 0-linio estus malsupre, sed ĉar y=0 ĉe <canvas>
        // estas supre, ni subtrahas de ĝia alto
        const yA = d_alto - nA/n_max * d_alto;
        const yB = d_alto - nB/n_max * d_alto;
        const yAB = d_alto - nAB/n_max * d_alto;
        if (T%6 == 3) { // evitu skribi flavan sur bluan punkton, sed intermitu!
            ero({ k:  1, x: T, y: yB }, dgr_n);
        } else if (T%6 == 0) {
            ero({ k: -1, x: T, y: yA }, dgr_n);
        }

        ero({ k: 0, x: T, y: yAB}, dgr_n);

        ĝi("#cA").textContent = n_eo(nA);
        ĝi("#cB").textContent = n_eo(nB);
        ĝi("#cAB").textContent = n_eo(nAB);

        const rapidoj = masefiko.rapido_ave();
        ĝi("#vkun").textContent = n_eo(rapidoj.kun);
        ĝi("#vdis").textContent = n_eo(rapidoj.dis);

        // rapidojn ni montras en logaritma skalo kun log10(1) = 0 en la mezo de la diagramo
        const ykun = d_alto/3 - Math.log10(rapidoj.kun)*50;
        const ydis = d_alto/3 - Math.log10(rapidoj.dis)*50;

        streko(T-1,ry_lasta.ykun,T,ykun,"#090",dgr_r);
        streko(T-1,ry_lasta.ydis,T,ydis,"#900",dgr_r);
        ero({ k: "#090", x: T, y: ykun }, dgr_r);
        ero({ k: "#900", x: T, y: ydis }, dgr_r);
        ry_lasta = { ykun: ykun, ydis: ydis };

        const k_tien = rapidoj.kun / (nA*nB);
        const k_reen = rapidoj.dis / nAB;
        const K = (nAB/(nA*nB));
        ĝi("#kreen").textContent = k_reen? n_eo(k_reen) : '--';
        ĝi("#ktien").textContent = k_tien? n_eo(k_tien) : '--';
        ĝi("#Ke").textContent = n_eo(K);

        // la "konstantojn" ni montras sub la rapdioj kun log10(1) = 0 ĉe 3/4 de la diagramo
        ytien = 3/4*d_alto - Math.log10(k_tien)*10;
        yreen = 3/4*d_alto - Math.log10(k_reen)*10;
        yK    = 3/4*d_alto    - Math.log10(K)*10;

        ero({ k: "#0d0", x: T, y: ytien }, dgr_r);
        ero({ k: "#d00", x: T, y: yreen }, dgr_r);
        ero({ k: "#000", x: T, y: yK }, dgr_r);
    }

}

// desegnu horizontalan linion
function linio(y,ctx) {
    const larĝo = ctx.canvas.getAttribute("width");
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(larĝo,y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
}

// desegnu strekon inter du punktoj
function streko(x0,y0,x1,y1,koloro,ctx) {
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.lineWidth = 2;
    ctx.strokeStyle = koloro;
    ctx.stroke();
}

// desegnu eron en la eksperimento
function ero(e,ctx) {
    // unu ero tipo -1 aŭ 1
    if (e.k) {
        const koloro = {"-1": "#DD9900", "1": "#0095DD"}[e.k] || e.k;
        ctx.beginPath();
        ctx.arc(e.x, e.y, r_ero, 0, Math.PI * 2);
        ctx.fillStyle = koloro;
        ctx.fill();
    } else {
        // kunigite
        ctx.beginPath();
        ctx.arc(e.x, e.y, 1.5*r_ero, Math.PI/4, Math.PI*5/4);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(e.x, e.y, 1.5*r_ero, Math.PI*5/4, Math.PI*9/4);
        ctx.fillStyle = "#DD9900";
        ctx.fill();
    }
}

function eksperimento() {
    // komencaj valoroj
    const kA = ĝi("input[name='koncentrA']:checked").value;
    const kB = ĝi("input[name='koncentrB']:checked").value;
    const r_em = ĝi("input[name='reakciem']:checked").value;
    const d_em = ĝi("input[name='disociem']:checked").value;
    const temp = ĝi("input[name='temperatur']:checked").value;

    n_eroj_A = {"malalta": 500, "meza": 1000, "alta": 2000}[kA];
    n_eroj_B = {"malalta": 500, "meza": 1000, "alta": 2000}[kB];
    p_kunigo = {"malalta": 0.005, "meza": 0.1, "alta": 0.7}[r_em];
    p_divido = {"malalta": 0.005, "meza": 0.1, "alta": 0.7}[d_em];
    temperaturo = {"malalta": 0.1, "meza": 1, "alta": 5}[temp];

    //var interval = setInterval(pentru, 100);

    preparo();

    function paŝo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const kahelo of masefiko.kaheloj) {
            for (e of Object.values(kahelo)) {
                ero(e,ctx);
            }
        }

        masefiko.procezo();
        valoroj();
    }

    const intervalo = 50;
    const d_larĝo = d_rapidoj.getAttribute("width");

    ripetu(
        () => {
            paŝo();
            return (masefiko.T < d_larĝo);
        },
        intervalo
    )
    /*
    (function bis() {
        setTimeout(() => {        
            paŝo();
            if (masefiko.T < d_larĝo) bis();
        }, intervalo);
    })();
    */
}

</script>

## Aldonaj rimarkoj pri leĝo de masefiko
{: .sekcio}

Por ekvacioj kie la reakciantoj aŭ produktoj havas faktorojn, oni devas potencigi la aktivecojn:

$$\ce{2A + 3B -> C + 6D}$$

$$\begin{align} K_e &= \frac{a_C^1 \cdot a_D^6}{a_A^2 \cdot a_B^3} \\
  a_i &= \chi_i \cdot x_i \end{align}$$

La $$a_i$$ estas la aktiveco de la substanco i en ekvilibra stato. La kvanto (koncentriteco en solvaĵo, parta premo en gaso) estas $$x_i$$ kaj $$\chi_i$$ koeficiento de aktiveco, en ideala miksaĵo egala al 1. En kuplitaj reakcioj por ĉiu paŝo tia rilato validas aparte dum la ekvilibraj konstantoj de la paŝoj multiplikiĝas unu kun la alia.

Sed kiel do utilas la leĝo de masekfiko kaj konado de la ekvilibra konstanto de reakcio por certa temperaturo?

- Ekzemple oni tiel povas taksi, kiom da produkto estiĝos per certa kvanto de reakciantoj.
- Per la proporcio de la produktoj de aktivecoj (kvantoj) oni povas eltrovi en kiu direkto la reakcio evoluas.
- Se oni ne scias, kiom da certa substanco estas en iu solvaĵo, oni povas aldoni iom post iom da konata substanco, ĝis oni per testo povas konstati difinitan kvanton de produkto kaj tiel kalkuli kiom de la nekonata substanco origine estis en la solvaĵo. Tion oni nomas titrado. 

La pH-valoro de acidoj kaj bazoj kaj ties acid- kaj bazo-konstantoj estas difinitaj per la leĝo de masefiko.
Kaj tiel oni povas ekzemple ankaŭ testi la kvaliton de akvo aŭ la purecon de iu substanco.

## fontoj
{: .fontoj}

[^cu1]: [Die kinetische Herleitung des Massenwirkungsgesetzes](https://www.chemieunterricht.de/dc2/mwg/mwg-herl.htm)
[^cu2]: [Die thermodynamische Begründung des Massenwirkungsgesetzes und ΔG](https://www.chemieunterricht.de/dc2/mwg/mwg-ther.htm)
[^cd1]: [Chemielexikon: Massenwirkungsgesetz](https://www.chemie.de/lexikon/Massenwirkungsgesetz.html)
[^cd2]: [Chemielexikon: https://www.chemie.de/lexikon/Chemisches_Potential.html](https://www.chemie.de/lexikon/Chemisches_Potential.html)