"use client";

import { getWeatherIcon } from "@/components/dashboard/weather-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { removeFavoriteCity, removeFavoriteCrypto } from "@/lib/redux/features/favorites/myFavoritesSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function MyFavorite() {
  const myFavorites = useSelector((state: RootState) => state.myFavorites);

  const dispatch = useDispatch<AppDispatch>()

  const handleRemoveFavorite = (category:string, id:string) => {
    if(category === "cities"){
      dispatch(removeFavoriteCity(id))
      toast.success("Remove favorite citi.")
      
    }else{
      dispatch(removeFavoriteCrypto(id))
      toast.success("Remove favorite Crypto")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-6 sm:text-nowrap">
        My Favorite List
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="max-sm:text-xl">Weather</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-y-6 flex-col sm:gap-4">
            {myFavorites.cities.length === 0 ? (
              <p className="text-secondary text-center">
                You don't have store any city in favorite list.
              </p>
            ) : (
              myFavorites.cities.map((city) => (
                <div className="flex items-center justify-between gap-2">
                <Link className="flex-1" key={city.id} href={`/weather/${city.id}`}>
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
                      <p className="text-xl font-semibold">
                        {city.temperature}°C
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Humidity: {city.humidity}%
                      </p>
                    </div>
                  </div>
                </Link>
                  <Button variant="outline" onClick={() => handleRemoveFavorite("cities", city.id)}>
                    <X stroke="red" className=""/>
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-1 justify-between">
            <CardTitle className="max-sm:text-xl">Cryptocurrency</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-6 sm:gap-4">
            {myFavorites.crypto.length === 0 ? (
              <p className="text-secondary text-center">
                You don't have any crypo currency in favorite list.
              </p>
            ) : (
              myFavorites.crypto.map((crypto) => (
                <div className="flex items-center justify-between gap-2">
                <Link className="flex-1" key={crypto.id} href={`/crypto/${crypto.id}`}>
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
                          crypto.change24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
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
                  <Button variant="outline" onClick={() => handleRemoveFavorite("crypto", crypto.id)}>
                    <X stroke="red" className=""/>
                  </Button>        
                </div>

              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
