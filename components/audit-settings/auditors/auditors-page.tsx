"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { auditors, readAuditors, writeAuditors, type Auditor, type AuditorStatus, type AuditorType } from "@/data/auditors";
import { readQualifications } from "@/data/qualifications";
import { readSubjectMatterExpertise } from "@/data/subject-matter-expertise";
import { MasterDataEmpty, MasterDataStatusBadge } from "../master-data-ui";

type TypeFilter = "All" | AuditorType;
type StatusFilter = "All" | AuditorStatus;
const initials=(name:string)=>name.split(" ").filter(Boolean).slice(0,2).map((part)=>part[0]).join("").toUpperCase();
function CompactList({items}:{items:string[]}){return <div className="compact-list">{items.slice(0,2).map((item)=><span key={item}>{item}</span>)}{items.length>2&&<small>+{items.length-2} more</small>}</div>;}

function AuditorActions({auditor,onStatus}:{auditor:Auditor;onStatus:(auditor:Auditor)=>void}){
  const router=useRouter();
  const act=(action:string,event:React.MouseEvent<HTMLButtonElement>)=>{event.currentTarget.closest("details")?.removeAttribute("open");if(action==="View")router.push(`/audit/settings/auditors/${auditor.id}`);else if(action==="Edit")router.push(`/audit/settings/auditors/${auditor.id}/edit`);else onStatus(auditor);};
  return <details className="row-actions"><summary aria-label={`Actions for ${auditor.name}`}><MoreHorizontal size={20}/></summary><div className="row-actions-menu">{["View","Edit",auditor.status==="Active"?"Deactivate":"Activate"].map((action)=><button key={action} type="button" onClick={(event)=>act(action,event)}>{action}</button>)}</div></details>;
}

function AuditorsTable({rows,onStatus,onClear}:{rows:Auditor[];onStatus:(auditor:Auditor)=>void;onClear:()=>void}){
  const qualificationOptions=useMemo(()=>readQualifications(),[]);
  const expertiseOptions=useMemo(()=>readSubjectMatterExpertise(),[]);
  if(!rows.length)return <MasterDataEmpty noun="auditors" onClear={onClear}/>;
  return <div className="auditors-table-scroll"><table className="auditors-table"><thead><tr><th>Auditor</th><th>Type</th><th>Qualifications</th><th>Subject Matter Expertise</th><th>Location</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{rows.map((auditor)=>{
    const qualificationNames=auditor.qualificationIds.map((id)=>qualificationOptions.find((item)=>item.id===id)?.name).filter((name):name is string=>Boolean(name));
    const expertiseNames=auditor.subjectMatterExpertiseIds.map((id)=>expertiseOptions.find((item)=>item.id===id)?.name).filter((name):name is string=>Boolean(name));
    return <tr key={auditor.id}><td><div className="auditor-person"><span className="auditor-avatar">{initials(auditor.name)}</span><div><strong>{auditor.name}</strong><small>{auditor.email}</small></div></div></td><td><span className={`type-badge ${auditor.type.toLowerCase()}`}>{auditor.type}</span></td><td><CompactList items={qualificationNames}/></td><td><CompactList items={expertiseNames}/></td><td className="location-cell">{auditor.location}</td><td><MasterDataStatusBadge status={auditor.status}/></td><td><AuditorActions auditor={auditor} onStatus={onStatus}/></td></tr>;
  })}</tbody></table></div>;
}

export function AuditorsPage(){
  const router=useRouter();const searchParams=useSearchParams();
  const [auditorRows,setAuditorRows]=useState<Auditor[]>(auditors);const [query,setQuery]=useState("");const [type,setType]=useState<TypeFilter>("All");const [status,setStatus]=useState<StatusFilter>("All");const [toast,setToast]=useState("");
  useEffect(()=>{const frame=window.requestAnimationFrame(()=>setAuditorRows(readAuditors()));return()=>window.cancelAnimationFrame(frame);},[]);
  const qualificationOptions=useMemo(()=>readQualifications(),[]);
  const expertiseOptions=useMemo(()=>readSubjectMatterExpertise(),[]);
  const filteredAuditors=useMemo(()=>{const search=query.trim().toLowerCase();return auditorRows.filter((auditor)=>{const searchable=[auditor.name,auditor.location,...auditor.qualificationIds.map((id)=>qualificationOptions.find((item)=>item.id===id)?.name??""),...auditor.subjectMatterExpertiseIds.map((id)=>expertiseOptions.find((item)=>item.id===id)?.name??"")].join(" ").toLowerCase();return(!search||searchable.includes(search))&&(type==="All"||auditor.type===type)&&(status==="All"||auditor.status===status);});},[auditorRows,expertiseOptions,qualificationOptions,query,type,status]);
  const clearFilters=()=>{setQuery("");setType("All");setStatus("All");};
  const toggleStatus=(auditor:Auditor)=>{const next=auditorRows.map((item)=>item.id===auditor.id?{...item,status:(item.status==="Active"?"Inactive":"Active") as AuditorStatus}:item);setAuditorRows(next);writeAuditors(next);setToast(`Auditor ${auditor.status==="Active"?"deactivated":"activated"} successfully.`);window.setTimeout(()=>setToast(""),3000);};
  const saved=searchParams.get("saved");
  return <div className="auditors-page"><div className="auditors-page-header"><div><h2>Auditors</h2><p>Manage auditors available for audit planning and assignment.</p></div><button type="button" className="primary-button" onClick={()=>router.push("/audit/settings/auditors/new")}><Plus size={17}/>Add Auditor</button></div>
    <div className="auditors-toolbar"><label className="auditor-search"><Search size={17}/><span className="sr-only">Search auditors</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search auditors..."/></label><label className="filter-control"><span>Type</span><select value={type} onChange={(event)=>setType(event.target.value as TypeFilter)}><option>All</option><option>Internal</option><option>External</option></select></label><label className="filter-control"><span>Status</span><select value={status} onChange={(event)=>setStatus(event.target.value as StatusFilter)}><option>All</option><option>Active</option><option>Inactive</option></select></label></div>
    <div className="record-count" aria-live="polite">{filteredAuditors.length===auditorRows.length?`${auditorRows.length} auditors`:`${filteredAuditors.length} of ${auditorRows.length} auditors`}</div><div className="auditors-table-frame"><AuditorsTable rows={filteredAuditors} onStatus={toggleStatus} onClear={clearFilters}/></div>{(toast||saved)&&<div className="qms-toast" role="status">{toast||(saved==="updated"?"Auditor updated successfully.":"Auditor added successfully.")}</div>}
  </div>;
}
