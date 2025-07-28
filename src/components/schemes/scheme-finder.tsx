"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Landmark, Loader2, Search, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { findGovernmentSchemes, FindGovernmentSchemesOutput } from "@/ai/flows/find-government-schemes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formSchema = z.object({
  query: z.string().min(5, "Please enter a more detailed query."),
});

type FormValues = z.infer<typeof formSchema>;

export function SchemeFinder() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FindGovernmentSchemesOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      setResult(null);
      try {
        const schemes = await findGovernmentSchemes(values);
        setResult(schemes);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to find schemes. Please try again.",
        });
        console.error(error);
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
            <CardTitle>Find Schemes</CardTitle>
            <CardDescription>Describe what you're looking for, e.g., "subsidies for drip irrigation" or "crop insurance for wheat".</CardDescription>
        </CardHeader>
        <CardContent>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl>
                        <Input placeholder="Enter your query here..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="animate-spin" /> : <Search className="mr-2" />}
                    Find Schemes
                </Button>
                </form>
            </Form>
        </CardContent>
      </Card>
      
      {isPending && (
         <Card className="animate-pulse">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Bot/> Searching for Schemes...
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-8 w-full rounded bg-muted"></div>
                <div className="h-8 w-full rounded bg-muted"></div>
                <div className="h-8 w-full rounded bg-muted"></div>
            </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Landmark className="text-primary" /> Relevant Government Schemes
            </CardTitle>
             <CardDescription>
              Found {result.schemes.length} scheme(s) based on your query.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result.schemes.length > 0 ? (
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {result.schemes.map((scheme, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{scheme.schemeName}</AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                <div className="prose max-w-none dark:prose-invert">
                                    <h4>Description</h4>
                                    <p>{scheme.description}</p>
                                    <h4>Eligibility</h4>
                                    <p>{scheme.eligibility}</p>
                                </div>
                                <Button asChild variant="outline" size="sm">
                                    <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2" />
                                        Visit Portal
                                    </a>
                                </Button>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center text-muted-foreground p-8">
                    <p>No schemes found matching your query. Try rephrasing your request.</p>
                </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
