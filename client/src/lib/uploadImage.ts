export const uploadImage = async (imageUpload: File) => {
  const formData = new FormData();
  formData.append("image", imageUpload);
  try {
    const response = await fetch(
      `${
        process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_ENDPOINT : "http://localhost:4000"
      }/upload/image`,
      {
        method: "POST",
        body: formData,
      }
    );
    const url = await response.text();
    console.log(url);
    return url;
  } catch (err) {
    throw new Error("fail to upload image");
  }
};
