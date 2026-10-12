"use client";

import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";
import { readChecklistCategories } from "@/data/checklist-categories";
import { MasterDataStatusBadge } from "../master-data-ui";

export function ChecklistCategoryDetailPage({categoryId}:{categoryId:string}){const category=readChecklistCategories().find((item)=>item.id===categoryId);if(!category)return <div className="auditor-not-found"><h2>Checklist category not found</h2><Link className="secondary-button" href="/audit/settings/checklist-categories">Back to Checklist Categories</Link></div>;return <div className="qualification-detail"><header className="qualification-detail-header"><div><Link href="/audit/settings/checklist-categories"><ChevronLeft size={16}/>Checklist Categories</Link><h2>{category.name}</h2><p>Record No. {category.recordNo}</p></div><Link className="primary-button" href={`/audit/settings/checklist-categories/${category.id}/edit`}><Pencil size={16}/>Edit Category</Link></header><section><dl><div><dt>Category Name</dt><dd>{category.name}</dd></div><div><dt>Status</dt><dd><MasterDataStatusBadge status={category.status}/></dd></div><div><dt>Record No.</dt><dd>{category.recordNo}</dd></div></dl></section></div>;}
