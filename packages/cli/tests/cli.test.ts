import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { IndoriCompiler } from '@indori-lang/compiler';

test('CLI compilation', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('bhiya_bol("Hello from CLI");');
  
  assert.equal(result.success, true);
  assert.match(result.javascriptCode as string, /bhiya_bol\("Hello from CLI"\)/);
});

test('CLI error handling', () => {
  const compiler = new IndoriCompiler();
  const result = compiler.compile('kaam x laa_re ;');
  
  assert.equal(result.success, false);
  assert.match(result.error as string, /❌ Arre bhiya, kuch gadbad hai/);
});
