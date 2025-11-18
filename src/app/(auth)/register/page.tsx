import Link from "next/link";

function page() {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="max-w-7xl px-4 md:px-8">
        <div className="sm:w-sm p-4 border rounded-xl border-white/10 bg-linear-to-b from-white/5 to-black/5 inset-shadow-2xs inset-shadow-white/5">
          <h1 className="text-xl font-semibold text-center mb-1">Register</h1>
          <div className="mb-5 text-center text-balance font-medium text-white/85">
            Create an account to get started
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="text-sm block mb-1">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="w-full border border-white/15 rounded-lg p-1.5"
            />
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
          <button className="mb-2 w-full border px-2 py-2 rounded-lg text-center flex-1 bg-white text-black font-semibold shadow-xl shadow-white/10 border-white">
            Sign up
          </button>
          <div className="text-center text-sm mb-2">
            <p className="inline text-white/80">Already have account? </p>
            <Link href="/login" className="font-semibold">
              Sign in
            </Link>
          </div>
          <div className="w-full text-center">
            <Link href="/" className="text-sm text-white/80">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
