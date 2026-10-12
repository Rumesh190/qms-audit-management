"use client";

import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";
import { readPredefinedAnswerLists } from "@/data/predefined-answer-lists";
import { MasterDataStatusBadge } from "../master-data-ui";

export function PredefinedAnswerListDetailPage({answerListId}:{answerListId:string}){const list=readPredefinedAnswerLists().find((item)=>item.id===answerListId);if(!list)return <div className="auditor-not-found"><h2>Predefined answer list not found</h2><Link className="secondary-button" href="/audit/settings/predefined-answer-lists">Back to Answer Lists</Link></div>;return <div className="qualification-detail answer-list-detail"><header className="qualification-detail-header"><div><Link href="/audit/settings/predefined-answer-lists"><ChevronLeft size={16}/>Predefined Answer Lists</Link><h2>{list.name}</h2></div><Link className="primary-button" href={`/audit/settings/predefined-answer-lists/${list.id}/edit`}><Pencil size={16}/>Edit Answer List</Link></header><section><dl><div><dt>Answer List Name</dt><dd>{list.name}</dd></div><div><dt>Status</dt><dd><MasterDataStatusBadge status={list.status}/></dd></div></dl><div className="ordered-answer-list"><h3>Answers</h3><ol>{[...list.answers].sort((a,b)=>a.order-b.order).map((answer)=><li key={answer.id}><span>{answer.order}</span>{answer.label}</li>)}</ol></div></section></div>;}
