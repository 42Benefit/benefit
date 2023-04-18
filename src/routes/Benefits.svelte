<script>
	import benefits from "../data/data.json";
	import ftLogo from "$lib/images/42logo.svg";

	const displayDate = (/** @type {string | number | Date | undefined} */ input) => {
		if (input === null || input === undefined || input === "")
		{
			return "";
		}
		const date = new Date(input);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		return `${year}.${month}.${day}`;
	};
</script>

<div class="benefits_wrapper">
	<div class="category">
		<p id="education">교육</p>
		<p id="cooperation">협업</p>
		<p id="etc">기타</p>
	</div>
	{#each benefits as benefit}
		<section class="benefit" data-scroll>
			{benefit.companyName || ""}
			{benefit.companyDescription || ""}
			{benefit.category || ""}
			{benefit.content || ""}
			{#each benefit.method || [] as element}
				<li>{element}</li>
			{/each}
			<img src={benefit.logo || ftLogo} alt="company logo" />
			{displayDate(benefit.startDate)} ~ {displayDate(benefit.endDate)}
		</section>
	{:else}
		<p>등록된 혜택이 없습니다.</p>
	{/each}
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
