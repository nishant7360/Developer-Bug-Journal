import { loginUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "me"], user);
    },
  });

  return { login, isPending };
}

export default useLogin;
