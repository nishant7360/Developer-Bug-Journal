import { forgetPassword } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

function useForgotPassword() {
  const { mutate: sendResetLink, isPending } = useMutation({
    mutationFn: forgetPassword,
  });

  return { sendResetLink, isPending };
}

export default useForgotPassword;
