export default (
  title: string | undefined,
  url: string | undefined,
  genre: string | undefined,
  description: string | undefined,
  uploadedImage: File | null
) => {
  const formData = new FormData();
  title && formData.append("title", title);
  url && formData.append("url", url);
  genre && formData.append("genre", genre);
  description && formData.append("description", description);
  uploadedImage && formData.append("image", uploadedImage);
  return formData;
};
