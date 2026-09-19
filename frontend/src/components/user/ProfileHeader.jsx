import { Pencil } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAuthorInitial } from "@/lib/questionUtils";

export default function ProfileHeader({
  user,
  imagePreview,
  isEditing,
  onStartEditing,
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          {(imagePreview || user.profileImage) && (
            <AvatarImage
              src={imagePreview || user.profileImage}
              alt={user.username}
            />
          )}
          <AvatarFallback className="text-lg">
            {getAuthorInitial(user)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            {user.username}
          </h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {!isEditing && (
        <Button variant="outline" size="sm" onClick={onStartEditing}>
          <Pencil className="h-4 w-4" />
          Edit profile
        </Button>
      )}
    </div>
  );
}
