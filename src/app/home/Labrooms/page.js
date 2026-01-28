'use client'
import { Inbox, FlaskConical, Users, BookOpen } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/app/components/add';
import { useStorage } from '@/app/storage';
import AddLabRoomModal from './AddLabRoomModal';
import DeleteButton from '../delete';

export default function LabRooms() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Get Lab data
    const labrooms = useStorage((state) => state.labrooms || []);
    const removeLabroom = useStorage((state) => state.removeLabroom);

    return (
        <div className="space-y-6 p-6">
            {/* 1. Header Section */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                        <FlaskConical size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Lab Configurations</h2>
                        <p className="text-sm text-slate-500">Manage Practical Sessions & Teachers</p>
                    </div>
                </div>
                <AddButton text="Add Lab Config" onClick={() => setIsModalOpen(true)} />
            </div>

            {/* 2. Main Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Active Laboratories</h3>
                    <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Total: {labrooms.length}
                    </span>
                </div>

                <div className="p-8">
                    {labrooms.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <div className="bg-slate-100 p-4 rounded-full mb-4">
                                <Inbox size={40} />
                            </div>
                            <p className="text-lg font-medium">No Labs Configured</p>
                            <p className="text-sm">Add a lab room and assign practical batches</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
                            {labrooms.map((lab) => (
                                <div 
                                    key={lab.id} 
                                    className="flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-800">{lab.name}</h4>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                                {lab.department} Dept
                                            </p>
                                        </div>
                                        <DeleteButton onDelete={() => removeLabroom(lab.id)} />
                                    </div>

                                    {/* Lab Details List */}
                                    <div className="p-4 bg-white space-y-3">
                                        {lab.labs && lab.labs.length > 0 ? (
                                            lab.labs.map((session, idx) => (
                                                <div key={idx} className="flex flex-col sm:flex-row gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:border-purple-200 transition-colors">
                                                    
                                                    {/* Batch Badge */}
                                                    <div className="flex items-start gap-2 min-w-30">
                                                        <Users size={16} className="text-slate-400 mt-0.5" />
                                                        <div>
                                                            <span className="block text-xs font-bold text-slate-700 uppercase">Batch</span>
                                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                                                                {session.batch}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Subject Info */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-1.5 mb-1">
                                                            <BookOpen size={14} className="text-purple-500" />
                                                            <span className="text-sm font-bold text-slate-800">{session.subject}</span>
                                                        </div>
                                                        
                                                        {/* Faculty Grid */}
                                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
                                                            <div>
                                                                <span className="text-slate-400">Teacher:</span> {session.teacher}
                                                            </div>
                                                            <div>
                                                                <span className="text-slate-400">Trainer:</span> {session.trainer}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-slate-400 text-sm italic">
                                                No practical sessions assigned yet.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AddLabRoomModal
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}