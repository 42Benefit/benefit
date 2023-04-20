<script>
	import dateFormat from "dateformat";
	import ftLogo from "$lib/images/42logo.svg";

	/**
	 * @summary show consistent date format
	 * @info formattedInput is for safari
	 * @param {string | undefined} input
	 */
	const displayDate = (/** @type {string | undefined} */ input) => {
		if (input === null || input === undefined || input === "") {
			return "";
		}
		const formattedInput = input.replace(/(\.)|-/g, "/");
		return dateFormat(formattedInput, "yyyy.mm.dd");
	};

	/**
	 * @type {{companyName: string, companyDescription: string, logo: string, category: string, content: string, method: string[], startDate: string, endDate: string}}
	 */
	export let benefit;
</script>

<section class="benefit" data-scroll>
	<h1 id="company">
		<img src={benefit.logo || ftLogo} alt="company logo" />
		<div class="tooltip">
			{benefit.companyName || ""}
			<p class="tooltip-text">
				{benefit.companyDescription || ""}
			</p>
		</div>
	</h1>
	<div id="content">
		{benefit.content || ""}
	</div>
	<div id="method">
		<p>신청방법</p>
		<ol>
			{#each benefit.method || [] as element}
				<li>{element}</li>
			{/each}
		</ol>
	</div>
	<div id="date">
		{displayDate(benefit.startDate)} ~
		{displayDate(benefit.endDate)}
	</div>
</section>

<style>
	.benefit {
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.42);
		border-radius: 0.5rem;
		margin: 1rem;
	}

	.benefit img {
		object-fit: scale-down;
		width: 5rem;
	}

	.benefit ol {
		margin: 0;
		list-style-type: decimal-leading-zero;
	}

	.benefit #company {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 1rem;
	}

	.benefit #content {
		margin: 1rem;
		font-size: x-large;
	}

	.benefit #method {
		margin: 1rem;
		margin-bottom: 0;
		margin-top: 0;
	}

	.benefit #method p {
		margin: 0;
		margin-bottom: 0.42rem;
		font-size: large;
	}

	.benefit #date {
		margin-top: 0;
		margin: 1rem;
		font-style: italic;
	}

	.tooltip {
		position: relative;
		display: inline-block;
		justify-content: center;
	}

	.tooltip-text {
		min-width: 200px;
		visibility: hidden;
		background-color: white;
		opacity: 0.95;
		color: black;
		border-radius: 0.5rem;
		position: absolute;
		z-index: 1;
		font-size: small;
		padding: 0.42rem;
		top: -42%;
		right: 105%;
	}

	.tooltip:hover .tooltip-text {
		visibility: visible;
	}

	@media (max-width: 768px) {
		.benefit {
			margin-left: 0;
			margin-right: 0;
			margin-top: 1rem;
		}

		.benefit #content {
			font-size: large;
		}
	}
</style>
