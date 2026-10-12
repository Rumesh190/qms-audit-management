"use client";

import { useRef, type ReactNode } from "react";
import { MoreHorizontal, SlidersHorizontal, X } from "lucide-react";

export function MasterDataStatusBadge({ status }: { status: "Active" | "Inactive" }) {
  return <span className={`status-badge-small ${status.toLowerCase()}`}><i />{status}</span>;
}

export function MasterDataActions({ itemName, status, onAction }: {
  itemName: string;
  status: "Active" | "Inactive";
  onAction: (message: string) => void;
}) {
  const nextStatus = status === "Active" ? "Deactivate" : "Activate";
  const act = (action: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
    onAction(`${action} for ${itemName} will be available in the next phase.`);
  };

  return (
    <details className="row-actions">
      <summary aria-label={`Actions for ${itemName}`}><MoreHorizontal size={18} /></summary>
      <div className="row-actions-menu">
        {["View", "Edit", nextStatus].map((action) => (
          <button key={action} type="button" onClick={(event) => act(action, event)}>{action}</button>
        ))}
      </div>
    </details>
  );
}

export function MasterDataEmpty({ noun, onClear }: { noun: string; onClear: () => void }) {
  return (
    <div className="table-empty">
      <SlidersHorizontal size={24} />
      <strong>No {noun} found</strong>
      <p>Try adjusting your search or filters.</p>
      <button type="button" className="secondary-button" onClick={onClear}>Clear filters</button>
    </div>
  );
}

export function PlaceholderDialog({ triggerLabel, title, description, icon }: {
  triggerLabel: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="primary-button" onClick={() => dialogRef.current?.showModal()}>{icon}{triggerLabel}</button>
      <dialog ref={dialogRef} className="auditor-dialog" onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
        <div className="dialog-panel">
          <div className="dialog-icon">{icon}</div>
          <button type="button" className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label={`Close ${title} dialog`}><X size={18} /></button>
          <h2>{title}</h2>
          <p>{description}</p>
          <button type="button" className="primary-button" onClick={() => dialogRef.current?.close()}>Close</button>
        </div>
      </dialog>
    </>
  );
}
