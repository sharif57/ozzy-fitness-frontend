/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Workout Plan", path: "/workoutplan" },
    { title: "Nutrition Plan", path: "/nutritionplan" },
    { title: "About Us", path: "/about" },
    { title: "Subscription", path: "/subscription" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-blue-50 shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-[1580px] px-6 lg:px-12 py-6 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-black border-2 p-2 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/">
          <Image height={45} width={200} src="/images/logo.png" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10 text-[16px] font-medium ml-auto">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                href={item.path}
                className={`flex items-center transition ${
                  pathname === item.path
                    ? "text-blue-600 font-bold"
                    : "text-[#5F5F5F] hover:text-black"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Signup Button */}
        <Link href="/auth">
          <div className="hidden lg:flex items-center gap-10 ml-10">
            <button className="bg-[#01336F] text-white px-8 py-4 rounded-lg text-[18px]">
              Sign Up
            </button>
          </div>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#daedf2] z-50 shadow-lg transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between bg-white items-center px-4 py-3 border-b">
          <img src="/images/mobileLogo.png" alt="Logo" />
          <button
            onClick={() => setOpen(false)}
            className="text-black border-2 p-2 rounded-lg"
          >
            <X />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col h-full p-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`block py-2 ${
                pathname === item.path
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-black"
              }`}
              onClick={() => setOpen(false)} // Close menu on click
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </nav>
  );
}
