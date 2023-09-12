import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

//creating a custom hook
export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // To update the data we use useMutation hook from supabase

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    //mutationFn: (id) => deleteCabin(id),
    //equivalent as above
    mutationFn: deleteCabinApi,

    // to refetch data on updation
    // we use below option
    onSuccess: () => {
      toast.success("Cabin Successfully deleted");

      // to refetch data
      // we need to invalidate the query
      // and that can be done using invalidate
      // but invalidate is on the queryClient
      // so to use queryClient here
      // we use a hook to get queryClient here

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
