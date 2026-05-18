"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const STATUSES = ["NEW", "REPLIED", "CLOSED"] as const;

export default function UpdateStatusForm({
    id,
    currentStatus,
}: {
    id: string;
    currentStatus: string;
}) {
    const [status, setStatus] = useState(currentStatus);
    const [saving, setSaving] = useState(false);

    async function handleSave() {
        setSaving(true);
        await fetch(`/api/inquiries/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        setSaving(false);
    }

    return (
        <div className="border rounded-lg p-6 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#9a8c7e]">
                Update Status
            </p>
            <div className="flex gap-2">
                {STATUSES.map((s) => (
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
            <Button onClick={handleSave} disabled={saving || status === currentStatus}>
                {saving ? "Saving..." : "Save"}
            </Button>
        </div>
    );
}