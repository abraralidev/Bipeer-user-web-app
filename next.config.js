const { i18n } = require("./next-i18next.config");

module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "picsum.photos",
      "images.unsplash.com",
      "maps.google.com",
    ],
  },
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
