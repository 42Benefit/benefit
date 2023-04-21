<script>
	// @ts-nocheck

	import benefits from "../../data/data.json";
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
		}
	};
	let showBenefits = benefits
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
	/**
	 @summary close modal when press escape key
	*/
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			document.getElementsByClassName(
				"benefits_wrapper"
				// @ts-ignore
			)[0].style.display = "none";
		}
	});
</script>

<div class="benefits_wrapper">
	<div class="category">
		<button class="show" id="education" on:click={changeCategory}
			>교육</button
		>
		<button class="show" id="cooperation" on:click={changeCategory}
			>협업</button
		>
		<button class="show" id="etc" on:click={changeCategory}>기타</button>
	</div>
	{#each showBenefits as benefit}
		<Benefit {benefit} />
	{:else}
		<section class="no_benefit">
			<i>여행은 언제나 고독한 법이죠...</i>
			<i>베네핏 없이도 항해를 이어나갈 당신을 응원합니다.</i>
		</section>
	{/each}
</div>

<style>
	.benefits_wrapper {
		overflow-y: scroll;
		max-height: 80vh;
		display: none;
		margin: 2rem;
		color: white;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.benefits_wrapper::-webkit-scrollbar {
		display: none;
	}

	.no_benefit {
		display: flex;
		flex-direction: column;
		background-color: rgba(0, 0, 0, 0.42);
		border-radius: 0.5rem;
		margin: 1rem;
	}

	.no_benefit i {
		margin: 1rem;
	}

	.category {
		display: flex;
		flex-direction: row;
		justify-content: right;
		align-items: right;
		margin: 1rem;
	}

	.category button {
		all: unset;
		margin: 0.42rem;
		opacity: 0.42;
	}

	.category button:hover {
		cursor: pointer;
	}

	.show {
		opacity: 0.9 !important;
	}

	@media (max-width: 768px) {
		.benefits_wrapper {
			margin: 0;
			margin-top: 1rem;
		}
	}
</style>
