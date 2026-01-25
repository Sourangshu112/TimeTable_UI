'use client'

import { Plus } from "lucide-react"

export default function AddButton(params){
    return (
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg flex gap-0.5 cursor-pointer"
        onClick={params.onClick}> 
        <Plus /> Add {params.text}
        </button>
    )
}