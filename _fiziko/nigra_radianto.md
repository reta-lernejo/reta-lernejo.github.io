---
layout: laborfolio
title: Nigra radianto
chapter: 4
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - f_koloro-0a
---

... paĝo en preparo ...


<!-- 

https://en.wikipedia.org/wiki/Black_body
https://en.wikipedia.org/wiki/Planck%27s_law
https://en.wikipedia.org/wiki/Thermal_radiation
https://en.wikipedia.org/wiki/Planckian_locus
http://hyperphysics.phy-astr.gsu.edu/hbase/mod6.html#c4 


-->

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>


<canvas id="spektro" width="500" height="500"></canvas>
spektro de nigra radianto

<b id="temperaturo_info">1000K</b>
<input type="range" id="temperaturo" style="width: 50em; max-width: 80%" min="300" max="10000" value="1000" step="100" onchange="aktualigo()" oninput="aktualigo_info()">


<script>
    
const canvas = document.getElementById("spektro");
const ctx = canvas.getContext("2d");

/*
/// konstantoj
const h = 6.62607015e-34 ;// Planka efikokvantumo en Js
const c = 2.99792458e8; // lumrapido en m/s
const kB = 1.380649e-23; // Boltzmann-konstanto en J/K

const c1 = 2*h*c*c; // *Math.PI
const c2 = h*c/kB; // faktoro por nm: 1e9
*/

function aktualigo_info() {
    const temp = ĝi('#temperaturo').value;
    ĝi('#temperaturo_info').textContent = temp + 'K';
}

function aktualigo() {
    const T = ĝi('#temperaturo').value;
    const lmin = 100, lmax=1500;
    const smax = 6e13;
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0,  canvas.width, canvas.height);
    plot(lmin,lmax,smax,T,"white");
    radimakulo(T);
}


/**
 * Kalkulas la spektran radion de nigra radianto
 * por specifa ondolongo l kaj temperaturo T
 * @param {number} ol ondolongo en nm
 * @param {number} T temperaturo en Kelvin
 */
/*
function spektro(ol,T) {
    const l = ol*1e-9;
    return c1 / (Math.pow(l,5)*(Math.exp(c2/l/T)-1))
}
*/

// desegnu punkton sur la kanvason
function punkto(x,y,r=1,koloro,ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = koloro;
    ctx.fill();
}

function vlinio(x,koloro,ctx) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = koloro;
    ctx.stroke(); 
}

function plot(lmin,lmax,smax,T,koloro="black") {
    // kalkulu spektrovaloron por ĉiu x (0..width)
    const dl = (lmax-lmin)/canvas.width;
    let S = []; //, smax = 0;
    let K = [];
    //debugger;
    for (let l=lmin;l<lmax;l+=dl) {
        const s = Koloro.spektro(l,T);
        // if (s>smax) smax = s;
        S.push(s);
        // lumkoloro
        const k = Koloro.lumkoloro(l);
        K.push(k);
    }
    // desegnu la kurbon
    sy = (canvas.height-2)/smax;
    console.log("smax: "+smax+" sy: "+sy);
    for (let x=0;x<canvas.width;x++) {
        const y = Math.trunc(sy*S[x]);
        // montru videblan spektron
        if (K[x] != "#000000") {
            vlinio(x,K[x],ctx);
        }
        // desegnu radiecon
        punkto(x,canvas.height-y,1,koloro,ctx);
        //console.log("x: "+x+" y:" +y);
    }
}

// testu lumkoloro
//console.log(Koloro.lumkoloro(500));

/*
const lmin = 100, lmax=5000;
const smax = 6e13;
plot(lmin,lmax,smax,3000,"red");
plot(lmin,lmax,smax,4000,"brown");
plot(lmin,lmax,smax,5000,"green");
plot(lmin,lmax,smax,6000,"blue");
plot(lmin,lmax,smax,7000,"violet");
*/

function radimakulo(T) {

/*
    // gammo-korekto
    const g = 0.055;

    const k = Koloro.nigra_radianto_rgb(T).map(x => {
        if (x <= 0.0031308)
            x = 12.92 * x;
        else
            x = (1+g) * x**(1/2.4) - g

        return Math.trunc(255*x);
    });     
    */
    const [r,g,b] = Koloro.nigra_radianto_rgb(T);
    const kstr = Koloro.rgb_gammo(r,g,b,0.8); // `rgb(${k[0]},${k[1]},${k[2]})`;
    console.log(kstr);
    // ankoraŭ la koloro ne ĝustas
    punkto(canvas.width-30,30,25,kstr,ctx);
}

// desegnu
aktualigo();

</script>



$$ S(\lambda) = \frac{2 \pi h c^2}{\lambda^5} \frac{1}{e^{hc / \lambda k_B T}-1} $$


