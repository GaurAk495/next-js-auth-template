import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export const signOut = async () => {
  return await auth.api.signOut({
    headers: await headers(),
  });
};
