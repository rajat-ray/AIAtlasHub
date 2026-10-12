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
 },
 {
  date:'2026-10-12',
  title:'First official-source verification pass',
  summary:'Reviewed official product and pricing pages for ChatGPT, Claude and GitHub Copilot. Verified only product identity, pricing structure and listed capabilities; no hands-on testing or privacy/security audit.',
  toolNames:['ChatGPT','Claude','GitHub Copilot'],
  kind:'editorial'
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
export const toolVerifications:Record<string,ToolVerification>={
 'ChatGPT':{
  checkedOn:'2026-10-12',
  sourceUrls:['https://chatgpt.com/pricing/'],
  scope:['identity','pricing','capabilities'],
  note:'Official ChatGPT pricing page checked for Free and paid plan availability, and listed chat, file and research capabilities. Plan limits and regional charges can change; privacy and security were not assessed.'
 },
 'Claude':{
  checkedOn:'2026-10-12',
  sourceUrls:['https://claude.com/pricing'],
  scope:['identity','pricing','capabilities'],
  note:'Official Claude pricing page checked for Free, Pro and Max offerings and published plan features. The vendor lists Pro at USD 20 monthly or USD 17 per month with annual billing, before applicable taxes. Privacy and security were not assessed.'
 },
 'GitHub Copilot':{
  checkedOn:'2026-10-12',
  sourceUrls:['https://github.com/features/copilot','https://docs.github.com/en/copilot/get-started/plans'],
  scope:['identity','pricing','capabilities'],
  note:'Official GitHub product and documentation pages checked for a Free tier, paid individual and organization plans, and IDE, CLI and GitHub-integrated assistance. Usage limits and credits vary by plan; privacy and security were not assessed.'
 }
};
export const toolHistory=(name:string)=>catalogUpdates.filter(entry=>entry.toolNames.includes(name));
