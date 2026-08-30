/**
 * Loads every markdown post in src/lib/posts and exposes sorted metadata.
 * Each post file needs frontmatter: title, date (YYYY-MM-DD), excerpt.
 */
const modules = import.meta.glob("/src/lib/posts/*.md", { eager: true });

/** @type {{ slug: string, title: string, date: string, excerpt: string }[]} */
export const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split("/").pop()?.replace(".md", "") ?? "";
    return {
      slug,
      ...mod.metadata,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
