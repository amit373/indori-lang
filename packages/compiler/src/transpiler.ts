import {
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
  Literal,
  Identifier,
  BinaryExpression,
  UnaryExpression,
  LogicalExpression,
  AssignmentExpression,
  CallExpression,
  MemberExpression,
  ArrayExpression,
  ObjectExpression,
} from './types.js';
import { ErrorMessages, TranspilerMessages } from './constants.js';

/**
 * Transpiler class responsible for converting AST nodes into JavaScript code.
 * Generates JavaScript output from IndoriLang AST.
 */
export class Transpiler {
  private indentation: number = 0;
  private output: string = '';
  private readonly variables = new Set<string>();
  private readonly functions = new Set<string>();

  /**
   * Transpiles an AST program into JavaScript code.
   *
   * @param ast - The program AST node to transpile
   * @returns Generated JavaScript code as a string
   */
  transpile(ast: Program): string {
    this.reset();
    this.writeHeader();
    this.output += this.getRuntimeHelpers();
    this.transpileProgram(ast);
    return this.output;
  }

  /**
   * Resets the transpiler state for a new compilation.
   */
  private reset(): void {
    this.output = '';
    this.indentation = 0;
    this.variables.clear();
    this.functions.clear();
  }

  /**
   * Writes the header comment to the output.
   */
  private writeHeader(): void {
    this.output += `${TranspilerMessages.HEADER_LINE_1}\n`;
    this.output += `${TranspilerMessages.HEADER_LINE_2}\n\n`;
  }

  /**
   * Generates runtime helper functions for IndoriLang.
   * These functions provide the runtime support for IndoriLang features.
   *
   * @returns JavaScript code string containing runtime helpers
   */
  private getRuntimeHelpers(): string {
    const errorPrefix = ErrorMessages.PREFIX;
    return `
// IndoriLang Runtime Helpers
let bhiya_bol = console.log;
const bhiya_chitav = console.warn;
const bhiya_gadbad = console.error;
const bhiya_suna = (msg) => {
  if (typeof alert !== 'undefined') {
    alert(msg);
  } else {
    console.log(msg);
  }
};

// Easter eggs
const poha_time = () => {
  bhiya_bol("🍚 Poha time ho gaya re 😎");
  return "Poha time ho gaya re 😎";
};

const jalebi_mode = () => {
  const originalLog = bhiya_bol;
  bhiya_bol = (...args) => originalLog("🍬", ...args);
  return "Jalebi mode activated! 🍬";
};

const rajwada_mode = () => {
  const originalLog = bhiya_bol;
  bhiya_bol = (...args) => originalLog("👑", ...args);
  return "Rajwada mode activated! 👑";
};

const sarafa_night = () => {
  bhiya_suna("🌙 Sarafa chal reha hai 🌙");
  return "Sarafa chal reha hai 🌙";
};

// Sleep function
const ruk_re = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Array helpers
const ketlu_re = (arr) => arr.length;
const nikaal_re = (arr, index) => arr[index];
const ghuma_map = (arr, fn) => arr.map(fn);
const chhaan_re = (arr, fn) => arr.filter(fn);
const ghuma_reduce = (arr, fn, init) => arr.reduce(fn, init);

// Object helpers
const dikha_re = (obj, prop) => obj[prop];
const badal_re = (obj, prop, value) => { obj[prop] = value; };

// Error handler (browser only)
if (typeof window !== 'undefined' && typeof globalThis.addEventListener === 'function') {
  globalThis.addEventListener('error', (e) => {
    bhiya_gadbad('${errorPrefix} line ' + (e.lineno || 'unknown') + ': ' + e.message);
  });
}

`;
  }

  /**
   * Transpiles a program node.
   *
   * @param node - Program AST node
   */
  private transpileProgram(node: Program): void {
    for (const statement of node.body) {
      this.transpileNode(statement);
      this.output += '\n';
    }
  }

  /**
   * Transpiles a statement node by delegating to the appropriate method.
   *
   * @param node - Statement AST node to transpile
   * @throws Error if statement type is unknown
   */
  private transpileNode(node: Statement): void {
    switch (node.type) {
      case 'VariableDeclaration':
        this.transpileVariableDeclaration(node as VariableDeclaration);
        break;
      case 'FunctionDeclaration':
        this.transpileFunctionDeclaration(node as FunctionDeclaration);
        break;
      case 'IfStatement':
        this.transpileIfStatement(node as IfStatement);
        break;
      case 'WhileStatement':
        this.transpileWhileStatement(node as WhileStatement);
        break;
      case 'ForStatement':
        this.transpileForStatement(node as ForStatement);
        break;
      case 'DoWhileStatement':
        this.transpileDoWhileStatement(node as DoWhileStatement);
        break;
      case 'TryCatchStatement':
        this.transpileTryCatchStatement(node as TryCatchStatement);
        break;
      case 'ConsoleStatement':
        this.transpileConsoleStatement(node as ConsoleStatement);
        break;
      case 'AlertStatement':
        this.transpileAlertStatement(node as AlertStatement);
        break;
      case 'ArrayDeclaration':
        this.transpileArrayDeclaration(node as ArrayDeclaration);
        break;
      case 'ObjectDeclaration':
        this.transpileObjectDeclaration(node as ObjectDeclaration);
        break;
      case 'EasterEggStatement':
        this.transpileEasterEggStatement(node as EasterEggStatement);
        break;
      case 'ExpressionStatement':
        this.transpileExpressionStatement(node as ExpressionStatement);
        break;
      case 'ReturnStatement':
        this.transpileReturnStatement(node as ReturnStatement);
        break;
      default:
        const nodeType = (node as { type?: string }).type || 'unknown';
        throw new Error(ErrorMessages.UNKNOWN_NODE_TYPE(nodeType));
    }
  }

  /**
   * Transpiles a variable declaration statement.
   *
   * @param node - VariableDeclaration AST node
   */
  private transpileVariableDeclaration(node: VariableDeclaration): void {
    this.variables.add(node.name);
    const value = this.transpileExpression(node.value);
    this.output += `${this.indent()}let ${node.name} = ${value};`;
  }

  /**
   * Transpiles a function declaration statement.
   *
   * @param node - FunctionDeclaration AST node
   */
  private transpileFunctionDeclaration(node: FunctionDeclaration): void {
    this.functions.add(node.name);
    const params = node.params.join(', ');

    this.output += `${this.indent()}function ${node.name}(${params}) {\n`;
    this.indentation++;
    this.transpileBlock(node.body);
    this.indentation--;
    this.output += `${this.indent()}}`;
  }

  /**
   * Transpiles an if statement with optional else branch.
   *
   * @param node - IfStatement AST node
   */
  private transpileIfStatement(node: IfStatement): void {
    const condition = this.transpileExpression(node.condition);
    this.output += `${this.indent()}if (${condition}) {\n`;
    this.indentation++;
    this.transpileBlock(node.thenBranch);
    this.indentation--;
    this.output += `${this.indent()}}`;

    if (node.elseBranch) {
      this.output += ' else {\n';
      this.indentation++;
      this.transpileBlock(node.elseBranch);
      this.indentation--;
      this.output += `${this.indent()}}`;
    }
  }

  /**
   * Transpiles a while loop statement.
   *
   * @param node - WhileStatement AST node
   */
  private transpileWhileStatement(node: WhileStatement): void {
    const condition = this.transpileExpression(node.condition);
    this.output += `${this.indent()}while (${condition}) {\n`;
    this.indentation++;
    this.transpileBlock(node.body);
    this.indentation--;
    this.output += `${this.indent()}}`;
  }

  /**
   * Transpiles a for loop statement.
   *
   * @param node - ForStatement AST node
   */
  private transpileForStatement(node: ForStatement): void {
    const init = node.init ? this.transpileExpression(node.init) : '';
    const condition = node.condition ? this.transpileExpression(node.condition) : 'true';
    const update = node.update ? this.transpileExpression(node.update) : '';

    this.output += `${this.indent()}for (${init}; ${condition}; ${update}) {\n`;
    this.indentation++;
    this.transpileBlock(node.body);
    this.indentation--;
    this.output += `${this.indent()}}`;
  }

  /**
   * Transpiles a do-while loop statement.
   *
   * @param node - DoWhileStatement AST node
   */
  private transpileDoWhileStatement(node: DoWhileStatement): void {
    this.output += `${this.indent()}do {\n`;
    this.indentation++;
    this.transpileBlock(node.body);
    this.indentation--;
    const condition = this.transpileExpression(node.condition);
    this.output += `${this.indent()}} while (${condition});`;
  }

  /**
   * Transpiles a try-catch-finally statement.
   *
   * @param node - TryCatchStatement AST node
   */
  private transpileTryCatchStatement(node: TryCatchStatement): void {
    this.output += `${this.indent()}try {\n`;
    this.indentation++;
    this.transpileBlock(node.tryBlock);
    this.indentation--;
    this.output += `${this.indent()}}`;

    if (node.catchBlock) {
      const catchParam = node.catchParam || 'error';
      this.output += ` catch (${catchParam}) {\n`;
      this.indentation++;
      this.transpileBlock(node.catchBlock);
      this.indentation--;
      this.output += `${this.indent()}}`;
    }

    if (node.finallyBlock) {
      this.output += ` finally {\n`;
      this.indentation++;
      this.transpileBlock(node.finallyBlock);
      this.indentation--;
      this.output += `${this.indent()}}`;
    }
  }

  /**
   * Transpiles a console statement (log, warn, or error).
   *
   * @param node - ConsoleStatement AST node
   */
  private transpileConsoleStatement(node: ConsoleStatement): void {
    const message = this.transpileExpression(node.message);
    this.output += `${this.indent()}${node.method}(${message});`;
  }

  /**
   * Transpiles an alert statement.
   *
   * @param node - AlertStatement AST node
   */
  private transpileAlertStatement(node: AlertStatement): void {
    const message = this.transpileExpression(node.message);
    this.output += `${this.indent()}bhiya_suna(${message});`;
  }

  /**
   * Transpiles an array declaration statement.
   *
   * @param node - ArrayDeclaration AST node
   */
  private transpileArrayDeclaration(node: ArrayDeclaration): void {
    this.variables.add(node.name);
    const elements = node.elements.map(el => this.transpileExpression(el)).join(', ');
    this.output += `${this.indent()}let ${node.name} = [${elements}];`;
  }

  /**
   * Transpiles an object declaration statement.
   *
   * @param node - ObjectDeclaration AST node
   */
  private transpileObjectDeclaration(node: ObjectDeclaration): void {
    this.variables.add(node.name);
    const properties = Object.entries(node.properties)
      .map(([key, value]) => `${key}: ${this.transpileExpression(value)}`)
      .join(', ');
    this.output += `${this.indent()}let ${node.name} = {${properties}};`;
  }

  /**
   * Transpiles an easter egg statement.
   *
   * @param node - EasterEggStatement AST node
   */
  private transpileEasterEggStatement(node: EasterEggStatement): void {
    this.output += `${this.indent()}${node.function}();`;
  }

  /**
   * Transpiles an expression statement.
   *
   * @param node - ExpressionStatement AST node
   */
  private transpileExpressionStatement(node: ExpressionStatement): void {
    const expression = this.transpileExpression(node.expression);
    this.output += `${this.indent()}${expression};`;
  }

  /**
   * Transpiles a return statement.
   *
   * @param node - ReturnStatement AST node
   */
  private transpileReturnStatement(node: ReturnStatement): void {
    const value = this.transpileExpression(node.value);
    this.output += `${this.indent()}return ${value};`;
  }

  /**
   * Transpiles a block of statements.
   *
   * @param statements - Array of statements to transpile
   */
  private transpileBlock(statements: Statement[]): void {
    for (const statement of statements) {
      this.transpileNode(statement);
      this.output += '\n';
    }
  }

  /**
   * Transpiles an expression node by delegating to the appropriate method.
   *
   * @param node - Expression AST node to transpile
   * @returns JavaScript code string for the expression
   * @throws Error if expression type is unknown
   */
  private transpileExpression(node: Expression): string {
    switch (node.type) {
      case 'Literal':
        return this.transpileLiteral(node as Literal);
      case 'Identifier':
        return this.transpileIdentifier(node as Identifier);
      case 'BinaryExpression':
        return this.transpileBinaryExpression(node as BinaryExpression);
      case 'UnaryExpression':
        return this.transpileUnaryExpression(node as UnaryExpression);
      case 'LogicalExpression':
        return this.transpileLogicalExpression(node as LogicalExpression);
      case 'AssignmentExpression':
        return this.transpileAssignmentExpression(node as AssignmentExpression);
      case 'CallExpression':
        return this.transpileCallExpression(node as CallExpression);
      case 'MemberExpression':
        return this.transpileMemberExpression(node as MemberExpression);
      case 'ArrayExpression':
        return this.transpileArrayExpression(node as ArrayExpression);
      case 'ObjectExpression':
        return this.transpileObjectExpression(node as ObjectExpression);
      default:
        const nodeType = (node as { type?: string }).type || 'unknown';
        throw new Error(ErrorMessages.UNKNOWN_EXPRESSION_TYPE(nodeType));
    }
  }

  /**
   * Transpiles a literal expression.
   *
   * @param node - Literal AST node
   * @returns JavaScript code string for the literal
   */
  private transpileLiteral(node: Literal): string {
    if (typeof node.value === 'string') {
      return `"${node.value}"`;
    }
    return String(node.value);
  }

  /**
   * Transpiles an identifier expression.
   *
   * @param node - Identifier AST node
   * @returns JavaScript code string for the identifier
   */
  private transpileIdentifier(node: Identifier): string {
    return node.name;
  }

  /**
   * Transpiles a binary expression.
   *
   * @param node - BinaryExpression AST node
   * @returns JavaScript code string for the binary expression
   */
  private transpileBinaryExpression(node: BinaryExpression): string {
    const left = this.transpileExpression(node.left);
    const right = this.transpileExpression(node.right);
    return `(${left} ${node.operator} ${right})`;
  }

  /**
   * Transpiles a unary expression.
   *
   * @param node - UnaryExpression AST node
   * @returns JavaScript code string for the unary expression
   */
  private transpileUnaryExpression(node: UnaryExpression): string {
    const right = this.transpileExpression(node.right);
    
    // Map IndoriLang unary operators to JavaScript operators
    const operatorMap: Record<string, string> = {
      'nako_re': '!',
    };
    
    const jsOperator = operatorMap[node.operator] || node.operator;
    return `${jsOperator}${right}`;
  }

  /**
   * Transpiles a logical expression.
   *
   * @param node - LogicalExpression AST node
   * @returns JavaScript code string for the logical expression
   */
  private transpileLogicalExpression(node: LogicalExpression): string {
    const left = this.transpileExpression(node.left);
    const right = this.transpileExpression(node.right);
    
    // Map IndoriLang logical operators to JavaScript operators
    const operatorMap: Record<string, string> = {
      'ane_re': '&&',
      'ya_re': '||',
      'nako_re': '!',
    };
    
    const jsOperator = operatorMap[node.operator] || node.operator;
    return `(${left} ${jsOperator} ${right})`;
  }

  /**
   * Transpiles an assignment expression.
   *
   * @param node - AssignmentExpression AST node
   * @returns JavaScript code string for the assignment expression
   */
  private transpileAssignmentExpression(node: AssignmentExpression): string {
    const left = this.transpileExpression(node.left);
    const value = this.transpileExpression(node.value);
    return `${left} = ${value}`;
  }

  /**
   * Transpiles a function call expression.
   *
   * @param node - CallExpression AST node
   * @returns JavaScript code string for the call expression
   */
  private transpileCallExpression(node: CallExpression): string {
    const callee = this.transpileExpression(node.callee);
    const args = node.arguments.map(arg => this.transpileExpression(arg)).join(', ');
    return `${callee}(${args})`;
  }

  /**
   * Transpiles a member access expression (property or array index).
   *
   * @param node - MemberExpression AST node
   * @returns JavaScript code string for the member expression
   */
  private transpileMemberExpression(node: MemberExpression): string {
    const object = this.transpileExpression(node.object);
    const property = this.transpileExpression(node.property);

    if (node.computed) {
      return `${object}[${property}]`;
    }
    return `${object}.${property}`;
  }

  /**
   * Transpiles an array expression.
   *
   * @param node - ArrayExpression AST node
   * @returns JavaScript code string for the array expression
   */
  private transpileArrayExpression(node: ArrayExpression): string {
    const elements = node.elements.map(el => this.transpileExpression(el)).join(', ');
    return `[${elements}]`;
  }

  /**
   * Transpiles an object expression.
   *
   * @param node - ObjectExpression AST node
   * @returns JavaScript code string for the object expression
   */
  private transpileObjectExpression(node: ObjectExpression): string {
    const properties = Object.entries(node.properties)
      .map(([key, value]) => `${key}: ${this.transpileExpression(value)}`)
      .join(', ');
    return `{${properties}}`;
  }

  /**
   * Generates indentation string based on current indentation level.
   *
   * @returns Indentation string (2 spaces per level)
   */
  private indent(): string {
    return '  '.repeat(this.indentation);
  }
}
