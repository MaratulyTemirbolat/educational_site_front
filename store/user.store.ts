import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

import { User } from "../models/auths.models";

export type UseUser = {
    user: User | null,
    loading: boolean,
    error: Error | null,
    setUser: (user: User) => void,

};

export const useUser = create<UseUser | any>(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,
            setUser: (user: User) => {
                set({user});
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
