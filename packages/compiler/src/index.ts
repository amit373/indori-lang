import { Lexer } from './lexer.js';
import { Parser } from './parser.js';
import { Transpiler } from './transpiler.js';
import { TokenType, ErrorMessages } from './constants.js';
import type { Token, Program, CompileResult, TokenizeResult, ParseResult, TranspileResult } from './types.js';

export { Lexer, Parser, Transpiler };
export { 
  TokenType, 
  Operator, 
  OPERATOR_CHARS, 
  CONSOLE_STATEMENT_TYPES, 
  EASTER_EGG_TYPES,
  ErrorMessages,
  ExpectedMessages,
  TranspilerMessages
} from './constants.js';
export type * from './types.js';

/**
 * Main compiler class for IndoriLang.
 * Provides a unified interface for tokenization, parsing, and transpilation.
 */
export class IndoriCompiler {
  private lexer: Lexer;
  private parser: Parser;
  private transpiler: Transpiler;

  /**
   * Creates a new IndoriCompiler instance.
   */
  constructor() {
    // Initialize with placeholder values - will be replaced when methods are called
    this.lexer = new Lexer('');
    // Parser and transpiler will be initialized when needed
    this.parser = new Parser([{ type: TokenType.EOF, value: null, line: 1, column: 1 }]);
    this.transpiler = new Transpiler();
  }

  /**
   * Compiles IndoriLang source code to JavaScript.
   * Performs lexical analysis, parsing, and transpilation in sequence.
   *
   * @param sourceCode - The IndoriLang source code to compile
   * @returns CompileResult containing the compiled JavaScript, AST, and tokens, or an error
   */
  compile(sourceCode: string): CompileResult {
    if (typeof sourceCode !== 'string') {
      return {
        success: false,
        error: ErrorMessages.SOURCE_CODE_MUST_BE_STRING,
      };
    }

    try {
      // Lexical analysis
      this.lexer = new Lexer(sourceCode);
      const tokens = this.lexer.tokenize();

      // Parsing
      this.parser = new Parser(tokens);
      const ast = this.parser.parse();

      // Transpilation to JavaScript
      this.transpiler = new Transpiler();
      const javascriptCode = this.transpiler.transpile(ast);

      return {
        success: true,
        javascriptCode,
        ast,
        tokens,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Tokenizes IndoriLang source code without parsing or transpiling.
   *
   * @param sourceCode - The IndoriLang source code to tokenize
   * @returns TokenizeResult containing the tokens or an error
   */
  tokenize(sourceCode: string): TokenizeResult {
    if (typeof sourceCode !== 'string') {
      return {
        success: false,
        error: ErrorMessages.SOURCE_CODE_MUST_BE_STRING,
      };
    }

    try {
      this.lexer = new Lexer(sourceCode);
      const tokens = this.lexer.tokenize();
      return {
        success: true,
        tokens,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Parses tokens into an AST without transpiling.
   *
   * @param tokens - Array of tokens to parse
   * @returns ParseResult containing the AST or an error
   */
  parse(tokens: Token[]): ParseResult {
    if (!Array.isArray(tokens)) {
      return {
        success: false,
        error: ErrorMessages.TOKENS_MUST_BE_ARRAY,
      };
    }

    try {
      this.parser = new Parser(tokens);
      const ast = this.parser.parse();
      return {
        success: true,
        ast,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Transpiles an AST to JavaScript without parsing.
   *
   * @param ast - The program AST to transpile
   * @returns TranspileResult containing the JavaScript code or an error
   */
  transpile(ast: Program): TranspileResult {
    if (!ast || typeof ast !== 'object' || ast.type !== 'Program') {
      return {
        success: false,
        error: ErrorMessages.INVALID_AST_NODE,
      };
    }

    try {
      this.transpiler = new Transpiler();
      const javascriptCode = this.transpiler.transpile(ast);
      return {
        success: true,
        javascriptCode,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}
