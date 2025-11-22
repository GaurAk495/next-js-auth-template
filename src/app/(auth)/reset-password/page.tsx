"use client";

import { resetPassword } from "@/lib/auth-client";
import { Loader2Icon, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newpassword") as string;
    const cnfmPassword = formData.get("cnfmpassword") as string;

    try {
      if (!token) {
        throw new Error("Invalid Token!");
      }
      if (newPassword !== cnfmPassword) {
        throw new Error("Password should match with confirm password.");
      }
      console.log(newPassword, token);

      const res = await resetPassword({ newPassword, token });

      if (res.error) {
        setErrors([res.error.message || "Something went wrong."]);
      } else {
        router.replace("/login");
      }
    } catch (error) {
      setErrors([
        error instanceof Error ? error.message : "Something went wrong.",
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      router.replace("/");
    }
  }, []);

  if (!token) {
    return;
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="max-w-7xl px-4 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="sm:w-sm p-4 border rounded-xl border-white/10 bg-linear-to-b from-white/5 to-black/5 inset-shadow-2xs inset-shadow-white/5"
        >
          <h1 className="text-xl font-semibold text-center mb-1">
            Reset Password
          </h1>
          <div className="mb-5 max-w-[220px] mx-auto text-sm text-center font-medium text-white/80">
            Enter your New Password to get reset password link.
          </div>

          {errors && (
            <div className="text-[12px] bg-red-600/10 p-4 mb-4 rounded-xl border border-red-500/55">
              {errors.map((error, i) => (
                <div key={i} className="flex flex-row items-center">
                  <Plus className="rotate-45 text-red-400/50" /> {error}
                </div>
              ))}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="newpassword" className="text-sm block mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              autoComplete="new-password"
              id="newpassword"
              className="w-full border border-white/15 rounded-lg p-1.5"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cnfmpassword" className="text-sm block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="cnfmpassword"
              autoComplete="new-password webauthn"
              id="cnfmpassword"
              className="w-full border border-white/15 rounded-lg p-1.5"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex flex-row justify-center items-center gap-2 mb-2 w-full border px-2 py-2 rounded-lg text-center flex-1 bg-white/90 hover:bg-white disabled:bg-white/70 duration-200 cursor-pointer text-black font-semibold shadow-xl shadow-white/10 border-white "
          >
            Submit
            {loading && <Loader2Icon className="animate-spin" size={17} />}
          </button>
          <div className="w-full text-center">
            <Link href="/" className="text-sm text-white/80">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
