<script>
	let benefits = [
		{
			company: "42",
			benefit: "42 benefit",
			start_date: "2021-01-01",
			end_date: "2021-12-31",
		},
		{
			company: "43",
			benefit: "43 benefit",
			start_date: "2022-01-01",
			end_date: "2023-12-31",
		},
		{
			company: "42",
			benefit: "42 benefit",
			start_date: "2021-01-01",
			end_date: "2021-12-31",
		},
		{
			company: "42",
			benefit: "42 benefit",
			start_date: "2021-01-01",
			end_date: "2021-12-31",
		},
		{
			company: "42",
			benefit: "42 benefit",
			start_date: "2021-01-01",
			end_date: "2021-12-31",
		},
		{
			company: "42",
			benefit: "42 benefit",
			start_date: "2021-01-01",
			end_date: "2021-12-31",
		},
	];
	// TODO: load benefit from google sheet api
</script>

<div class="benefits_wrapper">
	{#each benefits as benefit}
		<section class="benefit">
			<h1>회사명 : {benefit.company}</h1>
			<h1>혜택 : {benefit.benefit}</h1>
			<h1>혜택기간: {benefit.start_date} ~ {benefit.end_date}</h1>
		</section>
	{/each}
</div>

<style>
	.benefits_wrapper {
		overflow-y: scroll;
		background-color: red;
	}
	.benefit {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1rem;
		background-color: blue;
	}
</style>
