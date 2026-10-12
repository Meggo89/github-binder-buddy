import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ContentTable, ContentTodo, SubSectionTodo } from '../../content/landing';

// {{ STATS_CHECK: ... }} markers live in the source files so Leo can grep
// for unverified industry benchmarks before publishing. They must never reach
// the rendered DOM (visitors / Google would otherwise see them inline). Strip
// the marker including its leading whitespace; then tidy any space that ends
// up sitting before punctuation as a result.
function stripStatsCheck(paragraph: string): string {
  return paragraph
    .replace(/\s*\{\{\s*STATS_CHECK:[^}]*\}\}\s*/g, ' ')
    .replace(/ +([.,;:!?])/g, '$1')
    .trim();
}

// Render a paragraph that may contain markdown-style inline links, e.g.
//   "We explain this on the [process page](/process/) at length."
// Each match becomes a React Router <Link>; everything else stays text.
function renderInlineLinks(paragraph: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = pattern.exec(paragraph)) !== null) {
    if (match.index > lastIndex) {
      out.push(<Fragment key={`t${key++}`}>{paragraph.slice(lastIndex, match.index)}</Fragment>);
    }
    const [, label, href] = match;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      out.push(
        <a
          key={`l${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy underline decoration-accent/40 underline-offset-4 hover:text-accent-dark"
        >
          {label}
        </a>
      );
    } else {
      out.push(
        <Link
          key={`l${key++}`}
          to={href}
          className="text-navy underline decoration-accent/40 underline-offset-4 hover:text-accent-dark"
        >
          {label}
        </Link>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < paragraph.length) {
    out.push(<Fragment key={`t${key++}`}>{paragraph.slice(lastIndex)}</Fragment>);
  }
  return out;
}

function ComparisonTable({ table }: { table: ContentTable }) {
  return (
    <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[36rem] text-left text-base border-collapse">
        <caption className="text-left font-mono text-xs text-navy-light tracking-widest uppercase mb-3">
          {table.caption}
        </caption>
        <thead>
          <tr>
            {table.columns.map((c, i) => (
              <th key={i} scope="col" className="py-3 pr-4 align-bottom font-semibold text-navy border-b-2 border-navy/15">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="border-b border-navy/10">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="py-3 pr-4 align-top font-medium text-navy">
                    {cell}
                  </th>
                ) : (
                  <td key={c} className="py-3 pr-4 align-top text-navy-light leading-relaxed">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Renders an H2/H3 section. When `body` is populated, renders the prose;
// otherwise renders the {{ CONTENT_TODO }} marker and the bullet brief so
// half-written pages stay visually obvious during content QA.
export function ContentTodoSection({
  todo,
  headingLevel = 'h2',
}: {
  todo: ContentTodo | SubSectionTodo;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  const hasBody = !!todo.body && todo.body.length > 0;
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
        {hasBody ? (
          <div className="space-y-5 text-body-lg text-navy-light leading-relaxed">
            {todo.body!.map((p, i) => (
              <Fragment key={i}>
                <p>{renderInlineLinks(stripStatsCheck(p))}</p>
                {i === 0 && 'table' in todo && todo.table && <ComparisonTable table={todo.table} />}
              </Fragment>
            ))}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}
