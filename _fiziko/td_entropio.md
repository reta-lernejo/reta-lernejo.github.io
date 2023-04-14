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
https://de.wikipedia.org/wiki/Ideales_Gas#Ideales_Gasgemisch
https://de.wikipedia.org/wiki/Gibbssches_Paradoxon
https://en.wikipedia.org/wiki/Entropy_of_mixing

https://de.wikipedia.org/wiki/Sackur-Tetrode-Gleichung
http://hyperphysics.phy-astr.gsu.edu/hbase/Therm/entropgas.html
https://de.wikipedia.org/wiki/Ideales_Gas#Entropie


https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_General_Chemistry_(Petrucci_et_al.)/19%3A_Spontaneous_Change%3A_Entropy_and_Gibbs_Energy/19.3%3A_Evaluating_Entropy_and_Entropy_Changes

https://physics.stackexchange.com/questions/334813/entropy-of-two-subsystems-exchanging-energy

https://eo.wikibooks.org/wiki/Termodinamiko/Leciono_1#Ideala_gaso
https://de.wikipedia.org/wiki/Ideales_Gas
https://de.wikipedia.org/wiki/Innere_Energie

https://www.tec-science.com/de/thermodynamik-waermelehre/kinetische-gastheorie/maxwell-boltzmann-verteilung/#Wahrscheinlichste_Geschwindigkeit

https://www.pfeiffer-vacuum.com/de/know-how/einfuehrung-in-die-vakuumtechnik/grundlagen/thermische-teilchengeschwindigkeit/

https://de.wikipedia.org/wiki/Adiabatische_Zustands%C3%A4nderung#Adiabaten_des_idealen_Gases
-->

## Enkonduko

Noether - simetrio -> responda konservata grando
-> energiokonservo

energiuzo por laboro... fakte ne la energio mem uziĝas sed energidiferencoj:

1. akvo sur monto -> akvofluo -> movenergio -> uzo por peli muelilon
2. diferenco detemperaturo / premo de du gasoj -> piŝto / rotoro -> movenergio ...
3. elektra potencialdiferenco -> kurento -> peli elektran aparaton

a) uzebla energio b) neuzebla / elspezita energio
...?



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
1px =~ 0.1nm
1px³ =~ 1e-3nm³
V = 300x400x400 px³ =~ 30x40x40nm³ = 4.8e4nm³ = 4.8e-23m³
He-radiuso: 140pm = 1.4px

por ideala gaso en normkondiĉoj:
pₙ = 1.0bar = 1000hPa; 
T1 = Tₙ-20K = 273.15K = 0°C
T2 = T1+100K = 100°C
ni ricevus
N1 = p*V / (kB*T1) = 1272 gaseroj
N2 = p*V / (kB*T2) = 931 gaseroj

maso/denso
-----------
He-maso: 4u = 6.64e-27 kg

terma energio
-----------
EN1 = N*kB*T = 1272 * 1.38e-23J/K * 273.15K = 4.8e-18J
unuopa E1 = 1.38e-23J/K * 293.15K = 3.8e-21J

EN2 = N*kB*T = 931 * 1.38e-23J/K * 373.15K = 4.8e-18J
unuopa E2 = 1.38e-23J/K * 373.15K = 5.1e-21J


rapido:
-----------
He: v1 = √(2E1/m) = √(7.6e-21J/6.64e-27kg)  = 1070m/s ~ 1.1e3m/s
He: v2 = √(2E2/m) = √(10.2e-21J/6.64e-27kg) = 1239m/s = 1.2e3m/s

entropio:
----------
vd. https://de.wikipedia.org/wiki/Ideales_Gas#Mischungsentropie_eines_idealen_Gasgemischs
absoluta, laŭ simpligita formo de Sackuhr-Tetrode-ekvacio:
S = N*kB*(ln(V/N) + 3/2*ln(T) + N*σ
kun entropikonstanto σ = kB(ln[(2*pi*m*kB)^³/² / h³] + 5/2)

ĉe miksado de du *samnombraj* (N=1050) volumenoj la entropidiferenco estus:
(vd https://en.wikipedia.org/wiki/Entropy_of_mixing)
ΔS = - N*kB*ln(1/2) (ĉ. 1e-20)

S1 = entropie(1272,4u,4.8e-23m³,273.15K)
S2 = entropio(931,4u,4.8e-23m³,373.15K)
S1 = 1.815e-18
S2 = 1.338e-18
S1+S2 = 3.153e-18

S = entropio(2203,4u,9.6e-23m³,323.15K) 
  = 3.155e-18.

Do ni ricevas nr devion de 0.2e-20 - eble N ĉe ni estas tro malgranda por uzi la simpligitan formulon?

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
miksiĝo de du idealaj gasoj diverstemperaturaj

<button id="starto">Komencu</button>
<button id="halto">Haltu</button>

| | maldekstre | dekstre | kune |
|volumeno (nm³)|<span id="volumeno1"/>|<span id="volumeno2"/>|<span id="volumeno3"/>|
|nombro|<span id="nombro1"/>|<span id="nombro2"/>|<span id="nombro3"/>|
|rapido (Ø m/s)|<span id="rapido1"/>|<span id="rapido2"/>|<span id="rapido3"/>|
|energio (J)|<span id="energio1"/>|<span id="energio2"/>|<span id="energio3"/>|
|temperaturo (K)|<span id="temperaturo1"/>|<span id="temperaturo2"/>|<span id="temperaturo3"/>|
|entropiŝanĝo (J/K)|<span id="entropio1"/>|<span id="entropio2"/>|<span id="entropio3"/>|

(pro la malgrandeco kaj simpleco de nia eksperimento, tiuj valoroj
povas esti iom malprecizaj kaj nestabilaj dum la eksperimento.)

<canvas id="kurboj" width="600" height="400"></canvas>
gaseroj maldekstre (speco 1 = blua, speco 2 = flava) kaj entropiŝanĝo (ΔS, nigra)

<script>

const canvas = document.getElementById("kampo");
const dgr = new Diagramo(canvas);
const kurboj = document.getElementById("kurboj");
const krb = new Diagramo(kurboj);
    // pro pli bona kombino de interkovriĝantaj gradientoj 
    //dgr.ctx.globalCompositeOperation = "soft-light"; // lighter
const koloro = "cornflowerblue";

// skal-faktoroj 
const px_nm = 0.1; // 1px = 0.1nm
const ĉellarĝo = 1/6; 
const ĉelalto = 1/4;

const ĉelo_nm = 600*ĉellarĝo*px_nm; // ĉelalto en nm
const ĉelo_px = canvas.width*ĉellarĝo;

const intervalo = 50; // 50 ms
const r_ero = 1.4; // radiuso de eroj

//let v_max = K/2; // 10*K; K*2;  // maksimuma rapideco ~ temperaturo

let t0 = 0; // tempo komenciĝu ĉe T=0
let ripetoj; // per clearTimeout(ripatoj.p) oni povas haltigi kurantan eksperimenton

let idealgaso;
let N1, N2; // ero-nombroj, du specoj

class IG2 extends Idealgaso {
    kolizio(e,nx,ny) {
        // traktu koliziojn kun la meza vando, ĉu la vektoro n-e tranĉas la vandon?
        if (nx != e.x) {
            const lambda = (this.larĝo/2 - e.x) / (nx - e.x);
            if (lambda >= 0 && lambda <= 1) {
                const sy = e.y + lambda*(ny-e.y);
                if (sy/this.alto > ĉelalto && sy < this.alto) {
                    // kolizio kun la vando - reĵetu!
                    e.vx = -e.vx;
                    nx = this.larĝo/2 - (nx - this.larĝo/2);
                }
            }
        }

        return super.kolizio(e,nx,ny);
    }

    // kalkulu energion kaj eronombron aparte por dekstra kaj maldekstra parto
    dekstre_maldekstre() {
        let md = {n:0, e: 0, "-1": 0, "1": 0};
        let d = {n: 0, e: 0, "-1": 0, "1": 0};

        for (let k=0; k < this.ĉeloj.length; k++) {
            const ĉelo = this.ĉeloj[k];
            const pos = this.ĉelpos(k);
            const nj = this.ĉelnombroj(ĉelo);

            if (pos.kol < 1/ĉellarĝo/2) {
                md.n += Object.keys(ĉelo).length;
                md.e += this.ĉelenergio(ĉelo);
                md[-1] += nj[-1]||0;
                md[1] += nj[1]||0;
            } else {
                d.n += Object.keys(ĉelo).length;
                d.e += this.ĉelenergio(ĉelo);
                d[-1] += nj[-1]||0;
                d[1] += nj[1]||0;
            }
        }

        md.dS = Idealgaso.entropikresko(md[-1],md[1]);
        d.dS = Idealgaso.entropikresko(d[-1],d[1]);

        return [md,d];
    }
}

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
    idealgaso = new IG2( // maldekstre
        px_nm*canvas.width,
        px_nm*canvas.height,
        px_nm*canvas.height, // profundo = alto
        [ĉellarĝo,ĉelalto]);

    // tempopunkto=0
    t0 = 0;

    // 3320 gaseroj kun maso 4u, rapideco 0.5*ĉelalto, tempintervalo 1/20s
    // PLIBONIGU: pli bone donu la temperaturon kaj kalkulo en Idealgaso la
    // konvenan rapidecon por tio, ĉu?
    // const T1 = 273.15; // temperaturo maldekstre en K
    // const T2 = 373.15; // temperaturo dekstre en K
    // provizore mi ne trovis formulon por entropikresko ĉe miksado de diverstemperaturaj gasoj!
    const T1 = 293.15; // temperaturo maldekstre en K
    const T2 = 293.15; // temperaturo dekstre en K
    const p = 1e5; // premo 1000 hPa
    const m = 4; // maso 4u
    const V = idealgaso.volumeno()*1e-27; // en m³
    N1 = Idealgaso.nombro(p,V/2,T1); // nombro da eroj en normkondiĉoj maldekstre
    N2 = Idealgaso.nombro(p,V/2,T2); // nombro da eroj en varma gaso dekstre

    // provizore... ni devas aldoni eblecon
    // de diferencaj eroj/kondiĉoj en diversaj ĉeloj ĉe Idalgaso!
    idealgaso.preparo(m);
    idealgaso.kreu_erojn(N1,T1,-1,0,0,px_nm*canvas.width/2,px_nm*canvas.height);
    idealgaso.kreu_erojn(N2,T2,1,px_nm*canvas.width/2,0);

    ĝi("#rapido1").innerHTML = '';
    ĝi("#energio1").innerHTML = '';
    ĝi("#temperaturo1").innerHTML = '';
    ĝi("#entropio1").innerHTML = '';

    ĝi("#rapido2").innerHTML = '';
    ĝi("#energio2").innerHTML = '';
    ĝi("#temperaturo2").innerHTML = '';
    ĝi("#entropio2").innerHTML = '';

    ĝi("#rapido3").innerHTML = '';
    ĝi("#energio3").innerHTML = '';
    ĝi("#temperaturo3").innerHTML = '';
    ĝi("#entropio3").innerHTML = '';

    dgr.viŝu();
    krb.viŝu();

    //dividita = true;

    dgr.linio(
        canvas.width/2,canvas.height*ĉelalto,
        canvas.width/2,canvas.height,
        koloro);
}

function pentro() {
    const satureco = 90;
    const heleco = 90;

    function hsl(h) { return Diagramo.hsl2hex(h,satureco,heleco); }
    function h2sl(h1,h2) { return hsl(((h1+h2)/2)%360); }

    function ig_pentro(idealgaso,offs=0) {
        /*
        // kalkulu temperaturojn kaj kolorvalorojn por la ĉeloj
        let koloroj = [];
        for (const ĉelo of idealgaso.ĉeloj) {
            const T = idealgaso.ĉeltemperaturo(ĉelo);
            koloroj.push(Diagramo.kolorvaloro(T,200,400));
        }
        */

        // pentru la ĉelojn kun kolora fono
        for (let k=0; k<idealgaso.ĉeloj.length; k++) {
            const ĉelo = idealgaso.ĉeloj[k];
            const p = idealgaso.ĉelpos(k);

            /*
            //const k1 = k? h2sl(koloroj[k-1],koloroj[k]) : hsl(koloroj[k]);
            const km = hsl(koloroj[k]);
            //const k2 = (k<idealgaso.ĉeloj.length-1)? h2sl(koloroj[k],koloroj[k+1]) : hsl(koloroj[k]);

            // dgr.rektangulo_h3k(offs+ĉelo_px*k,0,ĉelo_px,canvas.height,k1,km,k2);
            dgr.rektangulo( //_gr(
                p.kol*ĉelo_px, p.lin*ĉelo_px,
                (1+p.kol)*ĉelo_px, (1+p.lin)*ĉelo_px,
                km, km+"00");
            */

            for (const e of Object.values(ĉelo)) {
                const x = e.x/px_nm+offs;
                const y = e.y/px_nm;
                const koloro = e.k<0? "#0095DD": "#DD9500";
                dgr.punkto(x,y,1,koloro);
            }
        }
    }

    dgr.viŝu();

    ig_pentro(idealgaso);

    dgr.linio(
        canvas.width/2,canvas.height*ĉelalto,
        canvas.width/2,canvas.height,
        "#000055",3);

}


function valoroj() {
    const [md,d] = idealgaso.dekstre_maldekstre();
    const maso = idealgaso.maso;
    const volumeno = idealgaso.volumeno();
    const Tmd = Idealgaso.temperaturo(md.n,md.e);
    const Td = Idealgaso.temperaturo(d.n,d.e);
    const dS = md.dS+d.dS;

    ĝi("#volumeno1").innerHTML = nombro(volumeno/2);
    ĝi("#nombro1").innerHTML = nombro(md.n);
    ĝi("#rapido1").innerHTML = nombro(Idealgaso.rapido(maso, Tmd));
    ĝi("#energio1").innerHTML = nombro(md.e);
    ĝi("#temperaturo1").innerHTML = nombro(Tmd);
    ĝi("#entropio1").innerHTML = nombro(md.dS);

    ĝi("#volumeno2").innerHTML = nombro(volumeno/2);
    ĝi("#nombro2").innerHTML = nombro(d.n);
    ĝi("#rapido2").innerHTML = nombro(Idealgaso.rapido(maso, Td));
    ĝi("#energio2").innerHTML = nombro(d.e);
    ĝi("#temperaturo2").innerHTML = nombro(Td);
    ĝi("#entropio2").innerHTML = nombro(d.dS);


    ĝi("#volumeno3").innerHTML = nombro(volumeno);
    ĝi("#nombro3").innerHTML = nombro(idealgaso.nombro);
    //ĝi("#rapido3").innerHTML = nombro(idealgaso.rapido_ave());
    ĝi("#rapido3").innerHTML = nombro(Idealgaso.rapido(maso,idealgaso.temperaturo()));
    ĝi("#energio3").innerHTML = nombro(idealgaso.energio());
    ĝi("#temperaturo3").innerHTML = nombro(idealgaso.temperaturo());
    ĝi("#entropio3").innerHTML = nombro(dS);

    // desegnu valorojn en la malsupra diagramo

            // ĉe du specoj: maksimuma entropio, kiam duono de ĉiu speco sur ĉiu flanko
    const dS_max = Idealgaso.entropikresko(N1,N2);
    const t = idealgaso.t/10;
    if (t%10 && t<kurboj.width) {
        krb.punkto(t,kurboj.height - kurboj.height*md[-1]/N1,1,"#0095DD");
        krb.punkto(t,kurboj.height - kurboj.height*md[1]/N2,1,"#DD9500");
        krb.punkto(t,kurboj.height - kurboj.height*dS/dS_max);
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
    t0 += ŝovo;

    function maldekstren(ctx) {
        const imageData = ctx.getImageData(ŝovo,0,
            ctx.canvas.width-ŝovo,ctx.canvas.height);
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
