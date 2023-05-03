<script>
	import { onMount } from "svelte";

	import TypeIt from "typeit";

	onMount(() => {
		// @ts-ignore
		new TypeIt(".no-benefit #first", {
			speed: 42,
			waitUntilVisible: true,
			startDelay: 1000,
			cursor: false,
		}).go();

		// @ts-ignore
		new TypeIt(".no-benefit #second", {
			speed: 42,
			waitUntilVisible: true,
			startDelay: 2000,
			cursor: false,
		}).go();
	});
</script>

<section class="no-benefit">
	<i id="first">여행은 언제나 고독한 법이죠...</i>
	<i id="second">베네핏 없이도 항해를 이어나갈 당신을 응원합니다.</i>
</section>

<style>
	.no-benefit {
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 0.5rem;
		margin: 1rem;
		box-shadow: 0px 0.42rem 0.2rem 0.1rem rgba(0, 0, 0, 0.5);
	}

	.no-benefit i {
		margin: 1rem;
	}

	@media (max-width: 768px) {
		.no-benefit {
			margin: 0.42rem;
		}
	}
</style>
