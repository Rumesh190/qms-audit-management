export type ExpertiseStatus = "Active" | "Inactive";

export type SubjectMatterExpertise = {
  id: string;
  recordNo: number;
  name: string;
  status: ExpertiseStatus;
};

export const subjectMatterExpertise: SubjectMatterExpertise[] = [
  { id: "SME-001", recordNo: 1, name: "Design / Engineering", status: "Active" },
  { id: "SME-002", recordNo: 2, name: "Project Management", status: "Active" },
  { id: "SME-003", recordNo: 3, name: "Project Site", status: "Active" },
  { id: "SME-004", recordNo: 4, name: "Manufacturing", status: "Active" },
  { id: "SME-005", recordNo: 5, name: "Safety", status: "Active" },
  { id: "SME-006", recordNo: 6, name: "Environment", status: "Active" },
  { id: "SME-007", recordNo: 7, name: "QC / QA", status: "Active" },
  { id: "SME-008", recordNo: 8, name: "Sustainability / ESG", status: "Active" },
  { id: "SME-009", recordNo: 9, name: "Legal Requirement", status: "Inactive" },
  { id: "SME-010", recordNo: 10, name: "Product Analysis (Lab)", status: "Active" },
  { id: "SME-011", recordNo: 11, name: "Service Execution", status: "Inactive" },
];

const STORAGE_KEY="qms-subject-matter-expertise";
export function readSubjectMatterExpertise():SubjectMatterExpertise[]{if(typeof window==="undefined")return subjectMatterExpertise;try{const stored=window.localStorage.getItem(STORAGE_KEY);return stored?JSON.parse(stored) as SubjectMatterExpertise[]:subjectMatterExpertise;}catch{return subjectMatterExpertise;}}
export function writeSubjectMatterExpertise(next:SubjectMatterExpertise[]){window.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}
