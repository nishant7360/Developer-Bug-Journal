import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import useCreateQuestion from "@/hooks/mutations/useCreateQuestion";

export default function AskQuestionPage() {
  const navigate = useNavigate();
  const { create, isPending } = useCreateQuestion();
  const [submitError, setSubmitError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      title: "",
      description: "",
      errorMessage: "",
      code: "",
      technologies: [],
      tags: [],
    },
  });

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  function onSubmit(values) {
    setSubmitError(null);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("errorMessage", values.errorMessage || "");
    formData.append("code", values.code || "");
    formData.append("technologies", JSON.stringify(values.technologies));
    formData.append("tags", JSON.stringify(values.tags));
    if (imageFile) formData.append("image", imageFile);
    console.log(formData);

    create(formData, {
      onSuccess: (question) => {
        navigate(`/questions/${question._id}`);
      },
      onError: (err) => setSubmitError(err.message),
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-semibold text-foreground">Ask a question</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Describe the bug clearly — the more context, the faster you'll get help.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
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
                <TechnologyInput
                  value={field.value}
                  onChange={field.onChange}
                />
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

          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Posting..." : "Post question"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
