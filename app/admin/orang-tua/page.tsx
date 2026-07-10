import { AppShell } from "@/components/app/app-shell";
import { MasterDataManager } from "@/components/app/master-data-manager";
import { requireRole } from "@/lib/auth/session";
import { getMasterRows } from "../master-data/page-data";
export default async function ParentsPage() { const user = await requireRole(["admin"]); const rows = await getMasterRows("parents"); return <AppShell role={user.role} email={user.email} title="Data Orang Tua" activeNav="Orang Tua"><MasterDataManager entity="parents" singular="Orang Tua" title="Manajemen Orang Tua" description="Kelola kontak dan data wali siswa." rows={rows} fields={[{ key: "full_name", label: "Nama lengkap" }, { key: "phone", label: "Nomor telepon" }, { key: "address", label: "Alamat", type: "textarea", table: false }]} /></AppShell>; }
