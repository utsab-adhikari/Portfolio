"use client";
import React, { Children, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome2,
  IconArticle,
  IconNotebook,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconNews,
  IconLogin,
} from "@tabler/icons-react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHome2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Blogs",
      href: "/blog",
      icon: (
        <IconArticle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Projects",
      href: "/projects",
      icon: (
        <IconNotebook className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "News",
      href: "/news",
      icon: (
        <IconNews className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Login",
      href: "/login",
      icon: (
        <IconLogin className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="fixed h-screen justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandFacebook className="h-6 w-6 text-neutral-700 hover:text-blue-600 dark:text-neutral-200 transition" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub className="h-6 w-6 text-neutral-700 hover:text-black dark:text-neutral-200 transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin className="h-6 w-6 text-neutral-700 hover:text-blue-500 dark:text-neutral-200 transition" />
            </a>
          </div>
        </SidebarBody>
      </Sidebar>
      <Body>{children}</Body>
    </div>
  );
}
export const Logo = () => {
  return (
     <a
      href="mailto:utsabadhikari075@gmail.com"
      className="relative z-20 flex flex-col items-center space-y-2 py-4 text-sm font-normal text-black dark:text-white"
    >
      <img
        src="https://github.com/shadcn.png" // Replace this with your actual profile image in public folder or hosted image link
        alt="Utsab Adhikari"
        className="h-24 w-24 rounded-full border-2 border-indigo-500 object-cover shadow-lg transition hover:scale-105"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-lg"
      >
        Utsab Adhikari
      </motion.span>
      <span className="text-xs text-neutral-600 dark:text-neutral-400">
        utsabadhikari075@gmail.com
      </span>
    </a>
  );
};

// Dummy dashboard component with content
const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex md:ml-75 flex-1">
      <div className="flex min-h-full-screen w-full flex-1">{children}</div>
    </div>
  );
};
