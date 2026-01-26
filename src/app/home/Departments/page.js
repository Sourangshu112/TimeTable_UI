'use client'

import { Inbox } from 'lucide-react';
import { useState } from 'react';
import AddButton from '@/app/components/add';
import AddDepartmentModal from './AddDepartmentModal';
import { Layers } from 'lucide-react';
import { useStorage } from '@/app/storage';
import DeleteButton from '../delete';

export default function Department() {
    //const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

    const departments = useStorage((state) => state.departments)
    const removeDepartment = useStorage((state) => state.removeDepartment)
    
    return(
        <div className="space-y-6 p-6">
          {/* 1. Header Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 border-b border-slate-100">
            <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
              <Layers size={24} />
            </div>
          <div>
              <h2 className="text-xl font-bold text-slate-800">Department</h2>
              <p className="text-sm text-slate-500">Manage the Departments</p>
            </div>
            </div>
            
            <AddButton text="Departments" onClick={() => setIsModalOpen(true)} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-semibold text-slate-700">Department Details</h3>
            </div>
    
            <div className="p-8">
              {departments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Inbox size={40} />
                  </div>
                  <p className="text-lg font-medium">No Department entered</p>
                  <p className="text-sm">Click the Add button to create your first Department</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                {departments.map((dept) => (
              <div 
                key={dept.id} 
                className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-300 transition-colors"
              >
                {/* Department Header */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Department</h3>
                    <p className="text-xl font-bold text-slate-800">{dept.deptName}</p>
                  </div>
                <div className="top-3 left-3">
                  <DeleteButton onDelete={() => removeDepartment(dept.id)} />
                </div>
                </div>
                <hr className="border-slate-100 mb-4" />
                {/* Courses Section */}
                <div>
                  <span className="text-xs font-medium text-slate-500 block mb-2">Linked Courses:</span>
                  <div className="flex flex-wrap gap-2">
                    {dept.courseInDept.length > 0 ? (
                      dept.courseInDept.map((courseId) => (
                        <span 
                          key={courseId} 
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200"
                        >
                          {courseId}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No courses assigned</span>
                    )}
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
          <AddDepartmentModal
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
          
        </div>
    )
}