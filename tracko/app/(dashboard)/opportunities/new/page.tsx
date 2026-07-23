export default function NewOpportunityPage() {
  return (
    <main className="flex-1 p-6 lg:p-10">
      <section className="max-w-3xl space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            New opportunity
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Start tracking a new application or event.
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            This route is ready for the form UI and now sits inside the dashboard
            route group with the rest of the app shell.
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
          Build the form here when you are ready to capture company, role, due
          dates, and reminder details.
        </div>
      </section>
    </main>
  );
}