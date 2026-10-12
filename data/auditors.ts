export type AuditorType = "Internal" | "External";
export type AuditorStatus = "Active" | "Inactive";

export type AuditorAttachment = {
  id: string;
  fileName: string;
  fileType?: string;
};

export type Auditor = {
  id: string;
  name: string;
  email: string;
  type: AuditorType;
  qualificationIds: string[];
  subjectMatterExpertiseIds: string[];
  attachments?: AuditorAttachment[];
  location: string;
  status: AuditorStatus;
};

export const auditors: Auditor[] = [
  {
    id: "AUD-001", name: "Aarthiya S R", email: "aarthiya.sr@qms.example", type: "Internal",
    qualificationIds: ["QLF-001", "QLF-005"], subjectMatterExpertiseIds: ["SME-007", "SME-004"], location: "Chennai", status: "Active",
  },
  {
    id: "AUD-002", name: "Ajaykumar", email: "ajaykumar@qms.example", type: "Internal",
    qualificationIds: ["QLF-004"], subjectMatterExpertiseIds: ["SME-004", "SME-001"], location: "Pune", status: "Active",
  },
  {
    id: "AUD-003", name: "Alfonso Lobo", email: "alfonso.lobo@qms.example", type: "External",
    qualificationIds: ["QLF-001", "QLF-003", "QLF-005"], subjectMatterExpertiseIds: ["SME-005", "SME-006"], location: "Mumbai", status: "Active",
  },
  {
    id: "AUD-004", name: "Amin Siskovic", email: "amin.siskovic@qms.example", type: "External",
    qualificationIds: ["QLF-004"], subjectMatterExpertiseIds: ["SME-007", "SME-009"], location: "Melbourne", status: "Inactive",
  },
  {
    id: "AUD-005", name: "Andrew Vincent", email: "andrew.vincent@qms.example", type: "Internal",
    qualificationIds: ["QLF-003", "QLF-004"], subjectMatterExpertiseIds: ["SME-005", "SME-011"], location: "Bengaluru", status: "Active",
  },
  {
    id: "AUD-006", name: "Anshul Jain", email: "anshul.jain@qms.example", type: "Internal",
    qualificationIds: ["QLF-001"], subjectMatterExpertiseIds: ["SME-004", "SME-007"], location: "Hyderabad", status: "Active",
  },
  {
    id: "AUD-007", name: "Arasakumar Thirunavukkarasu", email: "arasakumar.t@qms.example", type: "Internal",
    qualificationIds: ["QLF-005", "QLF-006"], subjectMatterExpertiseIds: ["SME-006", "SME-005", "SME-009"], location: "Coimbatore", status: "Active",
  },
  {
    id: "AUD-008", name: "Divya Raman", email: "divya.raman@qms.example", type: "Internal",
    qualificationIds: ["QLF-004"], subjectMatterExpertiseIds: ["SME-007", "SME-001"], location: "Chennai", status: "Inactive",
  },
  {
    id: "AUD-009", name: "Karthik Narayanan", email: "karthik.n@qms.example", type: "Internal",
    qualificationIds: ["QLF-004", "QLF-001"], subjectMatterExpertiseIds: ["SME-004", "SME-001"], location: "Bengaluru", status: "Active",
  },
  {
    id: "AUD-010", name: "Meera Krishnan", email: "meera.krishnan@qms.example", type: "External",
    qualificationIds: ["QLF-002"], subjectMatterExpertiseIds: ["SME-006", "SME-009"], location: "Santiago", status: "Active",
  },
  {
    id: "AUD-011", name: "Rahul Menon", email: "rahul.menon@qms.example", type: "Internal",
    qualificationIds: ["QLF-004", "QLF-006"], subjectMatterExpertiseIds: ["SME-011", "SME-005"], location: "Pune", status: "Active",
  },
  {
    id: "AUD-012", name: "Sneha Iyer", email: "sneha.iyer@qms.example", type: "External",
    qualificationIds: ["QLF-001", "QLF-004"], subjectMatterExpertiseIds: ["SME-007", "SME-004", "SME-001"], location: "Hyderabad", status: "Inactive",
  },
];

const STORAGE_KEY = "qms-auditors";

export function readAuditors(): Auditor[] {
  if (typeof window === "undefined") return auditors;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as Auditor[] : auditors;
  } catch { return auditors; }
}

export function writeAuditors(next: Auditor[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
