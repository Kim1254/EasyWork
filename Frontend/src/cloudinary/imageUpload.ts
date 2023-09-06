import axios from "axios";

// cloudinary 프로필 사진 업로드용 함수
export const imageUpload = async (file: Blob) => {
  try {
    const formData = new FormData();
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);

    formData.append("timestamp", (Date.now() / 1000 || 0).toString());
    formData.append("file", file);

    formData.append("upload_preset", "react-shoppingmall");

    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    const result = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return result.data.url;
  } catch (err) {
    return null;
  }
};
