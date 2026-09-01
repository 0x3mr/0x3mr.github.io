<script>
	import InkMark from '$lib/components/InkMark.svelte';
	import PixelField from '$lib/components/PixelField.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import PreviousWorkSection from '$lib/components/PreviousWorkSection.svelte';
	import NotableProjectsSection from '$lib/components/NotableProjectsSection.svelte';
	import LikesDislikesSection from '$lib/components/LikesDislikesSection.svelte';

	import parkourexImg from '$lib/imgs/ParkourEX.png';
	import parkourOriginalImg from '$lib/imgs/Drogonite Parkour Event.jpg';
	import parkourRemakeImg from '$lib/imgs/Zewail Parkour Event.png';
	import waystationImg from '$lib/work/Waystation/Waystation live on the campus of University of California, San Diego | August 27th, 2026.jpg';

	import { posts } from '$lib/posts.js';

	const latest = posts.slice(0, 5);

	/** @param {string} dateStr */
	function formatMonth(dateStr) {
		return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' });
	}

	// Rotating word in the headline — cycles through a few verbs with a
	// small typewriter-style delete/retype.
	const verbs = ['build.', 'code.', 'ship.', 'document.', 'cook.', 'game.'];

	let verbIndex = $state(0);
	let displayed = $state(verbs[0]);
	let deleting = $state(false);

	$effect(() => {
		const current = verbs[verbIndex];
		const delay = deleting ? 45 : 90;
		const holdAtFull = !deleting && displayed === current;
		const holdAtEmpty = deleting && displayed === '';

		const timer = setTimeout(
			() => {
				if (holdAtFull) {
					deleting = true;
					return;
				}

				if (holdAtEmpty) {
					deleting = false;
					verbIndex = (verbIndex + 1) % verbs.length;
					return;
				}

				displayed = deleting
					? current.slice(0, displayed.length - 1)
					: current.slice(0, displayed.length + 1);
			},
			holdAtFull ? 1400 : holdAtEmpty ? 200 : delay
		);

		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>0x3mr</title>
	<meta name="description" content="Personal portfolio site and blog" />
</svelte:head>

<section class="hero">
	<PixelField seed={1337} />

	<div class="hero-content">
		<InkMark size={84} />

		<p class="eyebrow">0x3mr</p>

		<h1>
			hi, I'm amr<br />
			I <span class="accent">{displayed}</span><span class="caret" aria-hidden="true"></span>
		</h1>

		<p class="manifesto">
			Detail-oriented, with an interest in systems, thoughtful design, and problem solving.
			Loves Minecraft and working in Java; frontend hobbyist.
		</p>

		<p class="elsewhere">
			<a class="accent-link" href="/blog">Explore my mind</a>
			<span class="sep">·</span>
			<a class="accent-link" href="/contact">Message me</a>
		</p>
	</div>
</section>

<ExperienceSection />
<PreviousWorkSection />
<NotableProjectsSection
projects={[
    {
        title: 'Parkour Event w/ Jartex Community',
        blurb: '88 concurrent players. Five stages of increasing difficulty, all built solo, custom gameplay and moderation logic in Skript, plus anti-cheat protections. Minecraft 1.8.9',
        stack: ['Skript', 'Minecraft 1.8.9', 'Event Design'],
        image: parkourOriginalImg,
        year: '2021'
    },
    {
        title: 'Parkour Event × Carry1st & Zewail eSports',
        blurb: 'Rebuilt the original 2021 event from scratch for modern Minecraft, migrating legacy gameplay and event workflows to a new engine version in partnership with Carry1st and Zewail eSports. Delivered a successful remake featuring custom-built courses, live leaderboards, and prize-driven rounds.',
        stack: ['Competitive Event', 'Minecraft', 'Event Design'],
        image: parkourRemakeImg,
        year: '2026'
    },
    {
        title: 'ParkourEX - Minecraft Plugin',
        blurb: 'A Minecraft parkour plugin with checkpoint holograms, session tracking, and configurable per-run commands, backed by SQLite persistence.',
        stack: ['Java', 'Maven', 'SQLite'],
        image: parkourexImg,
        href: 'https://github.com/0x3mr/ParkourEX',
        year: '2026'
    },
    {
        title: 'Waystation',
        blurb: 'a real-time transit display that keeps riders informed of departures, arrivals, and service disruptions at any stop. Built with SvelteKit, and OBA APIs, it delivers fast, localized, and reliable transit updates.',
        stack: ['SvelteKit', 'JavaScript'],
        image: waystationImg,
        href: 'https://opentransitsoftwarefoundation.org/onebusaway/software/waystation/',
        year: '2025 - 2026'
    }
]}
/>

<LikesDislikesSection />

<section class="latest">
	<div class="latest-head">
		<span class="chip"><span class="chip-block" aria-hidden="true"></span>notes to self, made public</span>
		<span class="rule" aria-hidden="true"></span>

		{#if posts.length > 5}
			<a class="accent-link all-link" href="/blog">all posts →</a>
		{/if}
	</div>

	{#if posts.length > 0}
		<ol class="index-list">
			{#each latest as post, i}
				<li>
					<a href="/blog/{post.slug}">
						<span class="index">{String(i + 1).padStart(2, '0')}</span>
						<span class="index-title">{post.title}</span>
						<span class="index-date">{formatMonth(post.date)}</span>
					</a>
				</li>
			{/each}
		</ol>
	{:else}
		<p class="empty">
			nothing yet for my crazy ideas :)<br />
			<em>it's all in my little notebook</em>
		</p>
	{/if}
</section>

<style>
	.hero {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		padding: var(--space-5) var(--space-2) var(--space-4);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--space-3);
		overflow: hidden;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
	}

	.eyebrow {
		margin: 0;
		color: var(--ink-soft);
		font-size: 1.1rem;
		letter-spacing: 0.08em;
	}

	h1 {
		font-family: var(--font-headline);
		font-weight: 700;
		font-size: clamp(2.4rem, 8vw, 4.6rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
		max-width: 16ch;
	}

	.accent {
		color: var(--accent);
	}

	.caret {
		display: inline-block;
		width: 0.05em;
		height: 0.85em;
		margin-left: 0.08em;
		background: var(--accent);
		vertical-align: -0.05em;
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.manifesto {
		max-width: 46ch;
		font-size: 1.2rem;
		line-height: 1.5;
		color: var(--ink-soft);
		margin: 0;
	}

	.elsewhere {
		margin: var(--space-1) 0 0;
		font-size: 0.98rem;
	}

	.sep {
		color: var(--rule);
		margin: 0 0.6rem;
	}

	.latest {
		position: relative;
		padding-block: var(--space-4);
		border-top: 1px solid var(--rule);
	}

	.latest-head {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
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
	}

	.all-link {
		flex-shrink: 0;
		font-size: 0.9rem;
	}

	.index-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.index-list li {
		border-top: 1px solid var(--rule);
	}

	.index-list li:last-child {
		border-bottom: 1px solid var(--rule);
	}

	.index-list a {
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
		padding: 1rem 0.25rem;
		text-decoration: none;
		color: var(--ink);
		transition: color 0.15s ease, gap 0.15s ease;
	}

	.index-list a:hover {
		color: var(--accent);
		gap: var(--space-3);
	}

	.index {
		font-family: var(--font-display);
		font-style: italic;
		color: var(--rule);
		font-size: 0.95rem;
		flex-shrink: 0;
		transition: color 0.15s ease;
	}

	.index-list a:hover .index {
		color: var(--accent-soft);
	}

	.latest .empty {
		margin: 0;
		color: var(--ink-soft);
		padding-block: var(--space-2) var(--space-1);
	}

	.latest .empty em {
		font-style: italic;
	}

	.index-title {
		font-family: var(--font-display);
		font-weight: 500;
		flex: 1;
	}

	.index-date {
		font-size: 0.82rem;
		font-style: italic;
		color: var(--ink-soft);
		flex-shrink: 0;
	}

	@media (max-width: 480px) {
		.hero {
			padding-top: var(--space-4);
			gap: var(--space-2);
		}

		.manifesto {
			font-size: 1.05rem;
		}

		.index-date {
			display: none;
		}

		.chip {
			font-size: 1.02rem;
		}
	}
</style>
