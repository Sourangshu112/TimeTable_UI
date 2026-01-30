'use client'

import { Inbox, Monitor, Users, BookOpen, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/app/components/add';
import { useStorage } from '@/app/storage';
import AddClassRoomModal from './AddClassRoomModal';
import DeleteButton from '../delete';
import SaveNextButton from '@/app/components/save';
import { useRouter } from 'next/navigation';

export default function Classrooms() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Get data and actions from store
    const classrooms = useStorage((state) => state.classrooms || []);
    const removeClassroom = useStorage((state) => state.removeClassroom);

    return (
        <div className="space-y-6 p-6">
            {/* 1. Header Section */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                        <Monitor size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Room Configurations</h2>
                        <p className="text-sm text-slate-500">Manage room allocations and linked faculty</p>
                    </div>
                </div>
                <AddButton text="Add Room" onClick={() => setIsModalOpen(true)} />
            </div>

            {/* 2. Main Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Room Details & Assignments</h3>
                    <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        Total: {classrooms.length}
                    </span>
                </div>

                <div className="p-8">
                    {classrooms.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <div className="bg-slate-200 p-4 rounded-full mb-4">
                                <Inbox size={40} />
                            </div>
                            <p className="text-lg font-medium">No Rooms configured</p>
                            <p className="text-sm">Click the Add button to set up your first classroom mapping</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {classrooms.map((room) => (
                                <div 
                                    key={room.id} 
                                    className="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300"
                                >
                                    {/* Card Header: Room Name & Delete */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-800">{room.name}</h4>
                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                                room.type === 'Labroom' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                                {room.type}
                                            </span>
                                        </div>
                                        <DeleteButton onDelete={() => removeClassroom(room.id)} />
                                    </div>

                                    {/* Batches Section */}
                                    <div className="mb-4">
                                        <div className="flex items-center gap-1.5 text-slate-500 mb-2">
                                            <Users size={14} />
                                            <span className="text-xs font-semibold uppercase tracking-tight">Linked Batches</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {room.batches?.length > 0 ? (
                                                room.batches.map(batchId => (
                                                    <span key={batchId} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-md border border-slate-200">
                                                        {batchId}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">No batches assigned</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subjects & Faculty Section */}
                                    <div className="mt-auto pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-1.5 text-slate-500 mb-3">
                                            <BookOpen size={14} />
                                            <span className="text-xs font-semibold uppercase tracking-tight">Faculty Allocation</span>
                                        </div>
                                        <div className="space-y-2">
                                            {room.subjects?.length > 0 ? (
                                                room.subjects.map((allocation, index) => (
                                                    <div key={index} className="flex flex-col bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                        <div className="text-sm font-bold text-slate-700 truncate">
                                                            {allocation.subjectId}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-indigo-600">
                                                            <GraduationCap size={12} />
                                                            {allocation.facultyId}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-slate-400 italic">No subjects mapped</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <SaveNextButton text="Save and Next" onClick={() => router.push("PracticalSubjects")} />
            </div>
            </div>

            {/* Modal */}
            <AddClassRoomModal
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
}