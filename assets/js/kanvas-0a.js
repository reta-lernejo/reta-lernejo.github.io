function viŝu(ctx) {
    const alto = ctx.canvas.getAttribute("height");
    const larĝo = ctx.canvas.getAttribute("width");
    ctx.clearRect(0, 0, larĝo, alto);
}

// desegnu horizontalan linion en la alto y
function hlinio(ctx,y,diko=1,koloro="#000") {
    const larĝo = ctx.canvas.getAttribute("width");
    ctx.beginPath();
    ctx.moveTo(masefiko.T-T0, y);
    ctx.lineTo(larĝo,y);
    ctx.strokeStyle = koloro;
    ctx.lineWidth = diko;
    ctx.stroke();
}

// desegnu strekon inter du punktoj p0, p1
function streko(ctx,p0,p1,diko=2,koloro="#0095DD") {
    ctx.beginPath();
    ctx.moveTo(p0.x,p0.y);
    ctx.lineTo(p1.x,p1.y);
    ctx.lineWidth = diko;
    ctx.strokeStyle = koloro;
    ctx.stroke();
}

// desegnu rondan punkton ĉe (e.x,e.y) sur la kanvason ctx
function punkto(ctx,e,radiuso=1.4,koloro="#0095DD") {
    const x = e.x;
    const y = e.y;
    ctx.beginPath();
    ctx.arc(x, y, radiuso, 0, Math.PI * 2);
    ctx.fillStyle = koloro;
    ctx.fill();
}


/**
 * Ŝovi punkton p je distanco c
 */
function ŝovo(p,d) {
    return({
        x: p.x + d.x,
        y: p.y + d.y
    })
}

/**
 * Rotacii punkton p je angulo a ĉirkaŭ centro c
 */
function rotacio(p,a,c={x:0,y:0}) {
    if (!a) return p;

    const pc = ŝovo(p,{x:-c.x,y:-c.y});
    const ark = a*Math.PI/180;
    const pt = {
        x: pc.x * Math.cos(ark) - pc.y * Math.sin(ark),
        y: pc.x * Math.sin(ark) + pc.y * Math.cos(ark)
    }
    return ŝovo(pt,c);
}