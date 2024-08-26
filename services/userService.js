import { supabase } from "../lib/superbase";

export const getUserData = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userID)
      .single();
    if (error) {
      return { success: false, msg: error.message };
    }
    return { success: true, data };
  } catch (error) {
    //console.log(error);
    return { success: false, msg: error.message };
  }
};
export const updateUser = async (userID, data) => {
  try {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userID);
    if (error) {
      return { success: false, msg: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, msg: error.message };
  }
};
