"use client";

import { signOut } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleOnSignOut = async () => {
    try {
      setLoading(true);
      const data = await signOut();
      const { data: signoutdata, error } = data;
      if (error || data.data?.success == false) {
        throw new Error(error?.message || "Failed to signout.");
      }
      router.push("/");
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleOnSignOut}
      className="flex justify-center items-center gap-2 px-2 py-2 border border-red-500 rounded-lg w-full bg-red-600/25 text-red-500 font-semibold cursor-pointer"
    >
      Sign Out
      {loading && <Loader2Icon className="animate-spin" size={17} />}
    </button>
  );
}
