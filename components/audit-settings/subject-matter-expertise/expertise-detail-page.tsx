"use client";

import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";
import { readSubjectMatterExpertise } from "@/data/subject-matter-expertise";
import { MasterDataStatusBadge } from "../master-data-ui";

export function ExpertiseDetailPage({expertiseId}:{expertiseId:string}){const expertise=readSubjectMatterExpertise().find((item)=>item.id===expertiseId);if(!expertise)return <div className="auditor-not-found"><h2>Expertise area not found</h2><Link className="secondary-button" href="/audit/settings/subject-matter-expertise">Back to Subject Matter Expertise</Link></div>;return <div className="qualification-detail"><header className="qualification-detail-header"><div><Link href="/audit/settings/subject-matter-expertise"><ChevronLeft size={16}/>Subject Matter Expertise</Link><h2>{expertise.name}</h2><p>Record No. {expertise.recordNo}</p></div><Link className="primary-button" href={`/audit/settings/subject-matter-expertise/${expertise.id}/edit`}><Pencil size={16}/>Edit Expertise</Link></header><section><dl><div><dt>Subject Matter Expertise</dt><dd>{expertise.name}</dd></div><div><dt>Status</dt><dd><MasterDataStatusBadge status={expertise.status}/></dd></div><div><dt>Record No.</dt><dd>{expertise.recordNo}</dd></div></dl></section></div>;}
