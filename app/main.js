import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const sceen = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector( '#background' ),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(sceen, camera);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,50,50);

const ambientLight = new THREE.AmbientLight(0xffffff)

sceen.add(pointLight, ambientLight);
/*
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
sceen.add(lightHelper, gridHelper);
*/

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24 ,24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  sceen.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
sceen.background = spaceTexture;

const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('earthNormalMap.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    //normalMap: earthNormalTexture
  })
);

sceen.add(earth);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moonNormalMap = new THREE.TextureLoader().load('moonNormalMap.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 10, 10),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalMap
  })
);

moon.position.set(5, 10, 10);

sceen.add(moon);

const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 55, 55),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);

sun.position.set(20, 50, 50);

sceen.add(sun);

function animate() {
  requestAnimationFrame( animate );

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.0005;
  moon.rotation.z += 0.001;
  
  earth.rotation.y += 0.005;

  sun.rotation.y += 0.001;
  sun.rotation.x += 0.001;

  controls.update();

  renderer.render( sceen, camera);
}

animate();