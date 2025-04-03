"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { fetchWeatherDetail } from "@/lib/redux/features/weather/weatherSlice"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeatherChart } from "./weather-chart"
import { WeatherTable } from "./weather-table"
import { ArrowLeft, Cloud, CloudRain, Loader2, Sun } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Favorite from "../ui/Favorite"

interface WeatherDetailPageProps {
  id: string
}

export function WeatherDetailPage({ id }: WeatherDetailPageProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { detail, detailLoading, detailError } = useSelector((state: RootState) => state.weather)

  useEffect(() => {
    dispatch(fetchWeatherDetail(id))
  }, [dispatch, id])

  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case "clear":
      case "sunny":
        return <Sun className="h-16 w-16 text-yellow-500" />
      case "cloudy":
      case "partly cloudy":
        return <Cloud className="h-16 w-16 text-gray-500" />
      case "rain":
      case "rainy":
        return <CloudRain className="h-16 w-16 text-blue-500" />
      default:
        return <Cloud className="h-16 w-16 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/weather">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className= "flex-1 text-xl sm:text-3xl font-bold">Weather Details</h1>
          {detail && <Favorite category="cities" data={detail}/> }
        </div>

        {detailLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : detailError ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-destructive">Failed to load weather details</p>
          </div>
        ) : detail ? (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row  lg:items-stretch gap-6">
                  <div className="flex flex-col items-center">
                    {getWeatherIcon(detail.condition)}
                    <h2 className="text-2xl font-bold mt-2">{detail.name}</h2>
                    <p className="text-muted-foreground">{detail.condition}</p>
                  </div>

                  <div className="flex-1 flex flex-wrap gap-4">
                    <div className="flex items-center justify-center flex-col gap-0.5 bg-muted p-4 rounded-lg text-center flex-1">
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="text-3xl font-bold">{detail.temperature}°C</p>
                    </div>
                    <div className="flex items-center justify-center flex-col gap-0.5 bg-muted p-4 rounded-lg text-center flex-1">
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="text-3xl font-bold">{detail.humidity}%</p>
                    </div>
                    <div className="flex items-center justify-center flex-col gap-0.5 bg-muted p-4 rounded-lg text-center flex-1">
                      <p className="text-sm text-muted-foreground">Wind Speed</p>
                      <p className="text-3xl font-bold">{detail.windSpeed} km/h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="chart">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Temperature Chart</TabsTrigger>
                <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Temperature History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <WeatherChart data={detail.history} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="forecast" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>7-Day Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WeatherTable data={detail.forecast} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p>No weather data found</p>
          </div>
        )}
      </DashboardLayout>
    </div>
  )
}

