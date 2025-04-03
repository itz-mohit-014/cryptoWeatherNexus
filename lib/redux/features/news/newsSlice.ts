import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { filterTopCryptoNews } from "./filterTopCrypoNews"


export interface NewsData {
  id: string
  title: string
  summary: string
  url: string
  publishedAt: string
  source: string
}

interface NewsState {
  data: NewsData[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
}
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL =  `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=crypto&language=en`

export const fetchNewsData = createAsyncThunk("news/fetchNewsData", async (_, { rejectWithValue }) => {
  try {
    
    const response = await fetch(BASE_URL)

    const data = await response.json();

    console.log(data)

    if (!response.ok || !data.results) {
      throw new Error(data.message || "Failed to fetch trending crypto news.");
    }

    const topCrypotNews : NewsData[] = filterTopCryptoNews(data.results);
    
    return topCrypotNews;

  } catch (error:any) {
     return rejectWithValue(error.message || "Failed to fetch trending crypto news.")
  }
})

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNewsData.fulfilled, (state, action: PayloadAction<NewsData[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch news data"
      })
  },
})

export default newsSlice.reducer

