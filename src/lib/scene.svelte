<script context="module">
  // @ts-nocheck

  import * as THREE from "three";
  import { Water } from "three/addons/objects/Water.js";
  import { Sky } from "three/addons/objects/Sky.js";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  let sun;
  sun = new THREE.Vector3();

  const geometry = new THREE.BoxGeometry();

  const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    metalness: 0.13,
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

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

    if (renderTarget !== undefined) renderTarget.dispose();

    renderTarget = pmremGenerator.fromScene(sky);

    scene.environment = renderTarget.texture;
  };

  const directionalLight = new THREE.DirectionalLight(0x9090aa);
  directionalLight.position.set(-10, 10, -10).normalize();
  scene.add(directionalLight);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemisphereLight.position.set(1, 1, 1);
  scene.add(hemisphereLight);

  let renderer;

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  export const createScene = (canvas_name) => {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas_name,
      alpha: true,
    });
    resize();
    updateSun();
    animate();
  };

  window.addEventListener("resize", resize);
</script>
