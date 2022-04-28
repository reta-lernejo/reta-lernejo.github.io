
const SVG = function() {
    const ns = "http://www.w3.org/2000/svg";

    function aldonu(parenco,...idoj) {
        // parenco povas esti id aŭ Element
        let p = parenco;
        if (typeof parenco === 'string') {
            p = document.getElementById(parenco);
        }
        p.append(...idoj);
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

    function teksto(tx,x,y,sy=false) {
        const teksto = document.createElementNS(ns,"text");
        teksto.textContent = tx;
        teksto.setAttribute("x",x);
        teksto.setAttribute("y",y); // -y ĉar ni devos speguli la koordinasistemon
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
        const pinto = document.createElementNS(ns,"use");
        pinto.setAttribute("href",href);
        pinto.setAttribute("transform",transform);
        return pinto;
    }

    return {
        aldonu: aldonu,
        malplenigu: malplenigu,
        grupo: grupo,
        linio: linio,
        poligono: poligono,
        pado: pado,
        teksto: teksto,
        atributoj: atributoj,
        uzo: uzo
    }
}();    