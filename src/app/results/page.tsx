import Link from "next/link";
import { getResults } from "@/lib/api/services";
import { ChevronRight, CheckCircle2, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Exam Results & Cut-off Marks 2026 | NiyogDisha",
  description: "Check official declared results, merit lists, and category-wise cut-off scores for central and state government recruitment exams.",
  alternates: { canonical: "https://niyogdisha-frontend.onrender.com/results" },
};

export default async function ResultsPage() {
  let results: any[] = [];
  try {
    const res = (await getResults()) as any;
    results = Array.isArray(res) ? res : (res?.data || []);
  } catch {}

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#152935]">Results &amp; Cut-off</span>
      </nav>

      <div className="bg-[#FAF3EE] border border-[#CCD5D2] p-6 rounded-lg mb-6 shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#152935] mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          Exam Results &amp; Merit Lists
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6B72]">
          Check official merit lists, scorecard download links, and category-wise cut-off marks.
        </p>
      </div>

      <div className="space-y-3">
        {results.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center bg-white border border-[#CCD5D2] rounded-lg">No results declared yet.</p>
        ) : (
          results.map((res: any) => (
            <div key={res.id} className="p-4 bg-white border border-[#CCD5D2] rounded-lg shadow-xs hover:border-[#152935] transition flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">Declared Result</span>
                <h2 className="text-sm sm:text-base font-bold text-[#152935] mt-1">{res.title}</h2>
                {res.cutoff_details && (
                  <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-1.5 rounded border border-gray-200">
                    <strong>Cutoff:</strong> {res.cutoff_details}
                  </p>
                )}
              </div>
              <a
                href={res.result_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E4A576] text-[#152935] px-4 py-2 rounded text-xs font-bold hover:opacity-90 transition flex items-center gap-1.5 flex-shrink-0"
              >
                <span>View Merit List</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
