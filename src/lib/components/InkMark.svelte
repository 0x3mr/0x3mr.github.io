<script>
	let { size = 96 } = $props();
</script>

<svg
	class="ink-mark"
	width={size}
	height={size}
	viewBox="0 0 120 120"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	role="img"
	aria-label="Site mark: a scribbled ink spiral"
>
	<defs>
		<filter id="inkTexture" x="-20%" y="-20%" width="140%" height="140%">
			<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
			<feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
		</filter>
	</defs>
	<g filter="url(#inkTexture)" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none">
		<path
			d="M60 14
			   C 80 14, 96 28, 96 48
			   C 96 66, 82 78, 64 78
			   C 50 78, 40 70, 40 58
			   C 40 48, 48 42, 57 42
			   C 64 42, 69 47, 69 53
			   C 69 58, 65 61, 61 61"
		/>
		<path d="M60 78 C 58 90, 52 98, 42 104" />
		<path d="M60 78 C 63 92, 70 99, 82 103" />
		<path d="M33 46 C 27 42, 24 34, 27 26" />
		<path d="M87 46 C 94 42, 97 33, 93 25" />
	</g>
</svg>

<style>
	.ink-mark {
		color: var(--ink);
	}
</style>
