import {
  ChartBar, ClipboardCheck, FileCheck2, Files, Gauge, ListChecks, MessageSquareText,
  Settings, ShieldCheck, SlidersHorizontal, TriangleAlert,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon };
export type PageContent = { title: string; description: string };

export const modules: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Action Plan", href: "/action-plan", icon: ListChecks },
  { label: "Audit Management", href: "/audit/dashboard", icon: ClipboardCheck },
  { label: "NCR / CAPA", href: "/ncr-capa/digital-nonconformance", icon: TriangleAlert },
  { label: "Inspection & Quality Records", href: "/inspection", icon: FileCheck2 },
  { label: "Calibration", href: "/calibration", icon: SlidersHorizontal },
  { label: "Document Control", href: "/document-control", icon: Files },
  { label: "Balance Score Card", href: "/balance-score-card", icon: ChartBar },
  { label: "Customer Feedback", href: "/customer-feedback", icon: MessageSquareText },
  { label: "Risk Assessment", href: "/risk-assessment", icon: ShieldCheck },
];

export const settingsItem: NavItem = { label: "Product Settings", href: "/settings", icon: Settings };

export const auditNav = [
  ["Dashboard", "/audit/dashboard"], ["Audits", "/audit/audits"],
  ["Findings", "/audit/findings"], ["Checklist", "/audit/checklist"],
  ["Settings", "/audit/settings/auditors"],
] as const;

export const checklistNav = [
  ["Checklists", "/audit/checklist"],
  ["Checklist Configuration", "/audit/checklist/configuration"],
] as const;

export const ncrNav = [
  ["Digital Nonconformance", "/ncr-capa/digital-nonconformance"],
  ["Root Cause Analysis", "/ncr-capa/root-cause-analysis"],
  ["Corrective & Preventive Actions", "/ncr-capa/corrective-preventive-actions"],
] as const;

export const auditSettingsItems = [
  ["Auditors", "/audit/settings/auditors"],
  ["Qualifications", "/audit/settings/qualifications"],
  ["Subject Matter Expertise", "/audit/settings/subject-matter-expertise"],
  ["Checklist Categories", "/audit/settings/checklist-categories"],
  ["Audit Types", "/audit/settings/audit-types"],
  ["Predefined Answer Lists", "/audit/settings/predefined-answer-lists"],
  ["Default Due Dates", "/audit/settings/default-due-dates"],
  ["HTML Templates", "/audit/settings/templates"],
] as const;

export const pageContent: Record<string, PageContent> = {
  "/dashboard": { title: "Dashboard", description: "Your organization-wide quality overview will appear here." },
  "/audit/dashboard": { title: "Audit Management Dashboard", description: "Monitor and manage your audit program from one place." },
  "/audit/audits": { title: "Audits", description: "Plan, conduct and manage internal and external quality audits." },
  "/audit/findings": { title: "Findings", description: "Track findings identified during audits and monitor their resolution." },
  "/audit/checklist": { title: "Checklist", description: "Create and manage reusable audit checklists." },
  "/audit/settings/auditors": { title: "Auditors", description: "Manage auditors available for audit planning and assignment." },
  "/audit/settings/qualifications": { title: "Qualifications", description: "Manage auditor qualifications used across audit planning and assignment." },
  "/audit/settings/subject-matter-expertise": { title: "Subject Matter Expertise", description: "Define subject matter expertise areas used when selecting audit team members." },
  "/audit/settings/checklist-categories": { title: "Checklist Categories", description: "Organize audit checklist questions into reusable categories." },
  "/audit/settings/audit-types": { title: "Audit Types", description: "Define the types of audits used across the organization." },
  "/audit/settings/predefined-answer-lists": { title: "Predefined Answer Lists", description: "Manage reusable answer options for audit checklist questions." },
  "/audit/settings/default-due-dates": { title: "Default Due Dates", description: "Manage reusable due-date durations used across audit activities." },
  "/audit/settings/templates": { title: "HTML Templates", description: "Manage reusable answer and question HTML templates used in audit checklists." },
  "/action-plan": { title: "Action Plan", description: "View, coordinate and monitor actions raised across all quality modules." },
  "/ncr-capa/digital-nonconformance": { title: "Digital Nonconformance", description: "Capture and manage quality nonconformances digitally." },
  "/ncr-capa/root-cause-analysis": { title: "Root Cause Analysis", description: "Identify and document the underlying causes of quality issues." },
  "/ncr-capa/corrective-preventive-actions": { title: "Corrective & Preventive Actions", description: "Manage actions that correct issues and prevent recurrence." },
  "/inspection": { title: "Inspection & Quality Records", description: "Manage inspection activities and quality records across the organization." },
  "/calibration": { title: "Calibration", description: "Manage equipment calibration and calibration records." },
  "/document-control": { title: "Document Control", description: "Manage controlled documents, revisions, approvals and distribution across the organization." },
  "/balance-score-card": { title: "Balance Score Card", description: "Track organizational performance across strategic quality and operational objectives." },
  "/customer-feedback": { title: "Customer Feedback", description: "Manage customer quality feedback and related activities." },
  "/risk-assessment": { title: "Risk Assessment", description: "Identify, assess and monitor quality risks." },
  "/settings": { title: "Appearance", description: "Customize the visual appearance of your QMS workspace." },
};

export function moduleContext(path: string) {
  if (path.startsWith("/audit")) return "Audit Management";
  if (path.startsWith("/ncr-capa")) return "NCR / CAPA";
  return modules.find((item) => path.startsWith(item.href))?.label ?? (path === "/settings" ? "Product Settings" : "QMS");
}
