<script>
	// Eagerly import every image/video under every folder in src/lib/work/.
	// Vite resolves this at build time — add/remove folders or files and
	// this list updates automatically, no code changes needed.
	const files = import.meta.glob(
		'/src/lib/work/**/*.{png,jpg,jpeg,gif,webp,mp4,webm,mov}',
		{ eager: true, query: '?url', import: 'default' }
	);
	/** @param {string} name */
	function toTag(name) {
		if (name.startsWith('_')) return null;
		return name
			.replace(/\.[^.]+$/, '')
			.replace(/^\d+[-_]?/, '')
			.replace(/[-_]+/g, ' ')
			.replace(/\b\w/g, (c) => c.toUpperCase());
	}
	/** @param {string} path */
	function isVideo(path) {
		return /\.(mp4|webm|mov)$/i.test(path);
	}
	/** @type {Record<string, { src: string, tag: string | null }[]>} */
	const grouped = {};
	for (const path in files) {
		// path looks like: /src/lib/work/AllayRival/npc.gif
		const match = path.match(/\/work\/([^/]+)\/([^/]+)$/);
		if (!match) continue;
		const [, folder, filename] = match;
		if (!grouped[folder]) grouped[folder] = [];
		grouped[folder].push({
			src: /** @type {string} */ (files[path]),
			tag: toTag(filename)
		});
	}
	const groups = Object.keys(grouped)
		.sort((a, b) => a.localeCompare(b))
		.map((title) => ({
			title,
			images: grouped[title].sort((a, b) => a.src.localeCompare(b.src))
		}));
	/** @type {{ src: string, tag: string | null } | null} */
	let preview = $state(null);
	/** @param {{ src: string, tag: string | null }} img */
	function open(img) {
		preview = img;
	}
	function close() {
		preview = null;
	}
	/** @param {KeyboardEvent} e */
	function onKeydown(e) {
		if (e.key === 'Escape') close();
	}
	// --- Playback scheduler.
	// at most 2 videos autoplay at a time, chosen randomly
	// from whatever is currently in the viewport. Each plays once
	// (no loop); when it finishes, drop it and randomly pick a
	// replacement from the still-visible pool. Hover is a separate,
	// higher-priority channel: hovering a video always plays it
	// (looping, since a user staring at one wants continuous playback)
	// and releases its autoplay slot back to the pool; leaving stops
	// and resets it.
	const MAX_AUTOPLAY = 2;
	/** @type {Set<HTMLVideoElement>} videos currently intersecting the viewport */
	const visibleVideos = new Set();
	/** @type {Set<HTMLVideoElement>} videos currently in one of the autoplay slots */
	const activeVideos = new Set();
	/** @type {Set<HTMLVideoElement>} videos currently under the pointer */
	const hoveredVideos = new Set();
	/** @param {HTMLVideoElement[]} arr */
	function shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}
	// Fill any open autoplay slots with random picks from the visible,
	// not-already-active, not-hovered pool.
	function fillAutoplaySlots() {
		const needed = MAX_AUTOPLAY - activeVideos.size;
		if (needed <= 0) return;
		const available = shuffle(
			[...visibleVideos].filter((v) => !activeVideos.has(v) && !hoveredVideos.has(v))
		);
		for (const v of available.slice(0, needed)) {
			activeVideos.add(v);
			try {
				v.currentTime = 0;
			} catch {
				/* not seekable yet, ignore */
			}
			v.loop = false;
			v.play().catch(() => activeVideos.delete(v));
		}
	}
	/** @param {HTMLVideoElement} node */
	function releaseAutoplaySlot(node) {
		if (activeVideos.delete(node)) fillAutoplaySlots();
	}
	/** @param {HTMLVideoElement} node */
	function registerAutoplay(node) {
		/** @type {IntersectionObserver | null} */
		let observer = null;
		function onEnded() {
			node.pause();
			node.currentTime = 0;
			releaseAutoplaySlot(node);
		}
		node.addEventListener('ended', onEnded);
		if (typeof IntersectionObserver !== 'undefined') {
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							visibleVideos.add(node);
							fillAutoplaySlots();
						} else {
							visibleVideos.delete(node);
							if (activeVideos.has(node)) {
								activeVideos.delete(node);
								node.pause();
							}
							fillAutoplaySlots();
						}
					}
				},
				{ rootMargin: '150px', threshold: 0.15 }
			);
			observer.observe(node);
		} else {
			// No IntersectionObserver support: just treat as always visible.
			visibleVideos.add(node);
			fillAutoplaySlots();
		}
		return {
			destroy() {
				observer?.unobserve(node);
				node.removeEventListener('ended', onEnded);
				visibleVideos.delete(node);
				releaseAutoplaySlot(node);
				hoveredVideos.delete(node);
			}
		};
	}
	/** @param {MouseEvent} e */
	function onVideoHoverStart(e) {
		const node = /** @type {HTMLVideoElement} */ (e.currentTarget);
		hoveredVideos.add(node);
		releaseAutoplaySlot(node); // hover takes the slot back for others to use
		node.loop = true;
		node.play().catch(() => {});
	}
	/** @param {MouseEvent} e */
	function onVideoHoverEnd(e) {
		const node = /** @type {HTMLVideoElement} */ (e.currentTarget);
		hoveredVideos.delete(node);
		node.loop = false;
		node.pause();
		node.currentTime = 0;
		fillAutoplaySlots();
	}
	// --- Masonry: plain CSS multi-column layout.
	// This is the robust way to get a gapless masonry with mixed
	// image/video aspect ratios: each .tile just flows into whichever
	// column is currently shortest, sized by its own intrinsic aspect
	// ratio (no JS height math, no manual grid-row spans). We tried a
	// CSS-grid + ResizeObserver row-span approach before; it produced
	// large gaps and caused videos to collapse into a single column
	// because grid's `dense` packing fights with any 2-column spans.
	// Multi-column layout doesn't have that failure mode.
</script>
<svelte:window onkeydown={onKeydown} />
{#if groups.length > 0}
	<section class="work">
		<div class="inner">
			<div class="head">
				<span class="rule" aria-hidden="true"></span>
				<span class="chip"><span class="chip-block" aria-hidden="true"></span>Previous Work</span>
				<span class="rule" aria-hidden="true"></span>
			</div>
			<div class="groups">
				{#each groups as group}
					<div class="group">
						<p class="group-title">
							{group.title}
							<span>— {group.images.length} pieces</span>
						</p>
						<div class="grid">
							{#each group.images as img}
								{@const isVid = isVideo(img.src)}
								<figure class="tile">
									<button
										class="tile-btn"
										type="button"
										onclick={() => open(img)}
										aria-label="View larger image"
									>
										{#if isVid}
											<video
												use:registerAutoplay
												onmouseenter={onVideoHoverStart}
												onmouseleave={onVideoHoverEnd}
												src={img.src}
												muted
												playsinline
												preload="metadata"
											></video>
										{:else}
											<img src={img.src} alt={group.title} loading="lazy" />
										{/if}
									</button>
									<div class="scrim" aria-hidden="true"></div>
									{#if img.tag}
										<figcaption class="tags">
											<span class="tag">{img.tag}</span>
										</figcaption>
									{/if}
									<span class="corner tl" aria-hidden="true"></span>
									<span class="corner br" aria-hidden="true"></span>
								</figure>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	{#if preview}
		<div
			class="lightbox"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={(e) => {
				if (e.target === e.currentTarget) close();
			}}
			onkeydown={(e) => {
				if (e.key === 'Escape') close();
			}}
		>
			<button class="lightbox-close" type="button" onclick={close} aria-label="Close preview">
				✕
			</button>
			<div class="lightbox-inner">
				{#if isVideo(preview.src)}
					<video src={preview.src} autoplay muted loop playsinline></video>
				{:else}
					<img src={preview.src} alt={preview.tag ?? ''} />
				{/if}
				<div class="lightbox-scrim" aria-hidden="true"></div>
				{#if preview.tag}
					<span class="lightbox-tag">{preview.tag}</span>
				{/if}
			</div>
		</div>
	{/if}
{/if}
<style>
	.work {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		padding-block: var(--space-5, 5rem);
		overflow: hidden;
	}
	.inner {
		max-width: 1760px;
		margin-inline: auto;
		padding-inline: var(--space-4, 3rem);
		position: relative;
		z-index: 1;
	}
	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2, 0.75rem);
		margin-bottom: var(--space-4, 3rem);
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
		max-width: 220px;
		height: 1px;
		background: var(--rule);
	}
	.groups {
		display: flex;
		flex-direction: column;
		gap: var(--space-5, 5rem);
	}
	.group-title {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		margin: 0 0 var(--space-2, 1.3rem);
		font-family: var(--font-headline);
		font-weight: 800;
		font-size: clamp(1.6rem, 3vw, 2.1rem);
		letter-spacing: -0.02em;
		color: var(--ink);
	}
	.group-title::before {
		content: '';
		flex-shrink: 0;
		width: 22px;
		height: 22px;
		border-radius: 5px;
		background: var(--accent);
		transform: rotate(-8deg);
	}
	.group-title span {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 500;
		font-size: 0.9rem;
		color: var(--ink-soft);
	}
	/* True masonry via CSS multi-column layout. Each .tile is an
	   inline-block that flows into whichever column currently has the
	   least content — that's what makes rows self-pack with no gaps,
	   regardless of image/video aspect ratio. `break-inside: avoid`
	   stops a tile being visually cut across two columns. */
	.grid {
		columns: 3;
		column-gap: var(--space-3, 1.5rem);
	}
	.tile {
		position: relative;
		overflow: hidden;
		border: 1px solid var(--rule);
		background: rgba(0, 0, 0, 0.03);
		border-radius: 10px;
		display: inline-block;
		width: 100%;
		break-inside: avoid;
		-webkit-column-break-inside: avoid;
		margin-bottom: var(--space-3, 1.5rem);
	}
	.tile-btn {
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		border: none;
		background: none;
		cursor: zoom-in;
		font: inherit;
	}
	.tile img,
	.tile video {
		display: block;
		width: 100%;
		height: auto;
		transition: transform 0.5s ease;
	}
	.tile:hover img,
	.tile:hover video {
		transform: scale(1.05);
	}
	.scrim {
		position: absolute;
		inset: auto 0 0 0;
		height: 46%;
		background: linear-gradient(to top, rgba(8, 6, 5, 0.75) 0%, rgba(8, 6, 5, 0) 100%);
		pointer-events: none;
	}
	.tags {
		position: absolute;
		left: 0.9rem;
		right: 0.9rem;
		bottom: 0.75rem;
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
		gap: 0.45rem;
		pointer-events: none;
	}
	.tag {
		max-width: 100%;
		overflow-wrap: break-word;
		word-break: break-word;
		text-align: right;
		font-family: var(--font-headline);
		font-size: 1.28rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: #fff;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.55);
	}
	.corner {
		position: absolute;
		width: 14px;
		height: 14px;
		opacity: 0;
		transition: opacity 0.2s ease;
		pointer-events: none;
	}
	.tile:hover .corner {
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
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-3, 1.5rem);
		background: rgba(10, 8, 7, 0.86);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		cursor: zoom-out;
		animation: fade-in 0.18s ease;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.lightbox-inner {
		position: relative;
		max-width: min(92vw, 1200px);
		max-height: 88vh;
		cursor: default;
		overflow: hidden;
	}
	.lightbox-inner img,
	.lightbox-inner video {
		display: block;
		max-width: 100%;
		max-height: 88vh;
		width: auto;
		height: auto;
		border: 1px solid rgba(255, 255, 255, 0.12);
	}
	.lightbox-scrim {
		position: absolute;
		inset: auto 0 0 0;
		height: 30%;
		background: linear-gradient(to top, rgba(8, 6, 5, 0.7) 0%, rgba(8, 6, 5, 0) 100%);
		pointer-events: none;
	}
	.lightbox-tag {
		position: absolute;
		right: 1.1rem;
		bottom: 1rem;
		font-family: var(--font-headline);
		font-size: 1.2rem;
		font-weight: 800;
		color: #fff;
		text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
		pointer-events: none;
	}
	.lightbox-close {
		position: fixed;
		top: var(--space-2, 1.5rem);
		right: var(--space-2, 1.5rem);
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.25);
		background: rgba(255, 255, 255, 0.06);
		color: #fff;
		font-size: 1rem;
		cursor: pointer;
		transition: background 0.15s ease;
	}
	.lightbox-close:hover {
		background: rgba(255, 255, 255, 0.16);
	}
	/* Responsive scale: four steps, everything narrows together
	   (outer padding, inner padding, column count, gaps, rule length)
	   instead of different properties changing at different, arbitrary
	   breakpoints. */
	@media (max-width: 1024px) {
		.work {
			padding-block: var(--space-4, 3.5rem);
		}
		.inner {
			padding-inline: var(--space-3, 2rem);
		}
		.grid {
			columns: 2;
		}
	}
	@media (max-width: 720px) {
		.work {
			padding-block: var(--space-3, 2.5rem);
		}
		.inner {
			padding-inline: var(--space-3, 1.5rem);
		}
		.groups {
			gap: var(--space-4, 3rem);
		}
		.grid {
			column-gap: var(--space-2, 1rem);
		}
		.tile {
			margin-bottom: var(--space-2, 1rem);
		}
		.head {
			gap: var(--space-1, 0.5rem);
			margin-bottom: var(--space-3, 2rem);
		}
		.rule {
			max-width: 60px;
		}
		.corner {
			display: none;
		}
		.group-title {
			flex-wrap: wrap;
			margin-bottom: var(--space-2, 1rem);
		}
		.lightbox {
			padding: var(--space-2, 1rem);
		}
		.lightbox-close {
			top: var(--space-1, 1rem);
			right: var(--space-1, 1rem);
		}
	}
	@media (max-width: 480px) {
		.inner {
			padding-inline: var(--space-2, 1rem);
		}
		.grid {
			columns: 1;
		}
		.group-title {
			gap: 0.45rem;
		}
		.group-title::before {
			width: 17px;
			height: 17px;
		}
		.group-title span {
			width: 100%;
			margin-left: 1.45rem;
			font-size: 0.82rem;
		}
		.tags {
			right: 0.7rem;
			bottom: 0.6rem;
		}
		.tag {
			font-size: 0.95rem;
		}
		.lightbox-tag {
			font-size: 1rem;
			right: 0.8rem;
			bottom: 0.75rem;
		}
	}
</style>