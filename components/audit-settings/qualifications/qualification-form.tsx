"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { readQualifications, writeQualifications, type Qualification, type QualificationAuditorType, type QualificationStatus } from "@/data/qualifications";

export function QualificationForm({qualificationId}:{qualificationId?:string}){
  const router=useRouter();
  const existing=useMemo(()=>qualificationId?readQualifications().find((item)=>item.id===qualificationId):undefined,[qualificationId]);
  const [form,setForm]=useState({name:existing?.name??"",auditorType:(existing?.auditorType??"Lead Auditor") as QualificationAuditorType,status:(existing?.status??"Active") as QualificationStatus});
  const [errors,setErrors]=useState<Record<string,string>>({});
  const save=()=>{const current=readQualifications();const nextErrors:Record<string,string>={};if(!form.name.trim())nextErrors.name="Qualification is required.";if(!form.auditorType)nextErrors.auditorType="Type of Auditor is required.";if(current.some((item)=>item.id!==existing?.id&&item.name.trim().toLowerCase()===form.name.trim().toLowerCase()))nextErrors.name="A qualification with this name already exists.";setErrors(nextErrors);if(Object.keys(nextErrors).length)return;
    const nextRecordNo=Math.max(0,...current.map((item)=>item.recordNo))+1;const record:Qualification={id:existing?.id??`QLF-${String(nextRecordNo).padStart(3,"0")}`,recordNo:existing?.recordNo??nextRecordNo,name:form.name.trim(),auditorType:form.auditorType,status:form.status};writeQualifications(existing?current.map((item)=>item.id===record.id?record:item):[...current,record]);router.push(`/audit/settings/qualifications?saved=${existing?"updated":"added"}`);};
  return <div className="qualification-editor"><header className="qualification-editor-header"><div><Link href="/audit/settings/qualifications"><ChevronLeft size={16}/>Qualifications</Link><h2>{existing?"Edit Qualification":"Add Qualification"}</h2><p>{existing?"Update this auditor qualification.":"Add a qualification that can be assigned to auditors."}</p></div><div className="qualification-header-actions"><button type="button" className="secondary-button" onClick={()=>router.back()}>Cancel</button><button type="button" className="primary-button" onClick={save}>{existing?"Save Changes":"Save Qualification"}</button></div></header><section className="qualification-form-section"><div className="qualification-form-grid"><label><span>Qualification <i>*</i></span><input value={form.name} onChange={(event)=>setForm({...form,name:event.target.value})} placeholder="e.g. ISO 9001:2015 (QMS) (Lead)"/>{errors.name&&<small>{errors.name}</small>}</label><label><span>Type of Auditor <i>*</i></span><select value={form.auditorType} onChange={(event)=>setForm({...form,auditorType:event.target.value as QualificationAuditorType})}><option>Lead Auditor</option><option>Internal Auditor</option></select>{errors.auditorType&&<small>{errors.auditorType}</small>}</label><label><span>Status</span><select value={form.status} onChange={(event)=>setForm({...form,status:event.target.value as QualificationStatus})}><option>Active</option><option>Inactive</option></select></label></div></section></div>;
}
