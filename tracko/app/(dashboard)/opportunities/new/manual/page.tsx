import ManualOpportunityForm from "@/components/opportunities/ManualOpportunityForm";

export default function ManualOpportunityPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Manual opportunity</h1>
        <p className="mt-1 text-sm text-slate-500">
          Add the details you want TrackO to prepare for tracking.
        </p>
      </div>

      <ManualOpportunityForm />
    </div>
  );
}
