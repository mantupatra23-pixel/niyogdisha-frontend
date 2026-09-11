"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ShieldCheck } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ borderBottom: "1px solid #CCD5D2" }} className="sticky top-0 z-50 bg-white shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div style={{ backgroundColor: "#152935", color: "#FDE5D6" }} className="w-9 h-9 rounded flex items-center justify-center font-extrabold text-base shadow-xs">
              ND
            </div>
            <div className="flex flex-col">
              <span style={{ color: "#152935" }} className="text-xl font-bold tracking-tight">
                NiyogDisha
              </span>
              <span style={{ color: "#698EA2" }} className="text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Govt Job Updates
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { name: "Home", href: "/" },
              { name: "Government Jobs", href: "/jobs" },
              { name: "Admit Card", href: "/admit-card" },
              { name: "Answer Key", href: "/answer-key" },
              { name: "Results", href: "/results" },
            ].map((nav) => (
              <Link
                key={nav.name}
                href={nav.href}
                style={{ color: "#152935" }}
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold hover:text-[#698EA2] rounded transition-colors"
              >
                {nav.name}
              </Link>
            ))}
          </nav>

          {/* Search Action */}
          <div className="hidden md:flex items-center">
            <Link
              href="/jobs"
              style={{ backgroundColor: "#FDE5D6", color: "#152935", borderColor: "#E4A576" }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded border hover:bg-[#E4A576] transition-colors"
            >
              <Search className="w-3.5 h-3.5" style={{ color: "#152935" }} />
              <span>Search Portal</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="p-1.5 text-[#152935] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ borderTop: "1px solid #CCD5D2", backgroundColor: "#FAF3EE" }} className="md:hidden px-4 py-3 space-y-1">
          {[
            { name: "Home", href: "/" },
            { name: "Government Jobs", href: "/jobs" },
            { name: "Admit Card", href: "/admit-card" },
            { name: "Answer Key", href: "/answer-key" },
            { name: "Results", href: "/results" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#152935" }}
              className="block px-3 py-2 text-sm font-semibold rounded hover:bg-[#FDE5D6]"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
