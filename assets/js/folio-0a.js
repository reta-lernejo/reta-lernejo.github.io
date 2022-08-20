
/**
 * Redonas HTML-DOM-elementon 
 * @param CSS-elektilo por identigi la elementon, ekz "#id", ".titolo", "h1" k.s.
 */

function ĝi(elektilo) { 
    return document.querySelector(elektilo); 
}

/** Kreas HTML-elementon kun atributoj
 * @param nomo elementnomo, ekz-e 'div'
 * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
 */
function kreu(nomo, atributoj) {
    const el = document.createElement(nomo);
    if (atributoj) {
        for (const [atr,val] of Object.entries(atributoj)) {
            el.setAttribute(atr,val);
        }
    };
    return el;
}

/**
 * Aldonas aŭ ŝanĝas atributojn de HTML-DOM-elemento
 * 
 * @param elemento la DOM-elemento 
 * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
 * @returns 
 */
function atributoj(elemento, atributoj) {
    if (atributoj) {
        for (const [atr,val] of Object.entries(atributoj)) {
            elemento.setAttribute(atr,val);
        }
    };
    return elemento;
}

/**
 * Forigas HTML-elementon
 * @param elektilo CSS-elektilo por identigi la elementon
 */
function forigu(elektilo) {
    const el = document.querySelector(elektilo);
    if (el) el.parentElement.removeChild(el);   
}

/**
 * Malplenigas HTML-elementon
 * @param elektilo CSS-elektilo por identigi la elementon
 */
function malplenigu(elektilo) {
    const el = document.querySelector(elektilo);
    if (el) el.textContent = '';   
}


let _lanĉtaskoj = [];

/**
 * Plenumas ciujn lanĉo-taskojn, kiujn vi aldonu per 
 * lanĉe(() => { mia_tasko(p1,p2,...); })
 */
window.onload = () => { 
    for (t of _lanĉtaskoj) { t(); }
}

/**
 * Kolektas funkciojn, kiuj vokiĝo tuj post kiam la dokumento estas ŝargita.
 */
function lanĉe(tasko) {
    _lanĉtaskoj.push(tasko);
}