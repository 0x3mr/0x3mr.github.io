import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts.js';

export const prerender = true;

export function entries() {
	return posts.map((post) => ({ slug: post.slug }));
}

const modules = import.meta.glob('/src/lib/posts/*.md');

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const path = `/src/lib/posts/${params.slug}.md`;
	const importer = modules[path];

	if (!importer) {
		error(404, 'Post not found');
	}

	const post = /** @type {{ default: any, metadata: any }} */ (await importer());
	return {
		content: post.default,
		meta: post.metadata
	};
}
