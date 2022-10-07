
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
    /*
    simbol_uzo(id,x,y) {
        const use = this.kreu("use", {
            href: "#"+id,
            x: x,
            y: y
        });
        this.svg.append(use);
    } */   

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
    /*
     static r_rekt(w,h,a,x=0,y=0) {
        return Lab.e("path",{
            d: `M${x},${y} L${x+w},${y} ` // supra linio
             + `L${x+w},${y+h-a} Q${x+w},${y+h} ${x+w-a},${y+h}`  // dekstra linio
             + `L${x+a},${y+h} Q${x},${y+h} ${x},${y+h-a}`  // malsupra linio
             + `L${x},${y+a} Z` // maldekstra linio
        });
    }
    */

    /** 
     * Desegnas rektangulon rondigitan malsupre konvekse kaj supre konkave
     * @param {number} w larĝo
     * @param {number} h alteco
     * @param {number} a angulgrandeco malsupre
     * @param {number} u angulgrandeco supre
     * @param {number} x x-koordinato (maldekstre)
     * @param {number} y y-koordinato (supre)
     */
    /*
    static rurekt(w,h,a,u,x=0,y=0) {
        return Lab.e("path",{
            d: `M${x},${y-u} Q${x},${y} ${x+u},${y} L${x+w-u},${y} Q${x+w},${y} ${x+w},${y-u}` // supra linio
             + `L${x+w},${y+h-a} Q${x+w},${y+h} ${x+w-a},${y+h}`  // dekstra linio
             + `L${x+a},${y+h} Q${x},${y+h} ${x},${y+h-a}`  // malsupra linio
             + `L${x},${y+a} Z` // maldekstra linio
        });
    }
    */

    /**
     * Kreas kaj redonas clipPath-elementon
     */
    static #limigo(c_id,limFiguro) {
        const clip = Lab.e("clipPath",{
            id: c_id,
            clipPathUnits: "userSpaceOnUse"
        });
        clip.append(limFiguro);
        return clip;
    }

    /** 
     * Kreas movanimacion por falo de precipitaĵoj ks
     * @param {number} dy vojo de falo vertikale
     * @param {number} dx horizontala komponento de falo
     * @param {number} vx vario de horizontala pozicio
     * @param {number} d daŭro en sekundoj
     * @param {number} r maksimuma ripetoj (kun hazardo)
     */
    static falo(dy,dx=0,vx=0,d=10,r=1) {
        return Lab.e("animateMotion", {
            dur: d+'s',
            repeatCount: r>1?Math.floor(Math.random()*r):1,
            fill: "freeze",
            path: `M0,0 L${dx},${dy}` // momente ni ignoras vx
            // per keyTimes, keyPoint ni povas ekz-e ankoraŭ akceli!
        });
    }

    /**
     * Kreas likvan enhavon, aldonebla en glason...
     */
    static likvo(cls="likvo",w=100,h=100) {
        return Lab.e("rect",{
            width: 100,
            y: -h,
            height: h,
            class: cls
        });
    }

    /**
     * Kreas precipiton en likvo kiel enhavon de glaso kc. Erojn de precipito transdonu kiel objekto 
     * {id: referencilo, n: nombro, s: supro, a: alteco, fd: faldistanco, af: falaĵalteco}, 
     * a: alteco de distribuo mezurite de la supro
     * fd: faldistanco, se ne donita ĝisgrunde
     * af: vario de falaĵo surgrunde
     * donu pezajn malgrandajn erojn unue, due la pli grandajn nubecajn!
     * @param {string} id unika rekonilo
     * @param {string} cls klasnomo de precipito, ekz-e por doni koloron, travideblecon ks
     * @param {string} ero1 ero speco unu (difinenda per Laboratorio.ero_smb())
     * @param {string} ero2 ero speco du (difinenda per Laboratorio.ero_smb())
     * @param {number} w larĝeco, apriore 100
     * @param {number} h alteco, apriore 100
     */
    static precipito(id,cls="precipito",ero1,ero2,w=100,h=100) {
        const c_id = `_clp_${id}`;
        const lim = Lab.#limigo(c_id, Lab.e("rect",{y: -h, width: w, height: h}));
        const g = Lab.e("g",{
            class: cls,
            "clip-path": `url(#${c_id})`
        });

        function eroj(e_) {   
            for (let e=0; e<e_.n; e++) {
                const y = -(e_.s - Math.random()*ero1.a);
                const x = e/e_.n*w + Math.random()*w/ero1.n;
                const u = Lab.e("use",{
                    href: `#${e_.id}`,
                    x: x, y: y
                });
                if (e_.af || e_.fd) {
                    const f_alto = (e_.fd || -y) - (Math.random()*e_.af||0);
                    const f = Lab.falo(f_alto,0,0,e_.d/2 + Math.random()*e_.d);
                    u.append(f);    
                }
                g.append(u);    
            }      
        }

        g.append(Lab.likvo("likvo",w,h));
        eroj(ero1);
        eroj(ero2);

        const e = Lab.e("g");
        e.append(lim,g);
        return e;
    }

    /**
     * Kreas glason kun enhavo
     * @param id {string} unika rekonilo
     * @param w {number} larĝeco, apriore 100
     * @param h {number} alteco, apriore 300
     * @param enhavo {object} aŭ nombro donate procentaĵon de pleneco aŭ SVG-objekto reprezentanta la enhavon
     */
    static glaso(id="glaso", enhavo, w=100, h=300) {
        const g = Lab.e("g", { id: id, class: "ujo glaso" });
        const bordo = "M-5,-300 Q0,-300 0,-295 L0,-5 Q0,0 5,0 Q50,4 95,0 Q100,0 100,-5 L100,-295 Q100,-300 105,-300 Z";

        const ujo = Lab.e("path",{
            d: bordo,
            class: "vitro"
        });
        /*
        const enhavo = Lab.e("rect", {
            x: 0, y: -200, width: 100, height: 200,
            class: "likvo"
        });
        */
        const ombro = Lab.e("ellipse",{
            cx: 60, rx: 60, ry: 8,
            class: "ombro"
        });
        g.append(ombro);

        let enh = enhavo;
        if (enhavo) {
            const c_id = `_clp_${id}`;
            const limigo = Lab.#limigo(c_id, 
                Lab.e("path", {d: bordo})
            );
            const ge = Lab.e("g", {
                "clip-path": `url(#${c_id})`
            });
 
            if (typeof enhavo == "number") {
                const alto = h*enhavo/100;
                enh = Lab.e("rect",{
                    width: 100,
                    y: -alto,
                    height: alto,
                    class: "likvo"
                });
            };

            ge.append(enh);
            g.append(limigo,ge);
        }

        g.append(ujo);
        return(g);
    }

    /**
     * Kreas gutbotelon 
     * @param {string} etikedo
     * @param {number} pleno enhavpleneco 0..100
     * @param {number} angulo angulo, je kiu la botelo estu turnita
     * 
     */
    static gutbotelo(id,etikedo,pleno=0,angulo=0) {
        const g = Lab.e("g", { class: "ujo gutbotelo" });

        // bordo de la vitrujo (kaj do ankaŭ limo de enhavo)
        const bordo = "M0,-100 L0,-4 Q0,0 4,0 Q20,3 36,0 Q40,0 40,-4 L40,-100 Z";
        let tf = '';
        const a = angulo % 360;
        if (a == 0) {
            const ombro = Lab.e("ellipse",{
                cx: 25, rx: 25, ry: 5,
                class: "ombro"
            });
            g.append(ombro);
        } else if (a<90) {
            const tx = 40-40*pleno/100;
            tf = `rotate(${a} ${tx} ${-pleno})`;
        } else if (a<180) {
            const tx = 40-40*pleno/100;
            tf = `rotate(${a} ${tx} ${-pleno}) translate(0 ${100-2*pleno})`;
        } else if (a<270) {
            const tx = 40*pleno/100;
            tf = `rotate(${a} ${tx} ${-pleno}) translate(0 ${100-2*pleno})`;
        } else {
            const tx = 40*pleno/100;
            tf = `rotate(${a} ${tx} ${-pleno})`;
        }

        // konstruu la ujon
        const ujo = Lab.e("path",{
            d: bordo,
            class: "vitro"
        });
        const kovrilo = Lab.e("polyline",{
            points: "-2,-100 -2,-105 10,-108 18,-130 22,-130 30,-108 42,-105 42,-100 30,-99.5 20,-99.3 10,-99.5 -2,-100",
            class: "plasto"
        });
        // surskribo
        const surskribo = Lab.e("text", {
            x: 20, y: -60,
            "text-anchor": "middle",
            }
        );
        for (const t of etikedo.split(/\n/)) {
            surskribo.append(Lab.e("tspan",{
                x: 20, dy: 10
            },t))
        }
        g.append(ujo,kovrilo,surskribo);
        if (tf) Lab.a(g,{transform: tf});

        // aldonu enhavon        
        let enhavo = '', limigo;
        if (pleno) {
            const c_id = `_clp_${id}`;
            limigo = Lab.#limigo(c_id, 
                Lab.e("path",{
                    d: bordo,
                    transform: tf
                })
            );

            // likva enhavo, ĝi ne ekzakte respondas
            // al la volumeno de cilindro, aparte por
            // oblikvaj anguloj, sed proksimumo eble sufiĉas
            // aliokaze oni devus ekzakte elkalkuli la
            // altecon de la likvaĵo en la botelo depende
            // de klino, kio estus sufiĉe ambicia entrepreno :-)
            enhavo = Lab.e("path",
            {
                d: `M-110,80 L-110,${-pleno} L110,${-pleno} L110,80 Z`,
                //d: `M-10,10 L-10,${-pleno} L110,${-pleno} L110,10 Z`,
                "clip-path": `url(#${c_id})`,
                class: "likvo"
            });
        }
        //g.append(clip,cenh,ujo,kovrilo,surskribo);
        const u = Lab.e("g", {id: id}); u.append(limigo,enhavo,g);
        return u;
    }
}


class Laboratorio extends LabSVG {
    constructor(svg,f_id,f_w,f_h) {
        super(svg);
        const ns = "http://www.w3.org/2000/svg";
        const g = document.createElementNS(ns, 'g');
        g.id = "lab_aranĝo";
        this.aranĝo = g;

        if (f_id) {
            const fono = Lab.rrekt(f_w,f_h,4);
            fono.id = f_id;
            g.append(fono);
        }

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

    /**
     * Kreas eron kiel simbolo uzeble poste, ekz-e kiel precipitero...
     */
    ero_smb(id,r,cls="ero") {
      const dif = this.difinoj();
      dif.append(Lab.e("circle",{
        id: id,
        r: r,
        class: cls
      }));
    }


}