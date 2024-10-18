import {cookies} from "next/headers";
import {createServerClient} from "@supabase/ssr";
import {NextRequest, NextResponse} from "next/server";
import {getCookie, setCookie} from "cookies-next";
import {Database} from "@/types/supabase";

// - ServerActions, RouterHandler
export const createSupabaseServerClient = async (
  serverComponent = false,
) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if (serverComponent) return;
          cookieStore.set(key, value, options)
        },
        remove: (key, options) => {
          if (serverComponent) return;
          cookieStore.set(key, "", options)
        },
      },
    },
  );
}

// RSC: 쿠키 조작을 하지 못한다.
export const createSupabaseServerClientRSC = () => {
  return createSupabaseServerClient(true);
}

// Middleware : 쿠키 조작이 살짝 다르다.
export const createSupabaseServerClientMiddleware = (
  req: NextRequest,
  res: NextResponse,
) => {

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => getCookie(key, {req, res}),
        set: (key, value, options) => {
          setCookie(key, value, {req, res, ...options});
        },
        remove: (key, options) => {
          setCookie(key, "", {req, res, ...options});
        },
      },
    },
  );
}
