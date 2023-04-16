<script>
	import benefits from "../data/data.json";
	import ftLogo from "$lib/images/42logo.svg";

	const closeModel = () => {
		// @ts-ignore
		document.querySelector(".benefits_wrapper").style.display = "none";
	};
</script>

<div class="benefits_wrapper">
	{#if benefits.length === 0}
		<h1>No benefits</h1>
	{/if}
	<div class="category">
		<p id="education">교육</p>
		<p id="cooperation">협업</p>
		<p id="etc">기타</p>
	</div>
	{#each benefits as benefit}
		<section class="benefit" data-scroll>
			<h1>{benefit.companyName}</h1>
			<h1>{benefit.companyDescription}</h1>
			<h1>{benefit.category}</h1>
			<h1>{benefit.content}</h1>
			<h1>{benefit.method}</h1>
			<h1><img src={benefit.logo ?? ftLogo} alt="company logo" /></h1>
			<h1>{benefit.startDate} ~ {benefit.endDate ?? ""}</h1>
		</section>
	{/each}
	<button on:click={closeModel}>Close</button>
</div>

<style>
	.benefits_wrapper {
		background-color: red;
		overflow-y: scroll;
		height: 80vh;
		display: none;
		margin: 2rem;
	}

	.benefit {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1rem;
		background-color: blue;
	}

	.category {
		display: flex;
		flex-direction: row;
		justify-content: right;
		align-items: right;
		margin: 1rem;
	}

	.category p {
		margin: 0.42rem;
		opacity: 1;
	}
</style>
