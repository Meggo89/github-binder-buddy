import type { ContentTodo } from '../../content/landing';

// Renders an H2 with a {{ CONTENT_TODO }} marker plus a bulleted brief of
// what the section should cover when the long-form copy lands. The marker
// is rendered to the DOM (not just a comment) so it is easy to find with
// inspect-element or a grep through the rendered output during content QA.
export function ContentTodoSection({ todo, headingLevel = 'h2' }: { todo: ContentTodo; headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <section className="py-12 md:py-16 border-t border-navy/5">
      <div className="max-w-3xl">
        <Heading
          className={
            headingLevel === 'h2'
              ? 'font-serif text-display-md text-navy leading-tight mb-6 text-balance'
              : 'font-serif text-2xl text-navy leading-snug mb-4'
          }
        >
          {todo.heading}
        </Heading>
        <p className="font-mono text-xs text-accent-dark tracking-widest uppercase mb-3">
          {'{{'} CONTENT_TODO {'}}'}
        </p>
        <ul className="space-y-2 text-navy-light leading-relaxed">
          {todo.cover.map((c) => (
            <li key={c} className="flex gap-3">
              <span className="text-accent flex-shrink-0">·</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
