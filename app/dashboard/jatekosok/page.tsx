import { fetchJatekos } from "@/app/lib/data";
import JatekosTable from "@/app/ui/Jatekos/JatekosTable";

export default async function JatekosokPage() {
  const jatekosok = await fetchJatekos();

  return (
    <div>
      <JatekosTable jatekosok={jatekosok} />
    </div>
  );
}
