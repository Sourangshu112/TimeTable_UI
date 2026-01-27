'use client'
import { useState,useEffect } from 'react';
import { X } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';
import { useStorage } from '@/app/storage';

export default function AddSubjectModal(params){
    const [name,setName] = useState("");
    const [code,setCode] = useState("");
    const [dept,setDept] = useState("");
    const [type,setType] = useState("");
    const [hours,setHours] = useState();

    const subjects = useStorage((state) => state.subjects);
    const addSubject = useStorage((state) => state.addSubject);

    const handleAdd = () => {
      if (!name || !code || !dept || !type || !hours){
        alert("Please enter all the fields")
        return
      }
      if(subjects.find(s => s.id === code)){
        alert("Slready Exists");
        return;
      }

      addSubject({name, code, dept , type, hours});
      setName("");
      setCode("");
      setDept("");
      setType("");
      setHours()
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
                    <h2 className="text-xl font-bold text-slate-800">Create New Subject</h2>
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
                    <InputWithLabel labelName="Subject Name" type="text" placeholder="Basic Electrical" onChange={(e) => setName(e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                        <InputWithLabel labelName="Subject Code" type="text" placeholder="ES-EE-101" onChange={(e) => setCode(e.target.value)} />
                        <InputWithLabel labelName="Department" type="text" placeholder="Electrical" onChange={(e) => setDept(e.target.value)} />                        
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Type of subject</label>            
                            <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            id="type"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                            >
                                <option value="" disabled>select-one</option>
                                <option value="theory">theory</option>
                                <option value="practical">practical</option>
                            </select>
                            </div>
                        <InputWithLabel labelName="Lecture hrs per week" type="number" placeholder="3 or 4" onChange={(e) => setHours(e.target.value)} />                        
                    </div>
                    <div className="pt-4">
                        <SaveNextButton text="Save Subject" onClick={handleAdd} />
                    </div>
                    <div>
                        {/* Existing  course for the department will be added here somehow */}
                    </div>
                    </form>
                </div>
              </div>
            </div>
    )
}