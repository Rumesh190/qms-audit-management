"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { Bell, ChevronDown, Menu, PanelLeftClose, Search, X } from "lucide-react";
import { ComingSoon } from "./coming-soon";
import { AuditSettingsLayout } from "./audit-settings-layout";
import { AuditorsPage } from "./audit-settings/auditors/auditors-page";
import { QualificationsPage } from "./audit-settings/qualifications/qualifications-page";
import { SubjectMatterExpertisePage } from "./audit-settings/subject-matter-expertise/subject-matter-expertise-page";
import { ChecklistCategoriesPage } from "./audit-settings/checklist-categories/checklist-categories-page";
import { AuditTypesPage } from "./audit-settings/audit-types/audit-types-page";
import { DashboardPage } from "./dashboard/dashboard-page";
import { ChecklistListPage } from "./audit/checklists/checklist-list-page";
import { ChecklistConfigurationListPage } from "./audit/checklists/checklist-configuration-list-page";
import { ChecklistConfigurationForm } from "./audit/checklists/checklist-configuration-form";
import { ChecklistConfigurationDetail } from "./audit/checklists/checklist-configuration-detail";
import { AuditQuestionFormPage } from "./audit/checklists/new-audit-question-page";
import { AuditQuestionDetailPage } from "./audit/checklists/audit-question-detail-page";
import { AuditChecklistDetailPage } from "./audit/checklists/audit-checklist-detail-page";
import { AuditsListPage } from "./audit/audits/audits-list-page";
import { CreateAuditPage } from "./audit/audit-create/create-audit-page";
import { AuditDetailPage } from "./audit/audits/audit-detail-page";
import { AuditorForm } from "./audit-settings/auditors/auditor-form";
import { AuditorDetailPage } from "./audit-settings/auditors/auditor-detail-page";
import { AppearancePage } from "./settings/appearance-page";
import { QualificationForm } from "./audit-settings/qualifications/qualification-form";
import { QualificationDetailPage } from "./audit-settings/qualifications/qualification-detail-page";
import { ExpertiseForm } from "./audit-settings/subject-matter-expertise/expertise-form";
import { ExpertiseDetailPage } from "./audit-settings/subject-matter-expertise/expertise-detail-page";
import { ChecklistCategoryForm } from "./audit-settings/checklist-categories/checklist-category-form";
import { ChecklistCategoryDetailPage } from "./audit-settings/checklist-categories/checklist-category-detail-page";
import { AuditTypeForm } from "./audit-settings/audit-types/audit-type-form";
import { AuditTypeDetailPage } from "./audit-settings/audit-types/audit-type-detail-page";
import { PredefinedAnswerListsPage } from "./audit-settings/predefined-answer-lists/predefined-answer-lists-page";
import { PredefinedAnswerListForm } from "./audit-settings/predefined-answer-lists/predefined-answer-list-form";
import { PredefinedAnswerListDetailPage } from "./audit-settings/predefined-answer-lists/predefined-answer-list-detail-page";
import { DefaultDueDatesPage } from "./audit-settings/default-due-dates/default-due-dates-page";
import { DefaultDueDateForm } from "./audit-settings/default-due-dates/default-due-date-form";
import { DefaultDueDateDetailPage } from "./audit-settings/default-due-dates/default-due-date-detail-page";
import { TemplatesPage } from "./audit-settings/templates/templates-page";
import { TemplateForm } from "./audit-settings/templates/template-form";
import { TemplateDetailPage } from "./audit-settings/templates/template-detail-page";
import {
  auditNav, checklistNav, moduleContext, modules, ncrNav, settingsItem, type PageContent,
} from "@/lib/navigation";

type LinkTuple = readonly [string, string];

function TabNav({ items, path, level = 1, label }: { items: readonly LinkTuple[]; path: string; level?: number; label: string }) {
  return (
    <nav className={`tab-nav level-${level}`} aria-label={label}>
      <div className="tab-scroll">
        {items.map(([name, href]) => {
          const active = level === 2
            ? (href.endsWith("/configuration") ? path.startsWith(href) : path.startsWith(href) && !path.startsWith(`${href}/configuration`))
            : name === "Settings"
            ? path.startsWith("/audit/settings")
            : href === "/audit/audits" || href === "/audit/checklist"
              ? path.startsWith(href)
              : path === href;
          return <Link key={href} href={href} className={active ? "active" : ""}>{name}</Link>;
        })}
      </div>
    </nav>
  );
}

export function AppShell({ initialPage }: { initialPage: PageContent }) {
  const path = usePathname();
  const compactWorkspace = path.startsWith("/audit") || path.startsWith("/ncr-capa");
  const [sidebarState, setSidebarState] = useState({ path, expanded: !compactWorkspace });
  const [mobileState, setMobileState] = useState({ path, open: false });
  const expanded = sidebarState.path === path ? sidebarState.expanded : !compactWorkspace;
  const mobileOpen = mobileState.path === path && mobileState.open;
  const setMobileOpen = (open: boolean) => setMobileState({ path, open });

  const isActive = (href: string) => href === "/dashboard" ? path === href : path.startsWith(href.split("/").slice(0, 2).join("/"));
  const context = moduleContext(path);

  return (
    <div className={`app-shell ${expanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand-row">
          <Link href="/dashboard" className="brand" aria-label="QMS dashboard">
            <span className="brand-mark">Q</span>
            <span className="brand-copy"><strong>QMS</strong><small>{context === "Dashboard" ? "Quality Management" : context}</small></span>
          </Link>
          <ChevronDown className="brand-chevron" size={18} />
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>
        <div className="sidebar-rule" />
        <nav className="primary-nav" aria-label="Product modules">
          <span className="nav-kicker">Overview</span>
          {modules.slice(0, 1).map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={`nav-item ${isActive(href) ? "active" : ""}`} title={!expanded ? label : undefined}>
              <Icon size={20} strokeWidth={1.8} /><span>{label}</span>
            </Link>
          ))}
          <span className="nav-kicker quality-kicker">Quality modules</span>
          {modules.slice(2).map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={`nav-item ${isActive(href) ? "active" : ""}`} title={!expanded ? label : undefined}>
              <Icon size={20} strokeWidth={1.8} /><span>{label}</span>
            </Link>
          ))}
          <span className="nav-kicker quality-kicker">Action Management</span>
          {modules.slice(1, 2).map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={`nav-item ${isActive(href) ? "active" : ""}`} title={!expanded ? label : undefined}>
              <Icon size={20} strokeWidth={1.8} /><span>{label}</span>
            </Link>
          ))}
        </nav>
        <nav className="bottom-nav" aria-label="Product settings">
          <span className="nav-kicker">System</span>
          <Link href={settingsItem.href} className={`nav-item ${path === settingsItem.href ? "active" : ""}`} title={!expanded ? settingsItem.label : undefined}>
            <settingsItem.icon size={20} strokeWidth={1.8} /><span>{settingsItem.label}</span>
          </Link>
        </nav>
      </aside>

      <div className="workspace">
        <header className="app-header">
          <div className="header-left">
            <button className="menu-button desktop-toggle" onClick={() => setSidebarState({ path, expanded: !expanded })} aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}>
              {expanded ? <PanelLeftClose size={20} /> : <Menu size={20} />}
            </button>
            <button className="menu-button mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
            <div className="context"><span>QMS</span><i>/</i><strong>{context}</strong></div>
          </div>
          <div className="header-actions">
            <label className="search"><Search size={17} /><input placeholder="Search QMS" aria-label="Search QMS" /></label>
            <button className="icon-button" aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button>
            <button className="profile" aria-label="Open profile menu">
              <span className="avatar">JD</span><span className="user-copy"><strong>John Doe</strong><small>Administrator</small></span><ChevronDown size={16} />
            </button>
          </div>
        </header>

        {path.startsWith("/audit") && <TabNav items={auditNav} path={path} label="Audit Management" />}
        {path.startsWith("/audit/checklist") && <TabNav items={checklistNav} path={path} level={2} label="Checklist" />}
        {path.startsWith("/ncr-capa") && <TabNav items={ncrNav} path={path} label="NCR and CAPA" />}

        <main>
          {path.startsWith("/audit/settings") ? (
            <AuditSettingsLayout>
              {path === "/audit/settings/auditors" ? <Suspense fallback={<div className="dashboard-loading" />}><AuditorsPage /></Suspense>
                : path === "/audit/settings/auditors/new" ? <AuditorForm />
                : path.endsWith("/edit") && path.startsWith("/audit/settings/auditors/") ? <AuditorForm auditorId={path.split("/").at(-2)} />
                : path.startsWith("/audit/settings/auditors/") ? <AuditorDetailPage auditorId={path.split("/").pop() ?? ""} />
                : path === "/audit/settings/qualifications" ? <Suspense fallback={<div className="dashboard-loading" />}><QualificationsPage /></Suspense>
                : path === "/audit/settings/qualifications/new" ? <QualificationForm />
                : path.endsWith("/edit") && path.startsWith("/audit/settings/qualifications/") ? <QualificationForm qualificationId={path.split("/").at(-2)} />
                : path.startsWith("/audit/settings/qualifications/") ? <QualificationDetailPage qualificationId={path.split("/").pop() ?? ""} />
                : path === "/audit/settings/subject-matter-expertise" ? <Suspense fallback={<div className="dashboard-loading" />}><SubjectMatterExpertisePage /></Suspense>
                : path === "/audit/settings/subject-matter-expertise/new" ? <ExpertiseForm />
                : path.endsWith("/edit") && path.startsWith("/audit/settings/subject-matter-expertise/") ? <ExpertiseForm expertiseId={path.split("/").at(-2)} />
                : path.startsWith("/audit/settings/subject-matter-expertise/") ? <ExpertiseDetailPage expertiseId={path.split("/").pop() ?? ""} />
                : path === "/audit/settings/checklist-categories" ? <Suspense fallback={<div className="dashboard-loading" />}><ChecklistCategoriesPage /></Suspense>
                : path === "/audit/settings/checklist-categories/new" ? <ChecklistCategoryForm />
                : path.endsWith("/edit") && path.startsWith("/audit/settings/checklist-categories/") ? <ChecklistCategoryForm categoryId={path.split("/").at(-2)} />
                : path.startsWith("/audit/settings/checklist-categories/") ? <ChecklistCategoryDetailPage categoryId={path.split("/").pop() ?? ""} />
                : path === "/audit/settings/audit-types" ? <Suspense fallback={<div className="dashboard-loading" />}><AuditTypesPage /></Suspense>
                : path === "/audit/settings/audit-types/new" ? <AuditTypeForm />
                : path.endsWith("/edit") && path.startsWith("/audit/settings/audit-types/") ? <AuditTypeForm auditTypeId={path.split("/").at(-2)} />
                : path.startsWith("/audit/settings/audit-types/") ? <AuditTypeDetailPage auditTypeId={path.split("/").pop() ?? ""} />
                : path === "/audit/settings/predefined-answer-lists" ? <Suspense fallback={<div className="dashboard-loading" />}><PredefinedAnswerListsPage /></Suspense>
                : path === "/audit/settings/predefined-answer-lists/new" ? <PredefinedAnswerListForm />
                : path.endsWith("/edit") && path.startsWith("/audit/settings/predefined-answer-lists/") ? <PredefinedAnswerListForm answerListId={path.split("/").at(-2)} />
                : path.startsWith("/audit/settings/predefined-answer-lists/") ? <PredefinedAnswerListDetailPage answerListId={path.split("/").pop() ?? ""} />
                : path === "/audit/settings/default-due-dates" ? <Suspense fallback={<div className="dashboard-loading" />}><DefaultDueDatesPage /></Suspense>
                : path === "/audit/settings/default-due-dates/new" ? <DefaultDueDateForm />
                : path.endsWith("/edit") && path.startsWith("/audit/settings/default-due-dates/") ? <DefaultDueDateForm dueDateId={path.split("/").at(-2)} />
                : path.startsWith("/audit/settings/default-due-dates/") ? <DefaultDueDateDetailPage dueDateId={path.split("/").pop() ?? ""} />
                : path === "/audit/settings/templates" ? <Suspense fallback={<div className="dashboard-loading" />}><TemplatesPage /></Suspense>
                : path === "/audit/settings/templates/new" ? <TemplateForm />
                : path.endsWith("/edit") && path.startsWith("/audit/settings/templates/") ? <TemplateForm templateId={path.split("/").at(-2)} />
                : path.startsWith("/audit/settings/templates/") ? <TemplateDetailPage templateId={path.split("/").pop() ?? ""} />
                : <ComingSoon {...initialPage} />}
            </AuditSettingsLayout>
          ) : path === "/dashboard" ? (
            <Suspense fallback={<div className="dashboard-loading" />}><DashboardPage /></Suspense>
          ) : path === "/settings" ? (
            <AppearancePage />
          ) : path === "/audit/checklist" ? (
            <ChecklistListPage />
          ) : path === "/audit/checklist/configuration" ? (
            <ChecklistConfigurationListPage />
          ) : path === "/audit/checklist/configuration/new" ? (
            <ChecklistConfigurationForm />
          ) : path.endsWith("/questions/new") && path.startsWith("/audit/checklist/configuration/") ? (
            <AuditQuestionFormPage checklistId={path.split("/").at(-3) ?? ""} />
          ) : path.endsWith("/edit") && path.includes("/questions/") ? (
            <AuditQuestionFormPage checklistId={path.split("/").at(-4) ?? ""} questionId={path.split("/").at(-2)} />
          ) : path.includes("/questions/") ? (
            <AuditQuestionDetailPage checklistId={path.split("/").at(-3) ?? ""} questionId={path.split("/").pop() ?? ""} />
          ) : path.endsWith("/edit") && path.startsWith("/audit/checklist/configuration/") ? (
            <ChecklistConfigurationForm checklistId={path.split("/").at(-2)} />
          ) : path.startsWith("/audit/checklist/configuration/") ? (
            <Suspense fallback={<div className="dashboard-loading" />}><ChecklistConfigurationDetail checklistId={path.split("/").pop() ?? ""} /></Suspense>
          ) : path.startsWith("/audit/checklist/") ? (
            <AuditChecklistDetailPage checklistId={path.split("/").pop() ?? ""} />
          ) : path === "/audit/audits" ? (
            <Suspense fallback={<div className="dashboard-loading" />}><AuditsListPage /></Suspense>
          ) : path === "/audit/audits/new" ? (
            <CreateAuditPage />
          ) : path.startsWith("/audit/audits/") ? (
            <AuditDetailPage auditId={path.split("/").pop() ?? ""} />
          ) : (
            <ComingSoon {...initialPage} />
          )}
        </main>
      </div>
    </div>
  );
}
