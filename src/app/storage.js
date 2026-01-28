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
          courses: [...state.courses,{...course,}]
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
          departments: [...state.departments,{...dept}]
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
      theorySubjects: [],
      //ACTION
      addTheorySubject: (theorySubject) => 
        set((state) => ({
          theorySubjects: [...state.theorySubjects,{...theorySubject}]
        })),
      
      removeTheorySubject: (id) => 
        set((state) => ({
          theorySubjects: state.theorySubjects.filter((theorySubject) => theorySubject.id !== id)
        })),

      practicalSubjects: [],
      //ACTION
      addPracticalSubject: (practicalSubject) => 
        set((state) => ({
          practicalSubjects: [...state.practicalSubjects,{...practicalSubject}]
        })),
      
      removePracticalSubject: (id) => 
        set((state) => ({
          practicalSubjects: state.practicalSubjects.filter((practicalSubject) => practicalSubject.id !== id)
        })),
      
        // Classes/section
      autoSections: [],
      deletedBatchIds: [],
      //ACTION
      addAutoSection: (section) => 
        set((state) => {
          if (state.autoSections.some(s => s.id === section.id)) {
            return state; // Do nothing if duplicate
          }
          return {
           autoSections: [...state.autoSections,{...section}]
          };
        }),

      removeAutoSection: (id) => 
        set((state) => ({
          autoSections: state.autoSections.filter((section) => section.id !== id),
          deletedBatchIds: [...state.deletedBatchIds, id]
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

      updateSectionRoom: (id, status) => 
        set((state) => ({
          // Check and update inside autoSections
          autoSections: state.autoSections.map((s) => 
            s.id === id ? { ...s, room: status } : s
          ),
          // Check and update inside manually added sections
          sections: state.sections.map((s) => 
            s.id === id ? { ...s, room: status } : s
          ),
        })),
      
      //Rooms
      classrooms: [],
      addClassroom: (classroom) => 
        set((state) => ({
          classrooms: [...state.classrooms, {...classroom}]
        })),
      removeClassroom: (id) => 
        set((state) => ({
          classrooms: state.classrooms.filter((classroom) => classroom.id !== id)
        })),
      
      labrooms: [],
      addLabroom: (labroom) => 
        set((state) => ({
          labrooms: [...state.labrooms, {...labroom}]
        })),
      removeLabroom: (id) => 
        set((state) => ({
          labrooms: state.labrooms.filter((labroom) => labroom.id !== id)
        })),

    }),
    {
      name: 'timetable-storage', // Unique key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
