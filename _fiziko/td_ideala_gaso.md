---
layout: laborfolio
title: Ideala gaso
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - f_idealgas-0b
  - bufro-0a
---

<!--

https://eo.wikibooks.org/wiki/Termodinamiko/Leciono_1#Ideala_gaso
https://de.wikipedia.org/wiki/Ideales_Gas
https://de.wikipedia.org/wiki/Innere_Energie

https://www.tec-science.com/de/thermodynamik-waermelehre/kinetische-gastheorie/maxwell-boltzmann-verteilung/#Wahrscheinlichste_Geschwindigkeit

https://www.pfeiffer-vacuum.com/de/know-how/einfuehrung-in-die-vakuumtechnik/grundlagen/thermische-teilchengeschwindigkeit/

https://de.wikipedia.org/wiki/Adiabatische_Zustands%C3%A4nderung#Adiabaten_des_idealen_Gases
-->

... paĝo en preparo...

Ideala gaso estas simpligita modelo de realaj gasoj, en kiu oni supozas, ke la eroj havas mason sed neniun etendon kaj ne interagas per elektromagnetaj fortoj. Ili ne rotacias aŭ vibras kaj la energio de tiu ideala gaso estas pure la suma kineta energio de la eroj. Kvankam tre simpligita tiu modelo estas konvena por priskribi ecojn de gasoj kaj ties statoŝanĝoj per relative simplaj matematikaj kalkuloj.
Realajn gasojn oni priskribas per formuloj, kiuj modifas la formulojn de ideala gaso. Plej simile al ideala gaso kondutas la noblaj gasoj kaj hidrogeno.

La kinetan energion de $$N$$ gaseroj kun maso $$m$$ kaj rapideco $$v$$ oni ricevas kiel sumo [^W3]:

$$E=\sum_{n=1}^N{1/2 \cdot m \cdot v_n^2}$$

La temperaturon de ideala gaso oni tiam ricevas per la konstanto de Boltzmann $$k_B = \pu{1,380649e-23 J / K}$$ [^W2]

$$T = \frac{\frac{2}{3} E}{N \cdot k_B}$$

Por la produkto de premo kaj volumeno de ideala gaso cetere validas la stato-ekvacio [^W1]:

$$p \cdot V = N \cdot k_B \cdot T \tag{1}$$

aŭ sur makroskopa skalo por mola kvanto $$n$$ kaj la universala gaskonstanto $$R = N_A \cdot k_B = \pu{8,31446261815324 J // mol K}$$:

$$p \cdot V = n \cdot R \cdot T$$

Tiel oni povas ekzemple elkalkuli, kiom da gaseroj enhavas volumeno de 100 nm³ sub normaj kondiĉoj de $$\pu{1000 hPa}$$ kaj $$\pu{293,15 K}$$:

$$N = pV / (k_B T) = \frac{\pu{e5 kg // m s^2} \cdot \pu{e-21 m^3}}{\pu{1,38e-23 m^2 kg // K s^2} \cdot \pu{293,15 K}} \approx \pu{25000}$$

Ni komparu kun reala heliumo de norma denso $$\pu{0,1785 kg/m^3}$$. Tiu havas iom pli da atomoj en la sama volumeno:

$$ N_{He} = \frac{\pu{0,1785 kg/m^3} \cdot \pu{e-21 m^3} }{ \pu{6,64e-27kg}} \approx \pu{27000} $$

La mezuman energion kaj rapidon de unuopa gasero kun maso $$\pu{4 u}$$ (maso de heliumatomo), ni ricevas kiel:

$$\begin{align} E &= \frac{3}{2} k_B T = \pu{1,38e-23 m^2 kg // K s^2} \cdot \pu{293,15 K} = \pu{6,07e-21 J}\\
v &= \sqrt{\frac{2E}{m}} = \sqrt{\frac{2 \cdot \pu{ 6,07e-21 kg m^2 // s^2}}{\pu{6,64e-27kg}}} \approx \pu{1350 m/s}\end{align}$$

Mezumaj rapidecoj de realaj gasmolekuloj devias de tiu nombro pli aŭ malpli (hidrogeno 1754, heliumo 1245, 
vaporo 585, nitrogeno 470, argono 394, karbondioksido 375)[^Pf].

## eksperimento
{: .sekcio}

En nia eksperimento ni provas simuli idealan gason en kubo kun latera longeco de 50nm. En normaj kondiĉoj, t.e. 20 °C = 293,15 K kaj premo de 1000 hPa, tiu volumeno enhavas proksimume 3090 gaserojn. Ĉe heliumo, kiu kondutas proksimume kiel ideala gaso, estus 3360 atomoj. Ĉar ne eblas montri en modelo rapidojn de je 1 km/s, ni simple malrapidigas la tempon je faktoro $$10^{-11}$$. 
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



<canvas id="kampo" width="500" height="500"></canvas>
simulado de ideala gaso

<button id="starto">Komencu</button>
<button id="halto">Haltu</button>

|rapido (Ø m/s)|<span id="rapido"/>|
|energio (J)|<span id="energio"/>|
|temperaturo (K)|<span id="temperaturo"/>|
|premo (Pa)|<span id="premo"/>|
|volumeno (nm³)|<span id="volumeno"/>|

<button id="Tminus">-25 K</button>
<button id="Tplus">+25 K</button>
<button id="Vminus">-250 nm³</button>
<button id="Vplus">+250 nm³</button>

<canvas id="pvt" width="500" height="500"></canvas>
premo, volumeno kaj temperaturo (kolore)


<script>

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");
const pvt = document.getElementById("pvt");
const dgr_pvt = pvt.getContext("2d");
dgr_pvt_prep();

// skal-faktoroj 
const px_nm = 0.1; // 1px = 0.1nm
const ĉelo = 1/25; // ĉelalto (kaj -larĝo) estas 1/20 de 320px
const ĉelo_nm = 500*ĉelo*px_nm; // ĉelalto en nm: 16 * 0.08nm = 1.28nm

const intervalo = 50; // 50 ms
const r_ero = 1.4; // radiuso de eroj

//let v_max = K/2; // 10*K; K*2;  // maksimuma rapideco ~ temperaturo

let T0 = 0; // tempo komenciĝu ĉe T=0
let ripetoj; // per clearTimeout(ripatoj.p) oni povas haltigi kurantan eksperimenton

// ni uzas 16x16-ĉelojn por faciligi la kolizi-simuladon k.s.
// larĝo kaj alto estu multoblo de 16!
const idealgaso = new Idealgaso(
    px_nm*canvas.width,
    px_nm*canvas.height,
    px_nm*canvas.height, // profundo = alto
    ĉelo);

// trakto de adaptoj per butonoj ...

// ŝanĝi inter aktiva kaj malaktiva butonstato
function btn_stato(premebla) {
    ĝi("#Tminus").disabled = !premebla || idealgaso.temperaturo() < 30;
    ĝi("#Tplus").disabled = !premebla || idealgaso.temperaturo() > 970;
    ĝi("#Vminus").disabled = !premebla || idealgaso.volumeno() <= 1e4;
    ĝi("#Vplus").disabled = !premebla || idealgaso.volumeno() >= 24.8e4;
}

ĝi("#halto").disabled = true;
btn_stato(false);

kiam_klako("#starto",() => {
    eksperimento();
    ĝi("#halto").disabled = false;
    btn_stato(true);
});

kiam_klako("#Tminus",() => {
    btn_stato(false);
    premoj.malplenigu();
    idealgaso.temperaturadapto(idealgaso.temperaturo()-25);
});

kiam_klako("#Tplus",() => {
    btn_stato(false);
    premoj.malplenigu();
    idealgaso.temperaturadapto(idealgaso.temperaturo()+25);
});

kiam_klako("#Vminus",() => {
    btn_stato(false);
    premoj.malplenigu();
    idealgaso.larĝadapto(idealgaso.larĝo-1);
    const nw = canvas.width - 1/px_nm;
    canvas.width=nw;
});

kiam_klako("#Vplus",() => {
    btn_stato(false);
    premoj.malplenigu();
    idealgaso.larĝadapto(idealgaso.larĝo+1);
    const nw = canvas.width + 1/px_nm;
    canvas.width=nw;
});


kiam_klako("#halto",() => {
    if (ripetoj) clearTimeout(ripetoj.p);
});

function dgr_pvt_prep() {
    dgr_pvt.clearRect(0, 0, pvt.width, pvt.height);
    dgr_pvt.font = "12px sanserif";
    dgr_pvt.fillText("1",3,pvt.height-100);
    dgr_pvt.fillText("2",3,pvt.height-200);
    dgr_pvt.fillText("3",3,pvt.height-300);
    dgr_pvt.fillText("4",3,pvt.height-400);
    dgr_pvt.fillText("p [MPa]",3,pvt.height-485);

    dgr_pvt.fillText("10⁴",20,495);
    dgr_pvt.fillText("10⁵",200,495);
    dgr_pvt.fillText("2·10⁵",400,495);
    dgr_pvt.fillText("V [nm³]",450,495);
}

// preparo de la eksperimento
function preparo() {
    dgr_pvt_prep();

    // tempopunkto=0
    T0 = 0;
    
    // 3320 gaseroj kun maso 4u, rapideco 0.5*ĉelalto, tempintervalo 1/20s
    // PLIBONIGU: pli bone donu la temperaturon kaj kalkulo en Idealgaso la
    // konvenan rapidecon por tio, ĉu?
    const T = 293.15; // temperaturo en K
    const p = 1e5; // premo 1000 hPa
    const m = 4; // maso 4u
    const V = idealgaso.volumeno()*1e-27; // en m³
    const N = Idealgaso.nombro(p,V,T); // nombro da eroj en normkondiĉoj
    idealgaso.preparo(N,m,T);
    premoj = new Bufro(1000/intervalo); // por averaĝi je 1s
}

/*
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
*/

// desegnu eron en la eksperimento
function ero(e,ctx) {
    // unu ero tipo -1 aŭ 1
    const x = e.x/px_nm;
    const y = e.y/px_nm;
    const koloro = "#0095DD";
    ctx.beginPath();
    ctx.arc(x, y, r_ero, 0, Math.PI * 2);
    ctx.fillStyle = koloro;
    ctx.fill();
}

const d_larĝo = pvt.getAttribute("width");

function pentro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const ĉelo of idealgaso.ĉeloj) {
        for (e of Object.values(ĉelo)) {
            ero(e,ctx);
        }
    }
}

// desegnu punkton p,V,T en la diagramo,
// T difinas la koloron
function punkto(p,V,T) {
    const y = p/10000;
    const x = V/500;
    const h = (240 - 240*Math.sqrt(T/1000)) % 360;
    const l = T/20;

    if (x<pvt.width && y<pvt.height) {
        dgr_pvt.fillStyle = `hsl(${h} 100% ${l}%)`;
        dgr_pvt.fillRect(x,500-y,3,3);
    }
}

function valoroj() {
    function n_eo(nombro,prec=3) {
        const p = nombro.toPrecision(prec).replace('.',',');
        return p.replace(/e\+?(\-?\d+)/,'·10<sup>$1</sup>').replace('Infinity','--').replace('NaN','--');
    }

    // energio E konvertita de kg*px²/intervl² al J = kg*m²/s²
    const E = idealgaso.energio(); // * px_nm * px_nm  * 1000/intervalo * 1000/intervalo; // * 1e-54;
    
    ĝi("#rapido").innerHTML = n_eo(idealgaso.rapido_ave());
    ĝi("#energio").innerHTML = n_eo(E);

    const T = idealgaso.temperaturo();
    ĝi("#temperaturo").innerHTML = n_eo(T);

    premoj.val(idealgaso.premo());
    const p = premoj.averaĝo();
    ĝi("#premo").innerHTML = n_eo(p,2);
    

    // ni kalkulas 1px = 80pm, tiel ke radiuso de heliumo = 140pm ~ 2px
    // krome ni supozas profundon de 320px, t.e. egala al alteco de la areo
    //const v = canvas.height*px_nm * canvas.height*px_nm * canvas.width*px_nm;
    const V = idealgaso.volumeno();
    ĝi("#volumeno").innerHTML = n_eo(V);

    if (premoj.plena) {
        punkto(p,V,T);
        btn_stato(true);
    }
}

function paŝo() {
    idealgaso.procezo();
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
    idealgaso.parametroj(4,20);

    ripetu(
        () => {
            paŝo();
            return (idealgaso.T - T0 < d_larĝo);
        },
        intervalo
    )
}

</script>

## temperaturkonserva kaj varmkonserva statoŝanĝoj
{: .sekcio}

Kiam oni tenas sistemon kun ideala gaso je konstanta temperaturo la produkto de premo kaj volumeno restas konstanta kongrue al la formulo (1). Do se oni grandigas aŭ malgrandigas la volumenon propocie malaltiĝas aŭ altiĝas la premo. Desegnante tiajn temperaturkonservajn (izotermajn) statoŝanĝojn en diagramo, oni ricevas hiperbolajn kurbojn.

Kiam ni ŝanĝas la volumenon en nia eksperimento, kiu simulas varmizolitan ujon en tiu kazo, la temperaturo tamen iom ŝanĝigas samtempe kun la premo. Efektive la ena energio de la sistemo, kondiĉe ke ĝi estas varmizolita, iomete ŝanĝiĝas: per puŝo de piŝto (aŭ flanka vando) malgrandigante la volumenon aldoniĝas laboro (en mikroskopa skalo la gaseroj ricevas ekstran puŝeton de la vando ĉe ciu kolizio). Kaj inverse, se la volumeno grandiĝas, la sistemo faras laboron, t.e perdas iom da energio, transdonata al la piŝto aŭ vando. Tian statoŝanĝon oni nomas varmkonserva (aŭ adiabata)[^W4].

Tiu energiŝanĝo estas kalkulebla per:

$$dE = -N k_B T \cdot \frac{dV}{V}$$

## sonrapido en ideala gaso
{: .sekcio}

Cetere la rapido de sono en gaso estas malpli alta ol la mezuma rapido de la gaseroj. Oni
povas elkalkuli ĝin por ideala gaso per[^W5]:

$$c =  \sqrt{\frac{3}{2}\frac{k_B T}{m}} = \sqrt{\frac{3}{2}\frac{R T}{M}}$$

Por norma temperaturo kaj mola maso $$\pu{4 g}$$ de heliumo ni ricevas:

$$c = \sqrt{\frac{\pu{8,314 J // mol K} \cdot \pu{293,15 K}}{\pu{0,004 kg // mol}}} = \pu{955 m/s} $$

En reala heliumo oni mezuras iom pli altan sonrapidon de $$\pu{980 m/s}$$.


## fontoj
{: .fontoj}

[^W1]: [Ideales Gas](https://de.wikipedia.org/wiki/Ideales_Gas)
[^W2]: [Innere Energie](https://de.wikipedia.org/wiki/Innere_Energie)
[^W3]: [Kinetische Energie](https://de.wikipedia.org/wiki/Kinetische_Energie)
[^W4]: [Adiabaten des idealen Gases](https://de.wikipedia.org/wiki/Adiabatische_Zustands%C3%A4nderung#Adiabaten_des_idealen_Gases)
[^W5]: [Schallgeschwindigkeit im idealen Gas](https://de.wikipedia.org/wiki/Schallgeschwindigkeit#Schallgeschwindigkeit_im_idealen_Gas)
[^Pf]: [Thermische Teilchengeschwindigkeit](https://www.pfeiffer-vacuum.com/de/know-how/einfuehrung-in-die-vakuumtechnik/grundlagen/thermische-teilchengeschwindigkeit/)