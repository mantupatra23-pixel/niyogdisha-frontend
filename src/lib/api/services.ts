import { fetchApi } from "./client";
import { Job, AdmitCard, AnswerKey, ResultItem } from "@/types";

export async function getJobs(params?: { limit?: number; status?: string }): Promise<Job[]> {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.status) query.set("status", params.status);
  const endpoint = `/jobs${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetchApi<{ success?: boolean; data?: Job[] } | Job[]>(endpoint);
  if (!res) return [];
  if (Array.isArray(res)) return res;
  return res.data || [];
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const res = await fetchApi<{ success?: boolean; data?: Job } | Job>(`/jobs/${slug}`);
  if (!res) return null;
  if ("data" in res && res.data) return res.data;
  return res as Job;
}

export async function getAdmitCards(): Promise<AdmitCard[]> {
  const res = await fetchApi<{ success?: boolean; data?: AdmitCard[] } | AdmitCard[]>("/admit-cards");
  if (!res) return [];
  if (Array.isArray(res)) return res;
  return res.data || [];
}

export async function getAnswerKeys(): Promise<AnswerKey[]> {
  const res = await fetchApi<{ success?: boolean; data?: AnswerKey[] } | AnswerKey[]>("/answer-keys");
  if (!res) return [];
  if (Array.isArray(res)) return res;
  return res.data || [];
}

export async function getResults(): Promise<ResultItem[]> {
  const res = await fetchApi<{ success?: boolean; data?: ResultItem[] } | ResultItem[]>("/results");
  if (!res) return [];
  if (Array.isArray(res)) return res;
  return res.data || [];
}
