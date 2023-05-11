<script context="module">
	// @ts-nocheck
	import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
	
	export const LoaderFactory = () => {
		const loader = new GLTFLoader();

		return loader;
	};
</script>