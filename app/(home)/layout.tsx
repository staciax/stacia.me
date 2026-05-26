import Footer from '@/components/footer';
import Header from '@/components/header';

import {
  RiArticleLine,
  RiGithubLine,
  RiGitRepositoryLine,
  RiTwitterLine,
} from '@remixicon/react';

const nav = [
  {
    url: `/blog`,
    text: 'Blog',
    icon: <RiArticleLine size={20} />,
  },
  {
    url: `/projects`,
    text: 'Projects',
    icon: <RiGitRepositoryLine size={20} />,
  },
];

const socials = [
  {
    url: 'https://github.com/staciax',
    label: 'GitHub',
    icon: <RiGithubLine size={20} />,
  },
  {
    url: 'https://twitter.com/stacia__x',
    label: 'Twitter',
    icon: <RiTwitterLine size={20} />,
  },
];

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-8">
      <Header items={nav} socials={socials} />
      {children}
      <Footer />
    </div>
  );
}
