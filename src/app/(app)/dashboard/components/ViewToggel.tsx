'use client';

import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

export default function ViewToggle({
  view,
  setView,
}: {
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
}) {
  return (
    <div className="flex gap-2 ">
      <Button
        variant={view === 'grid' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setView('grid')}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === 'list' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setView('list')}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}