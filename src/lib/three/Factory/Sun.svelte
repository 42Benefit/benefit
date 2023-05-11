<script context="module">
  // @ts-nocheck
  import * as THREE from "three";

  export class SunFactory {
    constructor(scene, sky, water, pmremGenerator) {
      this.scene = scene;
      this.sky = sky;
      this.water = water;
      this.sun = new THREE.Vector3();
	  this.pmremGenerator = pmremGenerator;

      this.sun.setFromSphericalCoords(
        1,
        Math.PI / 2 - 0.042,
        -Math.PI / 2 + 0.042
      );
      this.sky.material.uniforms["sunPosition"].value.copy(this.sun);
      this.water.material.uniforms["sunDirection"].value
        .copy(this.sun)
        .normalize();
    }

    update(elevation, azimuth) {
      let renderTarget;
      const parameters = {
        elevation,
        azimuth,
      };
      const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
      const theta = THREE.MathUtils.degToRad(parameters.azimuth);

      this.sun.setFromSphericalCoords(1, phi, theta);
      this.sky.material.uniforms["sunPosition"].value.copy(this.sun);
      this.water.material.uniforms["sunDirection"].value.copy(this.sun).normalize();
      if (renderTarget !== undefined) {
        renderTarget.dispose();
      }
      renderTarget = this.pmremGenerator.fromScene(this.sky);
      this.scene.environment = renderTarget.texture;
    }
  }
</script>
