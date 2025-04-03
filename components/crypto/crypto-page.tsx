"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/redux/store";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CryptoCard } from "./crypto-card";
import { Loader2 } from "lucide-react";
import { fetchInitialCryptoData } from "@/lib/redux/features/crypto/cryptoSlice";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { fetchWeatherDetail } from "@/lib/redux/features/weather/weatherSlice";

export function CryptoPage() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.crypto
  );

  const dispatch = useDispatch<AppDispatch>();

  const [cryptoName, setCryptoName] = useState("");
  const router = useRouter();

  const handleFetchCryptoDetails = (e: any) => {
    e.preventDefault();
    dispatch(fetchWeatherDetail(cryptoName.toLowerCase()))
    router.push("/crypto/" + cryptoName);
  };

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchInitialCryptoData());
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <h1 className="text-3xl font-bold mb-6">Cryptocurrency Dashboard</h1>

        <form onSubmit={handleFetchCryptoDetails} className="flex gap-2">
          <Input
            type="text"
            value={cryptoName}
            className="bg-secondary"
            placeholder="Check Weather..."
            onChange={(e) => setCryptoName(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
        </div>

        {loading || data.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-destructive">Failed to load crypto data</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        )}
      </DashboardLayout>
    </div>
  );
}
