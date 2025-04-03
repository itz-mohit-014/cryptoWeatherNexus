import type { CryptoDetailData } from "@/lib/redux/features/crypto/cryptoSlice"

interface CryptoStatsProps {
  data: CryptoDetailData
}

export function CryptoStats({ data }: CryptoStatsProps) {
  
  const stats = [
    { label: "Market Cap Rank", value: `#${data.marketCapRank}` },
    { label: "Market Cap", value: `$${(data.marketCap / 1000000000).toFixed(2)}B` },
    { label: "Volume (24h)", value: `$${(data.volume24Hr / 1000000).toFixed(2)}M` },
    { label: "Circulating Supply", value: `${(data.circulatingSupply / 1000000).toFixed(2)}M ${data.symbol}` },
    {
      label: "Max Supply",
      value: data.maxSupply ? `${(data.maxSupply / 1000000).toFixed(2)}M ${data.symbol}` : "Unlimited",
    },
    { label: "All-Time High", value: `$${data.allTimeHigh.toFixed(2)}` },
    { label: "All-Time High Date", value: new Date(data.allTimeHighDate).toLocaleDateString() },
    { label: "Price Change (24h)", value: `${data.change24h.toFixed(2)}%` },
    { label: "Price Change (7d)", value: `${data.change7d.toFixed(2)}%` },
    { label: "Price Change (30d)", value: `${data.change30d.toFixed(2)}%` },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex justify-between p-3 rounded-lg bg-muted/50">
          <span className="text-muted-foreground">{stat.label}</span>
          <span className="font-medium">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

