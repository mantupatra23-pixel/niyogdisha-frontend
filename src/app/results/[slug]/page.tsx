import { notFound } from "next/navigation";
import Link from "next/link";
import { getResults } from "@/lib/api/services";
import { ChevronRight, ExternalLink, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Exam Result & Cut-off List | NiyogDisha`,
    description: `Check official merit lists, category-wise cut-off scores, and final results for recruitment exams.`,
    alternates: { canonical: `https://niyogdisha-frontend.onrender.com/results` },
  };
}

export default async function ResultDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = (await getResults()) as any;
  const items = Array.isArray(res) ? res : (res?.data || []);
  const resultItem = items.find((item: any) => item.slug === slug || item.id?.toString() === slug);

  if (!resultItem) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-900">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/results" className="hover:text-[#152935]">Results</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#152935] line-clamp-1">{resultItem.title}</span>
      </nav>

      <div className="bg-white border border-[#CCD5D2] p-6 rounded-lg shadow-xs mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded mb-2 bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Declared Merit List &amp; Result</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152935]">{resultItem.title}</h1>
      </div>

      {resultItem.cutoff_details && (
        <div className="border border-[#CCD5D2] rounded-lg p-5 bg-[#FAF3EE] mb-6 shadow-xs">
          <h2 className="text-sm font-bold text-[#152935] mb-2">Category-wise Cut-off Scores</h2>
          <p className="text-xs sm:text-sm text-gray-700 font-medium">{resultItem.cutoff_details}</p>
        </div>
      )}

      <div className="my-6">
        <a
          href={resultItem.result_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-lg bg-[#152935] text-white font-bold text-sm hover:bg-[#698EA2] transition shadow-md"
        >
          <span>Download Official Result PDF / Merit List</span>
          <ExternalLink className="w-5 h-5 text-[#E4A576]" />
        </a>
      </div>
    </div>
  );
}
