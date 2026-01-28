'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FileText, Play, Zap, Code, Package, Terminal, BookOpen, Rocket } from 'lucide-react';

const docsNav = [
  {
    title: 'Getting Started',
    items: [
      { href: '/docs', label: 'Introduction', icon: BookOpen },
      { href: '/docs/installation', label: 'Installation', icon: Package },
      { href: '/docs/first-program', label: 'First Program', icon: Rocket },
    ],
  },
  {
    title: 'Language Reference',
    items: [
      { href: '/docs/language-reference', label: 'Overview', icon: FileText },
      { href: '/docs/examples', label: 'Examples', icon: Code },
    ],
  },
  {
    title: 'Tooling',
    items: [
      { href: '/docs/cli', label: 'CLI Commands', icon: Terminal },
      { href: '/docs/vscode', label: 'VS Code Extension', icon: Code },
      { href: '/playground', label: 'Playground', icon: Play },
    ],
  },
  {
    title: 'Resources',
    items: [
      { href: '/features', label: 'Features', icon: Zap },
      { href: '/docs/roadmap', label: 'Roadmap', icon: Rocket },
      { href: '/docs/contributing', label: 'Contributing', icon: Code },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-20 space-y-6">
      {docsNav.map((section) => (
        <div key={section.title}>
          <h3 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h3>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/docs' && pathname?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
