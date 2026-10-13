export type FaqQA = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  // Optional: shorter <title> for search results when `title` (also the H1) runs past 60
  // characters with the brand suffix. Falls back to `title`.
  metaTitle?: string;
  excerpt: string;
  // Optional: meta description when `excerpt` (also the card text) runs past 160 characters.
  // Falls back to `excerpt`.
  metaDescription?: string;
  content: string;
  author: string;
  date: string;
  // Optional: last-modified date for Article schema. Falls back to `date`.
  dateModified?: string;
  readTime: string;
  image: string;
  category: string;
  // Optional: FAQ pairs emitted as a separate FAQPage JSON-LD block on the
  // article page. Kept out of the visible article body so schema can be
  // updated without editing prose.
  faqs?: FaqQA[];
};
