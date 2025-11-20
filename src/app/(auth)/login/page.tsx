"use client";
import { signIn } from "@/lib/auth-client";
import { Loader2Icon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (!email || !password) {
        const field = email === "" ? "Email" : "password";
        throw new Error(`${field} cannot be empty`);
      }
      const res = await signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (res.error) {
        setErrors([res.error.message || "Something went wrong."]);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrors([
        error instanceof Error ? error.message : "Something went wrong.",
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleOnOAuth(provider: "google" | "github") {
    try {
      setLoading(true);
      const res = await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
      if (res.error?.message) {
        setErrors([res.error.message]);
      }
    } catch (error) {
      setErrors([
        error instanceof Error
          ? error.message
          : `Failed to signIn using ${provider}`,
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center max-w-7xl px-4 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full p-4 border rounded-xl border-white/10 bg-linear-to-b from-white/5 to-black/5 inset-shadow-2xs inset-shadow-white/5"
      >
        <h1 className="text-xl font-semibold text-center mb-1">Login</h1>
        <div className="mb-5 text-center text-balance font-medium text-white/85">
          Welcome back! Log in to continue.
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

        <div className="flex items-center flex-col sm:flex-row sm:items-stretch gap-2 mb-2">
          <button
            className="w-full border py-2 text-sm text-center rounded-lg bg-white text-black/90 flex flex-row gap-2 justify-center cursor-pointer"
            onClick={() => handleOnOAuth("google")}
            disabled={loading}
          >
            <Image src="google.svg" alt="google-logo" width={16} height={16} />
            Sign in with Google
          </button>
          <button
            className="w-full border py-2 text-sm text-center rounded-lg bg-white text-black/90  flex flex-row gap-2 justify-center cursor-pointer"
            onClick={() => handleOnOAuth("github")}
            disabled={loading}
          >
            <Image src="github.svg" alt="google-logo" width={16} height={16} />
            Sign in with Github
          </button>
        </div>

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

        <div className="mb-3">
          <label htmlFor="password" className="text-sm block mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            id="password"
            className="w-full border border-white/15 rounded-lg p-1.5"
          />
        </div>
        <div className="w-full text-end mb-3">
          <Link href="/forgot-password">forgot password?</Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex flex-row justify-center items-center gap-2 mb-2 w-full border px-2 py-2 rounded-lg text-center flex-1 bg-white/90 hover:bg-white disabled:bg-white/70 duration-200 cursor-pointer text-black font-semibold shadow-xl shadow-white/10 border-white "
        >
          Sign in
          {loading && <Loader2Icon className="animate-spin" size={17} />}
        </button>
        <div className="text-center text-sm mb-2">
          <p className="inline text-white/80">Don’t have an account? </p>
          <Link href="/register" className="font-semibold">
            Sign up
          </Link>
        </div>
        <div className="w-full text-center">
          <Link href="/" className="text-sm text-white/80">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}

export default page;
