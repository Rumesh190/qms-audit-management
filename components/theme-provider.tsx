"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const accentOptions = [
  { id:"gold", name:"Gold", color:"#EAB308", hover:"#CA8A04", soft:"#FEFCE8", border:"#FDE68A", foreground:"#1F2937", focus:"rgba(234, 179, 8, 0.25)" },
  { id:"blue", name:"Blue", color:"#2563EB", hover:"#1D4ED8", soft:"#EFF6FF", border:"#BFDBFE", foreground:"#FFFFFF", focus:"rgba(37, 99, 235, 0.25)" },
  { id:"indigo", name:"Indigo", color:"#4F46E5", hover:"#4338CA", soft:"#EEF2FF", border:"#C7D2FE", foreground:"#FFFFFF", focus:"rgba(79, 70, 229, 0.25)" },
  { id:"emerald", name:"Emerald", color:"#059669", hover:"#047857", soft:"#ECFDF5", border:"#A7F3D0", foreground:"#FFFFFF", focus:"rgba(5, 150, 105, 0.25)" },
  { id:"teal", name:"Teal", color:"#0D9488", hover:"#0F766E", soft:"#F0FDFA", border:"#99F6E4", foreground:"#FFFFFF", focus:"rgba(13, 148, 136, 0.25)" },
  { id:"orange", name:"Orange", color:"#EA580C", hover:"#C2410C", soft:"#FFF7ED", border:"#FDBA74", foreground:"#FFFFFF", focus:"rgba(234, 88, 12, 0.25)" },
  { id:"rose", name:"Rose", color:"#E11D48", hover:"#BE123C", soft:"#FFF1F2", border:"#FECDD3", foreground:"#FFFFFF", focus:"rgba(225, 29, 72, 0.25)" },
] as const;

export type AccentId=(typeof accentOptions)[number]["id"];
type ThemeContextValue={accent:AccentId;setAccent:(accent:AccentId)=>void};
const ThemeContext=createContext<ThemeContextValue|undefined>(undefined);
const STORAGE_KEY="qms-accent";

function applyAccent(id:AccentId){
  const option=accentOptions.find((item)=>item.id===id)??accentOptions[0];
  const root=document.documentElement;
  root.dataset.accent=option.id;
  root.style.setProperty("--accent",option.color);
  root.style.setProperty("--accent-hover",option.hover);
  root.style.setProperty("--accent-soft",option.soft);
  root.style.setProperty("--accent-border",option.border);
  root.style.setProperty("--accent-foreground",option.foreground);
  root.style.setProperty("--accent-focus",option.focus);
}

export function ThemeProvider({children}:{children:ReactNode}){
  const [accent,setAccentState]=useState<AccentId>("gold");
  useEffect(()=>{const stored=window.localStorage.getItem(STORAGE_KEY) as AccentId|null;const initial=accentOptions.some((item)=>item.id===stored)?stored!:"gold";applyAccent(initial);const frame=window.requestAnimationFrame(()=>setAccentState(initial));return()=>window.cancelAnimationFrame(frame);},[]);
  const setAccent=(next:AccentId)=>{setAccentState(next);applyAccent(next);window.localStorage.setItem(STORAGE_KEY,next);};
  return <ThemeContext.Provider value={{accent,setAccent}}>{children}</ThemeContext.Provider>;
}

export function useTheme(){const context=useContext(ThemeContext);if(!context)throw new Error("useTheme must be used inside ThemeProvider");return context;}
