"use server";

import { generateInitialSearchTags } from '@/ai/flows/generate-initial-search-tags';
import { suggestRefinedSearchTags } from '@/ai/flows/suggest-refined-search-tags';
import { catalog, type Product } from '@/lib/catalog';

export interface SearchResult {
    initialTags: string[];
    refinedTags: string[];
    products: Product[];
}

export async function handleImageUpload(photoDataUri: string): Promise<SearchResult> {
    try {
        const { searchTags: initialTags } = await generateInitialSearchTags({ photoDataUri });
        
        let refinedTags: string[] = [];
        if(initialTags.length > 0) {
            const { refinedTags: suggested } = await suggestRefinedSearchTags({ initialTags });
            refinedTags = suggested;
        }

        const products = searchProductsByTags(initialTags);

        return {
            initialTags,
            refinedTags,
            products,
        };
    } catch (error) {
        console.error("Error during image processing:", error);
        // In a real app, you'd want more robust error handling and logging
        throw new Error("Failed to process image and find products. Please try again.");
    }
}

export async function searchByTags(tags: string[]): Promise<Product[]> {
    return searchProductsByTags(tags);
}


function searchProductsByTags(tags: string[]): Product[] {
    if (tags.length === 0) {
        return [];
    }

    const lowerCaseTags = tags.map(tag => tag.toLowerCase().trim());

    const scoredProducts = catalog.map(product => {
        let score = 0;
        const productTags = product.tags.map(t => t.toLowerCase());
        const productName = product.name.toLowerCase();
        const productDescription = product.description.toLowerCase();
        
        lowerCaseTags.forEach(searchTag => {
            // Full tag match gets a high score
            if (productTags.includes(searchTag)) {
                score += 1;
            }
            // Partial match in product name
            if (productName.includes(searchTag)) {
                score += 0.5;
            }
            // Partial match in product description
            if (productDescription.includes(searchTag)) {
                score += 0.2;
            }
        });

        return { product, score };
    });

    const filteredAndSorted = scoredProducts
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

    return filteredAndSorted.map(item => item.product);
}
