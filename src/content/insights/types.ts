export type FaqQA = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
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
