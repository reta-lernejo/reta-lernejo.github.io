---
layout: laborfolio
title: Akvomodelo
js:
  - folio-0b
  - sekcio-0b
---

<div id="akvomodelo"></div>

<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>

<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.155.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.155.0/examples/jsm/"
    }
  }
</script>

<script type="module">

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const LARĜO = 600;
const ALTO = 500;
const DEBUG = false;


//############### sceno + kamerao
const bildigo = new THREE.WebGLRenderer();
bildigo.setSize( LARĜO, ALTO );
document.getElementById('akvomodelo').appendChild( bildigo.domElement );

const sceno = new THREE.Scene();
const rigardo = 1.5; // -/+-koordinato por la larĝo de ortografia kamerao, estu pli granda ol 1.0!
const kamerao = new THREE.OrthographicCamera( -rigardo, rigardo, rigardo, -rigardo, 1, 1000 );
const orbito = new OrbitControls( kamerao, bildigo.domElement );
//const kamerao = new THREE.OrthographicCamera( LARĜO/- 2, LARĜO/2, ALTO/2, ALTO/- 2, 1, 1000 );

//const kamerao = new THREE.PerspectiveCamera( 25, LARĜO / ALTO, 0.1, 1000 );

kamerao.position.set( -100, 20, 100);
orbito.update();

//kamerao.position.y = 0.4;
sceno.add( kamerao );


//kp https://chriscourses.com/blog/a-comprehensive-guide-to-materials-in-threejs
/*
const lumo = new THREE.AmbientLight( 0x404040 ); // soft white light
sceno.add( lumo );
*/

const direktlumo = new THREE.DirectionalLight(0xfcffe0, 9.9);
direktlumo.position.z = 30;
direktlumo.position.y = 10;
sceno.add(direktlumo);


//############### modelo


function ebeno(y, koloro = 0xff0000, dy = 0) {

    const geometrio = new THREE.BufferGeometry();
    let ind = [], vert = new Float32Array(3*4); // po tri koordinatoj

    const v = new Float32Array([
        -1.0, y-dy,  1.0,
         1.0, y,  1.0,
         1.0, y, -1.0,
        -1.0, y-dy, -1.0]);

    const i = [
        0, 1, 2,
        0, 2, 3
    ];

    geometrio.setIndex( i );
    geometrio.setAttribute( 'position', new THREE.BufferAttribute( v, 3 ) );

    const materialo = new THREE.MeshBasicMaterial( { color: koloro} );
    materialo.side = THREE.DoubleSide;
    const krado = new THREE.Mesh( geometrio, materialo); // dratoj|materialo );

    sceno.add(krado);
}

/**
 * y: ses malkreskantaj y-koordinatoj laŭ zigzaga linio: supre angulo - supra mezo - flanko meznivela - mezo meznivela - malsupra angulo - malsupra mezo
 **/
function supro(y, koloro = 0xff0000) {

    const geometrio = new THREE.BufferGeometry();
    let ind = [], vert = new Float32Array(3*4); // po tri koordinatoj

    // verticoj: terenprofilo rigardata de la flanko kun 
    // deklivo grimpanta maldekstre dekstren
    const v = new Float32Array([
        // antaŭa profilflanko
        -1.0, y[4],  1.0,
         0.0, y[2],  1.0,
         1.0, y[0],  1.0,
        // valo
        -1.0, y[5],  0.0,
        -0.5, y[3],  0.0,
         1.0, y[1],  0.0,
        // malantaŭa profilflanko
        -1.0, y[4], -1.0,
         0.0, y[2], -1.0,
         1.0, y[0], -1.0]);

    const i = [
        // antaŭa malsupra (maldekstra) angulo
        0, 1, 4,
        4, 3, 0,
        // antaŭa supra (dekstra) angulo
        1, 2, 5,
        5, 4, 1 ,
        // malantaŭa malsupra angulo
        3, 4, 6,
        6, 4, 7,
        // malantaŭa supra angulo
        4, 5, 7,
        7, 5, 8
    ];

    geometrio.setIndex( i );
    geometrio.setAttribute( 'position', new THREE.BufferAttribute( v, 3 ) );
    geometrio.computeVertexNormals();

    //const materialo = new THREE.MeshStandardMaterial( { color: koloro} );
    // kp https://sbcode.net/threejs/meshlambertmaterial/
    const materialo = new THREE.MeshLambertMaterial({ color: koloro} );
    //materialo.color.setHex(koloro);

    materialo.side = THREE.DoubleSide;
    if (DEBUG) materialo.wireframe = true;
    const krado = new THREE.Mesh( geometrio, materialo ); //materialo); // dratoj|materialo );

    sceno.add(krado);
    
/*
    if (DEBUG) {
        // por sencimigo montru ankaŭ la eĝojn
        const dgeo = new THREE.EdgesGeometry( geometrio ); // or WireframeGeometry( geometry )
        //const dmat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
        const dmat = new THREE.LineDashedMaterial( {
            color: 0xffffff,
            linewidth: 2,
            scale: 1,
            dashSize: 3,
            gapSize: 4,
        } );
        const drat = new THREE.LineSegments( dgeo, dmat );
        sceno.add( drat );
    }
    */
}

// krado
ebeno(-0.9, 0x754515, 0.1);
ebeno(-0.5, 0x2757a3, 0.2);
supro([1.0, 0.7, 0.65, 0.3, 0.4, 0.25], 0x3ba617);



function animate() {
	requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	// required if orbito.enableDamping or orbito.autoRotate are set to true
	// orbito.update();

	bildigo.render( sceno, kamerao );
}
animate();

</script>