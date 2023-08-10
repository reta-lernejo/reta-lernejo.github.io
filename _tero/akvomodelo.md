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

kamerao.position.set( -100, 100, 100);
orbito.update();

//kamerao.position.y = 0.4;
sceno.add( kamerao );

//############### modelo


function ebeno(y, koloro = 0xff0000) {

    const geometrio = new THREE.BufferGeometry();
    let ind = [], vert = new Float32Array(3*4); // po tri koordinatoj

    const v = new Float32Array([
        -1.0, y,  1.0,
         1.0, y,  1.0,
         1.0, y, -1.0,
        -1.0, y, -1.0]);

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

// krado
ebeno(-0.9, 0x754515);
ebeno(-0.5, 0x2757a3);
ebeno(0.1, 0x3ba617);

const dratoj = new THREE.LineBasicMaterial( {
	color: 0xffffff,
	linewidth: 0.1,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
} );


/* por testi... 
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
sceno.add( cube );
 .................. */

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