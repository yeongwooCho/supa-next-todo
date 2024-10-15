"use client";

import React from 'react';
import {Auth} from "@supabase/auth-ui-react";
import {createSupabaseBrowserClient} from "@/lib/client/supabase";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import {useHydrate} from "@/hooks/use-hydrate";

const AuthUi = () => {
  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();

  if (!isMount) return null;

  return (
    <section className="w-full">
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
