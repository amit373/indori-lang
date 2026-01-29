'use client';

import { CodeBlock } from '@/components/CodeBlock';
import { Check, X, Code, Terminal, Palette, Zap, Package, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Note: Metadata is handled in features/layout.tsx

const features = [
  {
    icon: Code,
    title: 'Indori Keywords',
    description: 'All programming concepts in authentic Indori slang',
    details: 'Use keywords like agar_re, jabtak_re, bhiya_ka instead of if, while, function',
  },
  {
    icon: Terminal,
    title: 'CLI Tool',
    description: 'Compile and run from command line',
    details: 'Install globally and run IndoriLang files with a single command',
  },
  {
    icon: Code,
    title: 'VS Code Extension',
    description: 'Syntax highlighting and auto-completion',
    details: 'Full IDE support with syntax highlighting, snippets, and more',
  },
  {
    icon: Zap,
    title: 'Playground',
    description: 'Try it online with Monaco Editor',
    details: 'No installation needed - try IndoriLang directly in your browser',
  },
  {
    icon: Package,
    title: 'TypeScript Compiler',
    description: 'Full type safety and modern tooling',
    details: 'Built with TypeScript for reliability and performance',
  },
  {
    icon: Palette,
    title: 'Easter Eggs',
    description: 'Fun Indori cultural references',
    details: 'Special functions like poha_time(), jalebi_mode(), rajwada_mode()',
  },
];

const supportedFeatures = [
  { feature: 'Numbers (integers)', supported: true },
  { feature: 'Strings', supported: true },
  { feature: 'Booleans', supported: true },
  { feature: 'Arrays', supported: true },
  { feature: 'Objects', supported: true },
  { feature: 'If/else statements', supported: true },
  { feature: 'While loops', supported: true },
  { feature: 'For loops', supported: true },
  { feature: 'Do-while loops', supported: true },
  { feature: 'Functions', supported: true },
  { feature: 'Try-catch-finally', supported: true },
  { feature: 'Arithmetic operators', supported: true },
  { feature: 'Comparison operators', supported: true },
  { feature: 'Logical operators', supported: true },
  { feature: 'Arrow functions', supported: false },
  { feature: 'Template literals', supported: false },
  { feature: 'Destructuring', supported: false },
  { feature: 'Spread operator', supported: false },
  { feature: 'Classes', supported: false },
  { feature: 'Modules (import/export)', supported: false },
  { feature: 'Async/await', supported: false },
  { feature: 'Promises', supported: false },
  { feature: 'Switch statements', supported: false },
  { feature: 'Break/Continue', supported: false },
];

const exampleCode = `# IndoriLang Feature Showcase
kaam x laa_re 10;
kaam y laa_re 20;

# Conditionals
agar_re (x + y > 25) {
  bhiya_bol("Bilkul sahi hai re!");
} warna_re {
  bhiya_bol("Kuch gadbad hai!");
}

# Functions
bhiya_ka add(a, b) {
  de_re a + b;
}

bhiya_bol("Sum: " + add(x, y));

# Arrays
jama_re numbers = [1, 2, 3, 4, 5];
bhiya_bol("Array length: " + ketlu_re(numbers));

# Objects
naksha_re person = {
  naam: "Raju",
  age: 25
};
bhiya_bol("Name: " + dikha_re(person, "naam"));

# Easter eggs
poha_time();`;

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold">Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about IndoriLang capabilities and support
          </p>
        </motion.div>

        {/* Feature Cards */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border bg-card shadow-xl hover:shadow-2xl transition-shadow min-w-0"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-2">{feature.description}</p>
                <p className="text-sm text-muted-foreground">{feature.details}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Support Matrix */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">JavaScript Features Support</h2>
          <p className="text-center text-muted-foreground mb-8">
            IndoriLang supports approximately <strong>40-45%</strong> of core JavaScript features, 
            focusing on basic imperative programming, functions, arrays, objects, and control flow.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {supportedFeatures.map((item, index) => (
                    <tr
                      key={item.feature}
                      className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                    >
                      <td className="px-6 py-4">{item.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {item.supported ? (
                          <span className="inline-flex items-center gap-2 text-green-600">
                            <Check className="h-5 w-5" />
                            Supported
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-muted-foreground">
                            <X className="h-5 w-5" />
                            Not Yet
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Example Code */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Feature Showcase</h2>
          <CodeBlock code={exampleCode} language="indori" />
          <div className="mt-6 text-center">
            <Button asChild size="lg">
              <Link href="/playground">
                Try in Playground
              </Link>
            </Button>
          </div>
        </section>

        {/* Roadmap Preview */}
        <section className="bg-muted/50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Roadmap</h2>
          <p className="text-muted-foreground mb-6">
            IndoriLang is actively being developed. Here are some features we&apos;re working on:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Arrow functions and modern ES6+ features</li>
            <li>• Module system (import/export)</li>
            <li>• Enhanced error messages</li>
            <li>• Performance optimizations</li>
            <li>• More easter eggs and cultural references</li>
          </ul>
          <div className="mt-6">
            <Button asChild variant="outline">
              <Link href="/docs/roadmap">View Full Roadmap</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
