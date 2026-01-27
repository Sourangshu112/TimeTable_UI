import Sidebar from "../components/sidebar";
import Header from "../components/header";

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar (Fixed Left) */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content Area (Right Side) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header sits at the top of this column */}
        <Header />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}