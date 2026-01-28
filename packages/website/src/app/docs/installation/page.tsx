import { CodeBlock } from '@/components/CodeBlock';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Package, Terminal, Code } from 'lucide-react';

export const metadata = {
  title: 'Installation',
  description: 'Learn how to install IndoriLang CLI and VS Code extension.',
};

const cliInstallCode = `# Install CLI globally
npm install -g indori-lang/cli/cli

# Verify installation
indori version`;

const cliUsageCode = `# Run IndoriLang file
indori run program.il

# Compile to JavaScript
indori compile program.il output.js

# Show help
indori help`;

const npmInstallCode = `# Install compiler package
npm install @indori-lang/compiler

# Use in your code
import { IndoriCompiler } from '@indori-lang/compiler';

const compiler = new IndoriCompiler();
const result = compiler.compile(sourceCode);`;

const vscodeInstallCode = `# Install VS Code extension
code --install-extension indori-lang

# Or search for "IndoriLang" in VS Code Extensions marketplace`;

export default function InstallationPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Get IndoriLang up and running on your system in minutes.
        </p>
      </div>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">CLI Tool</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Install the IndoriLang CLI globally to compile and run <code className="bg-muted px-1 rounded">.il</code> files from the command line.
        </p>
        <CodeBlock code={cliInstallCode} language="bash" />
        <h3 className="text-xl font-semibold mt-6 mb-4">Usage</h3>
        <CodeBlock code={cliUsageCode} language="bash" />
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <Package className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">NPM Package</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Use IndoriLang compiler in your Node.js projects by installing the npm package.
        </p>
        <CodeBlock code={npmInstallCode} language="bash" />
      </section>

      <section>
        <div className="flex items-center gap-3 mb-4">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">VS Code Extension</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Get syntax highlighting, auto-completion, and snippets in VS Code.
        </p>
        <CodeBlock code={vscodeInstallCode} language="bash" />
        <p className="text-muted-foreground mt-4">
          After installation, VS Code will automatically recognize <code className="bg-muted px-1 rounded">.il</code> files 
          and provide syntax highlighting.
        </p>
      </section>

      <section className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Next Steps</h3>
        <p className="text-muted-foreground mb-4">
          Now that you have IndoriLang installed, let&apos;s write your first program!
        </p>
        <Button asChild>
          <Link href="/docs/first-program">Write Your First Program →</Link>
        </Button>
      </section>
    </div>
  );
}
