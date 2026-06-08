import type { Thing, WithContext } from 'schema-dts';

export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  const jsonLd = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/'/g, '\\u0027');

  return (
    <script
      type="application/ld+json"
      // biome-ignore-start lint/security/noDangerouslySetInnerHtml: Next.js recommends this JSON-LD pattern with escaping.
      // react-doctor-disable-next-line
      dangerouslySetInnerHTML={{
        __html: jsonLd,
      }}
      // biome-ignore-end lint/security/noDangerouslySetInnerHtml: end JSON-LD suppression.
    />
  );
}
