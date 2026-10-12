"use client";

import Link from "next/link";
import { Award, ChevronLeft, FileText, MapPin, Pencil, UserRound } from "lucide-react";
import { readAuditors } from "@/data/auditors";
import { readQualifications } from "@/data/qualifications";
import { readSubjectMatterExpertise } from "@/data/subject-matter-expertise";
import { MasterDataStatusBadge } from "../master-data-ui";

export function AuditorDetailPage({ auditorId }:{auditorId:string}) {
  const auditor=readAuditors().find((item)=>item.id===auditorId);
  if(!auditor)return <div className="auditor-not-found"><h2>Auditor not found</h2><Link className="secondary-button" href="/audit/settings/auditors">Back to Auditors</Link></div>;
  const qualificationOptions=readQualifications();
  const expertiseOptions=readSubjectMatterExpertise();
  const qualificationNames=auditor.qualificationIds.map((id)=>qualificationOptions.find((item)=>item.id===id)?.name).filter(Boolean);
  const expertiseNames=auditor.subjectMatterExpertiseIds.map((id)=>expertiseOptions.find((item)=>item.id===id)?.name).filter(Boolean);
  return <div className="auditor-detail"><header className="auditor-detail-header"><div><Link href="/audit/settings/auditors"><ChevronLeft size={16}/>Auditors</Link><h2>{auditor.name}</h2><div className="auditor-detail-meta"><span><UserRound size={15}/>{auditor.type}</span><span><MapPin size={15}/>{auditor.location}</span><MasterDataStatusBadge status={auditor.status}/></div></div><Link className="primary-button" href={`/audit/settings/auditors/${auditor.id}/edit`}><Pencil size={16}/>Edit Auditor</Link></header>
    <div className="auditor-detail-sections"><section><h3>Auditor Details</h3><dl><div><dt>Auditor Name</dt><dd>{auditor.name}</dd></div>{auditor.email&&<div><dt>Email</dt><dd>{auditor.email}</dd></div>}<div><dt>Type of Auditor</dt><dd>{auditor.type}</dd></div><div><dt>Location</dt><dd>{auditor.location}</dd></div><div><dt>Status</dt><dd>{auditor.status}</dd></div></dl></section><section><h3><Award size={17}/>Qualifications</h3>{qualificationNames.length?<div className="detail-chip-list">{qualificationNames.map((name)=><span key={name}>{name}</span>)}</div>:<p>None assigned.</p>}</section><section><h3>Subject Matter Expertise</h3>{expertiseNames.length?<div className="detail-chip-list">{expertiseNames.map((name)=><span key={name}>{name}</span>)}</div>:<p>None assigned.</p>}</section><section><h3><FileText size={17}/>Attachments</h3>{auditor.attachments?.length?<div className="attachment-list">{auditor.attachments.map((file)=><div key={file.id}><FileText size={18}/><span><strong>{file.fileName}</strong><small>{file.fileType||"File"}</small></span></div>)}</div>:<p>No attachments.</p>}</section></div>
  </div>;
}
