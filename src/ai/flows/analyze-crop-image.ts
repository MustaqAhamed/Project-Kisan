'use server';

/**
 * @fileOverview An AI agent that analyzes a crop image and provides insights on the plant's health.
 *
 * - analyzeCropImage - A function that handles the crop image analysis process.
 * - AnalyzeCropImageInput - The input type for the analyzeCropImage function.
 * - AnalyzeCropImageOutput - The return type for the analyzeCropImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCropImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of a crop, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type AnalyzeCropImageInput = z.infer<typeof AnalyzeCropImageInputSchema>;

const AnalyzeCropImageOutputSchema = z.object({
  healthAnalysis: z
    .string()
    .describe('An analysis of the plant health based on the image.'),
  potentialDiseases: z
    .string()
    .describe('Potential diseases identified in the crop image.'),
  nutrientDeficiencies: z
    .string()
    .describe('Possible nutrient deficiencies observed in the crop.'),
  generalAssessment: z
    .string()
    .describe('A general assessment of the crop health based on the image.'),
});
export type AnalyzeCropImageOutput = z.infer<typeof AnalyzeCropImageOutputSchema>;

export async function analyzeCropImage(
  input: AnalyzeCropImageInput
): Promise<AnalyzeCropImageOutput> {
  return analyzeCropImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCropImagePrompt',
  input: {schema: AnalyzeCropImageInputSchema},
  output: {schema: AnalyzeCropImageOutputSchema},
  prompt: `You are an expert agricultural consultant.

You will analyze the provided image of the crop and provide insights on its health, potential diseases, nutrient deficiencies, and a general assessment.

Analyze the following crop image:

{{media url=photoDataUri}}`,
});

const analyzeCropImageFlow = ai.defineFlow(
  {
    name: 'analyzeCropImageFlow',
    inputSchema: AnalyzeCropImageInputSchema,
    outputSchema: AnalyzeCropImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
