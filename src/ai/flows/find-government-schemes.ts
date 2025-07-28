'use server';

/**
 * @fileOverview This file defines a Genkit flow for finding and explaining government agricultural schemes.
 *
 * The flow takes a user's query about their needs and returns relevant government schemes,
 * their descriptions, eligibility criteria, and application links.
 * - findGovernmentSchemes - A function that calls the findGovernmentSchemesFlow.
 * - FindGovernmentSchemesInput - The input type for the findGovernmentSchemes function.
 * - FindGovernmentSchemesOutput - The return type for the findGovernmentSchemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindGovernmentSchemesInputSchema = z.object({
  query: z.string().describe('The user query describing their need, e.g., "subsidies for drip irrigation".'),
});
export type FindGovernmentSchemesInput = z.infer<typeof FindGovernmentSchemesInputSchema>;

const SchemeSchema = z.object({
  schemeName: z.string().describe('The name of the government scheme.'),
  description: z.string().describe('A simple, clear explanation of the scheme.'),
  eligibility: z.string().describe('A summary of the eligibility requirements for the scheme.'),
  applicationLink: z.string().describe('A direct URL to the application portal or information page for the scheme.'),
});

const FindGovernmentSchemesOutputSchema = z.object({
  schemes: z.array(SchemeSchema).describe('A list of relevant government schemes found.'),
});
export type FindGovernmentSchemesOutput = z.infer<typeof FindGovernmentSchemesOutputSchema>;

export async function findGovernmentSchemes(
  input: FindGovernmentSchemesInput
): Promise<FindGovernmentSchemesOutput> {
  return findGovernmentSchemesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findGovernmentSchemesPrompt',
  input: {schema: FindGovernmentSchemesInputSchema},
  output: {schema: FindGovernmentSchemesOutputSchema},
  prompt: `You are an expert on government agricultural schemes in India. A farmer will ask about a specific need. Your task is to identify relevant government schemes, explain them in simple terms, list the eligibility requirements, and provide a direct link to the application portal or official page.

  User's Need: {{{query}}}

  Search for relevant schemes and provide the details. If no specific schemes are found, state that you could not find any matching schemes for the query.
  `,
});

const findGovernmentSchemesFlow = ai.defineFlow(
  {
    name: 'findGovernmentSchemesFlow',
    inputSchema: FindGovernmentSchemesInputSchema,
    outputSchema: FindGovernmentSchemesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
