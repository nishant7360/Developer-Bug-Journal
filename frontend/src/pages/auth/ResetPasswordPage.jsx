import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

import { resetPasswordSchema } from "@/schemas/auth.schema";
import useResetPassword from "@/hooks/mutations/useResetPassword";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { submitNewPassword, isPending } = useResetPassword();
  const [submitError, setSubmitError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  function onSubmit({ newPassword }) {
    setSubmitError(null);
    submitNewPassword(
      { token, newPassword },
      {
        onSuccess: () => navigate("/login", { state: { passwordReset: true } }),
        onError: (err) => setSubmitError(err.message),
      },
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center">
      <div className="text-center">
        <h1 className="font-mono text-xl font-semibold text-foreground">
          Set a new password
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a password you haven&apos;t used before.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <FieldGroup>
          <Field data-invalid={!!errors.newPassword}>
            <FieldLabel htmlFor="newPassword">New password</FieldLabel>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input id="newPassword" type="password" {...field} />
              )}
            />
            <FieldError errors={errors.newPassword && [errors.newPassword]} />
          </Field>

          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input id="confirmPassword" type="password" {...field} />
              )}
            />
            <FieldError
              errors={errors.confirmPassword && [errors.confirmPassword]}
            />
          </Field>

          {submitError && (
            <div className="text-sm text-destructive">
              <p>{submitError}</p>
              <Link
                to="/forgot-password"
                className="mt-1 inline-block font-medium text-primary hover:underline"
              >
                Request a new link
              </Link>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Reset password"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
