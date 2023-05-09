
/**
 * Redonas HTML-DOM-elementon 
 * @param CSS-elektilo por identigi la elementon, ekz "#id", ".titolo", "h1" k.s.
 */

function ĝi(elektilo) { 
    return document.querySelector(elektilo); 
}

function ĉiuj(elektilo) {
    return document.querySelectorAll(elektilo); 
}

/**
 * Difinas reagon, kiam okazas iu evento
 * @param {string} evento la nomo de la elemento, ekz-e "click"
 * @param {*} elemento aŭ CSS-elektilo aŭ unuopa elemento
 * @param {function} reago la reag-funkcio
 */
function kiam(evento,elemento,reago) {
    if (typeof elemento === "string") {
        for (const el of document.querySelectorAll(elemento)) {
            el.addEventListener(evento,reago);
        }    
    } else {
        elemento.addEventListener(evento,reago);
    }
}

function kiam_klako(elektilo,reago) {
    kiam("click",elektilo,reago)
}

/** Kreas HTML-elementon kun atributoj
 * @param nomo elementnomo, ekz-e 'div'
 * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
 */
function kreu(nomo, atributoj, teksto) {
    const el = document.createElement(nomo);
    if (atributoj) {
        for (const [atr,val] of Object.entries(atributoj)) {
            el.setAttribute(atr,val);
        }
    };
    if (teksto) el.textContent = teksto;
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

/**
 * Aldonas al DOM-elemento klason por emfazi ĝin
 */
function emfazo(elm,klaso="emfazo") {
    elm.classList.add(klaso);
}

/**
 * Forigas de DOM-elemento klason por emfazi ĝin
 */
 function malemfazo(elm,klaso="emfazo") {
    if (elm) elm.classList.remove(klaso);
}

/**
 * Redonas nombron en petita precizeco kaj kun evtl. potencoj de de 10
 * kiel HTML (eksponento per sup-elemento)
 * @param {number} nombro
 * @param {number} prec precizeco je ciferoj
 * @param {string} unuo mezurunuo
 */
function nombro(nombro,prec=3,unuo) {
    const p = nombro.toPrecision(prec).replace('.',',');
    return ((p
        .replace(/e\+?(\-?\d+)/,'·10<sup>$1</sup>')
        .replace('Infinity','--')
        .replace('NaN','--'))
        + (unuo? '\u202f'+unuo : ''));
}


let _lanĉtaskoj = []; 
let _reftaskoj = [];
let _elektotasko;
document.body.style.cursor = 'progress';

/**
 * Plenumas ciujn lanĉo-taskojn, kiujn vi aldonu per 
 * lanĉe(() => { mia_tasko(p1,p2,...); })
 */
window.onload = () => {
    try {
        // plenumu ĉiujn lanĉ-taskojn
        for (t of _lanĉtaskoj) { t(); }

        // trovu ĉiujn lokojn markitajn per klaso .ref
        // kaj registru reftaskojn
        if (_reftaskoj) {
            for (r of document.querySelectorAll(".ref")) {
                r.addEventListener("click", _plenumu_reftaskojn);
            }
        }

        if (_elektotasko) {
            const re = /([\(\[])(x?)([\)\]])([^,;.<\(\[)]+)/;
            for (e of document.querySelectorAll(".elekto")) {
                let tc = e.innerHTML;
                let html = '', n=0;
                console.log (e.textContent);
                // konvertu tekstoj (x?)blabla al <input type="radio"><label for="..."> 
                // resp. [x?]blabla al <input type="checkbox"><label for="..."> 
                while ((m = re.exec(tc))) {
                    //debugger;
                    const de = m.index;
                    const l = m[0].length;
                    const tipo = m[1] == '('? 'radio' : 'checkbox';
                    const x = m[2];
                    const pri = m[4];
                    const val = pri; // PLIBONIGU: eble permesu doni pli koncizas voloron ene de (jes:x), (ne)
                    // const id = (tipo=='radio')? `${e.id}_${n}` : e.id;
                    html = html + tc.slice(0,de) 
                        + `<input type="${tipo}" id="${e.id}_${n}" name="${e.id}" value="${val}" ${x?'checked':''}>`
                        + `<label for="${e.id}_${n}">${pri}</label>`;
                    tc = tc.slice(de+l);
                    n++;
                }
                e.innerHTML = html;
                e.addEventListener("click", _plenumu_elektotaskon);
            }
        }
    }
    finally {
        document.body.style.cursor = 'default';
    }
}
/*
window.onload = () => { 
    document.body.style.cursor = 'progress';
}
*/

/**
 * Kolektas funkciojn, kiuj vokiĝos tuj post kiam la dokumento estas ŝargita.
 */
function lanĉe(tasko) {
    _lanĉtaskoj.push(tasko);
}

/**
 * Kolektas funkciojn, kiuj vokiĝos kiam referenco, markita per klaso .ref estis klakita.
 */
function reference(tasko) {
    _reftaskoj.push(tasko);
}

/** 
 * Plenumas ĉiujn registritajn reftaskojn
 * 
 */
function _plenumu_reftaskojn(evento) {
    evento.preventDefault();
    for (rt of _reftaskoj) {
        ref = evento.target.id;
        rt(ref,evento);
    }
}

/** 
 * Plenumas elekto taskon kiam klakiĝis elemento radio/checkbox
 * 
 */
 function _plenumu_elektotaskon(evento) {
    //evento.preventDefault();
    const elemento = evento.target;
    _elektotasko(elemento.name,elemento.value,evento);
}

/**
 * Registras elekton (input@type=radio, input@type=checkbox)
 * kaj koncernan reagon
 */
function elekte(tasko) {
    _elektotasko = tasko; // ni detaligos post ŝargo kaj trakribro de la dokumento (.onload)
}

let prokrastoj = [];  // (angle: timers)

/**
 * Registras prokrastitan agon
 */
function prokrastu(ago,ms) {
    const p = setTimeout(ago, ms);
    prokrastoj.push(p);
}

/**
 * Registras agon ripetendan, ĝis ĝi redonas 'false'
 */
function ripetu(ago,ms) {
    const p = {p: undefined};
    (function bis() {
        p.p = setTimeout(() => {        
            if (ago()) bis();
        }, ms);
        prokrastoj.push(p);
    })();
    return p;
}

/**
 * Purigas ĉiujn prokrastitajn agojn, eventuale ankoraŭ aktivajn
 */
function purigu_prokrastojn() {
    while (p = prokrastoj.pop()) clearTimeout(p);
}