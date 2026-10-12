export type AuditChecklistRecord = {
  id:string; dueDate:string; name:string; audit:string; auditor:string;
  progress:number; score?:number; findings:number; status:string; location:string;
};

export const auditChecklistRecords:AuditChecklistRecord[]=[
  {id:"ACL-001",dueDate:"12 Oct 2026",name:"HSEQ",audit:"System Audit – Engineering",auditor:"Aarthiya S R",progress:0,findings:0,status:"Open",location:"Chennai"},
  {id:"ACL-002",dueDate:"15 Oct 2026",name:"Quality Process Review",audit:"Q4 Internal Quality Audit",auditor:"Meera Krishnan",progress:4,score:4.12,findings:0,status:"Open",location:"Bengaluru"},
  {id:"ACL-003",dueDate:"18 Oct 2026",name:"Environmental Compliance",audit:"Environmental Site Audit",auditor:"Rahul Menon",progress:38,score:41.25,findings:1,status:"Open",location:"Pune"},
  {id:"ACL-004",dueDate:"20 Oct 2026",name:"Engineering Controls",audit:"Engineering Process Audit",auditor:"Sneha Iyer",progress:72,score:76.4,findings:3,status:"Open",location:"Chennai"},
  {id:"ACL-005",dueDate:"22 Oct 2026",name:"Industrial Hygiene",audit:"Workplace Health Audit",auditor:"Andrew Vincent",progress:0,findings:0,status:"Open",location:"Hyderabad"},
  {id:"ACL-006",dueDate:"24 Oct 2026",name:"Service Execution",audit:"Service Process Audit",auditor:"Divya Raman",progress:4,findings:0,status:"Open",location:"Mumbai"},
  {id:"ACL-007",dueDate:"27 Oct 2026",name:"Safety Compliance",audit:"Operational Safety Audit",auditor:"Ajay Kumar",progress:38,score:45.8,findings:1,status:"Open",location:"Coimbatore"},
  {id:"ACL-008",dueDate:"29 Oct 2026",name:"Documentation Control",audit:"Document Control Audit",auditor:"Nisha Thomas",progress:72,score:81.2,findings:2,status:"Open",location:"Bengaluru"},
  {id:"ACL-009",dueDate:"02 Nov 2026",name:"Supplier Quality Review",audit:"External Provider Audit",auditor:"Karthik Iyer",progress:0,findings:0,status:"Open",location:"Pune"},
  {id:"ACL-010",dueDate:"05 Nov 2026",name:"Finance Controls",audit:"Finance Process Audit",auditor:"Priya Nair",progress:4,findings:0,status:"Open",location:"Chennai"},
  {id:"ACL-011",dueDate:"08 Nov 2026",name:"Operations Review",audit:"Operations Conformance Audit",auditor:"Vikram Rao",progress:38,score:52.65,findings:1,status:"Open",location:"Mumbai"},
  {id:"ACL-012",dueDate:"11 Nov 2026",name:"Health and Safety",audit:"HSE Management Audit",auditor:"Lakshmi Devi",progress:72,score:78.9,findings:3,status:"Open",location:"Hyderabad"},
];

export function findAuditChecklistRecord(id:string){return auditChecklistRecords.find((item)=>item.id.toLowerCase()===id.toLowerCase());}
