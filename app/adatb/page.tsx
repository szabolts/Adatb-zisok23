import { fetch7Meccs, fetchTop5YoungestPlayers, fetchCsapatEredmenyek, fetchLegregebbiCsapatTagjai } from "@/app/lib/adatb"
import Merkozes7NapTable from "@/app/ui/adatb/7MeccsTable";
import FiatalJatekosokTable from "@/app/ui/adatb/5Fiatal";
import CsapatEredmenyekTable from "../ui/adatb/CsapatEredmenyek";
import LegregebbiCsapatTagjaiTable from "../ui/adatb/LegregebbiCsapat";
import CsapatAllampTable from "../ui/adatb/CsapatAllamp";


export default async function AdatBPage() {
    const merkozesek = await fetch7Meccs();
    const fiatalJatekosok = await fetchTop5YoungestPlayers();
    const eredmenyek = await fetchCsapatEredmenyek();
    const legregebbiCsapatTagjai = await fetchLegregebbiCsapatTagjai();
    
    // console.log("Eredmenyek", eredmenyek)
    // console.log(merkozesek);
    // console.log(fiatalJatekosok);
    return (
        <div className="pb-10">
        <Merkozes7NapTable merkozesek={merkozesek} />
        <FiatalJatekosokTable jatekosok={fiatalJatekosok} />
        <CsapatEredmenyekTable csapatEredmenyek={eredmenyek} />
        <LegregebbiCsapatTagjaiTable legregebbiCsapat={legregebbiCsapatTagjai} />
        <CsapatAllampTable />
        </div>  
    );
}