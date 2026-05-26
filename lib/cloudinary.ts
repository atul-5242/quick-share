import { v2 as cloudinary, type ConfigOptions } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (!cloudinaryUrl && (!cloudName || !apiKey || !apiSecret)) {
  throw new Error(
    "Missing Cloudinary configuration. Set CLOUDINARY_URL, or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
  );
}

const config: ConfigOptions = cloudinaryUrl
  ? { cloudinary_url: cloudinaryUrl, secure: true }
  : {
      cloud_name: cloudName!,
      api_key: apiKey!,
      api_secret: apiSecret!,
      secure: true,
    };

cloudinary.config(config);

export default cloudinary;