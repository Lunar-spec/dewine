"use client";
import { useToast } from "@/components/ui/use-toast";
import { newVerification } from "@/lib/actions/verification";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Verification = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;
    // console.log(token);
    if (!token) {
      setError("Something went wrong");
      return;
    }

    try {
      const res: {
        error?: string | undefined;
        success?: string | undefined;
      } = await newVerification(token);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setSuccess(res.success);
      } else {
        setError("Something went wrong");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <section className="flex-center h-screen">
      <section className="bg-white/10 w-3/4 md:w-1/3 flex-col flex-center gap-4 p-4 rounded">
        {!success && !error && (
          <>
            <p className="text-xl">Confirming your verification</p>
            <div className="flex-center w-full">
              <div className="p-2 animate-spin drop-shadow-lg bg-gradient-to-bl from-brand-primary via-brand-secondary1 to-brand-secondary2 h-14 w-14 aspect-square rounded-full">
                <div className="rounded-full h-full w-full bg-black/80 background-blur-xl"></div>
              </div>
            </div>
          </>
        )}
        <p className="text-xl font-medium text-center">
          {success && (
            <span>
              Your account has been successfully{" "}
              <span className="text-brand-primary">verified</span>.
            </span>
          )}
          {!success && <span>{error}</span>}
        </p>
        <div className="text-lg">
          Back to{" "}
          <Link href="/auth/sign-in" className="text-brand-primary">
            Sign-In
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Verification;
