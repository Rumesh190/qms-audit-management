"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, CircleDollarSign, ClipboardList, RotateCcw, Search, TrendingDown, TrendingUp } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { ageingData, analyticsColors, categoryColors, causeOfErrorData, ncrFilterOptions, ncrKpis, ncrRecords, ncrStatusData, productGroupData, statusColors } from "@/data/ncr-dashboard";

const tooltipStyle = { border: "1px solid #e5e7e2", borderRadius: 8, boxShadow: "0 8px 24px #1c201812", fontSize: 12 };
const kpiIcons = [ClipboardList, AlertTriangle, CircleDollarSign, CheckCircle2];

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label className="ncr-filter"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function ChartCard({ title, metric, children, className = "" }: { title: string; metric?: string; children: React.ReactNode; className?: string }) {
  return <section className={`ncr-card chart-card ${className}`}><div className="chart-card-heading"><h2>{title}</h2>{metric && <span>{metric}</span>}</div><div className="chart-body">{children}</div></section>;
}

export function NcrDashboard() {
  const [filters, setFilters] = useState({ dateRange: "Last 12 Months", country: "All", productLine: "All", productGroup: "All", supplier: "All", status: "All" });
  const [search, setSearch] = useState("");
  const updateFilter = (key: keyof typeof filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));
  const resetFilters = () => setFilters({ dateRange: "Last 12 Months", country: "All", productLine: "All", productGroup: "All", supplier: "All", status: "All" });
  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ncrRecords.filter((record) => {
      const searchable = [record.number, record.issueTitle, record.supplier].join(" ").toLowerCase();
      return (!query || searchable.includes(query)) && (filters.status === "All" || record.status === filters.status) && (filters.productGroup === "All" || record.productGroup === filters.productGroup) && (filters.supplier === "All" || record.supplier === filters.supplier);
    });
  }, [search, filters]);

  return (
    <div className="ncr-dashboard">
      <section className="ncr-filter-bar" aria-label="Dashboard filters">
        <FilterSelect label="Date Range" value={filters.dateRange} options={["Last 12 Months", "Last 6 Months", "Year to Date"]} onChange={(value) => updateFilter("dateRange", value)} />
        <FilterSelect label="Country" value={filters.country} options={ncrFilterOptions.country} onChange={(value) => updateFilter("country", value)} />
        <FilterSelect label="Product Line" value={filters.productLine} options={ncrFilterOptions.productLine} onChange={(value) => updateFilter("productLine", value)} />
        <FilterSelect label="Product Group" value={filters.productGroup} options={ncrFilterOptions.productGroup} onChange={(value) => updateFilter("productGroup", value)} />
        <FilterSelect label="Supplier" value={filters.supplier} options={ncrFilterOptions.supplier} onChange={(value) => updateFilter("supplier", value)} />
        <FilterSelect label="Status" value={filters.status} options={ncrFilterOptions.status} onChange={(value) => updateFilter("status", value)} />
        <button type="button" className="ncr-reset" onClick={resetFilters}><RotateCcw size={15} />Reset Filters</button>
      </section>

      <div className="ncr-kpi-grid">
        {ncrKpis.map((kpi, index) => { const Icon = kpiIcons[index]; return (
          <article className="ncr-card kpi-card" key={kpi.label}><div className="kpi-top"><span className="kpi-icon"><Icon size={18} /></span><span className={`kpi-trend ${kpi.positive ? "positive" : "negative"}`}>{kpi.trend.startsWith("-") ? <TrendingDown size={13} /> : <TrendingUp size={13} />}{kpi.trend}</span></div><span className="kpi-label">{kpi.label}</span><strong>{kpi.value}</strong><small>vs. previous period</small></article>
        ); })}
      </div>

      <div className="ncr-primary-charts">
        <ChartCard title="Cause of Error" metric="NCR Count" className="cause-chart">
          <ResponsiveContainer width="100%" height="100%"><BarChart data={causeOfErrorData} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 14 }}><CartesianGrid stroke="#edf0ea" horizontal={false} /><XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis dataKey="name" type="category" width={92} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f6f7f4" }} formatter={(value) => [`${Number(value).toLocaleString()} NCRs`, "NCR Count"]} /><Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>{causeOfErrorData.map((entry, index) => <Cell key={entry.name} fill={categoryColors[index]} />)}</Bar></BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Ageing" metric="NCR Count">
          <ResponsiveContainer width="100%" height="100%"><BarChart data={ageingData} margin={{ top: 12, right: 8, bottom: 0, left: -16 }}><CartesianGrid stroke="#edf0ea" vertical={false} /><XAxis dataKey="bucket" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} formatter={(value, name) => [`${Number(value).toLocaleString()} NCRs`, name]} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12 }} /><Bar dataKey="closed" name="Closed" stackId="age" fill={statusColors.closed} radius={[3, 3, 0, 0]} /><Bar dataKey="open" name="Open" stackId="age" fill={analyticsColors.blue} radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Status">
          <div className="status-chart-layout"><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={ncrStatusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={83} paddingAngle={2} stroke="none">{ncrStatusData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${Number(value).toLocaleString()} NCRs`, "NCR Count"]} /></PieChart></ResponsiveContainer><div className="donut-center"><strong>2,845</strong><span>Total NCR</span></div></div><div className="status-legend">{ncrStatusData.map((item) => <div key={item.name}><i style={{ background:item.color }} /><span>{item.name}</span><strong>{item.value.toLocaleString()}</strong></div>)}</div></div>
        </ChartCard>
      </div>

      <ChartCard title="Product Group" metric="NCR Count & Cost of Quality ($M)" className="product-chart">
        <ResponsiveContainer width="100%" height="100%"><ComposedChart data={productGroupData} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}><CartesianGrid stroke="#edf0ea" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} unit="M" /><Tooltip contentStyle={tooltipStyle} formatter={(value, name) => name === "Cost of Quality ($M)" ? [`$${value}M`, name] : [`${Number(value).toLocaleString()} NCRs`, name]} /><Legend iconSize={8} wrapperStyle={{ fontSize: 12 }} /><Bar yAxisId="left" dataKey="ncr" name="NCR Count" radius={[4, 4, 0, 0]} barSize={34}>{productGroupData.map((entry, index) => <Cell key={entry.name} fill={categoryColors[index]} />)}</Bar><Line yAxisId="right" dataKey="coq" name="Cost of Quality ($M)" stroke={analyticsColors.purple} strokeWidth={3} dot={{ r:4, fill:"#fff", stroke:analyticsColors.purple, strokeWidth:2 }} activeDot={{ r:6 }} /></ComposedChart></ResponsiveContainer>
      </ChartCard>

      <section className="ncr-card ncr-details"><div className="ncr-details-header"><div><h2>NCR Details</h2><span>{filteredRecords.length} records</span></div><label className="ncr-table-search"><Search size={16} /><span className="sr-only">Search NCR details</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search NCR number, issue title or supplier..." /></label></div><div className="ncr-table-scroll"><table><thead><tr><th>NCR No</th><th>Status</th><th>Product Group</th><th>Issue Title</th><th>Supplier</th><th>Date Reported</th></tr></thead><tbody>{filteredRecords.length ? filteredRecords.map((record) => <tr key={record.number}><td><strong>{record.number}</strong></td><td><span className={`ncr-status ${record.status.toLowerCase().replace(" ", "-")}`}>{record.status}</span></td><td>{record.productGroup}</td><td>{record.issueTitle}</td><td>{record.supplier}</td><td>{record.dateReported}</td></tr>) : <tr><td colSpan={6} className="ncr-no-results">No NCR records match your search or filters.</td></tr>}</tbody></table></div></section>
    </div>
  );
}
