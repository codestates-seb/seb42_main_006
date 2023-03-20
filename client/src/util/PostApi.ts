import { requestAuth } from "../function/request";

export const UploadImg = async (file: File) => {
  if (file !== undefined) {
    const formData = new FormData();
    formData.append("image", file);
  }
};

// export const CreatePost = async;
