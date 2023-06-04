<script context="module">
  // @ts-nocheck
  import * as THREE from "three";
  import { Water } from "three/examples/jsm/objects/Water.js";
  import Page from "../../../routes/+page.svelte";

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
          const height = 1;
          vector.fromBufferAttribute(position, i);
          const distance = vector.distanceTo(hitPoint);
          const effectedDistance = 10;
          const waveX = 0.2 * Math.sin(vector.x / 3 + deltaTime);
          const waveX2 = 0.42 * Math.sin(vector.x / 5 + deltaTime);
          const waveY = 0.2 * Math.sin(vector.y / 3 + deltaTime);
          const waveY2 = 0.42 * Math.sin(vector.y / 5 + deltaTime);
          const alpha = Math.max(effectedDistance - (distance / 2), 0);
          vector.z = height * alpha * (waveX + waveY + waveX2 + waveY2);
          position.setXYZ(i, vector.x, vector.y, vector.z);
        }
        position.needsUpdate = true;
    };
    
    return water;
  };
</script>
