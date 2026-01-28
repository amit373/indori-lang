import { CodeBlock } from '@/components/CodeBlock';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'VS Code Extension',
  description: 'Install and use the IndoriLang VS Code extension for syntax highlighting and more.',
};

export default function VSCodePage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">VS Code Extension</h1>
        <p className="text-xl text-muted-foreground">
          Get full IDE support for IndoriLang in VS Code with syntax highlighting, snippets, and more.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          Install the IndoriLang extension from the VS Code marketplace:
        </p>
        <div className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Method 1: From VS Code</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Open VS Code</li>
              <li>Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)</li>
              <li>Search for &quot;IndoriLang&quot;</li>
              <li>Click Install</li>
            </ol>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Method 2: From Command Line</h3>
            <CodeBlock code="code --install-extension indori-lang" language="bash" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>✅ <strong>Syntax Highlighting</strong> - Color-coded IndoriLang keywords and syntax</li>
          <li>✅ <strong>Auto Bracket Closing</strong> - Automatically closes brackets, braces, and quotes</li>
          <li>✅ <strong>Auto-indentation</strong> - Smart indentation for code blocks</li>
          <li>✅ <strong>Snippets</strong> - Quick code snippets for common patterns</li>
          <li>✅ <strong>File Association</strong> - Automatic recognition of <code className="bg-muted px-1 rounded">.il</code> files</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Snippets</h2>
        <p className="text-muted-foreground mb-4">
          The extension includes helpful snippets for common IndoriLang patterns:
        </p>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <p className="font-mono text-sm mb-2">Type <code className="bg-muted px-1 rounded">if</code> and press Tab</p>
            <CodeBlock code={`agar_re (condition) {
  $0
}`} language="indori" />
          </div>
          <div className="border rounded-lg p-4">
            <p className="font-mono text-sm mb-2">Type <code className="bg-muted px-1 rounded">func</code> and press Tab</p>
            <CodeBlock code={`bhiya_ka functionName() {
  $0
}`} language="indori" />
          </div>
          <div className="border rounded-lg p-4">
            <p className="font-mono text-sm mb-2">Type <code className="bg-muted px-1 rounded">while</code> and press Tab</p>
            <CodeBlock code={`jabtak_re (condition) {
  $0
}`} language="indori" />
          </div>
        </div>
      </section>

      <section className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
        <p className="text-muted-foreground mb-4">
          If you encounter any issues with the VS Code extension, please report them on GitHub.
        </p>
        <Button asChild variant="outline">
          <a href="https://github.com/indori-lang/indori-lang/issues" target="_blank" rel="noopener noreferrer">
            Report Issue
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </section>
    </div>
  );
}
