import Link from "next/link";
import { getAnswerKeys } from "@/lib/api/services";
import { ChevronRight, ExternalLink, FileText } from "lucide-react";

export default async function AnswerKeysPage() {
  let answerKeys: any[] = [];
  try {
    const res = (await getAnswerKeys()) as any;
    answerKeys = Array.isArray(res) ? res : (res?.data || []);
  } catch {}

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-gray-900">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#152935]">Answer Keys</span>
      </nav>

      <div className="bg-[#FAF3EE] border border-[#CCD5D2] p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-extrabold text-[#152935] mb-2">Government Exam Answer Keys</h1>
        <p className="text-xs sm:text-sm text-[#5F6B72]">
          Download official provisional answer keys and response sheets for competitive exams.
        </p>
      </div>

      <div className="space-y-3">
        {answerKeys.length === 0 ? (
          <p className="text-sm text-gray-500 py-6 text-center">No answer keys available at the moment.</p>
        ) : (
          answerKeys.map((ak: any) => (
            <div key={ak.id} className="p-4 border border-[#CCD5D2] rounded-lg bg-white flex justify-between items-center shadow-xs">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">Provisional Key</span>
                <h2 className="text-sm sm:text-base font-bold text-[#152935] mt-1">{ak.title}</h2>
              </div>
              <a
                href={ak.answer_key_url || ak.download_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#152935] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#698EA2] transition flex items-center gap-1"
              >
                <span>Download PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
