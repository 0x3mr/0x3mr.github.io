<script>
	import SectionHead from './SectionHead.svelte';

	/**
	 * Fill this in — one entry per project.
	 * `image` should point at an imported asset (same pattern as
	 * PreviousWorkSection: `import img from '$lib/work/...';`)
    /** @type {{ projects: { title: string, blurb: string, stack: string[], image: string, href?: string, year?: string }[] }} */
	let { projects = [] } = $props();
</script>

{#if projects.length > 0}
	<section class="notable">
		<div class="inner">
			<SectionHead label="Notable Projects" count="{projects.length} shipped" />

			<div class="cards">
				{#each projects as project, i}
					<a
						class="card"
						href={project.href ?? '#'}
						target={project.href ? '_blank' : undefined}
						rel={project.href ? 'noopener noreferrer' : undefined}
						style="--i: {i}"
					>
						<div class="media">
							<img src={project.image} alt={project.title} loading="lazy" />
							<span class="media-scrim" aria-hidden="true"></span>
							{#if project.year}
								<span class="year">{project.year}</span>
							{/if}
						</div>

						<div class="body">
							<div class="body-top">
								<h3>{project.title}</h3>
								<span class="go" aria-hidden="true">↗</span>
							</div>
							<p class="blurb">{project.blurb}</p>
							{#if project.stack?.length}
								<ul class="stack">
									{#each project.stack as tech}
										<li>{tech}</li>
									{/each}
								</ul>
							{/if}
						</div>

						<span class="corner tl" aria-hidden="true"></span>
						<span class="corner br" aria-hidden="true"></span>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.notable {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		padding-block: var(--space-5, 5rem);
	}

	.inner {
		max-width: 1100px;
		margin-inline: auto;
		padding-inline: var(--space-4, 3rem);
	}

	.cards {
		display: flex;
		flex-direction: column;
		gap: var(--space-3, 1.5rem);
	}

	.card {
		position: relative;
		display: grid;
		grid-template-columns: minmax(220px, 34%) 1fr;
		align-items: stretch;
		text-decoration: none;
		color: inherit;
		border: 1px solid var(--rule);
		border-radius: 14px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.02);
		isolation: isolate;
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.35s ease,
			box-shadow 0.35s ease;
		/* every other card leans the opposite way at rest — a shelf of
		   slightly-crooked snapshots rather than a rigid grid */
		transform: rotate(calc((var(--i, 0) - floor(var(--i, 0) / 2) * 2) * -0.35deg + 0.15deg));
	}

	.card:hover,
	.card:focus-visible {
		transform: rotate(0deg) translateY(-6px) scale(1.012);
		border-color: var(--accent);
		box-shadow: 0 22px 40px -20px rgba(168, 64, 44, 0.35);
		z-index: 2;
	}

	.media {
		position: relative;
		overflow: hidden;
		min-height: 230px;
	}

	.media img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.08) rotate(0.001deg);
		filter: saturate(0.92);
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
	}

	.card:hover .media img {
		transform: scale(1.16);
		filter: saturate(1.08);
	}

	.media-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			100deg,
			rgba(8, 6, 5, 0.18) 0%,
			rgba(8, 6, 5, 0) 45%
		);
		pointer-events: none;
	}

	.year {
		position: absolute;
		top: 0.7rem;
		left: 0.7rem;
		padding: 0.25rem 0.55rem;
		border-radius: 6px;
		background: rgba(8, 6, 5, 0.55);
		backdrop-filter: blur(3px);
		color: #fff;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 0.78rem;
		letter-spacing: 0.02em;
	}

	.body {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.6rem;
		padding: var(--space-3, 1.6rem) var(--space-3, 1.8rem);
	}

	.body-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.body-top h3 {
		margin: 0;
		font-family: var(--font-headline);
		font-weight: 800;
		font-size: clamp(1.2rem, 2.4vw, 1.55rem);
		letter-spacing: -0.015em;
		color: var(--ink);
	}

	.go {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid var(--rule);
		color: var(--ink-soft);
		font-size: 0.95rem;
		transform: translate(0, 0) rotate(0deg);
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), color 0.35s ease,
			border-color 0.35s ease, background 0.35s ease;
	}

	.card:hover .go {
		transform: translate(3px, -3px) rotate(45deg);
		color: #fff;
		border-color: var(--accent);
		background: var(--accent);
	}

	.blurb {
		margin: 0;
		max-width: 52ch;
		font-size: 0.98rem;
		line-height: 1.5;
		color: var(--ink-soft);
	}

	.stack {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0.2rem 0 0;
		padding: 0;
	}

	.stack li {
		padding: 0.22rem 0.6rem;
		border-radius: 5px;
		border: 1px solid var(--rule);
		font-family: var(--font-display);
		font-size: 0.78rem;
		font-style: italic;
		color: var(--ink-soft);
		transition: border-color 0.3s ease, color 0.3s ease;
	}

	.card:hover .stack li {
		border-color: var(--accent);
		color: var(--accent);
	}

	.corner {
		position: absolute;
		width: 14px;
		height: 14px;
		opacity: 0;
		transition: opacity 0.2s ease;
		pointer-events: none;
		z-index: 1;
	}

	.card:hover .corner {
		opacity: 1;
	}

	.corner.tl {
		top: 6px;
		left: 6px;
		border-top: 2px solid var(--accent);
		border-left: 2px solid var(--accent);
	}

	.corner.br {
		bottom: 6px;
		right: 6px;
		border-bottom: 2px solid var(--accent);
		border-right: 2px solid var(--accent);
	}

	@media (max-width: 720px) {
		.inner {
			padding-inline: var(--space-3, 1.5rem);
		}

		.card {
			grid-template-columns: 1fr;
			transform: none !important;
		}

		.card:hover {
			transform: translateY(-3px) !important;
		}

		.media {
			min-height: 160px;
		}

		.corner {
			display: none;
		}
	}
</style>