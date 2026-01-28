import { useStorage } from "./storage"; 

// Add 'export' here
export const exportToJson = () => {
  const state = useStorage.getState();

  const data = {
    institution: state.institution,
    course: state.course,
    department: state.department,
    faculty: state.faculty,
    theorySubjects: state.theorySubjects,
    practicalSubjects: state.practicalSubjects,
    section: [...state.autoSections, ...state.sections], 
    classrooms: state.classrooms,
    labrooms: state.labrooms,
  };

  downloadJson(data, 'my-app-state.json'); // Note: changed exportData to data to match your variable
};

// Internal helper
const downloadJson = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};