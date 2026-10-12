/** Dated AIAtlasHub editorial changes, not vendor product releases.
 * Add entries only when the described site change is committed.
 * The date is the AIAtlasHub editorial update date; it does NOT imply
 * that pricing, product functionality or security claims were re-verified.
 */
export type CatalogUpdate={
 date:string;
 title:string;
 summary:string;
 toolNames:readonly string[];
 kind:'catalog'|'editorial'|'site';
};
export const catalogUpdates:CatalogUpdate[]=[
 {
  date:'2026-10-12',
  title:'Catalog change log introduced',
  summary:'Added a dated directory update log and a transparent distinction between site changes and vendor product verification.',
  toolNames:[],
  kind:'site'
 }
];
export const catalogUpdateDate=(name:string)=>catalogUpdates.find(entry=>entry.toolNames.includes(name))?.date;

/** Explicit evidence records only. Do not infer a verification date from a
 * catalog edit, a live link, or the date a tool was added to the directory.
 */
export type ToolVerification={
 checkedOn:string;
 sourceUrls:readonly string[];
 scope:readonly ('identity'|'pricing'|'capabilities'|'privacy'|'security')[];
 note:string;
};
export const toolVerifications:Record<string,ToolVerification>={};
export const toolHistory=(name:string)=>catalogUpdates.filter(entry=>entry.toolNames.includes(name));
