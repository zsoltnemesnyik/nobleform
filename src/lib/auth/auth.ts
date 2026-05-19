import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function login(
  email: string,
  password: string
) {

  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function logout() {
  return supabase.auth.signOut();
}