export default function AnalyticsPage() {
  return (
    <main className="flex-1 p-6 lg:p-10">
      <section className="max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Analytics
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          Measure response rates and application progress.
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          This page is set aside for charts, trends, and dashboard metrics.
        </p>
      </section>
    </main>
  );
}