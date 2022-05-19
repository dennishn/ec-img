const withTM = require("next-transpile-modules")(["@material/material-color-utilities"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(nextConfig);
