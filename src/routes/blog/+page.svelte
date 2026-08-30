<script>
	import { posts } from '$lib/posts.js';

	/** @param {string} dateStr */
	function formatDate(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog — 0x3mr</title>
</svelte:head>

<header class="page-head">
	<h1>Blog</h1>
</header>

<ul class="post-list">
	{#each posts as post}
		<li>
			<a class="ink-link title" href="/blog/{post.slug}">{post.title}</a>
			<time datetime={post.date}>{formatDate(post.date)}</time>
			{#if post.excerpt}
				<p class="excerpt">{post.excerpt}</p>
			{/if}
		</li>
	{:else}
		<li class="empty">
			<p>nothing yet for my crazy ideas :)</p>
			<p class="notebook">it's all in my little notebook</p>
		</li>
	{/each}
</ul>

<style>
	.page-head {
		padding-block: var(--space-4) var(--space-3);
	}

	.page-head h1 {
		font-size: 2.2rem;
	}

	.post-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.post-list li {
		padding-block: var(--space-3);
		border-top: 1px solid var(--rule);
	}

	.title {
		display: block;
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 500;
		text-decoration: none;
	}

	.title:hover {
		color: var(--accent);
	}

	time {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.85rem;
		color: var(--ink-soft);
		font-style: italic;
	}

	.excerpt {
		margin: var(--space-1) 0 0;
		color: var(--ink-soft);
	}

	.empty {
		border-top: none;
		padding-block: var(--space-5) var(--space-4);
		text-align: center;
	}

	.empty p {
		margin: 0;
		font-size: 1.1rem;
	}

	.empty .notebook {
		margin-top: var(--space-1);
		font-style: italic;
		color: var(--ink-soft);
		font-size: 0.95rem;
	}
</style>