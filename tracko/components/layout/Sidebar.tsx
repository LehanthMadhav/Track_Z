"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CirclePlus,
  List,
  History,
  CalendarDays,
  Mail,
  Bell,
  ChartNoAxesColumnIncreasing,
  Settings,
  House,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "New Opportunity",
    icon: CirclePlus,
    href: "/opportunities/new",
  },
  {
    name: "All Trackers",
    icon: List,
    href: "/trackers",
  },
  {
    name: "Past Trackers",
    icon: History,
    href: "/trackers/past",
  },
  {
    name: "Calendar",
    icon: CalendarDays,
    href: "/calendar",
  },
  {
    name: "Email Tracker",
    icon: Mail,
    href: "/email-tracker",
  },
  {
    name: "Reminders",
    icon: Bell,
    href: "/reminders",
  },
  {
    name: "Analytics",
    icon: ChartNoAxesColumnIncreasing,
    href: "/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex min-h-screen w-60 flex-col bg-slate-950 p-4 text-white">

      {/* Logo / Branding */}
      <div className="mb-8 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
          <House size={20} />
        </div>

        <div>
          <h1 className="text-lg font-bold">
            TrackO
          </h1>

          <p className="text-xs text-slate-400">
            Opportunity Tracker
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-violet-600/30 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} />

              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

      {/* User Profile */}
      <div className="mt-auto border-t border-slate-800 pt-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold">
            AV
          </div>

          <div>
            <p className="text-sm font-medium">
              Aditya Verma
            </p>

            <p className="text-xs text-slate-400">
              aditya@email.com
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
}
