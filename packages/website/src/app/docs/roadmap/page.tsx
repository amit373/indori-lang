import { Check, Circle } from 'lucide-react';

export const metadata = {
  title: 'Roadmap',
  description: 'Future plans and upcoming features for IndoriLang.',
};

const roadmapItems = [
  {
    status: 'completed',
    title: 'Core Language Features',
    items: [
      'Variables and assignment',
      'Conditionals (if/else)',
      'Loops (while, for, do-while)',
      'Functions',
      'Arrays and objects',
      'Error handling',
    ],
  },
  {
    status: 'in-progress',
    title: 'Enhanced Features',
    items: [
      'Better error messages',
      'Performance optimizations',
      'More array/object methods',
    ],
  },
  {
    status: 'planned',
    title: 'Modern JavaScript Features',
    items: [
      'Arrow functions',
      'Template literals',
      'Destructuring',
      'Spread operator',
      'Default parameters',
    ],
  },
  {
    status: 'planned',
    title: 'Advanced Features',
    items: [
      'Classes and OOP',
      'Modules (import/export)',
      'Async/await',
      'Promises',
      'Switch statements',
    ],
  },
  {
    status: 'planned',
    title: 'Tooling Improvements',
    items: [
      'Better VS Code extension',
      'Language server protocol (LSP)',
      'Debugger support',
      'Type checking',
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Roadmap</h1>
        <p className="text-xl text-muted-foreground">
          Future plans and upcoming features for IndoriLang.
        </p>
      </div>

      <div className="space-y-8">
        {roadmapItems.map((section) => (
          <div key={section.title} className="border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              {section.status === 'completed' && (
                <Check className="h-6 w-6 text-green-600" />
              )}
              {section.status === 'in-progress' && (
                <Circle className="h-6 w-6 text-blue-600 fill-blue-600" />
              )}
              {section.status === 'planned' && (
                <Circle className="h-6 w-6 text-muted-foreground" />
              )}
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <span className="ml-auto text-sm text-muted-foreground capitalize">
                {section.status.replace('-', ' ')}
              </span>
            </div>
            <ul className="space-y-2 ml-9">
              {section.items.map((item) => (
                <li key={item} className="text-muted-foreground">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Contributing</h3>
        <p className="text-muted-foreground mb-4">
          Want to help build IndoriLang? Check out our contributing guide and join the community!
        </p>
        <a
          href="https://github.com/indori-lang/indori-lang"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          View on GitHub →
        </a>
      </section>
    </div>
  );
}
