"use client";

import React from 'react';
import {User} from "@supabase/auth-js";
import {createSupabaseBrowserClient} from "@/lib/client/supabase";
import {useRouter} from "next/navigation";
import {FcGoogle, FcTodoList} from "react-icons/fc";
import {AiOutlineLogout} from "react-icons/ai";

interface AuthHeaderProps {
  user?: User | null;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
                                                 user,
                                               }) => {
  const isLoggedIn = !!user?.email;

  // supabase client 정보를 넣기 위해서 createBrowserClient를 사용합니다.
  const supabase = createSupabaseBrowserClient();

  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      }
    });
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <header className="h-[50px] bg-white">
      <section className="px-6 h-full">
        <div className="flex justify-between items-center h-full text-black">
          <div className="flex justify-center items-center cursor-pointer gap-2" onClick={goToHome}>
            TODO <FcTodoList height={30}/>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center gap-2" onClick={handleLogout}>
              Logout
              <AiOutlineLogout height={30}/>
            </div>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleGoogleLogin}>
              Login
              <FcGoogle height={30}/>
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default AuthHeader;
