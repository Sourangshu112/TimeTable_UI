'use client'

export default function SaveNextButton(params) {
    return(
            <button 
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg 
            transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer" 
            onClick={params.onClick} >
                {params.text}
            </button>
    )
}