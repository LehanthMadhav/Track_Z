import ChooseMethod from "@/components/opportunities/ChooseMethod";

export default function NewOpportunityPage() {
  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Create New Opportunity
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new opportunity tracker.
        </p>
      </div>

      <ChooseMethod />

    </div>
  );
}