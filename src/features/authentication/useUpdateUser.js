import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // mutationFn only accepts one parameter so we send multiple data in an object
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("User account successfully updated");

      // manually setting up the data
      // my case its working

      //queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
