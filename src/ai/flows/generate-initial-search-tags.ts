'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate initial search tags from an image using Google Gemini Vision.
 *
 * - generateInitialSearchTags - An async function that takes an image data URI and returns a list of search tags.
 * - GenerateInitialSearchTagsInput - The input type for the generateInitialSearchTags function.
 * - GenerateInitialSearchTagsOutput - The output type for the generateInitialSearchTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialSearchTagsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Ensure proper formatting and documentation.
    ),
});

export type GenerateInitialSearchTagsInput = z.infer<typeof GenerateInitialSearchTagsInputSchema>;

const GenerateInitialSearchTagsOutputSchema = z.object({
  searchTags: z
    .array(z.string())
    .describe('An array of search tags extracted from the image.'),
});

export type GenerateInitialSearchTagsOutput = z.infer<typeof GenerateInitialSearchTagsOutputSchema>;

export async function generateInitialSearchTags(
  input: GenerateInitialSearchTagsInput
): Promise<GenerateInitialSearchTagsOutput> {
  return generateInitialSearchTagsFlow(input);
}

const generateInitialSearchTagsPrompt = ai.definePrompt({
  name: 'generateInitialSearchTagsPrompt',
  input: {schema: GenerateInitialSearchTagsInputSchema},
  output: {schema: GenerateInitialSearchTagsOutputSchema},
  prompt: `You are an AI assistant designed to extract relevant search tags from product images.
  Analyze the provided image and identify key objects, attributes, and characteristics that would be useful for searching for similar products.
  Return a list of search tags that are specific, descriptive, and concise.

  Image: {{media url=photoDataUri}}
  Tags:`, // Use media helper to pass image data.
});

const generateInitialSearchTagsFlow = ai.defineFlow(
  {
    name: 'generateInitialSearchTagsFlow',
    inputSchema: GenerateInitialSearchTagsInputSchema,
    outputSchema: GenerateInitialSearchTagsOutputSchema,
  },
  async input => {
    const {output} = await generateInitialSearchTagsPrompt(input);
    return output!;
  }
);
