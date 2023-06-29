import { create } from "zustand";

export type ClassGenSubjectStore = {
  classID: string | null;
  genSubjectID: string | null;
  setClassID: (classID: string) => void;
  setGenSubjectID: (genSubjectID: string) => void;
};

export const useClassGenSubjectStore = create<ClassGenSubjectStore>()((set) => ({
    classID: null,
    genSubjectID: null,
    setClassID(classID: string) {
      if (classID.trim()) set({ classID: classID });
      else set({ classID: null });
    },
    setGenSubjectID(genSubjectID: string) {
      if (genSubjectID.trim()) set({ genSubjectID: genSubjectID });
      else set({ genSubjectID: null });
    },
}));