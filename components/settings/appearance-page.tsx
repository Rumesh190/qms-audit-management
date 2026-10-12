"use client";

import { Check, Palette } from "lucide-react";
import { accentOptions, useTheme } from "@/components/theme-provider";

export function AppearancePage(){
  const {accent,setAccent}=useTheme();
  return <div className="appearance-page"><header><div className="appearance-heading-icon"><Palette size={21}/></div><div><h1>Appearance</h1><p>Customize the visual accent used across your QMS workspace.</p></div></header><section className="appearance-section"><div><h2>Accent Color</h2><p>Choose an accent for primary actions, active navigation and focus states.</p></div><div className="accent-options" role="radiogroup" aria-label="Accent color">{accentOptions.map((option)=>{const selected=accent===option.id;return <button key={option.id} type="button" role="radio" aria-checked={selected} className={selected?"selected":""} onClick={()=>setAccent(option.id)}><span className="accent-swatch" style={{backgroundColor:option.color}}>{selected&&<Check size={16}/>}</span><span><strong>{option.name}</strong><small>{option.color}</small></span><i>{selected&&<Check size={16}/>}</i></button>;})}</div></section></div>;
}
