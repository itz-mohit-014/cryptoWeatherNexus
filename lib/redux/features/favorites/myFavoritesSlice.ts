import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "../weather/weatherSlice";
import { CryptoData } from "../crypto/cryptoSlice";

// State Type
interface FavoritesState {
  cities: WeatherData[];
  crypto: CryptoData[];
}

// Load data from localStorage
const loadFromStorage = <T>(key: string): T[] => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

// Initial state with persisted data
const initialState: FavoritesState = {
  cities: loadFromStorage<WeatherData>("favoriteCities"),
  crypto: loadFromStorage<CryptoData>("favoriteCryptoCurrency"),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavoriteCity: (state, action: PayloadAction<WeatherData>) => {
      const cityExists = state.cities.some(city => city.id === action.payload.id);
      if (!cityExists) {
        state.cities.push(action.payload);
        localStorage.setItem("favoriteCities", JSON.stringify(state.cities));
      }
    },

    removeFavoriteCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
      localStorage.setItem("favoriteCities", JSON.stringify(state.cities));
     },

    addFavoriteCrypto: (state, action: PayloadAction<CryptoData>) => {
      const weatherExists = state.crypto.some(crypto => crypto.id === action.payload.id);
      if (!weatherExists) {
        state.crypto.push(action.payload);
        localStorage.setItem("favoriteCryptoCurrency", JSON.stringify(state.crypto));
      }
    },

    removeFavoriteCrypto: (state, action: PayloadAction<string>) => {
      state.crypto = state.crypto.filter(crypto => crypto.id !== action.payload);
      localStorage.setItem("favoriteCryptoCurrency", JSON.stringify(state.crypto));
    },
  },
});

export const { addFavoriteCity, removeFavoriteCity, addFavoriteCrypto, removeFavoriteCrypto } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
