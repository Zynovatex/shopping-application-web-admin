/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "picsum.photos",
      "i.pravatar.cc",
      "firebasestorage.googleapis.com", // ✅ Firebase image domain
    ],
  },
};

module.exports = nextConfig;
