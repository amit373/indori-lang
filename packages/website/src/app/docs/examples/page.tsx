import { CodeBlock } from '@/components/CodeBlock';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { examples as sharedExamples } from '@/lib/examples';

export const metadata = {
  title: 'Examples',
  description: 'Example IndoriLang programs to help you get started.',
};

// Map examples to the format expected by this page
const examples = sharedExamples.map((example) => ({
  title: example.name,
  code: example.code,
}));

export default function ExamplesPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Examples</h1>
        <p className="text-xl text-muted-foreground">
          Example IndoriLang programs to help you learn and get started.
        </p>
      </div>

      <div className="space-y-12">
        {examples.map((example, index) => (
          <section key={example.title}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">{example.title}</h2>
              <Button asChild variant="outline" size="sm">
                <Link href={`/playground?code=${btoa(example.code)}`}>
                  <Play className="mr-2 h-4 w-4" />
                  Try in Playground
                </Link>
              </Button>
            </div>
            <CodeBlock code={example.code} language="indori" />
          </section>
        ))}
      </div>

      <section className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Want More Examples?</h3>
        <p className="text-muted-foreground mb-4">
          Check out the playground to experiment with IndoriLang code, or read the full language reference.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/playground">Open Playground</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs/language-reference">Language Reference</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
