'use client';

import { cn } from '@/lib/cn';

import type { TOCItemType } from 'fumadocs-core/toc';
import type { ComponentProps, ReactNode } from 'react';

export interface ContentPageProps {
  toc?: TOCItemType[];

  children: ReactNode;
}

// TODO: toc for posts page

export function ContentPage({ toc = [], ...props }: ContentPageProps) {
  return (
    <main className="flex w-full min-w-0 flex-col">
      <ContentBody {...props} />
    </main>
  );
}

/**
 * Add typography styles
 */
export function ContentBody({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('prose flex-1', className)}>
      {children}
    </div>
  );
}

export function ContentTitle(props: ComponentProps<'h1'>) {
  return (
    <h1 {...props} className={cn('font-semibold text-3xl', props.className)}>
      {props.children}
    </h1>
  );
}

export function ContentDescription(props: ComponentProps<'p'>) {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p
      {...props}
      className={cn('mb-8 text-fd-muted-foreground text-lg', props.className)}
    >
      {props.children}
    </p>
  );
}
