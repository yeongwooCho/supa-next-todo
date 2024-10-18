import {NextResponse} from "next/server";
// import {getTodoAction} from "@/actions/todo/todo.action";

export const GET = async () => {
  // const result = await getTodoAction();
  const result = [1,2,3,4];

  console.log("todo GET API income", result);
  return NextResponse.json({...result});
}
