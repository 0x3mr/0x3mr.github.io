<script>
	import X from '$lib/components/icons/X.svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import LinkedIn from '$lib/components/icons/LinkedIn.svelte';

	const email = 'amrabdelfattah321@gmail.com';

	const links = [
		{
            name: 'GitHub',
			handle: '0x3mr',
			href: 'https://github.com/0x3mr',
			icon: GitHub
		},
		{
            name: 'LinkedIn',
			handle: 'amrabdelfattah',
			href: 'https://www.linkedin.com/in/amrabdelfattah',
			icon: LinkedIn
		},
        {
            name: 'X',
            handle: '@amrstandby',
            href: 'https://x.com/amrstandby',
            icon: X
        }
	];
</script>

<svelte:head>
	<title>Contact — 0x3mr</title>
</svelte:head>

<section class="contact">
	<h1>Where you could find me</h1>

	<div class="split">
		<div class="pane email-pane">
			<p class="email-address">{email}</p>
			<a class="send-button" href="mailto:{email}">Send a message</a>
		</div>

		<div class="divider" aria-hidden="true"></div>

		<div class="pane links-pane">
			{#each links as link}
				<a class="link-row" href={link.href} target="_blank" rel="noopener noreferrer">
					<span class="icon">
						<link.icon />
					</span>
					<span class="text">
						<span class="name">{link.name}</span>
						<span class="handle">{link.handle}</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.contact {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		min-height: calc(100dvh - 5rem);
		justify-content: center;
		gap: var(--space-4);
	}

	.contact h1 {
		font-size: 2.3rem;
	}

	.split {
		display: flex;
		align-items: stretch;
		gap: var(--space-4);
		width: 100%;
		max-width: 560px;
	}

	.pane {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
	}

	.divider {
		width: 1px;
		background: var(--rule);
		flex-shrink: 0;
	}

	.email-address {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.15rem;
		white-space: nowrap;
	}

	.send-button {
		display: inline-block;
		padding: 0.6rem 1.4rem;
		border-radius: 999px;
		background: var(--accent);
		color: var(--bg);
		text-decoration: none;
		font-size: 0.95rem;
		letter-spacing: 0.01em;
		transition: background 0.15s ease, transform 0.15s ease;
	}

	.send-button:hover {
		background: var(--accent-soft);
		color: var(--bg);
		transform: translateY(-1px);
	}

	.links-pane {
		align-items: stretch;
		gap: var(--space-1);
	}

	.link-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0.75rem;
		border-radius: 8px;
		text-decoration: none;
		color: var(--ink);
		transition: background 0.15s ease, color 0.15s ease;
	}

	.link-row:hover {
		background: rgba(168, 64, 44, 0.08);
		color: var(--accent);
	}

	.link-row .icon {
		display: flex;
		flex-shrink: 0;
	}

	.link-row .text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0;
	}

	.link-row .name {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: 1.05rem;
	}

	.link-row .handle {
		font-size: 0.88rem;
		color: var(--ink-soft);
	}

	@media (max-width: 480px) {
		.split {
			flex-direction: column;
			align-items: center;
			gap: var(--space-3);
		}

		.divider {
			width: 60%;
			height: 1px;
		}

		.email-address {
			font-size: 1rem;
		}
	}
</style>