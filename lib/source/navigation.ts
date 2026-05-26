// https://github.com/fuma-nama/fumadocs/blob/dev/apps/docs/lib/source/navigation.ts
// MIT License

export function getSection(path: string | undefined) {
  if (!path) return '';
  const [dir] = path.split('/', 1);
  if (!dir) return '';
  return (
    {
      ui: 'ui',
      mdx: 'mdx',
      cli: 'cli',
      headless: 'headless',
    }[dir] ?? ''
  );
}
