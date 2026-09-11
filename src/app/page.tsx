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
    <div className="bg-white min-h-screen">
      {/* Top Banner Stripe */}
      <div className="bg-[#E4A576] py-1.5 px-4 text-center text-xs font-bold tracking-wide text-[#152935]">
        Verified Sarkari Recruitment & Exam Lifecycle Engine 2026
      </div>

      {/* 1. Hero Section */}
      <section className="bg-[#FDE5D6]/40 border-b border-[#CCD5D2] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CCD5D2]/50 border border-[#698EA2]/40 text-[#152935] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#698EA2]" />
            <span>100% Verified Official Notifications</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#152935] tracking-tight leading-tight">
            Latest Government Jobs &amp; Exam Updates
          </h1>

          <p className="text-base sm:text-lg text-[#5F6B72] max-w-3xl mx-auto leading-relaxed">
            Find verified notifications, vacancies, eligibility criteria, admit cards, answer keys, results, and full exam lifecycle updates directly mapped from official portals.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <form action="/jobs" method="GET" className="flex items-center border-2 border-[#152935] rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="pl-4 text-[#698EA2]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search SSC, UPSC, Railway, State PSC recruitments..."
                className="w-full px-4 py-3 text-sm text-[#152935] focus:outline-none placeholder-[#5F6B72]/70"
              />
              <button
                type="submit"
                className="bg-[#152935] hover:bg-[#698EA2] text-white px-6 py-3 text-sm font-bold transition-colors flex items-center gap-1"
              >
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-3">
            <span className="text-xs font-semibold text-[#5F6B72] mr-1">Popular:</span>
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
                className="px-3 py-1 text-xs font-semibold bg-white hover:bg-[#FDE5D6] border border-[#CCD5D2] text-[#152935] rounded shadow-2xs transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Key Lifecycle Columns with Distinct Sunburn Headers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Latest Notifications (Navy Header + Orange Accent) */}
          <div className="border border-[#CCD5D2] rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div className="bg-[#152935] text-white px-4 py-3 flex items-center justify-between border-b-2 border-[#E4A576]">
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                <FileText className="w-4 h-4 text-[#E4A576]" />
                <span>LATEST NOTIFICATIONS</span>
              </div>
              <Link href="/jobs" className="text-xs text-[#FDE5D6] hover:underline flex items-center font-medium">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#CCD5D2] flex-1">
              {jobs.length === 0 ? (
                <p className="p-4 text-xs text-[#5F6B72]">No active recruitment notifications found.</p>
              ) : (
                jobs.slice(0, 6).map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.slug}`}
                    className="p-4 block hover:bg-[#FDE5D6]/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#698EA2] font-bold mb-1">
                      <span className="bg-[#CCD5D2]/40 px-2 py-0.5 rounded text-[#152935]">{job.organization?.short_name || "CENTRAL"}</span>
                      {job.last_date && (
                        <span className="text-[#5F6B72]">
                          Last: {new Date(job.last_date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                    <h2 className="text-sm font-bold text-[#152935] group-hover:text-[#698EA2] line-clamp-2">
                      {job.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-[#5F6B72]">
                      {job.total_vacancies > 0 && (
                        <span className="bg-[#FDE5D6] text-[#152935] px-2 py-0.5 rounded font-bold border border-[#E4A576]/50">
                          {job.total_vacancies.toLocaleString()} Posts
                        </span>
                      )}
                      <span className="text-emerald-700 font-semibold">Verified</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Column 2: Admit Cards (Secondary Blue Header) */}
          <div className="border border-[#CCD5D2] rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div className="bg-[#698EA2] text-white px-4 py-3 flex items-center justify-between border-b-2 border-[#152935]">
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                <Award className="w-4 h-4 text-[#FDE5D6]" />
                <span>ADMIT CARDS / EXAM DATES</span>
              </div>
              <Link href="/admit-card" className="text-xs text-white hover:underline flex items-center font-medium">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#CCD5D2] flex-1">
              {admitCards.length === 0 ? (
                <p className="p-4 text-xs text-[#5F6B72]">No upcoming exam admit cards announced.</p>
              ) : (
                admitCards.slice(0, 6).map((item) => (
                  <div key={item.id} className="p-4 hover:bg-[#FDE5D6]/30 transition-colors">
                    <span className="text-[11px] font-bold text-[#698EA2] block mb-1">
                      HALL TICKET / ADMIT CARD
                    </span>
                    <a
                      href={item.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#152935] hover:text-[#698EA2] flex items-center justify-between gap-1 group"
                    >
                      <span className="line-clamp-2">{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#698EA2] group-hover:text-[#152935] flex-shrink-0" />
                    </a>
                    {item.release_date && (
                      <div className="mt-2 text-[11px] text-[#5F6B72] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#698EA2]" />
                        <span>Date: {new Date(item.release_date).toLocaleDateString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 3: Results & Keys (Peach/Orange Header) */}
          <div className="border border-[#CCD5D2] rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div className="bg-[#E4A576] text-[#152935] px-4 py-3 flex items-center justify-between border-b-2 border-[#152935]">
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                <CheckCircle2 className="w-4 h-4 text-[#152935]" />
                <span>EXAM RESULTS &amp; CUT-OFF</span>
              </div>
              <Link href="/results" className="text-xs text-[#152935] hover:underline flex items-center font-bold">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-[#CCD5D2] flex-1">
              {results.length === 0 ? (
                <p className="p-4 text-xs text-[#5F6B72]">No recently published results found.</p>
              ) : (
                results.slice(0, 6).map((res) => (
                  <div key={res.id} className="p-4 hover:bg-[#FDE5D6]/30 transition-colors">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-1.5">
                      DECLARED RESULT
                    </span>
                    <a
                      href={res.result_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#152935] hover:text-[#698EA2] flex items-center justify-between gap-1 group"
                    >
                      <span className="line-clamp-2">{res.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#E4A576] group-hover:text-[#152935] flex-shrink-0" />
                    </a>
                    {res.cutoff_details && (
                      <p className="mt-1.5 text-[11px] text-[#5F6B72] bg-[#FDE5D6]/50 p-1.5 rounded border border-[#CCD5D2]/60 line-clamp-1">
                        <strong>Cutoff:</strong> {res.cutoff_details}
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
