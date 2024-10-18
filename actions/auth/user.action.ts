"use server";

import {createSupabaseServerClient} from "@/lib/supabase";

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();

  const user = await supabase.auth.getUser();

  return user.data.user;
}
