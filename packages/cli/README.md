# IndoriLang CLI

Command-line interface for IndoriLang - Run and compile IndoriLang programs from your terminal.

## Installation

```bash
npm install -g @indori-lang/cli
```

Or use with npx:

```bash
npx @indori-lang/cli run hello.il
```

## Usage

### Run a file

```bash
indori run hello.il
```

### Compile to JavaScript

```bash
indori compile program.il output.js
```

### Show version

```bash
indori version
```

### Show help

```bash
indori help
```

## Examples

```bash
# Run a program
indori run examples/hello.il

# Compile to JavaScript
indori compile examples/array.il array.js

# Run the compiled JavaScript
node array.js
```

## License

MIT
