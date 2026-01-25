'use client'

export default function InputField(params){
    return (
        <input 
            type="text"
            value={params.value}
            className="w-full px-4 py-3 rounded-lg border border-slate-500 focus:border-indigo-700 focus:ring-4 focus:ring-indigo-700/10 outline-none transition-all placeholder:text-slate-500 text-slate-900"
            placeholder={params.placeholder}
            onChange={params.onChange}
          />
    )
}