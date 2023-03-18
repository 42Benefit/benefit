<script context="module">
  // @ts-nocheck

  import * as THREE from "three";
  import { Water } from "three/addons/objects/Water.js";
  import { Sky } from "three/addons/objects/Sky.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.set(30, 30, 100);

  let sun;
  sun = new THREE.Vector3();

  const geometry = new THREE.BoxGeometry(30, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    metalness: 0.13,
    roughness: 0,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
  const waterMaterial = {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/waternormals.jpg",
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    alpha: 1.0,
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  };
  const water = new Water(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms["turbidity"].value = 10;
  skyUniforms["rayleigh"].value = 2;
  skyUniforms["mieCoefficient"].value = 0.005;
  skyUniforms["mieDirectionalG"].value = 0.8;

  const updateSun = () => {
    let renderTarget;
    const parameters = {
      elevation: 2,
      azimuth: 180,
    };
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms["sunPosition"].value.copy(sun);
    water.material.uniforms["sunDirection"].value.copy(sun).normalize();
    if (renderTarget !== undefined) {
      renderTarget.dispose();
    }
    renderTarget = pmremGenerator.fromScene(sky);
    scene.environment = renderTarget.texture;
  };

  let renderer;

  const animate = () => {
    const time = performance.now() * 0.001;
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.position.y = Math.sin(time) * 15 + 5;
    water.material.uniforms["time"].value += 1.0 / 60.0;
    renderer.render(scene, camera);
  };

  const resize = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  const controlCamera = () => {
    const controls = new OrbitControls(camera, document.body);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();
  };

  export const createScene = (canvas_name) => {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas_name,
      alpha: true,
    });
    controlCamera();
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    resize();
    updateSun();
    animate();
  };

  window.addEventListener("resize", resize);
</script>
