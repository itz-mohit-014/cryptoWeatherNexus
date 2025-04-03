import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./features/weather/weatherSlice"
import cryptoReducer from "./features/crypto/cryptoSlice"
import newsReducer from "./features/news/newsSlice"
import favoriteReducer from "./features/favorites/myFavoritesSlice"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    myFavorites : favoriteReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

