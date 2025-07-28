import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { PriceRecord } from "@/lib/types";

export default function PriceTable({ data }: { data: PriceRecord[] }) {
  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Commodity</TableHead>
          <TableHead>Market</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Price (per Quintal)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((record, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{record.commodity}</TableCell>
            <TableCell>
                <Badge variant="outline">{record.market}</Badge>
            </TableCell>
            <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
            <TableCell className="text-right font-mono">₹{record.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
