/* jshint esversion: 6 */

class Entalpio {

  /* fontoj:
  https://de.wikipedia.org/wiki/Enthalpie#Standardbildungsenthalpie
  https://www.drjez.com/uco/ChemTools/Standard%20Thermodynamic%20Values.pdf
  http://anorganik.chemie.vias.org/standardenthalpien_table.html
  https://de.wikibooks.org/wiki/Tabellensammlung_Chemie/_Enthalpie_und_Bindungsenergie
  https://www.chemeurope.com/en/encyclopedia/Standard_enthalpy_change_of_formation_%28data_table%29.html
  http://www.dinternet.ch/Datenblaetter/Standardbildungsenthalpie_und_Entropie.pdf
  http://www.mrbigler.com/misc/energy-of-formation.html
  */
  static normforma = {
    "(COOH)2(aq)": -818.3,
    "(COOH)2(s)": -826.8,
    "(NH4)2SO4(s)": -1179.3,
    "Ag(g)": 289.2,
    "Ag(s)": 0.0,
    "Ag+(aq)": 106,
    "Ag2CO3(s)": -505.84,
    "Ag2O(s)": -31.05,
    "AgCl(s)": -127.03,
    "AgI(s)": -62.4,
    "AgNO2(s)": -44.371,
    "AgNO3(s)": -123.1,
    "Al(g)": 314,
    "Al(s)": 0.0,
    "Al2O3(s)": -1669.8,
    "Al^3+(aq)": -524.7,
    "AlCl3(s)": -653.4,
    "Ar(g)": 0.0,
    "As(g)": 253.7,
    "As(s,": 0.0,
    "As4(s)": 149,
    "B(g)": 406,
    "B(s)": 0.0,
    "B2H6(g)": 31,
    "B2O3(s)": -1264,
    "B5H9(g)": 62.8,
    "Ba(g)": 175.6,
    "Ba(s)": 0.0,
    "Ba^2+(aq)": -538.36,
    "BaCO3(s)": -1216.29,
    "BaCl2*2H2O(s)": -1461.7,
    "BaCl2*H2O(s)": -1165,
    "BaCl2(s)": -860.06,
    "BBr3(g)": -187,
    "BBr3(l)": -221,
    "BCl3(g)":  -395,
    "BCl3(l)":  -418.4,
    "Be(g)":  320.6,
    "Be(s)":  0.0,
    "Be^2+(aq)": -390,
    "BF3(g)": -1110,
    "BF4(aq)": -1527,
    "Br(g)": 111.8,
    "Br-(aq)": -120.9,
    "Br2(g)": 30.7,
    "Br2(l)": 0.0,
    "C(g)": 718.384,
    "C(diamanto)": 1.896,
    "C(s)": 0.0,
    "C2H2(g)": 226.75,
    "C2H4(g)":  52.283,
    "C2H5OH(g)":  -235.4,
    "C2H5OH(l)":  -277.63,
    "C2H6(g)":  -84.667,
    "C2O4^2-(aq)":  -824.2,
    "C3H8(g)":  -103.8,
    "C6H12O6(s)": -1260,
    "C6H6(g)":  82.927,
    "C6H6(l)":  49.028,
    "CH3COOH(l)": -484.13064,
    "Ca(g)":  192.6,
    "Ca(s)":  0.0,
    "Ca^2+(aq)": -542.96,
    "CaCO3(aragonito)": -1207.0,
    "CaCO3(kalcito)": -1206.9,
    "Ca(OH)2(s)": -986.1688,
    "Ca(OH)2(aq)": -1002.82,
    "CH3CHO(aq)": -208.7,
    "CH3CHO(g)":  -166.4,
    "CH3CHO(l)":  -195,
    "CH3COO-(aq)":  -488.871,
    "CH3COOH(aq)":  -488.453,
    "CH3COOH(l)": -487.0,
    "CH3NH2(g)": -28,
    "CH3OCH3(g)": -184.05,
    "CH3OH(aq)":  -245.9,
    "CH3OH(g)": -201.3,
    "CH3OH(l)": -238.64,
    "CH3SH(g)": -12.4,
    "CH4(g)": -74.848,
    "Cl(g)":  121.39,
    "Cl-(aq)": -167.46,
    "Cl2(g)": 0.0,
    "Cl2O(g)": 76.15,
    "ClF3(g)":  -155,
    "ClO2(g)": 103,
    "ClO2-(aq)": -69.0,
    "ClO3-(aq)": -98.32,
    "ClO4-(aq)": -131.4,
    "CO(g)":  -110.523,
    // "CO2(aq)": -412.9, // (?) alia fonto donas -699.6 aŭ 394.4
    "CO2(g)": -393.513,
    "CO3^2-(aq)": -676.3,
    "Cs(g)":  78.78,
    "Cs(s)":  0.0,
    "Cs+(aq)": -248,
    "CsBr(s)": -394,
    "CsCl(s)": -433.0,
    "CsF(s)": -530.9,
    "CsI(s)": -337,
    "Cu(g)": 341.0,
    "Cu(s)":  0.0,
    "Cu+(aq)":  51.9,
    "Cu^2+(aq)": 64.39,
    "CuCO3(s)": -595,
    "Cu(OH)2(s)": -450.2,
    "CuSO4(s)": -769.86,
    "F(g)": 76.6,
    "F-(aq)": -329.1,
    "F2(g)": 0.0,
    "Fe(g)": 404.5,
    "Fe(s)": 0.0,
    "Fe^2+(aq)": -87.9,
    "Fe^3+(aq)": -47.7,
    "FeO(s)": -271.96,
    "Fe2O3(hematito)": -822.1,
    "Fe3O4(magnetito)": -1121,
    "Fe(OH)3(s)": -824,
    "Ge(g)":  328.2,
    "Ge(s)":  0.0,
    "H(g)":  217.94,
    "H+(aq)":  0.0,
    "H2(g)":  0.0,
    "H2CO3(aq)":  -698.7,
    "H2O(g)": -241.83,
    "H2O(l)": -285.84,
    "H2O2(aq)": -191.1,
    "H2O2(l)": -187.6,
    "H2S(aq)": -39,
    "H2SO4(l)": -814,
    "H2S(g)": -20.15,
    "H3O+(aq)": -285.84,
    "HBr(g)": -36.2,
    "HC2O4-(aq)": -818.8,
    "HCHO(g)": -116,
    "HCl(aq)": -167.46,
    "HCl(g)": -92.312,
    "HClO(aq)": -116.4,
    "HCO3(aq)": -691.1,
    "HCOO-(aq)": -410.0,
    "HCOOH(aq)": -410.0,
    "HCOOH(g)": -362.6,
    "HCOOH(l)": -409.2,
    "He(g)": 0.0,
    "HF(g)": -269,
    "Hg(g)": 60.84,
    "Hg(l)": 0.0,
    "Hg2Cl2(s)": -264.9,
    "HgCl2(s)": -230,
    "HI(g)":  26,
    "I(g)": 106.61,
    "I-(aq)": -55.94,
    "I2(aq)": 21,
    "I2(g)":  62.241,
    "I2(s)":  0.0,
    "I3-(aq)": -51.9,
    "IBr(g)": 40.8,
    "ICl(g)": 18,
    "ICl3(s)": -88.3,
    "K(g)": 90.00,
    "K(s)": 0.0,
    "K+(aq)": -251.2,
    "KCl(g)": -219,
    "KCl(s)": -435.87,
    "Kr(g)": 0.0,
    "Li(g)": 155.1,
    "Li(s)": 0.0,
    "Li+(aq)": -278.46,
    "LiBr(s)": -350.3,
    "LiCl(s)": -408.8,
    "LiF(s)": -612.1,
    "LiI(s)": -271.1,
    "Mg(g)": 150,
    "Mg(s)":  0.0,
    "Mg^2+(aq)": -461.96,
    "MgCl2*6H2O(s)": -2499.6,
    "MgCl2(s)": -641.83,
    "N(g)": 472.646,
    "N2(g)": 0.0,
    "N2H4(l)": 50.42,
    "N2O(g)": 81.55,
    "N2O2^2-(aq)": -10.8,
    "N2O4(g)": 9.661,
    "N2O5(s)": -41.8,
    "N3-(aq)": 252,
    "Na(g)": 108.7,
    "Na(s)": 0.0,
    "Na+(aq)": -239.66,
    "Na2(g)": 142.1,
    "Na2CO3(s)": -1131,
    "Na2O(s)": -416,
    "Na2O2(s)": -504.6,
    "Na2SO4(s)": -1387.1,
    "NaBr(s)": -359.95,
    "NaCl(s)": -411.00,
    "NaF(s)": -569.0,
    "NaI(s)": -288.0,
    "NaO2(s)": -259,
    "Ne(g)": 0.0,
    "NH2CONH2(s)": -333.2,
    "NH3(aq)": -80.83,
    "NH3(g)": -46.19,
    "NH4^+(aq)": -132.8,
    "NH4Cl(s)": -315.4,
    "NO(g)": 90.374,
    "NO2-(aq)": -106,
    "NO2(g)": 33.85,
    "NO3-(aq)": -206.57,
    "O(g)": 247.52,
    "O2(g)": 0.0,
    "O3(g)": 142,
    "OH(g)": 42.09,
    "OH-(aq)": -229.94,
    "P(g)": 314.5,
    "P(ruĝa)": -18,
    "P(blanka)": 0.0,
    "P4(g)": 54.89,
    "Pb(g)": 193.9,
    "Pb(s)": 0.0,
    "Pb^2+(aq)": 1.6,
    "PbCl2(s)": -359.41,
    "PbI2(s)": -175.4,
    "PbO(ruĝa)": -219.2,
    "PbO(flava)": -217.9,
    "PbO2(s)": -276.6,
    "PbCO3(s)": -699.15,
    "PCl3(g)": -306.4,
    "PCl5(g)": -398.9,
    "Rb(g)": 85.81,
    "Rb(s)": 0.0,
    "Rb+(aq)": -246,
    "RbBr(s)": -389.2,
    "RbCl(s)": -430.58,
    "RbF(s)": 551.9,
    "RbI(s)": 328,
    "Rn(g)": 0.0,
    "S(g)": 222.8,
    "S(monoklina)": 0.30,
    "S(romba)": 0.0,
    "SO2(g)": -296.9,
    "SO3(g)": -395.2,
    "S^2-(aq)": 41.8,
    "Si(g)": 368.4,
    "Si(s)": 0.0,
    "SiO(g)": -111.8,
    "SiO2(kvarco)": -859.4,
    "Sn(g)": 300,
    "Sn(griza)": 2.5,
    "Sn(blanka)": 0.0,
    "SO(g)": 79.58,
    "SO4^2-(aq)": -909.26688,
    "Sr(g)": 164,
    "Sr(s)": 0.0,
    "Sr^2+(aq)":  -545.51,
    "Ti(g)": 469,
    "Ti(s)": 0.0,
    "Ti2O3(s)": -1536,
    "Ti3O5(s)": -2443,
    "TiO2(rutilo III)": -912.1,
    "TlI(s)": -124,
    "TlI(g)": 33,
    "W(g)": 843.5,
    "W(s)": 0.0,
    "Xe(g)": 0.0,
    "Zn(s)": 0.0,
    "ZnO(s)": -348.0
  }


  // ekvacioj ŝajnas pli flekseblaj,
  // eble ni ankaŭ povus ĉenigi se por interaĵo mankas entalpio...!?
  static ekvacioj = [
    //...
    ["H2(g) + Cl2(g) -> 2 HCl(g)",""],
    ["2 NaCl(s) + H2SO4(l) -> Na2SO4(s) + 2 HCl(g)",""], 
      // https://de.wikipedia.org/wiki/Natriumsulfat
    ["Na2CO3(s) + H2SO4(l) -> Na2SO4(s) + H2O(l) + CO2(g)",""], 
      // https://de.wikipedia.org/wiki/Natriumsulfat
    ["2 Na(g) + Cl2(g) -> 2 NaCl(s)",""],
    ["2 Ag(s) + 2 HCl(aq) -> 2 AgCl(s) + H2(g)",""],
    ["H2SO4(l) + 2 NH3(g) -> (NH4)2SO4(s)",""],

    // ŝanĝo de materistato
    ["H2O(l) <-> H2O(g)","vaporiĝo de akvo"],
    ["Na(s) <-> Na(g)","vaporiĝo de natrio"],

    // solvado
    ["NaCl(s) -> Na+(aq) + Cl-(aq)","solviĝo de natria klorido"],

    // disociiĝo
    ["H2O(l) <-> H+(aq) + OH-(aq)","disociiĝo de akvo"],

    // precipitaj reakcioj
    ["Ag+(aq) + Cl-(aq) -> AgCl(s)","precipito de arĝenta klorido"],
    ["Pb^2+(aq) + 2 Cl-(aq) -> PbCl2(s)","precipito de plumba klorido"],
    ["Ag+(aq) + I-(aq) -> AgI(s)","precipito de arĝenta jodido"],
    ["Pb^2+(aq) + 2 I-(aq) -> PbI2(s)","precipito de plumba jodido"],
    ["2 Ag+(aq) + CO3^2-(aq) -> Ag2CO3(s)","precipito de arĝenta karbonato"],
    ["Ba^2+(aq) + CO3^2-(aq) -> BaCO3(s)","precipito de baria karbonato"],
    ["Pb^2+(aq) + CO3^2-(aq) -> PbCO3(s)","precipito de plumba karbonato"],
    ["Cu^2+(aq) + CO3^2-(aq) -> CuCO3(s)","precipito de kupra karbonato"],
    ["2 Ag+(aq) + 2 OH-(aq) -> Ag2O(s) + H2O(l)","precipito de arĝentoksido"],
    //"Pb^2+(aq) + 2 OH-(aq) -> Pb(OH)2(s)","precipito de karbonato"],
    ["Cu^2+(aq) + 2 OH-(aq) -> Cu(OH)2(s)","precipito de kupra hidroksido"],

    // acido-bazo-reakcioj
    //"H+(aq) + Cl-(aq) + Na+(aq) + OH-(aq) -> Na+(aq) + Cl-(aq) + H2O(l)",
    // "HNO3(aq) + KOH(aq) -> K + NO3(aq) + H2O(l)",
    "H2SO4(l) + Ca(OH)2(aq) -> Ca^2+(aq) + SO4^2-(aq) + 2 H2O(l)",
    //"CH3COOH(l) + OH-(aq) <-> CH3COO-(aq) + H2O(l)",
    "NH3(g) + H3O+(aq) <-> NH4^+(aq) + H2O(l)",

    // redoksaj / brulaj...
    ["C(s) + O2(g) -> CO2(g)","oksidigo de karbono"],
    ["2 CO(g) + O2(g) -> 2 CO2(g)","oksidigo de karbonmonoksido"],
    ["H2(g) + O2(g) -> H2O(g)","oksidigo de hidrogeno"],

    ["Fe(s) + 2 H+(aq) <-> Fe^2+(aq) + H2(g)","hidrogenkorodo de fero"],
    ["4 Fe^2+(aq) + 8 OH-(aq) + O2(g) + 3 H2O(l) -> 2 Fe(OH)3(s)","oksigenkorodo de fero"],
    ["3 Fe2O3(hematito) + CO(g) -> 2 Fe3O4(magnetito) + CO2(g)","redukto de hematito per CO"],
    ["3 Fe2O3(hematito) + H2(g) -> 2 Fe3O4(magnetito) + H2O(l)","redukto de hematito per H₂"],
    ["3 Fe2O3(hematito) + C(s) -> 2 Fe3O4(magnetito) + CO(g)","rekta redukto de hematito"],
    ["Fe3O4(magnetito) + CO(g) -> 3 FeO(s) + CO2(g)","redukto de magnetito per CO"],
    ["Fe3O4(magnetito) + H2(g) -> 3 FeO(s) + H2O(l)","redukto de magnetito per H₂"],
    ["Fe3O4(magnetito) + C(s) -> 3 FeO(s) + CO(g)","rekta redukto de magnetito"],
    ["FeO(s) + CO(g) -> Fe(s) + CO2(g)","redukto de vustito per CO"],
    ["FeO(s) + H2(g) -> Fe(s) + H2O(l)","redukto de vustito per H₂"],
    ["FeO(s) + C(s) -> Fe(s) + CO(g)","rekta redukto de vustito"],
    ["H2S(g) + 3 O2(g) -> 2 SO2(g) + 2 H2O(g)","oksidigo de H₂S"],

    ["CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(g)","kompleta forbrulo de metano"],
    ["2 CH4(g) + 3 O2(g) -> 2 CO(g) + 4 H2O(g)","nekompleta forbrulo de metano"],
    ["CO2(g) + 4 H2(g) -> CH4(g) + 2 H2O(g)","reakcio de Sabatier, sintezo de metano"], 
      // https://en.wikipedia.org/wiki/Sabatier_reaction
    ["CO(g) + 3 H2(g) -> CH4(g) + H2O(g)","reakcio de Sabatier, sintezo de metano"], 
      // https://en.wikipedia.org/wiki/Sabatier_reaction

    ["N2(g) + 3 H2(g) -> 2 NH3(g)","sintezo de amoniako"],
    ["C6H12O6(s) + 6 O2(g) -> 6 CO2(g) + 6 H2O(g)","kompleta forbrulo de glukozo"]
  ]


  static minmax() {
    const valoroj = Object.values(Entalpio.normforma);
    const max = Math.max(...valoroj);
    const min = Math.min(...valoroj);
    return {min: min, max: max};
  }

  /**
   * Redonas ekvaciojn, en kiuj enestas la donita kemiaĵo
   */
  static ekvacioj_kun(kemiajho) {
    let kolekto = [];

    for (const ekv of Entalpio.ekvacioj) {

      const termoj = ekv[0].split(' ');
      if (termoj.indexOf(kemiajho)>-1)
        kolekto.push(ekv);
    }

    return kolekto;
  }

  /**
   * Redonas ĉiujn kemiaĵojn, kiuj estas en rilato kun la donita per iuj
   * ekvacioj
   * @param {string} kemiajho
   */
  static ekvaciaj_rilatoj(kemiajho) {
    const ekvj = Entalpio.ekvacioj_kun(kemiajho);

    let kolekto = [];
    for (const ekv of ekvj) {
      const termoj = ekv[0].split(' ');
      for (const t of termoj) {
        if (t != kemiajho && typeof Entalpio.normforma[t] !== 'undefined') {
          kolekto.push(t);
        }
      }
    }

    return kolekto;
  }

  /**
   * ekstraktas la kemiaĵojn el ekvacioj (formuloj)
   */
  static el_ekvacioj() {
    let kolekto = {min: 0, max: 0};

    for (const ekv of Entalpio.ekvacioj) {
      const termoj = ekv[0].split(' ');
      for (const t of termoj) {
        const e = Entalpio.normforma[t];
        if (typeof e !== 'undefined') {
          kolekto[t] = e;
          kolekto.min = Math.min(e,kolekto.min);
          kolekto.max = Math.max(e,kolekto.max);
        }
      }
    }

    return kolekto;
  }

  /**
   * Redonas la normformajn entalpiojn de la kemiaĵoj en la ekvacio.
   * Tiuj de la reakciantoj negativigitaj, tiel ke la sumo egalas
   * al la reakcia entalpio(diferenco) laŭ la teoremo de Hess.
   */
  static ekvaciaj_entalpioj(ekv) {
    let entalpioj= [];
    let sgn = -1; // por reakciantoj negativa
    let n = 1; // obloj de kemiaĵoj

    const termoj = ekv.split(' ');
    for (const t of termoj) {
      if (t.length == 1 && "123456789".indexOf(t)>-1) {
        n = parseInt(t);
      } else if (t == "+") {
        n = 1; // remetu al apriora
      } else if (t == "->" || t == "<->") {
        sgn = 1; // por produktoj pozitiva
        n = 1; // remetu al apriora
      } else {
        const en = Entalpio.normforma[t];
        if (typeof en === 'undefined') console.error("Mankas entalpio por "+t);
        const e = sgn * n * en;
        entalpioj.push(e);
      }
    }
    return entalpioj;
  }

  /**
   * Eligas ĉiujn ekvaciojn kun la kalkuleblaj entalpioj kaj skribas al la konzolo.
   * Uzebla por serĉi mankojn...
   */
  static chiuj_ekvacioj() {
    for (const ekv of Entalpio.ekvacioj) {
      console.log('##> '+ekv.join(', '));
      const ej = Entalpio.ekvaciaj_entalpioj(ekv[0]);
      const sumo = (ej.reduce((s,e) => e+s,0)).toFixed(2);
      console.log(ej.join(' ')+" => "+sumo);
    }
  }


  /**
   * En formulo de kemiaĵo anstataŭigas ciferojn kaj
   * plu/minus per malsupra resp. supra unikodero: H2O -> H₂O ktp.
   * 
   */
  static format(k) {
    const re = /^([A-Za-z\(\)\*1-9]+)\^?([\+\-1-9]+)?(\([a-z]+\))$/;
    const m = re.exec(k);
    if (!m) throw "Erara formulo: "+k;

    // la kombino de elementoj, nombrojn malaltigu, krom post '*'
    const frm = m[1]
      // ne subtenita en Safario...
      //.replace(/(?<!\*)[0-9]/g,(d) =>
      //  String.fromCharCode(0x2080 + d.codePointAt(0) - "0".codePointAt(0)))
      .replace(/([^\^*])([0-9]+)/g,(d,p1,p2) =>
        p1 + p2.split('')
          .map((c) => String.fromCharCode(0x2080 + c.codePointAt(0) - "0".codePointAt(0)))
          .join(''))
      .replace('*','\u00b7');

    // altigu jonŝargon
    let suff = '';
    if (m[2]) {
      suff = m[2]
      .replace(/\+/,'\u207a')
      .replace(/\-/,'\u207b')
      .replace(/[0,4-9]/,(d) =>
        String.fromCharCode(0x2070 + d.codePointAt(0) - "0".codePointAt(0)))
      .replace(/1/,'\u00b9')
      .replace(/2/,'\u00b2')
      .replace(/3/,'\u00b3');
    }
    // malaltigu multoblojn de atomoj/grupoj
    return { formulo: frm+suff,
      stato: m[3].slice(1,-1)};
  }


}

