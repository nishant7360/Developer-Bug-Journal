import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useUpdateProfile from "@/hooks/mutations/useUpdateProfile";
import ProfileHeader from "@/components/user/ProfileHeader";
import ProfileEditForm from "@/components/user/ProfileEditForm";
import ProfileBio from "@/components/user/ProfileBio";
import ProfileActivityTabs from "@/components/user/ProfileActivityTabs";

export default function ProfilePage() {
  const { user } = useAuth();
  const { update, isPending } = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  if (!user) return null;

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function startEditing() {
    setImageFile(null);
    setImagePreview(null);
    setSubmitError(null);
    setIsEditing(true);
  }

  function handleSubmit(values) {
    setSubmitError(null);
    const formData = new FormData();
    formData.append("bio", values.bio || "");
    if (imageFile) formData.append("profileImage", imageFile);

    update(formData, {
      onSuccess: () => setIsEditing(false),
      onError: (err) => setSubmitError(err.message),
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ProfileHeader
        user={user}
        imagePreview={imagePreview}
        isEditing={isEditing}
        onStartEditing={startEditing}
      />

      {isEditing ? (
        <ProfileEditForm
          user={user}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
          isPending={isPending}
          submitError={submitError}
        />
      ) : (
        <ProfileBio bio={user.bio} />
      )}

      <ProfileActivityTabs />
    </div>
  );
}
