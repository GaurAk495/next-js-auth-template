import Link from "next/link";

function page() {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="max-w-7xl px-4 md:px-8">
        <div className="sm:w-sm p-4 border rounded-xl border-white/10 bg-linear-to-b from-white/5 to-black/5 inset-shadow-2xs inset-shadow-white/5">
          <h1 className="text-xl font-semibold text-center mb-1">Dashboard</h1>
          <div className="mb-5 text-center text-balance font-medium text-white/85">
            Welcome 👋
          </div>

          <div className="flex flex-row mb-1">
            <p className="min-w-[150px]">User name:</p>
            <p> Raneh</p>
          </div>
          <div className="flex flex-row mb-1">
            <p className="min-w-[150px]">User email:</p>
            <p> Raneh@example.com</p>
          </div>
          <div className="flex flex-row mb-4">
            <p className="min-w-[150px]">Account Created:</p>
            <p>{new Date().toDateString()}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              className="border px-2 py-2 rounded-lg text-center flex-1 font-semibold"
              href={"/"}
            >
              Home
            </Link>
            <Link
              className="border px-2 py-2 rounded-lg text-center flex-1 bg-white text-black font-semibold shadow-xl shadow-white/10 border-white"
              href={"/register"}
            >
              Auth
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
