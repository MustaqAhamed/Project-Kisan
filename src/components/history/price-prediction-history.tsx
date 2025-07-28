import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
  
  const mockPredictionHistory = [
    {
      id: 1,
      date: "2025-07-26",
      query: {
        cropName: "Onion"
      },
      prediction: "The market for Onions is expected to see a slight increase over the next week, with prices potentially rising by 5-7% due to seasonal demand. The average price is predicted to be around ₹2900-₹3100 per quintal."
    },
    {
      id: 2,
      date: "2025-07-24",
      query: {
        cropName: "Wheat"
      },
      prediction: "Wheat prices are likely to remain stable with minor fluctuations. The current supply levels are adequate to meet demand, keeping the price in the ₹2250-₹2350 per quintal range."
    },
    {
      id: 3,
      date: "2025-07-20",
      query: {
        cropName: "Tomato"
      },
      prediction: "Tomato prices are expected to be volatile due to unseasonal rains in key growing regions. We predict a price range of ₹4200-₹4500 per quintal, with a possibility of a sharp increase if supply is disrupted further."
    }
  ];
  
  export function PricePredictionHistory() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Past Price Predictions</CardTitle>
          <CardDescription>A log of all your previous price prediction queries.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {mockPredictionHistory.map(item => (
              <AccordionItem value={`item-${item.id}`} key={item.id}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between pr-4">
                    <span className="font-medium text-left truncate">Prediction for {item.query.cropName}</span>
                    <span className="text-sm text-muted-foreground font-normal shrink-0 ml-4">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="rounded-md border bg-muted/50 p-4">
                    <h4 className="font-semibold">Your Query:</h4>
                     <p className="mt-2 text-sm text-muted-foreground">
                        <strong>Crop:</strong> {item.query.cropName}
                    </p>
                  </div>
                  <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
                    <h4 className="font-semibold text-primary">AI Prediction Summary:</h4>
                    <p className="mt-2 text-sm">{item.prediction}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    );
  }