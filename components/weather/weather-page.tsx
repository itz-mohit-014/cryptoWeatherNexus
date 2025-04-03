"use client"

import { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { fetchWeatherData, fetchWeatherDetail, WeatherData } from "@/lib/redux/features/weather/weatherSlice"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { WeatherCard } from "./weather-card"
import { Loader2 } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export function WeatherPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector((state: RootState) => state.weather)

  const [weatherName, setWeatherName] = useState("")
  const router  = useRouter()

  const handleFetchWeatherDetails = (e:any) => {
    e.preventDefault();
    dispatch(fetchWeatherDetail(weatherName))
    router.push("/weather/" + weatherName);
  }

  useEffect(() => {
    if(data.length === 0){
      dispatch(fetchWeatherData())
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout>
        <div className="flex justify-between items-center gap-2 flex-wrap">

        <h1 className="text-3xl font-bold mb-6 sm:text-nowrap">Weather Dashboard</h1>

        <form onSubmit={handleFetchWeatherDetails} className="flex gap-2">
        <Input type="text" value={weatherName} className="bg-secondary" placeholder="Check Weather..." onChange={(e) => setWeatherName(e.target.value)}/>
        <Button type="submit">Search</Button>
        </form>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-destructive">Failed to load weather data</p>
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((city:WeatherData) => (
              <WeatherCard key={city.id} city={city} />
            ))}
          </div>

          
        )}


      </DashboardLayout>
    </div>
  )
}

