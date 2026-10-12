"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { readAuditTemplates, writeAuditTemplates, type AuditTemplate, type AuditTemplateStatus, type AuditTemplateType } from "@/data/audit-templates";

export function TemplateForm({ templateId }: { templateId?: string }) {
  const router = useRouter();
  const existing = useMemo(() => templateId ? readAuditTemplates().find((item) => item.id === templateId) : undefined, [templateId]);
  const [code, setCode] = useState(existing?.code ?? "");
  const [sortOrder, setSortOrder] = useState(existing?.sortOrder?.toString() ?? "1");
  const [name, setName] = useState(existing?.name ?? "");
  const [template, setTemplate] = useState(existing?.template ?? "");
  const [parameters, setParameters] = useState(existing?.parameters ?? "");
  const [type, setType] = useState<AuditTemplateType>(existing?.type ?? "Question");
  const [status, setStatus] = useState<AuditTemplateStatus>(existing?.status ?? "Active");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const save = () => {
    const current = readAuditTemplates();
    const numericSortOrder = Number(sortOrder);
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!Number.isInteger(numericSortOrder) || numericSortOrder < 1) nextErrors.sortOrder = "Sort Order must be a whole number of at least 1.";
    if (code.trim() && current.some((item) => item.id !== existing?.id && item.code.trim().toLowerCase() === code.trim().toLowerCase())) nextErrors.code = "A template with this code already exists.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const nextNumber = Math.max(0, ...current.map((item) => Number(item.id.replace("TPL-", "")) || 0)) + 1;
    const record: AuditTemplate = { id: existing?.id ?? `TPL-${String(nextNumber).padStart(3, "0")}`, code: code.trim(), sortOrder: numericSortOrder, name: name.trim(), template: template.trim(), parameters: parameters.trim() || undefined, type, status };
    writeAuditTemplates(existing ? current.map((item) => item.id === record.id ? record : item) : [...current, record]);
    router.push(`/audit/settings/templates?saved=${existing ? "updated" : "added"}`);
  };
  return <div className="qualification-editor"><header className="qualification-editor-header"><div><Link href="/audit/settings/templates"><ChevronLeft size={16} />Templates</Link><h2>{existing ? "Edit Template" : "Add Template"}</h2><p>{existing ? "Update this reusable audit checklist template." : "Create a reusable template for audit checklist content."}</p></div><div className="qualification-header-actions"><button type="button" className="secondary-button" onClick={() => router.back()}>Cancel</button><button type="button" className="primary-button" onClick={save}>{existing ? "Save Changes" : "Save Template"}</button></div></header><section className="qualification-form-section"><div className="qualification-form-grid template-form-grid"><label><span>Code</span><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="e.g. QST-01" />{errors.code && <small>{errors.code}</small>}</label><label><span>Sort Order <i>*</i></span><input type="number" min="1" step="1" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} />{errors.sortOrder && <small>{errors.sortOrder}</small>}</label><label><span>Name <i>*</i></span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Template name" />{errors.name && <small>{errors.name}</small>}</label><label><span>Type <i>*</i></span><select value={type} onChange={(event) => setType(event.target.value as AuditTemplateType)}><option>Question</option><option>Answer</option></select></label><label className="template-wide-field"><span>Template</span><textarea value={template} onChange={(event) => setTemplate(event.target.value)} placeholder="Template content" /></label><label className="template-wide-field"><span>Parameters</span><textarea value={parameters} onChange={(event) => setParameters(event.target.value)} placeholder="Optional parameter text" /></label><label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value as AuditTemplateStatus)}><option>Active</option><option>Inactive</option></select></label></div></section></div>;
}
