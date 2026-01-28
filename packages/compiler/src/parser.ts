import {
  Token,
  Program,
  Statement,
  Expression,
  VariableDeclaration,
  FunctionDeclaration,
  IfStatement,
  WhileStatement,
  ForStatement,
  DoWhileStatement,
  TryCatchStatement,
  ConsoleStatement,
  AlertStatement,
  ArrayDeclaration,
  ObjectDeclaration,
  EasterEggStatement,
  ExpressionStatement,
  ReturnStatement,
  CallExpression,
} from './types.js';
import { TokenType, Operator, ErrorMessages, ExpectedMessages, CONSOLE_STATEMENT_TYPES, EASTER_EGG_TYPES } from './constants.js';

/**
 * Parser class responsible for converting tokens into an Abstract Syntax Tree (AST).
 * Implements a recursive descent parser for IndoriLang.
 */
export class Parser {
  private readonly tokens: Token[];
  private current: number = 0;

  /**
   * Creates a new Parser instance.
   *
   * @param tokens - Array of tokens to parse
   */
  constructor(tokens: Token[]) {
    if (!Array.isArray(tokens)) {
      throw new Error(ErrorMessages.TOKENS_MUST_BE_ARRAY);
    }
    // Allow empty array for initialization, but check during parsing
    this.tokens = tokens;
  }

  /**
   * Parses the token stream into a Program AST node.
   *
   * @returns Program AST node containing all statements
   * @throws Error if parsing fails
   */
  parse(): Program {
    if (this.tokens.length === 0 || (this.tokens.length === 1 && this.tokens[0].type === TokenType.EOF)) {
      return {
        type: 'Program',
        body: [],
      };
    }

    const statements: Statement[] = [];

    while (!this.isAtEnd()) {
      statements.push(this.statement());
    }

    return {
      type: 'Program',
      body: statements,
    };
  }

  /**
   * Parses a statement from the token stream.
   *
   * @returns Parsed statement node
   * @throws Error if statement cannot be parsed
   */
  private statement(): Statement {
    if (this.match(TokenType.VAR_DECL)) return this.variableDeclaration();
    if (this.match(TokenType.FUNCTION)) return this.functionDeclaration();
    if (this.match(TokenType.IF)) return this.ifStatement();
    if (this.match(TokenType.WHILE)) return this.whileStatement();
    if (this.match(TokenType.FOR)) return this.forStatement();
    if (this.match(TokenType.DO_WHILE)) return this.doWhileStatement();
    if (this.match(TokenType.TRY)) return this.tryCatchStatement();
    if (this.match(TokenType.CONSOLE_LOG) || this.match(TokenType.CONSOLE_WARN) || this.match(TokenType.CONSOLE_ERROR)) {
      return this.consoleStatement();
    }
    if (this.match(TokenType.ALERT)) return this.alertStatement();
    if (this.match(TokenType.ARRAY_DECL)) return this.arrayDeclaration();
    if (this.match(TokenType.OBJECT_DECL)) return this.objectDeclaration();
    if (this.match(TokenType.POHA_TIME) || this.match(TokenType.JALEBI_MODE) || this.match(TokenType.RAJWADA_MODE) || this.match(TokenType.SARAFA_NIGHT)) {
      return this.easterEggStatement();
    }
    if (this.match(TokenType.RETURN)) return this.returnStatement();

    return this.expressionStatement();
  }


  /**
   * Parses a variable declaration statement.
   *
   * @returns VariableDeclaration AST node
   * @throws Error if declaration syntax is invalid
   */
  private variableDeclaration(): VariableDeclaration {
    const name = this.consume(TokenType.IDENTIFIER, ExpectedMessages.VARIABLE_NAME);
    this.consume(TokenType.VAR_ASSIGN, ExpectedMessages.VAR_ASSIGN);
    const value = this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'VariableDeclaration',
      name: name.value as string,
      value,
    };
  }

  /**
   * Parses a function declaration statement.
   *
   * @returns FunctionDeclaration AST node
   * @throws Error if function syntax is invalid
   */
  private functionDeclaration(): FunctionDeclaration {
    const name = this.consume(TokenType.IDENTIFIER, ExpectedMessages.FUNCTION_NAME);
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');
    const params = this.parseParameterList();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
    const body = this.parseBlock();

    return {
      type: 'FunctionDeclaration',
      name: name.value as string,
      params,
      body,
    };
  }

  /**
   * Parses a parameter list from the token stream.
   *
   * @returns Array of parameter names
   */
  private parseParameterList(): string[] {
    const params: string[] = [];

    if (!this.check(TokenType.PUNCTUATION, ')')) {
      do {
        params.push(this.consume(TokenType.IDENTIFIER, ExpectedMessages.PARAMETER_NAME).value as string);
      } while (this.match(TokenType.PUNCTUATION, ','));
    }

    return params;
  }

  /**
   * Parses a block statement (statements enclosed in braces).
   *
   * @returns Array of statements in the block
   * @throws Error if block is not properly closed
   */
  private parseBlock(): Statement[] {
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_BRACE, '{');
    const statements: Statement[] = [];

    while (!this.check(TokenType.PUNCTUATION, '}') && !this.isAtEnd()) {
      statements.push(this.statement());
    }

    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_BRACE, '}');
    return statements;
  }

  /**
   * Parses an if statement with optional else branch.
   *
   * @returns IfStatement AST node
   * @throws Error if if statement syntax is invalid
   */
  private ifStatement(): IfStatement {
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');
    const condition = this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
    const thenBranch = this.parseBlock();

    let elseBranch: Statement[] | null = null;
    if (this.match(TokenType.ELSE)) {
      elseBranch = this.parseBlock();
    }

    return {
      type: 'IfStatement',
      condition,
      thenBranch,
      elseBranch,
    };
  }

  /**
   * Parses a while loop statement.
   *
   * @returns WhileStatement AST node
   * @throws Error if while statement syntax is invalid
   */
  private whileStatement(): WhileStatement {
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');
    const condition = this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
    const body = this.parseBlock();

    return {
      type: 'WhileStatement',
      condition,
      body,
    };
  }

  /**
   * Parses a for loop statement.
   *
   * @returns ForStatement AST node
   * @throws Error if for statement syntax is invalid
   */
  private forStatement(): ForStatement {
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');

    const init = this.check(TokenType.PUNCTUATION, ';') ? null : this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    const condition = this.check(TokenType.PUNCTUATION, ';') ? null : this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    const update = this.check(TokenType.PUNCTUATION, ')') ? null : this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
    const body = this.parseBlock();

    return {
      type: 'ForStatement',
      init,
      condition,
      update,
      body,
    };
  }

  /**
   * Parses a do-while loop statement.
   *
   * @returns DoWhileStatement AST node
   * @throws Error if do-while statement syntax is invalid
   */
  private doWhileStatement(): DoWhileStatement {
    const body = this.parseBlock();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');
    const condition = this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'DoWhileStatement',
      body,
      condition,
    };
  }

  /**
   * Parses a try-catch-finally statement.
   *
   * @returns TryCatchStatement AST node
   * @throws Error if try-catch statement syntax is invalid
   */
  private tryCatchStatement(): TryCatchStatement {
    const tryBlock = this.parseBlock();

    let catchBlock: Statement[] | null = null;
    let catchParam: string | null = null;

    if (this.match(TokenType.CATCH)) {
      this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');
      catchParam = this.consume(TokenType.IDENTIFIER, ExpectedMessages.CATCH_PARAMETER).value as string;
      this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
      catchBlock = this.parseBlock();
    }

    let finallyBlock: Statement[] | null = null;
    if (this.match(TokenType.FINALLY)) {
      finallyBlock = this.parseBlock();
    }

    return {
      type: 'TryCatchStatement',
      tryBlock,
      catchBlock,
      catchParam,
      finallyBlock,
    };
  }

  /**
   * Parses a console statement (log, warn, or error).
   *
   * @returns ConsoleStatement AST node
   * @throws Error if console statement syntax is invalid
   */
  private consoleStatement(): ConsoleStatement {
    const consoleType = this.previous().value as string;
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');
    const message = this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'ConsoleStatement',
      method: consoleType,
      message,
    };
  }

  /**
   * Parses an alert statement.
   *
   * @returns AlertStatement AST node
   * @throws Error if alert statement syntax is invalid
   */
  private alertStatement(): AlertStatement {
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');
    const message = this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'AlertStatement',
      message,
    };
  }

  /**
   * Parses an array declaration statement.
   *
   * @returns ArrayDeclaration AST node
   * @throws Error if array declaration syntax is invalid
   */
  private arrayDeclaration(): ArrayDeclaration {
    const name = this.consume(TokenType.IDENTIFIER, ExpectedMessages.ARRAY_NAME);
    this.consume(TokenType.OPERATOR, ExpectedMessages.ASSIGN_OPERATOR, Operator.ASSIGN);
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_BRACKET, '[');
    const elements = this.parseExpressionList(']');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_BRACKET, ']');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'ArrayDeclaration',
      name: name.value as string,
      elements,
    };
  }

  /**
   * Parses an object declaration statement.
   *
   * @returns ObjectDeclaration AST node
   * @throws Error if object declaration syntax is invalid
   */
  private objectDeclaration(): ObjectDeclaration {
    const name = this.consume(TokenType.IDENTIFIER, ExpectedMessages.OBJECT_NAME);
    this.consume(TokenType.OPERATOR, ExpectedMessages.ASSIGN_OPERATOR, Operator.ASSIGN);
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_BRACE, '{');
    const properties = this.parseObjectProperties();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_BRACE, '}');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'ObjectDeclaration',
      name: name.value as string,
      properties,
    };
  }

  /**
   * Parses object properties from the token stream.
   *
   * @returns Record mapping property keys to expressions
   */
  private parseObjectProperties(): Record<string, Expression> {
    const properties: Record<string, Expression> = {};

    if (!this.check(TokenType.PUNCTUATION, '}')) {
      do {
        const key = this.consume(TokenType.IDENTIFIER, ExpectedMessages.PROPERTY_KEY).value as string;
        this.consume(TokenType.PUNCTUATION, ExpectedMessages.COLON, ':');
        const value = this.expression();
        properties[key] = value;
      } while (this.match(TokenType.PUNCTUATION, ','));
    }

    return properties;
  }

  /**
   * Parses an easter egg statement.
   *
   * @returns EasterEggStatement AST node
   * @throws Error if easter egg statement syntax is invalid
   */
  private easterEggStatement(): EasterEggStatement {
    const easterEgg = this.previous().value as string;
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.OPEN_PAREN, '(');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'EasterEggStatement',
      function: easterEgg,
    };
  }

  /**
   * Parses a return statement.
   *
   * @returns ReturnStatement AST node
   * @throws Error if return statement syntax is invalid
   */
  private returnStatement(): ReturnStatement {
    const value = this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'ReturnStatement',
      value,
    };
  }

  /**
   * Parses an expression statement.
   *
   * @returns ExpressionStatement AST node
   * @throws Error if expression statement syntax is invalid
   */
  private expressionStatement(): ExpressionStatement {
    const expr = this.expression();
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.SEMICOLON, ';');

    return {
      type: 'ExpressionStatement',
      expression: expr,
    };
  }

  /**
   * Parses an expression from the token stream.
   * Entry point for expression parsing.
   *
   * @returns Parsed expression node
   */
  private expression(): Expression {
    return this.assignment();
  }

  /**
   * Parses an assignment expression.
   * Handles right-associative assignment operator.
   *
   * @returns Parsed expression node
   * @throws Error if assignment target is invalid
   */
  private assignment(): Expression {
    const expr = this.logicalOr();

    if (!this.match(TokenType.OPERATOR, Operator.ASSIGN)) {
      return expr;
    }

    const value = this.assignment();

    if (expr.type !== 'Identifier') {
      const line = 'line' in expr && typeof expr.line === 'number' ? expr.line : this.peek().line;
      throw new Error(ErrorMessages.INVALID_ASSIGNMENT_TARGET(line));
    }

    return {
      type: 'AssignmentExpression',
      left: expr,
      value,
    };
  }

  /**
   * Parses a logical OR expression.
   *
   * @returns Parsed expression node
   */
  private logicalOr(): Expression {
    let expr = this.logicalAnd();

    while (this.match(TokenType.OR)) {
      const operator = this.previous().value as string;
      const right = this.logicalAnd();
      expr = {
        type: 'LogicalExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  /**
   * Parses a logical AND expression.
   *
   * @returns Parsed expression node
   */
  private logicalAnd(): Expression {
    let expr = this.equality();

    while (this.match(TokenType.AND)) {
      const operator = this.previous().value as string;
      const right = this.equality();
      expr = {
        type: 'LogicalExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  /**
   * Parses an equality expression (==, !=).
   *
   * @returns Parsed expression node
   */
  private equality(): Expression {
    let expr = this.comparison();

    while (this.match(TokenType.OPERATOR, Operator.EQUAL) || this.match(TokenType.OPERATOR, Operator.NOT_EQUAL)) {
      const operator = this.previous().value as string;
      const right = this.comparison();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  /**
   * Parses a comparison expression (<, <=, >, >=).
   *
   * @returns Parsed expression node
   */
  private comparison(): Expression {
    let expr = this.term();

    while (
      this.match(TokenType.OPERATOR, Operator.LESS_THAN) ||
      this.match(TokenType.OPERATOR, Operator.LESS_THAN_OR_EQUAL) ||
      this.match(TokenType.OPERATOR, Operator.GREATER_THAN) ||
      this.match(TokenType.OPERATOR, Operator.GREATER_THAN_OR_EQUAL)
    ) {
      const operator = this.previous().value as string;
      const right = this.term();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  /**
   * Parses a term expression (addition and subtraction).
   *
   * @returns Parsed expression node
   */
  private term(): Expression {
    let expr = this.factor();

    while (this.match(TokenType.OPERATOR, Operator.ADD) || this.match(TokenType.OPERATOR, Operator.SUBTRACT)) {
      const operator = this.previous().value as string;
      const right = this.factor();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  /**
   * Parses a factor expression (multiplication and division).
   *
   * @returns Parsed expression node
   */
  private factor(): Expression {
    let expr = this.unary();

    while (this.match(TokenType.OPERATOR, Operator.MULTIPLY) || this.match(TokenType.OPERATOR, Operator.DIVIDE)) {
      const operator = this.previous().value as string;
      const right = this.unary();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right,
      };
    }

    return expr;
  }

  /**
   * Parses a unary expression (NOT, -, +).
   *
   * @returns Parsed expression node
   */
  private unary(): Expression {
    if (
      this.match(TokenType.NOT) ||
      this.match(TokenType.OPERATOR, Operator.SUBTRACT) ||
      this.match(TokenType.OPERATOR, Operator.ADD)
    ) {
      const operator = this.previous().value as string;
      const right = this.unary();
      return {
        type: 'UnaryExpression',
        operator,
        right,
      };
    }

    return this.call();
  }

  /**
   * Parses a call expression or member access.
   * Handles function calls, array indexing, and property access.
   *
   * @returns Parsed expression node
   */
  private call(): Expression {
    let expr = this.primary();

    while (true) {
      if (this.match(TokenType.PUNCTUATION, '(')) {
        expr = this.finishCall(expr);
      } else if (this.match(TokenType.PUNCTUATION, '[')) {
        const index = this.expression();
        this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_BRACKET, ']');
        expr = {
          type: 'MemberExpression',
          object: expr,
          property: index,
          computed: true,
        };
      } else if (this.match(TokenType.PUNCTUATION, '.')) {
        const property = this.consume(TokenType.IDENTIFIER, ExpectedMessages.PROPERTY_NAME);
        expr = {
          type: 'MemberExpression',
          object: expr,
          property: {
            type: 'Identifier',
            name: property.value as string,
          },
          computed: false,
        };
      } else {
        break;
      }
    }

    return expr;
  }

  /**
   * Completes parsing a function call expression.
   *
   * @param callee - The function being called
   * @returns CallExpression AST node
   */
  private finishCall(callee: Expression): CallExpression {
    const args = this.parseExpressionList(')');
    this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');

    return {
      type: 'CallExpression',
      callee,
      arguments: args,
    };
  }

  /**
   * Parses a comma-separated list of expressions.
   *
   * @param endToken - The token type that ends the list
   * @returns Array of parsed expressions
   */
  private parseExpressionList(endToken: string): Expression[] {
    const expressions: Expression[] = [];

    if (!this.check(TokenType.PUNCTUATION, endToken)) {
      do {
        expressions.push(this.expression());
      } while (this.match(TokenType.PUNCTUATION, ','));
    }

    return expressions;
  }

  /**
   * Parses a primary expression (literals, identifiers, parenthesized expressions, arrays, objects).
   *
   * @returns Parsed expression node
   * @throws Error if primary expression cannot be parsed
   */
  private primary(): Expression {
    if (this.match(TokenType.TRUE)) {
      return {
        type: 'Literal',
        value: true,
      };
    }

    if (this.match(TokenType.FALSE)) {
      return {
        type: 'Literal',
        value: false,
      };
    }

    if (this.match(TokenType.NUMBER)) {
      return {
        type: 'Literal',
        value: this.previous().value as number,
      };
    }

    if (this.match(TokenType.STRING)) {
      return {
        type: 'Literal',
        value: this.previous().value as string,
      };
    }

    if (this.match(TokenType.IDENTIFIER) || 
        this.match(TokenType.ARRAY_GET) ||
        this.match(TokenType.ARRAY_MAP) ||
        this.match(TokenType.ARRAY_FILTER) ||
        this.match(TokenType.ARRAY_REDUCE) ||
        this.match(TokenType.ARRAY_LENGTH) ||
        this.match(TokenType.OBJECT_GET) ||
        this.match(TokenType.OBJECT_SET) ||
        this.match(TokenType.SLEEP) ||
        this.match(TokenType.POHA_TIME) ||
        this.match(TokenType.JALEBI_MODE) ||
        this.match(TokenType.RAJWADA_MODE) ||
        this.match(TokenType.SARAFA_NIGHT)) {
      return {
        type: 'Identifier',
        name: this.previous().value as string,
      };
    }

    if (this.match(TokenType.PUNCTUATION, '(')) {
      const expr = this.expression();
      this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_PAREN, ')');
      return expr;
    }

    if (this.match(TokenType.PUNCTUATION, '[')) {
      const elements = this.parseExpressionList(']');
      this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_BRACKET, ']');
      return {
        type: 'ArrayExpression',
        elements,
      };
    }

    if (this.match(TokenType.PUNCTUATION, '{')) {
      const properties = this.parseObjectProperties();
      this.consume(TokenType.PUNCTUATION, ExpectedMessages.CLOSE_BRACE, '}');
      return {
        type: 'ObjectExpression',
        properties,
      };
    }

    const currentToken = this.peek();
    throw new Error(ErrorMessages.UNEXPECTED_TOKEN(currentToken.line, currentToken.value));
  }

  /**
   * Checks if the current token matches the given type and optionally value, and advances if it does.
   *
   * @param type - Token type to match
   * @param value - Optional token value to match
   * @returns True if token matches and was consumed
   */
  private match(type: string, value?: string): boolean {
    if (this.check(type, value)) {
      this.advance();
      return true;
    }
    return false;
  }

  /**
   * Checks if the current token matches the given type and optionally value.
   *
   * @param type - Token type to check
   * @param value - Optional token value to check
   * @returns True if current token matches
   */
  private check(type: string, value?: string): boolean {
    if (this.isAtEnd()) {
      return false;
    }
    const token = this.peek();
    if (token.type !== type) {
      return false;
    }
    if (value !== undefined && token.value !== value) {
      return false;
    }
    return true;
  }

  /**
   * Advances to the next token and returns the previous one.
   *
   * @returns The token that was just consumed
   */
  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.previous();
  }

  /**
   * Checks if we've reached the end of the token stream.
   *
   * @returns True if at end of tokens
   */
  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  /**
   * Returns the current token without consuming it.
   *
   * @returns Current token
   */
  private peek(): Token {
    if (this.current >= this.tokens.length) {
      return this.tokens[this.tokens.length - 1];
    }
    return this.tokens[this.current];
  }

  /**
   * Returns the previous token.
   *
   * @returns Previous token
   */
  private previous(): Token {
    if (this.current === 0) {
      return this.tokens[0];
    }
    return this.tokens[this.current - 1];
  }

  /**
   * Consumes a token of the expected type and value, or throws an error.
   *
   * @param type - Expected token type
   * @param message - Error message if token doesn't match
   * @param value - Optional expected token value
   * @returns The consumed token
   * @throws Error if token doesn't match expectations
   */
  private consume(type: string, message: string, value?: string): Token {
    if (this.check(type, value)) {
      return this.advance();
    }
    const currentToken = this.peek();
    throw new Error(`${ErrorMessages.PREFIX} line ${currentToken.line}: ${message}`);
  }
}
