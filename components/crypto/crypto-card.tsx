import Link from "next/link"
import { ArrowDown, ArrowUp, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CryptoData } from "@/lib/redux/features/crypto/cryptoSlice"
import { useState } from "react"
import Favorite from "../ui/Favorite"

interface CryptoCardProps {
  crypto: CryptoData
}

export function CryptoCard({ crypto }: CryptoCardProps) {


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-1 justify-between">
          <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            {crypto.symbol.charAt(0)}
          </div>
          {crypto.name}
          </div>

          <Favorite category={"crypto"} data={crypto}/>
        </CardTitle>

      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold">${crypto.price.toFixed(2)}</p>
            <div
              className={`flex items-center justify-center text-lg ${
                crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {crypto.change24h >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {Math.abs(crypto.change24h).toFixed(2)}%
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-muted p-3 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-lg font-medium">${(crypto.marketCap / 1000000000).toFixed(2)}B</p>
            </div>
            <div className="bg-muted p-3 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Volume (24h)</p>
              <p className="text-lg font-medium">${(crypto.volume24Hr / 1000000).toFixed(2)}M</p>
            </div>
          </div>
          <Link href={`/crypto/${crypto.id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

