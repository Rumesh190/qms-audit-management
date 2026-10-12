"use client";

import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";
import { readDefaultDueDates } from "@/data/default-due-dates";
import { MasterDataStatusBadge } from "../master-data-ui";

export function DefaultDueDateDetailPage({dueDateId}:{dueDateId:string}){const item=readDefaultDueDates().find((dueDate)=>dueDate.id===dueDateId);if(!item)return <div className="auditor-not-found"><h2>Default due date not found</h2><Link className="secondary-button" href="/audit/settings/default-due-dates">Back to Default Due Dates</Link></div>;return <div className="qualification-detail"><header className="qualification-detail-header"><div><Link href="/audit/settings/default-due-dates"><ChevronLeft size={16}/>Default Due Dates</Link><h2>{item.name}</h2></div><Link className="primary-button" href={`/audit/settings/default-due-dates/${item.id}/edit`}><Pencil size={16}/>Edit Due Date</Link></header><section><dl><div><dt>Due Date</dt><dd>{item.name}</dd></div><div><dt>Duration Value</dt><dd>{item.value}</dd></div><div><dt>Duration Unit</dt><dd>{item.unit}</dd></div><div><dt>Status</dt><dd><MasterDataStatusBadge status={item.status}/></dd></div></dl></section></div>;}
