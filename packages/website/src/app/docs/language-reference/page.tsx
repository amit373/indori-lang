import { CodeBlock } from '@/components/CodeBlock';

export const metadata = {
  title: 'Language Reference',
  description: 'Complete guide to IndoriLang syntax and features.',
};

const variablesCode = `# Variables
kaam x laa_re 10;
kaam name laa_re "Indori";`;

const conditionalsCode = `# If-else
agar_re (age >= 18) {
  bhiya_bol("Adult ho re!");
} warna_re {
  bhiya_bol("Baccha hai!");
}`;

const loopsCode = `# While loop
kaam i laa_re 0;
jabtak_re (i < 5) {
  bhiya_bol("Count: " + i);
  i = i + 1;
}

# For loop
kaam j laa_re 0;
ghuma_re (j; j < 3; j = j + 1) {
  bhiya_bol("For: " + j);
}

# Do-while
kaam k laa_re 0;
jabtak_re_kar {
  bhiya_bol("Do-while: " + k);
  k = k + 1;
} (k < 2);`;

const functionsCode = `# Functions
bhiya_ka greet(name) {
  de_re "Ram Ram " + name + "!";
}

bhiya_ka add(a, b) {
  de_re a + b;
}

bhiya_bol(greet("bhiya"));
bhiya_bol("Sum: " + add(5, 3));`;

const arraysCode = `# Arrays
jama_re fruits = ["apple", "banana", "orange"];
kaam first laa_re nikaal_re(fruits, 0);
kaam count laa_re ketlu_re(fruits);`;

const objectsCode = `# Objects
naksha_re person = {
  naam: "Raju",
  age: 25,
  city: "Indore"
};

kaam name laa_re dikha_re(person, "naam");
badal_re(person, "age", 26);`;

const errorHandlingCode = `# Try-catch-finally
bhiya_try {
  kaam result laa_re 10 / 0;
} bhiya_catch(e) {
  bhiya_gadbad("Error: " + e);
} bhiya_finally {
  bhiya_bol("Always executes");
}`;

const operatorsCode = `# Logical operators
agar_re (x > 5 ane_re y < 10) {
  bhiya_bol("Both true");
}

agar_re (nako_re isAdult) {
  bhiya_bol("Not adult");
}`;

export default function LanguageReferencePage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Language Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete guide to IndoriLang syntax, keywords, and features.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">File Extension</h2>
        <p className="text-muted-foreground">
          IndoriLang files use the <code className="bg-muted px-1 rounded">.il</code> extension.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <CodeBlock code="# This is a comment" language="indori" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variables & Assignment</h2>
        <CodeBlock code={variablesCode} language="indori" />
        <p className="text-muted-foreground mt-4">
          <code className="bg-muted px-1 rounded">kaam x laa_re 10</code> declares a variable <code className="bg-muted px-1 rounded">x</code> with value <code className="bg-muted px-1 rounded">10</code>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Data Types</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Numbers</strong> - Integers only (e.g., <code className="bg-muted px-1 rounded">10</code>, <code className="bg-muted px-1 rounded">42</code>)</li>
          <li><strong>Strings</strong> - Single or double quotes (e.g., <code className="bg-muted px-1 rounded">&quot;Hello&quot;</code>)</li>
          <li><strong>Booleans</strong> - <code className="bg-muted px-1 rounded">bilkul_sahi</code> (true) or <code className="bg-muted px-1 rounded">ghapla_hai</code> (false)</li>
          <li><strong>Arrays</strong> - <code className="bg-muted px-1 rounded">[1, 2, 3]</code></li>
          <li><strong>Objects</strong> - <code className="bg-muted px-1 rounded">{'{'} key: value {'}'}</code></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Conditionals</h2>
        <CodeBlock code={conditionalsCode} language="indori" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Loops</h2>
        <CodeBlock code={loopsCode} language="indori" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Functions</h2>
        <CodeBlock code={functionsCode} language="indori" />
        <p className="text-muted-foreground mt-4">
          <code className="bg-muted px-1 rounded">bhiya_ka</code> declares a function, and <code className="bg-muted px-1 rounded">de_re</code> returns a value.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Arrays</h2>
        <CodeBlock code={arraysCode} language="indori" />
        <p className="text-muted-foreground mt-4">
          Use <code className="bg-muted px-1 rounded">nikaal_re(arr, index)</code> to access elements and <code className="bg-muted px-1 rounded">ketlu_re(arr)</code> for length.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Objects</h2>
        <CodeBlock code={objectsCode} language="indori" />
        <p className="text-muted-foreground mt-4">
          Use <code className="bg-muted px-1 rounded">dikha_re(obj, &quot;key&quot;)</code> to access properties and <code className="bg-muted px-1 rounded">badal_re(obj, &quot;key&quot;, value)</code> to update them.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
        <CodeBlock code={errorHandlingCode} language="indori" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Operators</h2>
        <CodeBlock code={operatorsCode} language="indori" />
        <div className="mt-4 space-y-2 text-muted-foreground">
          <p><strong>Arithmetic:</strong> <code className="bg-muted px-1 rounded">+</code>, <code className="bg-muted px-1 rounded">-</code>, <code className="bg-muted px-1 rounded">*</code>, <code className="bg-muted px-1 rounded">/</code>, <code className="bg-muted px-1 rounded">++</code>, <code className="bg-muted px-1 rounded">--</code></p>
          <p><strong>Comparison:</strong> <code className="bg-muted px-1 rounded">==</code>, <code className="bg-muted px-1 rounded">!=</code>, <code className="bg-muted px-1 rounded">&lt;</code>, <code className="bg-muted px-1 rounded">&lt;=</code>, <code className="bg-muted px-1 rounded">&gt;</code>, <code className="bg-muted px-1 rounded">&gt;=</code></p>
          <p><strong>Logical:</strong> <code className="bg-muted px-1 rounded">ane_re</code> (AND), <code className="bg-muted px-1 rounded">ya_re</code> (OR), <code className="bg-muted px-1 rounded">nako_re</code> (NOT)</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Console & Output</h2>
        <CodeBlock code={`bhiya_bol("Normal log");     # console.log
bhiya_chitav("Warning log");  # console.warn
bhiya_gadbad("Error log");    # console.error
bhiya_suna("Alert message");  # alert`} language="indori" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Easter Eggs</h2>
        <CodeBlock code={`poha_time();      # "Poha time ho gaya re 😎"
jalebi_mode();    # Decorates logs with 🍬
rajwada_mode();   # Logs with 👑 emojis
sarafa_night();   # Alert "Sarafa chal reha hai 🌙"`} language="indori" />
      </section>
    </div>
  );
}
