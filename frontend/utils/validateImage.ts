import toast from "react-hot-toast";

export default (
  event: React.ChangeEvent<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<File | null>>
) => {
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    if (file.size > 1024 * 1024 || file.type !== "image/jpeg") {
      toast.error("Image must be jpeg format and 1 MB max");
      return;
    }
    setImage(file);
  }
};
