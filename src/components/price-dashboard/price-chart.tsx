"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PriceRecord } from "@/lib/types";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function PriceChart({ data }: { data: PriceRecord[] }) {
  const commodities = useMemo(() => [...new Set(data.map(item => item.commodity))], [data]);
  const [selectedCommodity, setSelectedCommodity] = useState(commodities[0]);

  const chartData = useMemo(() => {
    return data
      .filter(item => item.commodity === selectedCommodity)
      .map(item => ({
        date: item.date,
        price: item.price,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data, selectedCommodity]);

  return (
    <div className="space-y-4">
        <div className="w-full sm:w-64">
             <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
                <SelectTrigger id="commodity-select" aria-label="Select commodity">
                    <SelectValue placeholder="Select a commodity" />
                </SelectTrigger>
                <SelectContent>
                    {commodities.map(commodity => (
                        <SelectItem key={commodity} value={commodity}>
                            {commodity}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ResponsiveContainer>
                <RechartsAreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => format(new Date(value), "MMM d")}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        domain={['dataMin - 100', 'dataMax + 100']}
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
                </RechartsAreaChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  );
}
