import Link from 'next/link';
import { Github, Package, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">IndoriLang</h3>
            <p className="text-sm text-muted-foreground">
              Programming language in authentic Indori slang. Write JavaScript with bhiya-style keywords.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-muted-foreground hover:text-foreground transition-colors">
                  Playground
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Packages</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.npmjs.com/package/@indori-lang/compiler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <Package className="h-3 w-3" />
                  @indori-lang/compiler
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@indori-lang/cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <Package className="h-3 w-3" />
                  @indori-lang/cli
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/amit373/indori-lang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <Github className="h-3 w-3" />
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/amit373/indori-lang/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Report Issue
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} IndoriLang. Made with ❤️ and lots of poha for the Indori community!
          </p>
          <p className="mt-2 italic">
            &quot;IndoriLang se coding me maja aa gaya re!&quot;
          </p>
        </div>
      </div>
    </footer>
  );
}
