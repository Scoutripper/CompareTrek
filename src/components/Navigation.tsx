'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const mainNavLinks = [
  { href: '/treks', label: 'Treks' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const mobileNavLinks = [
  ...mainNavLinks,
  { href: '/faq', label: 'FAQ' },
  { href: '/support', label: 'Support' },
  { href: '/terms', label: 'Terms' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && !href.startsWith('/')) {
      e.preventDefault();
      console.error('Invalid link:', href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[92px] items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={handleLinkClick}>
            <Image
              src="/images/logo/logo.png"
              alt="Scoutripper"
              width={180}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`text-base font-medium ${
                  pathname.startsWith(link.href)
                    ? 'text-[#85d4d6]'
                    : 'text-gray-700 hover:text-[#85d4d6]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 ml-4">
              <Link
                href="/auth/login"
                onClick={handleLinkClick}
                className="text-gray-700 hover:text-[#85d4d6] px-4 py-2 text-base font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                onClick={handleLinkClick}
                className="bg-[#85d4d6] text-white hover:bg-[#6bc4c6] px-4 py-2 rounded-lg text-base font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-[#85d4d6]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.startsWith(link.href)
                  ? 'text-[#85d4d6]'
                  : 'text-gray-700 hover:text-[#85d4d6]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#85d4d6]"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            onClick={handleLinkClick}
            className="block px-3 py-2 rounded-md text-base font-medium bg-[#85d4d6] text-white hover:bg-[#6bc4c6]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
} 