<script>
	import PixelField from '$lib/components/PixelField.svelte';

	/**
	 * @typedef {{ title: string, dates: string, duration?: string, location?: string, note?: string }} Role
	 * @typedef {{ company: string, roles: Role[] }} Experience
	 */

	/** @type {Experience[]} */
const experience = [
    {
        company: 'AllayRival (formerly CentrixPvP)',
        roles: [
            {
                title: 'MC Server Developer',
                dates: 'Jun 2026 - Present',
                note: 'Deployed interactive leaderboards, holograms, and custom resource packs for Lifesteal and BoxPvP, including custom gear, boss encounters, and the Lifesteal spawn map, while maintaining server branding through custom GUIs and messaging.'
            }
        ]
    },
    {
        company: 'Open Transit Software Foundation',
        roles: [
            {
                title: 'Software Engineer - Internship',
                dates: 'Jun 2026 - Present',
                location: 'Seattle, Washington, United States',
                note: 'Deployed Waystation to production serving over 35,000+ students, hardening the application with comprehensive error handling, internationalization, dark mode, and white-label theming.'
            },
            {
                title: 'Software Engineer - Google Summer of Code',
                dates: 'May 2025 - Sep 2025',
                note: 'Built Waystation from the ground up as a GSoC contributor, the project that led to the internship above.'
            }
        ]
    },
    {
        company: 'FizzCore',
        roles: [
            {
                title: 'MC Server Administrator',
                dates: 'Feb 2021 - Jul 2021',
                note: 'Built and maintained core server systems: custom bridge maps, in-game GUIs, and a full permissions/rank hierarchy. Owned server branding and communication tooling from banners to broadcast messaging.'

            }
        ]
    },
    {
        company: 'MineoriaMC',
        roles: [
            {
                title: 'MC Server Manager',
                dates: 'Aug 2019 - Jul 2020',
                location: 'Romania',
                note: 'Lookover Skyblock game server and network-wide staff permissions & ranks.'
            }
        ]
    },
    {
        company: 'MatrixNetwork',
        roles: [
            {
                title: 'Builder',
                dates: '2018',
                note: 'Early building work, shown throughout this portfolio.'
            }
        ]
    }
];

	/** @type {HTMLElement | undefined} */
	let heading = $state(undefined);
	let visible = $state(false);

	$effect(() => {
		if (!heading) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.4 }
		);
		observer.observe(heading);
		return () => observer.disconnect();
	});
</script>

<section class="experience">
	<PixelField />

	<div class="inner">
		<div class="head" bind:this={heading} class:visible>
			<span class="chip"><span class="chip-block" aria-hidden="true"></span>Experience</span>
			<span class="rule" aria-hidden="true"></span>
		</div>

		<ol class="list">
			{#each experience as entry}
				{#each entry.roles as role, ri}
					<li class="row" class:sub={ri > 0}>
						<div class="rail" aria-hidden="true">
							<span class="dot" class:dot-sub={ri > 0}></span>
						</div>

						<div class="content">
							{#if ri === 0}
								<p class="company">{entry.company}</p>
							{/if}

							<div class="role">
								<div class="role-top">
									<h3 class="role-title">{role.title}</h3>
									<div class="role-side">
										{#if role.location}
											<span class="role-place">{role.location}</span>
										{/if}
										<span class="role-dates">
											{role.dates}{#if role.duration}<span class="dot-sep">·</span
												>{role.duration}{/if}
										</span>
									</div>
								</div>
								{#if role.note}
									<p class="role-note">{role.note}</p>
								{/if}
							</div>
						</div>
					</li>
				{/each}
			{/each}
		</ol>
	</div>
</section>

<style>
	.experience {
		position: relative;
		padding-block: var(--space-4);
		border-top: 1px solid var(--rule);
		overflow: hidden;
	}

	.inner {
		position: relative;
		z-index: 1;
	}

	.head {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-3);
		opacity: 0;
		transform: translateY(14px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.head.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		flex-shrink: 0;
		padding: 0.4rem 0.85rem 0.4rem 0.6rem;
		border-radius: 7px;
		background: rgba(168, 64, 44, 0.09);
		font-family: var(--font-headline);
		font-weight: 700;
		font-size: 1.15rem;
		letter-spacing: -0.01em;
	}

	.chip-block {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		background: var(--accent);
	}

	.rule {
		flex: 1;
		height: 1px;
		background: var(--rule);
		transform-origin: left;
		transform: scaleX(0);
		transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1) 0.15s;
	}

	.head.visible .rule {
		transform: scaleX(1);
	}

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 1.25rem 1fr;
		column-gap: var(--space-2);
	}

	.row.sub {
		margin-top: -0.4rem;
	}

	.rail {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.rail::before {
		content: '';
		position: absolute;
		top: 0.5rem;
		bottom: -1.5rem;
		width: 1px;
		background: var(--rule);
	}

	.row:last-child .rail::before {
		display: none;
	}

	.dot {
		position: relative;
		z-index: 1;
		margin-top: 0.5rem;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 4px var(--bg);
	}

	.dot-sub {
		width: 9px;
		height: 9px;
		margin-top: 1.62rem;
		background: var(--bg);
		border: 1.5px solid var(--accent);
	}

	.content {
		padding-bottom: var(--space-3);
	}

	.row.sub .content {
		padding-top: 0.9rem;
		border-top: 1px dashed var(--rule);
	}

	.company {
		margin: 0 0 0.6rem;
		font-size: 1.03rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--ink-soft);
	}

	.role-top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-2);
	}

	.role-title {
		margin: 0;
		font-family: var(--font-headline);
		font-weight: 700;
		font-size: 1.4rem;
		letter-spacing: -0.01em;
		line-height: 1.2;
	}

	.role-side {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.2rem;
		padding-top: 0.15rem;
	}

	.role-place {
		font-size: 0.92rem;
		color: var(--ink);
		text-align: right;
	}

	.role-dates {
		font-size: 1rem;
		font-style: italic;
		color: var(--ink-soft);
		text-align: right;
		white-space: nowrap;
	}

	.dot-sep {
		margin: 0 0.35em;
		font-style: normal;
		color: var(--rule);
	}

	.role-note {
		margin: 0.45rem 0 0;
		font-size: 0.96rem;
		line-height: 1.5;
		color: var(--ink-soft);
		max-width: 52ch;
	}

	@media (max-width: 560px) {
		.chip {
			font-size: 1.02rem;
		}

		.role-title {
			font-size: 1.2rem;
		}

		.role-top {
			flex-direction: column;
			gap: 0.3rem;
		}

		.role-side {
			align-items: flex-start;
		}

		.role-place,
		.role-dates {
			text-align: left;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.head,
		.rule {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>