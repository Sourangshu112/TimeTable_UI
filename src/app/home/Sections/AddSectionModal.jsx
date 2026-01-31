'use client'
import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';
import { useStorage } from '@/app/storage';

export default function AddSectionModal(params){
    const [dept, setDept] = useState("");
    const [course, setCourse] = useState("");
    const [sem, setSem] = useState("");
    const [groupName, setGroupName] = useState("");
    const sections = useStorage((state) => state.sections);
    const autoSections = useStorage((state) => state.autoSections);
    const addSection = useStorage((state) => state.addSection);
    const courses = useStorage((state) => state.courses);
    const departments = useStorage((state) => state.departments);


    const handleAdd = () => {
        if(!dept || !course || !sem || !groupName){
            alert("Please select all fields");
            return
        }
        const id = `${course}-${dept}-${sem}-${groupName}`;
        if (sections.find(s => s.id === id)){
            alert("Already exists");
            return;
        }

        if (autoSections.find(s => s.id === id)){
            alert("Already exists");
            return;
        }
        const newSection = {
            department: dept, 
            course: course,  
            sem: parseInt(sem),
            Group: groupName,
            room: false,
            id: id,
        };
        addSection(newSection);
        setDept("");
        setCourse("");
        setSem("");
        setGroupName("");
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
                    <h2 className="text-xl font-bold text-slate-800">Create New Section</h2>
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
                    
                    {/* Row 1: Department & Course Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Department Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">Department</label>
                            <select 
                                value={dept} 
                                onChange={(e) => setDept(e.target.value)}
                                className="w-full p-3 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value="" disabled>Select Department</option>
                                {/* DYNAMIC MAPPING */}
                                {departments.map((d, index) => (
                                    <option key={d.id || index} value={d.deptName}>
                                        {d.deptName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Course Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">Course</label>
                            <select 
                                value={course} 
                                onChange={(e) => {
                                    setCourse(e.target.value);
                                    setSem(""); 
                                }}
                                className="w-full p-3 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value="" disabled>Select Course</option>
                                {/* DYNAMIC MAPPING */}
                                {courses.map((c, index) => (
                                    <option key={c.id || index} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Sem Dropdown & Group Name Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Sem Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">Semester</label>
                            <select 
                                value={sem} 
                                onChange={(e) => setSem(e.target.value)}
                                disabled={!course} // Disable until course is picked
                                className="w-full p-3 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
                            >
                                <option value="" disabled>Select Sem</option>
                                {/* SMART YEAR GENERATION */}
                                {autoSections.map((y) => (
                                    <option key={y.sem} value={y.sem}>{y.sem}</option>
                                ))}
                            </select>
                        </div>

                        {/* Group Name Input */}
                        <InputWithLabel 
                            labelName="Group Name" 
                            type="text" 
                            placeholder="A" 
                            value={groupName} // Added controlled value binding
                            onChange={(e) => setGroupName(e.target.value)} 
                        />                        
                    </div>

                    <div className="pt-4">
                        <SaveNextButton text="Save Section" onClick={handleAdd} />
                    </div>
                    </form>
                </div>
              </div>
            </div>
    )
}