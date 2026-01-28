import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Contributing',
  description: 'How to contribute to IndoriLang development.',
};

export default function ContributingPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Contributing</h1>
        <p className="text-xl text-muted-foreground">
          Thank you for your interest in contributing to IndoriLang! We welcome contributions from the community.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Contribute</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">1. Fork the Repository</h3>
            <p className="text-muted-foreground">
              Fork the <a href="https://github.com/indori-lang/indori-lang" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IndoriLang repository</a> on GitHub.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">2. Create a Feature Branch</h3>
            <p className="text-muted-foreground mb-2">
              Create a new branch for your feature or bugfix:
            </p>
            <code className="block bg-muted p-2 rounded text-sm">
              git checkout -b feature/amazing-feature
            </code>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">3. Make Your Changes</h3>
            <p className="text-muted-foreground">
              Make your changes and ensure they follow the project&apos;s coding standards. Run tests to make sure everything works.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">4. Commit Your Changes</h3>
            <p className="text-muted-foreground mb-2">
              Commit your changes with a clear message:
            </p>
            <code className="block bg-muted p-2 rounded text-sm">
              git commit -m &apos;Add amazing feature&apos;
            </code>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">5. Push and Create Pull Request</h3>
            <p className="text-muted-foreground mb-2">
              Push your branch and create a pull request:
            </p>
            <code className="block bg-muted p-2 rounded text-sm">
              git push origin feature/amazing-feature
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Development Setup</h2>
        <div className="border rounded-lg p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Node.js 18+</li>
              <li>pnpm (for workspace management)</li>
              <li>TypeScript knowledge</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Setup Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Clone your fork: <code className="bg-muted px-1 rounded">git clone https://github.com/your-username/indori-lang.git</code></li>
              <li>Install dependencies: <code className="bg-muted px-1 rounded">pnpm install</code></li>
              <li>Build packages: <code className="bg-muted px-1 rounded">pnpm run build</code></li>
              <li>Run tests: <code className="bg-muted px-1 rounded">pnpm test</code></li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Areas to Contribute</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Language Features</h3>
            <p className="text-sm text-muted-foreground">
              Add new language features, keywords, or syntax improvements.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Compiler</h3>
            <p className="text-sm text-muted-foreground">
              Improve the compiler, parser, or transpiler.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">
              Improve docs, add examples, or fix typos.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Tooling</h3>
            <p className="text-sm text-muted-foreground">
              Enhance CLI, VS Code extension, or playground.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Questions?</h3>
        <p className="text-muted-foreground mb-4">
          If you have questions or need help, feel free to open an issue on GitHub.
        </p>
        <Button asChild>
          <a href="https://github.com/indori-lang/indori-lang" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </section>
    </div>
  );
}
