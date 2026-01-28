import { Token } from './types.js';
import { TokenType, Operator, OPERATOR_CHARS, ErrorMessages } from './constants.js';

/**
 * Mapping of IndoriLang keywords to their token types.
 */
const KEYWORDS: Readonly<Record<string, string>> = {
  kaam: TokenType.VAR_DECL,
  laa_re: TokenType.VAR_ASSIGN,
  agar_re: TokenType.IF,
  warna_re: TokenType.ELSE,
  bilkul_sahi: TokenType.TRUE,
  ghapla_hai: TokenType.FALSE,
  ane_re: TokenType.AND,
  ya_re: TokenType.OR,
  nako_re: TokenType.NOT,
  jabtak_re: TokenType.WHILE,
  ghuma_re: TokenType.FOR,
  jabtak_re_kar: TokenType.DO_WHILE,
  bhiya_ka: TokenType.FUNCTION,
  de_re: TokenType.RETURN,
  bhiya_bol: TokenType.CONSOLE_LOG,
  bhiya_chitav: TokenType.CONSOLE_WARN,
  bhiya_gadbad: TokenType.CONSOLE_ERROR,
  bhiya_suna: TokenType.ALERT,
  jama_re: TokenType.ARRAY_DECL,
  ketlu_re: TokenType.ARRAY_LENGTH,
  nikaal_re: TokenType.ARRAY_GET,
  ghuma_map: TokenType.ARRAY_MAP,
  chhaan_re: TokenType.ARRAY_FILTER,
  ghuma_reduce: TokenType.ARRAY_REDUCE,
  naksha_re: TokenType.OBJECT_DECL,
  dikha_re: TokenType.OBJECT_GET,
  badal_re: TokenType.OBJECT_SET,
  thoda_ruk_re: TokenType.ASYNC,
  ruk_re: TokenType.SLEEP,
  bhiya_try: TokenType.TRY,
  bhiya_catch: TokenType.CATCH,
  bhiya_finally: TokenType.FINALLY,
  poha_time: TokenType.POHA_TIME,
  jalebi_mode: TokenType.JALEBI_MODE,
  rajwada_mode: TokenType.RAJWADA_MODE,
  sarafa_night: TokenType.SARAFA_NIGHT,
} as const;

/**
 * Set of punctuation characters that are single-character tokens.
 */
const PUNCTUATION_CHARS = new Set(['{', '}', '(', ')', '[', ']', ';', ',', ':']);


/**
 * Regular expression patterns for character classification.
 */
const CHAR_PATTERNS = {
  WHITESPACE: /\s/,
  DIGIT: /[0-9]/,
  IDENTIFIER_START: /[a-zA-Z_]/,
  IDENTIFIER_CONTINUE: /[a-zA-Z0-9_]/,
} as const;

/**
 * Lexer class responsible for tokenizing IndoriLang source code.
 * Converts source code into a stream of tokens for parsing.
 */
export class Lexer {
  private readonly input: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;

  /**
   * Creates a new Lexer instance.
   *
   * @param input - The source code to tokenize
   */
  constructor(input: string) {
    this.input = input;
  }

  /**
   * Tokenizes the input source code into a list of tokens.
   *
   * @returns Array of tokens representing the source code
   * @throws Error if an unexpected character is encountered
   */
  tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.position < this.input.length) {
      const char = this.input[this.position];

      if (CHAR_PATTERNS.WHITESPACE.test(char)) {
        this.consumeWhitespace();
        continue;
      }

      if (char === '#') {
        this.consumeComment();
        continue;
      }

      if (char === '"' || char === "'") {
        tokens.push(this.consumeString());
        continue;
      }

      if (CHAR_PATTERNS.DIGIT.test(char)) {
        tokens.push(this.consumeNumber());
        continue;
      }

      if (CHAR_PATTERNS.IDENTIFIER_START.test(char)) {
        tokens.push(this.consumeIdentifier());
        continue;
      }

      if (PUNCTUATION_CHARS.has(char)) {
        tokens.push(this.createPunctuationToken(char));
        this.advance();
        continue;
      }

      if (OPERATOR_CHARS.has(char)) {
        tokens.push(this.consumeOperator());
        continue;
      }

      throw new Error(ErrorMessages.UNEXPECTED_CHARACTER(this.line, char));
    }

    tokens.push(this.createEOFToken());
    return tokens;
  }

  /**
   * Consumes whitespace characters and updates position tracking.
   */
  private consumeWhitespace(): void {
    while (
      this.position < this.input.length &&
      CHAR_PATTERNS.WHITESPACE.test(this.input[this.position])
    ) {
      if (this.input[this.position] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.position++;
    }
  }

  /**
   * Consumes a comment (from # to end of line).
   */
  private consumeComment(): void {
    while (
      this.position < this.input.length &&
      this.input[this.position] !== '\n'
    ) {
      this.position++;
    }
  }

  /**
   * Consumes a string literal, handling escape sequences.
   *
   * @returns Token representing the string literal
   * @throws Error if the string is not properly closed
   */
  private consumeString(): Token {
    const quote = this.input[this.position];
    const startLine = this.line;
    const startColumn = this.column;
    let value = '';

    this.advance(); // Skip opening quote

    while (
      this.position < this.input.length &&
      this.input[this.position] !== quote
    ) {
      if (this.input[this.position] === '\\') {
        this.advance();
        if (this.position < this.input.length) {
          value += this.input[this.position];
          this.advance();
        }
      } else {
        value += this.input[this.position];
        this.advance();
      }
    }

    if (this.position >= this.input.length) {
      throw new Error(ErrorMessages.UNCLOSED_STRING(startLine));
    }

    this.advance(); // Skip closing quote

    return {
      type: TokenType.STRING,
      value,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Consumes a numeric literal.
   *
   * @returns Token representing the number
   */
  private consumeNumber(): Token {
    const startLine = this.line;
    const startColumn = this.column;
    let value = '';

    while (
      this.position < this.input.length &&
      CHAR_PATTERNS.DIGIT.test(this.input[this.position])
    ) {
      value += this.input[this.position];
      this.advance();
    }

    return {
      type: TokenType.NUMBER,
      value: parseInt(value, 10),
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Consumes an identifier or keyword.
   *
   * @returns Token representing the identifier or keyword
   */
  private consumeIdentifier(): Token {
    const startLine = this.line;
    const startColumn = this.column;
    let value = '';

    while (
      this.position < this.input.length &&
      CHAR_PATTERNS.IDENTIFIER_CONTINUE.test(this.input[this.position])
    ) {
      value += this.input[this.position];
      this.advance();
    }

    const tokenType = KEYWORDS[value] || TokenType.IDENTIFIER;

    return {
      type: tokenType,
      value,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Consumes an operator, handling multi-character operators.
   *
   * @returns Token representing the operator
   */
  private consumeOperator(): Token {
    const startLine = this.line;
    const startColumn = this.column;
    const char = this.input[this.position];
    let value = char;

    this.advance();

    // Handle multi-character operators
    if (this.position < this.input.length) {
      const nextChar = this.input[this.position];
      const multiCharOperators = this.getMultiCharOperators(char, nextChar);
      if (multiCharOperators) {
        value = multiCharOperators;
        this.advance();
      }
    }

    return {
      type: TokenType.OPERATOR,
      value,
      line: startLine,
      column: startColumn,
    };
  }

  /**
   * Checks if two characters form a valid multi-character operator.
   *
   * @param first - First character
   * @param second - Second character
   * @returns The multi-character operator string, or null if not valid
   */
  private getMultiCharOperators(first: string, second: string): string | null {
    const multiCharMap: Record<string, Record<string, string>> = {
      [Operator.ASSIGN]: { [Operator.ASSIGN]: Operator.EQUAL },
      '!': { [Operator.ASSIGN]: Operator.NOT_EQUAL },
      [Operator.LESS_THAN]: { [Operator.ASSIGN]: Operator.LESS_THAN_OR_EQUAL },
      [Operator.GREATER_THAN]: { [Operator.ASSIGN]: Operator.GREATER_THAN_OR_EQUAL },
      [Operator.ADD]: { [Operator.ADD]: Operator.INCREMENT },
      [Operator.SUBTRACT]: { [Operator.SUBTRACT]: Operator.DECREMENT },
    };

    return multiCharMap[first]?.[second] || null;
  }

  /**
   * Creates a punctuation token.
   *
   * @param char - The punctuation character
   * @returns Token representing the punctuation
   */
  private createPunctuationToken(char: string): Token {
    return {
      type: TokenType.PUNCTUATION,
      value: char,
      line: this.line,
      column: this.column,
    };
  }

  /**
   * Creates an end-of-file token.
   *
   * @returns EOF token
   */
  private createEOFToken(): Token {
    return {
      type: TokenType.EOF,
      value: null,
      line: this.line,
      column: this.column,
    };
  }

  /**
   * Advances the position pointer and updates line/column tracking.
   */
  private advance(): void {
    if (this.position >= this.input.length) {
      return;
    }

    if (this.input[this.position] === '\n') {
      this.line++;
      this.column = 1;
    } else {
      this.column++;
    }
    this.position++;
  }
}
