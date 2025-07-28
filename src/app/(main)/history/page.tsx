import { PageHeader } from '@/components/common/page-header';
import { AdviceHistory } from '@/components/history/advice-history';
import { AnalysisHistory } from '@/components/history/analysis-history';
import { PricePredictionHistory } from '@/components/history/price-prediction-history';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HistoryPage() {
    return (
        <div className="container mx-auto">
             <PageHeader
                title="User History"
                description="Review your past interactions, including AI advice, crop analyses, and price predictions."
            />
             <div className="mt-8">
                <Tabs defaultValue="advice">
                    <TabsList className="grid w-full grid-cols-3 sm:w-[500px]">
                        <TabsTrigger value="advice">Advice History</TabsTrigger>
                        <TabsTrigger value="analysis">Analysis History</TabsTrigger>
                        <TabsTrigger value="prediction">Prediction History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="advice" className="mt-4">
                        <AdviceHistory />
                    </TabsContent>
                    <TabsContent value="analysis" className="mt-4">
                        <AnalysisHistory />
                    </TabsContent>
                    <TabsContent value="prediction" className="mt-4">
                        <PricePredictionHistory />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
