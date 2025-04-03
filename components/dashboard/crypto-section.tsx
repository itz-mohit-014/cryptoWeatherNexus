"use client";

import { useSelector } from "react-redux";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import type { RootState } from "@/lib/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CryptoSection() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-1 justify-between">
        <CardTitle className="max-sm:text-xl">Cryptocurrency</CardTitle>
        <Link href="/crypto">
          <Button variant="outline" size="sm" className="max-sm:text-xs">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6 sm:gap-4">
        {loading && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <p className="text-destructive">Failed to load crypto data</p>
        )}

        {data &&
          data.map((crypto) => (
            <Link key={crypto.id} href={`/crypto/${crypto.id}`}>
              <div className="flex items-center justify-between py-3 px-2 rounded-lg group hover:bg-muted cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full group-hover:bg-muted-foreground bg-muted flex items-center justify-center">
                    {crypto.symbol.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium max-sm:text-sm text-base">
                      {crypto.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {crypto.symbol}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className=" sm:text-xl font-semibold">
                    ${crypto.price.toFixed(2)}
                  </p>

                  <div
                    className={`flex items-center justify-end text-sm ${
                      crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {crypto.change24h >= 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(crypto.change24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </CardContent>
    </Card>
  );
}
