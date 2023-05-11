<script context="module">
	// @ts-nocheck
	export const resize = (renderer, camera) => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
	};
</script>