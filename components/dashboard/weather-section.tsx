"use client";

import { useSelector } from "react-redux";
import { Cloud, CloudRain, Loader2, Sun } from "lucide-react";
import type { RootState } from "@/lib/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "clear":
    case "sunny":
      return <Sun className="h-8 w-8 text-yellow-500" />;
    case "cloudy":
    case "partly cloudy":
      return <Cloud className="h-8 w-8 text-gray-500" />;
    case "rain":
    case "rainy":
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    default:
      return <Cloud className="h-8 w-8 text-gray-500" />;
  }
};

export function WeatherSection() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="max-sm:text-xl">Weather</CardTitle>
        <Link href="/weather">
          <Button variant="outline" size="sm" className="max-sm:text-xs">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex gap-y-6 flex-col sm:gap-4">
        {loading && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <p className="text-destructive">Failed to load Weather data</p>
        )}

        {data &&
          data.map((city) => (
            <Link key={city.id} href={`/weather/${city.id}`}>
              <div className="flex items-center gap-1 justify-between sm:p-3 rounded-lg hover:bg-muted cursor-pointer">
                <div className="flex items-center gap-3">
                  {getWeatherIcon(city.condition)}
                  <div className="sm:block hidden"></div>
                  <div>
                    <h3 className="font-medium">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {city.condition}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">{city.temperature}°C</p>
                  <p className="text-sm text-muted-foreground">
                    Humidity: {city.humidity}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </CardContent>
    </Card>
  );
}
