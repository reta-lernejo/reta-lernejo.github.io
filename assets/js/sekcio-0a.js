/**
 * subtenas faledeblajn sekciojn en laborfiloj
 * marku ilin per klaso sub la titoloj
 * {: .sekcio}
 * kaj voku tiel:
 *   window.onload = () => {
 *      Sekcio.aranĝo()
 *      // ... aliaj faraĵoj en via laborfolioj
 *   }
 */

class Sekcio {
    static aranĝo() {
        for (const s_titolo of document.querySelectorAll(".sekcio")) {
            const titolo = document.createTextNode(s_titolo.textContent);
            const details = document.createElement("details");
            details.id = s_titolo.id
            details.classList.add("sekcio")
            const summary = document.createElement("summary");
            summary.setAttribute("markdown","span");
            summary.append(titolo);
            details.append(summary);

            // aldonu ĉiujn sekvantajn p-elementojn
            let sekva = s_titolo.nextElementSibling;

            while (sekva 
                && !sekva.classList.contains("sekcio")
                && sekva.tagName[0].toLowerCase() != 'h') 
            {                
                details.append(sekva); // tio ankaŭ forigos ilin el la dokumento...
                sekva = s_titolo.nextElementSibling;
            }

            // anstataŭigu  malnovan titolon per la nova sekcio
            s_titolo.parentElement.replaceChild(details,s_titolo);
        }

        // kiam ni klakas ligon al unu el la sekcioj, la celata sekcio devos malfermiĝi
        // Ni limigas al "p a", por eviti "svg a"-elementojn, bedaŭrinde
        // querySelector ne subtenas elekton de nomspaco per sintakso "html|a"
        for (const a of document.querySelectorAll("p a")) {
            a.addEventListener("click", (event) => {
                const ct = event.currentTarget;
                const href = ct.getAttribute("href");
                if (href[0] == '#')
                    Sekcio.malfermu(href.substring(1));
            });
        }
        
    }

    static malfermu(s_id,fermu_aliajn) {
        const sekcio = document.getElementById(s_id);
        for (const d of document.querySelectorAll(".sekcio")) {
          //  malfermu la celitan...
          if (d.id == s_id) {
              d.setAttribute("open","open");
          } else if (fermu_aliajn) {
            // fermu aliajn sekciojn 
              d.removeAttribute("open");
          }
        }
    }
}

