<script context="module">
  // @ts-nocheck
  import * as THREE from "three";

  export class SpotLightFactory {
    constructor(scene) {
      this.scene = scene;
      this.spotLight = new THREE.SpotLight(0xffffff, 42);
      this.turnOn = false;
      this.spotLight.position.set(0, 42, -10);
      this.spotLight.castShadow = true;
    }

    remove() {
      if (this.turnOn === true) {
        this.scene.remove(this.spotLight);
        this.turnOn = false;
      }
    }

    add() {
      if (this.turnOn === false) {
        this.scene.add(this.spotLight);
        this.turnOn = true;
      }
    }
  }
</script>
