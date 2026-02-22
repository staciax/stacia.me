import Footer from '@/components/footer';
import Header from '@/components/header';

import {
  RiArticleLine,
  RiGithubLine,
  RiGitRepositoryLine,
  RiTwitterLine,
} from '@remixicon/react';

const nav = [
  { path: `/blog`, text: 'Blog', icon: <RiArticleLine /> },
  { path: `/projects`, text: 'Projects', icon: <RiGitRepositoryLine /> },
];

const socials = [
  {
    url: 'https://github.com/staciax',
    icon: <RiGithubLine />,
  },
  {
    url: 'https://twitter.com/stacia__x',
    icon: <RiTwitterLine />,
  },
];

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col items-center px-5 font-mono leading-7 *:w-full *:max-w-2xl md:px-0">
      <Header items={nav} socials={socials} />
      {children}
      <Footer />
    </div>
  );
}
