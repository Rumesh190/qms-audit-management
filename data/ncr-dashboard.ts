export type NcrStatus = "Closed" | "Open" | "In Review";

export const analyticsColors = {
  blue: "#2563EB", sky: "#38BDF8", purple: "#8B5CF6", teal: "#14B8A6",
  green: "#22C55E", amber: "#F59E0B", orange: "#F97316", coral: "#EF4444", neutral: "#94A3B8",
} as const;

export const statusColors = {
  closed: analyticsColors.green,
  open: analyticsColors.coral,
  inReview: analyticsColors.blue,
} as const;

export const categoryColors = [
  analyticsColors.blue, analyticsColors.purple, analyticsColors.teal, analyticsColors.orange,
  analyticsColors.sky, analyticsColors.amber, analyticsColors.coral, analyticsColors.neutral,
] as const;

export type NcrRecord = {
  number: string;
  status: NcrStatus;
  productGroup: string;
  issueTitle: string;
  supplier: string;
  dateReported: string;
};

export const ncrKpis = [
  { label: "Total NCR", value: "2,845", trend: "+14%", positive: true },
  { label: "Open NCR", value: "612", trend: "+7%", positive: false },
  { label: "Cost of Quality", value: "$86.4M", trend: "-18%", positive: true },
  { label: "Closure Rate", value: "79%", trend: "+10%", positive: true },
] as const;

export const causeOfErrorData = [
  { name: "Manufacturing", count: 680 }, { name: "Supplier Issue", count: 520 },
  { name: "Method", count: 410 }, { name: "Material", count: 320 },
  { name: "Design", count: 210 }, { name: "Measurement", count: 190 },
  { name: "Human Error", count: 150 }, { name: "Other", count: 90 },
];

export const ageingData = [
  { bucket: "0–45 Days", closed: 480, open: 120 },
  { bucket: "46–60 Days", closed: 220, open: 90 },
  { bucket: "Above 60 Days", closed: 310, open: 150 },
];

export const ncrStatusData = [
  { name: "Closed", value: 2246, color: statusColors.closed },
  { name: "Open", value: 427, color: statusColors.open },
  { name: "In Review", value: 172, color: statusColors.inReview },
];

export const productGroupData = [
  { name: "Electronics", ncr: 720, coq: 31 }, { name: "Mechanical", ncr: 540, coq: 23 },
  { name: "Plastics", ncr: 420, coq: 18 }, { name: "Electrical", ncr: 310, coq: 15 },
  { name: "Packaging", ncr: 220, coq: 12 }, { name: "Other", ncr: 120, coq: 8 },
];

export const ncrRecords: NcrRecord[] = [
  { number: "NCR-202513", status: "Open", productGroup: "Electronics", issueTitle: "Component out of specification", supplier: "ABC Manufacturing", dateReported: "2025-02-14" },
  { number: "NCR-202492", status: "Closed", productGroup: "Mechanical", issueTitle: "Surface finish not meeting requirement", supplier: "Global Parts Ltd.", dateReported: "2025-01-28" },
  { number: "NCR-202447", status: "In Review", productGroup: "Plastics", issueTitle: "Dimensional tolerance exceeded", supplier: "Tech Components", dateReported: "2025-01-16" },
  { number: "NCR-202391", status: "Closed", productGroup: "Electrical", issueTitle: "Missing fastener during assembly", supplier: "Precision Metals", dateReported: "2024-12-03" },
  { number: "NCR-202366", status: "Open", productGroup: "Packaging", issueTitle: "Incorrect packaging specification", supplier: "Nova Packaging", dateReported: "2024-11-19" },
  { number: "NCR-202341", status: "Closed", productGroup: "Electronics", issueTitle: "Connector alignment outside tolerance", supplier: "Vertex Systems", dateReported: "2024-10-24" },
];

export const ncrFilterOptions = {
  country: ["All", "India", "Australia", "Chile"],
  productLine: ["All", "Industrial", "Consumer", "Automotive"],
  productGroup: ["All", "Electronics", "Mechanical", "Plastics", "Electrical", "Packaging"],
  supplier: ["All", "ABC Manufacturing", "Global Parts Ltd.", "Tech Components", "Precision Metals", "Nova Packaging"],
  status: ["All", "Closed", "Open", "In Review"],
} as const;
