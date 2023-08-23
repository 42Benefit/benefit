import { changeAutoRotate } from "$lib/three/scene.svelte";
import type { SunFactory } from "../Factory/Sun";

export const openModal = (sun: SunFactory) => {
  sun.lighten();
  document.querySelector(".benefits-wrapper")!.style.display = "block";
  changeAutoRotate(false);
};

export const closeModal = (sun: SunFactory) => {
  document.querySelector(".benefits-wrapper")!.style.display = "none";
  sun.darken();
  changeAutoRotate(true);
};
