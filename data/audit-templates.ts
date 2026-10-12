export type AuditTemplateType = "Question" | "Answer";
export type AuditTemplateStatus = "Active" | "Inactive";

export type AuditTemplate = {
  id: string;
  code: string;
  sortOrder: number;
  name: string;
  template: string;
  parameters?: string;
  type: AuditTemplateType;
  status: AuditTemplateStatus;
};

export const auditTemplates: AuditTemplate[] = [
  { id: "TPL-001", code: "QST-01", sortOrder: 1, name: "Question Text", template: "Enter the audit question.", parameters: "Question text", type: "Question", status: "Active" },
  { id: "TPL-002", code: "ANS-01", sortOrder: 2, name: "Answer Selection", template: "Select the applicable answer.", parameters: "Answer list", type: "Answer", status: "Active" },
  { id: "TPL-003", code: "QST-02", sortOrder: 3, name: "Comments", template: "Add comments where required.", parameters: "Comments", type: "Question", status: "Active" },
  { id: "TPL-004", code: "ANS-02", sortOrder: 4, name: "Evidence", template: "Provide supporting evidence.", parameters: "Evidence text", type: "Answer", status: "Active" },
  { id: "TPL-005", code: "QST-03", sortOrder: 5, name: "Section Header", template: "Enter the checklist section heading.", type: "Question", status: "Active" },
  { id: "TPL-006", code: "QST-04", sortOrder: 6, name: "Instruction Text", template: "Enter instructions for this checklist section.", parameters: "Instruction text", type: "Question", status: "Inactive" },
];

const STORAGE_KEY = "qms-audit-templates";

export function readAuditTemplates(): AuditTemplate[] {
  if (typeof window === "undefined") return auditTemplates;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as AuditTemplate[] : auditTemplates;
  } catch {
    return auditTemplates;
  }
}

export function writeAuditTemplates(next: AuditTemplate[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
