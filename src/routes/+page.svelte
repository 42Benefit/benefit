<script>
	import Benefits from "./Benefits.svelte";
</script>

<svelte:head>
	<title>42 benefit</title>
	// TODO: add meta description detail
	<meta name="description" content="42 benefit" />
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-6B12EVGK5N"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-6B12EVGK5N');
</script>

</svelte:head>

<Benefits />
