<script context="module">
  // @ts-nocheck
  import * as THREE from "three";
  import { Water } from "three/examples/jsm/objects/Water.js";

  export const WaterFactory = (scene) => {
    const waterGeometry = new THREE.PlaneGeometry(50, 50, 1024, 1024);
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
    
    water.activeWave = () => {
      const startTime = performance.now() * 0.001;
      const limitTime = startTime + 10;
      let deltaTime = startTime;
      const position = water.geometry.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const vector = new THREE.Vector3();
        const adjustment = (vector.x)
        vector.fromBufferAttribute(position, i);
        const waveX = 0.42 * Math.sin(vector.x + deltaTime);
        const waveY = 0.42 * Math.sin(vector.y + deltaTime);
        vector.z = adjustment * (waveX + waveY)
        position.setXYZ(i, vector.x, vector.y, vector.z);
      }
      position.needsUpdate = true;
    };
    
    return water;
  };
</script>
