# @indori-lang/compiler

The core compiler package for IndoriLang - a programming language in authentic Indori slang.

## Installation

```bash
npm install @indori-lang/compiler
```

## Usage

```typescript
import { IndoriCompiler } from '@indori-lang/compiler';

const compiler = new IndoriCompiler();
const result = compiler.compile('kaam x laa_re 10; bhiya_bol(x);');

if (result.success) {
  console.log(result.javascriptCode);
} else {
  console.error(result.error);
}
```

## API

### `IndoriCompiler`

Main compiler class that provides methods for tokenization, parsing, and transpilation.

#### Methods

- `compile(sourceCode: string): CompileResult` - Compiles IndoriLang source code to JavaScript
- `tokenize(sourceCode: string): TokenizeResult` - Tokenizes source code
- `parse(tokens: Token[]): ParseResult` - Parses tokens into AST
- `transpile(ast: Program): TranspileResult` - Transpiles AST to JavaScript

## License

MIT
