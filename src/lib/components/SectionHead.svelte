<script>
	/** @type {{ label: string, count?: string }} */
	let { label, count = '' } = $props();
</script>

<div class="head">
	<span class="stamp">
		<span class="stamp-dot" aria-hidden="true"></span>
		{label}
	</span>
	{#if count}
		<span class="count">{count}</span>
	{/if}
	<span class="rule" aria-hidden="true"></span>
</div>

<style>
	.head {
		display: flex;
		align-items: center;
		gap: var(--space-2, 0.9rem);
		margin-bottom: var(--space-4, 3rem);
	}

	.stamp {
		position: relative;
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.45rem 1rem 0.45rem 0.7rem;
		border: 1.5px dashed var(--accent);
		border-radius: 8px;
		transform: rotate(-2.2deg);
		font-family: var(--font-headline);
		font-weight: 800;
		font-size: 1.15rem;
		letter-spacing: -0.01em;
		color: var(--ink);
		background: rgba(168, 64, 44, 0.06);
	}

	.stamp::after {
		/* faux ink-bleed corner, like it was pressed a hair too hard */
		content: '';
		position: absolute;
		top: -4px;
		right: -4px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent);
		opacity: 0.5;
	}

	.stamp-dot {
		width: 9px;
		height: 9px;
		border-radius: 2px;
		background: var(--accent);
		flex-shrink: 0;
	}

	.count {
		flex-shrink: 0;
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 500;
		font-size: 0.9rem;
		color: var(--ink-soft);
	}

	.rule {
		flex: 1;
		height: 1px;
		background: var(--rule);
	}

	@media (max-width: 480px) {
		.stamp {
			font-size: 1.02rem;
		}
	}
</style>