import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // mutationFn only accepts one parameter so we send multiple data in an object
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      //to empty out all the field
      // if successfull
      // thats why reset placeed here nont in submit
      // moreover want to keep submit clean

      //reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
