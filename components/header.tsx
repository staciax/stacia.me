import { ThemeToggle } from '@/components/theme-toggle';

import Link from 'next/link';
import type { ReactNode } from 'react';

type NavItem = {
  path: string;
  text: string;
  icon?: ReactNode;
};

type SocialItem = {
  url: string;
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
          <Link
            href="/"
            className="font-bold text-gray-800 text-xl dark:text-gray-200"
          >
            STACIA
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.text} className="list-none">
            <Link
              className="text-base text-fd-muted-foreground opacity-50 transition-all duration-200 hover:text-fd-accent-foreground hover:opacity-100 md:text-sm"
              href={item.path}
            >
              {item.icon && (
                <span className="flex items-center justify-center md:hidden">
                  {item.icon}
                </span>
              )}
              <span
                className={item.icon ? 'hidden md:block' : 'block text-base'}
              >
                {item.text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        {socials.map((social) => (
          <a
            key={social.url}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-fd-muted-foreground opacity-50 transition-all duration-200 hover:text-fd-accent-foreground hover:opacity-100 md:text-sm"
          >
            {social?.icon ? social.icon : <div />}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </header>
  );
}
