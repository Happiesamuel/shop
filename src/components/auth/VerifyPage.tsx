"use client";
import { account } from "@/lib/appwriteClient";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import AuthHeader from "./AuthHeader";
import { Button } from "../ui/button";
import ButtonLoader from "../loaders/ButtonLoader";
import { getGuestViaUserId, updateGuest } from "@/lib/action";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const [verify, setVerify] = useState(false);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const router = useRouter();
  async function verifyEmail() {
    if (!userId || !secret) {
      toast("Invalid verification link", {
        description: "Missing userId or secret in the URL.",
      });
      return;
    }
    try {
      setVerify(true);
      await account.updateVerification(userId, secret);
      const guest = await getGuestViaUserId(userId);
      await updateGuest({
        id: guest.$id,
        obj: { isVerified: true },
      });
      setVerify(false);

      toast("Email verified successfully!", {
        description: "You can now place orders and access your account.",
        duration: 4000,
        closeButton: true,
      });
      router.push("/login");
    } catch (err) {
      const error = err as Error;

      toast("Verification failed", {
        description: error.message + ". Please try again later.",
        duration: 4000,
        closeButton: true,
      });
      return;
    }
  }

  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-2">
      <AuthHeader />
      <Button
        onClick={verifyEmail}
        style={{
          background:
            "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
        }}
        type="submit"
        className="text-white w-ful px-8 mt-4"
      >
        {verify ? <ButtonLoader /> : "Verifiy your Email"}
      </Button>
    </div>
  );
}
