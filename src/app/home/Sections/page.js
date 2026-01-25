'use client'

import { Inbox } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/app/components/add';
import { Users } from 'lucide-react';

export default function Section() {
    const [sections, setSections] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

    return(
        <div className="space-y-6 p-6">
          {/* 1. Header Section */}
     <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 border-b border-slate-100">
          <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <Users size={24} />
          </div>
          <div>
              <h2 className="text-xl font-bold text-slate-800">Sections</h2>
              <p className="text-sm text-slate-500">Manage the Sections (Inter-departmental Gropus/splits)</p>
              <p className="text-sm text-slate-500">Each section will be treated seperately and to make them take class together add them to the same room in the rooms tab </p>
            </div>
            </div>
            <AddButton text="Sections" onClick={() => setIsModalOpen(true)} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-700">Section Details</h3>
            </div>

            <div className="p-8">
              {sections.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Inbox size={40} />
                  </div>
                  <p className="text-lg font-medium">No sections entered</p>
                  <p className="text-sm">Click the Add button to create your first section</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {sections.map((section, index) => (
                    <div key={index} className="p-4 border border-slate-200 rounded-lg">
                      {section.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. The Modal Component */}
          {/* It sits here but is invisible until isModalOpen is true */}
          {/* <AddDepartmentModal
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          /> */}

        </div>
        )
    }