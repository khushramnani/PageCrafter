'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { PROJECT_TYPES } from '@/types/constants/project';

export default function FilterButton({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          {filter || 'Filter by Type'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setFilter('')}>All</DropdownMenuItem>
        {PROJECT_TYPES.map((type) => (
          <DropdownMenuItem key={type} onClick={() => setFilter(type)}>
            {type}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}