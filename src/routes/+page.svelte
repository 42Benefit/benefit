<script>
	import Benefits from "./Benefits.svelte";
</script>

<svelte:head>
	<title>42 Benefit</title>
	// TODO: add meta description detail
	<meta name="description" content="42Seoul 카뎃들을 위한 Benefit 사이트입니다." />
	<meta property="og:image" content="/images/42logo.svg">
	<meta property="og:title" content="42 Benefit">
	<meta property="og:description" content="42Seoul 카뎃들을 위한 Benefit 사이트입니다.">	
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
