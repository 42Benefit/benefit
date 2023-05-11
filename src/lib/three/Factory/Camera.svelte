<script context="module">
	// @ts-nocheck

	import * as THREE from "three";

	export const CameraFactory = () => {
		const camera = new THREE.PerspectiveCamera(
			55,
			window.innerWidth / window.innerHeight,
			1,
			20000
		);
		camera.position.set(30, 30, 100);

		return camera;
	};
</script>