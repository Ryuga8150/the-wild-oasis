import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // mutationFn only accepts one parameter so we send multiple data in an object
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      //to empty out all the field
      // if successfull
      // thats why reset placeed here nont in submit
      // moreover want to keep submit clean

      //reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
