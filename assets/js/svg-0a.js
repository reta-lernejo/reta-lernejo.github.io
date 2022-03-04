
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

    function linio(x1,y1,x2,y2) {
        const linio = document.createElementNS(ns,"line");
        linio.setAttribute("x1",x1);
        linio.setAttribute("y1",y1);
        linio.setAttribute("x2",x2);
        linio.setAttribute("y2",y2);
        return linio;
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

    function uzo(href,transform) {
        const pinto = document.createElementNS(ns,"use");
        pinto.setAttribute("href",href);
        pinto.setAttribute("transform",transform);
        return pinto;
    }

    return {
        aldonu: aldonu,
        grupo: grupo,
        linio: linio,
        teksto: teksto,
        uzo: uzo
    }
}();    