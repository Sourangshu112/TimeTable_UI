'use client'

import { Inbox } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/app/components/add';
import AddFacultyModal from './AddFacultyModal';
import { GraduationCap } from 'lucide-react';

export default function Faculty() {
    const [facultys, setFacultys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal
return(
        <div className="space-y-6 p-6">
          {/* 1. Header Section */}
     <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 border-b border-slate-100">
          <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <GraduationCap size={24} />
          </div>
          <div>
              <h2 className="text-xl font-bold text-slate-800">Faculty</h2>
              <p className="text-sm text-slate-500">Manage the Facultys</p>
            </div>
            </div>
            <AddButton text="Facultys" onClick={() => setIsModalOpen(true)} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-700">Faculty Details</h3>
            </div>
    
            <div className="p-8">
              {facultys.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Inbox size={40} />
                  </div>
                  <p className="text-lg font-medium">No Faculty entered</p>
                  <p className="text-sm">Click the Add button to create your first Faculty</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {facultys.map((faculty, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      {faculty.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
    
          {/* 3. The Modal Component */}
          {/* It sits here but is invisible until isModalOpen is true */}
          <AddFacultyModal
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
          
        </div>
    )
}