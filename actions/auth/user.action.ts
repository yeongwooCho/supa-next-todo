"use server";

import {createSupabaseServerClient} from "@/lib/supabase";


export const getUser = async ({serverComponent = false}) => {
  const supabase = await createSupabaseServerClient(serverComponent);

  const user = await supabase.auth.getUser();

  return user?.data?.user;
};
