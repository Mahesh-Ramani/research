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
    // Extract and render ALL math (block + inline) against the raw, un-escaped
    // content first, so KaTeX always receives real LaTeX rather than HTML
    // entities like "&gt;" (which previously broke expressions such as "s>(d-1)^2").
    const tokens: string[] = [];
    const store = (rendered: string) => {
      const index = tokens.length;
      tokens.push(rendered);
      return `@@MATH_${index}@@`;
    };

    const withBlockTokens = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math: string) =>
      store(
        `<div class="math-block">${katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        })}</div>`,
      ),
    );

    const withInlineTokens = withBlockTokens.replace(/\$([^$\n]+?)\$/g, (_, math: string) =>
      store(katex.renderToString(math.trim(), { displayMode: false, throwOnError: false })),
    );

    let rendered = escapeHtml(withInlineTokens).replace(/\n/g, '<br />');
    rendered = rendered.replace(/@@MATH_(\d+)@@/g, (_, index: string) => tokens[Number(index)] ?? '');
    return rendered;
  }, [content]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
