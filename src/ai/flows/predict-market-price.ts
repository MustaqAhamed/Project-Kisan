'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting market prices of agricultural crops.
 *
 * The flow takes a crop name as input and returns a predicted price and a series of data points for a trend graph.
 * - predictMarketPrice - A function that calls the predictMarketPriceFlow with the input and returns the output.
 * - PredictMarketPriceInput - The input type for the predictMarketPrice function.
 * - PredictMarketPriceOutput - The return type for the predictMarketPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictMarketPriceInputSchema = z.object({
  cropName: z.string().describe('The name of the crop for which to predict the market price.'),
});
export type PredictMarketPriceInput = z.infer<typeof PredictMarketPriceInputSchema>;

const PriceTrendDataPointSchema = z.object({
  day: z.string().describe('The day for the price point (e.g., "Day 1", "Day 2").'),
  price: z.number().describe('The predicted price for that day.'),
});

const PredictMarketPriceOutputSchema = z.object({
  predictionSummary: z.string().describe('A summary of the price prediction, including the likely price range and reasoning.'),
  priceTrend: z.array(PriceTrendDataPointSchema).describe('An array of predicted price points for the next 7 days to be used in a graph.'),
});
export type PredictMarketPriceOutput = z.infer<typeof PredictMarketPriceOutputSchema>;


export async function predictMarketPrice(
  input: PredictMarketPriceInput
): Promise<PredictMarketPriceOutput> {
  return predictMarketPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictMarketPricePrompt',
  input: {schema: PredictMarketPriceInputSchema},
  output: {schema: PredictMarketPriceOutputSchema},
  prompt: `You are an expert agricultural market analyst. Based on historical data, seasonality, and market trends, predict the market price for the following crop for the next 7 days.

Crop Name: {{{cropName}}}

Provide a summary of your prediction and a list of daily price points for a chart. The price should be per quintal. For the trend, provide a series of 7 data points for a graph with labels like 'Day 1', 'Day 2', etc.`,
});

const predictMarketPriceFlow = ai.defineFlow(
  {
    name: 'predictMarketPriceFlow',
    inputSchema: PredictMarketPriceInputSchema,
    outputSchema: PredictMarketPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
