"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import TrackerCard from "@/components/dashboard/TrackerCard";
import { getStoredTrackers } from "@/lib/tracker-storage";
import type { StoredTracker } from "@/types/tracker";

function formatDate(date: string) {
  if (!date) return "Not added";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatEventDate(tracker: StoredTracker) {
  const date = formatDate(tracker.eventStartDate);
  return tracker.eventTime ? `${date}, ${tracker.eventTime}` : date;
}

export default function ActiveTrackers() {
  const [trackers, setTrackers] = useState<StoredTracker[]>([]);

  useEffect(() => {
    // localStorage only exists in the browser. Deferring this read also keeps
    // the server-rendered empty state consistent with the first client render.
    const loadTrackers = window.setTimeout(() => {
      setTrackers(getStoredTrackers());
    }, 0);

    return () => window.clearTimeout(loadTrackers);
  }, []);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Active trackers</h2>
          <p className="text-sm text-slate-500">
            Opportunities you have added in this browser.
          </p>
        </div>

        <Link
          href="/opportunities/new"
          className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
        >
          Add another
        </Link>
      </div>

      {trackers.length > 0 ? (
        <div className="space-y-3">
          {trackers.map((tracker) => (
            <TrackerCard
              key={tracker.id}
              title={tracker.title}
              type={tracker.type ?? "Other"}
              appliedDate={tracker.hasApplied ? formatDate(tracker.appliedDate) : "Not applied"}
              eventDate={formatEventDate(tracker)}
              reminder={formatDate(tracker.registrationDeadline)}
              reminderNote="Registration deadline"
              status={tracker.status}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">No trackers yet</h3>
          <p className="mt-2 text-sm text-slate-500">
            Create a manual opportunity and it will appear here.
          </p>
        </div>
      )}
    </section>
  );
}
