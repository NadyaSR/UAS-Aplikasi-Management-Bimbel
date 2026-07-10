import { AppShell } from "@/components/app/app-shell";
import { SummaryCard } from "@/components/app/summary-card";
import { requireRole } from "@/lib/auth/session";

export default async function ParentDashboardPage() {
  const user = await requireRole(["parent"]);

  return (
    <AppShell role={user.role} email={user.email} title="Dashboard Orang Tua">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Status Pembayaran" value="-" detail="Menunggu modul invoice" />
        <SummaryCard label="Jadwal Anak" value="0" detail="Menunggu modul jadwal" />
        <SummaryCard label="Kehadiran Anak" value="0%" detail="Menunggu modul absensi" />
        <SummaryCard label="Nilai Terbaru" value="-" detail="Menunggu modul evaluasi" />
      </div>
    </AppShell>
  );
}
