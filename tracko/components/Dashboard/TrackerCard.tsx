import { CheckCircle2 } from "lucide-react";

interface TrackerCardProps {
  title: string;
  type: string;
  appliedDate: string;
  eventDate: string;
  reminder: string;
  reminderNote: string;
  status: string;
  onComplete?: () => void;
}

export default function TrackerCard({
  title,
  type,
  appliedDate,
  eventDate,
  reminder,
  reminderNote,
  status,
  onComplete,
}: TrackerCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex items-center justify-between gap-6">

        {/* Opportunity Information */}
        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <h3 className="truncate text-sm font-semibold text-slate-900">
              {title}
            </h3>

            <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700">
              {type}
            </span>

          </div>

          <div className="mt-2 space-y-1 text-xs text-slate-500">

            <p>
              Applied:{" "}
              <span className="text-slate-700">
                {appliedDate}
              </span>
            </p>

            <p>
              Event:{" "}
              <span className="text-slate-700">
                {eventDate}
              </span>
            </p>

          </div>

        </div>

        {/* Reminder */}
        <div className="w-36">

          <p className="text-xs text-slate-400">
            Next Reminder
          </p>

          <p className="mt-1 text-sm font-medium text-slate-800">
            {reminder}
          </p>

          <p className="text-xs text-slate-400">
            {reminderNote}
          </p>

        </div>

        {/* Status */}
        <div className="w-28">

          <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
            {status}
          </span>

        </div>

        {onComplete && (
          <button
            type="button"
            onClick={onComplete}
            className="inline-flex items-center gap-2 rounded-lg border border-green-200 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-50"
          >
            <CheckCircle2 size={16} />
            Complete
          </button>
        )}

      </div>

    </article>
  );
}
