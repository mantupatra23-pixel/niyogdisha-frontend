"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ShieldCheck } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded bg-brand-navy flex items-center justify-center text-brand-peach font-bold text-lg shadow-sm">
              ND
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
                NiyogDisha
              </span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-brand-blue" />
                Govt Job Updates
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-blue rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className="px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-blue rounded-md transition-colors"
            >
              Government Jobs
            </Link>
            <Link
              href="/admit-card"
              className="px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-blue rounded-md transition-colors"
            >
              Admit Card
            </Link>
            <Link
              href="/answer-key"
              className="px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-blue rounded-md transition-colors"
            >
              Answer Key
            </Link>
            <Link
              href="/results"
              className="px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-blue rounded-md transition-colors"
            >
              Results
            </Link>
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/jobs"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-brand-navy bg-brand-peach/60 hover:bg-brand-peach rounded border border-brand-orange/40 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-brand-navy" />
              <span>Search Portal</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded text-brand-navy hover:bg-brand-border/40 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-white px-4 pt-3 pb-5 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-brand-navy hover:bg-brand-border/20 rounded"
          >
            Home
          </Link>
          <Link
            href="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-brand-navy hover:bg-brand-border/20 rounded"
          >
            Government Jobs
          </Link>
          <Link
            href="/admit-card"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-brand-navy hover:bg-brand-border/20 rounded"
          >
            Admit Card
          </Link>
          <Link
            href="/answer-key"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-brand-navy hover:bg-brand-border/20 rounded"
          >
            Answer Key
          </Link>
          <Link
            href="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-brand-navy hover:bg-brand-border/20 rounded"
          >
            Results
          </Link>
        </div>
      )}
    </header>
  );
}
