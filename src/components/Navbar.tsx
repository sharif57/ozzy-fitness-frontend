/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUserProfileQuery } from "@/redux/features/userSlice";
import { Dropdown } from "antd";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

interface userProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: userProfile } = useUserProfileQuery<{ data: userProfile }>();
  const router = useRouter();

  const handleLogOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      Cookies.remove("accessToken", { path: "/" });
      toast.success("Logout successful!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  const items = [
    { key: "1", label: "My Account", disabled: true },
    { type: "divider" },
    { key: "2", label: <Link href="/profile">Profile</Link> },
    { key: "3", label: <Link href="/settings">My Appointment</Link> },
    { key: "4", label: <Link href="/settings">My Workout Plan</Link> },
    { type: "divider" },
    { key: "5", label: <button onClick={handleLogOut}>Logout</button> },
  ];

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Workout Plan", path: "/workoutplan1" },
    { title: "Nutrition Plan", path: "/nutritionplan1" },
    { title: "About Us", path: "/about1" },
    { title: "Subscription", path: "/subscription1" },
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
    <nav className="bg-[#ffffff] shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-[1580px] px-6 lg:px-12 py-6 flex justify-between items-center">
        <button onClick={() => setOpen(true)} className="lg:hidden text-black border-2 p-2 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/">
          <Image height={45} width={200} src="/images/logo.png" alt="Logo" />
        </Link>
        <ul className="hidden lg:flex items-center gap-10 text-[16px] font-medium ml-auto">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link
                href={item.path}
                className={`flex items-center transition ${pathname === item.path ? "text-[#01336F] font-bold" : "text-[#5F5F5F] hover:text-black"}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-10 ml-10">
          {userProfile ? (
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <div className="flex items-center gap-3 cursor-pointer">
                <img src={userProfile?.data?.image || "/images/user.png"} alt="User Avatar" className="w-10 h-10 rounded-full border" />
              </div>
            </Dropdown>
          ) : (
            <Link href="/login">
              <button className="bg-[#01336F] text-white px-8 py-4 rounded-lg text-[18px]">Sign Up</button>
            </Link>
          )}
        </div>
      </div>
      <div className={`fixed top-0 left-0 h-full w-80 bg-[#daedf2] z-50 shadow-lg transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between bg-white items-center px-4 py-3 border-b">
          <img src="/images/mobileLogo.png" alt="Logo" />
          <button onClick={() => setOpen(false)} className="text-black border-2 p-2 rounded-lg">
            <X />
          </button>
        </div>
        <div className="flex flex-col h-full p-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`block py-2 ${pathname === item.path ? "text-blue-600 font-bold" : "text-gray-700 hover:text-black"}`}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setOpen(false)}></div>}
    </nav>
  );
}
