import { fetchMerkozes, fetchCsapat } from "@/app/lib/data";
import MerkozesTable from "@/app/ui/Merkozes/MerkozesTable";

export default async function MerkozesekPage() {
  const merkozesek = await fetchMerkozes();
  const csapatok = await fetchCsapat();

  return (
    <div>
      <MerkozesTable merkozesek={merkozesek} csapatok={csapatok} />
    </div>
  );
}
