<script>
	const links = [
		{ href: '/', label: 'home' },
		{ href: '/blog', label: 'blog' },
		{ href: '/contact', label: 'contact' }
	];
</script>

<div class="nav-wrap">
	<nav class="site-nav">
		{#each links as link}
			<a href={link.href}>{link.label}</a>
		{/each}
	</nav>
</div>

<style>
	.nav-wrap {
		position: sticky;
		top: 0;
		z-index: 50;
		display: flex;
		justify-content: center;
		padding: max(0.9rem, env(safe-area-inset-top)) var(--space-2) 0.9rem;
		pointer-events: none;
	}

	.site-nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		padding: 0.4rem;
		font-family: var(--font-body);
		font-size: 0.92rem;
		letter-spacing: 0.02em;
		color: var(--ink-soft);
		pointer-events: auto;

		border-radius: 999px;
		border: 1px solid rgba(42, 36, 32, 0.08);
		background: rgba(246, 241, 231, 0.45);
		backdrop-filter: blur(16px) saturate(160%);
		-webkit-backdrop-filter: blur(16px) saturate(160%);
		box-shadow:
			0 1px 2px rgba(42, 36, 32, 0.04),
			0 8px 24px -8px rgba(42, 36, 32, 0.12),
			inset 0 1px 0 rgba(255, 255, 255, 0.5);
	}

	.site-nav a {
		text-decoration: none;
		color: var(--ink-soft);
		padding: 0.55rem 1.1rem;
		border-radius: 999px;
		transition: color 0.15s ease, background 0.15s ease;
	}

	.site-nav a:hover {
		color: var(--accent);
		background: rgba(168, 64, 44, 0.1);
	}

	@media (max-width: 480px) {
		.nav-wrap {
			padding-inline: var(--space-2);
		}

		.site-nav {
			width: 100%;
			max-width: 320px;
			gap: 0.15rem;
			font-size: 0.88rem;
			padding: 0.35rem;
		}

		.site-nav a {
			padding: 0.55rem 0.9rem;
		}
	}
</style>