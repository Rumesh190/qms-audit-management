"use client";

import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";
import { readAuditTemplates } from "@/data/audit-templates";
import { MasterDataStatusBadge } from "../master-data-ui";

export function TemplateDetailPage({ templateId }: { templateId: string }) {
  const item = readAuditTemplates().find((template) => template.id === templateId);
  if (!item) return <div className="auditor-not-found"><h2>Template not found</h2><Link className="secondary-button" href="/audit/settings/templates">Back to Templates</Link></div>;
  return <div className="qualification-detail template-detail"><header className="qualification-detail-header"><div><Link href="/audit/settings/templates"><ChevronLeft size={16} />Templates</Link><h2>{item.name}</h2></div><Link className="primary-button" href={`/audit/settings/templates/${item.id}/edit`}><Pencil size={16} />Edit Template</Link></header><section><dl><div><dt>Code</dt><dd>{item.code}</dd></div><div><dt>Name</dt><dd>{item.name}</dd></div><div><dt>Type</dt><dd>{item.type}</dd></div><div><dt>Sort Order</dt><dd>{item.sortOrder}</dd></div><div><dt>Status</dt><dd><MasterDataStatusBadge status={item.status} /></dd></div><div className="template-detail-wide"><dt>Template</dt><dd>{item.template}</dd></div><div className="template-detail-wide"><dt>Parameters</dt><dd>{item.parameters || "—"}</dd></div></dl></section></div>;
}
