
class LabSVG {
    
    constructor(svg) {
        this.svg = svg;
    }

    /**
     * Trovas SVG-elementon per CSS-elektilo
     */
    trovu(elektilo) {
        return this.svg.querySelector(elektilo)
    }

    /** 
     * Ŝovas elementon uzante atributon transform al nova pozicio (dx,dy)
     */
    ŝovu(elm, x, y=0) {
        if (x || y)
            this.atr(elm, {transform: `translate(${x} ${y})`});
    }

    /**
     * desegnu simbolon id ĉe (x,y) 
     */
    simbol_uzo(id,x,y) {
        const use = this.kreu("use", {
            href: "#"+id,
            x: x,
            y: y
        });
        this.svg.append(use);
    }    

    /**
     * redonas elementon defs (kreante ĝins se ankoraŭ mankas)
     */
    difinoj() {
        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = this.desegno.kreu("defs");
            this.svg.prepend(defs);
        }
        return defs;
    }
}

class Lab {

    /** Kreas SVG-elementon kun atributoj
     * @param nomo elementnomo, ekz-e 'div'
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     */
    static e(nomo, atributoj, teksto) {
        const ns = "http://www.w3.org/2000/svg";
        const el = document.createElementNS(ns, nomo);
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                el.setAttribute(atr,val);
            }
        };
        if (teksto) el.textContent = teksto;
        return el;
    }

    /**
     * Aldonas aŭ ŝanĝas atributojn de SVG-DOM-elemento
     * 
     * @param elemento la DOM-elemento 
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     * @returns 
     */
    static a(elemento, atributoj) {
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                elemento.setAttribute(atr,val);
            }
        };
        return elemento;
    }

    /** 
     * Desegnas rondigitan rektangulon
     * @param {number} w larĝo
     * @param {number} h alteco
     * @param {number} a angulgrandeco
     * @param {number} x x-koordinato (maldekstre)
     * @param {number} y y-koordinato (supre)
     */
    static rrekt(w,h,a,x=0,y=0) {
        return Lab.e("path",{
            d: `M${x+a},${y} L${x+w-a},${y} Q${x+w},${y} ${x+w},${y+a} ` // supra linio
             + `L${x+w},${y+h-a} Q${x+w},${y+h} ${x+w-a},${y+h}`  // dekstra linio
             + `L${x+a},${y+h} Q${x},${y+h} ${x},${y+h-a}`  // malsupra linio
             + `L${x},${y+a} Q${x},${y} ${x+a},${y}` // maldekstra linio
        });
    }

    /** 
     * Desegnas nur malsupre rondigitan rektangulon
     * @param {number} w larĝo
     * @param {number} h alteco
     * @param {number} a angulgrandeco
     * @param {number} x x-koordinato (maldekstre)
     * @param {number} y y-koordinato (supre)
     */
     static r_rekt(w,h,a,x=0,y=0) {
        return Lab.e("path",{
            d: `M${x},${y} L${x+w},${y} ` // supra linio
             + `L${x+w},${y+h-a} Q${x+w},${y+h} ${x+w-a},${y+h}`  // dekstra linio
             + `L${x+a},${y+h} Q${x},${y+h} ${x},${y+h-a}`  // malsupra linio
             + `L${x},${y+a} Z` // maldekstra linio
        });
    }

    /** 
     * Desegnas rektangulon rondigitan malsupre konvekse kaj supre konkave
     * @param {number} w larĝo
     * @param {number} h alteco
     * @param {number} a angulgrandeco malsupre
     * @param {number} u angulgrandeco supre
     * @param {number} x x-koordinato (maldekstre)
     * @param {number} y y-koordinato (supre)
     */
    static rurekt(w,h,a,u,x=0,y=0) {
        return Lab.e("path",{
            d: `M${x},${y-u} Q${x},${y} ${x+u},${y} L${x+w-u},${y} Q${x+w},${y} ${x+w},${y-u}` // supra linio
             + `L${x+w},${y+h-a} Q${x+w},${y+h} ${x+w-a},${y+h}`  // dekstra linio
             + `L${x+a},${y+h} Q${x},${y+h} ${x},${y+h-a}`  // malsupra linio
             + `L${x},${y+a} Z` // maldekstra linio
        });
    }


    static glaso() {
        const g = Lab.e("g", { class: "ujo" });
        const ujo = Lab.e("path",{
            d: "M-5,-300 Q0,-300 0,-295 L0,-5 Q0,0 5,0 L 95,0 Q100,0 100,-5 L100,-295 Q100,-300 105,-300 Z",
            class: "vitro"
        });
        /*
        const enhavo = Lab.e("rect", {
            x: 0, y: -200, width: 100, height: 200,
            class: "likvo"
        });
        */
        const enhavo = Lab.rurekt(100,200,5,5,0,-200);
        Lab.a(enhavo,{
            class: "likvo"
        });
        g.append(enhavo,ujo);
        return(g);
    }

    /**
     * Kreas gutbotelon 
     * @param {string} etikedo
     * @param {number} pleno enhavpleneco 0..100
     * @param {number} angulo angulo, je kiu la botelo estu turnita
     * 
     */
    static gutbotelo(etikedo,pleno,angulo) {
        const g = Lab.e("g", { class: "ujo gutbotelo" });
        const bordo = "M0,-100 L0,-4 Q0,0 4,0 L36,0 Q40,0 40,-4 L40,-100 Z";
        const ujo = Lab.e("path",{
            d: bordo,
            class: "vitro"
        });
        const kovrilo = Lab.e("polyline",{
            points: "-2,-100 -2,-105 10,-108 18,-130 22,-130 30,-108 42,-105 42,-100 -2,-100",
            class: "plasto"
        });

        // enhavo        
        let enhavo = '', cenh, clip;
        if (pleno) {
            const c_id = etikedo; // provizore...
            clip = Lab.e("clipPath",{
                id: c_id,
                clipPathUnits: "userSpaceOnUse"
            });
            const cpath = Lab.e("path",{
                d: bordo
            });
            clip.append(cpath);

            //enhavo = Lab.rurekt(40,pleno,5,5,0,-pleno);
            enhavo = Lab.e("path",
            {
                d: `M-50,50 L-50,${-pleno} L110,${-pleno} L110,50 Z`,
                class: "likvo"
            });
            cenh = Lab.e("g",{
                "clip-path": `url(#${c_id})`,
            });
            cenh.append(enhavo);
        }
        // surskribo
        const surskribo = Lab.e("text", {
                x: 3, y: -60
            }, etikedo
        );
        if (angulo) {
            const tx = 40-40*pleno/100;
            if (angulo % 360 <= 90 || angulo % 360 >= 270) {
                Lab.a(enhavo,{transform: `rotate(${-angulo} ${tx} ${-pleno})`});
                const ty = -pleno;
                Lab.a(g,{transform: `rotate(${angulo} ${tx} ${ty})`});
            } else {
                Lab.a(enhavo,{transform: `rotate(${180-angulo} ${tx} ${-pleno}) rotate(180 20 -50)`});
                const ty = -pleno;
                Lab.a(g,{transform: `rotate(${angulo} ${tx} ${ty})`});
                //Lab.a(g,{transform: `rotate(${angulo-180} ${tx} ${ty}) rotate(180 20 -50)`});
            }
        }
        g.append(clip,cenh,ujo,kovrilo,surskribo);
        const u = Lab.e("g"); u.append(g);
        return u;
    }
}


class Laboratorio extends LabSVG {
    constructor(svg) {
        super(svg);
        const ns = "http://www.w3.org/2000/svg";
        const g = document.createElementNS(ns, 'g');
        g.id = "lab_aranĝo";
        this.aranĝo = g;
        this.svg.append(g);
    }

    /** Metas novajn ilon en la aranĝon de la laboratorio,
     * @param {object} ilo la ilo, kreita per ujo() k.s.
     * @param {number} x x-koordinato (0=malsdesktre)
     * @param {number} y y-koordinato (0=supre)
     */
    metu(ilo,x,y) {
        const e = ilo; // aŭ svg-grupo de ilo, se ĝi ne mem estas SVG-elemento
        const X = x||0;
        const Y = y||0;
        if (x || y) {
            Lab.a(e, {
                transform: `translate(${x} ${y})`
            });
        }
        this.aranĝo.append(ilo)
    }


}