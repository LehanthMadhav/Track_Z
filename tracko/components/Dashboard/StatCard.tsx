import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  variant: "blue" | "orange" | "red" | "green";
};

const variants = {
  blue: {
    card: "border-blue-100 bg-blue-50/40",
    icon: "text-blue-600",
  },

  orange: {
    card: "border-orange-100 bg-orange-50/40",
    icon: "text-orange-500",
  },

  red: {
    card: "border-red-100 bg-red-50/40",
    icon: "text-red-500",
  },

  green: {
    card: "border-green-100 bg-green-50/40",
    icon: "text-green-600",
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant,
}: StatCardProps) {
  const styles = variants[variant];

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${styles.card}`}
    >
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-600">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <Icon
          size={20}
          className={styles.icon}
        />

      </div>
    </div>
  );
}