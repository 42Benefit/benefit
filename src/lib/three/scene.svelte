<script context="module">
  // @ts-nocheck
  // TODO: refactor this code for better readability and performance

  import * as THREE from "three";
  import { WaterFactory } from "./Factory/Water.svelte";
  import { SkyFactory } from "./Factory/Sky.svelte";
  import { CameraFactory } from "./Factory/Camera.svelte";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { LoaderFactory } from "./Factory/Loader.svelte";
  import { SpotLightFactory } from "./Factory/SpotLight.svelte";
  import { SunFactory } from "./Factory/Sun.svelte";
  import { RendererFactory } from "./Factory/Render.svelte";
  import { openModal, closeModal } from "./Util/Modal.svelte";
  import { resize } from "./Util/resize.svelte";

  const scene = new THREE.Scene();
  const camera = CameraFactory();

  const loader = LoaderFactory();
  loader.load(
    "/models/message_in_a_bottle.glb",
    (model) => {
      let object = model.scene;
      object.rotation.x = -Math.PI / 2;
      object.scale.set(22, 22, 22);
      object.name = "message_in_a_bottle";
      scene.add(object);
      document.querySelector(".loading-container").style.display = "none";
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
  const water = WaterFactory(scene);
  scene.add(water);

  const sky = SkyFactory();
  scene.add(sky);

  const renderer = RendererFactory();
  export const sun = new SunFactory(scene, sky, water, new THREE.PMREMGenerator(renderer));
  
  let mouse = new THREE.Vector2();

  const animate = () => {
    const time = performance.now() * 0.001;

    requestAnimationFrame(animate);
    water.material.uniforms["time"].value += 1.0 / 60.0;
    controlCamera();
    resize(renderer, camera);
    renderer.render(scene, camera);
    const position = scene?.getObjectByName("message_in_a_bottle")?.position;
    const rotation = scene?.getObjectByName("message_in_a_bottle")?.rotation;
    if (position) {
      position.y = Math.sin(time) * 4;
    }
    if (rotation) {
      rotation.x = Math.sin(time) * 0.42;
      rotation.z = Math.sin(2 * time) * 0.042;
    }
  };

  const controls = new OrbitControls(camera, document.body);

  const initControls = (controls) => {
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
  export const changeAutoRotate = (input) => {
    controls.autoRotate = input;
  };

  const isMouseOverBenefitsWrapper = (event) => {
    const benefitsWrapper = document.querySelector(".benefits-wrapper");
    const rect = benefitsWrapper.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  };
  // TODO: 추후 이벤트 핸들러 분리
  const onDocumentMouseDown = (event) => {
    let ray = new THREE.Raycaster();
    ray.setFromCamera(mouse, camera);
    let intersects = ray.intersectObjects(scene.children);
    if (
      intersects.length > 0 &&
      intersects[0].object.name === "defaultMaterial_1"
    ) {
      // 병 클릭시
      openModal(sun);
    } else if (isMouseOverBenefitsWrapper(event) === false) {
      // 병 외부 클릭시
      closeModal(sun);
    }
  };

  const spotLight = new SpotLightFactory(scene);
  const onDocumentMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    let ray = new THREE.Raycaster();
    ray.setFromCamera(mouse, camera);
    let intersects = ray.intersectObjects(scene.children);
    if (
      intersects.length > 0 &&
      intersects[0].object.name === "defaultMaterial_1" &&
      isMouseOverBenefitsWrapper(event) === false
    ) {
      document.body.style.cursor = "pointer";
      spotLight.add();
    } else {
      document.body.style.cursor = "auto";
      spotLight.remove();
    }
  };

  export const createScene = () => {
    document.querySelector(".app").append(renderer.domElement);
    resize(renderer, camera);
    sun.darken();
    animate();
  };

  window.addEventListener("resize", resize);
  document.addEventListener("mousemove", onDocumentMouseMove);
  document.addEventListener("mousedown", onDocumentMouseDown);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(sun);
    }
  });
</script>

<style>
  :global(canvas) {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100vw;
		height: 100vh;
  }
</style>