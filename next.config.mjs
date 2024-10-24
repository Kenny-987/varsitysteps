/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns: [
            {
              hostname: 'varsitystepsbucket.s3.eu-north-1.amazonaws.com',
              pathname: '/**',
              protocol: 'https',
            },
          ]
    }
};

export default nextConfig;
