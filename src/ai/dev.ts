import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-search-tags.ts';
import '@/ai/flows/suggest-refined-search-tags.ts';