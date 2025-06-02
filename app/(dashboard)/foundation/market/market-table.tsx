import { createClient } from "@/lib/supabase/server";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function MarketTable() {
  const supabase = await createClient();

  const { data: entityData, error: entityError } = await supabase
    .from("market")
    .select("id, country, currency");

  if (entityError) {
    return <p>Failed to fetch...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Country</TableHead>
          <TableHead>Currency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entityData.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.country}</TableCell>
            <TableCell>{item.currency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
