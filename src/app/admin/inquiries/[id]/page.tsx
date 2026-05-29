import { notFound } from "next/navigation";
import { getInquiryById } from "@/lib/queries";
import StatusBadge from "@/components/admin/StatusBadge";
import UpdateStatusForm from "@/components/admin/UpdateStatusForm";
import Image from "next/image";

export default async function InquiryDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const inquiry = await getInquiryById(id);

    if (!inquiry) notFound();

    return (
        <main className="w-full max-w-3xl mx-auto px-6 py-12 space-y-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="font-serif text-4xl text-[#2c2420]">
                        {inquiry.customerName}
                    </h1>
                    <p className="text-[#9a8c7e] mt-1">{inquiry.customerEmail}</p>
                    {inquiry.customerPhone && (
                        <p className="text-[#9a8c7e]">{inquiry.customerPhone}</p>
                    )}
                </div>
                <StatusBadge status={inquiry.status} />
            </div>

            {inquiry.message && (
                <div className="bg-[#f5f0eb] rounded-lg p-6">
                    <p className="text-xs uppercase tracking-widest text-[#9a8c7e] mb-2">Message</p>
                    <p className="text-[#2c2420]">{inquiry.message}</p>
                </div>
            )}

            <div>
                <p className="text-xs uppercase tracking-widest text-[#9a8c7e] mb-4">
                    Requested Products
                </p>
                <div className="space-y-3">
                    {inquiry.items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 border rounded-lg p-4"
                        >
                            <Image
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                width={64}
                                height={64}
                                className="rounded object-cover w-16 h-16"
                            />
                            <div className="flex-1">
                                <p className="font-medium text-[#2c2420]">{item.product.name}</p>
                                <p className="text-sm text-[#9a8c7e]">€{item.product.price.toLocaleString()}</p>
                            </div>
                            <p className="text-sm text-[#6b5e52]">qty: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>

            <UpdateStatusForm id={inquiry.id} currentStatus={inquiry.status} />
        </main>
    );
}