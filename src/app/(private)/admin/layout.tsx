// src/app/admin/layout.tsx
// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";

import AdminNavbar from "@/components/admin/NavbarAdmin";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const supabase = await createClient();
    // const { data: { session } } = await supabase.auth.getSession();

    // if (!session) {
    //     redirect("/admin/login");
    // }

    return (
        <div className="min-h-screen bg-neutral-50">
            <AdminNavbar />

            <div className="flex">
                <aside className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)] p-6 hidden md:block">
                    <nav className="space-y-1">
                        <a
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 text-neutral-700 font-medium transition-colors"
                        >
                            Dashboard
                        </a>
                        <a
                            href="/admin/products"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 text-neutral-700 font-medium transition-colors"
                        >
                            Products
                        </a>
                        <a
                            href="/admin/inquiries"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 text-neutral-700 font-medium transition-colors"
                        >
                            Inquiries
                        </a>
                    </nav>
                </aside>

                {/* Fő tartalom terület */}
                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}