import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/Dashboard/StatCard";
import TrackerCard from "@/components/Dashboard/TrackerCard";
import { activeTrackers } from "@/data/dashboard";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  CirclePlus,
  Clock3,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 bg-slate-50 p-8">

  <header className="flex items-start justify-between">

    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Dashboard
      </h1>

      <p className="mt-1 text-sm font-medium text-slate-700">
        Good evening, Aditya! 👋
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Here&apos;s what&apos;s happening with your trackers.
      </p>
    </div>

    <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700">
      <CirclePlus size={17} />
      New Opportunity
    </button>

  </header>

  <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
    <StatCard
      title="Active Trackers"
      value={12}
      subtitle="Running"
      icon={Clock3}
      variant="blue"
    />

    <StatCard
      title="Event Coming Soon"
      value={5}
      subtitle="Next 7 Days"
      icon={CalendarDays}
      variant="orange"
    />

    <StatCard
      title="Reminders Today"
      value={3}
      subtitle="Pending"
      icon={Bell}
      variant="red"
    />

    <StatCard
      title="Completed"
      value={18}
      subtitle="This Year"
      icon={CheckCircle2}
      variant="green"
    />
  </section>

  <section className="mt-8">

    {/* Section Header */}
    <div className="mb-4 flex items-center justify-between">

      <h2 className="text-lg font-semibold text-slate-900">
        Active Trackers
      </h2>

      <button className="text-sm font-medium text-violet-600 transition hover:text-violet-700">
        View All
      </button>

    </div>

    {/* Tracker List */}
    <div className="space-y-3">

      {activeTrackers.map((tracker) => (
        <TrackerCard
          key={tracker.id}
          title={tracker.title}
          type={tracker.type}
          appliedDate={tracker.appliedDate}
          eventDate={tracker.eventDate}
          reminder={tracker.reminder}
          reminderNote={tracker.reminderNote}
          status={tracker.status}
        />
      ))}

    </div>

  </section>

</main>

    </div>
  );
}