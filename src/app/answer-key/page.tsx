import { getAnswerKeys } from "@/lib/api/services";
import { FileCheck, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Answer Keys & Response Sheets 2026",
  description: "Download verified official answer keys, question papers, and objection submission deadlines.",
};

export default async function AnswerKeyPage() {
  const keys = await getAnswerKeys();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div style={{ borderBottom: "1px solid #CCD5D2" }} className="pb-5 mb-6">
        <div style={{ backgroundColor: "#FDE5D6", border: "1px solid #E4A576", color: "#152935" }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#698EA2" }} />
          <span>Official Keys &amp; Objections</span>
        </div>
        <h1 style={{ color: "#152935" }} className="text-2xl sm:text-3xl font-extrabold">
          Official Exam Answer Keys &amp; Response Sheets
        </h1>
        <p style={{ color: "#5F6B72" }} className="text-xs sm:text-sm mt-1">
          Check provisional answer keys, question sheets, and challenge windows.
        </p>
      </div>

      {keys.length === 0 ? (
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg p-10 text-center text-sm text-gray-500">
          No answer keys released recently.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keys.map((item) => (
            <div
              key={item.id}
              style={{ borderColor: "#CCD5D2" }}
              className="border rounded-lg p-5 bg-white shadow-xs flex flex-col justify-between hover:border-[#698EA2] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ backgroundColor: "#CCD5D2", color: "#152935" }} className="text-[11px] font-bold px-2 py-0.5 rounded">
                    ANSWER KEY
                  </span>
                  {item.release_date && (
                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#698EA2]" />
                      {new Date(item.release_date).toLocaleDateString("en-IN")}
                    </span>
                  )}
                </div>
                <h2 style={{ color: "#152935" }} className="text-sm sm:text-base font-bold leading-snug">
                  {item.title}
                </h2>
                {item.objection_last_date && (
                  <p className="text-xs text-amber-800 font-semibold mt-2">
                    Objection Last Date: {new Date(item.objection_last_date).toLocaleDateString("en-IN")}
                  </p>
                )}
              </div>

              <div style={{ borderTop: "1px solid #CCD5D2" }} className="mt-5 pt-4 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold">Official Key PDF</span>
                <a
                  href={item.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#152935", color: "#FFFFFF" }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded hover:bg-[#698EA2] transition-colors"
                >
                  <span>View Key</span>
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
