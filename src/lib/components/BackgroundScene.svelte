<div class="bg-scene" aria-hidden="true">
	<div class="blob blob-a"></div>
	<div class="blob blob-b"></div>
	<div class="blob blob-c"></div>
	<div class="blob blob-d"></div>
	<div class="grain"></div>
</div>

<style>
	.bg-scene {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.35;
		mix-blend-mode: multiply;
	}

	.blob-a {
		width: 42vmax;
		height: 42vmax;
		top: -14vmax;
		left: -10vmax;
		background: radial-gradient(circle, #c96a52 0%, transparent 70%);
	}

	.blob-b {
		width: 38vmax;
		height: 38vmax;
		top: 8vmax;
		right: -14vmax;
		background: radial-gradient(circle, #8a9b6e 0%, transparent 70%);
		opacity: 0.28;
	}

	.blob-c {
		width: 46vmax;
		height: 46vmax;
		bottom: -20vmax;
		left: 12vmax;
		background: radial-gradient(circle, #c9a24a 0%, transparent 70%);
		opacity: 0.3;
	}

	.blob-d {
		width: 34vmax;
		height: 34vmax;
		bottom: 4vmax;
		right: 6vmax;
		background: radial-gradient(circle, #8a5f8f 0%, transparent 70%);
		opacity: 0.2;
	}

	.grain {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0.06;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' seed='4'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.16 0 0 0 0 0.14 0 0 0 0 0.12 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='8' height='8' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 5px 5px;
		image-rendering: pixelated;
	}

	@media (prefers-reduced-motion: no-preference) {
		.blob {
			animation: drift 40s ease-in-out infinite alternate;
		}

		.blob-b {
			animation-duration: 46s;
			animation-delay: -8s;
		}

		.blob-c {
			animation-duration: 52s;
			animation-delay: -20s;
		}

		.blob-d {
			animation-duration: 38s;
			animation-delay: -14s;
		}
	}

	@keyframes drift {
		from {
			transform: translate(0, 0) scale(1);
		}
		to {
			transform: translate(3vmax, -4vmax) scale(1.08);
		}
	}
</style>