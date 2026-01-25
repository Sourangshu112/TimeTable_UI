// src/app/components/AddCourseModal.js
'use client'
import { useState } from 'react';
import { X } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';


export default function AddCourseModal(params) {
  // If the modal is not open, render nothing
    const [courseName,setCourseName] = useState("");  
    const [courseStartingTime,setCourseStartingTime] = useState("");    
    const [courseSlots,setCourseSlots] = useState(null);    
    const [courseLunchSlot,setLunchSlot] = useState(null);  

  if (!params.isOpen) return null;

  return (
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
            <h2 className="text-xl font-bold text-slate-800">Create New Course</h2>
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
            <InputWithLabel labelName="Course Name" type="text" placeholder="e.g. B.Tech" />

            <div className="grid grid-cols-2 gap-4">
                <InputWithLabel labelName="Starting Time" type="time" />
                <InputWithLabel labelName="Slot Length (hours)" type="number" placeholder="1/1.5" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <InputWithLabel labelName="Slots Per Day" type="number" placeholder="8" />
                <InputWithLabel labelName="Break Slot Number" type="number" placeholder="4" />
            </div>

            <div className="pt-4">
                <SaveNextButton text="Save Course" />
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}