import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { GeneratedQuiz } from "@/models/tests.models";

export type TestStore = {
  generatedQuiz: GeneratedQuiz | null;
  setQuiz: (quiz: GeneratedQuiz) => void;
  resetStore: () => void,
};

export const useTestStore = create<TestStore>()(
  persist((set) => ({
    generatedQuiz: null,
    setQuiz(quiz: GeneratedQuiz): void {
      set({ generatedQuiz: quiz });
    },
    resetStore(): void {
      set({ generatedQuiz: null });
    },
}),
  {
    name: "take-test-storage",
    storage: createJSONStorage(() => sessionStorage),
    version: 1,
  }
)
);