import multer from "multer";

const upload = multer({ dest: "images/", limits: { fileSize: 3000000 } });

export default upload;
