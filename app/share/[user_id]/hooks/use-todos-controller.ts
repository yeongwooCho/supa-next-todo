import {useCallback, useEffect, useState} from "react";
import {
  createTodo,
  deleteTodoSoft,
  getTodosById,
  getTodosBySearch,
  getTodosByUserId,
  updateTodo
} from "@/actions/todo/todo.action";
import {Database} from "@/types/supabase";

type TTodoDto = Database["public"]["Tables"]["todos_with_rls"]["Row"];


const useTodosController = (
  userId = "",
) => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<TTodoDto[]>([]);

  const onGetTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTodosByUserId(userId);
      if (res) {
        setTodos(res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    onGetTodos();
  }, [onGetTodos]);

  // 비어있는 todo 생성
  const onCreateEmptyTodos = async () => {
    await createTodo("");
    await onGetTodos();
  }

  // todo 업데이트
  const onUpdateTodo = async (id: number, content: string) => {
    await updateTodo(id, content);
    await onGetTodos();
  }

  // todo 삭제
  const onDeleteTodo = async (id: number) => {
    await deleteTodoSoft(id);
    await onGetTodos();
  }

  // todo 검색
  const onSearchTodos = async (terms: string) => {
    if (terms) {
      const res = await getTodosBySearch(terms);
      if (res) setTodos(res);
    } else {
      await onGetTodos();
    }
  }

  // todo id로 검색
  const onGetTodosById = async (id: number) => {
    const res = await getTodosById(id);
    if (res) {
      setTodos(res);
    }
    await onGetTodos();
  }

  return {loading, todos, onCreateEmptyTodos, onUpdateTodo, onDeleteTodo, onSearchTodos, onGetTodosById};
};

export default useTodosController;
