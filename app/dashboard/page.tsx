import { fetchCsapat, fetchJatekos, fetchMerkozes, fetchJatekosokByPoszt } from "@/app/lib/data"
import { fetch7Meccs, fetchTop5YoungestPlayers, fetchCsapatEredmenyek, fetchLegregebbiCsapatTagjai, fetchAtlageletkor } from "@/app/lib/adatb"
import CsapatTable from "@/app/ui/CsapatTable"
import JatekosTable from "@/app/ui/Jatekos/JatekosTable";
import MerkozesTable from "@/app/ui/Merkozes/MerkozesTable";
import CsapatEredmenyekTable from "../ui/adatb/CsapatEredmenyek";
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