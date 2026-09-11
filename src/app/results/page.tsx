import { getResults } from "@/lib/api/services";
import { CheckCircle2, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Govt Exam Results & Cut-off Marks 2026",
  description: "Check verified exam results, merit lists, and official cutoff scores for central and state recruitments.",
};

export default async function ResultsPage() {
  const results = await getResults();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div style={{ borderBottom: "1px solid #CCD5D2" }} className="pb-5 mb-6">
        <div style={{ backgroundColor: "#FDE5D6", border: "1px solid #E4A576", color: "#152935" }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#698EA2" }} />
          <span>Verified Merit Lists</span>
        </div>
        <h1 style={{ color: "#152935" }} className="text-2xl sm:text-3xl font-extrabold">
          Declared Examination Results &amp; Cut-offs
        </h1>
        <p style={{ color: "#5F6B72" }} className="text-xs sm:text-sm mt-1">
          Direct official links to download declared candidate lists and cut-off marks.
        </p>
      </div>

      {results.length === 0 ? (
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg p-10 text-center text-sm text-gray-500">
          No results declared recently.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((item) => (
            <div
              key={item.id}
              style={{ borderColor: "#CCD5D2" }}
              className="border rounded-lg p-5 bg-white shadow-xs flex flex-col justify-between hover:border-[#698EA2] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    DECLARED RESULT
                  </span>
                  {item.declared_date && (
                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#698EA2]" />
                      Declared: {new Date(item.declared_date).toLocaleDateString("en-IN")}
                    </span>
                  )}
                </div>
                <h2 style={{ color: "#152935" }} className="text-sm sm:text-base font-bold leading-snug">
                  {item.title}
                </h2>
                {item.cutoff_details && (
                  <p style={{ backgroundColor: "#FDE5D6", borderColor: "#CCD5D2" }} className="mt-3 text-xs text-gray-800 p-2.5 rounded border leading-relaxed">
                    <strong>Cutoff Details:</strong> {item.cutoff_details}
                  </p>
                )}
              </div>

              <div style={{ borderTop: "1px solid #CCD5D2" }} className="mt-5 pt-4 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold">Official Result PDF</span>
                <a
                  href={item.result_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#152935", color: "#FFFFFF" }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded hover:bg-[#698EA2] transition-colors"
                >
                  <span>Download List</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
