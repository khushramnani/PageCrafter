'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search projects..."
        className="pl-10 focus:ring-8 outline-1"
      />
    </div>
  );
}