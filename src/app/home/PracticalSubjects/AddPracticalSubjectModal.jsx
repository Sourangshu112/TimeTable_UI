'use client'
import { useState } from 'react';
import { X } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';
import { useStorage } from '@/app/storage';

export default function AddPracticalSubjectModal(params) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [dept, setDept] = useState("");
    const [hours, setHours] = useState("");

    const practicalSubjects = useStorage((state) => state.practicalSubjects);
    const addPracticalSubject = useStorage((state) => state.addPracticalSubject);

    const handleAdd = () => {
        if (!name || !code || !dept || !hours) {
            alert("Please enter all the fields");
            return;
        }

        if (practicalSubjects.find(s => s.id === code.toUpperCase())) {
            alert("Practical Subject already exists!");
            return;
        }

        const obj = {
            name: name,
            code: code.toUpperCase(),
            dept: dept,
            hours: hours,
            id: code.toUpperCase()
        };

        addPracticalSubject(obj);

        // Reset fields
        setName("");
        setCode("");
        setDept("");
        setHours("");
        params.onClose();
    };

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
                <div className="flex justify-between items-center p-6 pb-3 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Create New Practical Subject</h2>
                    <button 
                        onClick={params.onClose}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-8 pt-0">
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <p text-xs font-bold text-slate-400>If lab is 4 hrs split into 2 class of 2 hrs then enter 2,2. Else if countinuous then enter 4</p>
                        <InputWithLabel labelName="Lab/Practical Name" type="text" placeholder="Data Structures Lab" onChange={(e) => setName(e.target.value)} />
                        <div className="grid grid-cols-3 gap-4">
                            <InputWithLabel labelName="Lab Code" type="text" placeholder="CS-PC-101" onChange={(e) => setCode(e.target.value)} />
                            <InputWithLabel labelName="Department" type="text" placeholder="CSE" onChange={(e) => setDept(e.target.value)} />
                            <InputWithLabel labelName="Lab hrs per week" type="text" placeholder="2 or 3" onChange={(e) => setHours(e.target.value)} />                        
                        </div>                       
                        <div className="pt-4">
                            <SaveNextButton text="Save Practical Subject" onClick={handleAdd} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}