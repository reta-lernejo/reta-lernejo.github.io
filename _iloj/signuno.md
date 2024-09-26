---
layout: laborfolio
title: Signolingvo - provo
js-ext:
    - sign
---

<script src="https://unpkg.com/@sutton-signwriting/core@1.6.0"></script>
<script src="https://unpkg.com/@sutton-signwriting/core@1.6.0/fsw/fsw.js"></script>
<script src="https://unpkg.com/@sutton-signwriting/font-ttf@1.5.2"></script>

<style>
    @font-face {
    font-family: "SuttonSignWritingLine";
    src: 
        local('SuttonSignWritingLine'),
        url('https://unpkg.com/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingLine.ttf') format('truetype');
    }
    @font-face {
    font-family: "SuttonSignWritingFill";
    src: 
        local('SuttonSignWritingFill'),
        url('https://unpkg.com/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingFill.ttf') format('truetype');
    }
    @font-face {
    font-family: "SuttonSignWritingOneD";
    src: 
        local('SuttonSignWritingOneD'),
        url('https://unpkg.com/@sutton-signwriting/font-ttf@1.0.0/font/SuttonSignWritingOneD.ttf') format('truetype');
    }

    dl {
        columns: 2;
        border-left: 2px dotted black;
        column-rule: 2px dotted black;        
    }

    dt {
        font-size: xx-large;
        border-top: 1px dotted silver;
        padding-left: 1em;
    }

    dd {
        break-before: avoid;
        text-align: center;
    }

    dd span {
        display: none;
    }

    td:first-of-type {
        font-size: xx-large;
        text-align: right;
    }

    td:nth-of-type(2) {
        text-align: center;
    }

    td:nth-of-type(2) span {
        display: none;
    }

</style>

<script>
    function desegnu_gestojn() {
        document.querySelectorAll("table,dl").forEach((container) => {
            container.querySelectorAll("td,dd").forEach((td) => {
                const gesto = td.textContent;
                if (gesto.match(/^M\d{3}/)) {
                    td.setAttribute("data-sgn",gesto);
                    td.innerHTML = ssw.ttf.fsw.signSvg(gesto);
                } else if (gesto.match(/^S\d{3}/)) {
                    td.setAttribute("data-sgn",gesto);
                    td.innerHTML = ssw.ttf.fsw.symbolSvg(gesto);
                }
            });
        });
    }


    window.onload = () => {
        desegnu_gestojn();
    }
</script>

O
: M531x571S34400482x483S10050511x541S26500517x526

große 
: M574x585S14c48469x542S14c40506x541S28a0a538x547S2fb04491x579S28a12426x547S35d04452x482S34400482x482S36100512x482

Lieb, 
: M521x565S15d01480x542S36d00479x522S20500484x528S15d09475x541S31600483x482S34010493x504

\- 
: S38700463x496 

o
: M531x571S34400482x483S10050511x541S26500517x526

Lieb
: M521x565S15d01480x542S36d00479x522S20500484x528S15d09475x541S31600483x482S34010493x504

ohn alle Maße, 
: M563x612S10002491x544S1000a463x553S33b00468x483S34800438x483S2eb4c478x576S2eb00502x564S34700497x483S35d04527x482S2fb04499x606

\- 
: S38700463x496

die dich
: M546x555S35d00467x482S34600496x482S30c00467x482S30c00496x482S10050529x525S26500532x509 

gebracht auf
: M527x533S26500507x496S26510479x496S15d3a476x514S15d31504x467S15d32496x514S15d39474x467 

diese
: M530x521S15a32503x509S26500513x490S36d00479x480 

Marter- 
: M562x607S35c00437x482S34c00467x482S34800498x482S35d00526x482S20e00471x545S2fc04481x596S1f551513x528S1f559447x526S2eb04497x561S2eb48465x560S20e00497x545

-straße,
: M578x582S34500422x483S35d00453x483S35d04484x482S34c00512x481S36100542x482S15d40515x555S15d48468x555S26500513x532S26510474x532

\- 
: S38700463x496

ich 
: M528x565S35000482x482S30c00482x482S10043498x530S20500492x554 

lebte mit
: M548x594S2e518457x533S34700481x483S35000512x484S1f540512x570S1f548461x569S2e508507x533S35c00452x482S2fb00486x527

der Welt 
: M562x615S10e50496x585S10e58476x585S10e30495x531S10e38476x532S2d506513x562S2d51e452x564S20500487x566S36500438x482S34700468x482S35c00498x483S35d00526x484

in Lust
: M560x597S34c00439x483S35d00468x483S34400496x482S33b00524x482S1ce10496x518S1ce18469x532S2eb04501x551S2eb40476x565S2fb04498x590

und Freuden,
: M563x583S31400482x483S2ea18502x526S2ea00539x527S15d0a492x564S15d02536x563S2fb04521x555 

\- 
: S38700463x496

und du
: M531x571S34400482x483S10050511x541S26500517x526 

musst
: M574x589S36100512x482S10010556x498S10040559x559S22a04558x535S2f900557x557S33b00453x483S34600483x482

leiden. 
: M562x607S35c00437x482S34c00467x482S34800498x482S35d00526x482S20e00471x545S2fc04481x596S1f551513x528S1f559447x526S2eb04497x561S2eb48465x560S20e00497x545 

\= 
: S38800464x496
