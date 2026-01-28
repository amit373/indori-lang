import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { IndoriCompiler } from '../src/index';

test('Variable declaration', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('kaam x laa_re 10;');

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /let x = 10;/);
});

test('Function declaration', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('bhiya_ka greet() { de_re "Ram Ram"; }');

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /function greet\(\)/);
  assert.match(result.javascriptCode as string, /return "Ram Ram"/);
});

test('Console statement', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('bhiya_bol("Hello Bhiya");');

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /bhiya_bol\("Hello Bhiya"\)/);
});

test('If statement', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('agar_re (bilkul_sahi) { bhiya_bol("sahi"); }');

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /if \(true\)/);
  assert.match(result.javascriptCode as string, /bhiya_bol\("sahi"\)/);
});

test('While loop', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('jabtak_re (x < 5) { bhiya_bol(x); }');

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /while\s*\(\(?x < 5\)?\)/);
});

test('Array declaration', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('jama_re items = [1, 2, 3];');

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /let items = \[1, 2, 3\]/);
});

test('Object declaration', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('naksha_re user = { naam: "Raju", age: 25 };');

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /let user = \{naam: "Raju", age: 25\}/);
});

test('Easter eggs', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('poha_time();');

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /poha_time\(\);/);
});

test('Error handling', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('kaam x laa_re ;');

  assert.equal(result.success, false);
  assert.match(result.error as string, /❌ Arre bhiya, kuch gadbad hai/);
});

test('Complex program', () => {
  const compiler = new IndoriCompiler();
  const sourceCode = `
    kaam i laa_re 0;
    jabtak_re (i < 5) {
      bhiya_bol("Count: " + i);
      i = i + 1;
    }
    poha_time();
  `;

  const result = compiler.compile(sourceCode);

  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /let i = 0;/);
  assert.match(result.javascriptCode as string, /while\s*\(\(?i < 5\)?\)/);
  assert.match(result.javascriptCode as string, /poha_time\(\);/);
});
