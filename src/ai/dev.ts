import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-crop-image.ts';
import '@/ai/flows/generate-expert-advice.ts';
import '@/ai/flows/predict-market-price.ts';
import '@/ai/flows/find-government-schemes.ts';
