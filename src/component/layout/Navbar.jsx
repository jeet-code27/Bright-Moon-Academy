'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Programs', href: '/programs' },
    { name: 'Announcements', href: '/announcement' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#FBF9F0] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image
                src="/images/school-logo.png"
                alt="Bright Moon Academy Logo"
                width={40}
                height={40}
                className="lg:w-16 lg:h-16"
              />
              <span className="text-xl lg:text-3xl font-bold text-blue-950 hover:text-blue-800 transition-colors">
                Bright Moon Academy
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-900 font-medium text-sm xl:text-base transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Book a Tour Button - Desktop */}
          <div className="hidden lg:flex">
            <Link
              href="/apply-admission"
              className="bg-white text-gray-700 border-2 border-gray-300 px-6 py-2 rounded-full font-medium text-sm xl:text-base hover:border-blue-900 hover:text-blue-900 transition-all duration-200 hover:shadow-md"
            >
              Apply for Admission
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-900 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 font-medium text-base transition-colors duration-200 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link
                  href="/book-tour"
                  className="block w-full text-center bg-blue-900 text-white px-4 py-2 rounded-full font-medium text-base hover:bg-blue-800 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book a Tour
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;