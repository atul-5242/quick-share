import { v2 as cloudinary, type ConfigOptions } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudinaryUrl = process.env.CLOUDINARY_URL;

export const cloudinaryConfigured = Boolean(
  cloudinaryUrl || (cloudName && apiKey && apiSecret)
);

if (!cloudinaryUrl && (!cloudName || !apiKey || !apiSecret)) {
  console.warn(
    "Cloudinary configuration is missing. API routes will return an error until environment variables are set."
  );
}

const config: ConfigOptions | undefined = cloudinaryUrl
  ? { cloudinary_url: cloudinaryUrl, secure: true }
  : cloudinaryConfigured
  ? {
      cloud_name: cloudName!,
      api_key: apiKey!,
      api_secret: apiSecret!,
      secure: true,
    }
  : undefined;

if (config) {
  cloudinary.config(config);
}

export default cloudinary;