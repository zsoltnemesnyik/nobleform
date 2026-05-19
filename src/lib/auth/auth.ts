import { createClient } from "@/utils/supabase/client";

export async function login(
  email: string,
  password: string
) {
  const supabase = createClient();

  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function logout() {
  const supabase = createClient();

  return supabase.auth.signOut();
}