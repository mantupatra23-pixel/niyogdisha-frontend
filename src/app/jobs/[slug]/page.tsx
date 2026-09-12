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
  "defence": "Defence / Police Jobs",
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
    description: `${job.title}: Check post-wise vacancies (${job.total_vacancies ? `${job.total_vacancies.toLocaleString()} Posts` : 'Latest'}), eligibility criteria, age relaxation, application fee, important dates, and official links.`,
    alternates: {
      canonical: `https://niyogdisha-frontend.onrender.com/jobs/${job.slug}`,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;

  // 1. Handle Category Landing Pages
  if (CATEGORIES_MAP[slug]) {
    let jobs: any[] = [];
    try {
      const res = (await getJobs()) as any;
      jobs = Array.isArray(res) ? res : (res?.data || []);
    } catch (e) {}

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#152935]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/jobs" className="hover:text-[#152935]">Jobs</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-[#152935]">{CATEGORIES_MAP[slug]}</span>
        </nav>

        <div className="bg-[#FAF3EE] border border-[#CCD5D2] p-6 rounded-lg mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152935] mb-2">{CATEGORIES_MAP[slug]}</h1>
          <p className="text-xs sm:text-sm text-[#5F6B72]">
            Browse 100% verified official notifications, exam schedules, and recruitment updates under {CATEGORIES_MAP[slug]}.
          </p>
        </div>

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-sm text-gray-500 py-6 text-center">No active listings available in this category.</p>
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
                  <span>Last Date: <strong>{job.last_date ? new Date(job.last_date).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "As per notice"}</strong></span>
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

  // 2. Fetch Single Job Detail
  const job = (await getJobBySlug(slug)) as any;
  if (!job) {
    notFound();
  }

  // Structured Data (JobPosting + FAQPage Schema for Google Rich Snippets)
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the application deadline for ${job.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": job.last_date 
            ? `The last date to submit the online application form is ${new Date(job.last_date).toLocaleDateString("en-IN", { dateStyle: "long" })}.`
            : "Please refer to the official notification for exact closing dates."
        }
      },
      {
        "@type": "Question",
        "name": `How many vacancies are released for ${job.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": job.total_vacancies 
            ? `A total of ${job.total_vacancies.toLocaleString()} vacancies have been notified by ${job.organization?.name || "the commission"}.`
            : "The post-wise vacancy count will be updated as per the official notification."
        }
      },
      {
        "@type": "Question",
        "name": `How can candidates apply for ${job.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Candidates can apply online through the official portal link provided on NiyogDisha under verified links before the closing date.`
        }
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Google Structured Data Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/jobs" className="hover:text-[#152935]">Government Jobs</Link>
        <ChevronRight className="w-3 h-3" />
        <span style={{ color: "#152935" }} className="font-semibold line-clamp-1">
          {job.short_title || job.title}
        </span>
      </nav>

      {/* Header Title Card */}
      <div style={{ borderBottom: "1px solid #CCD5D2" }} className="pb-6">
        <div className="flex flex-wrap gap-2 items-center mb-2.5">
          <div style={{ backgroundColor: "#FDE5D6", border: "1px solid #E4A576", color: "#152935" }} className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#698EA2" }} />
            <span>100% Verified Official Recruitment</span>
          </div>
          <span className="bg-blue-100 text-blue-900 text-xs font-bold px-2 py-0.5 rounded">
            Advt No: {job.advertisement_number || "Official Notice"}
          </span>
        </div>
        <h1 style={{ color: "#152935" }} className="text-2xl sm:text-3xl font-extrabold leading-tight">
          {job.title}
        </h1>
        <p style={{ color: "#5F6B72" }} className="text-xs sm:text-sm mt-2">
          Recruiting Authority: <strong style={{ color: "#152935" }}>{job.organization?.name || "Government Commission"}</strong>
        </p>
      </div>

      {/* Exam Lifecycle Visual Bar */}
      <div style={{ backgroundColor: "#FAF3EE", borderColor: "#CCD5D2" }} className="my-6 p-5 rounded-lg border">
        <h2 style={{ color: "#152935" }} className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: "#698EA2" }} />
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

      {/* Grid: Important Dates & Application Fee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        
        {/* Section 1: Important Dates */}
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg overflow-hidden bg-white shadow-xs">
          <div style={{ backgroundColor: "#152935", color: "#FFFFFF" }} className="px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#E4A576]" />
            <span>Important Recruitment Dates</span>
          </div>
          <div className="divide-y text-xs sm:text-sm">
            <div className="flex justify-between p-3">
              <span className="text-gray-600">Notification Released</span>
              <strong className="text-[#152935]">{job.published_at ? new Date(job.published_at).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "Available"}</strong>
            </div>
            <div className="flex justify-between p-3 bg-[#FAF3EE]/60">
              <span className="text-gray-600">Apply Online Begins</span>
              <strong className="text-[#152935]">Already Started</strong>
            </div>
            <div className="flex justify-between p-3">
              <span className="text-gray-600 font-semibold">Application Deadline</span>
              <strong className="text-red-700 font-bold">
                {job.last_date ? new Date(job.last_date).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Refer Notification"}
              </strong>
            </div>
            <div className="flex justify-between p-3 bg-[#FAF3EE]/60">
              <span className="text-gray-600">Exam Date / Hall Ticket</span>
              <strong className="text-[#698EA2]">To be announced</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Application Fee Details */}
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg overflow-hidden bg-white shadow-xs">
          <div style={{ backgroundColor: "#698EA2", color: "#FFFFFF" }} className="px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-[#FDE5D6]" />
            <span>Application Fee Structure</span>
          </div>
          <div className="divide-y text-xs sm:text-sm">
            <div className="flex justify-between p-3">
              <span className="text-gray-600">General / OBC / EWS</span>
              <strong className="text-[#152935]">₹100/- (As per standard rules)</strong>
            </div>
            <div className="flex justify-between p-3 bg-[#FAF3EE]/60">
              <span className="text-gray-600">SC / ST / PwD</span>
              <strong className="text-emerald-700">₹0/- (Exempted)</strong>
            </div>
            <div className="flex justify-between p-3">
              <span className="text-gray-600">All Category Female</span>
              <strong className="text-emerald-700">₹0/- (Exempted)</strong>
            </div>
            <div className="flex justify-between p-3 bg-[#FAF3EE]/60">
              <span className="text-gray-600">Payment Mode</span>
              <strong className="text-[#152935]">Net Banking, Debit/Credit Card, UPI</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Eligibility & Age Limit Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        
        {/* Eligibility Criteria */}
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg overflow-hidden bg-white shadow-xs">
          <div style={{ backgroundColor: "#152935", color: "#FFFFFF" }} className="px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#E4A576]" />
            <span>Educational Qualification</span>
          </div>
          <div className="p-4 text-xs sm:text-sm space-y-2 text-gray-700">
            <p>
              Candidates applying for <strong>{job.title}</strong> must possess a Bachelor&apos;s Degree from a recognized University or equivalent qualification as on the crucial cut-off date.
            </p>
            <div className="p-2.5 bg-[#FAF3EE] rounded border border-[#CCD5D2] text-xs">
              <strong>Note:</strong> Final year students may also be eligible subject to acquiring the qualification before the documentary verification cut-off.
            </div>
          </div>
        </div>

        {/* Age Limit & Relaxation */}
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg overflow-hidden bg-white shadow-xs">
          <div style={{ backgroundColor: "#152935", color: "#FFFFFF" }} className="px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#E4A576]" />
            <span>Age Limit &amp; Relaxation Criteria</span>
          </div>
          <div className="p-4 text-xs sm:text-sm space-y-2 text-gray-700">
            <ul className="space-y-1.5 list-disc list-inside">
              <li><strong>Minimum Age:</strong> 18 Years</li>
              <li><strong>Maximum Age:</strong> 27 to 32 Years (Post-specific)</li>
              <li><strong>OBC Candidates:</strong> 03 Years Relaxation</li>
              <li><strong>SC / ST Candidates:</strong> 05 Years Relaxation</li>
              <li><strong>PwD Candidates:</strong> 10 to 15 Years Relaxation</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Vacancy Breakdown Table */}
      <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg overflow-hidden my-6 bg-white shadow-xs">
        <div style={{ backgroundColor: "#152935", color: "#FFFFFF" }} className="px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-[#E4A576]" />
          <span>Post-Wise Vacancy Overview</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF3EE] text-[#152935] font-bold border-b border-[#CCD5D2]">
              <tr>
                <th className="p-3">Recruitment Post Name</th>
                <th className="p-3">Department / Ministry</th>
                <th className="p-3">Total Notified Posts</th>
                <th className="p-3">Qualification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              <tr>
                <td className="p-3 font-semibold text-[#152935]">{job.title}</td>
                <td className="p-3">{job.organization?.name || "Central Government"}</td>
                <td className="p-3 font-bold text-emerald-800">{job.total_vacancies ? `${job.total_vacancies.toLocaleString()} Posts` : "Check Notice"}</td>
                <td className="p-3">Bachelor&apos;s Degree</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Step-by-Step How to Apply */}
      <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg p-5 bg-white shadow-xs my-6">
        <h2 className="text-sm sm:text-base font-bold text-[#152935] mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#698EA2]" />
          How to Apply Online for {job.title}
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <li>Visit the verified official commission portal link given below.</li>
          <li>Complete One Time Registration (OTR) if you are a new applicant.</li>
          <li>Log in with your Registration ID and Password.</li>
          <li>Fill out academic details, post preferences, and examination centre choices carefully.</li>
          <li>Upload scanned copy of recent photograph, signature, and required category certificates.</li>
          <li>Pay the applicable application fee via online payment gateway (exempted for reserved categories).</li>
          <li>Submit the application form and take a printout of the final confirmation receipt for future reference.</li>
        </ol>
      </div>

      {/* Official Working Links Section */}
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
              <span>Official Government Notification Portal</span>
              <ExternalLink className="w-4 h-4 text-[#698EA2]" />
            </a>
          )}
        </div>
      </div>

      {/* FAQs Section (High Traffic & Google Snippets Magnet) */}
      <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg p-5 bg-[#FAF3EE]/40 my-6">
        <h2 className="text-sm sm:text-base font-bold text-[#152935] mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#698EA2]" />
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3 bg-white rounded border border-[#CCD5D2]">
            <h3 className="font-bold text-[#152935]">What is the last date to apply for {job.title}?</h3>
            <p className="text-gray-600 mt-1">
              The online application deadline is <strong>{job.last_date ? new Date(job.last_date).toLocaleDateString("en-IN", { dateStyle: "long" }) : "as per official schedule"}</strong>.
            </p>
          </div>
          <div className="p-3 bg-white rounded border border-[#CCD5D2]">
            <h3 className="font-bold text-[#152935]">What is the total number of vacancies?</h3>
            <p className="text-gray-600 mt-1">
              There are a total of <strong>{job.total_vacancies ? `${job.total_vacancies.toLocaleString()} vacancies` : "open posts"}</strong> announced.
            </p>
          </div>
          <div className="p-3 bg-white rounded border border-[#CCD5D2]">
            <h3 className="font-bold text-[#152935]">What is the minimum qualification required?</h3>
            <p className="text-gray-600 mt-1">
              A Bachelor&apos;s degree from any recognized university in India is mandatory.
            </p>
          </div>
        </div>
      </div>

      {/* Trust & Official Disclaimer */}
      <div className="bg-[#FAF3EE] border border-[#CCD5D2] p-4 rounded-lg text-xs text-[#5F6B72] mt-8">
        <p>
          <strong className="text-[#152935]">Disclaimer:</strong> NiyogDisha is an independent recruitment information service. All examination data, notification dates, and links are gathered directly from verified government bodies. Candidates are advised to cross-verify all details on the respective official commission portal before applying.
        </p>
      </div>

    </div>
  );
}
