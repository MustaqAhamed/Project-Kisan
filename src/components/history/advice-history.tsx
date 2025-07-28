import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const mockAdviceHistory = [
  {
    id: 1,
    date: "2025-07-15",
    question: {
      cropDetails: "Tomato, Roma variety",
      location: "Andhra Pradesh, India",
      currentChallenges: "Fruits have a black, sunken area at the blossom end. The weather has been very hot and dry."
    },
    answer: "This is likely blossom-end rot, a common issue in tomatoes caused by calcium deficiency and inconsistent watering. Ensure consistent soil moisture and consider applying a calcium-rich foliar spray to correct the deficiency."
  },
  {
    id: 2,
    date: "2025-07-02",
    question: {
      cropDetails: "Cotton, Bt Cotton",
      location: "Gujarat, India",
      currentChallenges: "Seeing white, cottony masses on the plants, and the leaves are turning yellow and sticky."
    },
    answer: "This indicates a mealybug infestation. It's crucial to manage them early. You can spray a solution of neem oil or insecticidal soap. For severe cases, consult a local agricultural extension for recommended pesticides."
  },
  {
    id: 3,
    date: "2025-06-20",
    question: {
      cropDetails: "Potato, Kennebec variety",
      location: "Idaho, USA",
      currentChallenges: "Leaves are showing black spots and wilting."
    },
    answer: "This sounds like early blight. It is recommended to apply a copper-based fungicide and ensure proper spacing for air circulation. Remove and destroy affected leaves to prevent spread."
  },
  {
    id: 4,
    date: "2025-06-11",
    question: {
      cropDetails: "Maize, Sweet corn",
      location: "Punjab, India",
      currentChallenges: "Stunted growth and yellow streaks on leaves."
    },
    answer: "The symptoms suggest a potential nitrogen deficiency. Consider applying a nitrogen-rich fertilizer. A soil test would confirm the specific nutrient imbalance. Also, check for pests like aphids."
  }
];

export function AdviceHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Advice Requests</CardTitle>
        <CardDescription>A log of all your previous consultations with the AI Expert System.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {mockAdviceHistory.map(item => (
            <AccordionItem value={`item-${item.id}`} key={item.id}>
              <AccordionTrigger>
                <div className="flex w-full items-center justify-between pr-4">
                  <span className="font-medium text-left truncate">{item.question.cropDetails}</span>
                  <span className="text-sm text-muted-foreground font-normal shrink-0 ml-4">{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="rounded-md border bg-muted/50 p-4">
                  <h4 className="font-semibold">Your Query:</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                    <li><strong>Crop:</strong> {item.question.cropDetails}</li>
                    <li><strong>Location:</strong> {item.question.location}</li>
                    <li><strong>Challenge:</strong> {item.question.currentChallenges}</li>
                  </ul>
                </div>
                <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
                  <h4 className="font-semibold text-primary">AI Advice:</h4>
                  <p className="mt-2 text-sm">{item.answer}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
