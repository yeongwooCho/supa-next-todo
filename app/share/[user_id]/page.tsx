import React from 'react';
import {getProfileById} from "@/actions/auth/user.action";
import {permanentRedirect} from "next/navigation";

interface ISharePageProps {
  params: { user_id: string };
}

// http://localhost:3000/share/cde553b9-27bf-44be-9be0-6632645cab37
const page: React.FC<ISharePageProps> = async ({params}) => {
  const userId = params.user_id;
  const profile = await getProfileById({serverComponent: true, userId});
  console.log('>>profile', profile);

  if (!profile) {
    permanentRedirect("/");
  }

  return (
    <div>
      share page
    </div>
  );
};

export default page;
