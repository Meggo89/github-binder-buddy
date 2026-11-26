import { FileText } from 'lucide-react';
import { MARKDOWN_LINK_LABEL } from '../seo/markdown';

// Visible link to the page's plain-text Markdown copy. data-md-skip keeps the link itself out of
// the copy, which would otherwise link to itself.
export function MarkdownLink({ href, className = '' }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      type="text/markdown"
      data-md-skip=""
      className={`inline-flex items-center gap-2 text-sm underline underline-offset-4 decoration-accent/50 hover:text-accent transition-colors ${className}`}
    >
      <FileText className="h-4 w-4" aria-hidden="true" />
      {MARKDOWN_LINK_LABEL}
    </a>
  );
}
