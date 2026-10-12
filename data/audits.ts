export type AuditStatus = "Draft" | "Scheduled" | "In Progress" | "Awaiting Review" | "Completed";
export type Audit = {
  id: string; auditNumber: string; title: string; auditType: string;
  checklistId: string; checklistName: string; location: string;
  leadAuditor: string; auditors: string[]; startDate: string; endDate: string;
  status: AuditStatus; findingsCount: number;
};

export const audits: Audit[] = [
  { id:"audit-001", auditNumber:"AUD-2026-001", title:"QMS Internal Audit – Chennai Plant", auditType:"Internal Audit", checklistId:"CHK-001", checklistName:"ISO 9001 Internal Audit", location:"Chennai", leadAuditor:"Aarthiya S R", auditors:["Andrew Vincent","Divya Raman"], startDate:"15 Oct 2026", endDate:"16 Oct 2026", status:"Scheduled", findingsCount:0 },
  { id:"audit-002", auditNumber:"AUD-2026-002", title:"Supplier Quality Audit – ABC Manufacturing", auditType:"Supplier Audit", checklistId:"CHK-004", checklistName:"Supplier Quality Audit", location:"Pune", leadAuditor:"Ajaykumar", auditors:["Sneha Iyer"], startDate:"10 Oct 2026", endDate:"12 Oct 2026", status:"In Progress", findingsCount:2 },
  { id:"audit-003", auditNumber:"AUD-2026-003", title:"Process Audit – Assembly Line 2", auditType:"Process Audit", checklistId:"CHK-005", checklistName:"Manufacturing Process Audit", location:"Bengaluru", leadAuditor:"Andrew Vincent", auditors:["Karthik Narayanan"], startDate:"22 Oct 2026", endDate:"22 Oct 2026", status:"Draft", findingsCount:0 },
  { id:"audit-004", auditNumber:"AUD-2026-004", title:"Environmental Compliance Audit", auditType:"Compliance Audit", checklistId:"CHK-002", checklistName:"ISO 14001 Environmental Audit", location:"Hyderabad", leadAuditor:"Meera Krishnan", auditors:["Arasakumar Thirunavukkarasu"], startDate:"02 Oct 2026", endDate:"03 Oct 2026", status:"Awaiting Review", findingsCount:5 },
  { id:"audit-005", auditNumber:"AUD-2026-005", title:"Product Quality Audit – Electronics", auditType:"Product Audit", checklistId:"CHK-006", checklistName:"Product Quality Audit", location:"Chennai", leadAuditor:"Divya Raman", auditors:["Anshul Jain"], startDate:"18 Sep 2026", endDate:"19 Sep 2026", status:"Completed", findingsCount:3 },
  { id:"audit-006", auditNumber:"AUD-2026-006", title:"Safety Management System Audit", auditType:"Compliance Audit", checklistId:"CHK-003", checklistName:"ISO 45001 Safety Audit", location:"Mumbai", leadAuditor:"Alfonso Lobo", auditors:["Rahul Menon"], startDate:"28 Oct 2026", endDate:"30 Oct 2026", status:"Scheduled", findingsCount:0 },
  { id:"audit-007", auditNumber:"AUD-2026-007", title:"Internal Audit – Pune Operations", auditType:"Internal Audit", checklistId:"CHK-001", checklistName:"ISO 9001 Internal Audit", location:"Pune", leadAuditor:"Rahul Menon", auditors:["Aarthiya S R"], startDate:"05 Nov 2026", endDate:"06 Nov 2026", status:"Draft", findingsCount:0 },
  { id:"audit-008", auditNumber:"AUD-2026-008", title:"Supplier Audit – Nova Packaging", auditType:"Supplier Audit", checklistId:"CHK-004", checklistName:"Supplier Quality Audit", location:"Coimbatore", leadAuditor:"Sneha Iyer", auditors:["Ajaykumar"], startDate:"20 Sep 2026", endDate:"20 Sep 2026", status:"Completed", findingsCount:1 },
  { id:"audit-009", auditNumber:"AUD-2026-009", title:"Process Compliance Audit – Warehouse", auditType:"Process Audit", checklistId:"CHK-005", checklistName:"Manufacturing Process Audit", location:"Hyderabad", leadAuditor:"Anshul Jain", auditors:["Andrew Vincent"], startDate:"13 Oct 2026", endDate:"14 Oct 2026", status:"In Progress", findingsCount:4 },
  { id:"audit-010", auditNumber:"AUD-2026-010", title:"Customer Quality System Audit", auditType:"Customer Audit", checklistId:"CHK-001", checklistName:"ISO 9001 Internal Audit", location:"Bengaluru", leadAuditor:"Karthik Narayanan", auditors:["Divya Raman","Meera Krishnan"], startDate:"01 Nov 2026", endDate:"02 Nov 2026", status:"Scheduled", findingsCount:0 },
];

export const auditStatusOptions = ["All", "Draft", "Scheduled", "In Progress", "Awaiting Review", "Completed"] as const;
