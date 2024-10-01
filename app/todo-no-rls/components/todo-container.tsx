"use client";
// 브라우져에서 supabase api를 통해 데이터를 가져오기 위해 클라이언트 컴포넌트를 사용합니다.

import React, {useEffect} from 'react';
import {getTodoList} from "@/apis/todos-no-rls";

const TodoContainer = () => {
  useEffect(() => {
    getTodoList().then(r => console.log(r));
  }, []);

  return (
    <div>
      <h1>TodoContainer</h1>
    </div>
  );
};

export default TodoContainer;
