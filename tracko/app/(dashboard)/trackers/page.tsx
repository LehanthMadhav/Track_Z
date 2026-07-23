const trackerSections = [
  "Open applications",
  "Interview pipeline",
  "Waiting on replies",
];

export default function TrackersPage() {
  return (
    <main className="flex-1 p-6 lg:p-10">
      <section className="max-w-5xl space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            All trackers
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Review every active opportunity in one place.
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            This section is ready for the full tracker table and filters.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {trackerSections.map((section) => (
            <div
              key={section}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-sm font-medium text-slate-900">{section}</p>
              <p className="mt-2 text-sm text-slate-500">
                Add summary cards, filters, or tables here.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}