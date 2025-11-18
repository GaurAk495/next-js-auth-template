import Link from "next/link";

function page() {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="max-w-7xl px-4 md:px-8">
        <div className="max-w-sm  p-4 border rounded-xl border-white/10">
          <h1 className="text-xl font-semibold text-center mb-3">Home</h1>
          <div className="mb-6 text-center text-balance font-medium">
            Welcome to the Next.js Authentication Template utilizing Better
            Auth.
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              className="border px-2 py-2 rounded-lg text-center flex-1 font-semibold"
              href={"/register"}
            >
              Get Started
            </Link>
            <Link
              className="border px-2 py-2 rounded-lg text-center flex-1 bg-white text-black font-semibold shadow-xl shadow-white/10 border-white"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
