<script>
	// @ts-nocheck

	import benefits from "../../data/data.json";
	import studentBenefits from "../../data/student.json";
	import Benefit from "./Benefit.svelte";
	import NoBenefit from "./NoBenefit.svelte";

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
		} else if (category === "etc") {
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
		const official = document.getElementById("official");
		if (category === "education" && education) {
			if (education.classList.contains("show")) {
				showBenefits = showBenefits.filter(
					(benefit) => benefit.category !== "교육"
				);
			} else {
				showBenefits = [...showBenefits, ...educationBenefits].sort(
					sortBenefitsListFunction
				);
				if (official.checked) {
					showBenefits = showBenefits.filter(
						(benefit) => benefit.official === true
					);
				}
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
				if (official.checked) {
					showBenefits = showBenefits.filter(
						(benefit) => benefit.official === true
					);
				}
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
				if (official.checked) {
					showBenefits = showBenefits.filter(
						(benefit) => benefit.official === true
					);
				}
			}
			etc.classList.toggle("show");
			etc.classList.toggle("text-underlined");
		}
	};

	const toggleOfficialBenefits = () => {
		const official = document.getElementById("official");
		if (official.checked) {
			showBenefits = showBenefits.filter(
				(benefit) => benefit.official === true
			);
		} else {
			showBenefits = currentCategoryBenefits(originalBenefits);
		}
	};

	const currentCategoryBenefits = (benefits) => {
		if (!education.classList.contains("show")) {
			benefits = benefits.filter(
				(benefit) => benefit.category !== "교육"
			);
		}
		if (!cooperation.classList.contains("show")) {
			benefits = benefits.filter(
				(benefit) => benefit.category !== "협업"
			);
		}
		if (!etc.classList.contains("show")) {
			benefits = benefits.filter(
				(benefit) =>
					!(
						benefit.category !== "교육" &&
						benefit.category !== "협업"
					)
			);
		}
		return benefits;
	};

	// TODO: 추후 데이터 가공부 추가해서 refactoring
	const officialBenefits = benefits
		.map((benefit) => {
			benefit.official = true;
			return benefit;
		})
		.filter((benefit) => benefit.category);
	const originalBenefits = [...officialBenefits, ...studentBenefits].filter(
		(benefit) => benefit.category
	);
	let showBenefits = originalBenefits
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
		<div>
			<button
				class="show text-underlined"
				id="education"
				on:click={changeCategory}>교육</button
			>
			<button
				class="show text-underlined"
				id="cooperation"
				on:click={changeCategory}>협업</button
			>
			<button
				class="show text-underlined"
				id="etc"
				on:click={changeCategory}>기타</button
			>
		</div>
		<label>
			<span> official </span>
			<input
				type="checkbox"
				id="official"
				on:change={toggleOfficialBenefits}
			/>
		</label>
	</header>
	<div class="benefits-list">
		{#each showBenefits as benefit}
			<Benefit {benefit} />
		{:else}
			<NoBenefit />
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

	.category {
		font-size: large;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0;
		margin-left: 1rem;
		margin-right: 1rem;
		color: black;
	}

	.category button {
		all: unset;
		margin: 0.42rem;
		opacity: 0.42;
	}

	.category label {
		color: gray;
	}

	.category span {
		all: unset;
	}

	.category label:hover {
		cursor: pointer;
	}

	[type="checkbox"] {
		appearance: none;
		position: relative;
		border: max(2px, 0.1rem) solid gray;
		border-radius: 1.25rem;
		width: 2.25rem;
		height: 1.25rem;
		top: 0.4rem;
	}

	[type="checkbox"]::before {
		content: "";
		position: absolute;
		left: 0;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		transform: scale(0.8);
		background-color: gray;
		transition: left 250ms linear;
	}

	[type="checkbox"]:checked::before {
		background-color: white;
		left: 1rem;
	}

	[type="checkbox"]:checked {
		background-color: rgb(10, 115, 66);
		border-color: rgb(10, 115, 66);
	}

	[type="checkbox"]:focus-visible {
		outline-offset: max(2px, 0.1rem);
		outline: max(2px, 0.1rem) solid rgb(10, 115, 66);
	}

	:global(.show) {
		opacity: 0.9 !important;
	}

	:global(.text-underlined) {
		text-decoration: underline !important;
		text-underline-offset: 0.2rem !important;
		text-decoration-thickness: 0.1rem !important;
	}

	@media (max-width: 768px) {
		.category {
			margin: 0.42rem;
		}
	}
</style>
