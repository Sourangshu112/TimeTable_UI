// app/storage.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStorage = create(
  persist(
    (set) => ({
      // Institution
      // STATE (The Data)
      institution: {name: '', code: ''},
      //  ACTION (The Updater)
      updateInstitution: (field, value) => 
        set((state) => ({
          institution: {
            ...state.institution,
            [field]: value
          }
        })),

      // Course
      // STATE
      courses: [],
      //ACTIONS
      addCourse: (course) => 
        set((state) => ({
          courses: [...state.courses,{...course, id: course.name}]
        })),
        
      removeCourse: (id) => 
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== id)
        })),

      //Department
      //STATE
      departments: [],
      //ACTIONS
      addDepartment: (dept) => 
        set((state) => ({
          departments: [...state.departments,{...dept, id: dept.deptName}]
        })),
        
      removeDepartment: (id) => 
        set((state) => ({
          departments: state.departments.filter((dept) => dept.id !== id)
        })),

      //Faculty
      //STATE
      facultys: [],
      //ACTION
      addFaculty: (faculty) => 
        set((state) => ({
          facultys: [...state.facultys,{...faculty, id: faculty.initial}]
        })),
      
      removeFaculty: (id) => 
        set((state) => ({
          facultys: state.facultys.filter((faculty) => faculty.id !== id)
        })),

      //Subjects
      //STATE
      subjects: [],
      //ACTION
      addSubject: (subject) => 
        set((state) => ({
          subjects: [...state.subjects,{...subject, id: subject.code}]
        })),
      
      removeSubject: (id) => 
        set((state) => ({
          subjects: state.subjects.filter((subject) => subject.id !== id)
        })),

      // Classes/section
      autoSections: [],
      //ACTION
      addAutoSection: (section) => 
        set((state) => ({
          autoSections: [...state.autoSections,{...section}]
        })),

      removeAutoSection: (id) => 
        set((state) => ({
          autoSections: state.autoSections.filter((section) => section.id !== id)
        })),


      sections: [],
      //ACTION
      addSection: (section) => 
        set((state) => ({
          sections: [...state.sections,{...section}]
        })),

      removeSection: (id) => 
        set((state) => ({
          sections: state.sections.filter((section) => section.id !== id)
        })),
    }),
    {
      name: 'timetable-storage', // Unique key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
