export const categorySlug=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const categoryIntros:Record<string,string>={
 'AI Assistants':'Explore general-purpose AI assistants for writing, analysis and daily tasks.',
 'AI Coding':'Compare coding assistants, app builders and code review workflows.',
 'AI Design':'Find AI image creation, interface design and visual editing tools.',
 'AI Video':'Discover video generation, editing and synthetic presentation tools.',
 'AI Audio':'Explore speech, music, transcription and voice workflows.',
 'AI Writing':'Review tools for drafting, revising and creative writing.',
 'AI Search':'Find AI research and search products for questions and literature discovery.',
 'AI Marketing':'Explore AI tools for content operations, campaigns and sales research.',
 'AI Productivity':'Discover tools for meetings, planning and everyday knowledge work.',
 'AI Observability':'Evaluate monitoring, tracing and model quality tooling.',
 'AI Infrastructure':'Explore model platforms, APIs and development infrastructure.',
 'AI Security':'Compare AI application security and guardrail products.',
 'AI Automation':'Discover workflow automation and agent orchestration options.'
};
