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
 {date:'2026-10-12',title:'Catalog lifecycle corrections',summary:'Retired Humanloop after its documented September 2025 shutdown; updated Sourcegraph Cody to enterprise-only pricing and Protect AI to its Palo Alto Networks integration.',toolNames:['Sourcegraph Cody','Protect AI'],kind:'catalog'},

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
 },
 {
  date:'2026-10-12',
  title:'Official-source verification: coding and research tools',
  summary:'Checked official pricing and product documentation for Cursor, Gemini, Perplexity and NotebookLM (now described as Gemini Notebook by Google). Scope limited to identity, pricing structure and advertised capabilities.',
  toolNames:['Cursor','Gemini','Perplexity','NotebookLM'],
  kind:'editorial'
 },
 {
  date:'2026-10-12',
  title:'Official-source verification: coding and productivity tools',
  summary:'Checked vendor documentation for Windsurf (now branded Devin Desktop), Replit, Notion AI and Canva. Verified advertised plans and capabilities only, not security, privacy or product performance.',
  toolNames:['Devin Desktop','Replit','Notion AI','Canva'],
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
 'Sourcegraph Cody':{checkedOn:'2026-10-12',sourceUrls:['https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans','https://sourcegraph.com/changelog/7-0-removals-deprecations'],scope:['identity','pricing','capabilities'],note:'Sourcegraph discontinued Cody Free and Pro in July 2025; Enterprise remained supported. The 2026 changelog also describes Cody Web being replaced by Deep Search. No security or privacy audit.'},
 'Protect AI':{checkedOn:'2026-10-12',sourceUrls:['https://investors.paloaltonetworks.com/news-releases/news-release-details/palo-alto-networks-completes-acquisition-protect-ai'],scope:['identity','capabilities'],note:'Palo Alto Networks announced completion of the Protect AI acquisition in July 2025 and integration into Prisma AIRS. Current pricing was not independently checked; no security audit.'},

 'Devin Desktop':{checkedOn:'2026-10-12',sourceUrls:['https://windsurf.com/editor'],scope:['identity','pricing','capabilities'],note:'Official vendor page states Windsurf is now named Devin Desktop and lists Free, Pro, Max, Teams and Enterprise options. The IDE remains accessible, with agent-management features. Historical brand name retained in the directory pending a separate catalog identity review. No privacy/security audit.'},
 'Replit':{checkedOn:'2026-10-12',sourceUrls:['https://replit.com/pricing','https://replit.com/blog/pro-plan'],scope:['identity','pricing','capabilities'],note:'Official pricing and product update pages show Starter free, Core, Pro and Enterprise; AI app building, hosted projects and usage credits vary by plan. The former Teams plan was sunset. No privacy/security audit.'},
 'Notion AI':{checkedOn:'2026-10-12',sourceUrls:['https://www.notion.com/help/notion-ai-faqs','https://www.notion.com/pricing'],scope:['identity','pricing','capabilities'],note:'Official Notion sources show Notion AI is included with Business and Enterprise plans; Free and Plus receive limited trial responses. Premium models and some agents can require credits. The directory Paid label refers to ongoing full-feature access. No privacy/security audit.'},
 'Canva':{checkedOn:'2026-10-12',sourceUrls:['https://www.canva.com/pricing/','https://www.canva.com/help/using-canva-ai/'],scope:['identity','pricing','capabilities'],note:'Official Canva pricing and help pages describe Free and paid plans, differing monthly AI allowances and expanded Canva AI features on eligible paid plans. Limits and entitlements can change. No privacy/security audit.'},
 'Cursor':{checkedOn:'2026-10-12',sourceUrls:['https://cursor.com/pricing','https://prod.cursor.com/docs/models-and-pricing'],scope:['identity','pricing','capabilities'],note:'Official pricing and model documentation checked: Hobby free, individual paid plans and team plans; AI coding, agent features and model usage pools described. Prices and limits may vary by region and plan. No independent performance or security testing.'},
 'Gemini':{checkedOn:'2026-10-12',sourceUrls:['https://gemini.google/sg/subscriptions/?hl=en'],scope:['identity','pricing','capabilities'],note:'Google Singapore subscription page checked for Free, AI Plus, AI Pro and AI Ultra tiers, and advertised Gemini app features. Prices are regional and usage limits change; no privacy or security audit.'},
 'Perplexity':{checkedOn:'2026-10-12',sourceUrls:['https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you','https://www.perplexity.ai/hub'],scope:['identity','pricing','capabilities'],note:'Official help center and product page checked for Standard (Free), Pro, Max and enterprise options, research and source-backed search features. Subscription limits and availability vary; no privacy or security audit.'},
 'NotebookLM':{checkedOn:'2026-10-12',sourceUrls:['https://support.google.com/gemininotebook/answer/16213268?hl=en'],scope:['identity','pricing','capabilities'],note:'Official Google help page checked for free Standard notebook access and expanded limits through Google AI plans and eligible Workspace plans. Google now labels the product Gemini Notebook in its documentation. No independent data-handling or security audit.'},

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
