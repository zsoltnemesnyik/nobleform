import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function NavbarAdmin() {
    return (
        <header className="border-b">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin"
                        className="text-xl font-semibold tracking-tight"
                    >
                        NobleForm
                    </Link>
                    <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium hidden sm:inline">
                        Admin
                    </span>
                </div>

                <nav className="flex items-center gap-6 text-sm">
                    <Link href="/products">
                        Products
                    </Link>
                    <LogoutButton />
                </nav>
            </div>
        </header>
    );
}