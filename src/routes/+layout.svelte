<script>
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/app.css';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import BackgroundScene from '$lib/components/BackgroundScene.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<BackgroundScene />
<SiteNav />

<main>
	{@render children()}
</main>

<style>
	main {
		max-width: var(--content-width);
		margin: 0 auto;
		padding: 0 var(--space-2) var(--space-5);
	}
</style>