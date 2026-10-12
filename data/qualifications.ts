export type QualificationAuditorType = "Lead Auditor" | "Internal Auditor";
export type QualificationStatus = "Active" | "Inactive";

export type Qualification = {
  id: string;
  recordNo: number;
  name: string;
  auditorType: QualificationAuditorType;
  status: QualificationStatus;
};

export const qualifications: Qualification[] = [
  { id: "QLF-001", recordNo: 1, name: "ISO 9001:2015 (QMS) (Lead)", auditorType: "Lead Auditor", status: "Active" },
  { id: "QLF-002", recordNo: 2, name: "ISO 14001:2015 (EMS) (Lead)", auditorType: "Lead Auditor", status: "Active" },
  { id: "QLF-003", recordNo: 3, name: "ISO 45001:2018 (OHSMS) (Lead)", auditorType: "Lead Auditor", status: "Active" },
  { id: "QLF-004", recordNo: 4, name: "ISO 9001:2015 (QMS) (Internal)", auditorType: "Internal Auditor", status: "Active" },
  { id: "QLF-005", recordNo: 5, name: "ISO 14001:2015 (EMS) (Internal)", auditorType: "Internal Auditor", status: "Active" },
  { id: "QLF-006", recordNo: 6, name: "ISO 45001:2018 (OHSMS) (Internal)", auditorType: "Internal Auditor", status: "Inactive" },
];

const STORAGE_KEY="qms-qualifications";
export function readQualifications():Qualification[]{if(typeof window==="undefined")return qualifications;try{const stored=window.localStorage.getItem(STORAGE_KEY);return stored?JSON.parse(stored) as Qualification[]:qualifications;}catch{return qualifications;}}
export function writeQualifications(next:Qualification[]){window.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}
