<footer>
	<p>
		Developed by <a href="https://github.com/YeonSeong-Lee/">seongyle </a>
		&amp; <a href="https://github.com/SeungWoonSong">susong</a>
	</p>
	<p>
		Source code available on <a
			href="https://github.com/YeonSeong-Lee/benefit/">GitHub</a
		>
	</p>
	<p>
		Content also available on <a href="https://www.notion.so/example"
			>Notion</a
		>
	</p>
</footer>

<style>
	footer {
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	footer a {
		color: wheat;
		font-weight: bold;
	}

	footer a:hover {
		color: var(--color-theme-1);
	}

	footer p {
		margin: 0.24rem;
		opacity: 0.1;
	}

	footer p:hover {
		opacity: 0.42;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
