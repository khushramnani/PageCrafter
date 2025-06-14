'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
// import { format } from 'date-fns';

type Project = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  thumbnail?: string;
  slug: string;
};

export default function ProjectCard({ project, view }: { project: Project; view: 'grid' | 'list' }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/buildArea/${project.slug}`);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when interacting with the 3-dot menu
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 ${
        view === 'grid' ? 'w-64' : 'w-full flex items-center gap-4'
      } border border-gray-100 hover:shadow-md transition-shadow cursor-pointer`}
      onClick={handleCardClick}
    >
      <Image
        src={project.thumbnail || 'https://placehold.co/600x400/png'}
        alt={project.name}
        width={view === 'grid' ? 224 : 64}
        height={view === 'grid' ? 128 : 64}
        className="rounded-md object-cover"
      />
      <div className={view === 'grid' ? 'mt-2' : 'flex-1'}>
        <h3 className="text-lg font-semibold truncate">{project.name}</h3>
        <p className="text-sm text-gray-500">{project.type}</p>
        <p className="text-xs text-gray-400">
          {(new Date(project.createdAt), 'MMM dd, yyyy')}
        </p>
      </div>
      <div onClick={handleMenuClick}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}