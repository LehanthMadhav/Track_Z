"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { saveTracker } from "@/lib/tracker-storage";
import type {
  ManualOpportunityFormData,
  OpportunityMode,
  OpportunityStatus,
  OpportunityType,
} from "@/types/opportunity";

type FormErrors = Partial<Record<keyof ManualOpportunityFormData, string>>;

const opportunityTypes: OpportunityType[] = [
  "Hackathon",
  "Internship",
  "Competition",
  "Webinar",
  "Workshop",
  "Conference",
  "Job",
  "Scholarship",
  "Other",
];

const modes: OpportunityMode[] = ["Online", "Offline", "Hybrid"];
const statuses: OpportunityStatus[] = ["Saved", "Applied", "Registered"];

const initialFormData: ManualOpportunityFormData = {
  title: "",
  organization: "",
  type: undefined,
  officialUrl: "",
  registrationStartDate: "",
  registrationDeadline: "",
  hasApplied: false,
  appliedDate: "",
  eventStartDate: "",
  eventEndDate: "",
  eventTime: "",
  mode: undefined,
  location: "",
  eventLink: "",
  emailTracking: false,
  status: "Saved",
  notes: "",
};

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;
}

export default function ManualOpportunityForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<ManualOpportunityFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
  }

  function handleAppliedChange(event: ChangeEvent<HTMLInputElement>) {
    const hasApplied = event.target.checked;
    setFormData((currentData) => ({
      ...currentData,
      hasApplied,
      appliedDate: hasApplied ? currentData.appliedDate : "",
    }));
    setErrors((currentErrors) => ({ ...currentErrors, appliedDate: undefined }));
  }

  function handleModeChange(event: ChangeEvent<HTMLSelectElement>) {
    const mode = event.target.value as OpportunityMode | "";
    setFormData((currentData) => ({
      ...currentData,
      mode: mode || undefined,
      eventLink: mode === "Offline" ? "" : currentData.eventLink,
      location: mode === "Online" ? "" : currentData.location,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      mode: undefined,
      eventLink: undefined,
      location: undefined,
    }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    if (!formData.title.trim()) nextErrors.title = "Opportunity name is required.";
    if (!formData.organization.trim()) nextErrors.organization = "Organization is required.";
    if (!formData.type) nextErrors.type = "Choose an opportunity type.";
    if (!formData.registrationDeadline) nextErrors.registrationDeadline = "Registration deadline is required.";
    if (!formData.eventStartDate) nextErrors.eventStartDate = "Event start date is required.";
    if (!formData.mode) nextErrors.mode = "Choose an event mode.";

    if (formData.officialUrl && !isValidUrl(formData.officialUrl)) {
      nextErrors.officialUrl = "Enter a valid URL beginning with http:// or https://.";
    }
    if (formData.registrationStartDate && formData.registrationDeadline && formData.registrationStartDate > formData.registrationDeadline) {
      nextErrors.registrationStartDate = "Start date cannot be after the registration deadline.";
    }
    if (formData.eventEndDate && formData.eventStartDate && formData.eventEndDate < formData.eventStartDate) {
      nextErrors.eventEndDate = "End date cannot be before the event start date.";
    }
    if (formData.hasApplied && !formData.appliedDate) {
      nextErrors.appliedDate = "Add the date you applied or registered.";
    }
    if ((formData.mode === "Online" || formData.mode === "Hybrid") && !formData.eventLink.trim()) {
      nextErrors.eventLink = "Event link is required for this mode.";
    }
    if ((formData.mode === "Offline" || formData.mode === "Hybrid") && !formData.location.trim()) {
      nextErrors.location = "Location is required for this mode.";
    }
    if (formData.eventLink && !isValidUrl(formData.eventLink)) {
      nextErrors.eventLink = "Enter a valid URL beginning with http:// or https://.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const opportunity: ManualOpportunityFormData = { ...formData };
    const savedTracker = saveTracker(opportunity);
    if (process.env.NODE_ENV === "development") {
      console.log("Manual opportunity stored in this browser:", savedTracker);
    }
    router.push("/");
  }

  const showEventLink = formData.mode === "Online" || formData.mode === "Hybrid";
  const showLocation = formData.mode === "Offline" || formData.mode === "Hybrid";

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Basic information</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">Opportunity Name *
            <Input name="title" value={formData.title} onChange={handleChange} aria-invalid={Boolean(errors.title)} placeholder="e.g. Google Summer of Code" className="mt-2" />
            <FieldError message={errors.title} />
          </label>
          <label className="text-sm font-medium text-slate-700">Organization *
            <Input name="organization" value={formData.organization} onChange={handleChange} aria-invalid={Boolean(errors.organization)} placeholder="e.g. Google" className="mt-2" />
            <FieldError message={errors.organization} />
          </label>
          <label className="text-sm font-medium text-slate-700">Opportunity Type *
            <select name="type" value={formData.type ?? ""} onChange={handleChange} aria-invalid={Boolean(errors.type)} className="mt-2 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
              <option value="">Select a type</option>{opportunityTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select><FieldError message={errors.type} />
          </label>
          <label className="text-sm font-medium text-slate-700">Official URL
            <Input name="officialUrl" type="url" value={formData.officialUrl} onChange={handleChange} aria-invalid={Boolean(errors.officialUrl)} placeholder="https://example.com" className="mt-2" />
            <FieldError message={errors.officialUrl} />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Registration</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">Registration Start Date
            <Input name="registrationStartDate" type="date" value={formData.registrationStartDate} onChange={handleChange} aria-invalid={Boolean(errors.registrationStartDate)} className="mt-2" />
            <FieldError message={errors.registrationStartDate} />
          </label>
          <label className="text-sm font-medium text-slate-700">Registration Deadline *
            <Input name="registrationDeadline" type="date" value={formData.registrationDeadline} onChange={handleChange} aria-invalid={Boolean(errors.registrationDeadline)} className="mt-2" />
            <FieldError message={errors.registrationDeadline} />
          </label>
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm font-medium text-slate-700">
          <input type="checkbox" checked={formData.hasApplied} onChange={handleAppliedChange} className="size-4 rounded border-slate-300 accent-violet-600" />
          Have you already applied or registered?
        </label>
        {formData.hasApplied && <label className="mt-5 block max-w-md text-sm font-medium text-slate-700">Applied / Registered Date
          <Input name="appliedDate" type="date" value={formData.appliedDate} onChange={handleChange} aria-invalid={Boolean(errors.appliedDate)} className="mt-2" />
          <FieldError message={errors.appliedDate} />
        </label>}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Event information</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">Event Start Date *
            <Input name="eventStartDate" type="date" value={formData.eventStartDate} onChange={handleChange} aria-invalid={Boolean(errors.eventStartDate)} className="mt-2" />
            <FieldError message={errors.eventStartDate} />
          </label>
          <label className="text-sm font-medium text-slate-700">Event End Date
            <Input name="eventEndDate" type="date" value={formData.eventEndDate} onChange={handleChange} aria-invalid={Boolean(errors.eventEndDate)} className="mt-2" />
            <FieldError message={errors.eventEndDate} />
          </label>
          <label className="text-sm font-medium text-slate-700">Event Time
            <Input name="eventTime" type="time" value={formData.eventTime} onChange={handleChange} className="mt-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">Mode *
            <select value={formData.mode ?? ""} onChange={handleModeChange} aria-invalid={Boolean(errors.mode)} className="mt-2 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
              <option value="">Select a mode</option>{modes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
            </select><FieldError message={errors.mode} />
          </label>
          {showEventLink && <label className="text-sm font-medium text-slate-700">Event Link *
            <Input name="eventLink" type="url" value={formData.eventLink} onChange={handleChange} aria-invalid={Boolean(errors.eventLink)} placeholder="https://meet.example.com" className="mt-2" />
            <FieldError message={errors.eventLink} />
          </label>}
          {showLocation && <label className="text-sm font-medium text-slate-700">Location *
            <Input name="location" value={formData.location} onChange={handleChange} aria-invalid={Boolean(errors.location)} placeholder="City, venue, or address" className="mt-2" />
            <FieldError message={errors.location} />
          </label>}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Tracking</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">Initial Status
            <select name="status" value={formData.status} onChange={handleChange} className="mt-2 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100">
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-3 self-end pb-2 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={formData.emailTracking} onChange={(event) => setFormData((currentData) => ({ ...currentData, emailTracking: event.target.checked }))} className="size-4 rounded border-slate-300 accent-violet-600" />
            Enable Email Tracking
          </label>
        </div>
        <label className="mt-5 block text-sm font-medium text-slate-700">Notes
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} placeholder="Add helpful context, reminders, or preparation notes." className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
        </label>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <button type="button" onClick={() => router.push("/opportunities/new")} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Back</button>
        <div className="flex gap-3"><button type="button" onClick={() => router.push("/")} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700">Create Tracker</button></div>
      </div>
    </form>
  );
}
