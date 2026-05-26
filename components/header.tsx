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

// TODO: bg-background

export default function Header({ items, socials }: HeaderProps) {
  return (
    <header className="flex flex-col items-center justify-center bg-background py-8 md:flex-row md:justify-between">
      <ul className="flex items-center gap-4">
        <li className="list-none">
          <Link href="/" className="font-bold text-fd-foreground text-xl">
            STAC/A
          </Link>
        </li>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.text} className="list-none">
              <Link
                aria-label={Icon ? item.text : undefined}
                className="inline-flex text-base text-fd-muted-foreground/50 transition-colors duration-200 hover:text-fd-accent-foreground md:text-sm"
                href={item.url}
              >
                {Icon && (
                  <span
                    className="flex items-center justify-center md:hidden"
                    aria-hidden
                  >
                    {Icon}
                  </span>
                )}
                <span className={Icon ? 'hidden md:block' : 'block text-base'}>
                  {item.text}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-4">
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
              className="inline-flex text-base text-fd-muted-foreground/50 transition-colors duration-200 hover:text-fd-accent-foreground md:text-sm"
            >
              {Icon}
            </a>
          );
        })}
        <ThemeToggle />
      </div>
    </header>
  );
}
