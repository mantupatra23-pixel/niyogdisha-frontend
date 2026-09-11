import Link from "next/link";
import { getJobs } from "@/lib/api/services";
import { Briefcase, Calendar, ChevronRight, Users, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Jobs 2026 — Latest Central & State Notifications",
  description: "Browse verified Sarkari Naukri notifications, eligibility criteria, vacancies, and application deadlines across India.",
};

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="border-b border-brand-border pb-5 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy">
          Latest Government Recruitment Notifications
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Showing verified recruitments from official Union and State government notifications.
        </p>
      </div>

      {/* Grid of Job Cards */}
      {jobs.length === 0 ? (
        <div className="border border-brand-border rounded-lg p-10 text-center text-brand-muted">
          No job notifications available currently.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-brand-border hover:border-brand-blue rounded-lg p-5 bg-white shadow-sm flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-brand-peach text-brand-navy border border-brand-orange/30">
                    {job.organization?.short_name || "Govt Org"}
                  </span>
                  <span className="text-xs text-brand-muted flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    Verified
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-brand-navy leading-snug hover:text-brand-blue">
                  <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
                </h2>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-brand-muted">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Vacancies: <strong>{job.total_vacancies?.toLocaleString() || "Not specified"}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                    <span>
                      Last Date:{" "}
                      <strong>
                        {job.last_date ? new Date(job.last_date).toLocaleDateString("en-IN") : "Announced Soon"}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs text-brand-muted">
                  Mode: {job.application_mode || "Online"}
                </span>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy bg-brand-peach/50 hover:bg-brand-peach px-3 py-1.5 rounded border border-brand-orange/40 transition-colors"
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
