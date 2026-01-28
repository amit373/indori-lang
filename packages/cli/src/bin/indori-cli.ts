#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { IndoriCompiler } from '@indori-lang/compiler';
import { CLIMessages, CLI_HELP_TEXT } from '../constants.js';

/**
 * CLI class for IndoriLang command-line interface.
 * Handles file operations, compilation, and execution of IndoriLang programs.
 */
class IndoriCLI {
  private readonly compiler: IndoriCompiler;

  /**
   * Creates a new IndoriCLI instance.
   */
  constructor() {
    this.compiler = new IndoriCompiler();
  }

  /**
   * Main entry point for CLI commands.
   *
   * @param args - Command-line arguments
   * @throws Error if command execution fails
   */
  async run(args: string[]): Promise<void> {
    if (args.length === 0) {
      this.showHelp();
      return;
    }

    const command = args[0];

    switch (command) {
      case 'run':
        await this.runFile(args[1]);
        break;
      case 'compile':
        await this.compileFile(args[1], args[2]);
        break;
      case 'version':
        this.showVersion();
        break;
      case 'help':
        this.showHelp();
        break;
      default:
        console.error(CLIMessages.UNKNOWN_COMMAND(command));
        this.showHelp();
        process.exit(1);
    }
  }

  /**
   * Reads and executes an IndoriLang file.
   *
   * @param filePath - Path to the IndoriLang source file
   * @throws Error if file cannot be read or executed
   */
  private async runFile(filePath: string): Promise<void> {
    if (!filePath) {
      console.error(CLIMessages.FILE_PATH_REQUIRED);
      process.exit(1);
    }

    if (!existsSync(filePath)) {
      console.error(CLIMessages.FILE_NOT_FOUND(filePath));
      process.exit(1);
    }

    try {
      const sourceCode = await readFile(filePath, 'utf-8');
      const result = this.compiler.compile(sourceCode);

      if (!result.success) {
        console.error(result.error);
        process.exit(1);
      }

      console.log(CLIMessages.RUNNING);

      // Create a safe execution context
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const userCode = result.javascriptCode;

      if (!userCode) {
        console.error(CLIMessages.NO_JAVASCRIPT_GENERATED);
        process.exit(1);
      }

      try {
        const fn = new AsyncFunction(userCode);
        await fn();
      } catch (runtimeError) {
        const errorMessage = runtimeError instanceof Error ? runtimeError.message : String(runtimeError);
        console.error(CLIMessages.RUNTIME_ERROR(errorMessage));
        process.exit(1);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(CLIMessages.FILE_READING_ERROR(errorMessage));
      process.exit(1);
    }
  }

  /**
   * Compiles an IndoriLang file to JavaScript.
   *
   * @param inputPath - Path to the input IndoriLang file
   * @param outputPath - Optional path to the output JavaScript file
   * @throws Error if compilation or file writing fails
   */
  private async compileFile(
    inputPath: string,
    outputPath?: string
  ): Promise<void> {
    if (!inputPath) {
      console.error(CLIMessages.INPUT_FILE_PATH_REQUIRED);
      process.exit(1);
    }

    if (!existsSync(inputPath)) {
      console.error(CLIMessages.FILE_NOT_FOUND(inputPath));
      process.exit(1);
    }

    // Default output path
    if (!outputPath) {
      outputPath = inputPath.replace(/\.il$/, '.js');
      if (outputPath === inputPath) {
        outputPath = inputPath + '.js';
      }
    }

    try {
      const sourceCode = await readFile(inputPath, 'utf-8');
      const result = this.compiler.compile(sourceCode);

      if (!result.success) {
        console.error(result.error);
        process.exit(1);
      }

      if (!result.javascriptCode) {
        console.error(CLIMessages.NO_JAVASCRIPT_GENERATED);
        process.exit(1);
      }

      await writeFile(outputPath, result.javascriptCode, 'utf-8');
      console.log(CLIMessages.COMPILATION_SUCCESS(inputPath, outputPath));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(CLIMessages.COMPILATION_ERROR(errorMessage));
      process.exit(1);
    }
  }

  /**
   * Displays the version information.
   */
  private showVersion(): void {
    console.log(CLIMessages.VERSION);
    console.log(CLIMessages.VERSION_SUBTITLE);
  }

  /**
   * Displays the help message with usage instructions.
   */
  private showHelp(): void {
    console.log(CLI_HELP_TEXT);
  }
}

// Run CLI
const cli = new IndoriCLI();
cli.run(process.argv.slice(2)).catch((error) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(CLIMessages.GENERAL_ERROR(errorMessage));
  process.exit(1);
});
