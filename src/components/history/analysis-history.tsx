import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockAnalysisHistory = [
  {
    id: 1,
    image: "https://placehold.co/400x300.png",
    dataAiHint: "diseased leaf",
    date: "2023-10-02",
    analysis: "Analysis indicates signs of powdery mildew. Consider a fungicide application.",
    status: "Action Required"
  },
  {
    id: 2,
    image: "https://placehold.co/400x300.png",
    dataAiHint: "healthy crop",
    date: "2023-09-28",
    analysis: "The plant appears healthy with no visible signs of stress or disease.",
    status: "Healthy"
  },
  {
    id: 3,
    image: "https://placehold.co/400x300.png",
    dataAiHint: "pest damage",
    date: "2023-09-15",
    analysis: "Evidence of aphid infestation found on the underside of leaves.",
    status: "Action Required"
  }
];

export function AnalysisHistory() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockAnalysisHistory.map(item => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="p-0">
             <div className="relative aspect-[4/3] w-full">
                <Image src={item.image} data-ai-hint={item.dataAiHint} alt={`Analysis ${item.id}`} layout="fill" objectFit="cover" />
             </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{item.analysis}</p>
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Badge variant={item.status === 'Healthy' ? 'secondary' : 'destructive'}>{item.status}</Badge>
            <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
