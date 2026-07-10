import { AppShell } from "@/components/app/app-shell";
import { SummaryCard } from "@/components/app/summary-card";
import { requireRole } from "@/lib/auth/session";

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin"]);

  return (
    <AppShell role={user.role} email={user.email} title="Dashboard Admin">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Siswa Aktif" value="0" detail="Menunggu modul master data" />
        <SummaryCard label="Mentor" value="0" detail="Menunggu modul master data" />
        <SummaryCard label="Kelas" value="0" detail="Menunggu modul kelas" />
        <SummaryCard label="Invoice Belum Dibayar" value="0" detail="Menunggu modul invoice" />
      </div>
    </AppShell>
  );
}
