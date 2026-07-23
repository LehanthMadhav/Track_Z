import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}