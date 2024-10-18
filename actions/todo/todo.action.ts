"use server";

import {createSupabaseServerClient} from "@/lib/supabase";


export const getTodoList = async () => {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from('todos_with_rls')
    .select('*')
    .is("deleted_at", null)
    .order('id', {ascending: false});
  // 내림차순

  return result.data;
}

export const getTodosById = async (id: number) => {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from('todos_with_rls')
    .select('*')
    .is("deleted_at", null)
    .eq('id', id);
  // 동등비교

  return result.data;
}

export const getTodosByUserId = async (userId: string) => {
  // server component가 맞다.
  const supabase = await createSupabaseServerClient(true);

  const result = await supabase.from('todos_with_rls')
    .select('*')
    .is("deleted_at", null)
    .eq('user_id', userId);
  // 동등비교

  return result.data;
}

export const getTodosBySearch = async (terms: string) => {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from('todos_with_rls')
    .select('*')
    .is("deleted_at", null)
    .ilike('content', `%${terms}%`)
    .limit(10);
  // i는 대소문자 구분 없이 검색

  return result.data;
}

export const createTodo = async (content: string) => {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from('todos_with_rls')
    .insert({content})
    .select();
  // insert 후 select를 통해 데이터를 가져옴

  return result.data;
}

export const updateTodo = async (id: number, content: string) => {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from('todos_with_rls')
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();
  // 어떤 id를 가진 데이터를 업데이트할 것인지 지정해 줘야 함.

  return result.data;
}

// soft delete
export const deleteTodoSoft = async (id: number) => {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from('todos_with_rls')
    .update({deleted_at: new Date().toISOString()})
    .eq('id', id)
    .select();
  // 어떤 id를 가진 데이터를 삭제할 것인지 지정해 줘야 함.

  return result.data;
}

// hard delete
export const deleteTodoHard = async (id: number) => {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.from('todos_with_rls')
    .delete()
    .eq('id', id)
    .select();

  return result.data;
}
