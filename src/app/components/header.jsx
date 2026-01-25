import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 h-16 flex w-full items-center justify-between px-8 shrink-0">
      <h1 className="text-xl font-semibold text-white tracking-wide">
        Dashboard Overview
      </h1>
      
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors border border-slate-700">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}