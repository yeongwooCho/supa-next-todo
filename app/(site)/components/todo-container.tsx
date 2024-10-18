"use client";
// 브라우져에서 supabase api를 통해 데이터를 가져오기 위해 클라이언트 컴포넌트를 사용합니다.

import React from 'react';
import TodoList from "@/components/todo-list";
import useTodosController from "@/app/(site)/hooks/use-todos-controller";

interface TodoContainerProps {
  ownerUserId?: string;
}

const TodoContainer = ({ownerUserId}: TodoContainerProps) => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodo,
    onDeleteTodo,
    onSearchTodos,
    // onGetTodosById
  } = useTodosController();

  console.log('>>loading', loading);
  console.log('>>todos', todos);

  return (
    <div>
      <TodoList
        sharedUserFullName={"hoho"}
        ownerUserId={ownerUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly={false}
        onUpdate={onUpdateTodo}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodo}
        onSearch={onSearchTodos}
      />
    </div>
  );
};

export default TodoContainer;
