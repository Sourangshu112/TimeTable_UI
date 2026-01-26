export default function InputWithLabel(params){
    return(
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{params.labelName}</label>
            <input 
            type={params.type}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
            placeholder={params.placeholder}
            onChange={params.onChange}
            />
        </div>
    )
}