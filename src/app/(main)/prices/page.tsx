import { PageHeader } from '@/components/common/page-header';
import PriceChart from '@/components/price-dashboard/price-chart';
import { PricePredictor } from '@/components/price-dashboard/price-predictor';
import PriceTable from '@/components/price-dashboard/price-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { promises as fs } from 'fs';
import path from 'path';

export default async function PricesPage() {
    // In a real app, this data would come from an API.
    // Here we're reading it from a local JSON file for demonstration.
    const file = path.join(process.cwd(), 'src/lib/mock-prices.json');
    const json = await fs.readFile(file, 'utf8');
    const priceData = JSON.parse(json);

    return (
        <div className="container mx-auto">
            <PageHeader
                title="Mandi Price Dashboard"
                description="View the latest agricultural commodity prices from various markets. Switch between table and graph views."
            />
            <div className="mt-8">
                 <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Market Price Predictor</CardTitle>
                        <CardDescription>Enter a crop name to get an AI-powered price prediction for the upcoming week.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PricePredictor />
                    </CardContent>
                </Card>
                <Tabs defaultValue="table">
                    <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
                        <TabsTrigger value="table">Historical Table</TabsTrigger>
                        <TabsTrigger value="graph">Historical Graph</TabsTrigger>
                    </TabsList>
                    <TabsContent value="table" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Latest Mandi Prices</CardTitle>
                                <CardDescription>A summary of recent commodity prices across different markets.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PriceTable data={priceData} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="graph" className="mt-4">
                        <Card>
                             <CardHeader>
                                <CardTitle>Historical Price Trends</CardTitle>
                                <CardDescription>Visualize historical price fluctuations for a selected commodity over time.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PriceChart data={priceData} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
