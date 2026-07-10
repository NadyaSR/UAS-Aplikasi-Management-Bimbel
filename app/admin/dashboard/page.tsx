import { AppShell } from "@/components/app/app-shell";
import { SummaryCard } from "@/components/app/summary-card";
import { requireRole } from "@/lib/auth/session";

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin"]);

  return (
    <AppShell role={user.role} email={user.email} title="Dashboard Admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink mb-1">
          Selamat Datang, Admin
        </h1>
        <p className="text-sm text-slate-500">
          Sprint 1: Authentication & Role Management aktif.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Siswa Aktif" value="0" detail="Menunggu modul master data" />
        <SummaryCard label="Mentor" value="0" detail="Menunggu modul master data" />
        <SummaryCard label="Kelas" value="0" detail="Menunggu modul kelas" />
        <SummaryCard label="Invoice Belum Dibayar" value="0" detail="Menunggu modul invoice" />
      </div>
    </AppShell>
  );
}
