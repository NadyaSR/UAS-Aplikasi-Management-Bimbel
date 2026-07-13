import { AppShell } from "@/components/app/app-shell";
import { SummaryCard } from "@/components/app/summary-card";
import { requireRole } from "@/lib/auth/session";
import { getAdminMetrics } from "@/lib/dashboard/data";

export default async function AdminDashboardPage() {
  const user = await requireRole(["admin"]);
  const metrics = await getAdminMetrics();

  return (
    <AppShell role={user.role} email={user.email} name={user.name} title="Dashboard Admin">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink mb-1">
          Selamat Datang, Admin
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Siswa Aktif" value={String(metrics.students)} detail="Data siswa terdaftar" />
        <SummaryCard label="Mentor" value={String(metrics.mentors)} detail="Data mentor terdaftar" />
        <SummaryCard label="Kelas" value={String(metrics.classes)} detail="Kelas aktif" />
        <SummaryCard label="Absensi Tercatat" value={String(metrics.attendance)} detail="Total kehadiran" />
        <SummaryCard label="Invoice Belum Dibayar" value="—" detail="Aktif pada Sprint 5" />
        <SummaryCard label="Pendapatan Bulan Ini" value="—" detail="Aktif pada Sprint 5" />
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-apple-soft">
        <h2 className="app-title-secondary">Grafik Pembayaran</h2>
        <p className="mt-2 text-sm text-slate-500">Data pembayaran akan tersedia setelah modul Invoice & Pembayaran (Sprint 5) selesai.</p>
      </section>
    </AppShell>
  );
}
