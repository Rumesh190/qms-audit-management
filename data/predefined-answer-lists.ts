export type PredefinedAnswerListStatus="Active"|"Inactive";
export type PredefinedAnswerOption={id:string;label:string;order:number};
export type PredefinedAnswerList={id:string;name:string;answers:PredefinedAnswerOption[];status:PredefinedAnswerListStatus};

const options=(id:string,labels:string[]):PredefinedAnswerOption[]=>labels.map((label,index)=>({id:`${id}-${index+1}`,label,order:index+1}));
export const predefinedAnswerLists:PredefinedAnswerList[]=[
  {id:"yes-no",name:"Yes / No",answers:options("yes-no",["Yes","No"]),status:"Active"},
  {id:"yes-no-na",name:"Yes / No / N/A",answers:options("yes-no-na",["Yes","No","N/A"]),status:"Active"},
  {id:"pass-fail",name:"Pass / Fail",answers:options("pass-fail",["Pass","Fail"]),status:"Active"},
  {id:"pass-fail-na",name:"Pass / Fail / N/A",answers:options("pass-fail-na",["Pass","Fail","N/A"]),status:"Active"},
  {id:"compliance",name:"Compliance Answers",answers:options("compliance",["Compliant","Partially Compliant","Non-Compliant","Not Applicable"]),status:"Active"},
  {id:"maturity",name:"Ratings",answers:options("maturity",["Excellent","Good","Average","Poor"]),status:"Active"},
];

const STORAGE_KEY="qms-predefined-answer-lists";
export function readPredefinedAnswerLists():PredefinedAnswerList[]{if(typeof window==="undefined")return predefinedAnswerLists;try{const stored=window.localStorage.getItem(STORAGE_KEY);return stored?JSON.parse(stored) as PredefinedAnswerList[]:predefinedAnswerLists;}catch{return predefinedAnswerLists;}}
export function writePredefinedAnswerLists(next:PredefinedAnswerList[]){window.localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}
