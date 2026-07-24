import Link from "next/link";
import { Bot } from "lucide-react";

export default function AutomaticOpportunityPage() {
  return (
    <div className="p-6 lg:p-10">
      <section className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <Bot className="mx-auto text-violet-600" size={36} />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Automatic Entry is coming later
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          URL extraction is not part of this phase. You can create an opportunity manually now.
        </p>
        <Link
          href="/opportunities/new"
          className="mt-6 inline-flex rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Back to methods
        </Link>
      </section>
    </div>
  );
}
