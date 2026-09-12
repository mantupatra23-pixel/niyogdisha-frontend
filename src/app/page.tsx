import Link from "next/link";
import { 
  Search, 
  Calendar, 
  ChevronRight, 
  ShieldCheck, 
  ArrowUpRight, 
  Award, 
  FileText, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  HelpCircle
} from "lucide-react";
import { getJobs, getAdmitCards, getResults, getAnswerKeys } from "@/lib/api/services";

interface Job {
  id: string | number;
  slug: string;
  title: string;
  job_type?: string;
  total_vacancies?: number;
  last_date?: string;
  organization?: { name?: string; short_name?: string };
}

interface AdmitCard {
  id: string | number;
  slug?: string;
  title: string;
  download_url?: string;
  release_date?: string;
}

interface Result {
  id: string | number;
  slug?: string;
  title: string;
  result_url?: string;
  cutoff_details?: string;
}

interface AnswerKey {
  id: string | number;
  slug?: string;
  title: string;
  answer_key_url?: string;
  download_url?: string;
}

export default async function HomePage() {
  let jobs: Job[] = [];
  let admitCards: AdmitCard[] = [];
  let results: Result[] = [];
  let answerKeys: AnswerKey[] = [];

  try {
    const [jobsRes, admitRes, resultsRes, answerRes] = await Promise.all([
      getJobs(),
      getAdmitCards(),
      getResults(),
      getAnswerKeys(),
    ]);

    jobs = Array.isArray(jobsRes) ? jobsRes : ((jobsRes as { data?: Job[] })?.data || []);
    admitCards = Array.isArray(admitRes) ? admitRes : ((admitRes as { data?: AdmitCard[] })?.data || []);
    results = Array.isArray(resultsRes) ? resultsRes : ((resultsRes as { data?: Result[] })?.data || []);
    answerKeys = Array.isArray(answerRes) ? answerRes : ((answerRes as { data?: AnswerKey[] })?.data || []);
  } catch {
    // Fallback on API failure
  }

  const now = new Date();
  const closingSoonJobs = jobs.filter((job) => {
    if (!job.last_date) return false;
    const deadline = new Date(job.last_date);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 15;
  });

  return (
    <div className="w-full bg-white min-h-screen text-gray-900">
      <div style={{ backgroundColor: "#152935", color: "#FDE5D6" }} className="w-full py-2 px-4 text-center text-xs sm:text-sm font-bold tracking-wide border-b border-[#CCD5D2]">
        ⚡ Verified Sarkari Recruitment &amp; Exam Lifecycle Portal 2026 — Official Source Mapped
      </div>

      <section style={{ backgroundColor: "#FAF3EE", borderBottom: "1px solid #CCD5D2" }} className="py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div style={{ backgroundColor: "#E2EBE8", border: "1px solid #698EA2", color: "#152935" }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-[#698EA2]" />
            <span>100% Verified Official Notifications &amp; Direct Links</span>
          </div>

          <h1 style={{ color: "#152935" }} className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
            Latest Government Jobs &amp; Exam Updates
          </h1>

          <p style={{ color: "#5F6B72" }} className="text-xs sm:text-sm max-w-2xl mx-auto mb-5 leading-relaxed">
            Instant tracking for recruitment notifications, admit cards, answer keys, results, and category-wise cut-off marks mapped directly from official government commission portals.
          </p>

          <div className="max-w-xl mx-auto mb-4">
            <form action="/jobs" method="GET" style={{ borderColor: "#152935" }} className="flex items-center border-2 rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="pl-3.5 pr-1">
                <Search className="w-4 h-4 text-[#698EA2]" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search SSC, UPSC, Railway, State PSC, Bank jobs..."
                style={{ color: "#152935" }}
                className="w-full px-3 py-2.5 text-xs sm:text-sm focus:outline-none"
              />
              <button
                type="submit"
                style={{ backgroundColor: "#152935" }}
                className="text-white px-5 py-2.5 text-xs sm:text-sm font-bold hover:bg-[#698EA2] transition"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-1.5 text-xs">
            <span style={{ color: "#5F6B72" }} className="font-semibold mr-1">Popular Filters:</span>
            {[
              { name: "Central Govt", href: "/jobs/central-government" },
              { name: "State Govt", href: "/jobs/state-government" },
              { name: "SSC Jobs", href: "/jobs/ssc" },
              { name: "UPSC", href: "/jobs/upsc" },
              { name: "Railway", href: "/jobs/railway" },
              { name: "Defence", href: "/jobs/defence" },
              { name: "Banking", href: "/jobs/banking" },
              { name: "Graduate", href: "/jobs/graduate" },
              { name: "10th Pass", href: "/jobs/10th-pass" },
              { name: "12th Pass", href: "/jobs/12th-pass" },
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

      {/* Hot Updates Matrix */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-3 border-b pb-2 border-[#CCD5D2]">
          <h2 className="text-sm sm:text-base font-extrabold text-[#152935] flex items-center gap-2">
            🔥 Hot Updates &amp; Trending Exams
          </h2>
          <span className="text-xs text-gray-500">Live Backend Stream</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {jobs.slice(0, 6).map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.slug}`}
              style={{ borderColor: "#CCD5D2", backgroundColor: "#FAF3EE" }}
              className="p-2.5 rounded border hover:border-[#152935] transition block text-center"
            >
              <span className="text-[10px] font-bold text-[#698EA2] block uppercase truncate">
                {job.organization?.short_name || "GOVT"}
              </span>
              <span className="text-xs font-bold text-[#152935] block line-clamp-1 mt-0.5">
                {job.title}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
                {job.total_vacancies ? `${job.total_vacancies.toLocaleString()} Posts` : "Active"}
              </span>
            </Link>
          ))}
          {admitCards.slice(0, 3).map((item) => (
            <Link
              key={`admit-${item.id}`}
              href={`/admit-card/${item.slug || item.id}`}
              style={{ borderColor: "#CCD5D2", backgroundColor: "#E2EBE8" }}
              className="p-2.5 rounded border hover:border-[#152935] transition block text-center"
            >
              <span className="text-[10px] font-bold text-[#698EA2] block uppercase truncate">
                Admit Card
              </span>
              <span className="text-xs font-bold text-[#152935] block line-clamp-1 mt-0.5">
                {item.title}
              </span>
              <span className="text-[10px] text-blue-800 font-semibold mt-1 block">
                View →
              </span>
            </Link>
          ))}
          {results.slice(0, 3).map((res) => (
            <Link
              key={`res-${res.id}`}
              href={`/results/${res.slug || res.id}`}
              style={{ borderColor: "#CCD5D2", backgroundColor: "#FDE5D6" }}
              className="p-2.5 rounded border hover:border-[#152935] transition block text-center"
            >
              <span className="text-[10px] font-bold text-emerald-800 block uppercase truncate">
                Result Out
              </span>
              <span className="text-xs font-bold text-[#152935] block line-clamp-1 mt-0.5">
                {res.title}
              </span>
              <span className="text-[10px] text-emerald-900 font-semibold mt-1 block">
                Merit List →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {closingSoonJobs.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-red-900 font-bold">
              <Clock className="w-4 h-4 text-red-600 animate-pulse" />
              <span>Closing Soon ({closingSoonJobs.length} Applications Ending):</span>
            </div>
            <div className="flex gap-2 overflow-x-auto py-1">
              {closingSoonJobs.slice(0, 3).map((job) => (
                <Link key={job.id} href={`/jobs/${job.slug}`} className="bg-white px-2.5 py-1 rounded border border-red-200 text-red-800 font-semibold hover:underline whitespace-nowrap">
                  {job.title.substring(0, 30)}... (Last Date: {new Date(job.last_date!).toLocaleDateString()})
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Primary 3-Column Scanner */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Results Column */}
          <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg bg-white overflow-hidden shadow-xs flex flex-col">
            <div style={{ backgroundColor: "#E4A576", borderBottom: "3px solid #152935", color: "#152935" }} className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide">
                <CheckCircle2 className="w-4 h-4" />
                <span>RESULTS &amp; CUT-OFF</span>
              </div>
              <Link href="/results" className="text-xs hover:underline flex items-center font-bold">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100 flex-1 max-h-[500px] overflow-y-auto">
              {results.length === 0 ? (
                <p className="p-4 text-xs text-gray-500">No declared results found.</p>
              ) : (
                results.map((res) => (
                  <div key={res.id} className="p-3 hover:bg-[#FAF3EE] transition">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-1">
                      DECLARED RESULT
                    </span>
                    <Link
                      href={`/results/${res.slug || res.id}`}
                      style={{ color: "#152935" }}
                      className="text-xs sm:text-sm font-bold flex items-center justify-between gap-1 hover:text-[#698EA2]"
                    >
                      <span className="line-clamp-2">{res.title}</span>
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[#E4A576]" />
                    </Link>
                    {res.cutoff_details && (
                      <p className="mt-1 text-[11px] text-gray-600 bg-gray-50 p-1.5 rounded border border-gray-200">
                        <strong>Cutoff:</strong> {res.cutoff_details}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Admit Cards Column */}
          <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg bg-white overflow-hidden shadow-xs flex flex-col">
            <div style={{ backgroundColor: "#698EA2", borderBottom: "3px solid #152935" }} className="text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide">
                <Award className="w-4 h-4 text-[#FDE5D6]" />
                <span>ADMIT CARDS / EXAM</span>
              </div>
              <Link href="/admit-card" className="text-xs text-white hover:underline flex items-center font-semibold">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100 flex-1 max-h-[500px] overflow-y-auto">
              {admitCards.length === 0 ? (
                <p className="p-4 text-xs text-gray-500">No upcoming exam admit cards.</p>
              ) : (
                admitCards.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-[#FAF3EE] transition">
                    <span style={{ color: "#698EA2" }} className="text-[10px] font-bold block mb-1 uppercase">
                      HALL TICKET / EXAM SLIP
                    </span>
                    <Link
                      href={`/admit-card/${item.slug || item.id}`}
                      style={{ color: "#152935" }}
                      className="text-xs sm:text-sm font-bold flex items-center justify-between gap-1 hover:text-[#698EA2]"
                    >
                      <span className="line-clamp-2">{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-[#698EA2]" />
                    </Link>
                    {item.release_date && (
                      <div className="mt-1 text-[11px] text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#698EA2]" />
                        <span>Date: {new Date(item.release_date).toLocaleDateString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Latest Notifications Column */}
          <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg bg-white overflow-hidden shadow-sm flex flex-col">
            <div style={{ backgroundColor: "#152935", borderBottom: "3px solid #E4A576" }} className="text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide">
                <FileText className="w-4 h-4 text-[#E4A576]" />
                <span>LATEST NOTIFICATIONS</span>
              </div>
              <Link href="/jobs" style={{ color: "#FDE5D6" }} className="text-xs hover:underline flex items-center font-semibold">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100 flex-1 max-h-[500px] overflow-y-auto">
              {jobs.length === 0 ? (
                <p className="p-4 text-xs text-gray-500">No active notifications found.</p>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="p-3 hover:bg-[#FAF3EE] transition">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span style={{ backgroundColor: "#CCD5D2", color: "#152935" }} className="px-2 py-0.5 rounded font-bold uppercase">
                        {job.organization?.short_name || job.job_type || "CENTRAL"}
                      </span>
                      {job.last_date && (
                        <span className="text-red-700 font-semibold">
                          Last: {new Date(job.last_date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                    <h2 style={{ color: "#152935" }} className="text-xs sm:text-sm font-bold leading-snug">
                      <Link href={`/jobs/${job.slug}`} className="hover:underline line-clamp-2">
                        {job.title}
                      </Link>
                    </h2>
                    <div className="mt-1.5 flex items-center justify-between text-[11px]">
                      {job.total_vacancies && job.total_vacancies > 0 ? (
                        <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {job.total_vacancies.toLocaleString()} Posts
                        </span>
                      ) : (
                        <span className="text-gray-500">Open Notice</span>
                      )}
                      <Link href={`/jobs/${job.slug}`} className="text-[#698EA2] font-bold hover:underline">
                        Details →
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Qualification Bar */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div style={{ backgroundColor: "#152935", color: "#FFFFFF" }} className="p-4 rounded-lg shadow-sm">
          <h2 className="text-sm sm:text-base font-bold mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#E4A576]" />
            <span>Jobs by Education Qualification</span>
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 text-center text-xs">
            {[
              { name: "8th Pass", slug: "8th-pass" },
              { name: "10th Pass", slug: "10th-pass" },
              { name: "12th Pass", slug: "12th-pass" },
              { name: "ITI", slug: "iti" },
              { name: "Diploma", slug: "diploma" },
              { name: "Graduate", slug: "graduate" },
              { name: "B.Tech", slug: "btech" },
              { name: "Post Graduate", slug: "post-graduate" },
              { name: "B.Ed", slug: "b-ed" },
            ].map((edu) => (
              <Link
                key={edu.slug}
                href={`/jobs/${edu.slug}`}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-1 rounded transition border border-white/10 truncate"
              >
                {edu.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Keys & State Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg bg-white overflow-hidden shadow-xs">
            <div style={{ backgroundColor: "#698EA2" }} className="text-white px-4 py-2.5 text-xs sm:text-sm font-bold flex justify-between items-center">
              <span>ANSWER KEYS &amp; RESPONSE SHEETS</span>
              <Link href="/answer-key" className="text-xs hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto text-xs">
              {answerKeys.length === 0 ? (
                <p className="p-4 text-gray-500">No provisional answer keys published.</p>
              ) : (
                answerKeys.map((ak) => (
                  <div key={ak.id} className="p-3 hover:bg-gray-50 flex justify-between items-center">
                    <Link href={`/answer-key/${ak.slug || ak.id}`} className="font-bold text-[#152935] line-clamp-1 hover:underline">{ak.title}</Link>
                    <Link href={`/answer-key/${ak.slug || ak.id}`} className="text-blue-600 font-semibold whitespace-nowrap ml-2 hover:underline">View ↗</Link>
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg bg-white overflow-hidden shadow-xs">
            <div style={{ backgroundColor: "#152935" }} className="text-white px-4 py-2.5 text-xs sm:text-sm font-bold flex justify-between items-center">
              <span>STATE-WISE RECRUITMENT PORTALS</span>
              <span className="text-xs text-[#E4A576]">India State PSCs</span>
            </div>
            <div className="p-3 grid grid-cols-3 gap-2 text-xs">
              {[
                "Uttar Pradesh", "Bihar", "Odisha", "Rajasthan", "Madhya Pradesh", 
                "West Bengal", "Maharashtra", "Delhi", "Haryana", "Punjab", "Jharkhand", "Karnataka"
              ].map((state) => (
                <Link
                  key={state}
                  href={`/jobs/${state.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ borderColor: "#CCD5D2", backgroundColor: "#FAF3EE" }}
                  className="p-1.5 rounded border text-center font-medium text-[#152935] hover:border-[#152935] truncate"
                >
                  {state} Jobs
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-8 border-t border-[#CCD5D2] mt-6">
        <h2 className="text-base sm:text-lg font-bold text-[#152935] mb-2">
          About NiyogDisha – India&apos;s Trusted Government Job &amp; Exam Portal
        </h2>
        <p className="text-xs sm:text-sm text-[#5F6B72] leading-relaxed mb-6">
          NiyogDisha is an independent digital recruitment information platform designed to provide aspirants across India with real-time, verified updates on Central and State government vacancies, admit card releases, provisional answer keys, and final examination results. By mapping data directly from official commission servers including UPSC, SSC, Railways (RRB), Banking (IBPS/SBI), and State Public Service Commissions, NiyogDisha ensures complete transparency, accuracy, and ease of access for all job seekers.
        </p>

        <h3 className="text-sm sm:text-base font-bold text-[#152935] mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#698EA2]" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3 bg-[#FAF3EE] rounded border border-[#CCD5D2]">
            <h4 className="font-bold text-[#152935]">Where can I verify official government job notifications?</h4>
            <p className="text-gray-600 mt-1">Every recruitment listing on NiyogDisha includes direct, verified links to official government commission portals (e.g., ssc.gov.in, upsc.gov.in).</p>
          </div>
          <div className="p-3 bg-[#FAF3EE] rounded border border-[#CCD5D2]">
            <h4 className="font-bold text-[#152935]">How can I find jobs based on my educational qualification?</h4>
            <p className="text-gray-600 mt-1">You can use the Education Qualification quick select bar on the homepage to instantly view listings for 10th pass, 12th pass, graduate, and technical diploma holders.</p>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: "#152935", color: "#FDE5D6" }} className="mt-12 py-8 px-4 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-sm text-white mb-2">NiyogDisha</h3>
            <p className="text-gray-300">High-performance verified Indian government jobs and exam lifecycle tracking engine.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Quick Links</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/jobs" className="hover:underline">Government Jobs</Link></li>
              <li><Link href="/admit-card" className="hover:underline">Admit Card</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Exam Lifecycle</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="/answer-key" className="hover:underline">Answer Keys</Link></li>
              <li><Link href="/results" className="hover:underline">Results &amp; Cut-off</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">Legal &amp; Trust</h4>
            <p className="text-gray-300 leading-relaxed">
              NiyogDisha is an independent information portal and is NOT affiliated with any government body. Always verify notices on official websites.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/10 pt-4 text-center text-gray-400">
          © 2026 NiyogDisha. All rights reserved. High-Performance Clean Information Portal.
        </div>
      </footer>
    </div>
  );
}
