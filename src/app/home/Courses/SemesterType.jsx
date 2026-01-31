const SemesterType = (params) => {
    return(
    <div>
        <label className="text-sm font-medium text-slate-700">Semester Type</label>
        <div className="flex items-center p-1 bg-slate-100 rounded-lg w-full border border-slate-200">
          <button
            onClick={() => params.setSemesterType("Odd")}
            className={`px-6 w-1/2 py-1.5 rounded-md text-sm font-medium transition-all ${
              params.semesterType === "Odd" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Odd
          </button>
          <button
            onClick={() => params.setSemesterType("Even")}
            className={`px-6 py-1.5 w-1/2 rounded-md text-sm font-medium transition-all ${
              params.semesterType === "Even" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            Even
          </button>
        </div>
    </div>
    )
}

export default SemesterType;