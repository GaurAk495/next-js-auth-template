"use client";

import { sendVerificationEmail } from "@/lib/auth-client";
import { useState } from "react";

export default function SentVerificationMail({ email }: { email: string }) {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleOnClick = async () => {
    try {
      const res = await sendVerificationEmail({
        email: email,
        callbackURL: "/dashboard",
      });
      if (res.error) {
        console.log(res.error.message);
      } else {
        setIsEmailSent(true);
        setTimeout(() => {
          setIsEmailSent(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleOnClick}>
      {isEmailSent && (
        <div className="absolute top-20 right-2 p-2 border rounded-xl border-green-600 bg-green-600/25 text-green-600/70">
          Verificaiton Email Sent
        </div>
      )}
      <button
        type="submit"
        className="text-sm text-white/60 cursor-pointer hover:underline hover:text-white/90"
      >
        sent email
      </button>
    </form>
  );
}
