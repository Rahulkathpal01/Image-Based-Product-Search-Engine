'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest refined or related search tags based on initial AI-generated tags.
 *
 * It exports:
 * - `suggestRefinedSearchTags`: An async function that takes initial tags as input and returns suggested refined tags.
 * - `SuggestRefinedSearchTagsInput`: The input type for the suggestRefinedSearchTags function.
 * - `SuggestRefinedSearchTagsOutput`: The output type for the suggestRefinedSearchTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRefinedSearchTagsInputSchema = z.object({
  initialTags: z
    .array(z.string())
    .describe('An array of initial AI-generated tags for a product image.'),
});

export type SuggestRefinedSearchTagsInput = z.infer<
  typeof SuggestRefinedSearchTagsInputSchema
>;

const SuggestRefinedSearchTagsOutputSchema = z.object({
  refinedTags: z
    .array(z.string())
    .describe(
      'An array of suggested refined or related search tags to narrow down or broaden the search.'
    ),
});

export type SuggestRefinedSearchTagsOutput = z.infer<
  typeof SuggestRefinedSearchTagsOutputSchema
>;

export async function suggestRefinedSearchTags(
  input: SuggestRefinedSearchTagsInput
): Promise<SuggestRefinedSearchTagsOutput> {
  return suggestRefinedSearchTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRefinedSearchTagsPrompt',
  input: {schema: SuggestRefinedSearchTagsInputSchema},
  output: {schema: SuggestRefinedSearchTagsOutputSchema},
  prompt: `You are an AI-powered search refinement assistant. Given an initial set of product tags, suggest refined or related tags that can help narrow down or broaden the search.

Initial Tags: {{initialTags}}

Suggest a list of refined tags to improve search accuracy and relevance, return as an array of strings.`,
});

const suggestRefinedSearchTagsFlow = ai.defineFlow(
  {
    name: 'suggestRefinedSearchTagsFlow',
    inputSchema: SuggestRefinedSearchTagsInputSchema,
    outputSchema: SuggestRefinedSearchTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
