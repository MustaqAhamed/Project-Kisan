'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating expert advice on crop improvement and problem-solving.
 *
 * The flow takes crop details, location, and challenges as input and provides AI-powered advice.
 * - generateExpertAdvice - A function that calls the generateExpertAdviceFlow with the input and returns the output.
 * - GenerateExpertAdviceInput - The input type for the generateExpertAdvice function.
 * - GenerateExpertAdviceOutput - The return type for the generateExpertAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExpertAdviceInputSchema = z.object({
  cropDetails: z.string().describe('Detailed information about the crop being grown.'),
  location: z.string().describe('The geographical location where the crop is planted.'),
  currentChallenges: z.string().describe('Description of current problems or challenges being faced with the crop.'),
});
export type GenerateExpertAdviceInput = z.infer<typeof GenerateExpertAdviceInputSchema>;

const GenerateExpertAdviceOutputSchema = z.object({
  advice: z.string().describe('AI-powered expert advice on how to improve yield or address potential problems.'),
});
export type GenerateExpertAdviceOutput = z.infer<typeof GenerateExpertAdviceOutputSchema>;

export async function generateExpertAdvice(input: GenerateExpertAdviceInput): Promise<GenerateExpertAdviceOutput> {
  return generateExpertAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExpertAdvicePrompt',
  input: {schema: GenerateExpertAdviceInputSchema},
  output: {schema: GenerateExpertAdviceOutputSchema},
  prompt: `You are an expert agricultural advisor. A farmer will provide details about their crop, its location, and the challenges they are currently facing. Based on this information, provide actionable advice to improve their yield and address any potential problems.

Crop Details: {{{cropDetails}}}
Location: {{{location}}}
Current Challenges: {{{currentChallenges}}}

Expert Advice:`,
});

const generateExpertAdviceFlow = ai.defineFlow(
  {
    name: 'generateExpertAdviceFlow',
    inputSchema: GenerateExpertAdviceInputSchema,
    outputSchema: GenerateExpertAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
