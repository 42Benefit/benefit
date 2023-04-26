<script>
	// @ts-nocheck

	import benefits from "../../data/data.json";
	import studentBenefits from "../../data/student.json";
	import Benefit from "./Benefit.svelte";

	//TODO: Refactor this code, separate into modules

	/**
	 *  @param {MouseEvent & { currentTarget: HTMLButtonElement}} e
	 */
	const changeCategory = (e) => {
		const category = e.currentTarget.id;
		if (category === "education") {
			toggleCategory("education");
		} else if (category === "cooperation") {
			toggleCategory("cooperation");
		} else {
			toggleCategory("etc");
		}
	};

	const sortBenefitsListFunction = (a, b) => {
		if (a.startDate === undefined || b.startDate === undefined) {
			return 0;
		}
		if (a.startDate < b.startDate) {
			return 1;
		} else if (a.startDate > b.startDate) {
			return -1;
		} else {
			return 0;
		}
	};

	const toggleCategory = (/** @type {string} */ category) => {
		const education = document.getElementById("education");
		const cooperation = document.getElementById("cooperation");
		const etc = document.getElementById("etc");
		if (category === "education" && education) {
			if (education.classList.contains("show")) {
				showBenefits = showBenefits.filter(
					(benefit) => benefit.category !== "교육"
				);
			} else {
				showBenefits = [...showBenefits, ...educationBenefits].sort(
					sortBenefitsListFunction
				);
			}
			education.classList.toggle("show");
			education.classList.toggle("text-underlined");
		} else if (category === "cooperation" && cooperation) {
			if (cooperation.classList.contains("show")) {
				showBenefits = showBenefits.filter(
					(benefit) => benefit.category !== "협업"
				);
			} else {
				showBenefits = [...showBenefits, ...cooperationBenefits].sort(
					sortBenefitsListFunction
				);
			}
			cooperation.classList.toggle("show");
			cooperation.classList.toggle("text-underlined");
		} else if (category === "etc" && etc) {
			if (etc.classList.contains("show")) {
				showBenefits = showBenefits.filter(
					(benefit) =>
						!(
							benefit.category !== "교육" &&
							benefit.category !== "협업"
						)
				);
			} else {
				showBenefits = [...showBenefits, ...etcBenefits].sort(
					sortBenefitsListFunction
				);
			}
			etc.classList.toggle("show");
			etc.classList.toggle("text-underlined");
		}
	};
	let showBenefits = [...benefits, ...studentBenefits]
		.filter((benefit) => benefit.category)
		.sort(sortBenefitsListFunction);
	const educationBenefits = showBenefits.filter(
		(benefit) => benefit.category === "교육"
	);
	const cooperationBenefits = showBenefits.filter(
		(benefit) => benefit.category === "협업"
	);
	const etcBenefits = showBenefits.filter(
		(benefit) => benefit.category !== "교육" && benefit.category !== "협업"
	);
</script>

<div class="benefits-wrapper">
	<header class="category">
		<button class="show text-underlined" id="education" on:click={changeCategory}
			>교육</button
		>
		<button class="show text-underlined" id="cooperation" on:click={changeCategory}
			>협업</button
		>
		<button class="show text-underlined" id="etc" on:click={changeCategory}>기타</button>
	</header>
	<div class="benefits-list">
		{#each showBenefits as benefit}
			<Benefit {benefit} />
		{:else}
			<section class="no-benefit">
				<i>여행은 언제나 고독한 법이죠...</i>
				<i>베네핏 없이도 항해를 이어나갈 당신을 응원합니다.</i>
			</section>
		{/each}
	</div>
</div>

<style>
	.benefits-wrapper {
		margin: 1rem;
		display: none;
	}
	
	.benefits-list {
		margin: 0;
		padding: 0;
		max-height: 80vh;
		overflow-y: scroll;
		-ms-overflow-style: none;
		scrollbar-width: none;
		color: white;
	}

	.benefits-list::-webkit-scrollbar {
		display: none;
	}

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

	.category {
		font-size: large;
		display: flex;
		flex-direction: row;
		justify-content: left;
		margin: 0;
		margin-left: 1rem;
		color: black;
	}

	.category button {
		all: unset;
		margin: 0.42rem;
		opacity: 0.42;
	}

	.category button:hover {
		cursor: pointer;
	}

	:global(.show) {
		opacity: 0.9 !important;
	}

		
	:global(.text-underlined) {
		text-decoration: underline !important;
		text-underline-offset: 0.2rem !important;
		text-decoration-thickness: 0.1rem !important;
	}

</style>
