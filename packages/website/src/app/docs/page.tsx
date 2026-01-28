import { CodeBlock } from '@/components/CodeBlock';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export const metadata = {
  title: 'Documentation',
  description: 'Learn how to use IndoriLang - a programming language in authentic Indori slang.',
};

const exampleCode = `# Hello World in IndoriLang
bhiya_bol("Ram Ram bhiya log!");
poha_time();`;

export default function DocsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Welcome to IndoriLang</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A fun, expressive programming language that uses authentic Indori slang and compiles to JavaScript.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What is IndoriLang?</h2>
          <p className="text-muted-foreground mb-4">
            IndoriLang is a programming language that brings the vibrant Indori culture to coding. 
            Instead of traditional keywords like <code className="bg-muted px-1 rounded">if</code>, <code className="bg-muted px-1 rounded">for</code>, 
            and <code className="bg-muted px-1 rounded">function</code>, IndoriLang uses authentic Indori slang like{' '}
            <code className="bg-muted px-1 rounded">agar_re</code>, <code className="bg-muted px-1 rounded">ghuma_re</code>, 
            and <code className="bg-muted px-1 rounded">bhiya_ka</code>.
          </p>
          <p className="text-muted-foreground">
            IndoriLang compiles to JavaScript, so you can run it anywhere JavaScript runs - in Node.js, browsers, 
            or any JavaScript runtime.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <p className="text-muted-foreground mb-4">
            Get started with IndoriLang in just a few steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6">
            <li>Install the CLI tool globally</li>
            <li>Create your first <code className="bg-muted px-1 rounded">.il</code> file</li>
            <li>Run it with the <code className="bg-muted px-1 rounded">indori</code> command</li>
          </ol>
          <CodeBlock code={exampleCode} language="indori" />
          <div className="mt-4 flex gap-4">
            <Button asChild>
              <Link href="/docs/installation">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/playground">
                <Play className="mr-2 h-4 w-4" />
                Try Playground
              </Link>
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ <strong>Pure Indori Keywords</strong> - All programming concepts in Indori slang</li>
            <li>✅ <strong>TypeScript Powered</strong> - Full type safety and modern tooling</li>
            <li>✅ <strong>Browser Playground</strong> - Try it online with Monaco Editor</li>
            <li>✅ <strong>VS Code Extension</strong> - Syntax highlighting and auto-completion</li>
            <li>✅ <strong>CLI Tool</strong> - Compile and run from command line</li>
            <li>✅ <strong>Easter Eggs</strong> - Fun Indori cultural references</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/docs/installation"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-2">Installation</h3>
              <p className="text-sm text-muted-foreground">
                Learn how to install IndoriLang CLI and VS Code extension
              </p>
            </Link>
            <Link
              href="/docs/first-program"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-2">First Program</h3>
              <p className="text-sm text-muted-foreground">
                Write and run your first IndoriLang program
              </p>
            </Link>
            <Link
              href="/docs/language-reference"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-2">Language Reference</h3>
              <p className="text-sm text-muted-foreground">
                Complete guide to IndoriLang syntax and features
              </p>
            </Link>
            <Link
              href="/playground"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <h3 className="font-semibold mb-2">Playground</h3>
              <p className="text-sm text-muted-foreground">
                Try IndoriLang in your browser without installation
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
