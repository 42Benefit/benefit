<script context="module">
  // @ts-nocheck
  import * as THREE from "three";
  import { Water } from "three/examples/jsm/objects/Water.js";

  export const WaterFactory = (scene) => {
    const waterGeometry = new THREE.PlaneGeometry(50, 50, 100, 100);
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
    water.name = "ocean"
    water.rotation.x = -Math.PI / 2;

    water.wave = () => {
      water.material.uniforms["time"].value += 1.0 / 60.0;
    };
    
    water.activeWave = (hitPoint) => {
      const deltaTime = performance.now() * 0.01;
      const position = water.geometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
          const vector = new THREE.Vector3();
          const height = 0.5;
          vector.fromBufferAttribute(position, i);
          const distance = vector.distanceTo(hitPoint);
          const effectedDistance = 6;
          const wave = Math.cos(deltaTime + distance / 2);
          vector.z = height * Math.max(effectedDistance - (distance / 2), 0) * wave;
          position.setXYZ(i, vector.x, vector.y, vector.z);
        }
        position.needsUpdate = true;
    };
    
    return water;
  };
</script>
