'use client';

import Link from 'next/link';

interface HeaderProps {
  showDashboardLink?: boolean;
}

export default function Header({ showDashboardLink = true }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IF</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Indie<span className="text-teal-600">Faux</span>Faux
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              Projects
            </Link>
            {showDashboardLink && (
              <Link
                href="/"
                className="hidden md:inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Creator Studio
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
