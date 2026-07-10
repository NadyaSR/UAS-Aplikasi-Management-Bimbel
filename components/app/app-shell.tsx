import { BookOpen, CalendarDays, CreditCard, LogOut, Users } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import { roleLabels, type UserRole } from "@/lib/auth/roles";

type AppShellProps = {
  role: UserRole;
  email: string;
  title: string;
  children: React.ReactNode;
};

const navigation = {
  admin: [
    { label: "Dashboard", icon: BookOpen },
    { label: "Siswa", icon: Users },
    { label: "Jadwal", icon: CalendarDays },
    { label: "Pembayaran", icon: CreditCard }
  ],
  mentor: [
    { label: "Dashboard", icon: BookOpen },
    { label: "Jadwal", icon: CalendarDays },
    { label: "Kelas", icon: Users }
  ],
  parent: [
    { label: "Dashboard", icon: BookOpen },
    { label: "Jadwal Anak", icon: CalendarDays },
    { label: "Invoice", icon: CreditCard }
  ]
};

export function AppShell({ role, email, title, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 md:block">
        <div>
          <p className="text-sm font-semibold text-brand">Manajemen Bimbel</p>
          <p className="mt-1 text-xs text-slate-500">{roleLabels[role]}</p>
        </div>
        <nav className="mt-8 space-y-1">
          {navigation[role].map((item) => (
            <div
              className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-slate-700"
              key={item.label}
            >
              <item.icon size={16} aria-hidden="true" />
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {roleLabels[role]}
              </p>
              <h1 className="text-lg font-semibold text-ink">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <p className="hidden max-w-52 truncate text-sm text-slate-600 sm:block">
                {email}
              </p>
              <form action={logoutAction}>
                <button
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-ink transition hover:bg-slate-50"
                  title="Logout"
                  type="submit"
                >
                  <LogOut size={16} aria-hidden="true" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
