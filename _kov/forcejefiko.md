---
layout: laborfolio
title: Forcejefiko
js:
  - folio-0c
  - kanvas-0a
---


## forcejefikaj gasoj en la atmosfero


- co2 ktp en ppm?
- kiom absolute en tuta atm?

fontoj:
- https://en.wikipedia.org/wiki/Greenhouse_gas
- https://www.umweltbundesamt.de/daten/umweltzustand-trends/klima/atmosphaerische-treibhausgas-konzentrationen#lachgas
- https://www.ds.mpg.de/139645/08
- https://www.uni-flensburg.de/fileadmin/content/institute/biologie/arbeitsgruppe-christian/dokumente/projekte/der-norden-taucht-ab/03-klimawirksame-gase-und-der-treibhauseffekt-ursachen.pdf


## energikapacito relative n2, o2

- molekulformo difinas kiom da energio ĝi povas konservi
- energiniveloj difinas kiajn frekvencojn de fotonoj molekulo povas akcepti (absorbi)

## verda lumo de suno vs ruĝa lumo de tero

[Spektro de nigra radianto](https://reta-lernejo.github.io/fiziko/nigra_radianto.html)

Suna surfaco: 6000 K - maksimumo ĉe bluverda lumo
Tera surfaco: 300 K - maksimuma en infraruĝo

## atmosferaj fenestroj (spektrobendoj) de frekvenc-tralaso vs bloko

## radia ekvilbro 

https://de.wikipedia.org/wiki/Strahlungsgleichgewicht
(kun sen albedo kaj forceja efik.)

## simula modelo


<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>

<canvas id="kampo" width="500" height="500"></canvas>
simulado de ideala gaso

<button id="starto">Komencu</button>
<button id="halto">Haltu</button>

![simulo de radia ekvilibro (ideo)](../assets/bld/forcejsimulo.png)


<script>

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");

let ripetoj; // per clearTimeout(ripatoj.p) oni povas haltigi kurantan eksperimenton


// unua pentrado
pentro();

/*
ĝi("#halto").disabled = true;
btn_stato(false);

kiam_klako("#starto",() => {
    eksperimento();
    ĝi("#halto").disabled = false;
    btn_stato(true);
});

kiam_klako("#halto",() => {
    if (ripetoj) clearTimeout(ripetoj.p);
});
*/

function pentro() {
  viŝu(ctx);
  streko(ctx,{x: canvas.width/4, y:canvas.height},{x: 0, y:0});
  streko(ctx,{x: canvas.width*3/4, y:canvas.height},{x: canvas.width, y:0});
}


function paŝo() {
  //xxx.procezo();
  pentro();
  // valoroj();
}


function eksperimento() {

    n_eroj = 1000; // {"malalta": 500, "meza": 1000, "alta": 2000}[kA];

    //var interval = setInterval(pentru, 100);

    // preparo();
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
  const d_alto = d_rapidoj.getAttribute("height");
  linio(d_alto/3,dgr_r);
  linio(3/4*d_alto,dgr_r);

  ripetu(
      () => {
          paŝo();
          return true; // ni ne haltos antaŭ butonpremo [Haltu]...
      },
      intervalo
  )
}

</script>

