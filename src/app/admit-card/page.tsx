import Link from "next/link";
import { getAdmitCards } from "@/lib/api/services";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admit Cards & Exam Hall Tickets 2026",
  description: "Download verified Admit Cards, Call Letters, and Exam Hall Tickets for Central & State recruitments.",
};

export default async function AdmitCardPage() {
  const cards = await getAdmitCards();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div style={{ borderBottom: "1px solid #CCD5D2" }} className="pb-5 mb-6">
        <div style={{ backgroundColor: "#FDE5D6", border: "1px solid #E4A576", color: "#152935" }} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#698EA2" }} />
          <span>Official Hall Tickets</span>
        </div>
        <h1 style={{ color: "#152935" }} className="text-2xl sm:text-3xl font-extrabold">
          Govt Exam Admit Cards &amp; Hall Tickets
        </h1>
        <p style={{ color: "#5F6B72" }} className="text-xs sm:text-sm mt-1">
          Direct verified links to download examination call letters and admit cards.
        </p>
      </div>

      {cards.length === 0 ? (
        <div style={{ borderColor: "#CCD5D2" }} className="border rounded-lg p-10 text-center text-sm text-gray-500">
          No admit cards currently active for download.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((item) => (
            <div
              key={item.id}
              style={{ borderColor: "#CCD5D2" }}
              className="border rounded-lg p-5 bg-white shadow-xs flex flex-col justify-between hover:border-[#698EA2] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ backgroundColor: "#CCD5D2", color: "#152935" }} className="text-[11px] font-bold px-2 py-0.5 rounded">
                    HALL TICKET
                  </span>
                  {item.release_date && (
                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#698EA2]" />
                      Release: {new Date(item.release_date).toLocaleDateString("en-IN")}
                    </span>
                  )}
                </div>
                <h2 style={{ color: "#152935" }} className="text-sm sm:text-base font-bold leading-snug">
                  {item.title}
                </h2>
              </div>

              <div style={{ borderTop: "1px solid #CCD5D2" }} className="mt-5 pt-4 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold">Official Source</span>
                <a
                  href={item.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#152935", color: "#FFFFFF" }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded hover:bg-[#698EA2] transition-colors"
                >
                  <span>Download</span>
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
