'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from './utils/fetchApi';
import AuthGuard from './components/AuthGard';
import Navbar from './components/Navbar';
import CreateProjectModal from './components/CreateProject';
import SearchBar from './components/Searchbar';
import FilterButton from './components/FilterButton';
import ViewToggle from './components/ViewToggel';
import ProjectCard from './components/ProjectCard';

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filter || project.type === filter),
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-900 ">
        <Navbar />
        <main className="max-w-8xl mx-auto p-6">
          <div className='p-6 bg-gray-700 h-screen rounded-2xl'>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Projects</h1>
            <CreateProjectModal />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <SearchBar search={search} setSearch={setSearch} />
            <FilterButton filter={filter} setFilter={setFilter} />
            <ViewToggle view={view} setView={setView} />
          </div>
          {isLoading ? (
            <p>Loading projects...</p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-gray-500">No projects found.</p>
          ) : (
            <div
              className={`${
                view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                  : 'flex flex-col gap-4'
              }`}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} view={view} />
              ))}
            </div>
          )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}


