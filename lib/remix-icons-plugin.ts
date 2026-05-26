import * as remixIcons from '@remixicon/react';
import type { Folder, Item, Separator } from 'fumadocs-core/page-tree';
import type { LoaderPlugin } from 'fumadocs-core/source';
import { createElement, type ReactNode } from 'react';

type RemixIconName = keyof typeof remixIcons;
type RemixIconComponent = (typeof remixIcons)[RemixIconName];
type NodeWithIcon = Folder | Item | Separator;

export function remixIconsPlugin(
  options: { defaultIcon?: RemixIconName } = {},
): LoaderPlugin {
  const { defaultIcon } = options;

  function resolveIcon(icon: string | undefined = defaultIcon): ReactNode {
    if (icon === undefined) return undefined;

    const Icon = (remixIcons as Record<string, RemixIconComponent | undefined>)[
      icon
    ];

    if (!Icon) {
      console.warn(`[remix-icons-plugin] Unknown icon detected: ${icon}.`);
      return undefined;
    }

    return createElement(Icon);
  }

  function replaceIcon(node: Item): Item;
  function replaceIcon(node: Folder): Folder;
  function replaceIcon(node: Separator): Separator;
  function replaceIcon(node: NodeWithIcon): NodeWithIcon {
    if (node.icon === undefined || typeof node.icon === 'string') {
      node.icon = resolveIcon(node.icon);
    }

    return node;
  }

  return {
    name: 'remix-icons-plugin',
    transformPageTree: {
      file: replaceIcon,
      folder: replaceIcon,
      separator: replaceIcon,
    },
  };
}
