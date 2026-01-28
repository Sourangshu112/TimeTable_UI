'use client'

import { Inbox, FlaskConical } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/app/components/add';
import AddPracticalSubjectModal from './AddPracticalSubjectModal';
import { useStorage } from '@/app/storage';
import DeleteButton from '../delete';

export default function PracticalSubjects() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const practicalSubjects = useStorage((state) => state.practicalSubjects);
    const removePracticalSubject = useStorage((state) => state.removePracticalSubject);

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 border-b border-slate-100">
                    <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                        <FlaskConical size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Practical Subject</h2>
                        <p className="text-sm text-slate-500">Manage Lab & Practical Sessions</p>
                    </div>
                </div>
                <AddButton text="Practical Subject" onClick={() => setIsModalOpen(true)} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-700">Practical Subject Details</h3>
                </div>

                <div className="p-8">
                    {practicalSubjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <div className="bg-slate-100 p-4 rounded-full mb-4">
                                <Inbox size={40} />
                            </div>
                            <p className="text-lg font-medium">No Practical Subject entered</p>
                            <p className="text-sm">Click the Add button to create your first Lab Subject</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {practicalSubjects.map((subject) => (
                                <div 
                                    key={subject.id} 
                                    className="bg-white rounded-xl border border-slate-400 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                                >
                                    <div className="bg-slate-50 p-4 border-b border-slate-400 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-slate-800 tracking-tight truncate mr-2">
                                            {subject.name}
                                        </h3>
                                        <DeleteButton onDelete={() => removePracticalSubject(subject.id)} />
                                    </div>

                                    <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">CODE</span>
                                            <span className="text-slate-700 font-medium truncate">{subject.code}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</span>
                                            <span className="text-slate-700 font-medium truncate">{subject.dept}</span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Hrs/Week</span>
                                            <span className="text-slate-700 font-medium">{subject.hours} hr</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AddPracticalSubjectModal
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}