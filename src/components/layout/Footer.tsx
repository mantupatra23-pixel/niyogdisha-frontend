import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white border-t border-brand-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-brand-blue flex items-center justify-center font-bold text-white text-sm">
                ND
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                NiyogDisha
              </span>
            </div>
            <p className="text-sm text-brand-gray/90 max-w-md leading-relaxed">
              Timely, verified information on Central and State government recruitments, 
              admit cards, answer keys, results, and exam lifecycle events directly mapped from official portals.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-peach uppercase tracking-wider mb-3">
              Recruitment Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-brand-gray/80">
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Latest Notifications
                </Link>
              </li>
              <li>
                <Link href="/admit-card" className="hover:text-white transition-colors">
                  Exam Hall Tickets
                </Link>
              </li>
              <li>
                <Link href="/answer-key" className="hover:text-white transition-colors">
                  Official Answer Keys
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-white transition-colors">
                  Final Results & Cutoffs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-brand-peach uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-brand-gray/80">
              <li>
                <Link href="/jobs?category=ssc" className="hover:text-white transition-colors">
                  SSC Recruitment
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=upsc" className="hover:text-white transition-colors">
                  UPSC Civil Services
                </Link>
              </li>
              <li>
                <Link href="/jobs?type=CENTRAL" className="hover:text-white transition-colors">
                  Central Government
                </Link>
              </li>
              <li>
                <Link href="/jobs?type=STATE" className="hover:text-white transition-colors">
                  State PSCs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Non-Affiliation Disclaimer */}
        <div className="bg-white/5 border border-brand-gray/20 rounded p-4 mb-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <div className="text-xs text-brand-gray/90 leading-relaxed">
              <strong className="text-white">Official Disclaimer: </strong>
              NiyogDisha is an independent government recruitment information portal and is NOT affiliated with, 
              endorsed by, or connected to any government ministry, department, commission, or examination body. 
              All recruitment information, dates, and links are gathered strictly for informational purposes. 
              Candidates must verify all details on the respective official government websites before applying.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-brand-gray/20 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-gray/70">
          <p>© {new Date().getFullYear()} NiyogDisha. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">High-Performance Clean Information Portal</p>
        </div>
      </div>
    </footer>
  );
}
