
    // [simbolo,nomo,periodo,grupo,negativeco...]
    // grupo: por lantinidoj/aktinidoj, kiuj ne havas grupon laŭ IUPAC, ni uzas
    //   negativajn numerojn -3..-16, utilaj por eltrovi la valenton 3..16
    // negativeco: elektronegativeco Paŭlingskalo, NaN = nekonata
    // vd: https://www.chemeurope.com/en/encyclopedia/Electronegativity.html
    const elementoj = [
        ['H','hidrogeno',1,1,2.2],
        ['He','heliumo',1,18,3.89],
        ['Li','litio',2,1,0.98],
        ['Be','berilio',2,2,1.57],
        ['B','boro',2,13,2.04],
        ['C','karbono',2,14,2.55],
        ['N','azoto',2,15,3.04],
        ['O','oksigeno',2,16,3.44],
        ['F','fluoro',2,17,3.98],
        ['Ne','neono',2,18,3.67],
        ['Na','natrio',3,1,0.93],
        ['Mg','magnezio',3,2,1.31],
        ['Al','aluminio',3,13,1.61],
        ['Si','silicio',3,14,1.9],
        ['P','fosforo',3,15,2.19],
        ['S','sulfuro',3,16,2.58],
        ['Cl','kloro',3,17,3.16],
        ['Ar','argono',3,18,3.3],
        ['K','kalio',4,1,0.82],
        ['Ca','kalcio',4,2,1.0],
        ['Sc','skandio',4,3,1.36],
        ['Ti','titano',4,4,1.54],
        ['V','vanado',4,5,1.63],
        ['Cr','kromo',4,6,1.66],
        ['Mn','mangano',4,7,1.55],
        ['Fe','fero',4,8,1.83],
        ['Co','kobalto',4,9,1.88],
        ['Ni','nikelo',4,10,1.91],
        ['Cu','kupro',4,11,1.9],
        ['Zn','zinko',4,12,1.65],
        ['Ga','galiumo',4,13,1.81],
        ['Ge','germaniumo',4,14,2.01],
        ['As','arseno',4,15,2.18],
        ['Se','seleno',4,16,2.55],
        ['Br','bromo',4,17,2.96],
        ['Kr','kriptono',4,18,3.0],
        ['Rb','rubidio',5,1,0.82],
        ['Sr','stroncio',5,2,0.95],
        ['Y','itrio',5,3,1.22],
        ['Zr','zirkonio',5,4,1.33],
        ['Nb','niobo',5,5,1.6],
        ['Mo','molibdeno',5,6,2.16],
        ['Tc','teknecio',5,7,1.9],
        ['Ru','rutenio',5,8,2.2],
        ['Rh','rodio',5,9,2.28],
        ['Pd','paladio',5,10,2.2],
        ['Ag','arĝento',5,11,1.93],
        ['Cd','kadmio',5,12,1.69],
        ['In','indio',5,13,1.78],
        ['Sn','stano',5,14,1.96],
        ['Sb','antimono',5,15,2.05],
        ['Te','teluro',5,16,2.1],
        ['I','jodo',5,17,2.66],
        ['Xe','ksenono',5,18,2.67],
        ['Cs','cezio',6,1,0.79],
        ['Ba','bario',6,2,0.9],
        ['La','lantano',6,-3,1.1],
        ['Ce','cerio',6,-4,1.12],
        ['Pr','prazeodimo',6,-5,1.13],
        ['Nd','neodimo',6,-6,1.14],
        ['Pm','prometio',6,-7,1.13],
        ['Sm','samario',6,-8,1.17],
        ['Eu','eŭropio',6,-9,1.2],
        ['Gd','gadolinio',6,-10,1.2],
        ['Tb','terbio',6,-11,1.1],
        ['Dy','disprozio',6,-12,1.22],
        ['Ho','holmio',6,-13,1.23],
        ['Er','erbio',6,-14,1.24],
        ['Tm','tulio',6,-15,1.25],
        ['Yb','iterbio',6,-16,1.1],
        ['Lu','lutecio',6,3,1.27],
        ['Hf','hafnio',6,4,1.3],
        ['Ta','tantalo',6,5,1.5],
        ['W','volframo',6,6,2.36],
        ['Re','renio',6,7,1.9],
        ['Os','osmio',6,8,2.2],
        ['Ir','iridio',6,9,2.2],
        ['Pt','plateno',6,10,2.28],
        ['Au','oro',6,11,2.54],
        ['Hg','hidrargo',6,12,2.0],
        ['Tl','talio',6,13,1.62],
        ['Pb','plumbo',6,14,2.33],
        ['Bi','bismuto',6,15,2.02],
        ['Po','polonio',6,16,2.0],
        ['At','astato',6,17,2.2],
        ['Rn','radono',6,18,2.2],
        ['Fr','franciumo',7,1,0.7],
        ['Ra','radiumo',7,2,0.9],
        ['Ac','aktiniumo',7,-3,1.1],
        ['Th','torio',7,-4,1.3],
        ['Pa','protaktinio',7,-5,1.5],
        ['U','uranio',7,-6,1.38],
        ['Np','neptunio',7,-7,1.36],
        ['Pu','plutonio',7,-8,1.28],
        ['Am','americio',7,-9,1.13],
        ['Cm','kuriumo',7,-10,1.28],
        ['Bk','berkelio',7,-11,1.3],
        ['Cf','kaliforniumo',7,-12,1.3],
        ['Es','ejnŝtejnio',7,-13,1.3],
        ['Fm','fermio',7,-14,1.3],
        ['Md','mendelevio',7,-15,1.3],
        ['No','nobelio',7,-16,1.3],
        ['Lr','laŭrencio',7,3,1.29],
        ['Rf','ruterfordio',7,4,NaN],
        ['Db','dubnio',7,5,NaN],
        ['Sg','seborgio',7,6,NaN],
        ['Bh','borio',7,7,NaN],
        ['Hs','hasio',7,8,NaN],
        ['Mt','mejtnerio',7,9,NaN],
        ['Ds','darmŝtatio',7,10,NaN],
        ['Rg','rentgenio',7,11,NaN],
        ['Cn','kopernicio',7,12,NaN],
        ['Nh','nihonio',7,13,NaN],
        ['Fl','flerovio',7,14,NaN],
        ['Mc','moskovio',7,15,NaN],
        ['Lv','livermorio',7,16,NaN],
        ['Ts','teneso',7,17,NaN],
        ['Og','oganesono',7,18,NaN],
        ];

class Elemento {

    // elkalkulas la valenton el la gruponumero,
    // ni uzas negativajn grupojn por lantanidoj/aktinidoj, kiuj
    // ne havas oficialan grupnumeron
    static valento(g) {
        if (g<0) return -g;
        if (g>=13) return g-10;
        return g; 
    }

    // privata, transformas elemento-indikojn al objekto por pli facila uzo
    static _obj(e) {
        const v = Elemento.valento(e[3]);
        return {simbolo: e[0], nomo: e[1], periodo: e[2], grupo: e[3], valento: v, eneg: e[4]}
    }

    /*
    * Redonas elementon per ĝia numero
    */
    static nro(n) {
        const e = elementoj[n-1];
        return Object.assign({nro: n},Elemento._obj(e));
    }

    /**
     * Redonas elementon per ĝia simbolo
     */ 
    static smb(s) {
        for (const n in elementoj) {
            const e = elementoj[n];
            if (e[0] == s) {
                return Object.assign({nro: n+1},Elemento._obj(e));
            }
        }
    }

    /**
     * Redonas la elementliston laŭ elektronegativeco
     * @param rond rondigita je unu decimalo post la komo
     */
    static laŭ_neg(rond) {
        let eneg = {}
        for (const e of elementoj) {
            const neg = rond? Math.round(10*e[4])/10 : e[4]
            if (eneg[neg]) {
                eneg[neg].push(e[0])
            } else {
                eneg[neg] = [e[0]];
            }
        } // for
        return eneg;
    }


    /**
     * Desegnas periodan sistemon kiel SVG
     * 
     * @param svg la SVG-elemento, en kiun desegni
     * @param eneg donu krom elementsimbolo kaj ordnuemrao ankaŭ elektronegativecon
     * 
     */
    static periodsistemo(svg,eneg) {
        const ns = "http://www.w3.org/2000/svg";

        function atributoj(elemento, atributoj) {
            if (atributoj) {
                for (const [atr,val] of Object.entries(atributoj)) {
                    elemento.setAttribute(atr,val);
                }
            };
        }

        function erekt(elm) {    

            // apartaj koordinatoj por aktinidoj/lantanidoj
            let gr = elm.grupo, pd = elm.periodo;
            if (elm.grupo < 0) {
                gr = -elm.grupo;
                pd += 3;
            }

            const g = document.createElementNS(ns,"g");
            atributoj(g, {
                id: `ps_${elm.simbolo}`,
                class: "elm",
                transform: `translate(${10*gr} ${10*pd})`
            });

            const r = document.createElementNS(ns,"rect");
            atributoj(r,{
                width: 10,
                height: 10
            });

            // elementnomo
            const et = document.createElementNS(ns,"title");
            et.textContent = elm.nomo;
            //r.append(et);

            // elementsimbolo
            const sm = document.createElementNS(ns,"text");
            sm.textContent = elm.simbolo
            atributoj(sm,{
                x: 5,
                y: 5,
                class: "smb"
            });

            // elementnumero
            const nr = document.createElementNS(ns,"text");
            nr.textContent = elm.nro
            atributoj(nr,{
                x: .5,
                y: .5,
                class: "nro"
            });

            // elektronegativeco
            let en = '';         
            if (eneg) {
                en = document.createElementNS(ns,"text");
                en.textContent = isNaN(elm.eneg)? '?':elm.eneg;
                atributoj(en,{
                    x: 0.5,
                    y: 9.5,
                    class: "eneg"
                });    
            }

            g.append(et,r,nr,en,sm);
            return g;
        }

        // numeroj de la grupoj
        function g_nro(g) {
            let y = 0;
            if (g == 2 || g>12 && g<18) y++;
            if (g>=3 && g<=12) y+=3;
            const nro = document.createElementNS(ns,"text");
            nro.textContent = g;
            atributoj(nro, {
                x: 10*g+5,
                y: 10*y+5,
                class: "etikedo"
            });
            return nro;
        }

        // numeroj de la periodoj
        function p_nro(p, offs=0) {
            const pr = ["0","I","II","III","IV","V","VI","VII"][p];
            const nro = document.createElementNS(ns,"text");
            nro.textContent = pr;
            atributoj(nro, {
                x: 6.4*(offs)+5,
                y: 10*(p+offs)+5,
                class: "etikedo"
            });
            return nro;
        }

        // grupnumeroj
        for (let g=1; g<=18; g++) {
            svg.append(g_nro(g));
        }
        // periodnuemroj
        for (let p=1; p<=7; p++) {
            svg.append(p_nro(p));
            if (p>=6) svg.append(p_nro(p,3)); // akt/lantan-idoj
        }
        // elementoj
        for (let e=1; e<=118; e++) {
            const elm = Elemento.nro(e);
            //console.log(elm);
            svg.append(erekt(elm));
        }
    }
}