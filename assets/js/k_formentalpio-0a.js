class Entalpio {

  // fontoj:
  // https://de.wikipedia.org/wiki/Enthalpie#Standardbildungsenthalpie
  // http://anorganik.chemie.vias.org/standardenthalpien_table.html
  // https://de.wikibooks.org/wiki/Tabellensammlung_Chemie/_Enthalpie_und_Bindungsenergie
  // https://www.chemeurope.com/en/encyclopedia/Standard_enthalpy_change_of_formation_%28data_table%29.html
  static normforma = {
    "(COOH)2(aq)": -818.3, 
    "(COOH)2(s)":	-826.8, 
    "(NH4)2SO4(s)":	-1179.3,
    "Ag(g)": 289.2,
    "Ag(s)": 0.0,
    "AgCl(s)": -127.03, 
    "AgNO2(s)":	-44.371,
    "AgNO3(s)": -123.1, 	
    "Al(g)": 314,
    "Al(s)": 0.0, 
    "Al2O3(s)":	-1669.8, 	
    "Al^3+(aq)":	-524.7, 	
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
    "BaCl2*2H2O(s)": -1461.7,
    "BaCl2*H2O(s)": -1165, 	
    "BaCl2(s)": -860.06, 
    "BBr3(g)": -187,
    "BBr3(l)": -221,	
    "BCl3(g)": 	-395, 
    "BCl3(l)": 	-418.4,
    "Be(g)": 	320.6, 
    "Be(s)": 	0.0, 
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
    "C2H4(g)": 	52.283, 
    "C2H5OH(g)": 	-235.4, 
    "C2H5OH(l)": 	-277.63, 
    "C2H6(g)": 	-84.667, 	
    "C2O4^2-(aq)": 	-824.2, 	
    "C3H8(g)": 	-103.8, 	
    "C6H12O6(s)": -1260,
    "C6H6(g)": 	82.927, 
    "C6H6(l)": 	49.028, 
    "Ca(g)": 	192.6, 
    "Ca(s)": 	0.0, 
    "Ca^2+(aq)":	-542.96,
    "CaCO3(aragonito)": -1207.0, 	
    "CaCO3(kalcito)":	-1206.9, 	
    "CH3CHO(aq)": -208.7,
    "CH3CHO(g)": 	-166.4, 
    "CH3CHO(l)": 	-195,
    "CH3COO-(aq)": 	-488.871, 
    "CH3COOH(aq)": 	-488.453, 
    "CH3COOH(l)": -487.0,
    "CH3NH2(g)": -28, 	
    "CH3OCH3(g)": -184.05, 	
    "CH3OH(aq)": 	-245.9, 	
    "CH3OH(g)": -201.3, 
    "CH3OH(l)": -238.64, 
    "CH3SH(g)": -12.4, 
    "CH4(g)": -74.848, 	
    "Cl(g)": 	121.39, 
    "Cl-(aq)":	-167.46, 	
    "Cl2(g)": 0.0, 
    "Cl2O(g)": 76.15, 
    "ClF3(g)": 	-155,
    "ClO2(g)": 103,
    "ClO2-(aq)": -69.0, 
    "ClO3-(aq)": -98.32, 
    "ClO4-(aq)": -131.4,
    "CO(g)": 	-110.523, 	
    // "CO2(aq)": -412.9, // (?) alia fonto donas -699.6 aŭ 394.4
    "CO2(g)": -393.513,
    "CO3^2-(aq)": -676.3,
    "Cs(g)": 	78.78, 
    "Cs(s)": 	0.0, 
    "Cs+(aq)": -248,
    "CsBr(s)": -394,
    "CsCl(s)": -433.0, 
    "CsF(s)": -530.9, 
    "CsI(s)": -337,
    "Cu(g)": 341.0, 
    "Cu(s)": 	0.0, 
    "Cu+(aq)": 	51.9, 
    "Cu^2+(aq)":	64.39,
    "CuSO4(s)": -769.86, 
    "F(g)": 76.6, 
    "F-(aq)":	-329.1,
    "F2(g)": 0.0,
    "Fe(g)": 404.5, 
    "Fe(s)": 0.0, 
    "Fe^2+(aq)":	-87.9, 	
    "Fe2O3(hematito)": -822.1, 	
    "Fe^3+(aq)":	-47.7, 	
    "Fe3O4(magnetito)": -1121, 	
    "Ge(g)": 	328.2,
    "Ge(s)": 	0.0, 
    "H(g)": 	217.94, 
    "H+(aq)": 	0.0, 
    "H2(g)": 	0.0, 
    "H2CO3(aq)": 	-698.7, 
    "H2O(g)": -241.83, 	
    "H2O(l)": -285.84, 	
    "H2O2(aq)": -191.1, 
    "H2O2(l)": -187.6, 
    "H2S(aq)": -39,
    "H2S(g)": -20.15, 	
    "H3O+(aq)": -285.84, 	
    "HBr(g)": -36.2, 	
    "HC2O4-(aq)":	-818.8, 
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
    "HI(g)": 	26,
    "I(g)": 106.61, 
    "I-(aq)": -55.94, 	
    "I2(aq)":	21,
    "I2(g)": 	62.241, 
    "I2(s)": 	0.0,
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
    "Mg(s)": 	0.0, 
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
    "NaBr(s)": -359.95, 
    "NaCl(s)": -411.00, 	
    "NaF(s)": -569.0, 	
    "NaI(s)": -288.0,
    "NaO2(s)": -259,
    "Ne(g)": 0.0, 
    "NH2CONH2(s)": -333.2, 	
    "NH3(aq)": -80.83, 
    "NH3(g)": -46.19, 	
    "NH4+(aq)":	-132.8, 	
    "NH4Cl(s)":	-315.4, 	
    "NO(g)": 90.374, 
    "NO2-(aq)":	-106,
    "NO2(g)": 33.85, 
    "NO3-(aq)": -206.57, 
    "O(g)": 247.52, 
    "O2(g)": 0.0, 
    "O3(g)": 142,
    "OH(g)": 42.09, 
    "OH-(aq)":	-229.94,
    "P(g)": 314.5, 
    "P(ruĝa)": -18, 	
    "P(blanka)": 0.0,
    "P4(g)": 54.89, 
    "Pb(g)": 193.9, 
    "Pb(s)": 0.0, 
    "Pb^2+(aq)": 1.6, 
    "PbO(ruĝa)": -219.2, 	
    "PbO(flava)": -217.9, 	
    "PbO2(s)": -276.6, 	
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
    "Sn(blanka)":	0.0, 
    "SO(g)": 79.58, 
    "Sr(g)": 164,
    "Sr(s)": 0.0, 
    "Sr^2+(aq)": 	-545.51, 	
    "Ti(g)": 469,
    "Ti(s)": 0.0, 
    "Ti2O3(s)": -1536,
    "Ti3O5(s)":	-2443,
    "TiO2(rutilo III)":	-912.1, 	
    "TlI(s)": -124, 	
    "TlI(g)": 33,
    "W(g)":	843.5,
    "W(s)":	0.0,
    "Xe(g)":	0.0, 
    "Zn(s)": 0.0, 
    "ZnO(s)": -348.0 	
  }

  static formebloj = {
    "CO2(g)": [
        {_: 2, "CO(g)": 2, "O2(g)": 1},
        {_: 1, "C(s)": 1, "O2(g)": 1}
    ],
    "CO(g)": [
        {_: 2, "C(s)": 2, "O2(g)": 1}
    ],
    "NaCl(s)": [
      {_: 2, "Na(s)": 2, "Cl2(g)": 1},
      {_: 1, "Na+(aq)": 1, "Cl-(aq)": 1}
    ]
  }

  static minmax() {
    const valoroj = Object.values(Entalpio.normforma);
    const max = Math.max(...valoroj);
    const min = Math.min(...valoroj);
    return {min: min, max: max};
  }

  /**
   * ekstraktas la kemiaĵojn el formebloj (formuloj)
   */
  static el_formebloj() {
    let kolekto = {};

    for (const [f,f1] of Object.entries(Entalpio.formebloj)) {
      kolekto[f] = true;
      f1.map((f1_) => {
        for (const f2 in f1_) {
          if (f2 != '_') kolekto[f2] = true;
        }
      });
    }

    for (const k in kolekto) {
      kolekto[k] = Entalpio.normforma[k]
    }

    return kolekto;
  }

  /**
   * En formulo de kemiaĵo anstataŭigas ciferojn kaj
   * plu/minus per malsupra resp. supra unikodero: H2O -> H₂O ktp.
   */
  static format(k) {
    const p = k.replace(/\+/,'\u207a').replace(/\-/,'\u207b').split('^');
    let suff = '';
    // altigu jonŝargon
    if (p[1]) {
      suff = p[1]
      .replace(/[0,4-9]/,(d) =>
        String.fromCharCode(0x2070 + d.codePointAt(0) - "0".codePointAt(0)))
      .replace(/1/,'\u00b9')
      .replace(/2/,'\u00b2')
      .replace(/3/,'\u00b3');
    }
    // malaltigu multoblojn de atomoj/grupoj
    return p[0]
      .replace(/(?<!\*)[0-9]/g,(d) => 
        String.fromCharCode(0x2080 + d.codePointAt(0) - "0".codePointAt(0)))
      .replace('*','\u00b7')
      +suff;
  }


}

