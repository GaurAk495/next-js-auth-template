"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import { Check, Loader2Icon, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function page() {
  const [isMailSent, setIsMailSent] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      if (!email) {
        throw new Error("email cannot be empty");
      }
      const res = await requestPasswordReset({
        email,
        redirectTo: `${
          (process.env.NEXT_PUBLIC_APP_HOST_URL! as string) ||
          `https://${process.env.VERCEL_URL! as string}`
        }/reset-password`,
      });
      if (res.error) {
        setErrors([res.error.message || "Something went wrong."]);
      } else {
        setIsMailSent(true);
      }
    } catch (error) {
      setErrors([
        error instanceof Error ? error.message : "Something went wrong.",
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="max-w-7xl px-4 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="sm:w-sm p-4 border rounded-xl border-white/10 bg-linear-to-b from-white/5 to-black/5 inset-shadow-2xs inset-shadow-white/5"
        >
          <h1 className="text-xl font-semibold text-center mb-1">
            Forgot password
          </h1>
          <div className="mb-5 text-center text-balance font-medium text-white/85">
            Enter your email to get reset password link.
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

          {isMailSent && (
            <div className="text-[12px] bg-green-600/10 p-4 mb-4 rounded-xl border border-green-500/55">
              <div className="flex flex-row items-center gap-2">
                <Check className=" text-green-400/50" />
                <p className="text-green-400/70 font-semibold">
                  If this email exists in our system, You may receive password
                  reset link.
                </p>
              </div>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="text-sm block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border border-white/15 rounded-lg p-1.5"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex flex-row justify-center items-center gap-2 mb-2 w-full border px-2 py-2 rounded-lg text-center flex-1 bg-white/90 hover:bg-white disabled:bg-white/70 duration-200 cursor-pointer text-black font-semibold shadow-xl shadow-white/10 border-white "
          >
            Send OTP
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
