import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { filterEverydayForecast } from "./filterEveryDayForecast"

export interface WeatherData {
  id: string
  name: string
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
}

export interface WeatherHistoryData {
  date: string
  temperature: number
  humidity: number
}

export interface WeatherForecastData {
  date: string
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
}

export interface WeatherDetailData extends WeatherData {
  history: WeatherHistoryData[]
  forecast: WeatherForecastData[]
}

interface WeatherState {
  data: WeatherData[]
  loading: boolean
  error: string | null
  detail: WeatherDetailData | null
  detailLoading: boolean
  detailError: string | null
}

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
  detail: null,
  detailLoading: false,
  detailError: null,
}


const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const CITY_IDS = "5128581,2643743,1850147"; // New York, London, Tokyo city id 
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GROUP_WEATHER_URL = `${BASE_URL}/group`;
const DETAIL_WEATHER_URL = `${BASE_URL}/weather`;
const FORECAST_URL = `${BASE_URL}/forecast`;

export const fetchWeatherData = createAsyncThunk("weather/fetchWeatherData",  async ( _, { rejectWithValue }) => {
  try {

    const response = await fetch(
      `${GROUP_WEATHER_URL}?id=${CITY_IDS}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch weather data");
    }

    console.log(data)

    return data.list.map((city: any) => ({
      id: city.id,
      name: city.name,
      temperature: city.main.temp,
      humidity: city.main.humidity,
      windSpeed: city.wind.speed,
      condition: city.weather[0].main,
    }));

  } catch (error: any) {

    return rejectWithValue( error.message  || "Failed to fetch weather data");
  }

})

export const fetchWeatherDetail = createAsyncThunk("weather/fetchWeatherDetail", async (id: string,  { rejectWithValue }) => {

  try {


    let response ;
    if(Number.isNaN(parseInt(id))){

      response = await fetch(
        `${DETAIL_WEATHER_URL}?q=${id}&units=metric&appid=${API_KEY}`
      );
      // https://api.openweathermap.org/data/2.5/weather?&appid={API_KEY}

    }else{
      response = await fetch(
        `${DETAIL_WEATHER_URL}?id=${id}&units=metric&appid=${API_KEY}`
      );
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch weather detail");
    }
    
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    
    const forecastResponse = await fetch(
      `${FORECAST_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const forecastData = await forecastResponse.json();

    const weatherHistory : WeatherHistoryData[] = forecastData.list.map((entry: any) => ({
      date: new Date(entry.dt_txt.split(" ")[0]).toISOString().split("T")[0],
      temperature: entry.main.temp,
      humidity: entry.main.humidity,
    }));

    const weatherForecast: WeatherForecastData[] = filterEverydayForecast(forecastData)

    return {
      id: data.id,
      name: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      history: weatherHistory,
      forecast: weatherForecast,
    };
  } catch (error: any) {

    return rejectWithValue(error.message);
  }

})

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<WeatherData[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false
        state.error =  action.payload as string;
      })
      .addCase(fetchWeatherDetail.pending, (state) => {
        state.detailLoading = true
        state.detailError = null
      })
      .addCase(fetchWeatherDetail.fulfilled, (state, action: PayloadAction<WeatherDetailData>) => {
        state.detailLoading = false
        state.detail = action.payload
      })
      .addCase(fetchWeatherDetail.rejected, (state, action) => {
        state.detailLoading = false
        state.detailError = action.payload as string;
      })
  },
})

export default weatherSlice.reducer

