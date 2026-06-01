"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { INQUIRY_STATUSES, InquiryStatus } from "@/lib/constants";

export default function UpdateStatusForm({
    id,
    currentStatus,
}: {
    id: string;
    currentStatus: InquiryStatus;
}) {
    const [status, setStatus] = useState(currentStatus);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    async function handleSave() {
        if (status === currentStatus) return;

        setSaving(true);
        setSuccess(false);

        try {
            const res = await fetch(`/api/inquiries/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) {
                throw new Error("Failed to update status");
            }

            setSuccess(true);
            router.refresh();
            setTimeout(() => setSuccess(false), 2000);

        } catch (error) {
            console.error(error);
            alert("Hiba történt a státusz mentése közben.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="border rounded-lg p-6 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#9a8c7e]">
                Update Status
            </p>

            <div className="flex gap-2">
                {INQUIRY_STATUSES.map((s) => (
                    <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${status === s
                            ? "bg-[#2c2420] text-white border-[#2c2420]"
                            : "text-[#6b5e52] border-[#e5ddd5] hover:border-[#2c2420]"
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <Button
                onClick={handleSave}
                disabled={saving || status === currentStatus}
                className="w-full"
            >
                {saving ? "Saving..." : success ? "✅ Saved!" : "Save Changes"}
            </Button>

            {success && (
                <p className="text-green-600 text-sm text-center">
                    Státusz sikeresen frissítve!
                </p>
            )}
        </div>
    );
}