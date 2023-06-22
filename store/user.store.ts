import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

import { User } from "../models/auths.models";
import { getUserByToken } from "@/services/auth.services";

export type UseUser = {
    user: User | null,
    loading: boolean,
    error: Error | null,
    setUser: (user: User) => void,
    fetchUser: () => void,
    clear: () => void,
};


export const useStore = create((set) => ({
  count: 1,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
}))


export const useUserStore = create<UseUser>()(
    persist(
        (set) => ({
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
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => sessionStorage),
            version: 1,
        }
    )
);
