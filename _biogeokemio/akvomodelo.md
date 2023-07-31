---
layout: laborfolio
title: Akvociklo
_chapter: 1.5.1
js:
  - folio-0b
  - sekcio-0b
---


<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>

<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@v0.155.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@v0.155.0/examples/jsm/"
    }
  }
</script>

<div id="cube"></div>

<script>
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 3/2, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 300,200); // window.innerWidth, window.innerHeight );
document.getElementById("cube").appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();

</script>



