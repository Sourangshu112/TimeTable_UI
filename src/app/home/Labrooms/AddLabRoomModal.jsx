'use client'
import { useState, useMemo } from 'react';
import { X, Plus, Trash2, Search, FlaskConical } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';
import { useStorage } from '@/app/storage';

export default function AddLabRoomModal(params){
    // --- 1. Basic Room Details ---
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");

    // --- 2. Allocation State (The "labs" array items) ---
    const [selectedBatchId, setSelectedBatchId] = useState("");
    const [batchSearch, setBatchSearch] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [subjectSearch, setSubjectSearch] = useState("");
    const [teacher, setTeacher] = useState("");
    const [teacherSearch, setTeacherSearch] = useState("");
    const [trainer, setTrainer] = useState(""); 
    const [trainerSearch, setTrainerSearch] = useState("");
    const [labsList, setLabsList] = useState([]);

    // --- 3. Store Data ---
    const labrooms = useStorage((state) => state.labrooms);
    const addLabroom = useStorage((state) => state.addLabroom);
    
    const autoSections = useStorage((state) => state.autoSections);
    const sections = useStorage((state) => state.sections);
    const facultys = useStorage((state) => state.facultys);
    const practicalSubjects = useStorage((state) => state.practicalSubjects); 

    // --- 4. Filtering Helpers (Search Logic) ---
    const allSections = useMemo(() => [...autoSections, ...sections], [autoSections, sections]);
    
    const filteredSections = useMemo(() => allSections.filter(sec => 
        sec.id.toLowerCase().includes(batchSearch.toLowerCase())
    ), [allSections, batchSearch]);

    const filteredSubjects = useMemo(() => practicalSubjects.filter(sub => 
        sub.name.toLowerCase().includes(subjectSearch.toLowerCase())
    ), [practicalSubjects, subjectSearch]);

    const filteredTeacher = useMemo(() => facultys.filter(fac => 
        fac.name.toLowerCase().includes(teacherSearch.toLowerCase())
    ), [facultys, teacherSearch]);

    const filteredTrainer = useMemo(() => facultys.filter(fac => 
        fac.name.toLowerCase().includes(trainerSearch.toLowerCase())
    ), [facultys, trainerSearch]);

    // --- 5. Handlers ---

    const handleAddAllocation = () => {
        if (!selectedBatchId || !selectedSubject || !teacher) {
            alert("Batch, Subject, and at least Faculty 1 are required");
            return;
        }

        const allocationObj = {
            batch: selectedBatchId,
            subject: selectedSubject,
            teacher: teacher,
            trainer: trainer || "N/A",
        };

        setLabsList([...labsList, allocationObj]);

        // Reset allocation fields for next entry
        setSelectedBatchId("");
        setSelectedSubject("");
        setTeacher("");
        setTrainer("");
        setBatchSearch("");
        setSubjectSearch("");
        setTeacherSearch("");
        setTrainerSearch("");
    };

    const handleRemoveAllocation = (indexToRemove) => {
        setLabsList(labsList.filter((_, index) => index !== indexToRemove));
    };

    const handleSave = () => {
        if(!name || !dept){
            alert("Please enter Room Name and Department");
            return;
        }

        if(labrooms.find(l => l.id.toLowerCase() === name.toLowerCase())){
            alert("Lab Room name already exists");
            return;
        }

        // The Master Object Structure you requested
        const newLabRoom = {
            name: name,
            department: dept,
            labs: labsList, // [{batch, subject, teacher1, teacher2, trainer}, ...]
            id: name,
            type: "Labroom"
        };

        addLabroom(newLabRoom);

        // Reset Form
        setName("");
        setDept("");
        setLabsList([]);
        params.onClose();
    };

    if (!params.isOpen) return null;

    return(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={params.onClose}
        >  
            <div 
                className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Configure Lab Room</h2>
                    <button onClick={params.onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                        <X size={20} />
                    </button>
                </div>
                
                {/* Scrollable Content */}
                <div className="p-8 overflow-y-auto space-y-6">
                    
                    {/* 1. Room Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputWithLabel 
                            labelName="Lab Name/Number" 
                            type="text" 
                            placeholder="Chemistry Lab 1" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                         <InputWithLabel 
                            labelName="Department" 
                            type="text" 
                            placeholder="Science" 
                            value={dept} 
                            onChange={(e) => setDept(e.target.value)} 
                        />
                    </div>

                    <hr className="border-slate-100" />

                    {/* 2. Allocation Form */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                        <h3 className="text-sm font-bold text-slate-700">Add Practical Batch</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {/* Batch Search */}
                            <div className="relative">
                                <label className="text-xs font-semibold text-slate-500">Batch (Section)</label>
                                <input 
                                    type="text" 
                                    placeholder="Search Batch..." 
                                    value={batchSearch}
                                    onChange={(e) => setBatchSearch(e.target.value)}
                                    className="w-full p-2 text-xs border rounded-t-md focus:outline-none"
                                />
                                <select 
                                    value={selectedBatchId}
                                    size={batchSearch.length > 0 ? 5 : 1} 
                                    onChange={(e) => {
                                        setSelectedBatchId(e.target.value);
                                        setBatchSearch("");
                                    }}
                                    className={`w-full p-2 border rounded-b-md text-sm outline-none ${
                                        batchSearch.length > 0 
                                            ? "absolute z-10 shadow-xl top-7/12 left-0 bg-white max-h-40 overflow-y-auto" 
                                            : "bg-slate-50"
                                    }`}>
                                    <option value="">Select Batch...</option>
                                    {filteredSections.map(s => <option key={s.id} value={s.id}>{s.id}</option>)}
                                </select>
                            </div>

                            {/* Subject Search */}
                            <div className="relative">
                                <label className="text-xs font-semibold text-slate-500">Practical Subject</label>
                                <input 
                                    type="text" 
                                    placeholder="Search Subject..." 
                                    value={subjectSearch}
                                    onChange={(e) => setSubjectSearch(e.target.value)}
                                    className="w-full p-2 text-xs border rounded-t-md focus:outline-none"
                                />
                                <select 
                                    value={selectedSubject}
                                    size={subjectSearch.length > 0 ? 5 : 1}
                                    onChange={(e) => {
                                        setSelectedSubject(e.target.value);
                                        setSubjectSearch("");
                                    }}
                                    className={`w-full p-2 border rounded-b-md text-sm outline-none ${
                                        subjectSearch.length > 0 
                                            ? "absolute z-10 shadow-xl top-7/12 left-0 bg-white max-h-40 overflow-y-auto" // <--- FIX 2: Added bg-white & z-50
                                            : "bg-slate-50"
                                    }`}>
                                    <option value="">Select Subject...</option>
                                    {filteredSubjects.map(s => <option key={s.id || s.code} value={s.name}>{s.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {/* Teacher 1 */}
                             <div className="relative">
                                <label className="text-xs font-semibold text-slate-500">Teacher</label>
                                <input 
                                    type="text" 
                                    placeholder="Search Teacher..." 
                                    value={teacherSearch}
                                    onChange={(e) => setTeacherSearch(e.target.value)}
                                    className="w-full p-2 text-xs border rounded-t-md focus:outline-none"
                                />
                                <select 
                                    value={teacher}
                                    size={teacherSearch.length > 0 ? 5 : 1}
                                    onChange={(e) => {
                                        setTeacher(e.target.value);
                                        setTeacherSearch("")
                                    }}
                                    className={`w-full p-2 border rounded-b-md text-sm outline-none ${
                                        teacherSearch.length > 0 
                                            ? "absolute z-10 shadow-xl top-7/12 left-0 bg-white max-h-40 overflow-y-auto" // <--- FIX 2: Added bg-white & z-50
                                            : "bg-slate-50"
                                    }`}>
                                    <option value="">Select Teacher</option>
                                    {filteredTeacher.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                                </select>
                            </div>

                            {/* Teacher 2 */}
                             <div className="relative">
                                <label className="text-xs font-semibold text-slate-500">Trainer</label>
                                <input 
                                    type="text" 
                                    placeholder="Search Trainer" 
                                    value={trainerSearch}
                                    onChange={(e) => setTrainerSearch(e.target.value)}
                                    className="w-full p-2 text-xs border rounded-t-md focus:outline-none"
                                />
                                <select 
                                    value={trainer}
                                    size={trainerSearch.length > 0 ? 5 : 1}
                                    onChange={(e) => {
                                        setTrainer(e.target.value);
                                        setTrainerSearch("")
                                    }}
                                    className={`w-full p-2 border rounded-b-md text-sm outline-none ${
                                        trainerSearch.length > 0 
                                            ? "absolute z-10 shadow-xl top-7/12 left-0 bg-white max-h-40 overflow-y-auto" // <--- FIX 2: Added bg-white & z-50
                                            : "bg-slate-50"
                                    }`}>
                                    <option value="">Select Trainer</option>
                                    {filteredTrainer.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <button 
                            onClick={handleAddAllocation}
                            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                        >
                            <Plus size={18} /> Add to List
                        </button>
                    </div>

                    {/* 3. Allocations Table */}
                    {labsList.length > 0 && (
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-xs md:text-sm text-left">
                                <thead className="bg-slate-100 text-slate-600 font-semibold uppercase">
                                    <tr>
                                        <th className="p-3">Batch</th>
                                        <th className="p-3">Subject</th>
                                        <th className="p-3">Teacher</th>
                                        <th className="p-3">Trainer</th>
                                        <th className="p-3 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {labsList.map((item, idx) => (
                                        <tr key={idx} className="bg-white hover:bg-slate-50">
                                            <td className="p-3 font-medium text-blue-600">{item.batch}</td>
                                            <td className="p-3 font-bold">{item.subject}</td>
                                            <td className="p-3">{item.teacher}</td>
                                            <td className="p-3 text-slate-500">{item.trainer}</td>
                                            <td className="p-3 text-center">
                                                <button onClick={() => handleRemoveAllocation(idx)} className="text-slate-400 hover:text-red-500">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-xl shrink-0">
                    <SaveNextButton text="Save Lab Configuration" onClick={handleSave} />
                </div>
            </div>
        </div>
    )
}