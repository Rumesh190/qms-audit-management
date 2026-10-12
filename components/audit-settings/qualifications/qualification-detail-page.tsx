"use client";

import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";
import { readQualifications } from "@/data/qualifications";
import { MasterDataStatusBadge } from "../master-data-ui";

export function QualificationDetailPage({qualificationId}:{qualificationId:string}){
  const qualification=readQualifications().find((item)=>item.id===qualificationId);
  if(!qualification)return <div className="auditor-not-found"><h2>Qualification not found</h2><Link className="secondary-button" href="/audit/settings/qualifications">Back to Qualifications</Link></div>;
  return <div className="qualification-detail"><header className="qualification-detail-header"><div><Link href="/audit/settings/qualifications"><ChevronLeft size={16}/>Qualifications</Link><h2>{qualification.name}</h2><p>Record No. {qualification.recordNo}</p></div><Link className="primary-button" href={`/audit/settings/qualifications/${qualification.id}/edit`}><Pencil size={16}/>Edit Qualification</Link></header><section><dl><div><dt>Qualification</dt><dd>{qualification.name}</dd></div><div><dt>Type of Auditor</dt><dd>{qualification.auditorType}</dd></div><div><dt>Status</dt><dd><MasterDataStatusBadge status={qualification.status}/></dd></div><div><dt>Record No.</dt><dd>{qualification.recordNo}</dd></div></dl></section></div>;
}
