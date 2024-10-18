import TodoContainer from "@/app/(site)/components/todo-container";
import {getUser} from "@/actions/auth/user.action";
import {DotLoader} from "react-spinners";

export default async function Home() {
  const user = await getUser({serverComponent: true});

  return (
    <main>
      {user ? (
        <TodoContainer ownerUserId={user?.id}/>
      ) : (
        <div>
          <div className="flex flex-col items-center mt-12">
            <div>
              <DotLoader />
            </div>
            <div className="font-bold my-2">Please Login First</div>
          </div>
        </div>
      )}

    </main>
  );
}
