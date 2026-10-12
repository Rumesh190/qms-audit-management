export type Checklist = {
  id:string; name:string; code:string; description?:string; categoryIds:string[];
  lastPublication?:string; active:boolean;
  status?:"Active"|"Inactive"; auditType?:string; categoryCount?:number;
  questionCount?:number; scoringEnabled?:boolean;
};

export const checklists:Checklist[]=[
  {id:"CHK-001",code:"CQ",name:"Common Question",description:"Shared checklist questions used across audit programs.",categoryIds:["CAT-001","CAT-002","CAT-004","CAT-003"],lastPublication:"13 Jul 2026, 11:00 AM",active:true,status:"Active",auditType:"Internal Audit",categoryCount:4,questionCount:5},
  {id:"CHK-002",code:"ENG",name:"Engineering",description:"Engineering process and operational control checks.",categoryIds:["CAT-004","CAT-005"],lastPublication:"08 Jul 2026, 02:30 PM",active:true,status:"Active",auditType:"Process Audit",categoryCount:2,questionCount:5},
  {id:"CHK-003",code:"IH",name:"Industrial Hygiene",description:"Workplace health and industrial hygiene requirements.",categoryIds:["CAT-002","CAT-003"],lastPublication:"29 Jun 2026, 09:45 AM",active:true,status:"Active",auditType:"Compliance Audit",categoryCount:2,questionCount:5},
  {id:"CHK-004",code:"SE",name:"Service Execution",description:"Service delivery and execution control checks.",categoryIds:["CAT-005","CAT-004"],active:true,status:"Active",auditType:"Process Audit",categoryCount:2,questionCount:5},
  {id:"CHK-005",code:"FIN",name:"Finance",description:"Financial process and internal control checks.",categoryIds:["CAT-007"],lastPublication:"17 Jun 2026, 04:20 PM",active:false,status:"Inactive",auditType:"Internal Audit",categoryCount:1,questionCount:5},
  {id:"CHK-006",code:"SC",name:"Safety Compliance",description:"Operational safety compliance requirements.",categoryIds:["CAT-003","CAT-001"],lastPublication:"02 Jun 2026, 11:15 AM",active:true,status:"Active",auditType:"Compliance Audit",categoryCount:2,questionCount:5},
];

export function readChecklists(){return localChecklists;}
const localChecklists:Checklist[]=[...checklists];
const createdChecklistIds=new Set<string>();
export function findChecklist(id:string){return localChecklists.find((item)=>item.id.toLowerCase()===id.toLowerCase());}
export function isCreatedChecklist(id:string){return createdChecklistIds.has(id);}
export function saveChecklist(record:Checklist){const index=localChecklists.findIndex((item)=>item.id===record.id);if(index>=0)localChecklists[index]=record;else{localChecklists.push(record);createdChecklistIds.add(record.id);}}
export function nextChecklistId(){const value=Math.max(0,...localChecklists.map((item)=>Number(item.id.replace("CHK-",""))||0))+1;return `CHK-${String(value).padStart(3,"0")}`;}
