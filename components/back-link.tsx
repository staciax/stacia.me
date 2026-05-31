import Link from 'next/link';

interface BackLinkProps {
  href: string;
  label?: string;
}

export default function BackLink({ href, label = 'cd ..' }: BackLinkProps) {
  return (
    <div className="my-8">
      <span className="font-mono text-fd-muted-foreground text-sm">&gt; </span>
      <Link
        href={href}
        className="not-prose text-fd-muted-foreground text-sm transition delay-300 duration-300 hover:text-fd-foreground hover:underline"
      >
        {label}
      </Link>
    </div>
  );
}
