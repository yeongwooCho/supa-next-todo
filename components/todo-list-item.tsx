import React from 'react';
import {Database} from "@/database.types";

interface ITodoListItemProps {
  todo: Database["public"]["Tables"]["todos_no_rls"]["Row"];
}

const TodoListItem: React.FC<ITodoListItemProps> = ({todo}) => {
  return (
    <div>
      {todo.content}
    </div>
  );
};

export default TodoListItem;
