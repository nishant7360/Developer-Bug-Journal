import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

import { loginSchema } from "@/schemas/auth.schema";
import useLogin from "@/hooks/mutations/useLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: loginRequest, isPending } = useLogin();
  const [submitError, setSubmitError] = useState(null);
  const location = useLocation();
  const justRegistered = location.state?.justRegistered;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    setSubmitError(null);
    loginRequest(values, {
      onSuccess: () => {
        navigate("/", { state: { justRegistered: true } });
      },
      onError: (err) => setSubmitError(err.message),
    });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center">
      <div className="text-center">
        <h1 className="font-mono text-xl font-semibold text-foreground">
          {justRegistered
            ? "Account created. Log in to continue."
            : "Login to you account"}
        </h1>
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

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input id="password" type="password" {...field} />
              )}
            />
            <FieldError errors={errors.password && [errors.password]} />
          </Field>

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Create an account?{" "}
        <Link
          to="/register"
          className="font-medium text-primary hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
