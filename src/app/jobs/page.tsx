import Link from "next/link";
import { getJobs } from "@/lib/api/services";
import { Search, Calendar, ChevronRight, Users, CheckCircle2, Filter } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Jobs 2026 — Latest Central & State Notifications",
  description: "Browse verified Sarkari Naukri notifications, eligibility criteria, vacancies, and application deadlines across India.",
};

interface JobsPageProps {
  searchParams: Promise<{ search?: string; category?: string; type?: string }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { search, category, type } = await searchParams;
  const allJobs = await getJobs();

  // Search & category filter logic
  const filteredJobs = allJobs.filter((job) => {
    let match = true;
    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      match =
        job.title.toLowerCase().includes(q) ||
        (job.organization?.name?.toLowerCase().includes(q) ?? false) ||
        (job.organization?.short_name?.toLowerCase().includes(q) ?? false);
    }
    if (match && category) {
      match = job.category?.slug?.toLowerCase() === category.toLowerCase();
    }
    if (match && type) {
      match = job.job_type?.toLowerCase() === type.toLowerCase();
    }
    return match;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Title & Filter Summary */}
      <div style={{ borderBottom: "1px solid #CCD5D2" }} className="pb-6 mb-6">
        <h1 style={{ color: "#152935" }} className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Government Recruitment Notifications 2026
        </h1>
        <p style={{ color: "#5F6B72" }} className="text-xs sm:text-sm mt-1">
          Showing verified recruitments directly mapped from official portals.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
          <span style={{ color: "#152935" }} className="font-bold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" style={{ color: "#698EA2" }} /> Quick Filter:
          </span>
          <Link
            href="/jobs"
            style={{
              backgroundColor: !category && !type ? "#152935" : "#FFFFFF",
              color: !category && !type ? "#FFFFFF" : "#152935",
              borderColor: "#CCD5D2",
            }}
            className="px-3 py-1 rounded border font-semibold"
          >
            All Jobs
          </Link>
          <Link
            href="/jobs?type=CENTRAL"
            style={{
              backgroundColor: type === "CENTRAL" ? "#152935" : "#FFFFFF",
              color: type === "CENTRAL" ? "#FFFFFF" : "#152935",
              borderColor: "#CCD5D2",
            }}
            className="px-3 py-1 rounded border font-semibold"
          >
            Central Govt
          </Link>
          <Link
            href="/jobs?type=STATE"
            style={{
              backgroundColor: type === "STATE" ? "#152935" : "#FFFFFF",
              color: type === "STATE" ? "#FFFFFF" : "#152935",
              borderColor: "#CCD5D2",
            }}
            className="px-3 py-1 rounded border font-semibold"
          >
            State Govt
          </Link>
          <Link
            href="/jobs?category=ssc"
            style={{
              backgroundColor: category === "ssc" ? "#152935" : "#FFFFFF",
              color: category === "ssc" ? "#FFFFFF" : "#152935",
              borderColor: "#CCD5D2",
            }}
            className="px-3 py-1 rounded border font-semibold"
          >
            SSC
          </Link>
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg p-12 text-center text-sm text-gray-500 bg-white">
          No government jobs match your selected filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              style={{ borderColor: "#CCD5D2" }}
              className="border rounded-lg p-5 bg-white shadow-xs flex flex-col justify-between hover:border-[#698EA2] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ backgroundColor: "#CCD5D2", color: "#152935" }} className="text-[11px] font-bold px-2 py-0.5 rounded">
                    {job.organization?.short_name || "CENTRAL"}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Official
                  </span>
                </div>

                <h2 style={{ color: "#152935" }} className="text-base font-bold leading-snug">
                  <Link href={`/jobs/${job.slug}`} className="hover:text-[#698EA2]">
                    {job.title}
                  </Link>
                </h2>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#698EA2]" />
                    <span>Vacancies: <strong>{job.total_vacancies?.toLocaleString() || "Not specified"}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#698EA2]" />
                    <span>
                      Last Date:{" "}
                      <strong>
                        {job.last_date ? new Date(job.last_date).toLocaleDateString("en-IN") : "Announced Soon"}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #CCD5D2" }} className="mt-5 pt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Mode: <strong>{job.application_mode || "Online"}</strong>
                </span>
                <Link
                  href={`/jobs/${job.slug}`}
                  style={{ backgroundColor: "#FDE5D6", color: "#152935", borderColor: "#E4A576" }}
                  className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded border hover:bg-[#E4A576] transition-colors"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
