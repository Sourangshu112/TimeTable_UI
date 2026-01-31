'use client'

import { Inbox } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddButton from '@/app/components/add';
import { Users } from 'lucide-react';
import { useStorage } from '@/app/storage';
import DeleteButton from '../delete';
import AddSectionModal from './AddSectionModal';
import SaveNextButton from '@/app/components/save';
import { useRouter } from 'next/navigation';

export default function Section() {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const courses = useStorage((state) => state.courses);
    const departments = useStorage((state) => state.departments);
    const autoSections = useStorage((state) => state.autoSections);
    const deletedBatchIds = useStorage((state) => state.deletedBatchIds);
    const addAutoSection = useStorage((state) => state.addAutoSection);
    const removeAutoSection = useStorage((state) => state.removeAutoSection);
    const sections = useStorage((state) => state.sections);
    const removeSection = useStorage((state) => state.removeSection);

    useEffect(() => {
        // Your logic to create batches
        const createBatches = () => {
             const formattedCourses = courses.map(course => ({
                name: course.name,
                year: parseInt(course.year),
                semesterType: course.semesterType,
             }));

             departments.forEach(dept => {
                 dept.courseInDept.forEach(courseName => {
                     const match = formattedCourses.find(c => c.name === courseName);
                     if (match) {
                      let sem = 0
                      if (formattedCourses.semesterType === "odd"){
                        sem = 1;
                      }
                      else {
                        sem = 2
                      }
                      for (let i = 1; i <= match.year; i++) {
                           const obj = {
                              course: match.name,
                              department: dept.deptName,
                              sem: sem,
                              Group: "A",
                              room: false,
                              id: `${match.name}-${dept.deptName}-${i}-A`
                          };
                          sem += 2;
                           if (autoSections.find(s => s.id === obj.id)) {
                             continue;
                           }
                           if (deletedBatchIds.includes(obj.id)) continue;
                           addAutoSection(obj);
                      }
                     }
                 });
             });
        };

        createBatches();

    }, [courses, departments, addAutoSection]);
    
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
              {(autoSections.length === 0 && sections.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Inbox size={40} />
                  </div>
                  <p className="text-lg font-medium">No sections entered</p>
                  <p className="text-sm">Click the Add button to create your first section</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {autoSections.length > 0 && (
                    <div className="col-span-full mb-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Auto-Generated Sections
                      </h3>
                    </div>
                  )}
                {autoSections.map((section) => (
                  <div 
                    key={section.id} 
                    className="p-5 bg-white border border-slate-400 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-1"
                  >
                    {/* Header: Course & Department */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          {section.course}
                        </h3>
                        <p className="text-sm font-medium text-slate-800">
                          {section.department} Department
                        </p>
                      </div>

                      {/* Group Badge */}
                      <div>
                        <DeleteButton onDelete={()=> removeAutoSection(section.id)} />
                      </div>
                    </div>                
                    {/* Details: Year & ID */}
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-800 uppercase font-semibold">Sem</span>
                        <span className="text-sm font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          {section.sem}
                        </span>
                      <span className="px-3 py-1 text-xs font-bold  rounded-full">
                        Group {section.Group}
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${section.room ? "text-green-700 bg-green-200 border border-green-300" : "text-red-700 bg-red-200 border border-red-300" } `}>Room Alloted: {section.room ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                  {sections.length > 0 && (
                    <div className="col-span-full mt-8 mb-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        Manually Added Sections
                      </h3>
                    </div>
                  )}
                  {sections.map((section) => (
                  <div 
                    key={section.id} 
                    className="p-5 bg-white border border-slate-400 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-1"
                  >
                    {/* Header: Course & Department */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          {section.course}
                        </h3>
                        <p className="text-sm font-medium text-slate-800">
                          {section.department} Department
                        </p>
                      </div>

                      {/* Group Badge */}
                      <div>
                        <DeleteButton onDelete={()=> removeSection(section.id)} />
                      </div>
                    </div>                
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-800 uppercase font-semibold">Sem</span>
                        <span className="text-sm font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          {section.sem}
                        </span>
                      <span className="px-3 py-1 text-xs font-bold  rounded-full">
                        Group {section.Group}
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${section.room ? "text-green-700 bg-green-200 border border-green-300" : "text-red-700 bg-red-200 border border-red-300" } `}>Room Alloted: {section.room ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                ))
                }
              </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <SaveNextButton text="Save and Next" onClick={() => router.push("Classrooms")} />
            </div>
          </div>

          {/* 3. The Modal Component */}
          {/* It sits here but is invisible until isModalOpen is true */}
          <AddSectionModal
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />

        </div>
        )
    }