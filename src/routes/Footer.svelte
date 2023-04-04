<footer>
	<p>
		42 베네핏에 대해 설명하는 글 <a href="https://kit.svelte.dev"
			>노션 링크</a
		> 컨퓨리튜트 안내글
	</p>
</footer>

<style>
	footer {
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		color: wheat;
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
