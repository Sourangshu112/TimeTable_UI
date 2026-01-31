'use client'
import SaveNextButton from "@/app/components/save"
import { exportToJson } from "@/app/createJSON"
import { useState } from "react"

export default function Generate() {
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        await exportToJson();
        setLoading(false);
    }

    return(
        <>
        Click to send data to server           
        <div className="p-6 border-t border-slate-100 flex justify-center items-center gap-3">
            <SaveNextButton 
                text={loading ? "Sending..." : "Save and Next"} 
                onClick={handleSave} 
                disabled={loading} // Add a disabled prop to your button if supported
            />
        </div>
        </>
    )
}