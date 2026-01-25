'use client'
import { useState } from 'react';
import { X } from 'lucide-react';
import SaveNextButton from '@/app/components/save';
import InputWithLabel from '../inputcomponent';

export default function AddFacultyModal(params){

    if (!params.isOpen) return null;

    return(
        <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              onClick={params.onClose}
            >  
              <div 
                className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl relative animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Header with Close Button */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800">Create New Faculty</h2>
                    <button 
                        onClick={params.onClose}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                {/* Scrollable Form Content */}
                <div className="p-8">
                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <InputWithLabel labelName="Faculty Name" type="text" placeholder="Dr Bikarna Tarafdar" />
                    <div className="grid grid-cols-2 gap-4">
                        <InputWithLabel labelName="Faculty Initials" type="text" placeholder="BT" />
                        <InputWithLabel labelName="Department" type="text" placeholder="Mathematics" />                        
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputWithLabel labelName="Designation" type="text" placeholder="Assistant Professor" />
                        <InputWithLabel labelName="Lecture hrs per week" type="number" placeholder="8" />                        
                    </div>
                    <div className="pt-4">
                        <SaveNextButton text="Save Faculty" />
                    </div>
                    <div>
                        {/* Existing  course for the department will be added here somehow */}
                    </div>
                    </form>
                </div>
              </div>
            </div>
    )
}