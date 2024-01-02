/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dmbwhnml9",
    NEXT_PUBLIC_CLOUDINARY_PRESET_NAME: "fxwqzera",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
