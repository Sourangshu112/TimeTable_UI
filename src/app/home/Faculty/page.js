'use client'

import { Inbox } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/app/components/add';
import AddFacultyModal from './AddFacultyModal';
import { GraduationCap } from 'lucide-react';
import { useStorage } from '@/app/storage';
import DeleteButton from '../delete';
import { useRouter } from 'next/navigation';
import SaveNextButton from '@/app/components/save';

export default function Faculty() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const facultys = useStorage((state) => state.facultys);
    const removeFaculty = useStorage((state) => state.removeFaculty);

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
              <p className="text-sm text-slate-500">NOTE: While Adding Faculty please donot reuse the initials, keep them unique</p>
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
                  <div className="bg-slate-200 p-4 rounded-full mb-4">
                    <Inbox size={40} />
                  </div>
                  <p className="text-lg font-medium">No Faculty entered</p>
                  <p className="text-sm">Click the Add button to create your first Faculty</p>
                </div>
              ) : (<div className="grid gap-4 md:grid-cols-3 border-slate-200">
                  {facultys.map((faculty) => (
                    <div 
                      key={faculty.id} 
                      className="group relative flex items-center p-5 bg-white border border-slate-400 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                    >
                    
                      {/* 2. Middle: Name & Designation */}
                      <div className="ml-5 grow">
                        <h3 className="text-lg font-bold text-slate-800 leading-tight">
                          {faculty.name}
                        </h3>
                        <p className="font-bold text-indigo-600">
                          {faculty.initial}
                        </p>
                      </div>
                  
                      {/* 4. Delete Action (Hidden until hover) */}
                      <div className="absolute top-4 right-4">
                        <DeleteButton onDelete={() => removeFaculty(faculty.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='flex justify-end'>
            <div className="w-1/2 p-6 border-t border-slate-100 gap-3">
              <SaveNextButton text="Save and Next" onClick={() => router.push("TheorySubjects")} />
            </div>
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