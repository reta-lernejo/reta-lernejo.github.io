
/**
 * Sendas mesaĝojn por la konzolo al areo en la retpaĝo. Tio okazas nur en WebKit,
 * ĉar tie estas malfacile sencimigi, aparte en iOS (en FF kaj Kromio oni havas programistajn helpilojn)
 * Por atingi tion ni simple anstataŭigas la normalan objekton 'console' kun la funkcioj console.log ktp. 
 * per nia propra.
 */

function dom_console() {
  if (navigator.userAgent.indexOf("AppleWebKit") > -1) {
    const cns = document.getElementById("console");
    if (cns) {
        cns.style.display = ''; // forigu  display: 'none';
        sys_console = console;
        console = new Object();
        console.log = function(str) {
            sys_console.log(str);
            const c = document.getElementById("console");
            if (c) {
            const tn = document.createTextNode(str);
            const br = document.createElement("br");
            c.append(tn,br);
            }
        }
        console.trace = console.log;
        console.debug = console.log;
        console.info = console.log;
        console.warn = console.log;
        console.error = console.log;
        console.log(navigator.userAgent);
        console.log(navigator.platform);
        console.log(navigator.vendor);
        window.onerror = function(message,source,line) {
            console.log("@"+source+"."+line);
            console.log(">> "+message);
        }
    }
  }
}