import { create } from "zustand";

export type SocketStore = {
  socket: WebSocket | null;
  setSocket: (url: string, messageFunc: (message: any) => void) => void;
  resetSocket: (messageFunc: (message: any) => void) => void;
};

export const useSocketStore = create<SocketStore>()((set, get) => ({
    socket: null,
    setSocket(url: string, messageFunc: (message: any) => void) {
      set({socket: new WebSocket(url)})
      get().socket?.addEventListener("message", messageFunc);
    },
    resetSocket(messageFunc: (message: any) => void) {
      if (get().socket) {
        get().socket?.removeEventListener("message", messageFunc);
        set({ socket: null });
      }
    },
}));