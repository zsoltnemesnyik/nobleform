import Link from "next/link";

import CartCount from "@/components/CartCount";
import LogoutButton from "@/components/admin/LogoutButton";

import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          NobleForm
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products">
            Products
          </Link>

          <Link href="/cart">
            Cart (<CartCount />)
          </Link>

          {user && <LogoutButton />}
        </nav>
      </div>
    </header>
  );
}