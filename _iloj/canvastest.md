---
layout: laborfolio
js:
  - folio-0b
---

<canvas id="canvas" width="480" height="320" style="border: 1px solid blue"></canvas>

<script>
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let t0 = 0;

  function r(t,h) {
    const koloro = {0: "#522", 400: "#595", 800: "#339", 1200: "#222"}[t0];
    ctx.beginPath();
    ctx.moveTo(t,10);
    ctx.lineTo(t,10+h);
    ctx.lineWidth = 10;
    ctx.strokeStyle = `hsl(${t%360},50%,50%)`;
    ctx.stroke();
  }
  
  function rj() {
    t = t0;
    for (let i=0; i<20; i++) {
      r(t,t/10+i);
      t+=24;
    }
  }

  rj();

  canvas.addEventListener("click",() => {
    offs = 200; // 400
    t0 +=offs;
    console.log("t0: "+t0);

    const imageData = ctx.getImageData(offs,0,ctx.canvas.width-offs,ctx.canvas.height);
    ctx.translate(-offs,0);
    ctx.clearRect(t0, 0, ctx.canvas.width,ctx.canvas.height);
    ctx.putImageData(imageData, 0, 0);

    rj();
  })
</script>