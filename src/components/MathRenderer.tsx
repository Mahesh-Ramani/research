import { useMemo } from 'react';
import katex from 'katex';

interface Props {
  content: string;
  className?: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export function MathRenderer({ content, className = '' }: Props) {
  const html = useMemo(() => {
    const blocks: string[] = [];
    const withBlockTokens = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math: string) => {
      const index = blocks.length;
      blocks.push(
        `<div class="math-block">${katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        })}</div>`,
      );
      return `@@BLOCK_${index}@@`;
    });

    let rendered = escapeHtml(withBlockTokens).replace(/\$([^$\n]+?)\$/g, (_, math: string) =>
      katex.renderToString(math.trim(), { displayMode: false, throwOnError: false }),
    );

    rendered = rendered.replace(/@@BLOCK_(\d+)@@/g, (_, index: string) => blocks[Number(index)] ?? '');
    return rendered.replace(/\n/g, '<br />');
  }, [content]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
