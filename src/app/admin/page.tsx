import Link from "next/link";
import { getInquiries } from "@/lib/queries";
import StatusBadge from "@/components/admin/StatusBadge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default async function AdminPage() {
    const inquiries = await getInquiries();

    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="font-serif text-4xl text-[#2c2420] mb-8">Inquiries</h1>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.map((inquiry) => (
                            <TableRow key={inquiry.id}>
                                <TableCell className="font-medium">{inquiry.customerName}</TableCell>
                                <TableCell>{inquiry.customerEmail}</TableCell>
                                <TableCell>{inquiry.items.length}</TableCell>
                                <TableCell>
                                    {new Date(inquiry.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={inquiry.status} />
                                </TableCell>
                                <TableCell>
                                    <Link href={`/admin/inquiries/${inquiry.id}`} className="text-[#8b6914] hover:underline">
                                        View →
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {inquiries.length === 0 && (
                    <p className="text-center py-12 text-[#9a8c7e]">No inquiries yet.</p>
                )}
            </div>
        </main>
    );
}