const path = require("path");

module.exports = {
    devtool: 'eval-source-map',
    mode: 'development',
    entry: "./src/Reader.ts", //relative entrypoint path
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/, //if typescript file
                use: "ts-loader", //turn into js
                include: [path.resolve(__dirname, 'src')] //only if they are in the src folder
            }
        ]
    },
    output: {
        publicPath: "build",
        filename: "WebRICE.js", //name of the outputfile
        path: path.resolve(__dirname, "build"), //Absolute path from this file to build
        library: 'WebRICE',
        libraryTarget: 'umd',
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        publicPath: "/",
      }
}
