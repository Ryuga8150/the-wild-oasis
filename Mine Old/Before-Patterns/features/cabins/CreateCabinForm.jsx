import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
};

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // Now we want to display the errors we got from invalidation
  // for that we use formState
  // and get errors from that
  const { errors } = formState;

  //console.log(errors);

  //const queryClient = useQueryClient();

  // const { mutate: createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createEditCabin,
  //   onSuccess: () => {
  //     toast.success("New cabins successfully created");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });

  //     //to empty out all the field
  //     // if successfull
  //     // thats why reset placeed here nont in submit
  //     // moreover want to keep submit clean
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  // REPLACING ABOVE WITH CUSTOM HOOK
  const { isCreating, createCabin } = useCreateCabin();

  // const { mutate: editCabin, isLoading: isEditing } = useMutation({
  //   // mutationFn only accepts one parameter so we send multiple data in an object
  //   mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
  //   onSuccess: () => {
  //     toast.success("Cabin successfully edited");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });

  //     //to empty out all the field
  //     // if successfull
  //     // thats why reset placeed here nont in submit
  //     // moreover want to keep submit clean
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  // REPLACING ABOVE WITH CUSTOM HOOK
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    //console.log(data);

    // the image could be string(from db ) or object (filepath)
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            //also gets access to he data returned y createcabin from apiCabins
            //console.log(data);
            reset();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            //also gets access to he data returned y createcabin from apiCabins
            //console.log(data);
            reset();
          },
        }
      );
  }

  function onError(errors) {
    // this function is called when onSubmit could not be called
    // what is invalid will come in an object
    console.log(errors);

    // here this function does not do anything
    // as errors are coming from formState
    // just here to show it exists
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>

        <Input
          type="text"
          id="name"
          // calling register will add onChange and onBlur
          // which were not declared
          // so this is the advantage of react form
          {...register("name", {
            required: "This field is required",
          })}
        />
        
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          // calling register will add onChange and onBlur
          // which were not declared
          // so this is the advantage of react form
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            //writing custom validators
            // these should return true if no error
            // else error if you want

            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          // type="file"
          // making this component pre made for file
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
