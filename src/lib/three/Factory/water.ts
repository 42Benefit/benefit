import * as THREE from "three";
import { Water, type WaterOptions } from "three/examples/jsm/objects/Water.js";

const waterGeometry = new THREE.PlaneGeometry(1000, 1000, 300, 300);
const dynamicPositions = new THREE.Float32BufferAttribute(
waterGeometry.attributes.position.array,
3,
).setUsage(THREE.DynamicDrawUsage);

waterGeometry.setAttribute("position", dynamicPositions);

const waterOptions = {
  textureWidth: 512,
  textureHeight: 512,
  waterNormals: new THREE.TextureLoader().load(
    "/images/waternormals.jpeg",
    function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    },
  ),
  alpha: 1.0,
  sunDirection: new THREE.Vector3(),
  sunColor: 0xffffff,
  waterColor: 0x001e0f,
  distortionScale: 3.7,
  fog: false,
} satisfies WaterOptions;

export const water = new Water(waterGeometry, waterOptions);
water.name = "ocean";
water.rotation.x = -Math.PI / 2;

export const wave = () => {
  water.material.uniforms["time"].value += 1.0 / 60.0;
};

const effectedDistance = 10;
const vector = new THREE.Vector3();
const position = waterGeometry.attributes.position;

export const activeWave = (hitPoint: THREE.Vector3, hitTime: number) => {
  const deltaTime = performance.now() * 0.01;
  if (deltaTime - hitTime > 50) {
    return;
  }
  const height = Math.exp(-((deltaTime - hitTime) * 0.1));
  for (let i = 0; i < position.count; i++) {
    vector.fromBufferAttribute(position, i);
    const distance = vector.distanceTo(hitPoint);
    const wave = Math.cos(deltaTime + distance / 2);
    position.setZ(
      i,
      height * Math.max(effectedDistance - distance / 2, 0) * wave,
    );
  }
  position.needsUpdate = true;
};
