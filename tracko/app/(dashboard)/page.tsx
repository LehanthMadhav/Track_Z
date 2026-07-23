import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  CirclePlus,
  ClipboardList,
} from "lucide-react";

import StatCard from "@/components/Dashboard/StatCard";
import TrackerCard from "@/components/Dashboard/TrackerCard";
import { activeTrackers } from "@/data/dashboard";

const stats = [
  {
    title: "Applications tracked",
    value: 24,
    subtitle: "Updated across the last 30 days",
    icon: ClipboardList,
    variant: "blue" as const,
  },
  {
    title: "Upcoming reminders",
    value: 6,
    subtitle: "Due in the next 7 days",
    icon: BellRing,
    variant: "orange" as const,
  },
  {
    title: "Events scheduled",
    value: 9,
    subtitle: "Interviews, calls, and webinars",
    icon: CalendarDays,
    variant: "green" as const,
  },
];

export default function DashboardPage() {
  return (
    <main className="flex-1 space-y-8 p-6 lg:p-10">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-6 bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.08),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,0.02),_rgba(255,255,255,0.95))] p-8 lg:p-10 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-medium tracking-wide text-white">
              TrackO dashboard
            </span>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 lg:text-5xl">
                Keep every opportunity moving from application to follow-up.
              </h1>

              <p className="max-w-xl text-sm leading-6 text-slate-600 lg:text-base">
                A focused home for applications, reminders, and milestone tracking
                so the important stuff does not disappear into scattered tabs.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/opportunities/new"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <CirclePlus size={16} />
              New opportunity
            </Link>

            <Link
              href="/trackers"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              View trackers
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Active trackers
            </h2>
            <p className="text-sm text-slate-500">
              The latest opportunities waiting for follow-up.
            </p>
          </div>

          <Link
            href="/opportunities/new"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
          >
            Add another
          </Link>
        </div>

        <div className="space-y-3">
          {activeTrackers.map((tracker) => (
            <TrackerCard key={tracker.id} {...tracker} />
          ))}
        </div>
      </section>
    </main>
  );
}