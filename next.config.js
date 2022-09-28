/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

// module.exports = nextConfig;

module.exports = {
    ...nextConfig,
    images: {
        domains: ["static01.nyt.com", "nytimes.com"],
        formats: ["image/avif", "image/webp"],
    },
};
