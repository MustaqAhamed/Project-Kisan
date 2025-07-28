"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateExpertAdvice, GenerateExpertAdviceOutput } from "@/ai/flows/generate-expert-advice";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  cropDetails: z.string().min(2, "Please enter valid crop details."),
  location: z.string().min(2, "Please enter a valid location."),
  currentChallenges: z
    .string()
    .min(10, "Please describe the challenges you are facing in more detail."),
});

type FormValues = z.infer<typeof formSchema>;

export function ExpertAdviceForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateExpertAdviceOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropDetails: "",
      location: "",
      currentChallenges: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      setResult(null);
      try {
        const advice = await generateExpertAdvice(values);
        setResult(advice);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to get expert advice. Please try again.",
        });
        console.error(error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cropDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop Details</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 'Potato, Kennebec variety'"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The type and variety of crop you are growing.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 'Idaho, USA' or 'Punjab, India'"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your geographical location (farm, city, or region).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentChallenges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Challenges</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Leaves are showing black spots and wilting...'"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe any issues, pests, or diseases you're observing.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Sparkles className="mr-2" />
            )}
            Get Expert Advice
          </Button>
        </form>
      </Form>
      {isPending && (
         <Card className="animate-pulse">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Bot/> Generating Advice...
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-4 w-3/4 rounded bg-muted"></div>
                <div className="h-4 w-full rounded bg-muted"></div>
                <div className="h-4 w-5/6 rounded bg-muted"></div>
            </CardContent>
        </Card>
      )}
      {result && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bot className="text-primary" /> Expert Advice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <p>{result.advice}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
