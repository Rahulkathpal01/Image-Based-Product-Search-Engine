import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  image: ImagePlaceholder;
  tags: string[];
};

const findImage = (id: string): ImagePlaceholder => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        // Fallback or error
        return { id: 'error', description: 'Not found', imageUrl: 'https://placehold.co/600x400', imageHint: 'placeholder' };
    }
    return image;
};

export const catalog: Product[] = [
    {
        id: 'prod_001',
        name: 'Modern Blue Armchair',
        description: 'A comfortable and stylish armchair with a vibrant blue fabric and wooden legs, perfect for any modern living space.',
        image: findImage('blue-armchair'),
        tags: ['chair', 'armchair', 'blue', 'furniture', 'living room', 'modern', 'wood', 'upholstered'],
    },
    {
        id: 'prod_002',
        name: 'Durable Red Backpack',
        description: 'A spacious and durable red backpack, ideal for travel, school, or outdoor adventures. Features multiple storage compartments.',
        image: findImage('red-backpack'),
        tags: ['backpack', 'bag', 'red', 'travel', 'outdoors', 'school', 'durable', 'nylon'],
    },
    {
        id: 'prod_003',
        name: 'Oak Dining Table',
        description: 'A beautifully crafted solid oak dining table that seats six. Its minimalist design complements any dining room decor.',
        image: findImage('wood-table'),
        tags: ['table', 'dining', 'wood', 'oak', 'furniture', 'kitchen', 'minimalist', 'rectangle'],
    },
    {
        id: 'prod_004',
        name: 'Ultra-Slim Silver Laptop',
        description: 'A lightweight and powerful silver laptop with a high-resolution display and long battery life. Perfect for work and entertainment.',
        image: findImage('silver-laptop'),
        tags: ['laptop', 'computer', 'electronics', 'silver', 'slim', 'ultrabook', 'tech', 'metal'],
    },
    {
        id: 'prod_005',
        name: 'Classic White Sneakers',
        description: 'Timeless white leather sneakers that offer both comfort and style. A versatile addition to any wardrobe.',
        image: findImage('white-sneaker'),
        tags: ['sneakers', 'shoes', 'white', 'footwear', 'casual', 'leather', 'unisex', 'classic'],
    },
    {
        id: 'prod_006',
        name: 'Professional DSLR Camera',
        description: 'Capture stunning photos with this professional-grade DSLR camera, featuring a 24MP sensor and 4K video recording.',
        image: findImage('black-camera'),
        tags: ['camera', 'dslr', 'electronics', 'black', 'photography', 'professional', 'digital'],
    },
    {
        id: 'prod_007',
        name: 'Indoor Potted Plant',
        description: 'A lush, low-maintenance indoor plant in a stylish ceramic pot. Adds a touch of nature to your home or office.',
        image: findImage('green-plant'),
        tags: ['plant', 'potted', 'green', 'indoor', 'decor', 'ceramic', 'nature', 'houseplant'],
    },
    {
        id: 'prod_008',
        name: 'Classic Leather Wallet',
        description: 'A handcrafted brown leather bifold wallet with multiple card slots and a cash compartment. Ages beautifully over time.',
        image: findImage('leather-wallet'),
        tags: ['wallet', 'leather', 'brown', 'bifold', 'accessory', 'men', 'classic', 'handcrafted'],
    },
];
