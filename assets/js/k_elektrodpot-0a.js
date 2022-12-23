/*
https://en.wikipedia.org/wiki/Standard_electrode_potential_(data_page)
E° [V]
T=298.15 K (25.00 °C).
c=1 mol/l
p=101.325 kPa

legendo: 
 (s) - solida; 
 (l) - likva; 
 (g) - gasa; 
 (aq) - akva solvaĵo
 (Hg) - amalgamo
*/   

class EPot {

    // normaj elektrod-tensioj rilate al norma hidrogenelektrodo
    static NET = [
["Sr",1,0,"Sr^+ + e- <-> Sr(s)", -4.101, 1],
["Ca",1,0,"Ca^+ + e- <-> Ca(s)", -3.8, 1],
["Th",4,3,"Th^4+ + e- <-> Th^3+",-3.6, 1],
["Pr",3,2,"Pr^3+ + e- <-> Pr^2+",-3.1, 1],
["N",0,-1,"3 N(g) + 2 H+ + 2e- <-> 2 HN3(aq)", -3.09, 2],
["Li",1,0,"Li^+ + e- <-> Li(s)", -3.0401, 1],
["N",0,-1,"N2(g) + 4 H2O + 2e- <-> 2 NH2OH(aq) + 2 OH-", -3.04, 2],
["Cs",1,0,"Cs^+ + e- <-> Cs(s)", -3.026, 1],
["Ca",2,0,"Ca(OH)2 + 2e- <-> Ca(s) + 2 OH-", -3.02, 2],
["Er",3,2,"Er^3+ + e- <-> Er^2+",-3, 1],
["Ba",2,0,"Ba(OH)2 + 2e- <-> Ba(s) + 2 OH-", -2.99, 2],
["Rb",1,0,"Rb^+ + e- <-> Rb(s)", -2.98, 1],
["K",1,0,"K^+ + e- <-> K(s)", -2.931, 1],
["Ba",2,0,"Ba^2+ + 2e- <-> Ba(s)", -2.912, 2],
["La",3,0,"La(OH)3(s) + 3e- <-> La(s) + 3 OH-", -2.9, 3],
["Fr",1,0,"Fr^+ + e- <-> Fr(s)", -2.9, 1],
["Sr",2,0,"Sr^2+ + 2e- <-> Sr(s)", -2.899, 2],
["Sr",2,0,"Sr(OH)2 + 2e- <-> Sr(s) + 2 OH-", -2.88, 2],
["Ca",2,0,"Ca^2+ + 2e- <-> Ca(s)", -2.868, 2],
["Li",1,0,"Li^+ + C6(s) + e- <-> LiC6(s)", -2.84, 1],
["Eu",2,0,"Eu^2+ + 2e- <-> Eu(s)", -2.812, 2],
["Ra",2,0,"Ra^2+ + 2e- <-> Ra(s)", -2.8, 2],
["Ho",3,2,"Ho^3+ + e- <-> Ho^2+", -2.8, 1],
["Bk",3,2,"Bk^3+ + e- <-> Bk^2+",-2.8, 1],
["Yb",2,0,"Yb^2+ + 2e- <-> Yb(s)", -2.76, 2],
["Na",1,0,"Na^+ + e- <-> Na(s)", -2.71, 1],
["Mg",1,0,"Mg^+ + e- <-> Mg(s)", -2.7, 1],
["Nd",3,2,"Nd^3+ + e- <-> Nd^2+",-2.7, 1],
["Mg",2,0,"Mg(OH)2 + 2e- <-> Mg(s) + 2 OH-", -2.69, 2],
["Sm",2,0,"Sm^2+ + 2e- <-> Sm(s)", -2.68, 2],
["Be",2,0,"Be2O3^2- + 3 H2O + 4e- <-> 2 Be(s) + 6 OH-", -2.63, 4],
["Pm",3,2,"Pm^3+ + e- <-> Pm^2+",-2.6, 1],
["Dy",3,2,"Dy^3+ + e- <-> Dy^2+",-2.6, 1],
["No",2,0,"No^2+ + 2e- <-> No", -2.5, 2],
["Hf",4,0,"HfO(OH)2 + H2O + 4e- <-> Hf(s) + 4 OH-", -2.5, 4],
["Th",4,0,"Th(OH)4 + 4e- <-> Th(s) + 4 OH-", -2.48, 4],
["Md",2,0,"Md^2+ + 2e- <-> Md", -2.4, 2],
["Tm",2,0,"Tm^2+ + 2e- <-> Tm(s)", -2.4, 2],
["La",3,0,"La^3+ + 3e- <-> La(s)", -2.379, 3],
["Y",3,0,"Y^3+ + 3e- <-> Y(s)", -2.372, 3],
["Mg",2,0,"Mg^2+ + 2e- <-> Mg(s)", -2.372, 2],
["Zr",4,0,"ZrO(OH)2(s) + H2O + 4e- <-> Zr(s) + 4 OH-", -2.36, 4],
["Pr",3,0,"Pr^3+ + 3e- <-> Pr(s)", -2.353, 3],
["Ce",3,0,"Ce^3+ + 3e- <-> Ce(s)", -2.336, 3],
["Er",3,0,"Er^3+ + 3e- <-> Er(s)", -2.331, 3],
["Ho",3,0,"Ho^3+ + 3e- <-> Ho(s)", -2.33, 3],
["Al",3,0,"H2AlO3^- + H2O + 3e- <-> Al(s)  + 4 OH-", -2.33, 3],
["Nd",3,0,"Nd^3+ + 3e- <-> Nd(s)", -2.323, 3],
["Tm",3,0,"Tm^3+ + 3e- <-> Tm(s)", -2.319, 3],
["Al",3,0,"Al(OH)3(s) + 3e- <-> Al(s) + 3 OH-", -2.31, 3],
["Sm",3,0,"Sm^3+ + 3e- <-> Sm(s)", -2.304, 3],
["Fm",2,0,"Fm^2+ + 2e- <-> Fm", -2.3, 2],
["Am",3,0,"Am^3+ + e- <-> Am^2+",-2.3, 1],
["Dy",3,0,"Dy^3+ + 3e- <-> Dy(s)", -2.295, 3],
["Lu",3,0,"Lu^3+ + 3e- <-> Lu(s)", -2.28, 3],
["Tb",3,0,"Tb^3+ + 3e- <-> Tb(s)", -2.28, 3],
["Gd",3,0,"Gd^3+ + 3e- <-> Gd(s)", -2.279, 3],
["H",0,-1,"H2(g) + 2e- <-> 2 H^-",-2.23, 2],
["Es",2,0,"Es^2+ + 2e- <-> Es(s)", -2.23, 2],
["Pm",2,0,"Pm^2+ + 2e- <-> Pm(s)", -2.2, 2],
["Tm",3,2,"Tm^3+ + e- <-> Tm^2+", -2.2, 1],
["Dy",2,0,"Dy^2+ + 2e- <-> Dy(s)", -2.2, 2],
["Ac",3,0,"Ac^3+ + 3e- <-> Ac(s)", -2.2, 3],
["Yb",3,0,"Yb^3+ + 3e- <-> Yb(s)", -2.19, 3],
["Cf",2,0,"Cf^2+ + 2e- <-> Cf(s)", -2.12, 2],
["Nd",2,0,"Nd^2+ + 2e- <-> Nd(s)", -2.1, 2],
["Ho",2,0,"Ho^2+ + 2e- <-> Ho(s)", -2.1, 2],
["Sc",3,0,"Sc^3+ + 3e- <-> Sc(s)", -2.077, 3],
["Al",3,0,"AlF6^3- + 3e- <-> Al(s) + 6F^-",-2.069, 3],
["Am",3,0,"Am^3+ + 3e- <-> Am(s)", -2.048, 3],
["Cm",3,0,"Cm^3+ + 3e- <-> Cm(s)", -2.04, 3],
["Pu",3,0,"Pu^3+ + 3e- <-> Pu(s)", -2.031, 3],
["Pr",2,0,"Pr^2+ + 2e- <-> Pr(s)", -2, 2],
["Er",2,0,"Er^2+ + 2e- <-> Er(s)", -2, 2],
["Eu",3,0,"Eu^3+ + 3e- <-> Eu(s)", -1.991, 3],
["Lr",3,0,"Lr^3+ + 3e- <-> Lr", -1.96, 3],
["Cf",3,0,"Cf^3+ + 3e- <-> Cf(s)", -1.94, 3],
["Es",3,0,"Es^3+ + 3e- <-> Es(s)", -1.91, 3],
["Pa",4,3,"Pa^4+ + e- <-> Pa^3+",-1.9, 1],
["Am",2,0,"Am^2+ + 2e- <-> Am(s)", -1.9, 2],
["Th",4,0,"Th^4+ + 4e- <-> Th(s)", -1.899, 4],
["Fm",3,0,"Fm^3+ + 3e- <-> Fm", -1.89, 3],
["Np",3,0,"Np^3+ + 3e- <-> Np(s)", -1.856, 3],
["Be",2,0,"Be^2+ + 2e- <-> Be(s)", -1.847, 2],
["P",1,0,"H2PO2^- + e- <-> P(s) + 2 OH-", -1.82, 1],
["U",3,0,"U^3+ + 3e- <-> U(s)", -1.798, 3],
["Sr",2,0,"Sr^2+ + 2e- <-> Sr( Hg)", -1.793, 2],
["B",3,0,"H2BO3^- + H2O + 3e- <-> B(s) + 4 OH-", -1.79, 3],
["Th",4,0,"ThO2 + 4 H^+ + 4e- <-> Th(s) + 2 H2O", -1.789, 4],
["Hf",4,0,"HfO^2+ + 2 H^+ + 4e- <-> Hf(s) + H2O", -1.724, 4],
["P",3,0,"HPO3^2- + 2 H2O + 3e- <-> P(s) + 5 OH-", -1.71, 3],
["Si",4,0,"SiO3^2- + 3 H2O + 4e- <-> Si(s) + 6 OH-", -1.697, 4],
["Al",3,0,"Al^3+ + 3e- <-> Al(s)", -1.662, 3],
["Ti",2,0,"Ti^2+ + 2e- <-> Ti(s)", -1.63, 2],
["Zr",4,0,"ZrO2(s) + 4 H^+ + 4e- <-> Zr(s) + 2 H2O", -1.553, 4],
["Zr",4,0,"Zr^4+ + 4e- <-> Zr(s)", -1.45, 4],
["Ti",3,0,"Ti^3+ + 3e- <-> Ti(s)", -1.37, 3],
["Ti",2,0,"TiO(s) + 2 H^+ + 2e- <-> Ti(s) + H2O", -1.31, 2],
["Ti",3,2,"Ti2O3(s) + 2 H^+ + 2e- <-> 2 TiO(s) + H2O", -1.23, 2],
["Zn",2,0,"Zn(OH)4^2- + 2e- <-> Zn(s) + 4 OH-", -1.199, 2],
["Mn",2,0,"Mn^2+ + 2e- <-> Mn(s)", -1.185, 2],
["Fe",2,0,"Fe(CN)6^4- + 6 H^+ + 2e- <-> Fe(s) + 6HCN(aq)", -1.16, 2],
["Te",0,-2,"Te(s) + 2e- <-> Te^2-",-1.143, 2],
["V",2,0,"V^2+ + 2e- <-> V(s)", -1.13, 2],
["Nb",3,0,"Nb^3+ + 3e- <-> Nb(s)", -1.099, 3],
["Sn",0,-4,"Sn(s) + 4 H^+ + 4e- <-> SnH4(g)", -1.07, 4],
["Ti",4,0,"TiO^2+ + 2 H^+ + 4e- <-> Ti(s) + H2O", -0.93, 4],
["Si",4,0,"SiO2(s) + 4 H^+ + 4e- <-> Si(s) + 2 H2O", -0.91, 4],
["B",3,0,"B(OH)3(aq) + 3 H^+ + 3e- <-> B(s) + 3 H2O", -0.89, 3],
["Fe",2,0,"Fe(OH)2(s) + 2e- <-> Fe(s) + 2 OH-", -0.89, 2],
["Fe",3,2,"Fe2O3(s) + 3 H2O + 2e- <-> 2 Fe(OH)2(s) + 2 OH-", -0.86, 2],
["H",1,0,"2 H2O + 2e- <-> H2(g) + 2 OH-", -0.8277, 2],
["Bi",0,-3,"Bi(s) + 3 H^+ + 3e- <->  BiH3", -0.8, 3],
["Zn",2,0,"Zn^2+ + 2e- <-> Zn(Hg)", -0.7628, 2],
["Zn",2,0,"Zn^2+ + 2e- <-> Zn(s)", -0.7618, 2],
["Ta",5,0,"Ta2O5(s) + 10 H^+ + 10e- <-> 2 Ta(s) + 5 H2O", -0.75, 10],
["Cr",3,0,"Cr^3+ + 3e- <-> Cr(s)", -0.74, 3],
["Ni",2,0,"Ni(OH)2(s) + 2e- <-> Ni(s) + 2 OH-", -0.72, 2],
["Ag",1,0,"Ag2S(s) + 2e- <-> 2 Ag(s) +  S^2-(aq)", -0.69, 2],
["Au",1,0,"[Au(CN)2]^- + e- <->  Au(s) + 2 CN^-",-0.6, 1],
["Ta",3,0,"Ta^3+ + 3e- <-> Ta(s)", -0.6, 3],
["Pb",2,0,"PbO(s) + H2O + 2e- <-> Pb(s) + 2 OH-", -0.58, 2],
["Ti",4,3,"2 TiO2(s) + 2 H^+ + 2e- <-> Ti2O3(s) + H2O", -0.56, 2],
["Ga",3,0,"Ga^3+ + 3e- <-> Ga(s)", -0.53, 3],
["U",4,3,"U^4+ + e- <-> U^3+",-0.52, 1],
["P",1,0,"H3PO2(aq) + H^+ + e- <-> P(blanka) + 2 H2O", -0.508, 1],
["P",3,1,"H3PO3(aq) + 2 H^+ + 2e- <-> H3PO2(aq) + H2O", -0.499, 2],
["Ni",4,2,"NiO2(s) + 2 H2O + 2e- <->  Ni(OH)2(s) + 2 OH-", -0.49, 2],
["P",3,0,"H3PO3(aq) + 3 H^+ + 3e- <-> P(ruĝa) + 3 H2O", -0.454, 3],
["Cu",1,0,"Cu(CN)2^- + e- <-> Cu(s) + 2 CN^-",-0.44, 1],
["Fe",2,0,"Fe^2+ + 2e- <-> Fe(s)", -0.44, 2],
["C",4,3,"2 CO2(g) + 2 H^+ + 2e- <->  HOOCCOOH(aq)", -0.43, 2],
["Cr",3,2,"Cr^3+ + e- <-> Cr^2+",-0.42, 1],
["Cd",2,0,"Cd^2+ + 2e- <-> Cd(s)", -0.4, 2],
["Ge",4,2,"GeO2(s) + 2 H^+ + 2e- <-> GeO(s) + H2O", -0.37, 2],
["Cu",1,0,"Cu2O(s) + H2O + 2e- <-> 2 Cu(s) + 2 OH-", -0.36, 2],
["Pb",2,0,"PbSO4(s) + 2e- <->  Pb(s) + SO4^2-", -0.3588, 2],
["Pb",2,0,"PbSO4(s) + 2e- <-> Pb(Hg) + SO4^2-", -0.3505, 2],
["Eu",3,2,"Eu^3+ + e- <-> Eu^2+",-0.35, 1],
["In",3,0,"In^3+ + 3e- <-> In(s)", -0.34, 3],
["Tl",1,0,"Tl^+ + e- <-> Tl(s)", -0.34, 1],
["Ge",0,-4,"Ge(s) + 4 H^+ + 4e- <-> GeH4(g)", -0.29, 4],
["Co",2,0,"Co^2+ + 2e- <-> Co(s)", -0.28, 2],
["P",5,3,"H3PO4(aq) + 2 H^+ + 2e- <-> H3PO3(aq) + H2O", -0.276, 2],
["V",3,2,"V^3+ + e- <-> V^2+",-0.26, 1],
["Ni",2,0,"Ni^2+ + 2e- <-> Ni(s)", -0.25, 2],
["As",0,-3,"As(s) + 3 H^+ + 3e- <->  AsH3(g)", -0.23, 3],
["Ag",1,0,"AgI(s) + e- <-> Ag(s) + I^-",-0.15224, 1],
["Mo",4,0,"MoO2(s) + 4 H^+ + 4e- <-> Mo(s) + 2 H2O", -0.15, 4],
["Si",0,-4,"Si(s) + 4 H^+ + 4e- <-> SiH4(g)", -0.14, 4],
["Sn",2,0,"Sn^2+ + 2e- <-> Sn(s)", -0.13, 2],
["O",0,-1,"O2(g) + H^+ + e- <-> HO2^•(aq)", -0.13, 1],
["Pb",2,0,"Pb^2+ + 2e- <-> Pb(s)", -0.126, 2],
["W",4,0,"WO2(s) + 4 H^+ + 4e- <->  W(s) + 2 H2O", -0.12, 4],
["P",0,-3,"P(red) + 3 H^+ + 3e- <->  PH3(g)", -0.111, 3],
["C",4,2,"CO2(g) + 2 H^+ + 2e- <->  HCOOH(aq)", -0.11, 2],
["Se",0,-2,"Se(s) + 2 H^+ + 2e- <-> H2Se(g)", -0.11, 2],
["C",4,2,"CO2(g) + 2 H^+ + 2e- <-> CO(g) + H2O", -0.11, 2],
["Cu",1,0,"Cu(NH3)2^+ + e- <-> Cu(s) + 2 NH3(aq)", -0.1, 1],
["Sn",2,0,"SnO(s) + 2 H^+ + 2e- <-> Sn(s) + H2O", -0.1, 2],
["Sn",4,2,"SnO2(s) + 2 H^+ + 2e- <-> SnO(s) + H2O", -0.09, 2],
["W",6,0,"WO3(aq) + 6 H^+ + 6e- <-> W(s) + 3 H2O", -0.09, 6],
["Fe",8/3,0,"Fe3O4(s) + 8 H^+ + 8e- <-> 3 Fe(s) + 4 H2O", -0.085, 8],
["P",0,-3,"P(blanka) + 3 H^+ + 3e- <->  PH3(g)", -0.063, 3],
["Fe",3,0,"Fe^3+ + 3e- <-> Fe(s)", -0.04, 3],
["C",2,0,"HCOOH(aq) + 2 H^+ + 2e- <-> HCHO(aq) + H2O", -0.03, 2],
["H",1,0,"2 H^+ + 2e- <-> H2(g)", 0, 2],
["Ag",1,0,"AgBr(s) + e- <-> Ag(s) + Br^-",0.07133, 1],
["S",5,4,"S4O6^2- + 2e- <-> 2 S2O3^2-", 0.08, 2],
["N",0,-3,"N2(g) + 2 H2O + 6 H^+ + 6e- <-> 2 NH4OH(aq)", 0.092, 6],
["Hg",2,0,"HgO(s) + H2O + 2e- <-> Hg(l) + 2 OH-", 0.0977, 2],
["Cu",2,1,"Cu(NH3)4^2+ + e- <-> Cu(NH3)2^+ + 2 NH3(aq)", 0.1, 1],
["Ru",3,2,"Ru(NH3)6^3+ + e- <-> Ru(NH3)6^2+", 0.1, 1],
["N",2,1,"N2H4(aq) + 4 H2O + 2e- <-> 2 NH4^+ + 4 OH-", 0.11, 2],
["Mo",6,0,"H2MoO4(aq) + 6 H^+ + 6e- <-> Mo(s) + 4 H2O", 0.11, 6],
["Ge",4,0,"Ge^4+ + 4e- <-> Ge(s)", 0.12, 4],
["C",0,-4,"C(s) + 4 H^+ + 4e- <->  CH4(g)", 0.13, 4],
["C",0,-2,"HCHO(aq) + 2 H^+ + 2e- <->  CH3OH(aq)", 0.13, 2],
["S",0,-2,"S(s) + 2 H^+ + 2e- <-> H2S(g)", 0.14, 2],
["Sn",4,2,"Sn^4+ + 2e- <-> Sn^2+", 0.15, 2],
["Cu",2,1,"Cu^2+ + e- <-> Cu^+",0.159, 1],
["S",6,4,"HSO4^- + 3 H^+ + 2e- <-> SO2(aq) + 2 H2O", 0.16, 2],
["U",6,5,"UO2^2+ + e- <-> UO2^+", 0.163, 1],
["S",6,4,"SO4^2- + 4 H^+ + 2e- <-> SO2(aq) + 2 H2O", 0.17, 2],
["Ti",4,3,"TiO^2+ + 2 H^+ + e- <-> Ti^3+ + H2O", 0.19, 1],
["Sb",3,0,"SbO^+ + 2 H^+ + 3e- <-> Sb(s) + H2O", 0.2, 3],
["Fe",3,8/3,"3 Fe2O3(s) + 2 H^+ + 2e- <-> 2 Fe3O4(s) + H2O", 0.22, 2],
["Ag",1,0,"AgCl(s) + e- <-> Ag(s) + Cl^-",0.22233, 1],
["As",3,0,"H3AsO3(aq) + 3 H^+ + 3e- <-> As(s) + 3 H2O", 0.24, 3],
["Ru",3,2,"Ru^3+(aq) + e- <-> Ru^2+(aq)", 0.249, 1],
["Ge",2,0,"GeO(s) + 2 H^+ + 2e- <-> Ge(s) + H2O", 0.26, 2],
["U",5,4,"UO2^+ + 4 H^+ + e- <-> U^4+ + 2 H2O", 0.273, 1],
["Re",3,0,"Re^3+ + 3e- <-> Re(s)", 0.3, 3],
["At",0,-1,"At + e- <-> At^-", 0.3, 1],
["Bi",3,0,"Bi^3+ + 3e- <-> Bi(s)", 0.308, 3],
["Cu",2,0,"Cu^2+ + 2e- <-> Cu(s)", 0.337, 2],
["V",4,3,"[VO]^2+ + 2 H^+ + e- <-> V^3+ + H2O", 0.34, 1],
["Fe",3,2,"[Fe(CN)6]]^3- + e- <-> [Fe(CN)6]]^4-",0.3704, 1],
["Fe",1,0,"Fe^+ + e- <-> Fe(s)", 0.4, 1],
["O",0,-2,"O2(g) + 2 H2O + 4e- <-> 4 OH-(aq)", 0.401, 4],
["Mo",6,3,"H2MoO4 + 6 H^+ + 3e- <-> Mo^3+ + 4 H2O", 0.43, 3],
["Ru",2,0,"Ru^2+(aq) + 2e- <->  Ru", 0.455, 2],
["C",-2,-4,"CH3OH(aq) + 2 H^+ + 2e- <->  CH4(g) + H2O", 0.5, 2],
["S",4,0,"SO2(aq) + 4 H^+ + 4e- <-> S(s) + 2 H2O", 0.5, 4],
["Cu",1,0,"Cu^+ + e- <-> Cu(s)", 0.52, 1],
["C",2,0,"CO(g) + 2 H^+ + 2e- <-> C(s) + H2O", 0.52, 2],
["I",0,-1,"I3^- + 2e- <-> 3 I^-",0.53, 2],
["I",0,-1,"I2(s) + 2e- <-> 2 I^-",0.54, 2],
["Au",3,0,"[AuI4]^- + 3e- <-> Au(s) + 4 I^-",0.56, 3],
["As",5,3,"H3AsO4(aq) + 2 H^+ + 2e- <-> H3AsO3(aq) + H2O", 0.56, 2],
["Au",1,0,"[AuI2]^- + e- <-> Au(s) + 2 I^-",0.58, 1],
["Mn",7,4,"MnO4^- + 2 H2O + 3e- <-> MnO2(s) + 4 OH-", 0.595, 3],
["S",2,0,"S2O3^2- + 6 H^+ + 4e- <-> 2 S(s) + 3 H2O", 0.6, 4],
["Mo",6,4,"H2MoO4(aq) + 2 H^+ + 2e- <-> MoO2(s) + 2 H2O", 0.65, 2],
//["C","1,4-Benzochinon.svg + 2 H^+ + 2e- <->  Hydrochinon2.svg", 0.6992, 2],
["O",0,-1,"O2(g) + 2 H^+ + 2e- <-> H2O2(aq)", 0.7, 2],
["Tl",3,0,"Tl^3+ + 3e- <-> Tl(s)", 0.72, 3],
["Pt",4,2,"PtCl6^2- + 2e- <-> PtCl4^2- + 2 Cl^-",0.726, 2],
["Fe",3,2,"Fe2O3(s) + 6 H^+ + 2e- <-> 2 Fe^2+ + 3 H2O", 0.728, 2],
["Se",4,0,"H2SeO3(aq) + 4 H^+ + 4e- <-> Se(s) + 3 H2O", 0.74, 4],
["Pt",2,0,"PtCl4^2- + 2e- <-> Pt(s) + 4 Cl^-",0.758, 2],
["Fe",3,2,"Fe^3+ + e- <-> Fe^2+",0.77, 1],
["Ag",1,0,"Ag^+ + e- <-> Ag(s)", 0.7996, 1],
["Hg",1,0,"Hg2^2+ + 2e- <-> 2 Hg(l)", 0.8, 2],
["N",5,4,"NO3^-(aq) + 2 H^+ + e- <->  NO2(g) + H2O", 0.8, 1],
["Fe",6,3,"2 FeO4^2- + 5 H2O + 6e- <-> Fe2O3(s) + 10 OH-", 0.81, 6],
["Au",3,0,"[AuBr4]^- + 3e- <-> Au(s) + 4 Br^-",0.85, 3],
["Hg",2,0,"Hg^2+ + 2e- <-> Hg(l)", 0.85, 2],
["Ir",4,3,"[IrCl6]^2- + e- <-> [IrCl6]^3-",0.87, 1],
["Mn",7,6,"MnO4^- +  H^+ + e- <-> HMnO4^-", 0.9, 1],
["Hg",2,1,"2 Hg^2+ + 2e- <-> Hg2^2+", 0.91, 2],
["Pd",2,0,"Pd^2+ + 2e- <-> Pd(s)", 0.915, 2],
["Au",3,0,"[AuCl4]^- + 3e- <-> Au(s) + 4 Cl^-",0.93, 3],
["Mn",4,3,"MnO2(s) + 4 H^+ + e- <-> Mn^3+ + 2 H2O", 0.95, 1],
["N",5,2,"NO3^-(aq) + 4 H^+ + 3e- <->  NO(g) + 2 H2O(l)", 0.958, 3],
["Au",1,0,"[AuBr2]^- + e- <-> Au(s) + 2 Br^-",0.96, 1],
["Fe",8/3,2,"Fe3O4(s) + 8 H^+ + 2e- <-> 3 Fe^2+ + 4 H2O", 0.98, 2],
["Xe",8,6,"[HXeO6]^3- + 2 H2O + 2e- <-> [HXeO4]^- + 4 OH-", 0.99, 2],
["At",1,0,"HAtO +  H^+ + e- <-> At + H2O", 1.0, 1],
["V",5,4,"[VO2]^+(aq) + 2 H^+ + e- <->  [VO]^2+(aq) + H2O", 1, 1],
["Te",6,4,"H6TeO6(aq) + 2 H^+ + 2e- <-> TeO2(s) + 4 H2O", 1.02, 2],
["Br",0,-1,"Br2(l) + 2e- <-> 2 Br^-",1.066, 2],
["Br",0,-1,"Br2(aq) + 2e- <-> 2 Br^-",1.0873, 2],
["Ru",4,2,"RuO2 + 4 H^+ + 2e- <-> Ru^2+(aq) + 2 H2O", 1.120, 2],
["Cu",2,1,"Cu^2+ + 2 CN^- + e- <-> Cu(CN)2^-", 1.12, 1],
["I",5,1,"IO3^- + 5 H^+ + 4e- <-> HIO(aq) + 2 H2O", 1.13, 4],
["Au",1,0,"[AuCl2]^- + e- <-> Au(s) + 2 Cl^-",1.15, 1],
["Se",6,4,"HSeO4^- + 3 H^+ + 2e- <-> H2SeO3(aq) + H2O", 1.15, 2],
["Ag",1,0,"Ag2O(s) + 2 H^+ + 2e- <-> 2 Ag(s) + H2O", 1.17, 2],
["Cl",5,4,"ClO3^- + 2 H^+ + e- <->  ClO2(g) + H2O", 1.18, 1],
["Xe",8,0,"[HXeO6]^3- + 5 H2O + 8e- <-> Xe(g) + 11 OH-", 1.18, 8],
["Pt",2,0,"Pt^2+ + 2e- <-> Pt(s)", 1.188, 2],
["Cl",4,3,"ClO2(g) +  H^+ + e- <-> HClO2(aq)", 1.19, 1],
["I",5,0,"2 IO3^- + 12 H^+ + 10e- <->  I2(s) + 6 H2O", 1.2, 10],
["Cl",7,5,"ClO4^- + 2 H^+ + 2e- <-> ClO3^- + H2O", 1.2, 2],
["Mn",4,2,"MnO2(s) + 4 H^+ + 2e- <-> Mn^2+ + 2 H2O", 1.224, 2],
["O",0,-2,"O2(g) + 4 H^+ + 4e- <-> 2 H2O", 1.229, 4],
//["Ru","[Ru(bipy)3]^3+ + e- <->  [Ru(bipy)3]^2+",1.24, 1],
["Xe",6,0,"[HXeO4]^- + 3 H2O + 6e- <-> Xe(g) + 7 OH-", 1.24, 6],
["Tl",3,1,"Tl^3+ + 2e- <-> Tl^+",1.25, 2], 
["Cr",6,3,"Cr2O7^2- + 14 H^+ + 6e- <-> 2 Cr^3+ + 7 H2O", 1.33, 6],
["Cl",0,-1,"Cl2(g) + 2e- <-> 2 Cl^-",1.36, 2],
["Ru",7,2,"RuO4^-(aq) + 8 H^+ + 5e- <-> Ru^2+(aq) + 4 H2O", 1.368, 5],
["Ru",8,4,"RuO4 + 4 H^+ + 4e- <->  RuO2 + 2 H2O", 1.387, 4],
["Co",4,3,"CoO2(s) + 4 H^+ + e- <-> Co^3+ + 2 H2O", 1.42, 1],
["N",-1,-2,"2 NH3OH^+ +  H^+ + 2e- <->  N2H5^+ + 2 H2O", 1.42, 2], //?
["I",1,0,"2 HIO(aq) + 2 H^+ + 2e- <-> I2(s) + 2 H2O", 1.44, 2],
["Br",5,1,"BrO3^- + 5 H^+ + 4e- <-> HBrO(aq) + 2 H2O", 1.45, 4],
["Pb",4,2,"β-PbO2(s) + 4 H^+ + 2e- <-> Pb^2+ + 2 H2O", 1.46, 2],
["Pb",4,2,"α-PbO2(s) + 4 H^+ + 2e- <-> Pb^2+ + 2 H2O", 1.468, 2],
["Br",5,0,"2 BrO3^- + 12 H^+ + 10e- <-> Br2(l) + 6 H2O", 1.48, 10],
["Cl",5,0,"2 ClO3^- + 12 H^+ + 10e- <-> Cl2(g) + 6 H2O", 1.49, 10],
["Cl",1,-1,"HClO(aq) +  H^+ + 2e- <-> Cl^-(aq) + H2O", 1.49, 2],
["At",5,1,"HAtO3 + 4 H^+ + 4e- <-> HAtO + 2 H2O", 1.5, 4],
["Mn",7,2,"MnO4^- + 8 H^+ + 5e- <-> Mn^2+ + 4 H2O", 1.51, 5],
["O",-1/2,-1,"HO2^• +  H^+ + e- <->  H2O2(aq)", 1.51, 1],
["Au",3,0,"Au^3+ + 3e- <-> Au(s)", 1.52, 3],
["Ru",6,2,"RuO4^2-(aq) + 8 H^+ + 4e- <-> Ru^2+(aq) + 4 H2O", 1.563, 4],
["Ni",4,2,"NiO2(s) + 2 H^+ + 2e- <-> Ni^2+ + 2 OH-", 1.59, 2],
["Ce",4,3,"Ce^4+ + e- <-> Ce^3+",1.61, 1],
["Cl",1,0,"2 HClO(aq) + 2 H^+ + 2e- <-> Cl2(g) + 2 H2O", 1.63, 2],
["Ag",3,1,"Ag2O3(s) + 6 H^+ + 4e- <-> 2 Ag^+ + 3 H2O", 1.67, 4],
["Cl",3,1,"HClO2(aq) + 2 H^+ + 2e- <-> HClO(aq) + H2O", 1.67, 2],
["Pb",4,2,"Pb^4+ + 2e- <-> Pb^2+",1.69, 2],
["Mn",7,4,"MnO4^- + 4 H^+ + 3e- <->  MnO2(s) + 2 H2O", 1.7, 3],
["Ag",2,1,"AgO(s) + 2 H^+ + e- <-> Ag^+ + H2O", 1.77, 1],
["O",-1,-2,"H2O2(aq) + 2 H^+ + 2e- <-> 2 H2O", 1.78, 2],
["Co",3,2,"Co^3+ + e- <-> Co^2+",1.82, 1],
["Au",1,0,"Au^+ + e- <-> Au(s)", 1.83, 1],
["Br",7,5,"BrO4^- + 2 H^+ + 2e- <-> BrO3^- + H2O", 1.85, 2],
["Ag",2,1,"Ag^2+ + e- <-> Ag^+",1.98, 1],
["O",-1,-2,"S2O8^2- + 2e- <-> 2 SO4^2-", 2.01, 2],
["O",0,-2,"O3(g) + 2 H^+ + 2e- <-> O2(g) + H2O", 2.075, 2], // 0,-1,+1 => 0=0, -2
["Mn",6,4,"HMnO4^- + 3 H^+ + 2e- <-> MnO2(s) + 2 H2O", 2.09, 2],
["Xe",6,0,"XeO3(aq) + 6 H^+ + 6e- <-> Xe(g) + 3 H2O", 2.12, 6],
["Xe",8,0,"H4XeO6(aq) + 8 H^+ + 8e- <-> Xe(g) + 6 H2O", 2.18, 8],
["Fe",6,3,"FeO4^2- + 8 H^+ + 3e- <-> Fe^3+ + 4 H2O", 2.2, 3],
["Xe",2,0,"XeF2(aq) + 2 H^+ + 2e- <-> Xe(g) + 2 HF(aq)", 2.32, 2],
["Xe",8,6,"H4XeO6(aq) + 2 H^+ + 2e- <-> XeO3(aq) + 3 H2O", 2.42, 2],
["F",0,-1,"F2(g) + 2e- <-> 2 F^-",2.87, 2],
["F",0,-1,"F2(g) + 2 H^+ + 2e- <-> 2 HF(aq)", 3.05, 2],
["Tb",4,3,"Tb^4+ + e^- <-> Tb^3+", 3.1, 1],
["Pr",4,3,"Pr^4+ + e^- <-> Pr^3+", 3.2, 1],
["Kr",2,0,"KrF2(aq) + 2e- <-> Kr(g) + 2 F^-(aq)", 3.27, 2]
    ];

    static F = 96485; // C/mol, t.e. ŝargo/molo, Farado-konstanto

    /**
     * Kalkulas haketon (identigan sumon) de iu teksto.
     * Ni bezonas tion por distingi la ekvaciojn
     * @param {string} str 
     * @returns 
     */
    static hashCode = function(str) {
            /**
             * Konverti nombron al 16-uma prezento,
             * evitante negativ-signon
             * @param {number} n 
             * @returns 
             */
            function hex(n)
            {
            if (n < 0)
            {
                n = 0xFFFFFFFF + n + 1;
            }
            
            return n.toString(16).toUpperCase();
            }                              

        var hash = 0, i, chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hex(hash).substring(0,6);
    };

    /**
     * Aldonas 16-uman indekson al la areo de reakcioj
     * PLIBONIGU: eble ni transformu ankaŭ al Object anst. Array?
     * sed tiam ni devos verŝajne uzi duan objekton por ne konfuzi...
     */
    static inx() {
        EPot.NET.map((r) => {
            const rx = r[3].replace(/\s[\(\)\[\]^]/g,'');
            if (r.length < 7) { // evitu pluroblan indeksigon!
                r.push(EPot.hashCode(rx));
            };
        });
        return EPot.NET.length;
    }


    /**
     * Redonas reakciojn laŭ element-simbolo, kaj se donita la 
     * prefikso de la indekskampo (voku EPot.inx() unufoje komence!)
     * @param {string} el la elemento de la duonreakcio
     * @param {string} ix la indekso de la duonreakcio (resp. komenco de ĝi)
     * @returns vektoro kun la elementoj [Elemento,ON1,ON2,duonreakcio,norma elektrodtensio, nombro daelektronoj, indekso]
     */
     static reakcioj(el,ix) {
        return EPot.NET.filter((et) => et[0] == el && (!ix || et[6].startsWith(ix)));
    }


    /**
     * Redonas reakcion laŭ element-simbolo, kaj prefikso de la indekskampo 
     * (voku EPot.inx() unufoje komence!). Reagas per escepto, se troviĝas
     * pli ol unu aŭ neniu tia reakcio
     * @param {string} el la elemento de la duonreakcio
     * @param {string} ix la indekso de la duonreakcio (resp. komenco de ĝi)
     * @returns vektoro kun la elementoj [Elemento,ON1,ON2,duonreakcio,norma elektrodtensio, nombro daelektronoj, indekso]
     */
     static reakcio(el,ix) {
        const r = EPot.NET.filter((et) => et[0] == el && (et[6].startsWith(ix)));
        if (!(r || r.length)) throw "Neniu reakcio kun la donita indekso!";
        if (r.length>1) throw "Pli ol unu reakcio kun tiu indeksprefikso!";
        return r[0];
    }    

    /**
     * Redonas liniojn de la la tabelo laŭ elemento (unua kolumno)
     * kaj se donita oksidnombrojn maldekstre kaj dekstre (reduktite)
     * @param {string} el 
     * @param {number} on1 
     * @param {number} on2 
     */
    static reakcioj_on(el,on1,on2) {
        const [ON1,ON2] = (on1<on2)? [on2,on1] : [on1,on2]; // se nur on1 donita ankaŭ estas la dua esprimo!
        return EPot.NET.filter((et) => 
            et[0] == el 
            && (typeof ON1 === 'undefined'? true: et[1] == ON1)
            && (typeof ON2 === 'undefined'? true: et[2] == ON2));
    }

    /**
     * 
     * @param {string} dr la duonreakcio kies datumojn/elektrodtension ni serĉas
     * @returns vektoro kun la elementoj [Elemento,ON1,ON2,duonreakcio,norma elektrodtensio, nombro daelektronoj]
     */
    static net(dr) {
        return EPot.NET.find((et) => et[3] == dr);
    }


    /**
     * Kalkulas la diferncon de Gibs-energio dG0 por paro
     * da oksidiga kaj redoksa duonreakcioj per la formulo dG = -zFdE
     * la diferencon dE de redoksaj tensioj ni ricevos el la supra tabelo,
     * necesas do doni la du duonreakciojn per la identa sintakso.
     * z estas la nombro de interŝanĝitaj elektronoj, F la Farado-konstanto
     * @param {string} oks oksidiga duonreakcio} 
     * @param {string} red redukta duonreakcio} 
     * @param {number} z la nombro de interŝanĝitaj elektronoj
     * 
     * SOLVENDA: 
     * 1. oksidigo / redukto povas okazi en pluraj ŝtuipojh Cu -> Cu+ -> Cu2+,
     * la supre tabelo enhavas nur la unuopajn ŝtupojn, aŭ ni devas kombini la ŝtupojn 
     * programe aŭ necesas transdoni la tutan ĉenon.
     * 2. eble ni havu aldonan indekson (oksidnombro?) en la tabelo por pli facila aliro
     * 3. ĉiuj ekvacioj en la tabelo estas reduktoj, por oksidigo oni devas legi la ekvacion de dekstre maldekstren
     *    eble oni povus aŭtomate eltrovi kiu duono estas la redukto kaj kiu la oksidigo per la E0-valoroj.
     */
    static dG(oks,red,z) {        
        const ro = EPot.net(oks);
        const rr = EPot.net(red);
        const eto = ro[2] * z / ro[3];
        const etr = rr[2] * z / rr[3];
        return -z * EPot.F * (etr - eto);
    }

}
