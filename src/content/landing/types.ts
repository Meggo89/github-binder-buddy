// Shared types for the commercial-intent landing page architecture
// (sector pillars, niche pages, service/intent pages, resource pages).

export type FaqQA = {
  q: string;
  a: string;
};

export type ContentTodo = {
  // H2 heading exactly as it should render
  heading: string;
  // Bullet list of what the body of this section should cover when written.
  // Only displayed (alongside a {{ CONTENT_TODO }} marker) when `body` is empty.
  cover: string[];
  // Real prose for the section, as an array of paragraphs. Each string is one
  // <p>. Inline links use markdown-style `[label](/path/)` and are parsed by
  // ContentTodoSection. When set, suppresses the {{ CONTENT_TODO }} marker and
  // the cover bullets — only the heading + paragraphs render.
  body?: string[];
};

export type SubSectionTodo = {
  // For niches that contain inline H3 sub-sections (e.g. recruitment ->
  // tech recruitment, finance recruitment) rather than separate URLs.
  heading: string;
  cover: string[];
  body?: string[];
};

export type CaseStudyAnchor = {
  tag: string;
  title: string;
  href: string;
};

// ----- Sector pillars -----

export type SectorPillar = {
  slug: string;
  name: string;
  nameLower: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  // Optional hand-written hero subtitle. When set, wins over the auto-extract
  // from `intro` / `metaDescription`. Kept short (≤25 words) so it sits cleanly
  // under the H1 without wrapping into a paragraph.
  heroSubtitle?: string;
  faqs: FaqQA[];
  whoWeWorkWith?: ContentTodo;
  whatBuyersLookFor?: ContentTodo;
  ourProcess?: ContentTodo;
};

// ----- Niche pages -----

export type NicheLanding = {
  slug: string;
  pillarSlug: string;
  name: string;
  nameLower: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  // Optional hand-written hero subtitle (wins over auto-extract).
  heroSubtitle?: string;
  faqs: FaqQA[];
  contentTodos: ContentTodo[];
  // Inline H3 sub-sections (e.g. tech recruitment, finance recruitment inside
  // the broader recruitment-agencies page).
  subSections?: SubSectionTodo[];
  caseStudyAnchor?: CaseStudyAnchor;
};

// ----- Service / intent pages -----

export type ServiceLanding = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  // Optional hand-written hero subtitle (wins over auto-extract).
  heroSubtitle?: string;
  faqs: FaqQA[];
  contentTodos: ContentTodo[];
};

// ----- Resource pages -----

export type ResourceLanding = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faqs: FaqQA[];
  contentTodos: ContentTodo[];
};
