"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { findAuditChecklistRecord } from "@/data/audit-checklist-records";

export function AuditChecklistDetailPage({checklistId}:{checklistId:string}){
  const record=findAuditChecklistRecord(checklistId);
  if(!record)return <div className="checklist-record-detail"><Link className="checklist-detail-back" href="/audit/checklist"><ArrowLeft size={16}/>Back to Checklists</Link><div className="checklist-record-not-found"><h1>Checklist not found</h1><p>The requested checklist record is unavailable.</p><Link className="secondary-button" href="/audit/checklist">Back to Checklists</Link></div></div>;
  const statusClass=record.status.toLowerCase().replace(/\s+/g,"-");const score=record.score===undefined?"—":`${record.score.toFixed(2).replace(/\.00$/,"")}%`;
  return <div className="checklist-record-detail"><header><div><Link className="checklist-detail-back" href="/audit/checklist"><ArrowLeft size={16}/>Back to Checklists</Link><h1>{record.name}</h1><p>{record.audit}</p></div></header><section className="checklist-record-summary"><h2>Checklist Details</h2><dl><Detail label="Audit" value={record.audit}/><Detail label="Auditor" value={record.auditor}/><Detail label="Due Date" value={record.dueDate}/><Detail label="Location" value={record.location}/><div><dt>Status</dt><dd><span className={`record-status ${statusClass}`}>{record.status}</span></dd></div><div><dt>Progress</dt><dd><div className="checklist-progress checklist-progress-detail"><span><i style={{width:`${record.progress}%`}}/></span><small>{record.progress}%</small></div></dd></div><Detail label="Score (%)" value={score}/><Detail label="No. of Findings" value={String(record.findings)}/></dl></section></div>;
}

function Detail({label,value}:{label:string;value:string}){return <div><dt>{label}</dt><dd>{value}</dd></div>}
