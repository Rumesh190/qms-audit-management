export type ChecklistCategoryStatus = "Active" | "Inactive";

export type ChecklistCategory = {
  id: string;
  recordNo: number;
  name: string;
  status: ChecklistCategoryStatus;
};

export const checklistCategories: ChecklistCategory[] = [
  { id: "CAT-001", recordNo: 1, name: "Environment", status: "Active" },
  { id: "CAT-002", recordNo: 2, name: "Health", status: "Active" },
  { id: "CAT-003", recordNo: 3, name: "Safety", status: "Active" },
  { id: "CAT-004", recordNo: 4, name: "Quality", status: "Active" },
  { id: "CAT-005", recordNo: 5, name: "Operations", status: "Active" },
  { id: "CAT-006", recordNo: 6, name: "Documentation", status: "Inactive" },
  { id: "CAT-007", recordNo: 7, name: "Compliance", status: "Inactive" },
  { id: "CAT-008", recordNo: 8, name: "Supplier Quality", status: "Active" },
];

const STORAGE_KEY="qms-checklist-categories";
export function readChecklistCategories():ChecklistCategory[]{if(typeof window==="undefined")return checklistCategories;try{const stored=window.localStorage.getItem(STORAGE_KEY);return stored?JSON.parse(stored) as ChecklistCategory[]:checklistCategories;}catch{return checklistCategories;}}
export function writeChecklistCategories(next:ChecklistCategory[]){window.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}
