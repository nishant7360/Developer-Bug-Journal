import { registerUser } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";

function useRegister() {
  const {
    mutate: register,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerUser,
  });

  return { register, isPending, error };
}

export default useRegister;
