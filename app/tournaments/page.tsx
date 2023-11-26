
import { fetchCsapatEredmenyek,  fetchAtlageletkor, fetch7Meccs } from "@/app/lib/adatb"
import Tabella from "@/app/ui/dashboard/Tabella"; 
import Merkozes7NapTable from "@/app/ui/adatb/7MeccsTable";



export default async function Tournaments() {
  const eredmenyek = await fetchCsapatEredmenyek();
  const merkozesek = await fetch7Meccs();
  
  return (
    <div className="mt-8">
      <Tabella csapatEredmenyek={eredmenyek} />
      <Merkozes7NapTable merkozesek={merkozesek} />
    </div>
  )
}