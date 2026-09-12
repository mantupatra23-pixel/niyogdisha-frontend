import { notFound } from "next/navigation";
import Link from "next/link";
import { getAdmitCards } from "@/lib/api/services";
import { ChevronRight, ExternalLink, Award } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Admit Card — Exam Hall Ticket | NiyogDisha`,
    description: `Download verified exam admit cards and hall tickets for government recruitment examinations on NiyogDisha.`,
    alternates: { canonical: `https://niyogdisha-frontend.onrender.com/admit-card/${slug}` },
  };
}

export default async function AdmitCardDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = (await getAdmitCards()) as any;
  const items = Array.isArray(res) ? res : (res?.data || []);
  const admitCard = items.find((item: any) => item.slug === slug || item.id?.toString() === slug);

  if (!admitCard) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/admit-card" className="hover:text-[#152935]">Admit Card</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#152935] line-clamp-1">{admitCard.title}</span>
      </nav>

      <div className="bg-white border border-[#CCD5D2] p-6 rounded-lg shadow-sm mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded mb-2 bg-[#FAF3EE] text-[#152935] border border-[#E4A576]">
          <Award className="w-3.5 h-3.5 text-[#698EA2]" />
          <span>Official Hall Ticket Released</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152935]">{admitCard.title}</h1>
        <p className="text-xs sm:text-sm text-[#5F6B72] mt-2">
          Exam / Organization: <strong className="text-[#152935]">{admitCard.organization || "Government Commission"}</strong>
        </p>
      </div>

      <div className="border border-[#CCD5D2] rounded-lg overflow-hidden bg-white mb-6">
        <div className="bg-[#698EA2] text-white px-4 py-2.5 text-xs sm:text-sm font-bold">
          Admit Card Summary
        </div>
        <div className="divide-y text-xs sm:text-sm">
          <div className="grid grid-cols-3 p-3">
            <span className="font-semibold text-gray-500">Release Date</span>
            <span className="col-span-2 font-bold text-[#152935]">
              {admitCard.release_date ? new Date(admitCard.release_date).toLocaleDateString("en-IN", { dateStyle: "long" }) : "Available"}
            </span>
          </div>
          <div className="grid grid-cols-3 p-3 bg-[#FAF3EE]">
            <span className="font-semibold text-gray-500">Status</span>
            <span className="col-span-2 font-bold text-emerald-800">Active / Downloadable</span>
          </div>
        </div>
      </div>

      <div className="my-6">
        <a
          href={admitCard.download_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-lg bg-[#152935] text-white font-bold text-sm hover:bg-[#698EA2] transition shadow-md"
        >
          <span>Download Hall Ticket / Admit Card Portal</span>
          <ExternalLink className="w-5 h-5 text-[#E4A576]" />
        </a>
      </div>
    </div>
  );
}
