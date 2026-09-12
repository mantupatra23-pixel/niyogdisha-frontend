import { notFound } from "next/navigation";
import Link from "next/link";
import { getAnswerKeys } from "@/lib/api/services";
import { ChevronRight, ExternalLink, FileText } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Answer Key & Response Sheet | NiyogDisha`,
    description: `Check official provisional answer keys and response sheets for government examinations.`,
    alternates: { canonical: `https://niyogdisha-frontend.onrender.com/answer-key` },
  };
}

export default async function AnswerKeyDetailPage({ params }: Props) {
  const { slug } = await params;
  const res = await getAnswerKeys();
  const items = Array.isArray(res) ? res : (res?.data || []);
  const ansKey = items.find((item: any) => item.slug === slug || item.id?.toString() === slug);

  if (!ansKey) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/answer-key" className="hover:text-[#152935]">Answer Key</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#152935] line-clamp-1">{ansKey.title}</span>
      </nav>

      <div className="bg-white border border-[#CCD5D2] p-6 rounded-lg shadow-sm mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded mb-2 bg-[#FAF3EE] text-[#152935] border border-[#E4A576]">
          <FileText className="w-3.5 h-3.5 text-[#E4A576]" />
          <span>Official Answer Key Published</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152935]">{ansKey.title}</h1>
      </div>

      <div className="my-6">
        <a
          href={ansKey.answer_key_url || ansKey.download_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-lg bg-[#E4A576] text-[#152935] font-bold text-sm hover:opacity-90 transition shadow-md"
        >
          <span>Download Official Answer Key PDF</span>
          <ExternalLink className="w-5 h-5 text-[#152935]" />
        </a>
      </div>
    </div>
  );
}
