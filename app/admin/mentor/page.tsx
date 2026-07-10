import { AppShell } from "@/components/app/app-shell";
import { MasterDataManager } from "@/components/app/master-data-manager";
import { requireRole } from "@/lib/auth/session";
import { getMasterRows } from "../master-data/page-data";
export default async function MentorsPage() { const user = await requireRole(["admin"]); const rows = await getMasterRows("mentors"); return <AppShell role={user.role} email={user.email} title="Data Mentor" activeNav="Mentor"><MasterDataManager entity="mentors" singular="Mentor" title="Manajemen Mentor" description="Kelola data pengajar bimbingan belajar." rows={rows} fields={[{ key: "full_name", label: "Nama lengkap" }, { key: "phone", label: "Nomor telepon" }, { key: "specialization", label: "Spesialisasi" }, { key: "address", label: "Alamat", type: "textarea", table: false }]} /></AppShell>; }
