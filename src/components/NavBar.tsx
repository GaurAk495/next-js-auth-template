"use client";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

function NavBar() {
  const { data, isPending } = useSession();
  return (
    <div className="fixed top-0 w-full bg-white/15 z-10">
      <div className="max-w-6xl mx-auto flex flex-row items-center px-4 md:px-8">
        <div className="bg-linear-to-r font-semibold from-neutral-100 text-shadow-white/3 text-shadow-sm to-neutral-200 w-fit p-3 text-transparent bg-clip-text text-xl">
          NextBetterAuth
        </div>
        <div className="ml-auto flex items-center gap-2">
          {!isPending && data?.session.id ? (
            <>
              <div>{data.user.name}</div>
              <Link
                href="/dashboard"
                className="p-1.5 border border-white bg-white text-black font-medium rounded-lg px-3 "
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/register"
              className="p-1.5 border border-white bg-white text-black font-medium rounded-lg px-3 "
            >
              Get started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
