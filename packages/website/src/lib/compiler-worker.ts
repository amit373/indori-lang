import { IndoriCompiler } from '@indori-lang/compiler';

let compiler: IndoriCompiler | null = null;

export function getCompiler(): IndoriCompiler {
  if (!compiler) {
    compiler = new IndoriCompiler();
  }
  return compiler;
}

export function compileCode(sourceCode: string): { success: boolean; javascriptCode?: string; error?: string } {
  try {
    const compiler = getCompiler();
    const result = compiler.compile(sourceCode);

    if (result.success) {
      return {
        success: true,
        javascriptCode: result.javascriptCode,
      };
    } else {
      return {
        success: false,
        error: result.error || 'Unknown compilation error',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function runCode(javascriptCode: string): Promise<{ output: string; error: string | null }> {
  const logs: string[] = [];
  const errors: string[] = [];

  // Capture original console functions
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalAlert = globalThis.alert;

  // Create intercepted console functions that capture output
  const interceptedLog = (...args: any[]) => {
    const message = args.map((arg) => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    logs.push(`🔵 ${message}`);
    originalLog(...args);
  };

  const interceptedWarn = (...args: any[]) => {
    const message = args.map((arg) => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    logs.push(`🟡 ${message}`);
    originalWarn(...args);
  };

  const interceptedError = (...args: any[]) => {
    const errorMsg = args.map((arg) => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    errors.push(errorMsg);
    logs.push(`🔴 ${errorMsg}`);
    originalError(...args);
  };

  const interceptedAlert = (msg: string) => {
    logs.push(`📢 Alert: ${msg}`);
  };

  // Override console functions BEFORE executing code
  // This ensures runtime helpers (which do: const bhiya_bol = console.log) 
  // will capture our intercepted version
  console.log = interceptedLog;
  console.warn = interceptedWarn;
  console.error = interceptedError;
  globalThis.alert = interceptedAlert;

  try {
    // Execute the transpiled code
    // Runtime helpers run first and will capture the intercepted console.log
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    const userFunction = new AsyncFunction(javascriptCode);
    await userFunction();

    // Restore original functions
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
    globalThis.alert = originalAlert;

    // Return output - if no logs, indicate successful execution
    const output = logs.length > 0 
      ? logs.join('\n') 
      : '🎉 Program executed successfully (no output)';
    
    return {
      output,
      error: errors.length > 0 ? errors.join('\n') : null,
    };
  } catch (runtimeError) {
    // Restore original functions
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
    globalThis.alert = originalAlert;

    return {
      output: logs.join('\n'),
      error: runtimeError instanceof Error ? runtimeError.message : String(runtimeError),
    };
  }
}
