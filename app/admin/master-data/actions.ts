"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type MasterEntity = "students" | "mentors" | "parents" | "packages" | "subjects";

const schemas = {
  students: z.object({ full_name: z.string().min(2), student_number: z.string().min(2), birth_date: z.string().optional(), school_name: z.string().optional(), grade: z.string().optional(), parent_id: z.string().uuid().optional(), package_id: z.string().uuid().optional(), address: z.string().optional() }),
  mentors: z.object({ full_name: z.string().min(2), phone: z.string().min(8), specialization: z.string().optional(), address: z.string().optional() }),
  parents: z.object({ full_name: z.string().min(2), phone: z.string().min(8), address: z.string().optional() }),
  packages: z.object({ name: z.string().min(2), duration_months: z.coerce.number().int().positive(), sessions_per_month: z.coerce.number().int().positive(), price: z.coerce.number().min(0), description: z.string().optional() }),
  subjects: z.object({ name: z.string().min(2), level: z.string().min(2), description: z.string().optional() })
} as const;

const paths: Record<MasterEntity, string> = { students: "/admin/siswa", mentors: "/admin/mentor", parents: "/admin/orang-tua", packages: "/admin/paket", subjects: "/admin/mata-pelajaran" };

const nullable = (value: unknown) => value === "" || value === undefined ? null : value;

export async function saveMasterData(entity: MasterEntity, id: string | null, raw: Record<string, unknown>) {
  await requireRole(["admin"]);
  const result = schemas[entity].safeParse(raw);
  if (!result.success) return { error: "Mohon lengkapi data dengan format yang benar." };
  const values = Object.fromEntries(Object.entries(result.data).map(([key, value]) => [key, nullable(value)]));
  const supabase = await createSupabaseServerClient();
  const query = id ? supabase.from(entity).update(values).eq("id", id) : supabase.from(entity).insert(values);
  const { error } = await query;
  if (error) return { error: error.code === "23505" ? "Data duplikat. Gunakan nilai yang berbeda." : error.message };
  revalidatePath(paths[entity]);
  return { success: true };
}

export async function deleteMasterData(entity: MasterEntity, id: string) {
  await requireRole(["admin"]);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from(entity).delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(paths[entity]);
  return { success: true };
}
