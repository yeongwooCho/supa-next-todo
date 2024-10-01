import {useEffect, useState} from "react";
import {getTodoList} from "@/apis/todos-no-rls";
import {Database} from "@/database.types";

type TTodoDto = Database["public"]["Tables"]["todos_no_rls"]["Row"];

const useTodosController = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<TTodoDto[]>([]);

  const onGetTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodoList();
      if(res) {
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

  return {loading, todos};
};

export default useTodosController;
