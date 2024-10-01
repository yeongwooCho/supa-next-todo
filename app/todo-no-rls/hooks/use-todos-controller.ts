import {useEffect, useState} from "react";
import {createTodo, deleteTodoSoft, getTodoList, getTodosById, getTodosBySearch, updateTodo} from "@/apis/todos-no-rls";
import {Database} from "@/database.types";

type TTodoDto = Database["public"]["Tables"]["todos_no_rls"]["Row"];

const useTodosController = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<TTodoDto[]>([]);

  const onGetTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodoList();
      if (res) {
        setTodos(res);
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    onGetTodos();
  }, []);

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
  const onSearchTodos = async (search: string) => {
    const res = await getTodosBySearch(search);
    if (res) {
      setTodos(res);
    }
    await onGetTodos();
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
