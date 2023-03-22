import { requestAuth } from "../function/request";

export interface responseUrl {
  id?: number;
  title: string;
  thumbnail: string;
  url: string;
}

export const UploadImg = async (file: File | undefined) => {
  if (file !== undefined) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const imgRes = await requestAuth.post("/files/images", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (imgRes.status !== 201) throw Error(imgRes.data.message || "문제발생");

      alert("파일 업로드 성공");
      return imgRes.data;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
};

export const UpdateImg = async (file: File | undefined, fileKey: string) => {
  if (file !== undefined) {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("fileKey", fileKey);

      const imgRes = await requestAuth.post("/files/images", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (imgRes.status !== 201) throw Error(imgRes.data.message || "문제발생");

      alert("파일 업로드 성공");
      return imgRes.data;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
};
