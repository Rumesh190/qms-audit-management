import { ArrowUpRight, Construction } from "lucide-react";
import type { PageContent } from "@/lib/navigation";

export function ComingSoon({ title, description }: PageContent) {
  return (
    <section className="empty-state" aria-labelledby="page-title">
      <div className="empty-icon"><Construction size={26} strokeWidth={1.8} /></div>
      <span className="status-badge">Coming Soon</span>
      <h1 id="page-title">{title}</h1>
      <p>{description}</p>
      <div className="empty-note">
        <span>This workspace is ready for the next phase.</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </div>
    </section>
  );
}
