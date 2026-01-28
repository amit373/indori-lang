export interface Token {
  type: string;
  value: string | number | null;
  line: number;
  column: number;
}

export interface ASTNode {
  type: string;
  [key: string]: any;
}

export interface Program extends ASTNode {
  type: 'Program';
  body: Statement[];
}

export interface Statement extends ASTNode {
  type: string;
}

export interface Expression extends ASTNode {
  type: string;
}

export interface VariableDeclaration extends Statement {
  type: 'VariableDeclaration';
  name: string;
  value: Expression;
}

export interface FunctionDeclaration extends Statement {
  type: 'FunctionDeclaration';
  name: string;
  params: string[];
  body: Statement[];
}

export interface IfStatement extends Statement {
  type: 'IfStatement';
  condition: Expression;
  thenBranch: Statement[];
  elseBranch: Statement[] | null;
}

export interface WhileStatement extends Statement {
  type: 'WhileStatement';
  condition: Expression;
  body: Statement[];
}

export interface ForStatement extends Statement {
  type: 'ForStatement';
  init: Expression | null;
  condition: Expression | null;
  update: Expression | null;
  body: Statement[];
}

export interface DoWhileStatement extends Statement {
  type: 'DoWhileStatement';
  body: Statement[];
  condition: Expression;
}

export interface TryCatchStatement extends Statement {
  type: 'TryCatchStatement';
  tryBlock: Statement[];
  catchBlock: Statement[] | null;
  catchParam: string | null;
  finallyBlock: Statement[] | null;
}

export interface ConsoleStatement extends Statement {
  type: 'ConsoleStatement';
  method: string;
  message: Expression;
}

export interface AlertStatement extends Statement {
  type: 'AlertStatement';
  message: Expression;
}

export interface ArrayDeclaration extends Statement {
  type: 'ArrayDeclaration';
  name: string;
  elements: Expression[];
}

export interface ObjectDeclaration extends Statement {
  type: 'ObjectDeclaration';
  name: string;
  properties: Record<string, Expression>;
}

export interface EasterEggStatement extends Statement {
  type: 'EasterEggStatement';
  function: string;
}

export interface ExpressionStatement extends Statement {
  type: 'ExpressionStatement';
  expression: Expression;
}

export interface ReturnStatement extends Statement {
  type: 'ReturnStatement';
  value: Expression;
}

export interface Literal extends Expression {
  type: 'Literal';
  value: string | number | boolean;
}

export interface Identifier extends Expression {
  type: 'Identifier';
  name: string;
}

export interface BinaryExpression extends Expression {
  type: 'BinaryExpression';
  operator: string;
  left: Expression;
  right: Expression;
}

export interface UnaryExpression extends Expression {
  type: 'UnaryExpression';
  operator: string;
  right: Expression;
}

export interface LogicalExpression extends Expression {
  type: 'LogicalExpression';
  operator: string;
  left: Expression;
  right: Expression;
}

export interface AssignmentExpression extends Expression {
  type: 'AssignmentExpression';
  left: Expression;
  value: Expression;
}

export interface CallExpression extends Expression {
  type: 'CallExpression';
  callee: Expression;
  arguments: Expression[];
}

export interface MemberExpression extends Expression {
  type: 'MemberExpression';
  object: Expression;
  property: Expression;
  computed: boolean;
}

export interface ArrayExpression extends Expression {
  type: 'ArrayExpression';
  elements: Expression[];
}

export interface ObjectExpression extends Expression {
  type: 'ObjectExpression';
  properties: Record<string, Expression>;
}

export interface CompileResult {
  success: boolean;
  javascriptCode?: string;
  ast?: Program;
  tokens?: Token[];
  error?: string;
}

export interface TokenizeResult {
  success: boolean;
  tokens?: Token[];
  error?: string;
}

export interface ParseResult {
  success: boolean;
  ast?: Program;
  error?: string;
}

export interface TranspileResult {
  success: boolean;
  javascriptCode?: string;
  error?: string;
}
