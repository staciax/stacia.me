import { ThemeToggle } from '@/components/theme-toggle';

import Link from 'next/link';
import type { ReactNode } from 'react';

type NavItem = {
  url: string;
  text: string;
  icon?: ReactNode;
};

type SocialItem = {
  url: string;
  label: string;
  icon?: ReactNode;
};

type HeaderProps = {
  items: NavItem[];
  socials: SocialItem[];
};

export default function Header({ items, socials }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-background/80 py-8 backdrop-blur-lg">
      <Link href="/" className="font-bold text-fd-foreground text-xl">
        STAC/A
      </Link>
      <nav className="flex items-center gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.text}
              aria-label={Icon ? item.text : undefined}
              className="inline-flex size-5 items-center justify-center text-fd-muted-foreground/50 transition-colors duration-200 hover:text-fd-accent-foreground md:size-auto"
              href={item.url}
            >
              {Icon && (
                <span
                  className="flex size-5 items-center justify-center md:hidden"
                  aria-hidden
                >
                  {Icon}
                </span>
              )}
              <span
                className={Icon ? 'hidden text-sm md:block' : 'block text-sm'}
              >
                {item.text}
              </span>
            </Link>
          );
        })}
        {socials.map((social) => {
          const Icon = social?.icon ? social.icon : <div />;
          return (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className="inline-flex size-5 items-center justify-center text-fd-muted-foreground/50 transition-colors duration-200 hover:text-fd-accent-foreground"
            >
              {Icon}
            </a>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
