import { WeatherDetailPage } from "@/components/weather/weather-detail-page"

export default function WeatherDetail({
  params,
}: {
  params: { id: string }
}) {
  return <WeatherDetailPage id={params.id} />
}

