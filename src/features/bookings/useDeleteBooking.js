import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

//creating a custom hook
export function useDeleteBooking() {
  const queryClient = useQueryClient();

  // To update the data we use useMutation hook from supabase

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    //mutationFn: (id) => deleteCabin(id),
    //equivalent as above
    mutationFn: deleteBookingApi,

    // to refetch data on updation
    // we use below option
    onSuccess: () => {
      toast.success("Booking Successfully deleted");

      // to refetch data
      // we need to invalidate the query
      // and that can be done using invalidate
      // but invalidate is on the queryClient
      // so to use queryClient here
      // we use a hook to get queryClient here

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
