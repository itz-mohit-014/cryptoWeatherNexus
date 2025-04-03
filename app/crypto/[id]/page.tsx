import { CryptoDetailPage } from "@/components/crypto/crypto-detail-page"

export default function CryptoDetail({
  params,
}: {
  params: { id: string }
}) {
  return <CryptoDetailPage id={params.id} />
}

