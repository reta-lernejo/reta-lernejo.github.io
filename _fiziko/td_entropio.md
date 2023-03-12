---
layout: laborfolio
title: Entropio
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - diagramo-0a
  - f_idealgas-0c
  - bufro-0a
---

...paĝo en preparo...

<!--

https://eo.wikibooks.org/wiki/Termodinamiko/Leciono_1#Ideala_gaso
https://de.wikipedia.org/wiki/Ideales_Gas
https://de.wikipedia.org/wiki/Innere_Energie

https://www.tec-science.com/de/thermodynamik-waermelehre/kinetische-gastheorie/maxwell-boltzmann-verteilung/#Wahrscheinlichste_Geschwindigkeit

https://www.pfeiffer-vacuum.com/de/know-how/einfuehrung-in-die-vakuumtechnik/grundlagen/thermische-teilchengeschwindigkeit/

https://de.wikipedia.org/wiki/Adiabatische_Zustands%C3%A4nderung#Adiabaten_des_idealen_Gases
-->



La *temperaturon* de ideala gaso oni tiam ricevas per la *konstanto de Boltzmann* $$k_B = \pu{1,380649e-23 J / K}$$ [^W2]

$$T = \frac{\frac{2}{3} E}{N \cdot k_B}$$


## eksperimento
{: .sekcio}

...

Ĉar ne eblas montri en modelo rapidojn de je 1 km/s, ni simple malrapidigas la tempon je faktoro $$10^{-11}$$. 
Per tio la punktoj en nia simulado moviĝas je ĉirkaŭ 10nm/s, kio en nia modelo estas 100 bilderoj respektive kvinono de la bildalto. La bildigataj gaseroj respondas proksimume al la grandeco de heliuma atomo kun radiuso de 0,14 nm = 1,4 bilderoj.

<!--

En ideala gaso ne estas interagoj inter la senfinie malgrandaj eroj. Do tia gaso ne likvidiĝas aŭ solidiĝas en malaltaj temperaturoj. La ena energio estas plene difinita per la suma kineta energio de la eroj: 

E = Σₙ 1/2*m*v²

Per la konstanto de Boltzmann kaj la nombro N de la eroj oni ricevas la temperaturon kaj la gasekvacion:

T = E / (N*kB)
p*V = N*kB*T


Bazaj unuoj kaj grandoj de la modelo:

volumeno:
-----------
ni montras nur kvdardatan areon, sed supozas, ke ĝi reprezentas
spacon 320px profundan.

1pm = 1e-12m, 1nm = 1e-9m
1nm³ = 1e-27m³
1px = 80pm = 0.08nm
1px³ = 5e-4nm³
320px³ = 25.6³nm³ = 16800nm³ = 16800e-27m³
He-radiuso: 140pm = 1.75px

por ideala gaso en normkondiĉoj:
pₙ = 1.0bar = 1000hPa; 
Tₙ = 293.15K = 20°C
ni ricevas
N = p*V / (kB*T) = 1e5kg/ms² * 16800e-27m³ / (1.38e-23m²kg/Ks²*293.15K) = 16800e-22 / 40.5e-22 = 415 gaseroj


maso/denso
-----------
He-maso: 4u = 6.64e-27 kg
He-gasa denso en normaj kondiĉoj: 0.1785 kg/m³
He-eroj/nm³ = 0.027, t.e. 450 gaseroj en nia supra volumeno de 16800nm³
(bolpunkto de He: 4,15K, ignorata ĉe ideala gaso)


terma energio
-----------
E_th = N*kB*T = 420 * 1.38J/K * 293.15K = 1.7e-18J
unuopa E_th = 1.38J/K * 293.15K = 4.05e-21J
(ĉar ni uzas rapidecon je faktoro e-11 (vd. malsupre) nia
energio estus sen korekto je faktoro e-22 pli malgranda, t.e. 1e-40)


rapido:
-----------
He: v = √(2E/m) = √(8.1e-21J/6.64e-27kg) = √(1.22e6)m/s = 1100m/s = 1.1e3m/s
por videbligi la movon ni havas nur proksimume 16px/intervalo = 25nm/s = 2.5e-8m/s

-->

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
    table {
        table-layout: fixed;
    }
    /*
    td:first-child {
        width: 60%;
    }
    td:nth-child(2) {
        width: 20%;
    }*/
    .elekto label {
        padding: 0.2em;
        padding-left: 0;
        border-radius: 4px;
        border: 1px dotted cornflowerblue;
        border-left: none;
        /*background: linear-gradient(90deg, rgba(9,9,121,0) 0%, rgba(34,102,116,1) 60%, rgba(9,9,121,0) 100%);*/
    }
</style>



<canvas id="kampo" width="600" height="400"></canvas>
miksiĝo de volumenoj de ideala gaso diverstemperaturaj

<button id="starto">Komencu</button>
<button id="halto">Haltu</button>

| | maldekstre | dekstre |
|volumeno (nm³)|<span id="volumeno1"/>|<span id="volumeno2"/>|
|rapido (Ø m/s)|<span id="rapido1"/>|<span id="rapido2"/>|
|energio (J)|<span id="energio1"/>|<span id="energio2"/>|
|temperaturo (K)|<span id="temperaturo1"/>|<span id="temperaturo2"/>|

<div style="display: none">
<!-- ankoraŭ iom nefindindaj valoroj, do provizore kaŝita! -->
Pliaj grandoj de la simulita eksperimento:

|entropio (J/K)|<span id="entropio"/>|
|entalpio (J)|<span id="entalpio"/>|
|Gibs-energio (J)|<span id="gibsenergio"/>|

(pro la malgrandeco kaj simpleco de nia eksperimento, tiuj valoroj
estas iom malprecizaj kaj nestabilaj dum la eksperimento. Ekzemple
entropio ĉe adiabata volumenŝanĝo devus resti konstanta, sed ĝi 
eventuale iom fordrivetas.)
</div>

<script>

const canvas = document.getElementById("kampo");
const dgr = new Diagramo(canvas);
const koloro = "cornflowerblue";

// skal-faktoroj 
const px_nm = 0.1; // 1px = 0.1nm
const ĉellarĝo = 1/5; //aŭ 1/10;  1/5 = 60px, 1/10 = 30px; // ĉellarĝo estas 1/10 de duono de canvas.width, t.e. 30px
const ĉelo_nm = 500*ĉellarĝo*px_nm; // ĉelalto en nm: 16 * 0.08nm = 1.28nm
const ĉelo_px = canvas.width/2*ĉellarĝo;

const intervalo = 50; // 50 ms
const r_ero = 1.4; // radiuso de eroj

//let v_max = K/2; // 10*K; K*2;  // maksimuma rapideco ~ temperaturo

let t0 = 0; // tempo komenciĝu ĉe T=0
let dividita = true; // en la komenco la du diverstemperaturaj partoj estas apartigitaj
let ripetoj; // per clearTimeout(ripatoj.p) oni povas haltigi kurantan eksperimenton

let idealgaso1, idealgaso2;

// trakto de adaptoj per butonoj ...

ĝi("#halto").disabled = true;

kiam_klako("#starto",() => {
    eksperimento();
    ĝi("#halto").disabled = false;
});

kiam_klako("#halto",() => {
    if (ripetoj) clearTimeout(ripetoj.p);
});


// preparo de la eksperimento
function preparo() {

    // ni uzas 30x400-ĉelojn por ekhavi temperaturajn striojn
    // larĝo estu multoblo de 30!
    idealgaso1 = new Idealgaso( // maldekstre
        px_nm*canvas.width/2,
        px_nm*canvas.height,
        px_nm*canvas.height, // profundo = alto
        [ĉellarĝo,1]);
    idealgaso2 = new Idealgaso( // dekstre
        px_nm*canvas.width/2,
        px_nm*canvas.height,
        px_nm*canvas.height, // profundo = alto
        [ĉellarĝo,1]);

    // tempopunkto=0
    t0 = 0;

    // 3320 gaseroj kun maso 4u, rapideco 0.5*ĉelalto, tempintervalo 1/20s
    // PLIBONIGU: pli bone donu la temperaturon kaj kalkulo en Idealgaso la
    // konvenan rapidecon por tio, ĉu?
    const T1 = 273.15; // temperaturo maldekstre en K
    const T2 = 373.15; // temperaturo dekstre en K
    const p = 1e5; // premo 1000 hPa
    const m = 4; // maso 4u
    const V1 = idealgaso1.volumeno()*1e-27; // en m³
    const N1 = Idealgaso.nombro(p,V1,T1); // nombro da eroj en normkondiĉoj

    const V2 = idealgaso2.volumeno()*1e-27; // en m³
    const N2 = Idealgaso.nombro(p,V2,T2); // nombro da eroj en varma gaso

    idealgaso1.preparo(N1,m,T1);
    idealgaso2.preparo(N2,m,T2);

    dgr.viŝu();
    dividita = true;
    dgr.linio(canvas.width/2,0,canvas.width/2,canvas.height,koloro);
}

function pentro() {

    function ig_pentro(idealgaso,offs=0) {
        for (let k=0; k<idealgaso.ĉeloj.length;k++) {
            const ĉelo = idealgaso.ĉeloj[k];
            const T = idealgaso.ĉeltemperaturo(ĉelo);
            const klr = Diagramo.hsl2hex(Diagramo.kolorvaloro(T,250,400),30,80);
            dgr.rektangulo(offs+ĉelo_px*k,0,ĉelo_px,canvas.height,klr);
            for (const e of Object.values(ĉelo)) {
                const x = e.x/px_nm+offs;
                const y = e.y/px_nm;
                const koloro = "#0095DD";
                dgr.punkto(x,y,1,koloro);
            }
        }
    }

    dgr.viŝu();

    // se dividita idealgaso1 estas nur la maldekstra parto
    // se ne plu dividita, ĝi kontenas erojn de ambaŭ partoj
    ig_pentro(idealgaso1);

    if (dividita) { 
        ig_pentro(idealgaso2,canvas.width/2);

        dgr.linio(canvas.width/2,0,canvas.width/2,canvas.height,"#000055",3);
    }

}


function valoroj() {

    // energio E konvertita de kg*px²/intervl² al J = kg*m²/s²
    const E1 = idealgaso1.energio(); // * px_nm * px_nm  * 1000/intervalo * 1000/intervalo; // * 1e-54;
    
    ĝi("#rapido1").innerHTML = nombro(idealgaso1.rapido_ave());
    ĝi("#energio1").innerHTML = nombro(E1);

    const T1 = idealgaso1.temperaturo();
    ĝi("#temperaturo1").innerHTML = nombro(T1);

    if (dividita) {
        // energio E konvertita de kg*px²/intervl² al J = kg*m²/s²
        const E2 = idealgaso2.energio(); // * px_nm * px_nm  * 1000/intervalo * 1000/intervalo; // * 1e-54;
        
        ĝi("#rapido2").innerHTML = nombro(idealgaso2.rapido_ave());
        ĝi("#energio2").innerHTML = nombro(E2);

        const T2 = idealgaso2.temperaturo();
        ĝi("#temperaturo2").innerHTML = nombro(T2);
    }


/*
    ĝi("#entropio").innerHTML = nombro(idealgaso.entropio());
    entalpio.val(idealgaso.entalpio());
    gibsenergio.val(idealgaso.gibsenergio());
    ĝi("#entalpio").innerHTML = nombro(entalpio.averaĝo(),2);
    ĝi("#gibsenergio").innerHTML = nombro(gibsenergio.averaĝo(),2);
    */
}

function paŝo() {
    idealgaso1.procezo();

    const s6 = 6 * 1000 / intervalo;
    if (dividita && idealgaso1.t - t0 > s6) {
        dividita = false;
        idealgaso1.kunigo(idealgaso2);
    }

    if (dividita) idealgaso2.procezo();

    pentro();
    valoroj();
}


function eksperimento() {
    // komencaj valoroj
    //parametroj();

    n_eroj = 1000; // {"malalta": 500, "meza": 1000, "alta": 2000}[kA];

    //var interval = setInterval(pentru, 100);

    preparo();
    if (ripetoj) clearTimeout(ripetoj.p);
    ripetoj = ripetu(
        () => {
            paŝo();
            return true; // ni ne haltos antaŭ butonpremo [Haltu]...(idealgaso.T < d_larĝo);
        },
        intervalo
    )
}

function daŭrigo() {
    const ŝovo = 400;
    t0 += ŝovo;

    function maldekstren(ctx) {
        const imageData = ctx.getImageData(ŝovo,0,ctx.canvas.width-ŝovo,ctx.canvas.height);
        /*
        ctx.translate(-ŝovo,0);
        ctx.clearRect(t0, 0, ctx.canvas.width,ctx.canvas.height);
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
    idealgaso.parametroj(4,20);

    ripetu(
        () => {
            paŝo();
            //return (idealgaso.t - t0 < d_larĝo);
            return true;
        },
        intervalo
    )
}

preparo();

</script>



## fontoj
{: .fontoj}
