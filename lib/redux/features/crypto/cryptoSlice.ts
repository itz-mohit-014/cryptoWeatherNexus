import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface CryptoData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number 
  volume24Hr : number
  marketCap: number
}

export interface CryptoPriceHistory {
  timestamp: string
  price: number
  volume: number
}

export interface CryptoDetailData extends CryptoData {
  marketCapRank: number
  volume24Hr : number
  circulatingSupply: number
  maxSupply: number | null
  allTimeHigh: number
  allTimeHighDate: string
  change7d: number
  change30d: number
  priceHistory: CryptoPriceHistory[]
}

interface CryptoState {
  data: CryptoData[]
  loading: boolean
  error: string | null
  detail: CryptoDetailData | null
  detailLoading: boolean
  detailError: string | null
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
  detail: null,
  detailLoading: false,
  detailError: null,
}


export const fetchInitialCryptoData = createAsyncThunk(
  "crypto/fetchInitialCryptoData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,solana");
      const data = await response.json();
  
      if (!response.ok) {
        setTimeout(() => {
          dispatch(fetchInitialCryptoData())
        }, 2000);
        throw new Error("Failed to fetch data");
      }

      setTimeout(() => {
        dispatch(subscribeToLivePrices())
      }, 5000);

      return data.data.map((crypto: any) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol.toUpperCase(),
        price: parseFloat(crypto.priceUsd),
        change24h: parseFloat(crypto.changePercent24Hr),
        marketCap: parseFloat(crypto.marketCapUsd),
        volume24Hr:  parseFloat(crypto.vwap24Hr),
      }));
    } catch (error) {
      console.log(error)
      return rejectWithValue("Failed to fetch initial crypto data");
    }
  }
);

// Fetch detailed crypto data including historical prices
export const fetchCryptoDetail = createAsyncThunk(
  "crypto/fetchCryptoDetail",
  async (id: string, {rejectWithValue, dispatch}) => {
    try {
      // Fetch detailed crypto data from CoinCap API
      const response = await fetch(`https://api.coincap.io/v2/assets/${id}`)
      const data = await response.json()
      const crypto = data.data

      // Fetch historical pricing (last 90 days)
      const historyResponse = await fetch(
        `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
      )
      
      const historyData = await historyResponse.json()

      return {
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol.toUpperCase(),
        price: parseFloat(crypto.priceUsd),
        change24h: parseFloat(crypto.changePercent24Hr),
        marketCap: parseFloat(crypto.marketCapUsd),
        volume24Hr:  parseFloat(crypto.vwap24Hr),
        marketCapRank: crypto.rank,
        circulatingSupply: parseFloat(crypto.supply),
        maxSupply: crypto.maxSupply ? parseFloat(crypto.maxSupply) : null,
        allTimeHigh: parseFloat(crypto.priceUsd) * 1.5, // Approximate ATH
        allTimeHighDate: "2021-11-10T00:00:00.000Z", // Placeholder
        change7d: Math.random() * 10 - 5, // Randomized for now
        change30d: Math.random() * 20 - 10,
        priceHistory: historyData.data.map((entry: any) => ({
          timestamp: entry.time,
          price: parseFloat(entry.priceUsd),
          volume: parseFloat(entry.volumeUsd),
        })),
      }
    } catch (error) {
      throw rejectWithValue("Failed to fetch crypto details");
    }
  }
)

// WebSocket function for live crypto price updates
export const subscribeToLivePrices = () => (dispatch: any) => {
  let ws: WebSocket | null = null
  let reconnectAttempts = 0
  const maxReconnectAttempts = 5 // Avoid infinite loops

  const connectWebSocket = () => {
    if (reconnectAttempts >= maxReconnectAttempts) {
      dispatch(setCryptoError("WebSocket failed after multiple attempts"))
      return
    }

    ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana")

    ws.onopen = () => {
      console.log("WebSocket connected")
      reconnectAttempts = 0 
    }

    ws.onmessage = (msg) => {
      const liveData = JSON.parse(msg.data)
    
      dispatch(updateCryptoPrices(liveData))  
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
      dispatch(setCryptoError("WebSocket error, retrying..."))
      reconnectWebSocket() 
    }

    ws.onclose = () => {
      console.warn("WebSocket closed, attempting to reconnect...")
      reconnectWebSocket()
    }
  }

  const reconnectWebSocket = () => {
    reconnectAttempts += 1
    setTimeout(connectWebSocket, 5000) 
  }

  connectWebSocket()

  return () => {
    ws?.close()
  }
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrices: (state, action: PayloadAction<{ [key: string]: number }>) => {
     
      state.data = state.data.map((crypto) => {
        const newPrice:any = action.payload[crypto.id];
        return newPrice ? { ...crypto, price: parseFloat(newPrice) } : crypto;
      });
    
    },

    setCryptoError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInitialCryptoData.fulfilled, (state, action: PayloadAction<CryptoData[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchInitialCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch crypto Data"
      })
      .addCase(fetchCryptoDetail.pending, (state) => {
        state.detailLoading = true
        state.detailError = null
      })
      .addCase(fetchCryptoDetail.fulfilled, (state, action: PayloadAction<CryptoDetailData>) => {
        state.detailLoading = false
        state.detail = action.payload
      })
      .addCase(fetchCryptoDetail.rejected, (state, action) => {
        state.detailLoading = false
        state.detailError = action.error.message || "Failed to fetch crypto detail"
      })
  },
})

export const { updateCryptoPrices, setCryptoError } = cryptoSlice.actions
export default cryptoSlice.reducer
