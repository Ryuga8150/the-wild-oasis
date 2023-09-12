import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabins successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      //to empty out all the field
      // if successfull
      // thats why reset placeed here nont in submit
      // moreover want to keep submit clean

      // PROBLEM during trying to make a custom hook
      // cannot use reset here
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
