export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore-start lint/security/noDangerouslySetInnerHtml: Next.js recommends this JSON-LD pattern with '<' escaped.
      // react-doctor-disable-next-line
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
      // biome-ignore-end lint/security/noDangerouslySetInnerHtml: end JSON-LD suppression.
    />
  );
}
