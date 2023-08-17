<script>
	// @ts-nocheck
	import { onMount, afterUpdate } from "svelte";
	import dateFormat from "dateformat";
	import ftLogo from "$lib/images/42logo.svg";
	import { isURL } from "validator";
	import ColorThief from "colorthief";

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
			} else {
				entry.target.classList.remove("show");
			}
		});
	};

	const toggleMethod = (e) => {
		const methodList = e.target.parentElement.nextElementSibling;
		const triangle = e.target.parentElement.lastElementChild;
		if (methodList && triangle) {
			methodList.classList.toggle("active");
			triangle.classList.toggle("active--triangle");
		}
	};

	onMount(() => {
		const benefitComponent = document.getElementById(benefit.companyName);
		if (benefitComponent) {
			setComponentGradientColor(benefitComponent);
		}
	});

	afterUpdate(async () => {
		const options = {
			root: document.querySelector("benefits-wrapper"),
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

	const colorThief = new ColorThief();

	const setComponentGradientColor = async (benefitComponent) => {
		const img = document.getElementById(`${benefit.companyName}-logo`);
		if (img.width === 0 || img.height === 0) {
			return;
		}
		const [r, g, b] = colorThief.getColor(img, 25).map((c) => 255 - c);
		const gradientPercent = window.innerWidth <= 768 ? 42 : 20;

		const gradient = `linear-gradient(242deg, rgba(${r}, ${g}, ${b}, 0.8) 0%, rgba(0, 0, 0, 0.8) ${gradientPercent}%)`;
		benefitComponent.style.backgroundImage = gradient;
	};

	/**
	 * @type {{companyName: string, companyDescription: string, logo: string, category: string, content: string, method: string[], startDate: string, endDate: string}}
	 */
	export let benefit;
</script>

<section class="benefit scroll" id={benefit.companyName}>
	<h1 class="company">
		<div id="name" class="tooltip">
			{benefit.companyName || ""}
			<p class="tooltip-text">
				{benefit.companyDescription || ""}
			</p>
		</div>
		<img
			id="{benefit.companyName}-logo"
			src={benefit.logo || ftLogo}
			alt="company logo"
		/>
	</h1>
	<div id="content">
		{benefit.content || ""}
	</div>
	<div id="date">
		{#if benefit.startDate || benefit.endDate}
			{displayDate(benefit.startDate)} ~
			{displayDate(benefit.endDate)}
		{/if}
	</div>
	<div id="method">
		<button class="method-toggle" on:click={toggleMethod}>
			<p>신청방법</p>
			<p class="triangle" />
		</button>
		<ol class="method-list">
			{#each benefit.method as element}
				{#if isURL(element)}
					<a href={element}><li>{element}</li></a>
				{:else}
					<li>{element}</li>
				{/if}
			{:else}
				<li>구체적인 신청방법 준비되지 않음. 해당회사에 문의.</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	a {
		color: inherit;
	}
	.benefit {
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 0.5rem;
		margin: 1rem;
		margin-bottom: 1.42rem;
		box-shadow: 0px 0.42rem 0.2rem 0.1rem rgba(0, 0, 0, 0.5);
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

	.benefit .company {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 1rem;
		font-size: xx-large;
	}

	.benefit #content {
		margin: 1rem;
		margin-top: 0;
		margin-bottom: 0.42rem;
		font-size: x-large;
	}

	.benefit #method {
		margin: 1rem;
		margin-top: 0;
		color: rgb(200, 200, 200);
		font-size: medium;
	}

	.benefit #method p {
		font-size: medium;
	}

	.benefit #date {
		margin: 1rem;
		margin-top: 0;
		margin-bottom: 0;
		color: rgb(200, 200, 200);
		font-size: small;
		font-style: italic;
	}

	.method-toggle {
		display: flex;
		margin: 0;
		font-size: small;
	}

	.method-toggle p {
		margin-bottom: 0;
	}

	.method-toggle:hover {
		cursor: pointer;
	}

	button {
		all: unset;
	}

	.triangle {
		width: 0px;
		height: 0px;
		border-left: 0.8rem solid rgb(200, 200, 200);
		border-top: 0.5rem solid transparent;
		border-bottom: 0.5rem solid transparent;
		margin-left: 0.42rem;
		scale: 0.7;
		transition: all 0.2s ease-in-out;
	}

	.method-list {
		display: none;
		font-family: monospace;
	}

	:global(.active) {
		display: block !important;
	}

	:global(.active--triangle) {
		transform: rotate(90deg);
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
			margin: 0;
			margin-top: 1.2rem;
		}

		.benefit img {
			width: 4rem;
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
