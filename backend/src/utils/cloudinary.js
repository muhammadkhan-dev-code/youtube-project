import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isCloudinaryConfigured = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;
  return (
    CLOUDINARY_CLOUD_NAME &&
    CLOUDINARY_API_KEY &&
    CLOUDINARY_API_SECRET &&
    !CLOUDINARY_CLOUD_NAME.includes("your_") &&
    !CLOUDINARY_API_KEY.includes("your_") &&
    !CLOUDINARY_API_SECRET.includes("your_")
  );
};

const getLocalFileUrl = (localFilePath) => {
  const fileName = path.basename(localFilePath);
  const port = process.env.PORT || 8000;
  return `http://localhost:${port}/temp/${fileName}`;
};

const uploadOnCloudinary = async (localFilePath, options = {}) => {
  try {
    if (!localFilePath) return null;

    if (!isCloudinaryConfigured()) {
      console.warn(
        "Cloudinary credentials not set in backend/.env. Serving uploaded file locally."
      );
      const fileUrl = getLocalFileUrl(localFilePath);
      return {
        url: fileUrl,
        secure_url: fileUrl,
        public_id: path.basename(localFilePath),
      };
    }

    const uploadOptions =
      typeof options === "string"
        ? { resource_type: options }
        : { resource_type: "auto", ...options };

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      uploadOptions
    );

    // remove file from local uploads folder if exists
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (e) {
        // ignore unlink error
      }
    }
    return response;
  } catch (error) {
    console.error("Error in uploading file on cloudinary:", error);
    // Fallback: If Cloudinary upload failed, serve local file instead of failing the request
    if (localFilePath && fs.existsSync(localFilePath)) {
      const fileUrl = getLocalFileUrl(localFilePath);
      return {
        url: fileUrl,
        secure_url: fileUrl,
        public_id: path.basename(localFilePath),
      };
    }
    return null;
  }
};

export { uploadOnCloudinary };
