import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#152935", borderTop: "3px solid #E4A576" }} className="w-full text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Top 3-Column Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span style={{ backgroundColor: "#698EA2", color: "#FFFFFF" }} className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm">
                ND
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                NiyogDisha
              </span>
            </div>
            <p style={{ color: "#CCD5D2" }} className="text-xs sm:text-sm leading-relaxed max-w-md">
              Timely, verified information on Central and State government recruitments, 
              admit cards, answer keys, results, and exam lifecycle events directly mapped from official portals.
            </p>
          </div>

          <div>
            <h4 style={{ color: "#E4A576" }} className="text-xs font-bold uppercase tracking-wider mb-3">
              Recruitment Links
            </h4>
            <ul style={{ color: "#CCD5D2" }} className="space-y-2 text-xs">
              <li>
                <Link href="/jobs" className="hover:text-white hover:underline">
                  Latest Notifications
                </Link>
              </li>
              <li>
                <Link href="/admit-card" className="hover:text-white hover:underline">
                  Exam Hall Tickets
                </Link>
              </li>
              <li>
                <Link href="/answer-key" className="hover:text-white hover:underline">
                  Official Answer Keys
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-white hover:underline">
                  Final Results &amp; Cutoffs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: "#E4A576" }} className="text-xs font-bold uppercase tracking-wider mb-3">
              Top Categories
            </h4>
            <ul style={{ color: "#CCD5D2" }} className="space-y-2 text-xs">
              <li>
                <Link href="/jobs?category=ssc" className="hover:text-white hover:underline">
                  SSC Recruitment
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=upsc" className="hover:text-white hover:underline">
                  UPSC Civil Services
                </Link>
              </li>
              <li>
                <Link href="/jobs?type=CENTRAL" className="hover:text-white hover:underline">
                  Central Government
                </Link>
              </li>
              <li>
                <Link href="/jobs?type=STATE" className="hover:text-white hover:underline">
                  State PSC Exams
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Non-Affiliation Disclaimer Box */}
        <div style={{ backgroundColor: "#1C3645", border: "1px solid #698EA2" }} className="rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#E4A576" }} />
            <div style={{ color: "#FDE5D6" }} className="text-xs leading-relaxed">
              <strong style={{ color: "#FFFFFF" }}>Official Disclaimer: </strong>
              NiyogDisha is an independent government recruitment information portal and is NOT affiliated with, 
              endorsed by, or connected to any government ministry, department, commission, or examination body. 
              All recruitment information, dates, and links are gathered strictly for informational purposes. 
              Candidates must verify all details on the respective official government websites before applying.
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div style={{ borderTop: "1px solid #234050", color: "#CCD5D2" }} className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px]">
          <p>© 2026 NiyogDisha. All rights reserved.</p>
          <p className="mt-1 sm:mt-0">High-Performance Clean Information Portal</p>
        </div>

      </div>
    </footer>
  );
}
