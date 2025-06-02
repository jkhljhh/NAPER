import { createClient } from "@/lib/supabase/server";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export async function EntityTable() {
  const supabase = await createClient();

  const { data: entityData, error: entityError } = await supabase
    .from("entity")
    .select("id, name, iconUrl");

  if (entityError) {
    return <p>Failed to fetch...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Icon</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entityData.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="relative w-14 h-14">
                <Image src={item.iconUrl} alt="icon" fill objectFit="contain" />
              </div>
            </TableCell>
            <TableCell className="font-medium">{item.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
