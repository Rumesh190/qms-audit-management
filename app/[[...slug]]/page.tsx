import { notFound, redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { pageContent } from "@/lib/navigation";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const path = `/${slug.join("/")}`;

  if (path === "/") redirect("/dashboard");
  if (path === "/audit") redirect("/audit/dashboard");
  if (path === "/audit/checklist/new") redirect("/audit/checklist/configuration/new");
  if (path === "/supplier-quality") redirect("/dashboard");
  if (path === "/audit/settings") redirect("/audit/settings/auditors");
  const obsoleteAuditSettingsRoutes: Record<string, string> = {
    "/audit/settings/favorites": "/audit/settings/auditors",
    "/audit/settings/recent": "/audit/settings/auditors",
    "/audit/settings/library": "/audit/settings/auditors",
    "/audit/settings/library/auditors": "/audit/settings/auditors",
    "/audit/settings/library/subject-matter-expertise": "/audit/settings/subject-matter-expertise",
    "/audit/settings/library/checklist-categories": "/audit/settings/checklist-categories",
    "/audit/settings/library/audit-types": "/audit/settings/audit-types",
    "/audit/settings/setup": "/audit/settings/auditors",
    "/audit/settings/setup/predefined-answers": "/audit/settings/auditors",
    "/audit/settings/setup/default-due-dates": "/audit/settings/default-due-dates",
  };
  if (obsoleteAuditSettingsRoutes[path]) redirect(obsoleteAuditSettingsRoutes[path]);
  if (path === "/ncr-capa") redirect("/ncr-capa/digital-nonconformance");
  if (path === "/ncr-capa/dashboard") redirect("/dashboard?view=ncr");

  const content = pageContent[path]
    ?? (path.startsWith("/audit/settings/auditors/") ? pageContent["/audit/settings/auditors"] : undefined)
    ?? (path.startsWith("/audit/settings/qualifications/") ? pageContent["/audit/settings/qualifications"] : undefined)
    ?? (path.startsWith("/audit/settings/subject-matter-expertise/") ? pageContent["/audit/settings/subject-matter-expertise"] : undefined)
    ?? (path.startsWith("/audit/settings/checklist-categories/") ? pageContent["/audit/settings/checklist-categories"] : undefined)
    ?? (path.startsWith("/audit/settings/audit-types/") ? pageContent["/audit/settings/audit-types"] : undefined)
    ?? (path.startsWith("/audit/settings/predefined-answer-lists/") ? pageContent["/audit/settings/predefined-answer-lists"] : undefined)
    ?? (path.startsWith("/audit/settings/default-due-dates/") ? pageContent["/audit/settings/default-due-dates"] : undefined)
    ?? (path.startsWith("/audit/settings/templates/") ? pageContent["/audit/settings/templates"] : undefined)
    ?? (path.startsWith("/audit/checklist/") ? pageContent["/audit/checklist"] : undefined)
    ?? (path.startsWith("/audit/audits/") ? pageContent["/audit/audits"] : undefined);
  if (!content) notFound();
  return <AppShell initialPage={content} />;
}
