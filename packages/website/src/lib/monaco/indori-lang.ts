import * as monaco from 'monaco-editor';

// Extend window for Monaco
declare global {
  interface Window {
    monaco: typeof monaco;
  }
}

export function registerIndoriLang() {
  if (typeof window === 'undefined') {
    return;
  }
  
  const monacoInstance = (window as any).monaco;
  if (!monacoInstance) {
    return;
  }
  monacoInstance.languages.register({ id: 'indori' });

  monacoInstance.languages.setMonarchTokensProvider('indori', {
    keywords: [
      'kaam',
      'laa_re',
      'agar_re',
      'warna_re',
      'jabtak_re',
      'jabtak_re_kar',
      'ghuma_re',
      'bhiya_ka',
      'de_re',
      'jama_re',
      'naksha_re',
      'nikaal_re',
      'ketlu_re',
      'dikha_re',
      'badal_re',
      'bhiya_try',
      'bhiya_catch',
      'bhiya_finally',
      'ane_re',
      'ya_re',
      'nako_re',
      'bilkul_sahi',
      'ghapla_hai',
    ],
    operators: ['+', '-', '*', '/', '=', '==', '!=', '<', '<=', '>', '>=', '++', '--'],
    symbols: /[=><!?:&|+\-*\/\^%]+/,
    tokenizer: {
      root: [
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          },
        ],
        [/[0-9]+/, 'number'],
        [/"[^"]*"|'[^']*'/, 'string'],
        [/\/\/.*/, 'comment'],
        [/#.*/, 'comment'],
        [/@symbols/, { cases: { '@operators': 'operator', '@default': '' } }],
        [/[{}()\[\]]/, '@brackets'],
        [/\s+/, 'white'],
      ],
    },
  });

  monacoInstance.languages.setLanguageConfiguration('indori', {
    comments: {
      lineComment: '#',
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
  });

  // Define theme colors for IndoriLang
  monacoInstance.editor.defineTheme('indori-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '0066CC', fontStyle: 'bold' },
      { token: 'string', foreground: '008000' },
      { token: 'number', foreground: '098658' },
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'operator', foreground: '0000FF' },
    ],
    colors: {},
  });

  monacoInstance.editor.defineTheme('indori-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'operator', foreground: 'D4D4D4' },
    ],
    colors: {},
  });
}
