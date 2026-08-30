<script>
	// Seeded PRNG (mulberry32) keeps the generated layout deterministic.
	// That means SSR and hydration receive the exact same pixel positions.
	/** @param {number} seed */
	function mulberry32(seed) {
		return function () {
			seed |= 0;
			seed = (seed + 0x6d2b79f5) | 0;
			let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	const palette = [
		'#a8402c', // terracotta
		'#8a9b6e', // sage
		'#c9a24a', // mustard
		'#8a5f8f', // plum
		'#4f7a8c', // dusty teal
		'#c96b4a' // warm rust
	];

	let { seed = 1337 } = $props();

	const pixels = $derived.by(() => {
		const rand = mulberry32(seed);
		const COUNT = 34;

		return Array.from({ length: COUNT }, () => ({
			top: `${(rand() * 100).toFixed(1)}%`,
			left: `${(rand() * 100).toFixed(1)}%`,
			size: Math.round(4 + rand() * 10),
			color: palette[Math.floor(rand() * palette.length)],
			duration: +(5 + rand() * 6).toFixed(1),
			delay: +(rand() * 6).toFixed(1),
			peak: +(0.12 + rand() * 0.14).toFixed(2)
		}));
	});
</script>

<div class="pixel-field" aria-hidden="true">
	{#each pixels as p}
		<span
			class="pixel"
			style="
				top: {p.top};
				left: {p.left};
				width: {p.size}px;
				height: {p.size}px;
				background: {p.color};
				animation-duration: {p.duration}s;
				animation-delay: {p.delay}s;
				--peak: {p.peak};
			"
		></span>
	{/each}
</div>

<style>
	.pixel-field {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	.pixel {
		position: absolute;
		border-radius: 2px;
		opacity: 0;
		image-rendering: pixelated;
		animation-name: pixel-fade;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
	}

	@keyframes pixel-fade {
		0%,
		100% {
			opacity: 0;
			transform: scale(0.6);
		}

		45%,
		55% {
			opacity: var(--peak, 0.16);
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pixel {
			animation: none;
			opacity: 0.08;
		}
	}
</style>
