export default function RemindersPage() {
  return (
    <main className="flex-1 p-6 lg:p-10">
      <section className="max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Reminders
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Keep every deadline and nudge in view.
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Add reminder rules, notifications, and scheduled follow-up actions here.
        </p>
      </section>
    </main>
  );
}