'use client'

import { Inbox, BookMarked  } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/app/components/add';
import AddTheorySubjectModal from './AddThoerySubjectModal';
import { useStorage } from '@/app/storage';
import DeleteButton from '../delete';

export default function TheorySubjects() {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

    const theorySubjects = useStorage((state) => state.theorySubjects);
    const removeTheorySubject = useStorage((state) => state.removeTheorySubject);

    return(
    <div className="space-y-6 p-6">
          {/* 1. Header Section */}
     <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 border-b border-slate-100">
          <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <BookMarked size={24} />
          </div>
          <div>
              <h2 className="text-xl font-bold text-slate-800">Theory Subject</h2>
              <p className="text-sm text-slate-500">Manage the Theory Subjects</p>
            </div>
            </div>
            <AddButton text="Theory Subjects" onClick={() => setIsModalOpen(true)} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-700">Theory Subject Details</h3>
            </div>
    
            <div className="p-8">
              {theorySubjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Inbox size={40} />
                  </div>
                  <p className="text-lg font-medium">No Subject entered</p>
                  <p className="text-sm">Click the Add button to create your first Subject</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {theorySubjects.map((theorySubject) => (

                <div 
                  key={theorySubject.id} 
                  className="bg-white rounded-xl border border-slate-400 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
              
                    <div className="bg-slate-50 p-4 border-b border-slate-400 flex justify-between">
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                        {theorySubject.name}
                      </h3>
                      <div className="top-3 left-3">
                        <DeleteButton onDelete={() => removeTheorySubject(theorySubject.id)} />
                      </div>
                    </div>
                    {/* Details Grid */}
                    <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-6">
          
                      {/* Item 1 */}
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">CODE</span>
                        <span className="text-slate-700 font-medium">{theorySubject.code}</span>
                      </div>

                      {/* Item 2 */}
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Department</span>
                        <span className="text-slate-700 font-medium">{theorySubject.dept}</span>
                      </div>

                      {/* Item 4 */}
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Hrs/Week</span>
                        <span className="text-slate-700 font-medium">{theorySubject.hours} hr</span>
                      </div>
                    </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
    
          {/* 3. The Modal Component */}
          {/* It sits here but is invisible until isModalOpen is true */}
          <AddTheorySubjectModal
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
          
        </div>
)
}