import { createSupabaseServerClient } from "@/lib/supabase/server";

const todayRange = () => { const start = new Date(); start.setHours(0, 0, 0, 0); const end = new Date(start); end.setDate(end.getDate() + 1); return { start: start.toISOString(), end: end.toISOString() }; };
export async function getAdminMetrics() { const supabase = await createSupabaseServerClient(); const [{ count: students }, { count: mentors }, { count: classes }, { count: attendance }] = await Promise.all([supabase.from("students").select("id", { count: "exact", head: true }), supabase.from("mentors").select("id", { count: "exact", head: true }), supabase.from("classes").select("id", { count: "exact", head: true }), supabase.from("student_attendance").select("id", { count: "exact", head: true })]); return { students: students ?? 0, mentors: mentors ?? 0, classes: classes ?? 0, attendance: attendance ?? 0 }; }
export async function getMentorMetrics(userId: string) { const supabase = await createSupabaseServerClient(); const { start, end } = todayRange(); const { data: mentor } = await supabase.from("mentors").select("id").eq("profile_id", userId).maybeSingle(); if (!mentor) return { today: 0, classes: 0, attendance: 0 }; const [{ count: today }, { count: classes }, { count: attendance }] = await Promise.all([supabase.from("schedules").select("id", { count: "exact", head: true }).eq("mentor_id", mentor.id).gte("starts_at", start).lt("starts_at", end), supabase.from("mentor_assignments").select("id", { count: "exact", head: true }).eq("mentor_id", mentor.id), supabase.from("mentor_attendance").select("id", { count: "exact", head: true }).eq("mentor_id", mentor.id).gte("recorded_at", start).lt("recorded_at", end)]); return { today: today ?? 0, classes: classes ?? 0, attendance: attendance ?? 0 }; }
export async function getParentMetrics(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { start, end } = todayRange();
  const { data: parent } = await supabase.from("parents").select("id").eq("profile_id", userId).maybeSingle();
  if (!parent) return { children: 0, schedule: 0, attendance: "—", childrenDetail: [] as { id: string; full_name: string; total: number; present: number }[] };
  const { data: students } = await supabase.from("students").select("id, full_name").eq("parent_id", parent.id);
  const ids = (students ?? []).map(x => x.id);
  if (!ids.length) return { children: 0, schedule: 0, attendance: "—", childrenDetail: [] as { id: string; full_name: string; total: number; present: number }[] };
  const [{ data: enrollments }, { data: records }] = await Promise.all([
    supabase.from("student_classes").select("class_id").in("student_id", ids),
    supabase.from("student_attendance").select("student_id, status").in("student_id", ids),
  ]);
  const classIds = [...new Set((enrollments ?? []).map(x => x.class_id))];
  const { count: schedule } = classIds.length ? await supabase.from("schedules").select("id", { count: "exact", head: true }).in("class_id", classIds).gte("starts_at", start).lt("starts_at", end) : { count: 0 };
  const total = records?.length ?? 0;
  const presentAll = records?.filter(x => x.status === "present" || x.status === "late").length ?? 0;
  const childrenDetail = (students ?? []).map(s => {
    const sRecords = (records ?? []).filter(r => r.student_id === s.id);
    const sPresent = sRecords.filter(r => r.status === "present" || r.status === "late").length;
    return { id: s.id, full_name: s.full_name, total: sRecords.length, present: sPresent };
  });
  return { children: ids.length, schedule: schedule ?? 0, attendance: total ? `${Math.round(presentAll / total * 100)}%` : "—", childrenDetail };
}
