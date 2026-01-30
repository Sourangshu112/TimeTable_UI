'use client'
import SaveNextButton from "@/app/components/save"
import { exportToJson } from "@/app/createJSON"

export default function Generate() {
    return(
        <>
        Click to save the file           
        <div className="p-6 border-t border-slate-100 flex justify-center items-center gap-3">
            <SaveNextButton text="Save and Next" onClick={exportToJson} />
        </div>
        </>
    )
}

