import Link from "next/link";
import { getAnswerKeys } from "@/lib/api/services";
import { ChevronRight, FileText, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Exam Answer Keys & Response Sheets 2026 | NiyogDisha",
  description: "Download official provisional answer keys, response sheets, and objection tracker links for central and state government recruitment exams.",
  alternates: { canonical: "https://niyogdisha-frontend.onrender.com/answer-key" },
};

export default async function AnswerKeysPage() {
  let answerKeys: any[] = [];
  try {
    const res = (await getAnswerKeys()) as any;
    answerKeys = Array.isArray(res) ? res : (res?.data || []);
  } catch {}

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#152935]">Answer Keys</span>
      </nav>

      <div className="bg-[#FAF3EE] border border-[#CCD5D2] p-6 rounded-lg mb-6 shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#152935] mb-2 flex items-center gap-2">
          <FileText className="w-6 h-6 text-[#E4A576]" />
          Official Answer Keys &amp; Response Sheets
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6B72]">
          Access provisional answer keys, question papers, and raise objections for recent government recruitment examinations.
        </p>
      </div>

      <div className="space-y-3">
        {answerKeys.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center bg-white border border-[#CCD5D2] rounded-lg">No answer keys currently available.</p>
        ) : (
          answerKeys.map((ak: any) => (
            <div key={ak.id} className="p-4 bg-white border border-[#CCD5D2] rounded-lg shadow-xs hover:border-[#152935] transition flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">Provisional Key</span>
                <h2 className="text-sm sm:text-base font-bold text-[#152935] mt-1">{ak.title}</h2>
                <p className="text-xs text-gray-500 mt-0.5">Published directly from official commission portals</p>
              </div>
              <a
                href={ak.answer_key_url || ak.download_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#152935] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#698EA2] transition flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Download PDF</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E4A576]" />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
