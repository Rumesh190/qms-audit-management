"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, ChevronLeft, FileText, Paperclip, Search, X } from "lucide-react";
import { readAuditors, writeAuditors, type Auditor, type AuditorAttachment, type AuditorStatus, type AuditorType } from "@/data/auditors";
import { readQualifications } from "@/data/qualifications";
import { readSubjectMatterExpertise } from "@/data/subject-matter-expertise";

type MultiSelectProps = { title:string; values:{id:string;name:string;status:string}[]; selected:string[]; onChange:(ids:string[])=>void; placeholder:string };

function MultiSelect({ title, values, selected, onChange, placeholder }: MultiSelectProps) {
  const [query,setQuery] = useState("");
  const shown = values.filter((item) => item.status === "Active" || selected.includes(item.id)).filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  const toggle = (id:string) => onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected,id]);
  return <section className="auditor-form-section multi-select-section"><header><h2>{title}</h2><p>Select one or more values from the existing {title.toLowerCase()} master.</p></header>
    {selected.length > 0 && <div className="selection-chips">{selected.map((id) => { const item=values.find((value)=>value.id===id); return item ? <span key={id}>{item.name}<button type="button" onClick={()=>toggle(id)} aria-label={`Remove ${item.name}`}><X size={13}/></button></span> : null; })}</div>}
    <label className="master-option-search"><Search size={16}/><span className="sr-only">{placeholder}</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder={placeholder}/></label>
    <div className="master-option-list">{shown.map((item)=><label key={item.id} className={selected.includes(item.id)?"selected":""}><input type="checkbox" checked={selected.includes(item.id)} onChange={()=>toggle(item.id)}/><span>{item.name}</span>{selected.includes(item.id)&&<Check size={15}/>}</label>)}</div>
  </section>;
}

export function AuditorForm({ auditorId }: { auditorId?:string }) {
  const router=useRouter();
  const fileRef=useRef<HTMLInputElement>(null);
  const existing=useMemo(()=>auditorId ? readAuditors().find((item)=>item.id===auditorId) : undefined,[auditorId]);
  const qualificationOptions=useMemo(()=>readQualifications(),[]);
  const expertiseOptions=useMemo(()=>readSubjectMatterExpertise(),[]);
  const [form,setForm]=useState({ name:existing?.name??"", email:existing?.email??"", type:(existing?.type??"Internal") as AuditorType, location:existing?.location??"", status:(existing?.status??"Active") as AuditorStatus, qualificationIds:existing?.qualificationIds??[], subjectMatterExpertiseIds:existing?.subjectMatterExpertiseIds??[], attachments:existing?.attachments??[] as AuditorAttachment[] });
  const [errors,setErrors]=useState<Record<string,string>>({});
  const update=<K extends keyof typeof form>(key:K,value:(typeof form)[K])=>setForm((current)=>({...current,[key]:value}));
  const addFiles=(files:FileList|null)=>{ if(!files)return; const added=Array.from(files).map((file,index)=>({id:`attachment-${Date.now()}-${index}`,fileName:file.name,fileType:file.type||undefined})); update("attachments",[...form.attachments,...added]); if(fileRef.current)fileRef.current.value=""; };
  const save=()=>{ const nextErrors:Record<string,string>={}; if(!form.name.trim())nextErrors.name="Auditor name is required."; if(!form.type)nextErrors.type="Type of auditor is required."; if(!form.location.trim())nextErrors.location="Location is required."; setErrors(nextErrors); if(Object.keys(nextErrors).length)return;
    const current=readAuditors(); const record:Auditor={id:existing?.id??`AUD-${String(Math.max(0,...current.map((item)=>Number(item.id.replace("AUD-",""))||0))+1).padStart(3,"0")}`,name:form.name.trim(),email:form.email.trim(),type:form.type,location:form.location.trim(),status:form.status,qualificationIds:form.qualificationIds,subjectMatterExpertiseIds:form.subjectMatterExpertiseIds,attachments:form.attachments};
    writeAuditors(existing?current.map((item)=>item.id===record.id?record:item):[...current,record]); router.push(`/audit/settings/auditors?saved=${existing?"updated":"added"}`); };
  return <div className="auditor-editor"><header className="auditor-editor-header"><div><Link href="/audit/settings/auditors"><ChevronLeft size={16}/>Auditors</Link><h2>{existing?"Edit Auditor":"Add Auditor"}</h2><p>{existing?"Update the auditor details and competency assignments.":"Add an auditor and assign qualifications and subject matter expertise."}</p></div><div className="auditor-header-actions"><button type="button" className="secondary-button" onClick={()=>router.back()}>Cancel</button><button type="button" className="primary-button" onClick={save}>{existing?"Save Changes":"Save Auditor"}</button></div></header>
    <div className="auditor-form-sections"><section className="auditor-form-section"><header><h2>Auditor Details</h2><p>Enter the core information used in audit planning and assignment.</p></header><div className="auditor-details-grid"><label><span>Auditor Name <i>*</i></span><input value={form.name} onChange={(event)=>update("name",event.target.value)}/>{errors.name&&<small>{errors.name}</small>}</label><label><span>Email</span><input type="email" value={form.email} onChange={(event)=>update("email",event.target.value)}/></label><label><span>Type of Auditor <i>*</i></span><select value={form.type} onChange={(event)=>update("type",event.target.value as AuditorType)}><option>Internal</option><option>External</option></select>{errors.type&&<small>{errors.type}</small>}</label><label><span>Location <i>*</i></span><input value={form.location} onChange={(event)=>update("location",event.target.value)}/>{errors.location&&<small>{errors.location}</small>}</label><label><span>Status</span><select value={form.status} onChange={(event)=>update("status",event.target.value as AuditorStatus)}><option>Active</option><option>Inactive</option></select></label></div></section>
      <MultiSelect title="Qualifications" values={qualificationOptions} selected={form.qualificationIds} onChange={(ids)=>update("qualificationIds",ids)} placeholder="Search qualifications..."/>
      <MultiSelect title="Subject Matter Expertise" values={expertiseOptions} selected={form.subjectMatterExpertiseIds} onChange={(ids)=>update("subjectMatterExpertiseIds",ids)} placeholder="Search expertise areas..."/>
      <section className="auditor-form-section"><header><h2>Attachments</h2><p>Add auditor training certificates or supporting files. Files remain local to this browser.</p></header><input ref={fileRef} className="sr-only" type="file" multiple onChange={(event)=>addFiles(event.target.files)}/><button type="button" className="attachment-picker" onClick={()=>fileRef.current?.click()}><Paperclip size={17}/>Select files</button>{form.attachments.length?<div className="attachment-list">{form.attachments.map((file)=><div key={file.id}><FileText size={18}/><span><strong>{file.fileName}</strong><small>{file.fileType||"File"}</small></span><button type="button" onClick={()=>update("attachments",form.attachments.filter((item)=>item.id!==file.id))} aria-label={`Remove ${file.fileName}`}><X size={17}/></button></div>)}</div>:<p className="no-attachments">No attachments selected.</p>}</section>
    </div>
  </div>;
}
