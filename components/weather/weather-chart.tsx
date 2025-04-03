"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import type { WeatherHistoryData } from "@/lib/redux/features/weather/weatherSlice"

interface WeatherChartProps {
  data: WeatherHistoryData[]
}

export function WeatherChart({ data }: WeatherChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}°C`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-2 border shadow-sm">
                  <div className="text-sm">
                    <p className="font-medium">{new Date(payload[0].payload.date).toLocaleDateString()}</p>
                    <p>Temperature: {payload[0].value}°C</p>
                    <p>Humidity: {payload[0].payload.humidity}%</p>
                  </div>
                </Card>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

