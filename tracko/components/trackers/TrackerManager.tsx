"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import TrackerCard from "@/components/dashboard/TrackerCard";
import { getStoredTrackers, markTrackerComplete } from "@/lib/tracker-storage";
import type { OpportunityType } from "@/types/opportunity";
import type { StoredTracker } from "@/types/tracker";

const opportunityTypes: OpportunityType[] = ["Hackathon", "Internship", "Competition", "Webinar", "Workshop", "Conference", "Job", "Scholarship", "Other"];
type DateFilter = "all" | "next-week" | "this-month" | "next-month";

function dateForComparison(value: string) {
  return value ? new Date(`${value}T00:00:00`) : null;
}

function formatDate(value: string) {
  const date = dateForComparison(value);
  return date ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(date) : "Not added";
}

function matchesDateFilter(tracker: StoredTracker, filter: DateFilter) {
  if (filter === "all") return true;
  const eventDate = dateForComparison(tracker.eventStartDate);
  if (!eventDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (filter === "next-week") {
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return eventDate >= today && eventDate <= nextWeek;
  }
  const targetMonth = filter === "this-month" ? today.getMonth() : (today.getMonth() + 1) % 12;
  const targetYear = filter === "next-month" && today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
  return eventDate.getMonth() === targetMonth && eventDate.getFullYear() === targetYear;
}

export default function TrackerManager({ completed }: { completed: boolean }) {
  const [trackers, setTrackers] = useState<StoredTracker[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [typeFilter, setTypeFilter] = useState<OpportunityType | "all">("all");

  useEffect(() => {
    const timer = window.setTimeout(() => setTrackers(getStoredTrackers()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredTrackers = useMemo(
    () => trackers.filter((tracker) => tracker.isCompleted === completed)
      .filter((tracker) => typeFilter === "all" || tracker.type === typeFilter)
      .filter((tracker) => matchesDateFilter(tracker, dateFilter)),
    [completed, dateFilter, trackers, typeFilter],
  );

  const heading = completed ? "Past trackers" : "All trackers";
  const description = completed ? "Completed opportunities and events." : "Every active opportunity you are tracking.";

  return (
    <main className="flex-1 p-6 lg:p-10">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">TrackO</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{heading}</h1><p className="mt-2 text-sm text-slate-600">{description}</p></div>
          {!completed && <Link href="/opportunities/new" className="rounded-lg bg-violet-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-violet-700">New opportunity</Link>}
        </div>

        <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">Event period
            <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value as DateFilter)} className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm">
              <option value="all">All dates</option><option value="next-week">Next 7 days</option><option value="this-month">This month</option><option value="next-month">Next month</option>
            </select>
          </label>
          <label className="text-sm font-medium text-slate-700">Opportunity type
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as OpportunityType | "all")} className="mt-2 h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm">
              <option value="all">All types</option>{opportunityTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </label>
        </div>

        {filteredTrackers.length ? <div className="space-y-3">{filteredTrackers.map((tracker) => <TrackerCard key={tracker.id} title={tracker.title} type={tracker.type ?? "Other"} appliedDate={tracker.hasApplied ? formatDate(tracker.appliedDate) : "Not applied"} eventDate={tracker.eventTime ? `${formatDate(tracker.eventStartDate)}, ${tracker.eventTime}` : formatDate(tracker.eventStartDate)} reminder={formatDate(tracker.registrationDeadline)} reminderNote="Registration deadline" status={tracker.status} onComplete={completed ? undefined : () => setTrackers(markTrackerComplete(tracker.id))} />)}</div> : <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center"><h2 className="font-semibold text-slate-900">No matching trackers</h2><p className="mt-2 text-sm text-slate-500">{completed ? "Completed trackers will appear here." : "Create a tracker or adjust your filters."}</p></div>}
      </section>
    </main>
  );
}
