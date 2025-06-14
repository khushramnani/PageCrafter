import { Project } from '@/types/projectModalTypes';

export async function getProjects(): Promise<Project[]> {
  const res = await fetch('/api/project/get-projects');
  if (!res.ok) throw new Error('Failed to fetch projects');
   const json = await res.json();
  return json.data; 
}

export async function createProject(data: {
  name: string;
  type: string;
  aiPrompt?: string;
}): Promise<Project> {
  const res = await fetch('/api/project/create-project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}