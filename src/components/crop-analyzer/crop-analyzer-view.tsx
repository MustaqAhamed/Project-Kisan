"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Bot, Camera, Loader2, Microscope, TestTube2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { analyzeCropImage, AnalyzeCropImageOutput } from "@/ai/flows/analyze-crop-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  photo: z.instanceof(File).refine(file => file.size > 0, "Please upload an image."),
});

type FormValues = z.infer<typeof formSchema>;

export function CropAnalyzerView() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<AnalyzeCropImageOutput | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("photo", file);
      form.clearErrors("photo");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      setResult(null);
      try {
        const photoDataUri = await toDataURL(values.photo);
        const analysisResult = await analyzeCropImage({ photoDataUri });
        setResult(analysisResult);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: "Failed to analyze the image. Please try again.",
        });
        console.error(error);
      }
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <CardDescription>Select a photo of the affected crop from your device.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-center rounded-lg border-2 border-dashed border-border p-6">
                    <div className="text-center">
                        {preview ? (
                             <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-lg">
                                 <Image src={preview} alt="Crop preview" layout="fill" objectFit="cover" />
                             </div>
                        ) : (
                            <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                        )}
                        <FormField
                            control={form.control}
                            name="photo"
                            render={() => (
                                <FormItem>
                                    <FormControl>
                                        <div className="mt-4 flex text-sm leading-6">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"
                                            >
                                                <span>Upload a file</span>
                                                <Input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1 text-muted-foreground">or drag and drop</p>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                        <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                <Button type="submit" disabled={isPending || !preview} className="w-full">
                  {isPending ? <Loader2 className="animate-spin" /> : <Microscope className="mr-2"/>}
                  Analyze Image
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        {isPending && (
            <>
                <Card className="animate-pulse">
                    <CardHeader><div className="h-6 w-1/2 rounded bg-muted"></div></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="h-4 w-full rounded bg-muted"></div>
                        <div className="h-4 w-5/6 rounded bg-muted"></div>
                    </CardContent>
                </Card>
                <Card className="animate-pulse">
                    <CardHeader><div className="h-6 w-1/2 rounded bg-muted"></div></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="h-4 w-full rounded bg-muted"></div>
                        <div className="h-4 w-5/6 rounded bg-muted"></div>
                    </CardContent>
                </Card>
            </>
        )}
        {result ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <TestTube2 className="text-primary" /> Health Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert">
                <p>{result.healthAnalysis}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Bot className="text-primary" /> Detailed Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none dark:prose-invert">
                 <h4>Potential Diseases</h4>
                 <p>{result.potentialDiseases}</p>
                 <h4>Nutrient Deficiencies</h4>
                 <p>{result.nutrientDeficiencies}</p>
                 <h4>General Assessment</h4>
                 <p>{result.generalAssessment}</p>
              </CardContent>
            </Card>
          </>
        ) : !isPending && (
             <Card className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                        <Bot className="h-8 w-8 text-muted-foreground"/>
                    </div>
                    <CardTitle className="font-headline pt-4">Awaiting Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your crop analysis will appear here once you upload an image.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
