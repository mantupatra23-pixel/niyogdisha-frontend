import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobBySlug } from "@/lib/api/services";
import { ShieldCheck, Calendar, Users, ExternalLink, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Job Notification | NiyogDisha" };
  return {
    title: job.seo_title || `${job.title} — Notification, Apply Online & Dates`,
    description: job.seo_description || `${job.title}: Check vacancies, eligibility, qualification, age limit and official apply links.`,
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-brand-muted mb-4">
        <Link href="/" className="hover:text-brand-navy">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/jobs" className="hover:text-brand-navy">Jobs</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-navy font-medium line-clamp-1">{job.short_title || job.title}</span>
      </nav>

      {/* Main Header */}
      <div className="border-b border-brand-border pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded bg-brand-peach text-brand-navy mb-2 border border-brand-orange/30">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" />
          <span>Verified Official Recruitment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-tight">
          {job.title}
        </h1>
        <p className="text-sm text-brand-muted mt-2">
          Organization: <strong className="text-brand-navy">{job.organization?.name || "Official Commission"}</strong>
        </p>
      </div>

      {/* Differentiator: Exam Lifecycle Tracker */}
      <div className="my-8 p-5 rounded-lg border border-brand-border bg-gradient-to-r from-brand-peach/30 to-white">
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-blue" />
          Recruitment Lifecycle Progress
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 text-green-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Notification Released</span>
          </div>
          <div className="flex items-center gap-2 text-green-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Application Active</span>
          </div>
          <div className="flex items-center gap-2 text-brand-muted font-medium">
            <span className="w-4 h-4 rounded-full border border-brand-border flex items-center justify-center text-[10px]">3</span>
            <span>Admit Card Awaited</span>
          </div>
          <div className="flex items-center gap-2 text-brand-muted font-medium">
            <span className="w-4 h-4 rounded-full border border-brand-border flex items-center justify-center text-[10px]">4</span>
            <span>Result &amp; Cutoff</span>
          </div>
        </div>
      </div>

      {/* Key Quick Info Table */}
      <div className="border border-brand-border rounded-lg overflow-hidden my-6">
        <div className="bg-brand-navy text-white px-4 py-2.5 text-sm font-bold">
          Quick Recruitment Overview
        </div>
        <div className="divide-y divide-brand-border text-sm">
          <div className="grid grid-cols-3 p-3">
            <span className="font-semibold text-brand-muted">Total Vacancies</span>
            <span className="col-span-2 font-bold text-brand-navy">{job.total_vacancies?.toLocaleString() || "Not announced"}</span>
          </div>
          <div className="grid grid-cols-3 p-3 bg-brand-peach/10">
            <span className="font-semibold text-brand-muted">Application Deadline</span>
            <span className="col-span-2 font-bold text-brand-navy">
              {job.last_date ? new Date(job.last_date).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Not announced"}
            </span>
          </div>
          <div className="grid grid-cols-3 p-3">
            <span className="font-semibold text-brand-muted">Mode of Application</span>
            <span className="col-span-2 font-medium text-brand-navy">{job.application_mode || "Online"}</span>
          </div>
          <div className="grid grid-cols-3 p-3 bg-brand-peach/10">
            <span className="font-semibold text-brand-muted">Employment Type</span>
            <span className="col-span-2 font-medium text-brand-navy">{job.employment_type || "Permanent"}</span>
          </div>
        </div>
      </div>

      {/* Official Links */}
      <div className="my-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">Important Official Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {job.links && job.links.length > 0 ? (
            job.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded border border-brand-border hover:border-brand-navy bg-white hover:bg-brand-peach/20 transition-all font-semibold text-sm text-brand-navy"
              >
                <span>{link.title}</span>
                <ExternalLink className="w-4 h-4 text-brand-blue" />
              </a>
            ))
          ) : (
            <a
              href="https://ssc.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded border border-brand-border bg-white font-semibold text-sm text-brand-navy"
            >
              <span>Official Recruitment Portal</span>
              <ExternalLink className="w-4 h-4 text-brand-blue" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
