---
layout: laborfolio
title: Ideala gaso
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - f_idealgas-0a
---

<!--

https://eo.wikibooks.org/wiki/Termodinamiko/Leciono_1#Ideala_gaso
https://de.wikipedia.org/wiki/Ideales_Gas
-->

... paĝo en preparo...

## eksperimento
{: .sekcio}

<!--

Ni povas kalkuli la entergion kiel sumo de kinetaj energioj de la eroj: sumo(1/2*m*v²)
La temperaturo tiam estas E / (N*kB), kie kB estas la konstanto de Boltzmann, kaj N la nombro de eroj

Poste premon kaj volumenon ni povas rilatigi per la ekvacio de ideala gaso pV = N*kB*T

-->

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


*temperaturo*: ()malalta (x)meza ()alta
{: .elekto #temperatur}

<button id="starto">Komencu</button>
<button id="daŭrigo">Daŭrigu</button>

<script>
    ĝi("#daŭrigo").disabled = true;

    elekte((elekto,valoro) => {
        console.log(elekto+':'+valoro);
    });

    kiam_klako("#starto",() => {
        eksperimento();
        ĝi("#daŭrigo").disabled = true;
    });

    const MAX_EROJ = 6000;

    kiam_klako("#plusA", () => {
        masefiko.kreu_erojn(250,-1);
        pentro();
    });
    kiam_klako("#plusB", () => {
        masefiko.kreu_erojn(250,1);
        pentro();
    });
    kiam_klako("#plusAB", () => {
        masefiko.kreu_erojn(125,0);
        pentro();
    });

    kiam_klako("#daŭrigo",() => {
        daŭrigo();
    });
</script>

<canvas id="kampo" width="480" height="320"></canvas>
simulado de ideala gaso

<canvas id="et" width="480" height="320"></canvas>
energio kaj temperaturo

<canvas id="pv" width="480" height="320"></canvas>
premo kaj volumeno

<script>

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");
const energ_temp = document.getElementById("et");
const dgr_et = energ_temp.getContext("2d");
const prem_rapid = document.getElementById("pv");
const dgr_pv = prem_rapid.getContext("2d");

// ni uzas 16x16-kahelojn por faciligi la kolizi-simuladon k.s.
// larĝo kaj alto estu multoblo de 16!
const idealgaso = new Idealgaso(
    canvas.getAttribute("width"),
    canvas.getAttribute("height"),
    16);

let n_eroj_A = 100; // nombro da eroj A
let n_eroj_B = 100; // nombro da eroj B
const r_ero = 2; // radiuso de eroj
let temperaturo = 1; // = maksiuma rapideco: 1*16 (kahelgrando)
//let v_max = K/2; // 10*K; K*2;  // maksimuma rapideco ~ temperaturo

// probablecoj por kunigo kaj divido
let p_kunigo = 0.1; //0.1;
let p_divido = 0.7; //0.0005;

let ny_lasta = { yA: 0, yB: 0, yAB: 0}; // memoru antaŭajn kvantojn
let ry_lasta = { ykun: 0, ydis: 0 }; // memoru antaŭajn rapidojn
let T0 = 0; // tempo komenciĝu ĉe T=0

// preparo de la eksperimento
function preparo() {
    dgr_et.clearRect(0, 0, energ_temp.width, energ_temp.height);
    dgr_pv.clearRect(0, 0, prem_rapid.width, prem_rapid.height);

    T0 = 0;
    idealgaso.preparo(1000,0.01);
}


// desegnu horizontalan linion
function linio(y,ctx) {
    const larĝo = ctx.canvas.getAttribute("width");
    ctx.beginPath();
    ctx.moveTo(masefiko.T-T0, y);
    ctx.lineTo(larĝo,y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.stroke();
}

// desegnu strekon inter du punktoj de diagramo
function streko(x0,y0,x1,y1,koloro,ctx) {
    if (x0>1 && Math.abs(y1-y0)>3) {
        const klr = {"-1": "#DD9900", "1": "#0095DD", "0": "#090"}[koloro] || koloro;
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        ctx.lineWidth = 2;
        ctx.strokeStyle = klr;
        ctx.stroke();
    }
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

const intervalo = 50;
const d_larĝo = energ_temp.getAttribute("width");

function pentro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const kahelo of idealgaso.kaheloj) {
        for (e of Object.values(kahelo)) {
            ero(e,ctx);
        }
    }
    //valoroj();
}

function paŝo() {
    idealgaso.procezo();
    pentro();
}

function parametroj() {
    /*
    const kA = ĝi("input[name='koncentrA']:checked").value;
    const kB = ĝi("input[name='koncentrB']:checked").value;
    */
   /*
    const r_em = ĝi("input[name='reakciem']:checked").value;
    const d_em = ĝi("input[name='disociem']:checked").value;
    const temp = ĝi("input[name='temperatur']:checked").value;
*/
    //temperaturo = {"malalta": 0.1, "meza": 1, "alta": 5}[temp];

    return null;
}

function eksperimento() {
    // komencaj valoroj
    parametroj();

    n_eroj = 1000; // {"malalta": 500, "meza": 1000, "alta": 2000}[kA];

    //var interval = setInterval(pentru, 100);

    preparo();
    ripetu(
        () => {
            paŝo();
            return (idealgaso.T < d_larĝo);
        },
        intervalo
    )
}

function daŭrigo() {
    const ŝovo = 400;
    T0 += ŝovo;

    function maldekstren(ctx) {
        const imageData = ctx.getImageData(ŝovo,0,ctx.canvas.width-ŝovo,ctx.canvas.height);
        /*
        ctx.translate(-ŝovo,0);
        ctx.clearRect(T0, 0, ctx.canvas.width,ctx.canvas.height);
        */
        ctx.clearRect(0, 0, ctx.canvas.width,ctx.canvas.height);

        ctx.putImageData(imageData,0, 0);
    }
    maldekstren(dgr_n);
    maldekstren(dgr_r);

    const d_alto = d_rapidoj.getAttribute("height");
    linio(d_alto/3,dgr_r);
    linio(3/4*d_alto,dgr_r);

    parametroj();
    idealgaso.parametroj(rapido);

    ripetu(
        () => {
            paŝo();
            return (idealgaso.T - T0 < d_larĝo);
        },
        intervalo
    )
}

</script>

## fontoj
{: .fontoj}

