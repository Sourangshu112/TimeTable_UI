'use client'

import { Inbox, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddButton from '@/app/components/add';
import { useStorage } from '@/app/storage';
import AddRoomModal from './AddRoomModal';
import DeleteButton from '../delete';

export default function Rooms() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const autoSections = useStorage((state) => state.autoSections);
    const sections = useStorage((state) => state.sections);
    const facultys = useStorage((state) => state.facultys);
    const subjects = useStorage((state) => state.subjects);    
    const classrooms = useStorage((state) => state.classrooms);
    
    return(
<div className="space-y-6 p-6">
          {/* 1. Header Section */}
     <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 border-b border-slate-100">
          <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <Monitor size={24} />
          </div>
          <div>
              <h2 className="text-xl font-bold text-slate-800">Rooms</h2>
              <p className="text-sm text-slate-500">Manage the Rooms</p>
            </div>
            </div>
            <AddButton text="Rooms" onClick={() => setIsModalOpen(true)} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-700">Room Details</h3>
            </div>
    
            <div className="p-8">
              {classrooms.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <div className="bg-slate-200 p-4 rounded-full mb-4">
                    <Inbox size={40} />
                  </div>
                  <p className="text-lg font-medium">No Rooms entered</p>
                  <p className="text-sm">Click the Add button to create your first Rooms</p>
                </div>
              ) : (<div className="grid gap-4 md:grid-cols-3">
                  {classrooms.map((classroom) => (
                    <div 
                      key={classroom.id} 
                      className="group relative flex items-center p-5 bg-white border border-slate-400 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                    >
                        <div>{classroom.name}</div>
                    </div>
                    ))}
                    </div>
                )}
                </div>
            </div>
        <AddRoomModal
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
        </div>
    )
}