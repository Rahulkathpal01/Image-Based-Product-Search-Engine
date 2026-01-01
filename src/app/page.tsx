import { Header } from '@/components/header';
import { ImageSearchForm } from '@/components/image-search-form';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <ImageSearchForm />
      </main>
    </div>
  );
}
