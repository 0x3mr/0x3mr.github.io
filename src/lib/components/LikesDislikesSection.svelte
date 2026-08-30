<script>
	import SectionHead from './SectionHead.svelte';

	/**
	 * Fill these in freely — order doesn't matter, tags wrap and
	 * scatter on their own.
	 * @type {{ likes?: string[], dislikes?: string[] }}
	 */
	let {
		likes = [
			'Java',
			'Minecraft',
			'Servers',
			'Drawing',
			'Designing',
            'Building',
			'Transit'
		],
		dislikes = [
			'idk (yet)',
		]
	} = $props();

	// Deterministic pseudo-random tilt/offset per tag so the cloud
	// feels hand-scattered instead of grid-aligned, but stays stable
	// across re-renders.
	/** @param {string} seed */
	function hash(seed) {
		let h = 0;
		for (let i = 0; i < seed.length; i++) {
			h = (h << 5) - h + seed.charCodeAt(i);
			h |= 0;
		}
		return h;
	}
	/** @param {string} tag */
	function tilt(tag) {
		const h = hash(tag);
		const deg = ((h % 700) / 100 - 3.5).toFixed(2); // -3.5deg .. 3.5deg
		return `rotate(${deg}deg)`;
	}
</script>

<section class="feels">
	<div class="inner">
		<SectionHead label="Things I Like / Dislike" />

		<div class="columns">
			<div class="col like">
				<p class="col-title">
					<span class="mark" aria-hidden="true"></span>
					liked
				</p>
				<div class="cloud">
					{#each likes as tag}
						<span class="tag" style="transform: {tilt(tag)}">{tag}</span>
					{/each}
				</div>
			</div>

			<div class="col dislike">
				<p class="col-title">
					<span class="mark" aria-hidden="true"></span>
					disliked
				</p>
				<div class="cloud">
					{#each dislikes as tag}
						<span class="tag" style="transform: {tilt(tag)}">{tag}</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.feels {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		padding-block: var(--space-5, 5rem);
		border-top: 1px solid var(--rule);
	}

	.inner {
		max-width: 1100px;
		margin-inline: auto;
		padding-inline: var(--space-4, 3rem);
	}

	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-4, 3rem);
	}

	.col-title {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		margin: 0 0 var(--space-3, 1.4rem);
		font-family: var(--font-headline);
		font-weight: 800;
		font-size: 1.05rem;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.like .col-title {
		color: #2f7a4d;
	}

	.dislike .col-title {
		color: #b3402f;
	}

	.mark {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.like .mark {
		background: #2f7a4d;
	}

	.dislike .mark {
		background: #b3402f;
	}

	.cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 0.6rem;
	}

	.tag {
		display: inline-block;
		padding: 0.42rem 0.85rem;
		border-radius: 7px;
		font-family: var(--font-display);
		font-size: 0.92rem;
		font-weight: 500;
		white-space: nowrap;
		cursor: default;
		transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease,
			background 0.25s ease;
	}

	.like .tag {
		background: rgba(47, 122, 77, 0.09);
		border: 1px solid rgba(47, 122, 77, 0.35);
		color: #2f7a4d;
	}

	.dislike .tag {
		background: rgba(179, 64, 47, 0.09);
		border: 1px solid rgba(179, 64, 47, 0.35);
		color: #b3402f;
	}

	.tag:hover {
		transform: rotate(0deg) scale(1.08) translateY(-2px) !important;
	}

	.like .tag:hover {
		background: #2f7a4d;
		color: #fff;
		box-shadow: 0 10px 22px -10px rgba(47, 122, 77, 0.55);
	}

	.dislike .tag:hover {
		background: #b3402f;
		color: #fff;
		box-shadow: 0 10px 22px -10px rgba(179, 64, 47, 0.55);
	}

	@media (max-width: 720px) {
		.inner {
			padding-inline: var(--space-3, 1.5rem);
		}

		.columns {
			grid-template-columns: 1fr;
			gap: var(--space-3, 2rem);
		}
	}
</style>