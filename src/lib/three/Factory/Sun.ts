import type { PMREMGenerator, Scene, WebGLRenderTarget } from "three";
import { MathUtils, Vector3 } from "three";
import type { Sky } from "three/examples/jsm/objects/Sky";
import type { Water } from "three/examples/jsm/objects/Water";

export class SunFactory {
  sun = new Vector3();

  constructor(
    public scene: Scene,
    public sky: Sky,
    public water: Water,
    public pmremGenerator: PMREMGenerator,
  ) {
    this.sun.setFromSphericalCoords(
      1,
      Math.PI / 2 - 0.042,
      -Math.PI / 2 + 0.042,
    );
    this.sky.material.uniforms["sunPosition"].value.copy(this.sun);
    this.water.material.uniforms["sunDirection"].value
      .copy(this.sun)
      .normalize();
  }

  update(elevation: number, azimuth: number) {
    let renderTarget: WebGLRenderTarget | undefined;
    const phi = MathUtils.degToRad(90 - elevation);
    const theta = MathUtils.degToRad(azimuth);

    this.sun.setFromSphericalCoords(1, phi, theta);
    this.sky.material.uniforms["sunPosition"].value.copy(this.sun);
    this.water.material.uniforms["sunDirection"].value
      .copy(this.sun)
      .normalize();

    renderTarget?.dispose();
    renderTarget = this.pmremGenerator.fromScene(this.scene);
    this.scene.environment = renderTarget.texture;
  }

  lighten() {
    this.update(12, -142);
  }

  darken() {
    this.update(1, -142);
  }
}
