"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getStoredTrackers } from "@/lib/tracker-storage";
import type { OpportunityType } from "@/types/opportunity";
import type { StoredTracker } from "@/types/tracker";

const types: OpportunityType[] = ["Hackathon", "Internship", "Competition", "Webinar", "Workshop", "Conference", "Job", "Scholarship", "Other"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function TrackerCalendar() {
  const [trackers, setTrackers] = useState<StoredTracker[]>([]);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [typeFilter, setTypeFilter] = useState<OpportunityType | "all">("all");

  useEffect(() => {
    const timer = window.setTimeout(() => setTrackers(getStoredTrackers()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const eventsByDate = useMemo(() => {
    const events = new Map<string, { id: string; title: string; label: string; type?: OpportunityType }[]>();
    trackers.filter((tracker) => typeFilter === "all" || tracker.type === typeFilter).forEach((tracker) => {
      const entries = [
        { date: tracker.eventStartDate, label: "Event" },
        { date: tracker.registrationDeadline, label: "Deadline" },
      ];
      entries.forEach(({ date, label }) => {
        if (!date) return;
        const event = { id: `${tracker.id}-${label}`, title: tracker.title, label, type: tracker.type };
        events.set(date, [...(events.get(date) ?? []), event]);
      });
    });
    return events;
  }, [trackers, typeFilter]);

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, index) => index < firstWeekday ? null : index - firstWeekday + 1);

  return (
    <main className="flex-1 p-6 lg:p-10">
      <section className="mx-auto max-w-6xl space-y-6">
        <div><p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Calendar</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Opportunity schedule</h1><p className="mt-2 text-sm text-slate-600">Event dates and registration deadlines from your trackers.</p></div>
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2"><button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(year, monthIndex - 1, 1))} className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"><ChevronLeft size={18} /></button><h2 className="min-w-40 text-center text-lg font-semibold text-slate-900">{month.toLocaleString("en-IN", { month: "long", year: "numeric" })}</h2><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))} className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"><ChevronRight size={18} /></button></div>
          <label className="text-sm font-medium text-slate-700">Filter type <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as OpportunityType | "all")} className="ml-2 h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm"><option value="all">All types</option>{types.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm"><div className="grid min-w-[720px] grid-cols-7 border-b border-slate-200 bg-slate-50">{weekdays.map((day) => <div key={day} className="p-3 text-center text-xs font-semibold text-slate-500">{day}</div>)}</div><div className="grid min-w-[720px] grid-cols-7">{cells.map((day, index) => { const key = day ? dateKey(year, monthIndex, day) : "empty-" + index; const events = day ? eventsByDate.get(key) ?? [] : []; return <div key={key} className="min-h-32 border-r border-b border-slate-100 p-2 last:border-r-0">{day && <><p className="text-xs font-medium text-slate-600">{day}</p><div className="mt-2 space-y-1">{events.map((event) => <div key={event.id} title={`${event.label}: ${event.title}`} className={`truncate rounded px-1.5 py-1 text-[11px] font-medium ${event.label === "Deadline" ? "bg-orange-100 text-orange-700" : "bg-violet-100 text-violet-700"}`}>{event.label}: {event.title}</div>)}</div></>}</div>; })}</div></div>
        <p className="text-xs text-slate-500"><span className="mr-3 inline-block rounded bg-violet-100 px-2 py-1 text-violet-700">Event</span><span className="inline-block rounded bg-orange-100 px-2 py-1 text-orange-700">Registration deadline</span></p>
      </section>
    </main>
  );
}
