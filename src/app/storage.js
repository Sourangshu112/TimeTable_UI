// app/storage.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStorage = create(
  persist(
    (set) => ({
      // 1. STATE (The Data)
      institution: {
        name: '',
        code: '',
      },

      // 2. ACTION (The Updater)
      updateInstitution: (field, value) => 
        set((state) => ({
          institution: {
            ...state.institution,
            [field]: value
          }
        })),
    }),
    {
      name: 'timetable-storage', // Unique key in localStorage
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // Helps prevent Next.js hydration mismatch errors
    }
  )
);