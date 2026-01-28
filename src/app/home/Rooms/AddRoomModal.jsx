'use client'
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';
import { useStorage } from '@/app/storage';

export default function AddRoomModal(params){
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const classrooms = useStorage((state) => state.classrooms);
    const addClassroom = useStorage((state) => state.addclassroom);
    const labrooms = useStorage((state) => state.labrooms);
    const addLabroom = useStorage((state) => state.addLabroom);
    

    const handleAdd = () => {
        if(!name || !type){
            alert("Please enter both the room name and type");
            return;
        }
        // Optional: Check for duplicate room names
        const isClassDuplicate = classrooms.find(r => r.id.toLowerCase() === name.toLowerCase());
        const isLabDuplicate = labrooms.find(l => l.id.toLowerCase() === name.toLowerCase());
        if (isClassDuplicate || isLabDuplicate) {
            alert("A room with this name already exists");
            return;
        }
        const obj = {
            name: name,
            type: type,
            subjects : [],
            id: name,
        }
        if(type === "Classroom") addClassroom(obj);
        if(type === "Labroom") addLabroom(obj);

        setName("");
        setType("");
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
                    <h2 className="text-xl font-bold text-slate-800">Create New Room</h2>
                    <button 
                        onClick={params.onClose}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                {/* Form Content */}
                <div className="p-8">
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Room Name Input */}
                            <InputWithLabel 
                                labelName="Room Name / Number" 
                                type="text" 
                                placeholder="L-301 or Physics Lab" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            />

                            {/* Room Type Dropdown */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Room Type</label>
                                <select 
                                    value={type} 
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="" disabled>Select Type</option>
                                    <option value="Classroom">Theory Classroom</option>
                                    <option value="Labroom">Labroom</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4">
                            <SaveNextButton text="Save Room" onClick={handleAdd} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}