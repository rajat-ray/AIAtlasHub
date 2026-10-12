// Editorial audience mapping. A role match is a discovery suggestion, not a certification.
export const audiences: {id:string;label:string;description:string;tools:string[]}[] = [
{id:'students',label:'Students',description:'Study, research, writing and learning support',tools:['ChatGPT','Claude','Gemini','NotebookLM','Perplexity','Grammarly','Canva','Notion AI']},
{id:'teachers',label:'Teachers & Educators',description:'Lesson preparation, teaching resources and accessible content',tools:['ChatGPT','Claude','NotebookLM','Canva','Gemini','Grammarly','Synthesia']},
{id:'developers',label:'Software Developers',description:'Coding, debugging, prototypes and code review',tools:['GitHub Copilot','Cursor','Devin Desktop','Replit','Amazon Q Developer','Tabnine','Bolt.new','Lovable']},
{id:'architects',label:'Solution & Enterprise Architects',description:'Architecture research, solution design and engineering workflows',tools:['ChatGPT','Claude','GitHub Copilot','Perplexity','LangChain','LlamaIndex','n8n','Glean']},
{id:'security',label:'Cybersecurity Professionals',description:'AI security, threat research and application guardrails',tools:['Lakera Guard','Protect AI','ChatGPT','Claude','Perplexity','Langfuse','Arize AI']},
{id:'executives',label:'CTOs & Technology Leaders',description:'Technology strategy, productivity and AI governance',tools:['ChatGPT','Claude','Perplexity','Glean','GitHub Copilot','Notion AI','Langfuse','Arize AI']},
{id:'data',label:'Data Scientists & ML Engineers',description:'Model experiments, infrastructure and evaluation',tools:['Hugging Face','Weights & Biases','Arize AI','Together AI','Replicate','GroqCloud','Pinecone','Weaviate']},
{id:'researchers',label:'Researchers & Academics',description:'Source discovery, document synthesis and research notes',tools:['Perplexity','NotebookLM','ChatGPT','Claude','Gemini','Hugging Face']},
{id:'designers',label:'UI/UX & Product Designers',description:'Interface concepts, visual exploration and prototypes',tools:['Figma AI','Canva','Adobe Firefly','Midjourney','Lovable','Bolt.new']},
{id:'creators',label:'Content Creators & Marketers',description:'Design, video, audio and writing workflows',tools:['Canva','Runway','HeyGen','Synthesia','ElevenLabs','Descript','Suno','Grammarly']},
{id:'business',label:'Business & Operations Professionals',description:'Meeting notes, automation and workplace productivity',tools:['Zapier','Make','n8n','Notion AI','Otter.ai','Fireflies.ai','ChatGPT','Lindy']},
{id:'founders',label:'Founders & Entrepreneurs',description:'Research, prototypes, content and business operations',tools:['ChatGPT','Perplexity','Lovable','Bolt.new','Canva','Zapier','Replit','Notion AI']}
];
