import { create } from "zustand";

const useUserStore = create((set) => ({
    userData: {},
    addUserData: (uData) => set(() => ({ userData: uData })),
    removeUserData: () => set(() => ({ userData: {} }))
}))

export default useUserStore;