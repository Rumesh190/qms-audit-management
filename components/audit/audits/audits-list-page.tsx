"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { audits, auditStatusOptions, type Audit, type AuditStatus } from "@/data/audits";
import { readAuditTypes } from "@/data/audit-types";
import { MasterDataEmpty } from "@/components/audit-settings/master-data-ui";

type StatusFilter = (typeof auditStatusOptions)[number];

function actionsFor(status: AuditStatus) {
  if (status === "Draft") return ["Edit", "Duplicate", "Delete"];
  if (status === "Scheduled") return ["View", "Edit", "Start Audit", "Duplicate"];
  if (status === "In Progress") return ["Continue Audit", "View", "Duplicate"];
  if (status === "Awaiting Review") return ["Review", "View"];
  return ["View", "Download Report"];
}

function AuditActions({ audit, onNotify }: { audit: Audit; onNotify: (message: string) => void }) {
  const router = useRouter();
  const handle = (action: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
    if (action === "View" || action === "Review" || action === "Continue Audit") router.push(`/audit/audits/${audit.id}`);
    else if (action === "Edit" && audit.status === "Draft") router.push(`/audit/audits/new`);
    else onNotify(`${action} for ${audit.auditNumber} will be available in the next phase.`);
  };
  return <details className="row-actions"><summary aria-label={`Actions for ${audit.auditNumber}`}><MoreHorizontal size={20} /></summary><div className="row-actions-menu audit-actions-menu">{actionsFor(audit.status).map((action) => <button type="button" key={action} onClick={(event) => handle(action,event)}>{action}</button>)}</div></details>;
}

export function AuditsListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [auditType, setAuditType] = useState("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [location, setLocation] = useState("All");
  const [toast, setToast] = useState("");
  const auditTypeOptions=useMemo(()=>["All",...readAuditTypes().map((item)=>item.name)],[]);
  const locations = ["All", ...Array.from(new Set(audits.map((audit) => audit.location)))];
  const completion = searchParams.get("created");
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return audits.filter((audit) => (!search || [audit.title,audit.auditNumber,audit.location,audit.leadAuditor,audit.checklistName].join(" ").toLowerCase().includes(search)) && (auditType === "All" || audit.auditType === auditType) && (status === "All" || audit.status === status) && (location === "All" || audit.location === location));
  }, [query,auditType,status,location]);
  const clearFilters = () => { setQuery(""); setAuditType("All"); setStatus("All"); setLocation("All"); };
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""),2600); };

  return <div className="audits-list-page"><header className="audit-list-header"><div><h1>Audits</h1><p>Plan, schedule and manage quality audits across the organization.</p></div><button type="button" className="primary-button" onClick={() => router.push("/audit/audits/new")}><Plus size={17} />Create Audit</button></header>
    <div className="auditors-toolbar audit-toolbar"><label className="auditor-search"><Search size={17} /><span className="sr-only">Search audits</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search audits..." /></label><label className="filter-control"><span>Audit Type</span><select value={auditType} onChange={(event) => setAuditType(event.target.value)}>{auditTypeOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="filter-control"><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>{auditStatusOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="filter-control"><span>Location</span><select value={location} onChange={(event) => setLocation(event.target.value)}>{locations.map((item) => <option key={item}>{item}</option>)}</select></label></div>
    <div className="record-count" aria-live="polite">{filtered.length === audits.length ? `${audits.length} audits` : `${filtered.length} of ${audits.length} audits`}</div>
    <div className="auditors-table-frame">{filtered.length ? <div className="auditors-table-scroll"><table className="auditors-table audits-table"><thead><tr><th>Audit</th><th>Audit Type</th><th>Checklist</th><th>Lead Auditor</th><th>Location</th><th>Schedule</th><th>Status</th><th>Findings</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filtered.map((audit) => <tr key={audit.id}><td><button type="button" className="audit-name" onClick={() => router.push(`/audit/audits/${audit.id}`)}><strong>{audit.title}</strong><small>{audit.auditNumber}</small></button></td><td><span className="type-badge">{audit.auditType}</span></td><td>{audit.checklistName}</td><td>{audit.leadAuditor}</td><td>{audit.location}</td><td><div className="schedule-cell"><span>{audit.startDate}</span><small>to {audit.endDate}</small></div></td><td><span className={`audit-status ${audit.status.toLowerCase().replaceAll(" ","-")}`}>{audit.status}</span></td><td className="findings-cell">{audit.findingsCount}</td><td><AuditActions audit={audit} onNotify={notify} /></td></tr>)}</tbody></table></div> : <MasterDataEmpty noun="audits" onClear={clearFilters} />}</div>
    {completion && <div className="qms-toast" role="status">{completion === "draft" ? "Audit saved as draft." : "Audit created successfully."}</div>}{toast && <div className="qms-toast" role="status">{toast}</div>}
  </div>;
}
