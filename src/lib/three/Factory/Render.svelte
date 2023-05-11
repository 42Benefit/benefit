<script context="module">
  // @ts-nocheck
  import * as THREE from "three";

  export const RendererFactory = () => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    return renderer;
  };
</script>
