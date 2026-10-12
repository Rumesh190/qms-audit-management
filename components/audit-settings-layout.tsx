"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { auditSettingsItems } from "@/lib/navigation";

export function AuditSettingsLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <section className="audit-settings" aria-label="Audit Settings">
      <div className="audit-settings-workspace">
        <nav className="audit-settings-nav" aria-label="Audit settings">
          <div className="audit-settings-nav-scroll">
            {auditSettingsItems.map(([label, href]) => (
              <Link key={href} href={href} className={path === href || path.startsWith(`${href}/`) ? "active" : ""} aria-current={path === href || path.startsWith(`${href}/`) ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="audit-settings-content">{children}</div>
      </div>
    </section>
  );
}
