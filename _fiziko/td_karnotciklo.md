---
layout: laborfolio
title: Karnot-ciklo
js:
  - folio-0b
  - sekcio-0b  
  - mathjax/es5/tex-chtml
  - diagramo-0a 
  - f_karnotciklo-0a
---

... paĝo en preparo ...

<!--
https://de.wikipedia.org/wiki/Carnot-Prozess

-->


<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>

<canvas id="karnot" width="300" height="400"></canvas>

<button id="starto">Komencu</button>
<button id="halto">Haltu</button>

<canvas id="pV_dgr" width="300" height="300"></canvas>
<canvas id="TS_dgr" width="300" height="300"></canvas>

<script>

const T1 = 293.15;
const T2 = T1 + 300;

const p_max = 1e6;
const V_max = 5e-2;

const karnot = document.getElementById("karnot");
const modelo = new Diagramo(karnot);

pV_dgr = document.getElementById("pV_dgr");
TS_dgr = document.getElementById("TS_dgr");
dpV = new Diagramo(pV_dgr);
dTS = new Diagramo(TS_dgr);

const kciklo = new KCiklo(T1,T2);

const intervalo = 50; // 100 = 100 ms
let ripetoj;

ĝi("#halto").disabled = true;

kiam_klako("#starto",() => {
    eksperimento();
    ĝi("#halto").disabled = false;
});

kiam_klako("#halto",() => {
    if (ripetoj) clearTimeout(ripetoj.p);
});

// pentru sen jam movi...
modelo_pentru();
preparo();

// donas koloron al temperatur-valoroj inter T1 kaj T2;
function Tkoloro(T) {
    const h = Diagramo.kolorvaloro(T,T1-10,T2+10);
    return Diagramo.hsl2hex(h,90,45);
}

function preparo() {
    dpV.viŝu();
    dpV.skalo_y(0,p_max/100,100,1000,0,"hPa");
    dpV.skalo_x(0,V_max*1000,1,10,0,"l");

    dTS.viŝu();
    dTS.skalo_y(0,Math.ceil(T2*100)/100,10,50,0,"K");
}

/**
 * Pentras la piŝton kaj medion de la Karnot-modelo
 */
function modelo_pentru() {
    modelo.viŝu(); // ĉu necesas ĉiufoje?

    const paŝo = kciklo.paŝo;
    const T = kciklo.gaso.temperaturo;
    const V = kciklo.gaso.volumeno;

    // alteco de piŝto super la fundo (ĉe 360px)
    const py = 360 - 1000*V*5; // 1000l = 1m³, ni kvinobligas tiel, ke
        // 1mol ĉe 20°C = 24l = 120 px, ĉe 300°C = 48l = 240px
    const y12 = 360 - 1000*kciklo.V12*5;
    const y34 = 360 - 1000*kciklo.V12*5;

    if (py>350) debugger;


    function medio() {
        // medio
        const koloro = (
            paŝo.startsWith("Qk")? "#777" :
            (paŝo == "Tk_V-"? Tkoloro(T1) : Tkoloro(T2))
        );
        // varma  kaj malvarma provizoj
        modelo.rektangulo(0,0,80,400,Tkoloro(T2));
        modelo.rektangulo(220,0,300,400,Tkoloro(T1));

        modelo.teksto_x(40,100,T2+" K");
        modelo.teksto_x(260,100,T1+" K");

        // medio-koloro laŭ temperaturo...
        modelo.rektangulo(80,0,140,400,koloro);

        if (paŝo == "Tk_V-" || paŝo.startsWith("Qk")) {
            modelo.linio(80,0,80,400);
        } 
        if (paŝo == "Tk_V+" || paŝo.startsWith("Qk")) {
            modelo.linio(220,0,220,400);
        }
        //modelo.linio(220,20,220,400);
    }

    function gasujo() {
        // ciklo-ŝaltilo
        function nazo_md(alto) {
            modelo.linio(100,alto-2,104,alto);
            modelo.linio(100,alto+2,104,alto);
        }
        function nazo_d(alto) {
            modelo.linio(200,alto-2,196,alto);
            modelo.linio(200,alto+2,196,alto);
        }

        // gasujo
        const koloro = Tkoloro(T);
        modelo.rektangulo(100,0,100,360,"#fff");
        modelo.rektangulo(100,py,100,360-py,koloro);
        modelo.linio(100,0,100,360);
        modelo.linio(100,360,200,360);
        modelo.linio(200,0,200,360);

        // altec-markoj por avanci en la ciklo al varmkonserva paŝo, t.e. medioŝanĝo al izola
        nazo_md(y12);
        nazo_d(y34);
    }

    function piŝto() {
        //modelo.linio(101,200,199,200,"#bbb",10);
        modelo.rektangulo_h3k(101,py-10,98,10,"#eee","#bbb","#999");
        modelo.rektangulo_h3k(120,py-10-80,60,80,"#eee","#bbb","#999");
    }

    medio();
    gasujo();
    piŝto()
}

function diagramo_pentru() {

    const x = pV_dgr.width * kciklo.gaso.volumeno/V_max;
    const y = pV_dgr.height * (1 - kciklo.gaso.premo()/p_max);
    const koloro = Tkoloro(kciklo.gaso.temperaturo);

    dpV.punkto(x,y,1,koloro);
}


function paŝu() {
    kciklo.iteracio();

    modelo_pentru();
    diagramo_pentru();
    //valoroj();
}


function eksperimento() {    
    if (ripetoj) clearTimeout(ripetoj.p);

    preparo();
    ripetoj = ripetu(
        () => {
            paŝu();
            return true; // ni ne haltos antaŭ butonpremo [Haltu]...(idealgaso.T < d_larĝo);
        },
        intervalo
    )
}


</script>

## paŝo 1 - temperaturkonserva (izoterma) kunpremiĝo

Dum la temperaturo estas teanata konstante malalta la gaso kunpremiĝas per ekstera premo, t.e. laboro, aplikata al la gaso.
La varmo estiĝanta en la gaso per kunpremiĝo estas transdonata al la ekstera malvarma medio. Pro la konstanta temperaturo
la produkto $$pV$$ restas konstanta, do pro la malgrandiĝanta volumeno la premo kreskas.

Ĉar temas pri ideala gaso, konstanta temperaturo signifas konstanta interna energio $$dU = 0$$. Konsekvence la tuta farita laboro
(la surfaco sub la kurbo 1-2 en la p-V-diagramo) transformiĝos al varmo akceptata de la malvarma medio, egala al la surfaco 
sub la kurbo 1-2 en la T-S-diagramo.

## paŝo 2 - varmkonserva (adiabata) kunpremiĝo

La piŝtujo estas varmizolita dum la piŝto plu kunpremas la gason, kies temperaturo pro tio altiĝas. Pro la izolo da tuta farita laboro
(la surfaco sub la kurbo 2-3 en la p-V-diagramo) altigas la internan energion de la gaso.

## paŝo 3 - temperaturkonserva (izoterma) etendiĝo

Ĉe temperaturo tenata konstante alta, la gaso etendiĝas pro interna premo. Pro la konstanta temperaturo la interna energio same
restas konstanta kaj la tuta farita laboro (la surfaco sub la kurbo 3-4 en la p-V-diagramo) estas
egala al la varmo (la surfaco sub la kurbo 3-4 en la T-S-diagramo) transdonita de la alttemperatura ekstera medio al la gaso en la piŝtujo.
Pro la konstanta temperaturo ankaŭ la produko $$pV$$ restas konstnat. Konsekvence la premo malaltiĝas inverse proporcie al la kreskanta volumeno.

## paŝo 4 - varmkonserva (adiabata) etendiĝo

La piŝtujo estas varmizolita la gaso plu etendiĝas, kies temperaturo kaj premo pro tio malaltiĝas. Pro la izolo, la laboro farita de la gaso sammezure malaltigas la internan energion.
