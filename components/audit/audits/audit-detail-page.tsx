"use client";

import Link from "next/link";
import { ChevronLeft, ClipboardCheck, Users } from "lucide-react";
import { audits } from "@/data/audits";

export function AuditDetailPage({ auditId }: { auditId: string }) {
  const audit = audits.find((item) => item.id === auditId) ?? audits[0];
  return <div className="audit-detail-page"><header><Link href="/audit/audits"><ChevronLeft size={16} />Audits</Link><div><span className={`audit-status ${audit.status.toLowerCase().replaceAll(" ","-")}`}>{audit.status}</span><h1>{audit.title}</h1><p>{audit.auditNumber} · {audit.auditType}</p></div></header><div className="audit-detail-grid"><section><h2><ClipboardCheck size={18} />Audit Summary</h2><dl><div><dt>Checklist</dt><dd>{audit.checklistName}</dd></div><div><dt>Location</dt><dd>{audit.location}</dd></div><div><dt>Schedule</dt><dd>{audit.startDate} – {audit.endDate}</dd></div><div><dt>Findings</dt><dd>{audit.findingsCount}</dd></div></dl></section><section><h2><Users size={18} />Audit Team</h2><dl><div><dt>Lead Auditor</dt><dd>{audit.leadAuditor}</dd></div><div><dt>Additional Auditors</dt><dd>{audit.auditors.join(", ") || "None"}</dd></div></dl></section></div><div className="audit-execution-placeholder"><ClipboardCheck size={27} /><h2>Audit execution coming next</h2><p>Audit execution will be implemented in the next phase.</p></div></div>;
}
