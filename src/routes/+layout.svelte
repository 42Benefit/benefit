<script>
	import Header from "./Header.svelte";
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

	<main>
		<slot />
	</main>
	<canvas bind:this={canvas_name} />

	<footer>
		<p>
			42 베네핏에 대해 설명하는 글 <a href="https://kit.svelte.dev"
				>노션 링크</a
			> 컨퓨리튜트 안내글
		</p>
	</footer>
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

	footer {
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		color: wheat;
		font-weight: bold;
	}

	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
