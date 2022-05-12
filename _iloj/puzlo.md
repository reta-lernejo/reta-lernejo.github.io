---
layout: laborfolio
title: Puzlokreilo
js:
    - svg-0b
    - puzlo-0a
---

<!-- 

- travidebligi la fonon per masko: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask 
- montri fonon kiel bildo/ornamo: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern
                                https://vanseodesign.com/web-design/svg-pattern-attributes/
-->

<script type="text/javascript">
    // adaptita el https://gist.github.com/Draradech/35d36347312ca6d0887aa7d55f366e30

    function save(filename, data)
    {
        var blob = new Blob([data], {type: "text/csv"});
        if (window.navigator.msSaveOrOpenBlob)
        {
            window.navigator.msSaveBlob(blob, filename);
        }
        else
        {
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
    }

    var seed = 1;
    
    // konciza aliro de elemento per @id
    function $(id) { return document.getElementById(id); }

    // aktualigo de la kontrolelementoj
    function updateseed()     { $("_seed").value =    $("seed").value;          update(); }
    function updatetabsize()  { $("_tabsize").value = $("tabsize").value + "%"; update(); }
    function updatejitter()   { $("_jitter").value =  $("jitter").value + "%";  update(); }
    function update_seed() { 
        var val = parseFloat($("_seed").value);    
        if (!isNaN(val)) { 
            $("seed").value = val;
        }    
        updateseed(); 
    }
    function update_tabsize() { 
        var val = parseFloat($("_tabsize").value); 
        if (!isNaN(val)) { 
            $("tabsize").value = val; 
        } 
        updatetabsize(); 
    }
    function update_jitter()  { 
        var val = parseFloat($("_jitter").value);  
        if (!isNaN(val)) { 
            $("jitter").value = val; 
        }  
        updatejitter(); 
    }
    
    // generilo-parametroj / -funkcioj $

    // variabloj estas difinitaj antaŭe en generate(9 resp. parse_input()
    /*
      tabsize = langetograndeco (tabsize)
      jitter = varieco (jitter)
      xn = # pecoj horizontale
      yn = # pecoj vertikale
    */
    //var a, b, c, d, e, t, j, flip, xi, yi, xn, yn, vertical, offset, width, height, radius;
    
    function parse_input()
    {
        seed = parseInt($("seed").value);
        tabsize = parseFloat($("tabsize").value);
        jitter = parseFloat($("jitter").value);
        xn = parseInt($("xn").value);
        yn = parseInt($("yn").value);
    }

    function parse_urlparams() {
        const params = new URLSearchParams(window.location.search);
        let update = false;

        function param(name) {
            const val = params.get(name); 
            if (val) { $(name).value = val;
                update = true;
            }
        }

        for (let name of ["xn","yn","seed","tabsize","jitter","bgimg","width","height","radius"])
            param(name);

        return update;
    }

    function update() {
        width = parseInt($("width").value);
        height = parseInt($("height").value);
        radius = parseFloat($("radius").value);
        var ratio = 1.0 * width / height;
        if (ratio > 1.5)
        {
            radius = radius * 900 / width;
            width = 900;
            height = width / ratio;
        } else {
            radius = radius * 600 / height;
            height = 600;
            width = height * ratio;
        }
        offset = 5.5;

        parse_input();

        new SVGPuzlo("puzzlecontainer", $("bgimg").value,
            seed,tabsize,jitter,
            xn,yn,width,height,offset,radius);
    }

/*
    // helpfunkcioj
    function metu(kampo,valoro) {
        document.getElementById(kampo).textContent = valoro;
    }

    function valoro(kampo) {
        return parseInt(document.getElementById(kampo).value,10);
    }
    */

    window.onload = () => {
        // preparu semon
        $('seed').value = Math.random() * 10000; 
        updateseed();
        if (parse_urlparams()) {
            update()
        }
    }

</script>


{::options parse_block_html="true" /}

<details style="border-top: 1px dotted black">
  <summary markdown="span">Agordo</summary>

   <table>
      <tr>
         <td>Semo:</td>
         <td><input id="_seed" type="text" value="0" onchange="update_seed()"/></td>
         <td><input id="seed" type="range" value="0" min="0" max="9999" step="1" onchange="updateseed()"/></td>
      </tr>
      <tr>
         <td>Langograndeco:</td>
         <td><input id="_tabsize" type="text" value="20%" onchange="update_tabsize()"/></td>
         <td><input id="tabsize" type="range" value="20" min="10" max="30" step="0.1" onchange="updatetabsize()"/></td>
      </tr>
      <tr>
         <td>Varieco:</td>
         <td><input id="_jitter" type="text" value="4%" onchange="update_jitter()"/></td>
         <td><input id="jitter" type="range" value="4" min="0" max="13" step="0.1" onchange="updatejitter()"/></td>
      </tr>
      <tr>
         <td>Angulradiuso:</td>
         <td><input id="radius" type="text" value="2.0" size="4" onchange="update()"/></td>
         <td></td>
      </tr>
      <tr>
         <td>Pecoj:</td>
         <td><input id="xn" type="text" value="6" size="4" onchange="update()"/> x <input id="yn" type="text" value="4"  size="4" onchange="update()"/></td>
         <td></td>
      </tr>
      <tr>
         <td>Formato:</td>
         <td><input id="width" type="text" value="300" size="4" onchange="update()"/> x <input id="height" type="text" value="200"  size="4" onchange="update()"/></td>
      </tr>
      <tr>
        <td>Fonbildo:</td>
        <td><input id="bgimg" type="text" value="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Nitrogen_Cycle-eo.svg/1024px-Nitrogen_Cycle-eo.svg.png" onchange="update()"/></td>
        <!--  <td><button onclick="generate()">Elŝuto de SVG</button></td> -->
      </tr>
   </table>
</details>

<svg id="puzzlecontainer">

 version="1.1" 
    id="puzzlecontainer"
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    class="kartezia"
    width="600" height="400" 
    viewBox="0 0 1.0 1.0">        
     
    <style type="text/css">
    <![CDATA[

        #puzzlecontainer {
            /*width: 94vw;*/
            position: relative;
            left: calc(-50vw + 20px + 50%);
        }

        #tablo {
            stroke: none;
            fill: Gainsboro;
        }

        #fono {
            stroke: none;
            fill: LightBlue;
        }

        .puzlero {
            stroke: #444;
            stroke-width: 1;
            /*            
            stroke-opacity: 0.8
            stroke-dasharray: 5,1;
            fill: none; 
            */
        }

        .puzlero:hover {
            stroke-width: 3;
            stroke: #822;
        }

        .puzlero.elektita {
            stroke-width: 3;
            stroke: #C44;
            stroke-dasharray: 2,2;
        }

    ]]>
  </style>   
  <g id="puzleroj"></g>
</svg>
