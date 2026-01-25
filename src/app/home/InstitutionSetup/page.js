// /app/home/oInstitutionSetup/page.js
'use client'

import { Building2, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import InputField from "./input"; 
import SaveNextButton from "@/app/components/save"; // Assuming this path is correct
import { useStorage } from "@/app/storage"; 

export default function InstitutionSetup() {
  const [logoPreview, setLogoPreview] = useState(null);

  // 1. Get Data and Updater from Store
  const institution = useStorage((state) => state.institution);
  const updateInstitution = useStorage((state) => state.updateInstitution);
  
  // 2. Hydration Fix (Prevents "Text content does not match" error in Next.js)
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    useStorage.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // 3. Button Handler
  const handleSave = () => {
    console.log("Saved Data:", institution);
    // Add navigation logic here, e.g., router.push('/next-step')
  };

  // Prevent rendering until store is loaded from localStorage
  if (!isHydrated) return null; 

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="rounded-xl shadow-sm border border-slate-200 p-8  bg-white">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
          <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Institution Profile</h2>
            <p className="text-sm text-slate-500">Manage your college identity and branding.</p>
          </div>
        </div>

        {/* Form Layout: Logo + Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
          
          {/* Column 1: Logo Upload (Kept Local for now) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-800">
              College Logo
            </label>
            
            <div className="relative group">
              <label 
                htmlFor="logo-upload" 
                className={`
                  flex flex-col items-center justify-center w-full aspect-square 
                  rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
                  ${logoPreview 
                    ? 'border-indigo-200 bg-white' 
                    : 'border-slate-600 bg-slate-100 hover:bg-slate-300 hover:border-indigo-800'
                  }
                `}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                        <Upload size={20} className="text-indigo-700" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">Click to upload</span>
                    <span className="text-[10px] text-slate-400 mt-1">PNG, JPG</span>
                  </div>
                )}
                
                {logoPreview && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">Change Logo</span>
                  </div>
                )}
              </label>
              <input 
                id="logo-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleLogoChange}
              />
            </div>
          </div>

          {/* Column 2: Institute Name & Details (Connected to Zustand) */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-2">
                Institute Name
              </label>
              <InputField 
                placeholder="Ghani Khan Chowdhury Institute of Engineering and Technology" 
                value={institution.name} // Reading from Store
                onChange={(e) => updateInstitution('name', e.target.value)} // Writing to Store
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Institute Code
                </label>
               <InputField 
                 placeholder="Code" 
                 value={institution.code} // Reading from Store
                 onChange={(e) => updateInstitution('code', e.target.value)} // Writing to Store
               />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
          <SaveNextButton text="Save and Next" onClick={handleSave} />
        </div>

      </div>
    </div>
  );
}