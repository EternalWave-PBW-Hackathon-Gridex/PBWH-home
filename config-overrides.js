/* config-overrides.js */

// Wallet Connect is Not working issue
// Solution: https://github.com/Uniswap/web3-react/issues/423
const webpack = require("webpack");
module.exports = function override(config, env) {
  config.resolve.fallback = {
    util: require.resolve("util/"),
    url: require.resolve("url"),
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    "process/browser": require.resolve("process/browser")
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"]
    })
  );
  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};
