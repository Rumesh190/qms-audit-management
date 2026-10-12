"use client";

import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";
import { readAuditTypes } from "@/data/audit-types";
import { MasterDataStatusBadge } from "../master-data-ui";

export function AuditTypeDetailPage({auditTypeId}:{auditTypeId:string}){const auditType=readAuditTypes().find((item)=>item.id===auditTypeId);if(!auditType)return <div className="auditor-not-found"><h2>Audit type not found</h2><Link className="secondary-button" href="/audit/settings/audit-types">Back to Audit Types</Link></div>;return <div className="qualification-detail"><header className="qualification-detail-header"><div><Link href="/audit/settings/audit-types"><ChevronLeft size={16}/>Audit Types</Link><h2>{auditType.name}</h2></div><Link className="primary-button" href={`/audit/settings/audit-types/${auditType.id}/edit`}><Pencil size={16}/>Edit Audit Type</Link></header><section><dl><div><dt>Audit Type</dt><dd>{auditType.name}</dd></div><div><dt>Status</dt><dd><MasterDataStatusBadge status={auditType.status}/></dd></div></dl></section></div>;}
