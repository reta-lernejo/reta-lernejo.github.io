---
layout: laborfolio
title: Nigra radianto
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
---


<!-- 

https://en.wikipedia.org/wiki/Black_body
http://hyperphysics.phy-astr.gsu.edu/hbase/mod6.html#c4 


-->

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>


<canvas id="spektro" width="500" height="500"></canvas>
spektro de nigra radianto

<script>
    
const canvas = document.getElementById("spektro");
const ctx = canvas.getContext("2d");

/// konstantoj
const h = 6.62607015e-34 ;// Planka efikokvantumo en Js
const c = 2.99792458e8; // lumrapido en m/s
const kB = 1.380649e-23; // Boltzmann-konstanto en J/K

const c1 = 2*h*c*c; // *Math.PI
const c2 = h*c/kB; // faktoro por nm: 1e9

/**
 * Kalkulas la spektran radion de nigra radianto
 * por specifa ondolongo l kaj temperaturo T
 * @param {number} ol ondolongo en nm
 * @param {number} T temperaturo en Kelvin
 */
function spektro(ol,T) {
    const l = ol*1e-9;
    return c1 / (Math.pow(l,5)*(Math.exp(c2/l/T)-1))
}

// kalkuli koloro de temperaturo
// https://en.wikipedia.org/wiki/Planckian_locus#International_Temperature_Scale
// https://astronomy.stackexchange.com/questions/39994/what-is-the-rgb-curve-for-blackbodies
function rgb(T) {
    // la formuloj el Vikipedio validas propre por T en [1667..25000]
    // https://en.wikipedia.org/wiki/Planckian_locus#International_Temperature_Scale
    const x = (T<4000)
        ? -0.2661239e9/T/T/T - 0.234389e6/T/T + 0.8776956e3/T + 0.17991
        : -3.0258469e9/T/T/T + 2.1070379e6/T/T + 0.2226347e3/T + 0.24039;
    const y = (T<2222)
        ? -1.1063814*x*x*x - 1.34811020*x*x + 2.18555832*x - 0.20219683
        : ((T<4000)
            ? -0.9549476*x*x*x - 1.37418593*x*x + 2.09137015*x - 0.16748867
            : 3.0817580*x*x*x - 5.8733867*x*x + 3.75112997*x - 0.37001483
        );    
    const z = 1-x-y;

    // https://github.com/anisotropela/Universe-timeline/blob/b3c8a3456934605f72852c83f4bc46ba22efcf44/timeline.py#L335
    Y   = 1;
    X   = (Y/y) * x;
    Z   = (Y/y) * z;
    const r = 1.656492*X -0.354851*Y -0.255038*Z;
    const g = -0.707196*X +1.655397*Y +0.036152*Z;
    const b = 0.051713*X -0.121364*Y +1.011530*Z;
    console.log("T: "+T+" xyz:"+[x,y,z] + " rgb:"+[r,g,b]);

    return [r,g,b]
}

// desegnu punkton sur la kanvason
function punkto(x,y,r=1,koloro,ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = koloro;
    ctx.fill();
}

function plot(lmin,lmax,smax,T,koloro="black") {
    // kalkulu spektrovaloron por ĉiu x (0..width)
    const dl = (lmax-lmin)/canvas.width;
    let S = []; //, smax = 0;
    //debugger;
    for (let l=lmin;l<lmax;l+=dl) {
        const s = spektro(l,T);
        // if (s>smax) smax = s;
        S.push(s);
    }
    // desegnu la kurbon
    sy = (canvas.height-2)/smax;
    console.log("smax: "+smax+" sy: "+sy);
    for (let x=0;x<canvas.width;x++) {
        const y = Math.trunc(sy*S[x]);
        punkto(x,canvas.height-y,1,koloro,ctx);
        console.log("x: "+x+" y:" +y);
    }
}

const lmin = 100, lmax=5000;
const smax = 6e13;
plot(lmin,lmax,smax,3000,"red");
plot(lmin,lmax,smax,4000,"brown");
plot(lmin,lmax,smax,5000,"green");
plot(lmin,lmax,smax,6000,"blue");
plot(lmin,lmax,smax,7000,"violet");

function Ktest(T) {
    if (T<20000) {
        // gammo-korekto
        const g = 0.055;

        const k = rgb(T).map(x => {
            if (x <= 0.0031308)
                x = 12.92 * x;
            else
                x = (1+g) * x**(1/2.4) - g

            return Math.trunc(255*x);
        });     
        
        const kstr = `rgb(${k[0]},${k[1]},${k[2]})`;
        console.log(kstr);
        punkto(canvas.width-30,30,25,kstr,ctx);
        setTimeout(()=>Ktest(T+100),1000);
    }
}

Ktest(1000);

// test
//const i = spektro(1000,3000);
//console.log("test: "+c1+"/"+c2+"/"+i);

//for (let l=1; l<100; l++) {
//    console.log(l*100 +":" + spektro(l*100,2000))
//}

</script>



$$ S(\lambda) = \frac{2 \pi h c^2}{\lambda^5} \frac{1}{e^{hc / \lambda k_B T}-1} $$


