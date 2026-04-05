/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { isServer }) => {
    // Handle WASM files for web-ifc
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Exclude web-ifc from server-side bundling
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("web-ifc");
    }

    return config;
  },
};

export default nextConfig;
