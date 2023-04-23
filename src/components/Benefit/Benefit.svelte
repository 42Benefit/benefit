<script>
	// @ts-nocheck
	import { afterUpdate } from "svelte";
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

	const showElement = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
			}
			else {
				entry.target.classList.remove("show");
				entry.target.style.scale = 0.98;
			}
		});
	};
	afterUpdate(async () => {
		const options = {
			root: document.querySelector(".benefit_wrapper"),
			rootMargin: "0px",
			threshold: 0.42,
		};
		const observer = new IntersectionObserver(showElement, options);
		const scrollElements = document.querySelectorAll(".scroll");
		if (scrollElements) {
			scrollElements.forEach((element) => {
				observer.observe(element);
			});
		}
	});
	/**
	 * @type {{companyName: string, companyDescription: string, logo: string, category: string, content: string, method: string[], startDate: string, endDate: string}}
	 */
	export let benefit;
</script>

<section class="benefit scroll">
	<h1 id="company">
		<div class="tooltip">
			{benefit.companyName || ""}
			<p class="tooltip-text">
				{benefit.companyDescription || ""}
			</p>
		</div>
		<img src={benefit.logo || ftLogo} alt="company logo" />
	</h1>
	<div id="content">
		{benefit.content || ""}
	</div>
	<div id="date">
		{displayDate(benefit.startDate)} ~
		{displayDate(benefit.endDate)}
	</div>
	<div id="method">
		<p>신청방법</p>
		<ol>
			{#each benefit.method || [] as element}
				<li>{element}</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.benefit {
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 0.5rem;
		margin: 0.42rem;
		margin-bottom: 1.78rem;
	}

	.scroll {
		opacity: 0.1;
		transition: all 1s ease-in-out;
	}

	.benefit img {
		object-fit: scale-down;
		width: 5rem;
	}

	.benefit ol {
		margin: 0;
		list-style-type: decimal-leading-zero;
		line-height: 1.42rem;
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
		margin-bottom: 0.42rem;
		font-size: x-large;
	}

	.benefit #method {
		margin: 1rem;
	}

	.benefit #method p {
		margin-bottom: 0.42rem;
		font-size: large;
	}

	.benefit #date {
		margin: 1rem;
		margin-top: 0;
		margin-bottom: 0;
		color: rgb(200, 200, 200);
		font-style: italic;
	}

	.tooltip {
		position: relative;
		display: inline-block;
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
		left: 105%;
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

		.tooltip-text {
			top: -42%;
			left: 0%;
		}
	}
</style>
