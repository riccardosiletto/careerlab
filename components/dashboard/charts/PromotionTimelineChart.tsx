'use client';

import { Clock } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import { Cell } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface PromotionTimelineChartProps {
  data: Array<{ years: string; count: number; percentage: number }>;
}

// Color palette for bars
const COLORS = ['#6D7BFC', '#B6DC00', '#9D52FF', '#FEC800', '#8D96AC'];

export default function PromotionTimelineChart({ data }: PromotionTimelineChartProps) {
  // Check for empty data
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Clock className="h-1 w-5 text-[#6D7BFC]" />
            <CardTitle>First Promotion Timeline</CardTitle>
          </div>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <p className="text-sm text-[#8D96AC]">No promotion data to display</p>
        </CardContent>
      </Card>
    );
  }

  // Transform data for recharts
  const chartData = data.map((item, index) => ({
    years: item.years,
    count: item.count,
    percentage: item.percentage,
    fill: COLORS[index % COLORS.length],
  }));

  // Create chart config
  const chartConfig = {
    count: {
      label: 'Count',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  // Find the most common promotion timeline
  const mostCommon = data.reduce((prev, current) =>
    (current.count > prev.count) ? current : prev
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>First Promotion Timeline</CardTitle>
        </div>
        <CardDescription>Time to first promotion distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="years"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: '#5A607F', fontSize: 13, fontWeight: 500 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Most promotions within {mostCommon.years} <Clock className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
