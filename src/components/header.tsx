import { SearchCode } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SearchCode className="h-7 w-7" />
          <h1 className="text-xl font-bold tracking-tight font-headline">
            ImagoFind
          </h1>
        </div>
      </div>
    </header>
  );
}
