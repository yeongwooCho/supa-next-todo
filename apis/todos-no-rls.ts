"use client";

// todoList 가져오기
import {createSupabaseBrowserClient} from "@/lib/client/supabase";

export const getTodoList = async () => {
  const supabase = createSupabaseBrowserClient();

  const result = await supabase
    .from('todos_no_rls')
    .select('*')
    .is("deleted_at", null)
    .order('id', {ascending: false});

  return result.data;
}
