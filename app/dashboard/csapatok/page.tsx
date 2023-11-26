import { fetchCsapat, fetchJatekosokByPoszt } from "@/app/lib/data";
import CsapatTable from "@/app/ui/CsapatTable";

export default async function CsapatokPage() {
  const csapatok = await fetchCsapat();
  const kapusok = await fetchJatekosokByPoszt("kapus");
  const vedok = await fetchJatekosokByPoszt("vedo");
  const kozeppalyasok = await fetchJatekosokByPoszt("kozeppalyas");
  const tamadok = await fetchJatekosokByPoszt("tamado");

  return (
    <div>
      <CsapatTable csapatok={csapatok} kapusok={kapusok} vedok={vedok} kozeppalyasok={kozeppalyasok} tamadok={tamadok} />
    </div>
  );
}
