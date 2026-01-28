'use client'
import { useState } from 'react';
import { X } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';
import { useStorage } from '@/app/storage';

export default function AddDepartmentModal(params){
    const [deptName,setDeptName] = useState("");
    const [courseInDept,setCourseInDept] = useState([]);

    const courses = useStorage((state) => state.courses);
    const departments = useStorage((state) => state.departments);
    const addDepartment = useStorage((state) => state.addDepartment)
    
    const handleToggle = (id,isChecked) => {
        if (isChecked)
            setCourseInDept([...courseInDept,id])
        else 
            setCourseInDept(courseInDept.filter((courseId) => courseId !== id ));
    }

    const handleAdd = () => {
        if(!deptName){
            alert("Please enter a department name");
            return
        }
        if(departments.find(d => d.id.toUpperCase() === deptName.toUpperCase())){
          alert("Already exists");
          return;
        }
        const obj = {
          deptName: deptName,
          courseInDept: courseInDept,
          id: deptName
        }
        addDepartment(obj)
        setDeptName("");
        setCourseInDept([]);
        params.onClose();
    }

    if (!params.isOpen) return null;

    return(
        <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              onClick={params.onClose}
            >  
              <div 
                className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl relative animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Header with Close Button */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Create New Department</h2>
                    <button 
                        onClick={params.onClose}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                {/* Scrollable Form Content */}
                <div className="p-8">
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <InputWithLabel labelName="Department Name" type="text" placeholder="Electrical" onChange={(e) => setDeptName(e.target.value)} />
                    <div className="space-y-3">
      <label className="text-sm font-semibold text-slate-700">Select Courses for Department</label>
      
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courses.map((course) => (
                <label 
                  key={course.id} 
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors border-slate-200 has-:checked:border-blue-500 has-:checked:bg-blue-50"
                >
                  {/* The Hidden Native Checkbox */}
                  <input 
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    value={course.id}
                    onChange={(e) => handleToggle(course.id,e.target.checked)}
                  />

                  {/* The Course Label */}
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-slate-900">{course.name}</span>
                  </div>
                </label>
              ))}
            </div>
            {/* Fallback if no courses exist */}
            {courses.length === 0 && (
              <p className="text-sm text-slate-400 italic">No courses created yet.</p>
            )}
            </div>
                    <div className="pt-4">
                        <SaveNextButton text="Save Department" onClick={handleAdd} />
                    </div>
                    </form>
                </div>
              </div>
            </div>
    )
}