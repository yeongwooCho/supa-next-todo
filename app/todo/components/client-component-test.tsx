"use client";

import React from 'react';
import {getTodoAction} from "@/actions/todo/todo.action";

const ClientComponentTest = () => {
  return (
    <div>

      <button onClick={async () => {
        const result = await getTodoAction();
        console.log(result);
      }}>Test
      </button>
    </div>
  );
};

export default ClientComponentTest;
