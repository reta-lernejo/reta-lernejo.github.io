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

--

<canvas id="pV_dgr" width="300" height="300"></canvas>
<canvas id="TS_dgr" width="300" height="300"></canvas>

<script>

const T1 = 293.15;
const T2 = T1 + 300;

const karnot = document.getElementById("karnot");
const modelo = new Diagramo(karnot);
const kciklo = new KCiklo(T1,T2);

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


    // donas koloron al temperatur-valoroj inter T1 kaj T2;
    function Tkoloro(T) {
        const h = Diagramo.kolorvaloro(T,T1,T2);
        return Diagramo.hsl2hex(h,90,45);
    }

    function medio() {
        // medio
        const koloro = (
            paŝo.startsWith("Qk")? "#000" :
            (paŝo == "Tk_V-"? Tkoloro(T1) : Tkoloro(T2))
        );
        // varma  kaj malvarma provizoj
        modelo.rektangulo(0,0,80,400,Tkoloro(T2));
        modelo.rektangulo(220,0,300,400,Tkoloro(T1));

        // medio-koloro laŭ temperaturo...
        modelo.rektangulo(80,0,140,400,koloro);

        if (paŝo == "Tk_V-") {
            modelo.linio(80,0,80,400);
        } else if (paŝo == "Tk_V+") {
            modelo.linio(80,400,220,400);
        }
        //modelo.linio(220,20,220,400);
    }

    function gasujo() {
        // ciklo-ŝaltilo
        function nazo(alto) {
            modelo.linio(100,alto-2,104,alto);
            modelo.linio(100,alto+2,104,alto);
            modelo.linio(200,alto-2,196,alto);
            modelo.linio(200,alto+2,196,alto);
        }

        // gasujo
        const koloro = Tkoloro(T);
        modelo.rektangulo(100,0,100,360,"#fff");
        modelo.rektangulo(100,py,100,360,koloro);
        modelo.linio(100,0,100,360);
        modelo.linio(100,360,200,360);
        modelo.linio(200,0,200,360);

        // altec-markoj por avanci en la ciklo
        // nazo(40); - ne necesas, ĉar la temperaturo difinas la supran punkton
        nazo(140);
        // nazo(240); - ne necesas, ĉar la temperaturo difinas la malsupran punkton
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

modelo_pentru();

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
