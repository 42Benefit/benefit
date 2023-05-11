<script context="module">
  // @ts-nocheck
  import * as THREE from "three";
  import { Water } from "three/examples/jsm/objects/Water.js";

  export const WaterFactory = (scene) => {
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
    
    return water;
  };
</script>
