import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import TagSelector from "@/components/question/TagSelector";
import TechnologyInput from "@/components/question/TechnologyInput";
import { createQuestionSchema } from "@/schemas/question.schema";

export default function QuestionForm({
  defaultValues,
  existingImageUrl,
  onSubmit,
  isSubmitting,
  submitLabel = "Post question",
  submitPendingLabel = "Posting...",
  submitError,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(existingImageUrl ?? null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createQuestionSchema),
    defaultValues,
  });

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveExistingImage(false);
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    setRemoveExistingImage(true);
  }

  function handleFormSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("errorMessage", values.errorMessage || "");
    formData.append("code", values.code || "");
    values.technologies.forEach((tech) =>
      formData.append("technologies", tech),
    );
    formData.append("tags", JSON.stringify(values.tags));
    if (imageFile) formData.append("image", imageFile);
    if (removeExistingImage) formData.append("removeImage", "true"); // unconfirmed backend support

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                id="title"
                placeholder="e.g. MongoDB connection times out on deploy"
                {...field}
              />
            )}
          />
          <FieldError errors={errors.title && [errors.title]} />
        </Field>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                id="description"
                rows={5}
                placeholder="What are you trying to do, and what's going wrong?"
                {...field}
              />
            )}
          />
          <FieldError errors={errors.description && [errors.description]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="errorMessage">
            Error message (optional)
          </FieldLabel>
          <Controller
            name="errorMessage"
            control={control}
            render={({ field }) => (
              <Input
                id="errorMessage"
                className="font-mono"
                placeholder="Paste the exact error text"
                {...field}
              />
            )}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="code">Code (optional)</FieldLabel>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Textarea
                id="code"
                rows={6}
                className="font-mono text-sm"
                placeholder="Relevant code snippet"
                {...field}
              />
            )}
          />
        </Field>

        <Field data-invalid={!!errors.technologies}>
          <FieldLabel>Technologies</FieldLabel>
          <Controller
            name="technologies"
            control={control}
            render={({ field }) => (
              <TechnologyInput value={field.value} onChange={field.onChange} />
            )}
          />
          <FieldError errors={errors.technologies && [errors.technologies]} />
        </Field>

        <Field data-invalid={!!errors.tags}>
          <FieldLabel>Tags</FieldLabel>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagSelector value={field.value} onChange={field.onChange} />
            )}
          />
          <FieldError errors={errors.tags && [errors.tags]} />
        </Field>

        <Field>
          <FieldLabel>Screenshot (optional)</FieldLabel>
          {imagePreview ? (
            <div className="relative w-fit">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-md border border-border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <label className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary/50">
              <ImagePlus className="h-4 w-4" />
              Upload an image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </Field>

        {submitError && (
          <p className="text-sm text-destructive">{submitError}</p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? submitPendingLabel : submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
