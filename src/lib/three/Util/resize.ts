import type { PerspectiveCamera, WebGLRenderer } from "three";

export const resize = (renderer: WebGLRenderer, camera: PerspectiveCamera) => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
