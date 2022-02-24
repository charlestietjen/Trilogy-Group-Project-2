import * as THREE from './three.module.js';

// const sceneEl = document.querySelector('#scene');
const globeTex = new THREE.TextureLoader().load('../assets/img/globe/globe.jpg');

let scene, camera, renderer, skyboxGeo, skybox, globeGeo, globe, globeMat;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000
  );
  camera.position.set(1200, -250, 2000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "canvas";
  document.body.appendChild(renderer.domElement);
  const materialArray = createMaterialArray(skyboxImage);
  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  globeGeo = new THREE.SphereGeometry( 15, 32, 16 );
  globeMat = new THREE.MeshBasicMaterial( { map: globeTex });
  globe = new THREE.Mesh(globeGeo, globeMat);
  globe.position.set(1200, -250, 1920);
  scene.add(skybox);
  scene.add(globe);
  animate();
}
function animate() {
  renderer.render(scene, camera);
  globe.rotation.y += 0.001;
  camera.rotation.y -= 0.00005;
  // camera.rotation.z += 0.001;
//   camera.rotation.x += 0.001;
  requestAnimationFrame(animate);
}

function createPathStrings(filename) {
    const basePath = '../assets/img/skybox/';
    const baseFilename = basePath + filename;
    const fileType = ".png";
    const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
    const pathStrings = sides.map(side => {
        return baseFilename + '_' + side + fileType;
    });

    return pathStrings;
}

const skyboxImage = 'space';
function createMaterialArray(filename) {
    const skyboxImagepaths = createPathStrings(filename);
    const materialArray = skyboxImagepaths.map(image => {
        let texture = new THREE.TextureLoader().load(image);

        return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });

    return materialArray;
}

init();