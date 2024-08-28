import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { supabase } from "../lib/superbase";
import { supabaseUrl } from "../constants";

export const getUserImageSrc = (imagePath) => {
  if (imagePath) {
    return getSupabaseImageUrl(imagePath);
  } else {
    return require("../assets/images/defaultUser.png");
  }
};

export const getSupabaseImageUrl = (filePath) => {
  if (filePath) {
    return {
      uri: `${supabaseUrl}/storage/v1/object/public/upload/${filePath}`,
    }
    return null;
  }
};

export const uploadFile = async (folderName, fileUrl, isImage = true) => {
  try {
    const fileName = getFilePath(folderName, isImage);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUrl, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageData = decode(fileBase64);
    const { data, error } = await supabase.storage
      .from("upload")
      .upload(fileName, imageData, {
        cacheControl: "3600",
        upsert: false,
        contentType: isImage ? "image/*" : "video/*",
      });

    if (error) {
      console.error("error upload ke-1", error);
      return {
        success: false,
        msg: error.message,
      };
    }
    console.log("Data: ", data);
    return {
      success: true,
      data: data.path,
    };
  } catch (error) {
    console.error("error upload file: ", error);
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const getFilePath = (folderName, isImage) => {
  return `${folderName}/${Date.now()}${isImage ? ".jpg" : ".mp4"}`;
};
