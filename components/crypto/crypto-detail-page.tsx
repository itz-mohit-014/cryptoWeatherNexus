"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { fetchCryptoDetail } from "@/lib/redux/features/crypto/cryptoSlice"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CryptoChart } from "./crypto-chart"
import { CryptoStats } from "./crypto-stats"
import { ArrowDown, ArrowLeft, ArrowUp, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Favorite from "../ui/Favorite"

interface CryptoDetailPageProps {
  id: string
}

export function CryptoDetailPage({ id }: CryptoDetailPageProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { detail, detailLoading, detailError } = useSelector((state: RootState) => state.crypto)

  useEffect(() => {
    dispatch(fetchCryptoDetail(id))

    // Set up polling for crypto data every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchCryptoDetail(id))
    }, 60000)

    return () => clearInterval(interval)
  }, [dispatch, id])

  if(detail) {
    console.log(detail)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout>
        <div className="flex items-center gap-2 mb-6">
          <Link href="/crypto">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          
          <h1 className="flex-1 text-xl sm:text-3xl font-bold">Cryptocurrency Details</h1>
          {detail && <Favorite category="crypto" data={detail}/> }
        </div>

        {detailLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : detailError ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-destructive">Failed to load crypto details</p>
          </div>
        ) : detail ? (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                      {detail.symbol.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-bold mt-2">{detail.name}</h2>
                    <p className="text-muted-foreground">{detail.symbol}</p>
                  </div>

                  <div className="flex-1 flex gap-4 flex-wrap ">
                    <div className="bg-muted p-4 rounded-lg text-center flex-1">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-2xl font-bold">${detail.price.toFixed(2)}</p>
                      <div
                        className={`flex items-center justify-center text-sm ${
                          detail.change24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {detail.change24h >= 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(detail.change24h).toFixed(2)}%
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg text-center flex-1">
                      <p className="text-sm text-muted-foreground">Market Cap</p>
                      <p className="text-3xl font-bold">${(detail.marketCap / 1000000000).toFixed(2)}B</p>
                    </div>

                    <div className="bg-muted p-4 rounded-lg text-center flex-1">
                      <p className="text-sm text-muted-foreground">Volume (24h)</p>
                      <p className="text-3xl font-bold">${(detail.volume24Hr / 1000000.0).toFixed(2)}M</p>
                    </div>

                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="chart">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Price Chart</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Price History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <CryptoChart data={detail.priceHistory} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="stats" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CryptoStats data={detail} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p>No cryptocurrency data found</p>
          </div>
        )}
      </DashboardLayout>
    </div>
  )
}

