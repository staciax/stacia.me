// fumadocs-ui - mdx.server
// https://github.com/fuma-nama/fumadocs/blob/dev/packages/base-ui/src/mdx.tsx
// MIT License
//
import defaultMdxComponents from '@fumadocs/base-ui/mdx';
import type { LoaderConfig, LoaderOutput, Page } from 'fumadocs-core/source';
import type { ComponentProps, FC } from 'react';

// TODO: Remove this file when @fumadocs/base-ui adds createRelativeLink

/**
 * Extend the default Link component to resolve relative file paths in `href`.
 *
 * @param page the current page
 * @param source the source object
 * @param OverrideLink The component to override from
 */
export function createRelativeLink<C extends LoaderConfig>(
  source: LoaderOutput<C>,
  page: Page,
  OverrideLink: FC<ComponentProps<'a'>> = defaultMdxComponents.a,
): FC<ComponentProps<'a'>> {
  return async function RelativeLink({ href, ...props }) {
    return (
      <OverrideLink
        href={href ? source.resolveHref(href, page) : href}
        {...props}
      />
    );
  };
}
