'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating expert agricultural advice based on user inputs.
 *
 * The flow takes crop details, location, and current conditions as input and provides AI-powered advice.
 * - generateAgriculturalAdvice - A function that calls the generateAgriculturalAdviceFlow with the input and returns the output.
 * - GenerateAgriculturalAdviceInput - The input type for the generateAgriculturalAdvice function.
 * - GenerateAgriculturalAdviceOutput - The return type for the generateAgriculturalAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAgriculturalAdviceInputSchema = z.object({
  cropType: z.string().describe('The type of crop being grown (e.g., corn, wheat, soybeans).'),
  cropCondition: z.string().describe('The current condition of the crop (e.g., healthy, diseased, stressed).'),
  location: z.string().describe('The geographical location where the crop is planted.'),
  specificDetails: z.string().describe('Any other specific details about the crop or growing conditions.'),
});
export type GenerateAgriculturalAdviceInput = z.infer<typeof GenerateAgriculturalAdviceInputSchema>;

const GenerateAgriculturalAdviceOutputSchema = z.object({
  advice: z.string().describe('AI-powered expert advice tailored to the specific crop details, condition, and location.'),
});
export type GenerateAgriculturalAdviceOutput = z.infer<typeof GenerateAgriculturalAdviceOutputSchema>;

export async function generateAgriculturalAdvice(
  input: GenerateAgriculturalAdviceInput
): Promise<GenerateAgriculturalAdviceOutput> {
  return generateAgriculturalAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAgriculturalAdvicePrompt',
  input: {schema: GenerateAgriculturalAdviceInputSchema},
  output: {schema: GenerateAgriculturalAdviceOutputSchema},
  prompt: `You are an expert agricultural advisor. A farmer will provide details about their crop, its condition, location, and any other relevant information. Based on this information, provide actionable and tailored advice to improve their farming practices and crop yield.

Crop Type: {{{cropType}}}
Crop Condition: {{{cropCondition}}}
Location: {{{location}}}
Specific Details: {{{specificDetails}}}

Expert Agricultural Advice:`,
});

const generateAgriculturalAdviceFlow = ai.defineFlow(
  {
    name: 'generateAgriculturalAdviceFlow',
    inputSchema: GenerateAgriculturalAdviceInputSchema,
    outputSchema: GenerateAgriculturalAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
