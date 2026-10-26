import { resetPassowrd } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

function useResetPassword() {
  const { mutate: submitNewPassword, isPending } = useMutation({
    mutationFn: resetPassowrd,
  });

  return { submitNewPassword, isPending };
}

export default useResetPassword;
