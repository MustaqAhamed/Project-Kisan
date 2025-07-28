"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { predictMarketPrice, PredictMarketPriceOutput } from "@/ai/flows/predict-market-price";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const formSchema = z.object({
  cropName: z.string().min(2, "Please enter a valid crop name."),
});

type FormValues = z.infer<typeof formSchema>;

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function PricePredictor() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<PredictMarketPriceOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      setResult(null);
      try {
        const prediction = await predictMarketPrice(values);
        setResult(prediction);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to get price prediction. Please try again.",
        });
        console.error(error);
      }
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="cropName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="e.g., 'Wheat', 'Tomato', 'Onion'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : <TrendingUp className="mr-2" />}
            Predict Price
          </Button>
        </form>
      </Form>

      {isPending && (
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-1/3 rounded bg-muted"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 w-full rounded bg-muted"></div>
            <div className="h-4 w-5/6 rounded bg-muted"></div>
            <div className="mt-4 h-48 w-full rounded bg-muted"></div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot className="text-primary" /> Prediction for {form.getValues("cropName")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none dark:prose-invert">
              <p>{result.predictionSummary}</p>
            </div>
            
            <div>
              <h4 className="mb-2 font-semibold">7-Day Predicted Price Trend (per Quintal)</h4>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <ResponsiveContainer>
                    <AreaChart data={result.priceTrend} margin={{ left: 0, right: 12, top: 5, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            domain={['dataMin - 50', 'dataMax + 50']}
                            tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="price"
                            type="monotone"
                            fill="var(--color-price)"
                            fillOpacity={0.4}
                            stroke="var(--color-price)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
