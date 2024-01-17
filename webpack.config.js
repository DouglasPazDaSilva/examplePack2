const crypto = require("crypto");
const path = require("path");

/**
 * O algoritmo MD4 não está mais disponível no Node.js 17+ (devido à biblioteca SSL 3).
 * Nesse caso, foi subistituido o MD4 pelo algoritmo sha256.
*/

const crypto_orig_createHash = crypto.createHash;
crypto.createHash = function (algorithm) {
  return crypto_orig_createHash(algorithm === "md4" ? "sha256" : algorithm);
};

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "umd"),
    filename: "my-typescript-package.js",
    library: "lib-core-js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.umd.json"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
