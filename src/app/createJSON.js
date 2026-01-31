import { useStorage } from "./storage"; 

// Update this to your actual Django API URL
const API_ENDPOINT = ""; 

export const exportToJson = async () => {
  const state = useStorage.getState();

  // 1. Prepare the data exactly as before
  const data = {
    institution: state.institution,
    course: state.course,
    departments: state.department,
    faculty: state.faculty,
    theorySubjects: state.theorySubjects,
    practicalSubjects: state.practicalSubjects,
    sections: [...state.autoSections, ...state.sections], 
    classrooms: state.classrooms,
    labrooms: state.labrooms,
  };

  try {
    // 2. Send the POST request
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Success:", result);
    alert("Data sent to backend successfully!");

  } catch (error) {
    console.error("Failed to send data:", error);
    alert("Failed to send data. Check console for details.");
  }
};