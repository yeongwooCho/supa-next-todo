import React from 'react';
import {pingAction} from "@/actions/ping/ping.action";
import ClientComponentTest from "@/app/todo/components/client-component-test";

const page = async () => {

  console.log(">>> SSR Start");

  const result = await pingAction();

  console.log(">>> SSR End");

  return (
    <div>
      <h1>server actions result: {result}</h1>
      <ClientComponentTest />
    </div>
  );
};

export default page;
