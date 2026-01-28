'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { usePlaygroundStore } from '@/store/playground-store';
import { compileCode, runCode } from '@/lib/compiler-worker';
import { examples } from '@/lib/examples';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Share2, Loader2, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading editor...</div>,
});

export default function PlaygroundPage() {
  const {
    code,
    output,
    error,
    isRunning,
    selectedExample,
    setCode,
    setOutput,
    setError,
    setIsRunning,
    setSelectedExample,
    reset,
  } = usePlaygroundStore();
  const { theme } = useTheme();
  const [showExamples, setShowExamples] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    // Load code from URL if present
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const codeParam = urlParams.get('code');
      if (codeParam) {
        try {
          const decodedCode = atob(codeParam);
          setCode(decodedCode);
        } catch {
          console.error('Failed to decode code from URL');
        }
      }
    }
  }, [setCode]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, error]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setError(null);

    try {
      const compileResult = compileCode(code);

      if (compileResult.success && compileResult.javascriptCode) {
        const runResult = await runCode(compileResult.javascriptCode);
        // Set output - runResult.output already includes success message if no logs
        setOutput(runResult.output);
        if (runResult.error) {
          setError(runResult.error);
        }
      } else {
        setError(compileResult.error || 'Compilation failed');
      }
    } catch (e) {
      setError(`❌ Unexpected error: ${(e as Error).message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, setOutput, setError, setIsRunning]);

  const handleExampleSelect = (example: typeof examples[0]) => {
    setCode(example.code);
    setSelectedExample(example.name);
    setShowExamples(false);
    setOutput('');
    setError(null);
  };

  const handleShare = () => {
    try {
      const encodedCode = btoa(code);
      const url = `${window.location.origin}${window.location.pathname}?code=${encodedCode}`;
      setShareUrl(url);
      setShowShareModal(true);
    } catch {
      setError('❌ Failed to generate share URL');
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setShowShareModal(false);
  };

  const handleFormat = () => {
    // Basic formatting - just ensure consistent indentation
    const lines = code.split('\n');
    const formatted = lines
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed === '') return '';
        return trimmed;
      })
      .join('\n');
    setCode(formatted);
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRun]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Toolbar */}
      <div className="border-b bg-background px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExamples(!showExamples)}
              className="gap-2"
            >
              Examples
              <ChevronDown className={`h-4 w-4 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
            </Button>
            <AnimatePresence>
              {showExamples && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 bg-popover border rounded-lg shadow-xl z-50 min-w-64"
                >
                  {examples.map((example) => (
                    <button
                      key={example.name}
                      className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b last:border-b-0"
                      onClick={() => handleExampleSelect(example)}
                    >
                      <div className="font-medium">{example.name}</div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleFormat}>
            Format
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm" onClick={handleRun} disabled={isRunning} className="gap-2">
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run
              </>
            )}
          </Button>
          <span className="text-xs text-muted-foreground hidden sm:inline">Ctrl+Enter to run</span>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        {/* Editor */}
        <div className="flex flex-col border rounded-lg overflow-hidden bg-background">
          <div className="px-4 py-2 border-b bg-muted/50 flex items-center justify-between">
            <span className="text-sm font-medium">IndoriLang Editor (.il)</span>
            <div className="flex items-center gap-2">
              {isRunning && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Compiling...
                </div>
              )}
              {!isRunning && !error && output && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-3 w-3" />
                  Success
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <XCircle className="h-3 w-3" />
                  Error
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <MonacoEditor
              height="100%"
              language="indori"
              theme={theme === 'dark' ? 'indori-dark' : 'indori-light'}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
              }}
              beforeMount={async (monaco) => {
                // Register language before editor mounts
                const { registerIndoriLang } = await import('@/lib/monaco/indori-lang');
                // Set monaco on window for the register function
                (window as any).monaco = monaco;
                registerIndoriLang();
              }}
            />
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col border rounded-lg overflow-hidden bg-background">
          <div className="px-4 py-2 border-b bg-muted/50 flex items-center justify-between">
            <span className="text-sm font-medium">Output Console</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setOutput('');
                setError(null);
              }}
            >
              Clear
            </Button>
          </div>
          <div
            ref={outputRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-muted/30"
          >
            {error && (
              <div className="text-red-600 whitespace-pre-wrap mb-4">{error}</div>
            )}
            {output && (
              <div className="text-foreground whitespace-pre-wrap">{output}</div>
            )}
            {!output && !error && (
              <div className="text-muted-foreground text-center py-8">
                👆 Click &quot;Run&quot; or press Ctrl+Enter to execute your IndoriLang program
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background p-8 rounded-xl max-w-lg w-full shadow-2xl border"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">🔗 Share Your IndoriLang Code</h3>
              <p className="mb-4 text-muted-foreground">
                Share this URL with others to show them your IndoriLang program:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm bg-muted"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <Button onClick={copyToClipboard}>Copy</Button>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowShareModal(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
