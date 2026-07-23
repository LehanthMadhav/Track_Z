export default function PastTrackersPage() {
  return (
    <main className="flex-1 p-6 lg:p-10">
      <section className="max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Past trackers
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Archived and completed opportunities.
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use this route for completed applications, archived campaigns, and
          historical notes.
        </p>
      </section>
    </main>
  );
}