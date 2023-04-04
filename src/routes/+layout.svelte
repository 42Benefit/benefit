<script>
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Loading from "./Loading.svelte";
	import { onMount } from "svelte";
	import { createScene } from "../lib/scene.svelte";

	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas_name;
	onMount(() => {
		createScene(canvas_name);
	});
</script>

<div class="app">
	<Header />
	<Loading />
	<main>
		<slot />
	</main>
	<canvas bind:this={canvas_name} />
	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	canvas {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
