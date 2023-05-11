<script>
	import Header from "../component/Header.svelte";
	import Footer from "../component/Footer.svelte";
	import Loading from "../component/Loading.svelte";
	import { onMount } from "svelte";
	import { createScene } from "../lib/three/scene.svelte";
	import "./global.css";

	// for easter egg
	console.log("Don't Panic!")

	/**
	 * @description create canvas and renderer
	 * @info this function is called only once, when the component is mounted
	 * @warning this function create canvas DOM element
	*/
	onMount(() => {
		createScene();
	});

</script>

<svelte:head>
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
</style>
