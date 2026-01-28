/**
 * CLI message constants for IndoriLang.
 * Centralized definition of all CLI messages for easy customization.
 */
export const CLIMessages = {
  // Error messages
  ERROR_PREFIX: '❌ Arre bhiya, kuch gadbad hai',
  UNKNOWN_COMMAND: (command: string) => `❌ Arre bhiya, unknown command: ${command}`,
  FILE_PATH_REQUIRED: '❌ Arre bhiya, file path de re!',
  FILE_NOT_FOUND: (filePath: string) => `❌ Arre bhiya, file nahi mili: ${filePath}`,
  INPUT_FILE_PATH_REQUIRED: '❌ Arre bhiya, input file path de re!',
  NO_JAVASCRIPT_GENERATED: '❌ Arre bhiya, kuch gadbad hai: No JavaScript code generated',
  RUNTIME_ERROR: (error: string) => `❌ Runtime error: ${error}`,
  FILE_READING_ERROR: (error: string) => `❌ File reading error: ${error}`,
  COMPILATION_ERROR: (error: string) => `❌ Compilation error: ${error}`,
  GENERAL_ERROR: (error: string) => `❌ Arre bhiya, kuch gadbad hai: ${error}`,

  // Success messages
  SUCCESS_PREFIX: '✅',
  COMPILATION_SUCCESS: (inputPath: string, outputPath: string) => 
    `✅ Successfully compiled ${inputPath} -> ${outputPath}`,

  // Info messages
  RUNNING: '🚀 IndoriLang chal reha hai...',
  VERSION: 'IndoriLang v1.0 - Bilkul mast programming language!',
  VERSION_SUBTITLE: '🍚 Poha with code, bhiya!',
} as const;

/**
 * Help text for CLI.
 */
export const CLI_HELP_TEXT = `
IndoriLang v1.0 CLI - Bilkul mast tool!

Usage:
  indori <command> [options]

Commands:
  run <file.il>        Run IndoriLang file
  compile <file.il> [output.js]  Compile to JavaScript
  version              Show version
  help                 Show this help message

Examples:
  indori run hello.il
  indori compile program.il program.js
  indori run array.il

File extension: .il
Language: Pure Indori slang programming

Keywords:
  kaam/laa_re         - Variable declaration
  agar_re/warna_re    - If/Else
  jabtak_re           - While loop
  ghuma_re            - For loop
  bhiya_ka/de_re      - Function/Return
  bhiya_bol           - Console log
  jama_re/naksha_re   - Array/Object
  poha_time()         - Easter egg!

For more info: https://indori-lang.netlify.app
`;
