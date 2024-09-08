"use client"; // This tells Next.js to treat this component as a client component

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href={'/'} className="text-2xl font-bold text-indigo-600">Tny URL</Link>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link href='/' className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link href='/' className="text-gray-700 hover:text-indigo-600">
              About
            </Link>
            <Link href='/' className="text-gray-700 hover:text-indigo-600">
              Services
            </Link>
            <Link href='/' className="text-gray-700 hover:text-indigo-600">
              Contact
            </Link>
          </nav>
          <div className="md:hidden">{/* Mobile menu button (optional) */}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
