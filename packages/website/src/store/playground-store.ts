import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PlaygroundState {
  code: string;
  output: string;
  error: string | null;
  isRunning: boolean;
  selectedExample: string | null;
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setError: (error: string | null) => void;
  setIsRunning: (isRunning: boolean) => void;
  setSelectedExample: (example: string | null) => void;
  reset: () => void;
}

const defaultCode = `# Hello World in IndoriLang
bhiya_bol("Ram Ram bhiya log!");
poha_time();`;

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set) => ({
      code: defaultCode,
      output: '',
      error: null,
      isRunning: false,
      selectedExample: null,
      setCode: (code) => set({ code, error: null }),
      setOutput: (output) => set({ output }),
      setError: (error) => set({ error }),
      setIsRunning: (isRunning) => set({ isRunning }),
      setSelectedExample: (selectedExample) => set({ selectedExample }),
      reset: () =>
        set({
          code: defaultCode,
          output: '',
          error: null,
          isRunning: false,
          selectedExample: null,
        }),
    }),
    {
      name: 'indori-playground-storage',
      partialize: (state) => ({ code: state.code }),
    }
  )
);
