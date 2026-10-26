import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

import { forgotPasswordSchema } from "@/schemas/auth.schema";
import useForgotPassword from "@/hooks/mutations/useForgotPassword";

export default function ForgotPasswordPage() {
  const { sendResetLink, isPending } = useForgotPassword();
  const [submitError, setSubmitError] = useState(null);
  const [sentTo, setSentTo] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  function onSubmit({ email }) {
    setSubmitError(null);-
    sendResetLink(email, {
      onSuccess: () => setSentTo(email),
      onError: (err) => setSubmitError(err.message),
    });
  }

  if (sentTo) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center text-center">
        <MailCheck className="mx-auto h-10 w-10 text-primary" />
        <h1 className="mt-4 font-mono text-xl font-semibold text-foreground">
          Check your email
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          If an account exists for{" "}
          <span className="font-medium text-foreground">{sentTo}</span>,
          we&apos;ve sent a reset link. It expires in 15 minutes.
        </p>
        <Button
          variant="ghost"
          className="mt-4"
          onClick={() => setSentTo(null)}
        >
          Use a different email
        </Button>
        <Link
          to="/login"
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center">
      <div className="text-center">
        <h1 className="font-mono text-xl font-semibold text-foreground">
          Forgot your password?
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <FieldGroup>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                />
              )}
            />
            <FieldError errors={errors.email && [errors.email]} />
          </Field>

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Sending..." : "Send reset link"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
