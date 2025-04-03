import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { WeatherData } from "@/lib/redux/features/weather/weatherSlice";
import { getWeatherIcon } from "../dashboard/weather-section";
import { useState } from "react";
import Favorite from "../ui/Favorite";

interface WeatherCardProps {
  city: WeatherData;
}

export function WeatherCard({ city }: WeatherCardProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-1 justify-between">
          {city.name}
          <Favorite category={"cities"} data={city}/>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {getWeatherIcon(city.condition)}
          <div className="text-center">
            <p className="text-4xl font-bold">{city.temperature}°C</p>
            <p className="text-lg text-muted-foreground">{city.condition}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-muted p-3 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-lg font-medium">{city.humidity}%</p>
            </div>
            <div className="bg-muted p-3 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="text-lg font-medium">{city.windSpeed} km/h</p>
            </div>
          </div>
          <Link href={`/weather/${city.id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
