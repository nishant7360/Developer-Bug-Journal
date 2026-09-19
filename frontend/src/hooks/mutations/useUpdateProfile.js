import { updateProfile } from "@/services/apiUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });

  return { update, isPending };
}

export default useUpdateProfile;
