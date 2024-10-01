"use client";
// 브라우져에서 supabase api를 통해 데이터를 가져오기 위해 클라이언트 컴포넌트를 사용합니다.

import React from 'react';
import useTodosController from "@/app/todo-no-rls/hooks/use-todos-controller";

const TodoContainer = () => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodo,
    onDeleteTodo,
    onSearchTodos,
    onGetTodosById
  } = useTodosController();

  console.log('>>loading', loading);
  console.log('>>todos', todos);

  return (
    <div>
      <h1>TodoContainer</h1>
    </div>
  );
};

export default TodoContainer;
