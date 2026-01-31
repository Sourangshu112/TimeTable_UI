'use client'
import { useState, useMemo } from 'react';
import { X, Plus, Trash2 } from 'lucide-react'; // Removed Search import
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
    // Changed: These are now direct input values, not search queries
    const [subjectName, setSubjectName] = useState("");
    const [subjectHour, setSubjectHour] = useState("")
    const [facultyName, setFacultyName] = useState("");
    const [facultyInitial, setFacultyInitial] = useState(""); // Needed for Faculty ID
    const [subjectMap, setSubjectMap] = useState([]); 

    // --- 4. Store Data ---
    const classrooms = useStorage((state) => state.classrooms);
    const addClassroom = useStorage((state) => state.addClassroom); 
    const autoSections = useStorage((state) => state.autoSections);
    const sections = useStorage((state) => state.sections);
    const updateSectionRoom = useStorage((state) => state.updateSectionRoom);
    const theorySubjects = useStorage((state) => state.theorySubjects); 
    const facultys = useStorage((state) => state.facultys);
    const addTheorySubject = useStorage((state) => state.addTheorySubject);
    const addFaculty = useStorage((state) => state.addFaculty);

    // --- 5. Helpers & Filters ---

    // Filter Sections (Kept as is)
    const allSections = useMemo(() => [...autoSections, ...sections], [autoSections, sections]);
    const filteredSections = useMemo(() => {
        return allSections.filter(sec => 
            sec.id.toLowerCase().includes(batchSearch.toLowerCase()) &&
            !addedBatches.includes(sec.id)
        );
    }, [allSections, batchSearch, addedBatches]);

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
        // 1. Validation
        if (!subjectName || !subjectHour || !facultyName || !facultyInitial) {
            alert("Please enter All the fields");
            return;
        }

        const subId = subjectName.trim();
        const facId = facultyInitial.trim().toUpperCase(); // Using initial as ID
        
        // 2. Check & Add Subject if it doesn't exist
        const subjectExists = theorySubjects.find(s => s.id.toUpperCase() === subId.toUpperCase());
        if (!subjectExists) {
            addTheorySubject({
                name: subjectName.toUpperCase(),
                hours: parseInt(subjectHour),
                id: subId.toUpperCase(), 
            });
        }

        // 3. Check & Add Faculty if it doesn't exist
        const facultyExists = facultys.find(f => f.id === facId.toUpperCase());
        if (!facultyExists) {
            const obj = {
            name: facultyName,
            initial: facId.toUpperCase(),
            id: facId.toUpperCase(),
            }
            addFaculty(obj);
        }

        // 4. Link them in the local map
        if (subjectMap.find(m => m.subjectId === subId)) {
            alert("This subject is already allocated in this room");
            return;
        }

        setSubjectMap([...subjectMap, { 
            subjectId: subId, 
            facultyId: facId, // Storing ID
            facultyName: facultyName // Storing Name for display (optional)
        }]);
        
        // 5. Reset fields
        setSubjectName("");
        setSubjectHour("");
        setFacultyName("");
        setFacultyInitial("");
    };

    const handleRemoveSubjectMap = (subId) => {
        setSubjectMap(subjectMap.filter(m => m.subjectId !== subId));
    };

    const handleSave = () => {
        if(!name){
            alert("Please enter Room Name");
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
        setSubjectName("");
        setSubjectHour("");
        setFacultyName("");
        setFacultyInitial("");
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
                    <h2 className="text-xl font-bold text-slate-800">Configure Class</h2>
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
                            placeholder="e.g. L-301" 
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
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 mb-1 font-semibold">Select Section</label>
                                <select 
                                    value={selectedBatchId} 
                                    onChange={(e) => setSelectedBatchId(e.target.value)}
                                    className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                >                               
                                    <option value="" disabled>Select a Section...</option>
                                    {filteredSections
                                        .filter(sec => !sec.room)
                                        .map(sec => (
                                            <option key={sec.id} value={sec.id}>{sec.id}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button 
                                onClick={handleAddBatch}
                                disabled={!selectedBatchId}
                                className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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

                    {/* 3. Subject & Faculty Map (NEW DIRECT INPUTS) */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            Quick Add & Link Subject/Faculty
                        </label>
                        <p className="text-xs text-slate-500">Enter new or existing details. They will be saved to the database automatically.</p>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                            
                            {/* Subject Input */}
                            <div className="md:col-span-3">
                                <InputWithLabel 
                                    labelName="Subject Name" 
                                    placeholder="e.g. Physics" 
                                    value={subjectName} 
                                    onChange={(e) => setSubjectName(e.target.value)}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <InputWithLabel 
                                    labelName="Hrs/week" 
                                    placeholder="3 or 4" 
                                    value={subjectHour} 
                                    onChange={(e) => setSubjectHour(e.target.value)}
                                />
                            </div>

                            {/* Faculty Name Input */}
                            <div className="md:col-span-5">
                                <InputWithLabel 
                                    labelName="Faculty Name" 
                                    placeholder="e.g. Dr. Smith" 
                                    value={facultyName} 
                                    onChange={(e) => setFacultyName(e.target.value)}
                                />
                            </div>

                            {/* Faculty Initial Input */}
                            <div className="md:col-span-2">
                                <InputWithLabel 
                                    labelName="Initial (ID)" 
                                    placeholder="e.g. DS" 
                                    value={facultyInitial} 
                                    onChange={(e) => setFacultyInitial(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Add Button */}
                        <button 
                            onClick={handleAddSubjectMap}
                            className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-2 mt-2"
                        >
                            <Plus size={16} /> Save & Assign
                        </button>

                        {/* Allocation Table */}
                        {subjectMap.length > 0 && (
                            <div className="border border-slate-200 rounded-lg overflow-hidden mt-4">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 font-semibold">
                                        <tr>
                                            <th className="p-2 pl-4">Subject</th>
                                            <th className="p-2">Faculty (ID)</th>
                                            <th className="p-2 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {subjectMap.map((map, idx) => (
                                            <tr key={idx} className="bg-white hover:bg-slate-50 transition-colors">
                                                <td className="p-2 pl-4 font-medium text-slate-800">{map.subjectId}</td>
                                                <td className="p-2 text-slate-600">
                                                    {map.facultyName ? `${map.facultyName} (${map.facultyId})` : map.facultyId}
                                                </td>
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
                    <SaveNextButton text="Complete..." onClick={handleSave} />
                </div>
            </div>
        </div>
    )
}