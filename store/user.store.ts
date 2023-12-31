import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from "localforage";

import { User } from "../models/auths.models";
import { ClassSubjectShort } from "../models/subjects.models";
import { getUserByToken } from "@/services/auth.services";

export type UseUser = {
    user: User | null,
    loading: boolean,
    error: Error | null,
    setUser: (user: User) => void,
    fetchUser: () => void,
    clear: () => void,
    addRegisteredSubj: (classSubj: ClassSubjectShort) => void,
};


export const useStore = create((set) => ({
  count: 1,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
}))


export const useUserStore = create<UseUser>()(
    persist(
        (set, get) => ({
            user: null,
            loading: false,
            error: null,
            setUser: (user: User) => set((state: UseUser) => (
                {
                    user
                }
            )),
            async fetchUser()  {
                const user: User | null = await getUserByToken()
                set({user: user});
            },
            clear() {
                set({user: null});
                localforage.clear();
            },
            addRegisteredSubj(classSubj: ClassSubjectShort) {
                if (get().user && get().user?.student){
                    const userClone = structuredClone(get().user);
                    userClone?.student.registered_subjects.push(classSubj);
                    set({ user: userClone });
                }
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => sessionStorage),
            version: 1,
        }
    )
);
