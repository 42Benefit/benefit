<script context="module" lang="ts">
  // TODO: refactor this code for better readability and performance

  import * as THREE from "three";
  import { WaterFactory } from "./Factory/Water.svelte";
  import { SkyFactory } from "./Factory/Sky.svelte";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import { LoaderFactory } from "./Factory/Loader.svelte";
  import { SunFactory } from "./Factory/Sun.svelte";
  import { openModal, closeModal } from "./Util/Modal.svelte";
  import { resize } from "./Util/resize.svelte";
  import { isMouseOverBenefitsWrapper } from "$lib/three/Util/isMouseOverBenefitsWrapper.svelte";
  import Stats from "three/examples/jsm/libs/stats.module.js";
  import { spotLight } from "./Factory/spotLight"
  import { camera } from "./Factory/camera.js"
  import { renderer } from "./Factory/renderer"

  const stats = new Stats();
  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  const scene = new THREE.Scene();
  const { water, wave, activeWave } = WaterFactory(scene);
  const sky = SkyFactory();
  export const sun = new SunFactory(scene, sky, water, new THREE.PMREMGenerator(renderer));

  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let hitPoint = new THREE.Vector3();
  let hitTime = performance.now() * 0.01;

  const loader = LoaderFactory();
  const controls = new OrbitControls(camera, renderer.domElement);

  let bottle: THREE.Object3D;
  loader.load(
    "/models/message_in_a_bottle.glb",
    (model) => {
      bottle = model.scene.children[0].children[0];
      bottle.rotation.x = -Math.PI / 2;
      bottle.scale.setScalar(22);
      bottle.name = "message_in_a_bottle";
      scene.add(bottle);
      scene.add(spotLight);
      document.querySelector(".loading-container").style.display = "none";
      document.addEventListener("mousemove", highlightBottle);
      document.addEventListener("mousedown", toggleBottleModal);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  scene.add(water);
  scene.add(sky);

  const animate = () => {
    stats.update();
    const time = performance.now() * 0.001;

    requestAnimationFrame(animate);
    wave();
    activeWave(hitPoint, hitTime);
    controlCamera();
    renderer.render(scene, camera);

    if (!bottle) {
      return;
    }
    bottle.position.y = Math.sin(time) * 4;
    bottle.rotation.x = Math.sin(time) * 0.42;
    bottle.rotation.z = Math.sin(2 * time) * 0.042;
  };

  const initControls = (controls: OrbitControls) => {
    controls.target.set(0, 10, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.42;
    controls.dispose();
  };
  initControls(controls);


  const controlCamera = () => {
    controls.update();
  };

  /**
   * @summary - change autoRotate to parameter `input` , which is used to rotate camera automatically
   * @param bool {boolean} - true: rotate camera automatically, false: stop rotating camera automatically
   */
  export const changeAutoRotate = (input: boolean) => {
    controls.autoRotate = input;
  };

  const createRipple = () => {
    const intersect = raycaster.intersectObject(water)[0];
    if (!intersect?.uv) return;

    const parameters = (water.geometry as THREE.PlaneGeometry).parameters;
    hitPoint.x = parameters.width * (intersect.uv.x - 0.5);
    hitPoint.y = parameters.height * (intersect.uv.y - 0.5);
    hitTime = performance.now() * 0.01;
  };

  // TODO: 추후 이벤트 핸들러 분리
  const toggleBottleModal = (event: MouseEvent) => {
    const bottleIntersect = raycaster.intersectObject(bottle);
    if (bottleIntersect.length !== 0) {
      openModal(sun);
    } else if (isMouseOverBenefitsWrapper(event) === false) {
      closeModal(sun);
    }
  };


  const onDocumentMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  };

  const highlightBottle = (event: MouseEvent) => {
    const intersect = raycaster.intersectObject(bottle)[0];
    if (intersect) {
      if (isMouseOverBenefitsWrapper(event) === false) {
        document.body.style.cursor = "pointer";
        spotLight.visible = true;
      }
    } else {
      document.body.style.cursor = "auto";
      spotLight.visible = false;
    }
  };

  export const createScene = () => {
    document.querySelector(".app")!.append(renderer.domElement);
    resize(renderer, camera);
    // sun.darken();
    sun.lighten();
    animate();
  };

  window.addEventListener("resize", ()=>{resize(renderer, camera)});
  document.addEventListener("mousemove", onDocumentMouseMove);
  document.addEventListener("mousedown", createRipple);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(sun);
    }
  });
</script>
