# 🚀 Crypto & Weather Live Tracker  

A **real-time cryptocurrency tracking** application built with **Next.js 15**, **Redux**, **Tailwind CSS**, and **WebSockets** for live price updates. This project lets users track cryptocurrency prices, manage a favorites list (cities & cryptos), and experience seamless real-time updates.  

🔗 **Live Demo:** [weather-nexus-dashboard](https://crypto-weather-nexus-dashboard.vercel.app/)  

---

## 📌 Features  

- 📈 **Live Cryptocurrency Prices** – Fetches live data using WebSockets.  
- ❤️ **Favorite Management** – Users can add/remove favorite cities & cryptos, which persist in local storage.  
- 🎨 **Modern UI** – Built with **Tailwind CSS** for a sleek and responsive design.  
- 🔄 **State Management** – Powered by **Redux** for efficient data handling with loading and error state.  
- ⚡ **Fast & Optimized** – Built with **Next.js 15** for server-side rendering and performance boosts.  

---

## 🛠️ Tech Stack  

- **Framework:** Next.js 15  
- **State Management:** Redux  
- **Styling:** Tailwind CSS  
- **Real-time Updates:** WebSockets  
- **API Data:** CoinCap API , openWeatherMap, newsdata.io 

---

## 🚀 Getting Started  

### 📌 Prerequisites  
Make sure you have the following installed:  

- **Node.js** (v18+)  
- **npm** or **yarn**  

### 🔧 Installation  

Clone the repository:  
```bash
git clone https://github.com/itz-mohit-014/cryptoWeatherNexus.git
cd cryptoWeatherNexus
```

Install dependencies:  
```bash
npm install  # or yarn install
```

### 🏃‍♂️ Running the App  

```bash
npm run dev  # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## 🔄 WebSocket Implementation & Challenges  

To provide **real-time crypto price updates**, I used the WebSocket API from CoinCap:  
```javascript
const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana");

ws.onmessage = (event) => {
  const liveData = JSON.parse(event.data);
  dispatch(updateCryptoPrices(liveData));
};
```

### **Challenges Faced**  

1. **WebSocket Reconnection Issues**:  
   - Sometimes, the WebSocket connection would close unexpectedly.  
   - Implemented a reconnection logic with exponential backoff.  

2. **API Rate Limits**:  
   - The CoinCap API limits the number of requests per minute.  
   - Used Redux to cache and reduce unnecessary API calls.  

3. **Persistence of Favorites**:  
   - Initially, favorites were lost on refresh.  
   - Implemented **localStorage** to persist data.  

---

## 📝 Future Enhancements  

🚀 Adding more detailed crypto analytics & price charts.  
📊 Implementing historical price trends with dynamic graphs.  
🔐 User authentication for personalized tracking.  

---

🤝 Contributing

Feel free to fork this repo and submit pull requests if you have any cool ideas or improvements! Let's make this even better together. 💡

## 📩 Contact  

If you have any feedback or suggestions, feel free to reach out!  

📧 Email: [mohitjangid38437@gmail.com](mailto:mohitjangid38437@gmail.com)  
🐙 GitHub: [https://github.com/itz-mohit-014](https://github.com/itz-mohit-014)  

---
 
Made with ❤️ by [Mohit Jangid](https://linkedin.com/in/mohit487)