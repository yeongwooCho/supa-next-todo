import React from 'react';
import ClientComponentTest from "@/app/todo/components/client-component-test";
import {getTodoAction} from "@/actions/todo/todo.action";

const page = async () => {

  console.log(">>> SSR Start");

  const result = await getTodoAction();

  console.log(">>> SSR End");

  return (
    <div>
      <h1>server actions result: {JSON.stringify(result)}</h1>
      <ClientComponentTest/>
    </div>
  );
};

export default page;
