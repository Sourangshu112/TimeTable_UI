// src/app/components/sidebar.jsx
"use client"; // <--- Required for usePathname

import { 
 Building2, Users, BookOpen, 
  Monitor, CalendarDays, GraduationCap, 
  Layers, Clock, BookMarked, FlaskConical
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// defined with exact paths matching your folder structure
const menuItems = [
  { name: 'Institution Setup', icon: Building2, href: '/home/InstitutionSetup' },
  { name: 'Courses', icon: BookOpen, href: '/home/Courses' }, 
  { name: 'Departments', icon: Layers, href: '/home/Departments' },
  { name: 'Classes/Sections', icon: Users, href: '/home/Sections' }, // Mapped to 'Sections' folder
  { name: 'Faculty', icon: GraduationCap, href: '/home/Faculty' },
  { name: 'Theory Subjects', icon: BookMarked, href: '/home/TheorySubjects' },
  { name: 'Classrooms', icon: Monitor, href: '/home/Classrooms' },
  { name: 'Practical Subjects', icon: FlaskConical, href: '/home/PracticalSubjects' },
  { name: 'LabsRooms', icon: FlaskConical, href: '/home/Labrooms' },
  { name: 'Generate Timetable', icon: CalendarDays, href: '/home/GenerateTimetable' },
  { name: 'Timetable Viewer', icon: Clock, href: '/home/Timetable' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col bg-slate-900 border-r border-slate-700"> {/* Added bg/border for visibility */}
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-700">
        <div className="bg-indigo-600 p-1.5 rounded mr-3">
            <Clock size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">TimeGen</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            // Check if this link is currently active
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-slate-800 text-indigo-400 border-l-4 border-indigo-500' 
                      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900' // Adjusted hover colors for light theme
                    }`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}