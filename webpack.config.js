const crypto = require("crypto");
const path = require("path"); 

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
