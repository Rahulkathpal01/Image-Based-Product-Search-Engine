"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Loader2, Search, X, Sparkles, AlertCircle } from 'lucide-react';
import { handleImageUpload, searchByTags, type SearchResult } from '@/app/actions';
import type { Product } from '@/lib/catalog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ProductGrid, ProductGridSkeleton } from './product-grid';
import { TagPills, TagPillsSkeleton } from './tag-pills';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type SearchState = 'idle' | 'loading' | 'results';

export function ImageSearchForm() {
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        });
        return;
      }
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    if (!imagePreview) return;
    setSearchState('loading');
    try {
      const result = await handleImageUpload(imagePreview);
      setSearchResult(result);
      setSearchState('results');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: (error as Error).message || "An unexpected error occurred.",
      });
      setSearchState('idle'); // Revert to idle to allow retry
    }
  };
  
  const handleTagClick = async (tag: string) => {
    setSearchState('loading');
    try {
        const products = await searchByTags([tag]);
        setSearchResult(prev => ({
            initialTags: prev?.initialTags || [],
            refinedTags: prev?.refinedTags || [],
            products
        }));
        setSearchState('results');
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Search Failed",
        description: "Could not perform search for the selected tag.",
      });
      setSearchState('results'); // Go back to previous results state
    }
  }

  const resetSearch = () => {
    setSearchState('idle');
    setImagePreview(null);
    setUploadedFile(null);
    setSearchResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderIdleState = () => (
    <Card className="shadow-lg">
      <CardContent className="p-6 text-center">
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 cursor-pointer hover:bg-muted transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            {imagePreview ? "Image ready to upload" : "Click or drag image to upload"}
          </p>
          <p className="text-sm text-muted-foreground/70">PNG, JPG, or WEBP (Max 4MB)</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
          />
        </div>
        {imagePreview && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <Image
              src={imagePreview}
              alt="Image preview"
              width={200}
              height={200}
              className="rounded-lg object-cover shadow-md"
            />
            <div className="flex gap-2">
              <Button onClick={handleSearch} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Search className="mr-2 h-4 w-4" />
                Find Products
              </Button>
               <Button variant="outline" onClick={resetSearch}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderLoadingState = () => (
    <div className="space-y-8 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 lg:w-1/4">
                <Card>
                    <CardContent className="p-4">
                        <div className="w-full h-48 bg-muted rounded-md" />
                    </CardContent>
                </Card>
            </div>
            <div className="flex-1 space-y-4">
                <TagPillsSkeleton title="AI is analyzing your image..." />
                <TagPillsSkeleton title="Generating suggestions..." />
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Searching for matching products...</h2>
            <ProductGridSkeleton />
        </div>
    </div>
  );

  const renderResultsState = () => (
    searchResult && (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <Card className="shadow-lg sticky top-8">
                        <CardContent className="p-4 flex flex-col items-center gap-4">
                            <p className="font-semibold text-center">Your Image</p>
                            <Image
                              src={imagePreview!}
                              alt="Uploaded product"
                              width={200}
                              height={200}
                              className="rounded-lg object-cover"
                            />
                            <Button variant="outline" onClick={resetSearch} className="w-full">
                                <Search className="mr-2 h-4 w-4" />
                                Search Again
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-1 space-y-6">
                    <TagPills title="AI Generated Tags" icon={Sparkles} tags={searchResult.initialTags} />
                    <TagPills title="Refine Your Search" icon={Sparkles} tags={searchResult.refinedTags} onTagClick={handleTagClick} isClickable />
                </div>
            </div>

            <div className="pt-8">
                <h2 className="text-3xl font-bold tracking-tight text-center mb-6">Found {searchResult.products.length} Matching Products</h2>
                {searchResult.products.length > 0 ? (
                    <ProductGrid products={searchResult.products} />
                ) : (
                    <Alert variant="default" className="max-w-2xl mx-auto">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>No Matches Found</AlertTitle>
                        <AlertDescription>
                            We couldn&apos;t find any products matching the tags from your image. Try a different image or a clearer one.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    )
  );

  return (
    <div>
        {searchState === 'idle' && renderIdleState()}
        {searchState === 'loading' && renderLoadingState()}
        {searchState === 'results' && renderResultsState()}
    </div>
  );
}
