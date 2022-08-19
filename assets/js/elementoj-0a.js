
    // [simbolo,nomo,periodo,grupo,negativeco...]
    // grupo: por lantinidoj/aktinidoj, kiuj ne havas grupon laŭ IUPAC, ni uzas
    //   negativajn numerojn -3..-16, utilaj por eltrovi la valenton 3..16
    // negativeco: elektronegativeco laŭ Paŭling, 0 = nekonata
    const elementoj = [
        ['H','hidrogeno',1,1,2.2],
        ['He','heliumo',1,18,-0.17],
        ['Li','litio',2,1,1],
        ['Be','berilio',2,2,1.6],
        ['B','boro',2,13,2],
        ['C','karbono',2,14,2.6],
        ['N','azoto',2,15,3],
        ['O','oksigeno',2,16,3.4],
        ['F','fluoro',2,17,4],
        ['Ne','neono',2,18,-0.84],
        ['Na','natrio',3,1,0.9],
        ['Mg','magnezio',3,2,1.3],
        ['Al','aluminio',3,13,1.6],
        ['Si','silicio',3,14,1.9],
        ['P','fosforo',3,15,2.2],
        ['S','sulfuro',3,16,2.6],
        ['Cl','kloro',3,17,3.2],
        ['Ar','argono',3,18,-1.66],
        ['K','kalio',4,1,0.8],
        ['Ca','kalcio',4,2,1],
        ['Sc','skandio',4,3,1.4],
        ['Ti','titano',4,4,1.5],
        ['V','vanado',4,5,1.6],
        ['Cr','kromo',4,6,1.7],
        ['Mn','mangano',4,7,1.6],
        ['Fe','fero',4,8,1.8],
        ['Co','kobalto',4,9,1.9],
        ['Ni','nikelo',4,10,1.9],
        ['Cu','kupro',4,11,1.9],
        ['Zn','zinko',4,12,1.7],
        ['Ga','galiumo',4,13,1.8],
        ['Ge','germaniumo',4,14,2],
        ['As','arseno',4,15,2.2],
        ['Se','seleno',4,16,2.6],
        ['Br','bromo',4,17,3],
        ['Kr','kriptono',4,18,-3.48],
        ['Rb','rubidio',5,1,0.8],
        ['Sr','stroncio',5,2,1],
        ['Y','itrio',5,3,1.2],
        ['Zr','zirkonio',5,4,1.3],
        ['Nb','niobo',5,5,1.5],
        ['Mo','molibdeno',5,6,1.6],
        ['Tc','teknecio',5,7,1.9],
        ['Ru','rutenio',5,8,2.2],
        ['Rh','rodio',5,9,2.3],
        ['Pd','paladio',5,10,2.2],
        ['Ag','arĝento',5,11,1.9],
        ['Cd','kadmio',5,12,1.7],
        ['In','indio',5,13,1.8],
        ['Sn','stano',5,14,2],
        ['Sb','antimono',5,15,2.1],
        ['Te','teluro',5,16,2.1],
        ['I','jodo',5,17,2.7],
        ['Xe','ksenono',5,18,-4.49],
        ['Cs','cezio',6,1,0.8],
        ['Ba','bario',6,2,0.9],
        ['La','lantano',6,-3,1.1],
        ['Ce','cerio',6,-4,1.1],
        ['Pr','prazeodimo',6,-5,1.1],
        ['Nd','neodimo',6,-6,1.1],
        ['Pm','prometio',6,-7,NaN],
        ['Sm','samario',6,-8,1.2],
        ['Eu','eŭropio',6,-9,NaN],
        ['Gd','gadolinio',6,-10,1.2],
        ['Tb','terbio',6,-11,NaN],
        ['Dy','disprozio',6,-12,1.2],
        ['Ho','holmio',6,-13,1.2],
        ['Er','erbio',6,-14,1.2],
        ['Tm','tulio',6,-15,1.3],
        ['Yb','iterbio',6,-16,NaN],
        ['Lu','lutecio',6,3,1.3],
        ['Hf','hafnio',6,4,1.3],
        ['Ta','tantalo',6,5,1.5],
        ['W','volframo',6,6,2.4],
        ['Re','renio',6,7,1.9],
        ['Os','osmio',6,8,2.2],
        ['Ir','iridio',6,9,2.2],
        ['Pt','plateno',6,10,2.3],
        ['Au','oro',6,11,2.5],
        ['Hg','hidrargo',6,12,2],
        ['Tl','talio',6,13,1.6],
        ['Pb','plumbo',6,14,2.3],
        ['Bi','bismuto',6,15,2],
        ['Po','polonio',6,16,2],
        ['At','astato',6,17,2.2],
        ['Rn','radono',6,18,-9.23],
        ['Fr','franciumo',7,1,0.7],
        ['Ra','radiumo',7,2,0.9],
        ['Ac','aktiniumo',7,-3,1.1],
        ['Th','torio',7,-4,1.3],
        ['Pa','protaktinio',7,-5,1.5],
        ['U','uranio',7,-6,1.4],
        ['Np','neptunio',7,-7,1.4],
        ['Pu','plutonio',7,-8,1.3],
        ['Am','americio',7,-9,1.3],
        ['Cm','kuriumo',7,-10,,1.3],
        ['Bk','berkelio',7,-11,1.3],
        ['Cf','kaliforniumo',7,-12,1.3],
        ['Es','ejnŝtejnio',7,-13,1.3],
        ['Fm','fermio',7,-14,1.3],
        ['Md','mendelevio',7,-15,1.3],
        ['No','nobelio',7,-16,1.3],
        ['Lr','laŭrencio',7,3,1.3],
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

    // elemento per ĝia numero
    static nro(n) {
        const e = elementoj[n-1];
        return Object.assign({nro: n},Elemento._obj(e));
    }

    // elemento per ĝia simbolo
    static smb(s) {
        for (const n in elementoj) {
            const e = elementoj[n];
            if (e[0] == s) {
                return Object.assign({nro: n+1},Elemento._obj(e));
            }
        }
    }
}