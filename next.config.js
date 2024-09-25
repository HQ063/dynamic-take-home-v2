/** @type {import("next").NextConfig} */
module.exports = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  }
}
