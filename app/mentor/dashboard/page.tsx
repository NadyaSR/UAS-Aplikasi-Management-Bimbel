import { AppShell } from "@/components/app/app-shell";
import { SummaryCard } from "@/components/app/summary-card";
import { requireRole } from "@/lib/auth/session";

export default async function MentorDashboardPage() {
  const user = await requireRole(["mentor"]);

  return (
    <AppShell role={user.role} email={user.email} title="Dashboard Mentor">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Jadwal Hari Ini" value="0" detail="Menunggu modul jadwal" />
        <SummaryCard label="kelas Aktif" value="0" detail="Menunggu modul kelas" />
        <SummaryCard label="Absensi Hari Ini" value="0" detail="Menunggu modul absensi" />
        <SummaryCard label="Evaluasi Belum Diisi" value="0" detail="Menunggu modul evaluasi" />
      </div>
    </AppShell>
  );
}
