import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MasterEntity } from "./actions";
import type { MasterRecord } from "@/components/app/master-data-manager";

export async function getMasterRows(entity: MasterEntity) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from(entity).select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as MasterRecord[];
}

export async function getStudentRows() {
  const supabase = await createSupabaseServerClient();
  const [{ data: students, error }, { data: parents }, { data: packages }] = await Promise.all([
    supabase.from("students").select("*").order("created_at", { ascending: false }),
    supabase.from("parents").select("id, full_name"),
    supabase.from("packages").select("id, name")
  ]);
  if (error) throw new Error(error.message);
  const parentNames = new Map((parents ?? []).map(parent => [parent.id, parent.full_name]));
  const packageNames = new Map((packages ?? []).map(item => [item.id, item.name]));
  return (students ?? []).map(student => ({ ...student, parent_name: parentNames.get(student.parent_id) ?? null, package_name: packageNames.get(student.package_id) ?? null }));
}

export async function getStudentOptions() {
  const supabase = await createSupabaseServerClient();
  const [{ data: parents }, { data: packages }] = await Promise.all([
    supabase.from("parents").select("id, full_name").order("full_name"),
    supabase.from("packages").select("id, name").order("name")
  ]);
  return { parents: (parents ?? []).map(item => ({ value: item.id, label: item.full_name })), packages: (packages ?? []).map(item => ({ value: item.id, label: item.name })) };
}
