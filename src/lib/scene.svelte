<script context="module">
  // @ts-nocheck

  import * as THREE from "three";
  import { Water } from "three/addons/objects/Water.js";
  import { Sky } from "three/addons/objects/Sky.js";
  import { OrbitControls } from "three/addons/controls/OrbitControls.js";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.set(30, 30, 100);

  const loader = new GLTFLoader();
  loader.load(
    "/models/message_in_a_bottle.glb",
    (gltf) => {
      let object = gltf.scene;
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

  const waterGeometry = new THREE.PlaneGeometry(5000, 5000);
  const waterMaterial = {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "/images/waternormals.jpeg",
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

  let sun;
  sun = new THREE.Vector3();
  const updateSun = (elevation, azimuth) => {
    let renderTarget;
    const parameters = {
      elevation,
      azimuth,
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
  let mouse = new THREE.Vector2();

  const animate = () => {
    const time = performance.now() * 0.001;

    requestAnimationFrame(animate);
    water.material.uniforms["time"].value += 1.0 / 60.0;
    controlCamera();
    renderer.render(scene, camera);
    const position = scene?.getObjectByName("message_in_a_bottle")?.position;
    if (position) {
      position.y = Math.sin(time) * 2;
    }
  };

  const resize = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  const controlCamera = () => {
    const controls = new OrbitControls(camera, document.body);
    controls.target.set(0, 10, 0);
    controls.autoRotate = true;
    controls.dispose();
    controls.update();
  };
  
  const isMouseOverBenefitsWrapper = (event) => {
    const benefitsWrapper = document.querySelector(".benefits_wrapper");
    const rect = benefitsWrapper.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  };

  const onDocumentMouseDown = (event) => {

    event.preventDefault();
    let ray = new THREE.Raycaster();
    ray.setFromCamera(mouse, camera);
    let intersects = ray.intersectObjects(scene.children);
    if (
      intersects.length > 0 &&
      intersects[0].object.name === "defaultMaterial_1"
    ) {
      // 병 클릭시
      updateSun(1, -142);
      document.querySelector(".benefits_wrapper").style.display = "block";
    } else if(isMouseOverBenefitsWrapper(event) === false){
      // 병 외부 클릭시
      updateSun(12, -142);
      document.querySelector(".benefits_wrapper").style.display = "none";
    }
    else {
      updateSun(12, -142);
    }
  };

  const onDocumentMouseMove = (event) => {
    event.preventDefault();
    mouse.x = ((event.clientX) / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY) / window.innerHeight) * 2 + 1;
    let ray = new THREE.Raycaster();
    ray.setFromCamera(mouse, camera);
    let intersects = ray.intersectObjects(scene.children);
    if (
      intersects.length > 0 &&
      intersects[0].object.name === "defaultMaterial_1" &&
      isMouseOverBenefitsWrapper(event) === false
    ) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  };

  // TODO: 여행가는 느낌이 가게 앞으로 가는 느낌으로 수정
  // TODO: 밤에는 달이 보이게 하기 idea
  export const createScene = (canvas_name) => {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas_name,
      alpha: true,
    });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    resize();
    updateSun(1, -142);
    animate();
  };
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onDocumentMouseMove);
  window.addEventListener("mousedown", onDocumentMouseDown);
</script>
