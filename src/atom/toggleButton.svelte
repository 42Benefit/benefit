<script>
	/**
     * @type {string}
     */
	 export let buttonName;
	/**
	 * @type {any}
	 */
	export let buttonFunction;
</script>

<label>
	<span> {buttonName} </span>
	<input type="checkbox" id="official" on:change={buttonFunction} />
</label>

<style>
	label {
		color: gray;
	}

	span {
		all: unset;
	}

	label:hover {
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
</style>
