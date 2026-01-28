'use client'
import { useState, useMemo } from 'react';
import { X, Plus, Trash2, Search } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';
import { useStorage } from '@/app/storage';

export default function AddClassRoomModal(params){
    // --- 1. Basic Room State ---
    const [name, setName] = useState("");

    // --- 2. Batch (Section) State ---
    const [selectedBatchId, setSelectedBatchId] = useState("");
    const [batchSearch, setBatchSearch] = useState("");
    const [addedBatches, setAddedBatches] = useState([]);

    // --- 3. Subject-Faculty State ---
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [subjectSearch, setSubjectSearch] = useState(""); 
    const [facultySearch, setFacultySearch] = useState("");
    const [subjectMap, setSubjectMap] = useState([]); 

    // --- 4. Store Data (with safety fallbacks) ---
    const classrooms = useStorage((state) => state.classrooms);
    const addClassroom = useStorage((state) => state.addClassroom); 
    
    const autoSections = useStorage((state) => state.autoSections);
    const sections = useStorage((state) => state.sections);
    const facultys = useStorage((state) => state.facultys);
    const theorySubjects = useStorage((state) => state.theorySubjects); 
    const updateSectionRoom = useStorage((state) => state.updateSectionRoom);

    // --- 5. Helpers & Filters ---

    // A. Filter Sections
    const allSections = useMemo(() => [...autoSections, ...sections], [autoSections, sections]);
    const filteredSections = useMemo(() => {
        return allSections.filter(sec => 
            sec.id.toLowerCase().includes(batchSearch.toLowerCase()) &&
            !addedBatches.includes(sec.id)
        );
    }, [allSections, batchSearch, addedBatches]);

    // B. Filter Subjects (NEW)
    const filteredSubjects = useMemo(() => {
        return theorySubjects.filter(sub => 
            sub.name.toLowerCase().includes(subjectSearch.toLowerCase())
        );
    }, [theorySubjects, subjectSearch]);

    // C. Filter Faculty (NEW)
    const filteredFaculty = useMemo(() => {
        return facultys.filter(fac => 
            fac.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
            fac.initial?.toLowerCase().includes(facultySearch.toLowerCase())
        );
    }, [facultys, facultySearch]);

    // --- 6. Handlers ---

    const handleAddBatch = () => {
        if (!selectedBatchId) return;
        setAddedBatches([...addedBatches, selectedBatchId]);
        setSelectedBatchId("");
        setBatchSearch("");
    };

    const handleRemoveBatch = (idToRemove) => {
        setAddedBatches(addedBatches.filter(id => id !== idToRemove));
    };

    const handleAddSubjectMap = () => {
        if (!selectedSubject || !selectedFaculty) {
            alert("Please select both a Subject and a Faculty");
            return;
        }
        if (subjectMap.find(m => m.subjectId === selectedSubject)) {
            alert("This subject is already allocated");
            return;
        }

        setSubjectMap([...subjectMap, { subjectId: selectedSubject, facultyId: selectedFaculty }]);
        
        // Reset selections but keep searches (optional preference)
        setSelectedSubject("");
        setSelectedFaculty("");
    };

    const handleRemoveSubjectMap = (subId) => {
        setSubjectMap(subjectMap.filter(m => m.subjectId !== subId));
    };

    const handleSave = () => {
        if(!name){
            alert("Please enter Room Name and Type");
            return;
        }

        const isClassDuplicate = classrooms.find(r => r.id.toLowerCase() === name.toLowerCase());
        if (isClassDuplicate) {
            alert("A room with this name already exists");
            return;
        }

        const newRoom = {
            name: name,
            batches: addedBatches,     
            subjects: subjectMap,      
            id: name,
        };
        addClassroom(newRoom)
        
        addedBatches.forEach((batchId) => {
            updateSectionRoom(batchId, true);
        });

        setName("");
        setAddedBatches([]);
        setSubjectMap([]);
        setBatchSearch("");
        setSubjectSearch("");
        setFacultySearch("");
        params.onClose();
    };

    if (!params.isOpen) return null;

    return(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={params.onClose}
        >  
            <div 
                className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* --- Header --- */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
                    <h2 className="text-xl font-bold text-slate-800">Configure Class/Lab</h2>
                    <button onClick={params.onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                        <X size={20} />
                    </button>
                </div>
                
                {/* --- Scrollable Content --- */}
                <div className="p-8 overflow-y-auto space-y-8">
                    
                    {/* 1. Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                        <InputWithLabel 
                            labelName="Room Name" 
                            type="text" 
                            placeholder="L-301" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>

                    {/* 2. Batch/Section Manager */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Assign Batches (Sections)
                        </label>
                        
                        {/* Batch Search & Add Bar */}
                        <div className="flex gap-2 items-end">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search sections..." 
                                    value={batchSearch}
                                    onChange={(e) => setBatchSearch(e.target.value)}
                                    className="w-full pl-9 p-2 text-sm border border-slate-200 rounded-t-lg border-b-0 focus:outline-none"
                                />
                                <select 
                                    value={selectedBatchId} 
                                    size={batchSearch.length > 0 ? 5 : 1} 
                                    onChange={(e) => {
                                        setSelectedBatchId(e.target.value);
                                        setBatchSearch("");
                                    }}
                                    className={`w-full p-3 border border-slate-200 rounded-b-lg bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none ${
                                        batchSearch.length > 0 ? "absolute z-10 shadow-lg top-full left-0 max-h-40 overflow-y-auto" : ""
                                    }`}>                               
                                    <option value="" disabled>Select a Section...</option>
                                    {filteredSections
                                        .filter(sec => !sec.room) // Only allow sections where room is false
                                        .map(sec => (
                                            <option key={sec.id} value={sec.id}>{sec.id}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button 
                                onClick={handleAddBatch}
                                disabled={!selectedBatchId}
                                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {/* Chips */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {addedBatches.length === 0 && <p className="text-xs text-slate-400 italic">No batches assigned yet.</p>}
                            {addedBatches.map(id => (
                                <span key={id} className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                                    {id}
                                    <button onClick={() => handleRemoveBatch(id)} className="hover:text-red-500"><X size={14}/></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* 3. Subject & Faculty Map (Two-Column Search) */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            Subject & Faculty Allocation
                        </label>

                        {/* Searchable Inputs Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            
                            {/* Column 1: Subject Search */}
                            <div className="flex flex-col relative">
                                <label className="text-xs text-slate-500 mb-1 font-semibold">Subject</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 text-slate-400" size={14} />
                                    <input 
                                        type="text" 
                                        placeholder="Search Subject..." 
                                        value={subjectSearch}
                                        onChange={(e) => setSubjectSearch(e.target.value)}
                                        className="w-full pl-8 p-2 text-xs border border-slate-200 rounded-t-lg border-b-0 focus:outline-none"
                                    />
                                    <select 
                                        value={selectedSubject} 
                                        size={subjectSearch.length > 0 ? 5 : 1} // Expands on search
                                        onChange={(e) => setSelectedSubject(e.target.value)}
                                        className={`w-full p-2 border border-slate-200 rounded-b-lg bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none ${
                                            subjectSearch.length > 0 ? "absolute z-10 shadow-lg top-full left-0" : ""
                                        }`}>                                   
                                        <option value="">Select Subject...</option>
                                        {filteredSubjects.map(sub => (
                                            <option key={sub.id || sub.code} value={sub.name}>{sub.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Column 2: Faculty Search */}
                            <div className="flex flex-col relative">
                                <label className="text-xs text-slate-500 mb-1 font-semibold">Faculty</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 text-slate-400" size={14} />
                                    <input 
                                        type="text" 
                                        placeholder="Search Faculty..." 
                                        value={facultySearch}
                                        onChange={(e) => setFacultySearch(e.target.value)}
                                        className="w-full pl-8 p-2 text-xs border border-slate-200 rounded-t-lg border-b-0 focus:outline-none"
                                    />
                                    <select 
                                        value={selectedFaculty} 
                                        size={facultySearch.length > 0 ? 5 : 1} // Expands on search
                                        onChange={(e) => setSelectedFaculty(e.target.value)}
                                        className={`w-full p-2 border border-slate-200 rounded-b-lg bg-slate-50 text-sm focus:ring-2 focus:ring-emerald-500 outline-none ${
                                            facultySearch.length > 0 ? "absolute z-10 shadow-lg top-full left-0" : ""
                                        }`}
>                                   
                                        <option value="">Select Faculty...</option>
                                        {filteredFaculty.map(fac => (
                                            <option key={fac.id || fac.name} value={fac.name}>{fac.name} ({fac.initial})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Add Button */}
                        <button 
                            onClick={handleAddSubjectMap}
                            className="w-full py-2 bg-emerald-50 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-2 mt-2"
                        >
                            <Plus size={16} /> Link Subject to Faculty
                        </button>

                        {/* Allocation Table */}
                        {subjectMap.length > 0 && (
                            <div className="border border-slate-200 rounded-lg overflow-hidden mt-2">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 font-semibold">
                                        <tr>
                                            <th className="p-2 pl-4">Subject</th>
                                            <th className="p-2">Faculty</th>
                                            <th className="p-2 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {subjectMap.map((map, idx) => (
                                            <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors">
                                                <td className="p-2 pl-4 font-medium text-slate-800">{map.subjectId}</td>
                                                <td className="p-2 text-slate-600">{map.facultyId}</td>
                                                <td className="p-2 text-center">
                                                    <button onClick={() => handleRemoveSubjectMap(map.subjectId)} className="text-slate-400 hover:text-red-500 transition-colors">
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

                </div>

                {/* --- Footer --- */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-xl shrink-0">
                    <SaveNextButton text="Create Classroom Config" onClick={handleSave} />
                </div>
            </div>
        </div>
    )
}