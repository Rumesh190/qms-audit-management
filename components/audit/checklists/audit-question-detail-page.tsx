"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft,Pencil } from "lucide-react";
import { auditTemplates,readAuditTemplates,type AuditTemplate } from "@/data/audit-templates";
import { predefinedAnswerLists,readPredefinedAnswerLists,type PredefinedAnswerList } from "@/data/predefined-answer-lists";
import { findConfigurationQuestion,type ConfigurationQuestion } from "@/data/checklist-configuration-details";
import { findChecklist,isCreatedChecklist,type Checklist } from "@/data/checklists";

export function AuditQuestionDetailPage({checklistId,questionId}:{checklistId:string;questionId:string}){
  const router=useRouter();const [checklist,setChecklist]=useState<Checklist|null>(null);const [question,setQuestion]=useState<ConfigurationQuestion|null>(null);const [templates,setTemplates]=useState<AuditTemplate[]>(auditTemplates);const [answerLists,setAnswerLists]=useState<PredefinedAnswerList[]>(predefinedAnswerLists);
  useEffect(()=>{const frame=window.requestAnimationFrame(()=>{const record=findChecklist(checklistId)??null;setChecklist(record);setQuestion(record?findConfigurationQuestion(record.id,questionId,isCreatedChecklist(record.id))??null:null);setTemplates(readAuditTemplates());setAnswerLists(readPredefinedAnswerLists());});return()=>window.cancelAnimationFrame(frame);},[checklistId,questionId]);
  const checklistPath=checklist?`/audit/checklist/configuration/${checklist.id.toLowerCase()}`:"/audit/checklist/configuration";
  if(!checklist||!question)return <div className="checklist-placeholder-page"><Link href={checklistPath}><ArrowLeft size={16}/>Checklist Configuration</Link><div><h1>Audit question not found</h1><p>Return to the configuration and select an available question.</p></div></div>;
  const templateName=templates.find((item)=>item.id===question.templateId)?.name??"—";const answerListName=answerLists.find((item)=>item.id===question.predefinedAnswerListId)?.name??"—";
  return <div className="audit-question-detail-page"><header className="checklist-form-header"><div><Link href={checklistPath}><ArrowLeft size={16}/>{checklist.name}</Link><h1>Audit Question</h1><p>{question.question}</p></div><button type="button" className="primary-button" onClick={()=>router.push(`${checklistPath}/questions/${question.id.toLowerCase()}/edit`)}><Pencil size={16}/>Edit Question</button></header><section className="audit-question-readonly"><h2>Details</h2><dl><Detail label="Checklist" value={checklist.name}/><Detail label="Code" value={question.code}/><Detail label="Use Existing Section" value={question.useExistingSection?"Yes":"No"}/><Detail label="Standard" value={question.standard}/><Detail label="ISO Clause" value={question.isoClause}/><Detail label="Description" value={question.isoDescription} wide/><Detail label="Existing Section" value={question.useExistingSection?question.section:"—"}/><Detail label="Question" value={question.question} wide/><Detail label="Examples / Expected Evidence" value={question.expectedEvidence} wide/><Detail label="Hint" value={question.hint} wide/><Detail label="HTML Template" value={templateName}/><Detail label="Answer Type" value={question.answerType}/><Detail label="Sort Order" value={String(question.sortOrder)}/><Detail label="Weight" value={question.weight===undefined?"—":String(question.weight)}/><Detail label="Predefined Answer List" value={answerListName}/><Detail label="Answer Required" value={question.answerRequired?"Yes":"No"}/><Detail label="Active" value={question.active?"Active":"Inactive"}/></dl></section></div>;
}

function Detail({label,value,wide=false}:{label:string;value:string;wide?:boolean}){return <div className={wide?"audit-question-detail-wide":""}><dt>{label}</dt><dd>{value||"—"}</dd></div>}
