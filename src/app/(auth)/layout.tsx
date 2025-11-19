"use client";

import { useSession } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function layout({ children }: { children: React.ReactNode }) {
  const { data, error, isPending, refetch } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data?.session.id) {
      return router.push("/dashboard");
    }
  }, [data?.session.id]);

  if (isPending || data?.session.id) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex gap-2">
          {" "}
          <Loader2Icon size={20} className="animate-spin" />{" "}
        </div>
      </div>
    );
  }
  if (error) {
    return <div>{error.status + ": " + error.message}</div>;
  }

  return children;
}

export default layout;
