import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { updateProfileSchema } from "@/schemas/profile.schema";

export default function ProfileEditForm({
  user,
  onImageChange,
  onSubmit,
  onCancel,
  isPending,
  submitError,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { bio: user.bio ?? "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <FieldGroup>
        <Field>
          <label className="text-sm font-medium text-foreground">
            Profile image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="mt-1 text-sm text-muted-foreground"
          />
        </Field>

        <Field data-invalid={!!errors.bio}>
          <label className="text-sm font-medium text-foreground">Bio</label>
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <Textarea
                rows={4}
                placeholder="Tell others about yourself"
                {...field}
              />
            )}
          />
          <FieldError errors={errors.bio && [errors.bio]} />
        </Field>

        {submitError && (
          <p className="text-sm text-destructive">{submitError}</p>
        )}

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Save changes"}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
