import { Cloud, CloudRain, Sun } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { WeatherForecastData } from "@/lib/redux/features/weather/weatherSlice"

interface WeatherTableProps {
  data: WeatherForecastData[]
}

export function WeatherTable({ data }: WeatherTableProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rain":
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Cloud className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Temperature</TableHead>
          <TableHead>Humidity</TableHead>
          <TableHead>Wind</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((day) => (
          <TableRow key={day.date}>
            <TableCell>
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getWeatherIcon(day.condition)}
                <span>{day.condition}</span>
              </div>
            </TableCell>
            <TableCell>{day.temperature}°C</TableCell>
            <TableCell>{day.humidity}%</TableCell>
            <TableCell>{day.windSpeed} km/h</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

