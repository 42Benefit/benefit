<script>
	import { page } from "$app/stores";
	import logo from "$lib/images/42logo.svg";
	import github from "$lib/images/github.svg";
	import SearchBar from "./SearchBar.svelte";
</script>

<header>
	<div class="corner">
		<a href="https://benefit.42seoul.link/">
			<img src={logo} alt="42logo" />
		</a>
	</div>

	<div class="corner search" >
		<SearchBar />
	</div>
</header>

<style>
	header {
		position: fixed;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 6rem;
		height: 5rem;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.search {
		width: 20rem;
		margin-right: 2rem;
		/* opacity: 0.42; */
	}

	.corner img {
		width: 5rem;
		height: 5rem;
		object-fit: contain;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	@media (max-width: 768px) {
		.corner {
			width: 3.5rem;
			height: 3rem;
		}

		.corner img {
			width: 3rem;
			height: 3rem;
			object-fit: contain;
		}
		.search {
			width: 15rem;
			margin-right: 1rem;
		}
	}
</style>
