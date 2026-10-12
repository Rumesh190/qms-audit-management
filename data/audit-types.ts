export type AuditTypeStatus = "Active" | "Inactive";

export type AuditType = {
  id: string;
  name: string;
  status: AuditTypeStatus;
};

export const auditTypes: AuditType[] = [
  { id: "ADT-001", name: "Internal Audit", status: "Active" },
  { id: "ADT-002", name: "External Audit", status: "Active" },
  { id: "ADT-003", name: "Supplier Audit", status: "Active" },
  { id: "ADT-004", name: "Process Audit", status: "Active" },
  { id: "ADT-005", name: "Product Audit", status: "Active" },
  { id: "ADT-006", name: "System Audit", status: "Active" },
  { id: "ADT-007", name: "Compliance Audit", status: "Active" },
  { id: "ADT-008", name: "Customer Audit", status: "Inactive" },
  { id: "ADT-009", name: "Regulatory Audit", status: "Active" },
  { id: "ADT-010", name: "Certification Audit", status: "Inactive" },
];

const STORAGE_KEY="qms-audit-types";
export function readAuditTypes():AuditType[]{if(typeof window==="undefined")return auditTypes;try{const stored=window.localStorage.getItem(STORAGE_KEY);return stored?JSON.parse(stored) as AuditType[]:auditTypes;}catch{return auditTypes;}}
export function writeAuditTypes(next:AuditType[]){window.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}
