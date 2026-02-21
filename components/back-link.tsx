import Link from 'next/link';

interface BackLinkProps {
  href: string;
  label?: string;
}

export default function BackLink({ href, label = 'cd ..' }: BackLinkProps) {
  return (
    <div className="my-8">
      <span className="font-mono opacity-50">&gt; </span>
      <Link
        href={href}
        className="opacity-50 transition delay-300 duration-300 hover:underline hover:opacity-75"
      >
        {label}
      </Link>
    </div>
  );
}
