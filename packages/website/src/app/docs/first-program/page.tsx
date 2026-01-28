import { CodeBlock } from '@/components/CodeBlock';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'First Program',
  description: 'Write and run your first IndoriLang program.',
};

const helloWorldCode = `# Hello World in IndoriLang
bhiya_bol("Ram Ram bhiya log!");
poha_time();`;

const variablesCode = `# Variables and arithmetic
kaam x laa_re 10;
kaam y laa_re 20;
kaam sum laa_re x + y;

bhiya_bol("Sum: " + sum);
bhiya_bol("Product: " + (x * y));`;

const conditionalsCode = `# Conditionals
kaam age laa_re 18;

agar_re (age >= 18) {
  bhiya_bol("Bilkul adult ho re!");
} warna_re {
  bhiya_bol("Abhi baccha hai!");
}`;

export default function FirstProgramPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Your First Program</h1>
        <p className="text-xl text-muted-foreground">
          Let&apos;s write your first IndoriLang program and see it in action!
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hello World</h2>
        <p className="text-muted-foreground mb-4">
          Create a file called <code className="bg-muted px-1 rounded">hello.il</code> and add the following code:
        </p>
        <CodeBlock code={helloWorldCode} language="indori" />
        <p className="text-muted-foreground mt-4">
          Now run it with:
        </p>
        <CodeBlock code="indori run hello.il" language="bash" />
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/playground">
              <Play className="mr-2 h-4 w-4" />
              Try in Playground
            </Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variables and Math</h2>
        <p className="text-muted-foreground mb-4">
          IndoriLang supports variables and arithmetic operations:
        </p>
        <CodeBlock code={variablesCode} language="indori" />
        <p className="text-muted-foreground mt-4">
          In IndoriLang, <code className="bg-muted px-1 rounded">kaam x laa_re 10</code> means &quot;let x = 10&quot; in JavaScript.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Conditionals</h2>
        <p className="text-muted-foreground mb-4">
          Use <code className="bg-muted px-1 rounded">agar_re</code> (if) and <code className="bg-muted px-1 rounded">warna_re</code> (else) for conditionals:
        </p>
        <CodeBlock code={conditionalsCode} language="indori" />
      </section>

      <section className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">What&apos;s Next?</h3>
        <p className="text-muted-foreground mb-4">
          Now that you&apos;ve written your first program, explore more features:
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/docs/language-reference">
              Language Reference
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/playground">
              <Play className="mr-2 h-4 w-4" />
              Playground
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
