<script>
	import Header from "../component/Header.svelte";
	import Footer from "../component/Footer.svelte";
	import Loading from "../component/Loading.svelte";
	import { onMount } from "svelte";
	import { createScene } from "../lib/scene.svelte";

	// for easter egg
	console.log("Don't Panic!")
	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas_name;
	onMount(() => {
		createScene(canvas_name);
	});

</script>

<svelte:head>
	<title>42 Benefit</title>

	<script async src="https://www.googletagmanager.com/gtag/js?id=G-6B12EVGK5N"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-6B12EVGK5N');
	</script>
</svelte:head>

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
		font-family: sans-serif;
		margin: 0;
		padding: 0;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		padding: 0;
		box-sizing: border-box;
	}

	canvas {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100vw;
		height: 100vh;
	}
</style>
