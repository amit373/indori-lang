import { CodeBlock } from '@/components/CodeBlock';

export const metadata = {
  title: 'CLI Commands',
  description: 'Complete reference for IndoriLang CLI commands.',
};

const commands = [
  {
    command: 'indori run <file>',
    description: 'Run an IndoriLang file',
    example: 'indori run hello.il',
  },
  {
    command: 'indori compile <input> <output>',
    description: 'Compile IndoriLang to JavaScript',
    example: 'indori compile program.il output.js',
  },
  {
    command: 'indori version',
    description: 'Show version information',
    example: 'indori version',
  },
  {
    command: 'indori help',
    description: 'Show help information',
    example: 'indori help',
  },
];

export default function CLIPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">CLI Commands</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for all IndoriLang CLI commands.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          Install the CLI globally to use IndoriLang from the command line:
        </p>
        <CodeBlock code="npm install -g @indori-lang/cli" language="bash" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Commands</h2>
        <div className="space-y-6">
          {commands.map((cmd) => (
            <div key={cmd.command} className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2 font-mono">{cmd.command}</h3>
              <p className="text-muted-foreground mb-4">{cmd.description}</p>
              <CodeBlock code={cmd.example} language="bash" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Run a program</h3>
            <CodeBlock code={`# Create hello.il
echo 'bhiya_bol("Hello!");' > hello.il

# Run it
indori run hello.il`} language="bash" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Compile to JavaScript</h3>
            <CodeBlock code={`# Compile IndoriLang to JavaScript
indori compile program.il output.js

# Run the compiled JavaScript
node output.js`} language="bash" />
          </div>
        </div>
      </section>
    </div>
  );
}
