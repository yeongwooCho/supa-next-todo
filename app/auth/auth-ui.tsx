"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {Auth} from "@supabase/auth-ui-react";
import {createSupabaseBrowserClient} from "@/lib/client/supabase";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import {useHydrate} from "@/hooks/use-hydrate";

const AuthUi = () => {
  const [user, setUser] = useState('');

  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();

  // const getUserInfo = async () => {
  //   const result = await supabase.auth.getSession();
  //   if (result.data.session?.user.email) {
  //     setUser(result.data.session.user.email);
  //   }
  // }
  const getUserInfo = useCallback(async () => {
    const result = await supabase.auth.getSession();
    if (result.data.session?.user.email) {
      setUser(result.data.session.user.email);
    }
  }, [supabase.auth]);

  // // AuthUI가 아닌 자체적으로 로그인을 구현할 경우
  // const handleGoogleLogin = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //     options: {
  //       redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
  //     }
  //   });
  // }
  // const handleGithubLogin = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'github',
  //     options: {
  //       redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
  //     }
  //   });
  // }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser('');
  }

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (!isMount) return null;

  return (
    <section className="w-full">
      <div>{user ? `로그인 됨 ${user}` : "로그아웃 됨"}</div>
      <div>
        <button className="border" onClick={handleLogout}>로그아웃</button>
      </div>
      <div className="mx-auto max-w-[500px]">
        <Auth
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa, // supabase theme 지정
          }}
          onlyThirdPartyProviders // only third party providers: email login 제외
          providers={['github', 'google']} // third party providers
        />
      </div>
    </section>
  );
};

export default AuthUi;
