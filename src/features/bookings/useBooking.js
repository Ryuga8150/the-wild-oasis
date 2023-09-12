import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  // Param read here to make this self contained
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId), //required something which returns a promise
    retry: false,
    // if the react query is unable to fetch data it tries it 2 to 3
    // times again,
    // but here not required as it might not exist
  });

  return { isLoading, error, booking };
}
