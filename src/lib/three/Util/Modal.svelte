<script context="module">
  // @ts-nocheck
  import { changeAutoRotate } from "$lib/three/scene.svelte";

  export const openModal = (sun) => {
    sun.lighten();
    document.querySelector(".benefits-wrapper").style.display = "block";
    changeAutoRotate(false);
  };

  export const closeModal = (sun) => {
    document.querySelector(".benefits-wrapper").style.display = "none";
    sun.darken();
    changeAutoRotate(true);
  };
</script>

