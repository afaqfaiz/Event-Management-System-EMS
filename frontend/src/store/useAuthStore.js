import {create} from 'zustand'
export const useAuthStore = create ((set) => ({
    user: null,
    setuser: (user) => set ({user}),
     logout: () => set ({user: null}),
}));