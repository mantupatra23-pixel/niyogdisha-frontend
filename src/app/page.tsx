import Link from "next/link";
import { Search, Calendar, ChevronRight, ShieldCheck, ArrowUpRight, Award, FileText, CheckCircle2 } from "lucide-react";
import { getJobs, getAdmitCards, getResults } from "@/lib/api/services";
import CategoryGrid from "@/components/ui/CategoryGrid";

export default async function HomePage() {
  let jobs: any[] = [];
  let admitCards: any[] = [];
  let results: any[] = [];

  try {
    const jobsData = (await getJobs()) as any;
    const admitCardsData = (await getAdmitCards()) as any;
    const resultsData = (await getResults()) as any;

    jobs = Array.isArray(jobsData) ? jobsData : (jobsData?.data || []);
    admitCards = Array.isArray(admitCardsData) ? admitCardsData : (admitCardsData?.data || []);
    results = Array.isArray(resultsData) ? resultsData : (resultsData?.data || []);
  } catch (err) {
    // Graceful fallback on network/API failure
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Top Banner Stripe */}
      <div style={{ backgroundColor: "#E4A576", color: "#152935" }} className="w-full py-2 px-4 text-center text-xs sm:text-sm font-bold tracking-wide">
        Verified Sarkari Recruitment &amp; Exam Lifecycle Portal 2026
      </div>

      {/* 1. Hero Section */}
      <section style={{ backgroundColor: "#FAF3EE", borderBottom: "1px solid #CCD5D2" }} className="py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div style={{ backgroundColor: "#E2EBE8", border: "1px solid #698EA2", color: "#152935" }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <ShieldCheck className="w-4 h-4" style={{ color: "#698EA2" }} />
            <span>100% Verified Official Notifications</span>
          </div>

          <h1 style={{ color: "#152935" }} className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
            Latest Government Jobs &amp; Exam Updates
          </h1>

          <p style={{ color: "#5F6B72" }} className="text-sm sm:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
            Find verified notifications, vacancies, eligibility criteria, admit cards, answer keys, results, and full exam lifecycle updates directly mapped from official portals.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto mb-5">
            <form action="/jobs" method="GET" style={{ borderColor: "#152935" }} className="flex items-center border-2 rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="pl-3.5 pr-1">
                <Search className="w-4 h-4" style={{ color: "#698EA2" }} />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search SSC, UPSC, Railway, State PSC..."
                style={{ color: "#152935" }}
                className="w-full px-3 py-2.5 text-sm focus:outline-none"
              />
              <button
                type="submit"
                style={{ backgroundColor: "#152935" }}
                className="text-white px-5 py-2.5 text-xs sm:text-sm font-bold"
              >
                Search
              </button>
            </form>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
            <span style={{ color: "#5F6B72" }} className="font-semibold mr-1">Popular:</span>
            {[
              { name: "Central Govt", href: "/jobs/central-government" },
              { name: "State Govt", href: "/jobs/state-government" },
              { name: "SSC Jobs", href: "/jobs/ssc" },
              { name: "UPSC", href: "/jobs/upsc" },
              { name: "Railway", href: "/jobs/railway" },
              { name: "Defence", href: "/jobs/defence" },
              { name: "Banking", href: "/jobs/banking" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                style={{ borderColor: "#CCD5D2", color: "#152935" }}
                className="px-2.5 py-1 font-semibold bg-white border rounded hover:bg-[#FDE5D6]"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid Component */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <CategoryGrid />
      </div>

      {/* 2. 3-Column Modern Sarkari Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Latest Notifications */}
          <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div style={{ backgroundColor: "#152935", borderBottom: "3px solid #E4A576" }} className="text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide">
                <FileText className="w-4 h-4" style={{ color: "#E4A576" }} />
                <span>LATEST NOTIFICATIONS</span>
              </div>
              <Link href="/jobs" style={{ color: "#FDE5D6" }} className="text-xs hover:underline flex items-center font-semibold">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200 flex-1">
              {jobs.length === 0 ? (
                <p className="p-4 text-xs text-gray-500">No active notifications found.</p>
              ) : (
                jobs.map((job: any) => (
                  <Link key={job.id} href={`/jobs/${job.slug}`} className="p-4 block hover:bg-[#FDE5D6]/30">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span style={{ backgroundColor: "#CCD5D2", color: "#152935" }} className="px-2 py-0.5 rounded font-bold">
                        {job.organization?.short_name || job.organization?.name || "CENTRAL"}
                      </span>
                      {job.last_date && (
                        <span className="text-gray-500 font-medium">
                          Last: {new Date(job.last_date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                    <h2 style={{ color: "#152935" }} className="text-sm font-bold leading-snug">
                      {job.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-[11px]">
                      {job.total_vacancies > 0 && (
                        <span style={{ backgroundColor: "#FDE5D6", color: "#152935", border: "1px solid #E4A576" }} className="px-2 py-0.5 rounded font-bold">
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

          {/* Column 2: Admit Cards */}
          <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div style={{ backgroundColor: "#698EA2", borderBottom: "3px solid #152935" }} className="text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide">
                <Award className="w-4 h-4" style={{ color: "#FDE5D6" }} />
                <span>ADMIT CARDS / EXAM</span>
              </div>
              <Link href="/admit-card" className="text-xs text-white hover:underline flex items-center font-semibold">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200 flex-1">
              {admitCards.length === 0 ? (
                <p className="p-4 text-xs text-gray-500">No upcoming exam admit cards.</p>
              ) : (
                admitCards.map((item: any) => (
                  <div key={item.id} className="p-4 hover:bg-[#FDE5D6]/30">
                    <span style={{ color: "#698EA2" }} className="text-[11px] font-bold block mb-1">
                      HALL TICKET / ADMIT CARD
                    </span>
                    <a
                      href={item.download_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#152935" }}
                      className="text-sm font-bold flex items-center justify-between gap-1 hover:text-[#698EA2]"
                    >
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ color: "#698EA2" }} />
                    </a>
                    {item.release_date && (
                      <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" style={{ color: "#698EA2" }} />
                        <span>Date: {new Date(item.release_date).toLocaleDateString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 3: Results & Keys */}
          <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div style={{ backgroundColor: "#E4A576", borderBottom: "3px solid #152935", color: "#152935" }} className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide">
                <CheckCircle2 className="w-4 h-4" />
                <span>RESULTS &amp; CUT-OFF</span>
              </div>
              <Link href="/results" className="text-xs hover:underline flex items-center font-bold">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-200 flex-1">
              {results.length === 0 ? (
                <p className="p-4 text-xs text-gray-500">No declared results found.</p>
              ) : (
                results.map((res: any) => (
                  <div key={res.id} className="p-4 hover:bg-[#FDE5D6]/30">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-1.5">
                      DECLARED RESULT
                    </span>
                    <a
                      href={res.result_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#152935" }}
                      className="text-sm font-bold flex items-center justify-between gap-1 hover:text-[#698EA2]"
                    >
                      <span>{res.title}</span>
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0" style={{ color: "#E4A576" }} />
                    </a>
                    {res.cutoff_details && (
                      <p style={{ borderColor: "#CCD5D2", backgroundColor: "#FDE5D6" }} className="mt-2 text-[11px] text-gray-700 p-2 rounded border">
                        <strong>Cutoff:</strong> {res.cutoff_details}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
