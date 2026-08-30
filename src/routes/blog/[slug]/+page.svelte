<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} — 0x3mr</title>
</svelte:head>

<article class="post">
	<a class="ink-link back" href="/blog">← all posts</a>
	<h1>{data.meta.title}</h1>
	<time datetime={data.meta.date}>
		{new Date(data.meta.date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		})}
	</time>
	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	.post {
		padding-block: var(--space-4);
	}

	.back {
		display: inline-block;
		font-size: 0.85rem;
		color: var(--ink-soft);
		text-decoration: none;
		margin-bottom: var(--space-3);
	}

	.back:hover {
		color: var(--accent);
	}

	.post h1 {
		font-size: 2.1rem;
		margin-bottom: var(--space-1);
	}

	time {
		display: block;
		color: var(--ink-soft);
		font-style: italic;
		font-size: 0.9rem;
		margin-bottom: var(--space-3);
	}

	.prose {
		margin-top: var(--space-3);
	}

	.prose :global(p) {
		margin: 0 0 1.2em;
	}

	.prose :global(h2) {
		font-size: 1.4rem;
		margin: 1.6em 0 0.6em;
	}

	.prose :global(a) {
		color: var(--accent);
	}

	.prose :global(code) {
		background: var(--rule);
		padding: 0.1em 0.35em;
		border-radius: 3px;
		font-size: 0.9em;
	}
</style>
