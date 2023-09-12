import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createEditCabin(newCabin, id) {
  // To know if we are in edit session or not
  // we pass id

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // to prevent subfolders we use replaceAll
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://lkqrogatvcgwnithrafo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. Create Cabin

  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  // notice we are not passing in an array
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  // Without select single the data returned from this await
  // will be empty so if want data now then we use
  // select and single

  if (error) {
    console.log(error);
    throw new Error("Cabin would not be created");
  }

  // 2. Upload Image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin Image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin would not be deleted");
  }

  return data;
}
