"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BarChart3, ChevronDown } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";
import { NcrDashboard } from "@/components/ncr/ncr-dashboard";

type DashboardView = "overview" | "ncr";

export function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view: DashboardView = searchParams.get("view") === "ncr" ? "ncr" : "overview";

  return (
    <div className="dashboard-page">
      <header className="dashboard-page-header">
        <div><h1>Dashboard</h1><p>Monitor performance and quality trends across the organization.</p></div>
        <label className="dashboard-view-select">
          <span className="dashboard-select-control"><BarChart3 size={16} /><span className="dashboard-select-label">Dashboard View:</span><select value={view} onChange={(event) => router.push(`/dashboard?view=${event.target.value}`)}><option value="overview">Overview</option><option value="ncr">NCR Information</option></select><ChevronDown className="dashboard-select-chevron" size={16} /></span>
        </label>
      </header>
      {view === "ncr" ? <NcrDashboard /> : <ComingSoon title="QMS Overview" description="Organization-wide quality insights will appear here." />}
    </div>
  );
}
