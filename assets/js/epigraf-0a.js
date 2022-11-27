const epigrafoj = [
    "Tiuj metalflugiluloj skuas la planedon sen vere kompreni ĝin, grak-grak-grak!",
    "La ŝtonnestuloj eĉ kredas, ke nin plenekstermis kometo, grak-grak-grak.",
    "Certe vi ne flugos per tiuj pezaj klapoj kun ŝtonaj plumoj sur viaj nestoj! grak-grak-grak!",
    "Per poŝkalkulilo vi povas elkalkuli viajn ŝuldojn, grak-grak! Do havigu al vi poŝaklkulilon pri naturo! grak-grak!",
    "Koniĝas birdo laŭ flugo kaj brakulo laŭ fiago.",
    "Inter klerikoj ja konvenas predikoj. |Prover B.",
    "Ne naskas porko leonidon, nek korniko aglidon. Stultaĵo de katkunuloj!",
    //"Nigran kornikon sapo ne blankigos. Ĉu neniam vidis pigon, grak-grak? Kaj kio estas sapo?",
    "Korvo al korvo okulon ne pikas, sed kotonplumuloj okulon pro okulo elgratas!",
    "Birdo kantas laŭ sia beko. Mi amas nigrajn kantojn.",
    "42? Ne, 21: montkornikoj, arbopigoj, funebropigoj, verpigoj, rakedopigoj, nigraj korvoj, verkornikoj, vergaroloj, verdpigoj, blupigoj, ruĝbekpigoj, fatgaroloj, blugaroloj, blukorvoj, nudbekgaroloj, arbustgaroloj, krestgaroloj, akacigaroloj, silkgaroloj, grundogaroloj, nuksrompuloj",
    "Korniko vundita propran voston timas. Senplumuloj senvostaj sensencaĵojn rimas.|Ludo Viko, la korniko",
    "Birdo petolas, kiom ĝi volas. Homo petrolas ĝis maroj bolas, grak-grak!|Ludo Viko, la korniko"
];

function epigrafo() {
    const monato = new Date().getMonth();
    return epigrafoj[monato].split("|");
}
