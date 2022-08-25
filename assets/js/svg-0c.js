
const SVG = function() {
    const ns = "http://www.w3.org/2000/svg";
    const xlink = "http://www.w3.org/1999/xlink";

    function aldonu(parenco,...idoj) {
        // parenco povas esti id aŭ Element
        let p = parenco;
        if (typeof parenco === 'string') {
            p = document.getElementById(parenco);
        }
        p.append(...idoj);
    }

    function elemento(spec) {
        return document.querySelector(spec);
    }

    function forigu(parenco,idospec) {
        let p = parenco;
        if (typeof parenco === 'string') {
            p = document.getElementById(parenco);
        }
        for (ido of p.querySelectorAll(idospec)) {
            ido.remove();
        }
    }

    function malplenigu(parenco) {
        let p = parenco;
        if (typeof parenco === 'string') {
            p = document.getElementById(parenco);
        }
        p.textContent='';  
    }

    function linio(x1,y1,x2,y2) {
        const linio = document.createElementNS(ns,"line");
        linio.setAttribute("x1",x1);
        linio.setAttribute("y1",y1);
        linio.setAttribute("x2",x2);
        linio.setAttribute("y2",y2);
        return linio;
    }

    function rektangulo(x,y,width,height) {
        const rektangulo = document.createElementNS(ns,"rect");
        rektangulo.setAttribute("x",x);
        rektangulo.setAttribute("y",y);
        rektangulo.setAttribute("width",width);
        rektangulo.setAttribute("height",height);
        return rektangulo;
    }


    function cirklo(cx,cy,r) {
        const cirklo = document.createElementNS(ns,"circle");
        cirklo.setAttribute("cx",cx);
        cirklo.setAttribute("cy",cy);
        cirklo.setAttribute("r",r);
        return cirklo;
    }

    function poligono(punktoj,transformo=null) {
        const poligono = document.createElementNS(ns,"polygon");
        poligono.setAttribute("points",punktoj);
        if (transformo) poligono.setAttribute("transform",transformo);
        return poligono;
    }

    function pado(difino,transformo=null) {
        const pado = document.createElementNS(ns,"path");
        pado.setAttribute("d",difino);
        if (transformo) pado.setAttribute("transform",transformo);
        return pado;
    }

    function grupo(id,cls) {
        const g = document.createElementNS(ns,"g");
        if (id) g.id=id;
        if (cls) g.classList.add(cls);
        return g;
    }

    function defs() {
        return document.createElementNS(ns,"defs");
    }

    function pattern(id,x,y,width,height) {
        const pattern = document.createElementNS(ns,"pattern");
        pattern.id = id;
        pattern.setAttribute("x",x);
        pattern.setAttribute("y",y);
        pattern.setAttribute("width",width);
        pattern.setAttribute("height",height);
        return pattern
    }

    function animacio(id,atr,de,al,dauro) {
        const patteanimaciorn = document.createElementNS(ns,"animate");
        animacio.id = id;
        animacio.setAttribute("attributeType","XML");
        animacio.setAttribute("attributeName",atr);
        animacio.setAttribute("from",de);
        animacio.setAttribute("to",al);
        animacio.setAttribute("dur",dauro);
        return animacio;
    }

    function movo(id,pado,ripetoj,dauro) {
        const animacio = document.createElementNS(ns,"animateMotion");
        animacio.id = id;
        animacio.setAttribute("path",pado);
        animacio.setAttribute("repeatCount",ripetoj);
        animacio.setAttribute("dur",dauro+"s");
        return animacio;
    }    

    function image(href,x,y,width,height) {
        const image = document.createElementNS(ns,"image");
        image.setAttributeNS(xlink,"href",href);
        image.setAttribute("x",x);
        image.setAttribute("y",y);
        image.setAttribute("width",width);
        image.setAttribute("height",height);
        return image
    }    

    function teksto(tx,x,y,sy=false) {
        const teksto = document.createElementNS(ns,"text");
        teksto.textContent = tx;
        teksto.setAttribute("x",x||0);
        teksto.setAttribute("y",y||0); 
        // por matematiko: -y ĉar ni devos speguli la koordinasistemon
        if (sy) teksto.setAttribute("transform","scale(+1,-1)");
        return teksto;
    }

    function atributoj(objekto,atributoj) {
        let obj = objekto;
        if (typeof objekto === 'string') {
            obj = document.getElementById(objekto);
        }
        for (const [atr,val] of Object.entries(atributoj)) {
            obj.setAttribute(atr,val);
        }
    }

    function uzo(href,transform) {
        const u = document.createElementNS(ns,"use");
        u.setAttribute("href",href);
        if (transform) u.setAttribute("transform",transform);
        return u;
    }

    return {
        elemento: elemento,
        aldonu: aldonu,
        forigu: forigu,
        malplenigu: malplenigu,
        grupo: grupo,
        defs: defs,
        linio: linio,
        rektangulo: rektangulo,
        cirklo: cirklo,
        poligono: poligono,
        pado: pado,
        pattern: pattern,
        animacio: animacio,
        movo: movo,
        image: image,
        teksto: teksto,
        atributoj: atributoj,
        uzo: uzo
    }
}();    