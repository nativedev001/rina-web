import type { NextConfig } from 'next';
const config: NextConfig = { output: 'export', turbopack: { root: __dirname }, images: { unoptimized: true }, trailingSlash: true };
export default config;
