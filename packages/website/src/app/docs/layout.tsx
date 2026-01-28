import Link from 'next/link';
import { DocsSidebar } from '@/components/DocsSidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        <aside className="hidden lg:block">
          <DocsSidebar />
        </aside>
        <main className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </main>
      </div>
    </div>
  );
}
