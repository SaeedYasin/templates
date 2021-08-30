const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = (phase, defaultConfig) => {
  const config = {
    ...defaultConfig,
    ...{
      reactStrictMode: true,
    },
  };
  return withBundleAnalyzer(config);
};
