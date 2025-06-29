// Layout.tsx
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppSidebar } from "@/mycomponents/AppSidebar";
import Footer from "@/mycomponents/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isIndex, setIsIndex] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      setIsIndex(true);
    } else {
      setIsIndex(false);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <SidebarProvider>
          <div className="flex flex-1 w-full">
            <AppSidebar />
            <SidebarTrigger className="fixed z-30 block md:hidden top-2 left-2" />

            {!isIndex && (
              <button className="fixed top-10 z-30 md:top-2 left-2 md:left-64 cursor-pointer hover:text-gray-500" onClick={() => router.back()}>
                <IoMdArrowRoundBack size={24} />
              </button>
            )}

            <div className="flex flex-1 flex-col">
              <main className="flex flex-1 w-full min-h-screen">
                <Toaster position="top-right" />
                <div className="w-full">{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
