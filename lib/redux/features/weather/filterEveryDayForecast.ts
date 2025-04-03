import { WeatherForecastData } from "./weatherSlice";

export const filterEverydayForecast = (forecastData:any) => {

    const everydayForecast :WeatherForecastData[] = forecastData.list.reduce((acc : any[], cur: any) => {
        const date = cur.dt_txt.split(" ")[0];
  
        if(!acc.find(item => item.date === date)){
  
          acc.push({
            date,
            temperature: cur.main.temp,
            humidity: cur.main.humidity,
            windSpeed: cur.wind.speed,
            condition: cur.weather[0].main,
          })
  
        }
  
        return acc;
  
      }, [])

      return everydayForecast;
}