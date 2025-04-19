"use client";

import Link from "next/link";
import Cart from "./Cart";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user } = useUser();
  
  return (
    <div className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-blue-600">
          SpeedHorizon Motorsiklet
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-600">
            Ana Sayfa
          </Link>
          <Link href="/motorcycles" className="hover:text-blue-600">
            Motorsikletler
          </Link>
          {user ? (
            <Link href="/profile" className="hover:text-blue-600">
              Hesabım
            </Link>
          ) : (
            <Link href="/auth/login" className="hover:text-blue-600">
              Giriş Yap
            </Link>
          )}
          <Cart />
        </div>
      </div>
    </div>
  );
} 