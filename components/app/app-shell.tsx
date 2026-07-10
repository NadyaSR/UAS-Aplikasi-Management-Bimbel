import { 
  BookOpen, CalendarDays, CreditCard, LogOut, Users, 
  Search, Bell, Mail, HelpCircle, Settings, Layers, 
  UserSquare2, Package, BookType, ClipboardList, CheckSquare, 
  FileText, Banknote, LineChart, UserCircle
} from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import { roleLabels, type UserRole } from "@/lib/auth/roles";
import Link from "next/link";

type AppShellProps = {
  role: UserRole;
  email: string;
  title: string;
  children: React.ReactNode;
};

// Original Sprint 1 Navigation scope
const navigation = {
  admin: [
    { label: "Dashboard", icon: BookOpen, active: true },
    { label: "Siswa", icon: Users },
    { label: "Jadwal", icon: CalendarDays },
    { label: "Pembayaran", icon: CreditCard }
  ],
  mentor: [
    { label: "Dashboard", icon: BookOpen, active: true },
    { label: "Jadwal", icon: CalendarDays },
    { label: "Kelas", icon: Users }
  ],
  parent: [
    { label: "Dashboard", icon: BookOpen, active: true },
    { label: "Jadwal Anak", icon: CalendarDays },
    { label: "Invoice", icon: CreditCard }
  ]
};

export function AppShell({ role, email, title, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface flex text-ink font-sans">
      
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[260px] bg-white md:flex flex-col border-r border-slate-100">
        <div className="px-6 py-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="font-bold text-xl tracking-tight">BimbelPro</span>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
          <nav className="space-y-1">
            {navigation[role].map((item) => {
              const Icon = item.icon;
              const isActive = (item as any).active;
              
              return (
                <Link 
                  href="#" 
                  key={item.label}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? "bg-brand/10 text-brand font-medium" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? "text-brand" : "text-slate-400 group-hover:text-slate-600"} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[14px]">{item.label}</span>
                  </div>
                </Link>
              );
            })}
            
            {/* Logout Button */}
            <form action={logoutAction} className="pt-2">
              <button
                type="submit"
                className="w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <LogOut size={18} className="text-slate-400 group-hover:text-red-500" strokeWidth={2} />
                <span className="text-[14px]">Log out</span>
              </button>
            </form>
          </nav>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 focus-within:border-brand/30 focus-within:ring-2 focus-within:ring-brand/10 transition">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder-slate-400"
            />
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded">
              <span className="font-sans">⌘</span>K
            </div>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200/50 transition">
              <HelpCircle size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200/50 transition relative">
              <Mail size={18} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-200/50 transition relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-surface"></span>
            </button>
            
            <div className="h-6 w-px bg-slate-200 mx-1"></div>
            
            {/* User Avatar */}
            <button className="flex items-center gap-2 hover:opacity-80 transition ml-1">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand to-cyan-400 flex items-center justify-center text-white font-medium text-sm shadow-sm">
                {email.charAt(0).toUpperCase()}
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
