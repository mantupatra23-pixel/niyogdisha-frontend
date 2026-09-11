import Link from "next/link";
import { Search, Calendar, ChevronRight, ShieldCheck, ArrowUpRight, Award, FileText, CheckCircle2 } from "lucide-react";
import { getJobs, getAdmitCards, getResults } from "@/lib/api/services";

export default async function HomePage() {
  const [jobs, admitCards, results] = await Promise.all([
    getJobs({ limit: 8, status: "PUBLISHED" }),
    getAdmitCards(),
    getResults(),
  ]);

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="border-b border-brand-border bg-gradient-to-b from-brand-peach/20 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-peach/80 border border-brand-orange/40 text-brand-navy text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-brand-blue" />
            <span>100% Verified Official Notifications</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
            Latest Government Jobs &amp; Exam Updates
          </h1>

          <p className="text-base sm:text-lg text-brand-muted max-w-3xl mx-auto leading-relaxed">
            Find verified notifications, vacancies, eligibility criteria, admit cards, answer keys, results, and full exam lifecycle updates directly mapped from official portals.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <form action="/jobs" method="GET" className="flex items-center border-2 border-brand-navy rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="pl-4 text-brand-muted">
                <Search className="w-5 h-5 text-brand-blue" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search SSC, UPSC, Railway, State PSC recruitments..."
                className="w-full px-4 py-3 text-sm text-brand-navy focus:outline-none placeholder-brand-muted/70"
              />
              <button
                type="submit"
                className="bg-brand-navy hover:bg-brand-blue text-white px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-1"
              >
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-3">
            <span className="text-xs font-semibold text-brand-muted mr-1">Popular:</span>
            {[
              { name: "Central Govt", href: "/jobs?type=CENTRAL" },
              { name: "State Govt", href: "/jobs?type=STATE" },
              { name: "SSC Jobs", href: "/jobs?category=ssc" },
              { name: "UPSC", href: "/jobs?category=upsc" },
              { name: "Railway", href: "/jobs?category=railway" },
              { name: "Defence", href: "/jobs?category=defence" },
              { name: "Banking", href: "/jobs?category=banking" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="px-3 py-1 text-xs font-medium bg-white hover:bg-brand-peach/50 border border-brand-border text-brand-navy rounded transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Key Lifecycle Columns (Clean Modern Sarkari Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Latest Jobs */}
          <div className="border border-brand-border rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div className="bg-brand-navy text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                <FileText className="w-4 h-4 text-brand-orange" />
                <span>LATEST NOTIFICATIONS</span>
              </div>
              <Link href="/jobs" className="text-xs text-brand-peach hover:underline flex items-center">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-brand-border flex-1">
              {jobs.length === 0 ? (
                <p className="p-4 text-xs text-brand-muted">No active recruitment notifications found.</p>
              ) : (
                jobs.slice(0, 6).map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.slug}`}
                    className="p-3.5 block hover:bg-brand-peach/20 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-[11px] text-brand-blue font-semibold mb-1">
                      <span>{job.organization?.short_name || "CENTRAL"}</span>
                      {job.last_date && (
                        <span className="text-brand-muted">
                          Last: {new Date(job.last_date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                    <h2 className="text-sm font-semibold text-brand-navy group-hover:text-brand-blue line-clamp-2">
                      {job.title}
                    </h2>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-brand-muted">
                      {job.total_vacancies > 0 && (
                        <span className="bg-brand-border/60 px-1.5 py-0.5 rounded font-medium text-brand-navy">
                          {job.total_vacancies.toLocaleString()} Posts
                        </span>
                      )}
                      <span>Verified Official</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Column 2: Admit Cards */}
          <div className="border border-brand-border rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div className="bg-brand-navy text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                <Award className="w-4 h-4 text-brand-blue" />
                <span>ADMIT CARDS / EXAM DATES</span>
              </div>
              <Link href="/admit-card" className="text-xs text-brand-peach hover:underline flex items-center">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-brand-border flex-1">
              {admitCards.length === 0 ? (
                <p className="p-4 text-xs text-brand-muted">No upcoming exam admit cards announced.</p>
              ) : (
                admitCards.slice(0, 6).map((item) => (
                  <div key={item.id} className="p-3.5 hover:bg-brand-peach/20 transition-colors">
                    <span className="text-[11px] font-semibold text-brand-blue block mb-1">
                      HALL TICKET / ADMIT CARD
                    </span>
                    <a
                      href={item.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-navy hover:text-brand-blue flex items-center justify-between gap-1 group"
                    >
                      <span className="line-clamp-2">{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-navy flex-shrink-0" />
                    </a>
                    {item.release_date && (
                      <div className="mt-1.5 text-[11px] text-brand-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Date: {new Date(item.release_date).toLocaleDateString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 3: Results & Keys */}
          <div className="border border-brand-border rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div className="bg-brand-navy text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>EXAM RESULTS &amp; CUT-OFF</span>
              </div>
              <Link href="/results" className="text-xs text-brand-peach hover:underline flex items-center">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-brand-border flex-1">
              {results.length === 0 ? (
                <p className="p-4 text-xs text-brand-muted">No recently published results found.</p>
              ) : (
                results.slice(0, 6).map((res) => (
                  <div key={res.id} className="p-3.5 hover:bg-brand-peach/20 transition-colors">
                    <span className="text-[11px] font-semibold text-green-700 block mb-1">
                      DECLARED RESULT / CUT-OFF
                    </span>
                    <a
                      href={res.result_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-navy hover:text-brand-blue flex items-center justify-between gap-1 group"
                    >
                      <span className="line-clamp-2">{res.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-navy flex-shrink-0" />
                    </a>
                    {res.cutoff_details && (
                      <p className="mt-1 text-[11px] text-brand-muted line-clamp-1">
                        Cutoff: {res.cutoff_details}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
