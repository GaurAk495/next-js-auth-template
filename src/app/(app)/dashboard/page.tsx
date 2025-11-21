import { getSession } from "@/actions/auth";
import SentVerificationMail from "@/components/SentVerificationEmail";
import SignOutButton from "@/components/SignOutButton";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function page() {
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-center px-4 md:px-8 overflow-hidden py-20">
      <div className="max-w-lg w-full p-4 border rounded-xl border-white/10 bg-linear-to-b from-white/5 to-black/5 inset-shadow-2xs inset-shadow-white/5">
        <h1 className="text-xl font-semibold text-center mb-1">Dashboard</h1>
        <div className="mb-2 text-center text-balance font-medium text-white/85">
          Welcome 👋
        </div>
        <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-5">
          <Image
            src={
              session.user.image ||
              "https://wallpaperaccess.com/full/297470.jpg"
            }
            width={100}
            height={50}
            alt={session.user.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-row  mb-1">
          <p className="min-w-[150px]">User name:</p>
          <p className="overflow-hidden text-ellipsis ">
            {" "}
            {session.user.name}{" "}
          </p>
        </div>
        <div className="flex flex-row mb-1">
          <p className="min-w-[150px] ">User email:</p>
          <p className="overflow-hidden text-ellipsis">{session.user.email}</p>
        </div>
        <div className="flex flex-row mb-1">
          <p className="min-w-[150px]">is email verified</p>
          {session.user.emailVerified ? (
            <p>Verified</p>
          ) : (
            <div className="w-full flex flex-row justify-between items-end">
              <div>Pending</div>
              <SentVerificationMail email={session.user.email} />
            </div>
          )}
        </div>
        <div className="flex flex-row mb-4">
          <p className="min-w-[150px]">Account Created:</p>
          <p>{session.user.updatedAt.toDateString()}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-2">
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
        <SignOutButton />
      </div>
    </div>
  );
}

export default page;
