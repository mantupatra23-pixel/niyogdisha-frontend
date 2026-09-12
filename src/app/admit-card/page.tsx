import Link from "next/link";
import { getAdmitCards } from "@/lib/api/services";
import { ChevronRight, Award, ExternalLink, Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Exam Admit Cards & Hall Tickets 2026 | NiyogDisha",
  description: "Download hall tickets, exam city intimation slips, and call letters for central and state government recruitment exams.",
  alternates: { canonical: "https://niyogdisha-frontend.onrender.com/admit-card" },
};

export default async function AdmitCardsPage() {
  let admitCards: any[] = [];
  try {
    const res = (await getAdmitCards()) as any;
    admitCards = Array.isArray(res) ? res : (res?.data || []);
  } catch {}

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#152935]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-semibold text-[#152935]">Admit Cards</span>
      </nav>

      <div className="bg-[#FAF3EE] border border-[#CCD5D2] p-6 rounded-lg mb-6 shadow-xs">
        <h1 className="text-2xl font-extrabold text-[#152935] mb-2 flex items-center gap-2">
          <Award className="w-6 h-6 text-[#698EA2]" />
          Exam Admit Cards &amp; Hall Tickets
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6B72]">
          Download verified hall tickets and check exam center city intimation slips for active recruitment exams.
        </p>
      </div>

      <div className="space-y-3">
        {admitCards.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center bg-white border border-[#CCD5D2] rounded-lg">No active admit cards available.</p>
        ) : (
          admitCards.map((item: any) => (
            <div key={item.id} className="p-4 bg-white border border-[#CCD5D2] rounded-lg shadow-xs hover:border-[#152935] transition flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded uppercase">Hall Ticket</span>
                <h2 className="text-sm sm:text-base font-bold text-[#152935] mt-1">{item.title}</h2>
                {item.release_date && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#698EA2]" />
                    <span>Released: {new Date(item.release_date).toLocaleDateString("en-IN")}</span>
                  </p>
                )}
              </div>
              <a
                href={item.download_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#698EA2] text-white px-4 py-2 rounded text-xs font-bold hover:bg-[#152935] transition flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Download</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
