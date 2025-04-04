"use client"

import { DashboardLayout } from "./dashboard-layout"
import { WeatherSection } from "./weather-section"
import { CryptoSection } from "./crypto-section"
import { NewsSection } from "./news-section"
import { useEffect } from "react"
import { fetchWeatherData } from "@/lib/redux/features/weather/weatherSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/lib/redux/store"
import { fetchInitialCryptoData } from "@/lib/redux/features/crypto/cryptoSlice"
import { fetchNewsData } from "@/lib/redux/features/news/newsSlice"

export function DashboardPage() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {

    dispatch(fetchWeatherData())
    dispatch(fetchInitialCryptoData());
    dispatch(fetchNewsData())

  }, [dispatch])


  return (
    <div className="relative min-h-screen bg-background">
      <DashboardLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeatherSection />
          <CryptoSection />
          <NewsSection />
        </div>
      </DashboardLayout>
    </div>
  )
}

