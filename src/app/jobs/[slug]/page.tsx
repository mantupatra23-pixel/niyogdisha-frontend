import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobBySlug, getJobs } from "@/lib/api/services";
import { 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  IndianRupee, 
  GraduationCap, 
  UserCheck, 
  HelpCircle,
  FileCheck2,
  AlertCircle
} from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

const CATEGORIES_MAP: Record<string, string> = {
  "central-government": "Central Government Jobs",
  "state-government": "State Government Jobs",
  "railway": "Railway Jobs",
  "banking": "Banking Jobs",
  "ssc": "SSC Jobs",
  "upsc": "UPSC Jobs",
  "graduate": "Graduate Jobs",
  "12th-pass": "12th Pass Jobs",
  "10th-pass": "10th Pass Jobs",
  "8th-pass": "8th Pass Jobs",
  "iti": "ITI Jobs",
  "diploma": "Diploma Jobs",
  "btech": "B.Tech / B.E Jobs",
  "post-graduate": "Post Graduate Jobs",
  "b-ed": "B.Ed / Teaching Jobs",
  "defence": "Defence / Police Jobs",
  "uttar-pradesh": "Uttar Pradesh Government Jobs",
  "bihar": "Bihar Government Jobs",
  "odisha": "Odisha Government Jobs",
  "rajasthan": "Rajasthan Government Jobs",
  "madhya-pradesh": "Madhya Pradesh Government Jobs",
  "west-bengal": "West Bengal Government Jobs",
  "maharashtra": "Maharashtra Government Jobs",
  "delhi": "Delhi Government Jobs",
  "haryana": "Haryana Government Jobs",
  "punjab": "Punjab Government Jobs",
  "jharkhand": "Jharkhand Government Jobs",
  "karnataka": "Karnataka Government Jobs",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (CATEGORIES_MAP[slug]) {
    return {
      title: `${CATEGORIES_MAP[slug]} 2026 – Latest Vacancies & Notices | NiyogDisha`,
      description: `Explore verified ${CATEGORIES_MAP[slug]} notifications, eligibility criteria, exam dates, and official apply online links on NiyogDisha.`,
      alternates: { canonical: `https://niyogdisha-frontend.onrender.com/jobs/${slug}` },
    };
  }

  const job = (await getJobBySlug(slug)) as any;
  if (!job) return { title: "Job Notification | NiyogDisha" };

  return {
    title: `${job.title} – Vacancy, Eligibility, Age Limit & Apply Online | NiyogDisha`,
    description: `${job.title}: Check post-wise vacancies, eligibility criteria, application fee, important dates, and official links.`,
    alternates: {
      canonical: `https://niyogdisha-frontend.onrender.com/jobs/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;

  // Handle Category / State Landing Pages
  if (CATEGORIES_MAP[slug]) {
    let jobs: any[] = [];
    try {
      const res = (await getJobs()) as any;
      const allJobs = Array.isArray(res) ? res : (res?.data || []);
      
      // If it's a state page, check if any job matches the state name
      const isStatePage = ["uttar-pradesh", "bihar", "odisha", "rajasthan", "madhya-pradesh", "west-bengal", "maharashtra", "delhi", "haryana", "punjab", "jharkhand", "karnataka"].includes(slug);
      
      if (isStatePage) {
        const stateName = CATEGORIES_MAP[slug].replace(" Government Jobs", "").toLowerCase();
        jobs = allJobs.filter((j: any) => 
          j.title?.toLowerCase().includes(stateName) || 
          j.organization?.name?.toLowerCase().includes(stateName)
        );
      } else {
        jobs = allJobs;
      }
    } catch {}

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-gray-900">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#152935]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/jobs" className="hover:text-[#152935]">Jobs</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-[#152935]">{CATEGORIES_MAP[slug]}</span>
        </nav>

        <div className="bg-[#FAF3EE] border border-[#CCD5D2] p-6 rounded-lg mb-6 shadow-xs">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152935] mb-2">{CATEGORIES_MAP[slug]}</h1>
          <p className="text-xs sm:text-sm text-[#5F6B72]">
            Browse 100% verified official notifications and updates under {CATEGORIES_MAP[slug]}.
          </p>
        </div>

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="p-8 border border-[#CCD5D2] rounded-lg bg-white text-center shadow-xs">
              <p className="text-sm font-bold text-[#152935]">No active recruitments currently published for this category.</p>
              <p className="text-xs text-gray-500 mt-1">Verified notifications will appear here as soon as released by the board.</p>
              <Link href="/" className="inline-block mt-4 bg-[#152935] text-white text-xs font-bold px-4 py-2 rounded hover:bg-[#698EA2] transition">
                Back to Homepage
              </Link>
            </div>
          ) : (
            jobs.map((job: any) => (
              <div key={job.id} className="p-4 border border-[#CCD5D2] rounded-lg bg-white shadow-xs hover:border-[#698EA2] transition">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-[#CCD5D2] text-[#152935] rounded uppercase">
                      {job.job_type || "CENTRAL"}
                    </span>
                    <h2 className="text-base font-bold text-[#152935] mt-1">
                      <Link href={`/jobs/${job.slug}`} className="hover:underline">{job.title}</Link>
                    </h2>
                    <p className="text-xs text-gray-600 mt-1">{job.organization?.name || "Government Authority"}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    {job.total_vacancies ? `${job.total_vacancies.toLocaleString()} Posts` : "Open"}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500 border-t pt-3">
                  <span>Last Date: <strong>{job.last_date ? new Date(job.last_date).toLocaleDateString() : "As per notice"}</strong></span>
                  <Link href={`/jobs/${job.slug}`} className="bg-[#152935] text-white px-3 py-1.5 rounded font-bold hover:bg-[#698EA2] transition">
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Handle Single Job Detail
  const job = (await getJobBySlug(slug)) as any;
  if (!job) {
    notFound();
  }

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || job.title,
    "datePosted": job.published_at || new Date().toISOString(),
    "validThrough": job.last_date || undefined,
    "employmentType": job.employment_type || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.organization?.name || "Government Commission",
      "sameAs": job.organization?.official_website || "https://gov.in",
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/jobs" className="hover:text-[#152935]">Government Jobs</Link>
        <ChevronRight className="w-3 h-3" />
        <span style={{ color: "#152935" }} className="font-semibold line-clamp-1">
          {job.short_title || job.title}
        </span>
      </nav>

      <div style={{ borderBottom: "1px solid #CCD5D2" }} className="pb-6">
        <div className="flex flex-wrap gap-2 items-center mb-2.5">
          <div style={{ backgroundColor: "#FDE5D6", border: "1px solid #E4A576", color: "#152935" }} className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#698EA2" }} />
            <span>100% Verified Official Recruitment</span>
          </div>
        </div>
        <h1 style={{ color: "#152935" }} className="text-2xl sm:text-3xl font-extrabold leading-tight">
          {job.title}
        </h1>
        <p style={{ color: "#5F6B72" }} className="text-xs sm:text-sm mt-2">
          Recruiting Authority: <strong style={{ color: "#152935" }}>{job.organization?.name || "Government Commission"}</strong>
        </p>
      </div>

      <div style={{ backgroundColor: "#FAF3EE", borderColor: "#CCD5D2" }} className="my-6 p-5 rounded-lg border shadow-xs">
        <h2 style={{ color: "#152935" }} className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#698EA2]" />
          Recruitment Lifecycle Status
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold bg-white p-2 rounded border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Notification Active</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-800 font-semibold bg-white p-2 rounded border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Applications Open</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-medium bg-white p-2 rounded border border-gray-200">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">3</span>
            <span>Admit Card Stage</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-medium bg-white p-2 rounded border border-gray-200">
            <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">4</span>
            <span>Results / Cutoff</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg overflow-hidden bg-white shadow-xs">
          <div style={{ backgroundColor: "#152935", color: "#FFFFFF" }} className="px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#E4A576]" />
            <span>Important Recruitment Dates</span>
          </div>
          <div className="divide-y text-xs sm:text-sm">
            <div className="flex justify-between p-3">
              <span className="text-gray-600">Notification Released</span>
              <strong className="text-[#152935]">{job.published_at ? new Date(job.published_at).toLocaleDateString() : "Available"}</strong>
            </div>
            <div className="flex justify-between p-3 bg-[#FAF3EE]/60">
              <span className="text-gray-600 font-semibold">Application Deadline</span>
              <strong className="text-red-700 font-bold">
                {job.last_date ? new Date(job.last_date).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Refer Notification"}
              </strong>
            </div>
          </div>
        </div>

        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg overflow-hidden bg-white shadow-xs">
          <div style={{ backgroundColor: "#698EA2", color: "#FFFFFF" }} className="px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#FDE5D6]" />
            <span>Application Fee Structure</span>
          </div>
          <div className="divide-y text-xs sm:text-sm">
            <div className="flex justify-between p-3">
              <span className="text-gray-600">General / OBC / EWS</span>
              <strong className="text-[#152935]">As per official rules</strong>
            </div>
            <div className="flex justify-between p-3 bg-[#FAF3EE]/60">
              <span className="text-gray-600">SC / ST / Female</span>
              <strong className="text-emerald-700">Exempted / Nil</strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg overflow-hidden my-6 bg-white shadow-xs">
        <div style={{ backgroundColor: "#152935", color: "#FFFFFF" }} className="px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#E4A576]" />
          <span>Post-Wise Vacancy Overview</span>
        </div>
        <div className="p-4 text-xs sm:text-sm flex justify-between items-center">
          <div>
            <strong>{job.title}</strong>
            <p className="text-gray-500 text-xs mt-0.5">{job.organization?.name || "Government Commission"}</p>
          </div>
          <span className="text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
            {job.total_vacancies ? `${job.total_vacancies.toLocaleString()} Posts` : "Openings Available"}
          </span>
        </div>
      </div>

      <div className="my-8">
        <h2 style={{ color: "#152935" }} className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-[#E4A576]" />
          Verified Official Portal Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {job.links && job.links.length > 0 ? (
            job.links.map((link: any) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderColor: "#CCD5D2", color: "#152935" }}
                className="flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-[#FAF3EE] font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <span>{link.title}</span>
                <ExternalLink className="w-4 h-4 text-[#698EA2]" />
              </a>
            ))
          ) : (
            <a
              href="https://ssc.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderColor: "#CCD5D2", color: "#152935" }}
              className="flex items-center justify-between p-4 rounded-lg border bg-white font-bold text-xs sm:text-sm shadow-xs"
            >
              <span>Official Government Portal</span>
              <ExternalLink className="w-4 h-4 text-[#698EA2]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
