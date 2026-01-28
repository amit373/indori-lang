'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/CodeBlock';
import { StatsCounter } from '@/components/StatsCounter';
import { ArrowRight, Play, Package, Github, Star, Download, Zap, Code, Palette, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

// Note: Metadata is handled in the root layout.tsx

const features = [
  {
    icon: Code,
    title: 'Pure Indori Keywords',
    description: 'All programming concepts in authentic Indori slang',
  },
  {
    icon: Zap,
    title: 'TypeScript Powered',
    description: 'Full type safety and modern tooling',
  },
  {
    icon: Play,
    title: 'Browser Playground',
    description: 'Try it online with Monaco Editor',
  },
  {
    icon: Terminal,
    title: 'VS Code Extension',
    description: 'Syntax highlighting and auto-completion',
  },
  {
    icon: Package,
    title: 'CLI Tool',
    description: 'Compile and run from command line',
  },
  {
    icon: Palette,
    title: 'Easter Eggs',
    description: 'Fun Indori cultural references',
  },
];

const exampleCode = `# Hello World in IndoriLang
bhiya_bol("Ram Ram bhiya log!");

# Variables and arithmetic
kaam x laa_re 10;
kaam y laa_re 20;
kaam sum laa_re x + y;

bhiya_bol("Sum: " + sum);

# Conditionals
agar_re (sum > 15) {
  bhiya_bol("Bilkul sahi hai re!");
} warna_re {
  bhiya_bol("Kuch gadbad hai!");
}

# Functions
bhiya_ka greet(name) {
  de_re "Ram Ram " + name + "!";
}

bhiya_bol(greet("bhiya"));

# Easter eggs
poha_time();`;

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-20 md:py-32">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                IndoriLang
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-foreground">
                Bhiya-Style Programming Language
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Write JavaScript with authentic Indori slang.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/playground">
                  <Play className="mr-2 h-5 w-5" />
                  Try Playground
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/docs">
                  <Package className="mr-2 h-5 w-5" />
                  Install CLI
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <a href="https://github.com/amit373/indori-lang" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
              <a
                href="https://www.npmjs.com/package/@indori-lang/compiler"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Image src="https://img.shields.io/npm/v/@indori-lang/compiler" alt="npm version" width={100} height={20} unoptimized />
              </a>
              <a
                href="https://github.com/amit373/indori-lang"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Image src="https://img.shields.io/github/stars/indori-lang/indori-lang" alt="GitHub stars" width={100} height={20} unoptimized />
              </a>
            </div>
            <div className="pt-8">
              <StatsCounter />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to write code in authentic Indori style
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border bg-card shadow-xl hover:shadow-2xl transition-shadow"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Code */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4 text-center">Example Code</h2>
            <p className="text-xl text-muted-foreground mb-8 text-center">
              See how easy it is to write IndoriLang
            </p>
            <CodeBlock code={exampleCode} language="indori" />
            <div className="mt-8 text-center">
              <Button asChild size="lg">
                <Link href="/playground">
                  Try it in Playground
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-4">How it Works</h2>
            <p className="text-xl text-muted-foreground mb-12">
              IndoriLang compiles to JavaScript, so it runs anywhere JavaScript runs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Write IndoriLang</h3>
                <p className="text-muted-foreground">
                  Write code using authentic Indori keywords like <code className="text-sm bg-muted px-1 rounded">bhiya_bol</code>, <code className="text-sm bg-muted px-1 rounded">agar_re</code>, and <code className="text-sm bg-muted px-1 rounded">jabtak_re</code>
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">Compile to JS</h3>
                <p className="text-muted-foreground">
                  Our TypeScript compiler transforms your IndoriLang code into standard JavaScript
                </p>
              </div>
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Run Anywhere</h3>
                <p className="text-muted-foreground">
                  Execute in Node.js, browsers, or any JavaScript runtime
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to start coding in Indori style?
            </h2>
            <p className="text-xl opacity-90">
              Join the community and start building with IndoriLang today
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link href="/playground">
                  <Play className="mr-2 h-5 w-5" />
                  Try Playground
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link href="/docs">
                  Read Docs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
