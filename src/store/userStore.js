// Importing the create function from Zustand to create a store
import { create } from "zustand";

// Creating a Zustand store with user-related state management
const useUserStore = create((set) => ({
    // Initializing userData state as an empty object
    userData: {},

    // Action to add or update user data in the store
    addUserData: (uData) => set(() => ({ userData: uData })),

    // Action to remove user data from the store (reset to an empty object)
    removeUserData: () => set(() => ({ userData: {} }))
}));

// Exporting the store hook to be used in other components
export default useUserStore;
