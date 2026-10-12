"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { auditTemplates, readAuditTemplates, writeAuditTemplates, type AuditTemplate, type AuditTemplateStatus, type AuditTemplateType } from "@/data/audit-templates";
import { MasterDataEmpty, MasterDataStatusBadge } from "../master-data-ui";

type TypeFilter = "All" | AuditTemplateType;
type StatusFilter = "All" | AuditTemplateStatus;

function TemplateActions({ item, onStatus }: { item: AuditTemplate; onStatus: (item: AuditTemplate) => void }) {
  const router = useRouter();
  const act = (action: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
    if (action === "View") router.push(`/audit/settings/templates/${item.id}`);
    else if (action === "Edit") router.push(`/audit/settings/templates/${item.id}/edit`);
    else onStatus(item);
  };
  return <details className="row-actions"><summary aria-label={`Actions for ${item.name}`}><MoreHorizontal size={20} /></summary><div className="row-actions-menu">{["View", "Edit", item.status === "Active" ? "Deactivate" : "Activate"].map((action) => <button key={action} type="button" onClick={(event) => act(action, event)}>{action}</button>)}</div></details>;
}

function TemplatesTable({ rows, onStatus, onClear }: { rows: AuditTemplate[]; onStatus: (item: AuditTemplate) => void; onClear: () => void }) {
  if (!rows.length) return <MasterDataEmpty noun="templates" onClear={onClear} />;
  return <div className="auditors-table-scroll"><table className="auditors-table templates-table"><thead><tr><th>Code</th><th>Template Name</th><th>Type</th><th>Sort Order</th><th>Parameters</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{rows.map((item) => <tr key={item.id}><td><span className="template-code">{item.code || "—"}</span></td><td><strong className="category-name">{item.name}</strong></td><td>{item.type}</td><td>{item.sortOrder}</td><td><span className="template-parameters" title={item.parameters}>{item.parameters || "—"}</span></td><td><MasterDataStatusBadge status={item.status} /></td><td><TemplateActions item={item} onStatus={onStatus} /></td></tr>)}</tbody></table></div>;
}

export function TemplatesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rows, setRows] = useState<AuditTemplate[]>(auditTemplates);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [toast, setToast] = useState("");
  useEffect(() => { const frame = window.requestAnimationFrame(() => setRows(readAuditTemplates())); return () => window.cancelAnimationFrame(frame); }, []);
  const filtered = useMemo(() => { const search = query.trim().toLowerCase(); return rows.filter((item) => (!search || [item.code, item.name, item.type, item.template, item.parameters ?? ""].join(" ").toLowerCase().includes(search)) && (type === "All" || item.type === type) && (status === "All" || item.status === status)); }, [rows, query, type, status]);
  const clearFilters = () => { setQuery(""); setType("All"); setStatus("All"); };
  const toggleStatus = (item: AuditTemplate) => { const next = rows.map((row) => row.id === item.id ? { ...row, status: (row.status === "Active" ? "Inactive" : "Active") as AuditTemplateStatus } : row); setRows(next); writeAuditTemplates(next); setToast(`Template ${item.status === "Active" ? "deactivated" : "activated"} successfully.`); window.setTimeout(() => setToast(""), 3000); };
  const saved = searchParams.get("saved");
  return <div className="auditors-page templates-page"><div className="auditors-page-header"><div><h2>HTML Templates</h2><p>Manage reusable answer and question HTML templates used in audit checklists.</p></div><button type="button" className="primary-button" onClick={() => router.push("/audit/settings/templates/new")}><Plus size={17} />Add HTML Template</button></div><div className="auditors-toolbar"><label className="auditor-search"><Search size={17} /><span className="sr-only">Search templates</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search templates..." /></label><label className="filter-control"><span>Type</span><select value={type} onChange={(event) => setType(event.target.value as TypeFilter)}><option>All</option><option>Question</option><option>Answer</option></select></label><label className="filter-control"><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}><option>All</option><option>Active</option><option>Inactive</option></select></label></div><div className="record-count" aria-live="polite">{filtered.length === rows.length ? `${rows.length} templates` : `${filtered.length} of ${rows.length} templates`}</div><div className="auditors-table-frame"><TemplatesTable rows={filtered} onStatus={toggleStatus} onClear={clearFilters} /></div>{(toast || saved) && <div className="qms-toast" role="status">{toast || (saved === "updated" ? "Template updated successfully." : "Template added successfully.")}</div>}</div>;
}
