export type DurationUnit="Day"|"Week"|"Month";
export type DefaultDueDateStatus="Active"|"Inactive";
export type DefaultDueDate={id:string;name:string;value:number;unit:DurationUnit;status:DefaultDueDateStatus};
export function dueDateName(value:number,unit:DurationUnit){return `${value} ${unit}${value===1?"":"s"}`;}
export const defaultDueDates:DefaultDueDate[]=[
  {id:"DUE-001",name:"2 Days",value:2,unit:"Day",status:"Active"},
  {id:"DUE-002",name:"1 Week",value:1,unit:"Week",status:"Active"},
  {id:"DUE-003",name:"2 Weeks",value:2,unit:"Week",status:"Active"},
  {id:"DUE-004",name:"3 Weeks",value:3,unit:"Week",status:"Active"},
  {id:"DUE-005",name:"1 Month",value:1,unit:"Month",status:"Active"},
  {id:"DUE-006",name:"2 Months",value:2,unit:"Month",status:"Active"},
];
const STORAGE_KEY="qms-default-due-dates";
export function readDefaultDueDates():DefaultDueDate[]{if(typeof window==="undefined")return defaultDueDates;try{const stored=window.localStorage.getItem(STORAGE_KEY);return stored?JSON.parse(stored) as DefaultDueDate[]:defaultDueDates;}catch{return defaultDueDates;}}
export function writeDefaultDueDates(next:DefaultDueDate[]){window.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}
