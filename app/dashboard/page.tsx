import { fetchCsapatEredmenyek,  fetchAtlageletkor } from "@/app/lib/adatb"
import Tabella from "@/app/ui/dashboard/Tabella"; 
import AtlagEletkor from "@/app/ui/dashboard/AtlagEletkor";

export default async function Page() {
  const eredmenyek = await fetchCsapatEredmenyek();
  const atlagEletkor = await fetchAtlageletkor();
  
  return (
    <div>
      <Tabella csapatEredmenyek={eredmenyek} />
      <AtlagEletkor atlagEletkor={atlagEletkor} />
    </div>
  )
}