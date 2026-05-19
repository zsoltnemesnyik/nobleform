"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await logout();

        toast.success("Sikeres kijelentkezés");

        router.push("/");
        router.refresh();
    }

    return (
        <Button
            variant="default"
            size="sm"
            onClick={handleLogout}
        >
            <LogOut className="h-4 w-4" />
            Logout
        </Button>
    );
}